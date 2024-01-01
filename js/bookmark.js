let bookmark = document.querySelector("#bookmark");
const bookmark_form = bookmark.querySelector("#bookmark__form");
let bookmark_list = bookmark.querySelector("ol");

const bookmark_name = bookmark.querySelector(".bookmark__form-name");
const bookmark_url = bookmark.querySelector(".bookmark__form-url");
const bookmark_order = bookmark.querySelector(".bookmark__form-order");
const bookmark_color = bookmark.querySelector(".bookmark__form-color");
const bookmark_ok = bookmark.querySelector(".bookmark__form-ok");

const bookmark_add = bookmark.querySelector("#addButton");

const setBg = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return "#" + randomColor;
};
function setBookmarkColor() {
  bookmark_color.value = setBg();
}
setBookmarkColor();

let urlArray = [];
const BOOKMARK_KEY = "bookmarks";

function addBookmark(event) {
  event.preventDefault();
  setBookmarkColor();
  onHideBookmarkForm();
}
function onHideBookmarkForm() {
  bookmark_form.classList.toggle("hidden");
}

function saveBookmarks() {
  localStorage.setItem(BOOKMARK_KEY, JSON.stringify(urlArray));
}

function deleteBookmarks(event) {
  const li = event.target.parentElement;
  li.remove();
  urlArray = urlArray.filter(
    (bookmarkUrl) => bookmarkUrl.id.toString() !== li.id
  );
  saveBookmarks();
}

function paintBookmarks(newBookmarkObj) {
  const li = document.createElement("li");
  li.id = newBookmarkObj.id;
  li.style.backgroundColor = newBookmarkObj.color;
  const a = document.createElement("a");
  const button = document.createElement("button");
  button.innerText = "❌";
  button.addEventListener("click", deleteBookmarks);
  button.style.backgroundColor = "rgba(255,255,255,1)";
  button.style.borderRadius = "50%";
  button.style.border = "none";
  button.style.fontSize = "8px";
  button.style.fontWeight = "800";
  li.appendChild(a);
  li.appendChild(button);
  a.innerText = newBookmarkObj.text;
  a.href = newBookmarkObj.url;
  /*a.style.backgroundColor = */
  bookmark_list = bookmark.querySelector("ol");
  bookmark_list.appendChild(li);
}

function paintBookmarksAll() {
  savedBookmarks = localStorage.getItem(BOOKMARK_KEY);
  const parsedBookmarks = JSON.parse(savedBookmarks);
  urlArray = parsedBookmarks;
  parsedBookmarks.forEach(paintBookmarks);
}

function deleteBookmarksAll() {
  bookmark = document.querySelector("#bookmark");
  bookmark_list = bookmark.querySelector("ol");
  bookmark_list.innerHTML = "";
}

function onBookmarkOK(event) {
  event.preventDefault();
  const newBookmarkObj = {
    id: Date.now(),
    text: bookmark_name.value,
    url: bookmark_url.value,
    order: bookmark_order.value,
    color: bookmark_color.value,
  };
  urlArray = JSON.parse(localStorage.getItem(BOOKMARK_KEY));
  if (urlArray.length >= 8) {
    alert("The maximum number of Bookmarks is 8!");
    return;
  }

  if (parseInt(newBookmarkObj.order) > 0) {
    console.log(parseInt(newBookmarkObj.order), "ok!");
    urlArray.splice(parseInt(newBookmarkObj.order) - 1, 0, newBookmarkObj);
    saveBookmarks();
  } else {
    console.log(parseInt(newBookmarkObj.order), "nan!");
    urlArray.push(newBookmarkObj);
    saveBookmarks();
  }
  deleteBookmarksAll();
  paintBookmarksAll();
  onHideBookmarkForm();
  bookmark_name.value = "";
  bookmark_url.value = "";
  bookmark_order.value = "";
  bookmark_color.value = setBg();
}
bookmark_add.addEventListener("click", addBookmark);
bookmark_form.addEventListener("submit", onBookmarkOK);

let savedBookmarks = localStorage.getItem(BOOKMARK_KEY);

paintBookmarksAll();
