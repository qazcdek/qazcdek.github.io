const clock = document.querySelector(".topbar__clock-time");
const calendar = document.querySelector(".topbar__clock-calendar");

function getClock() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();
  clock.innerText =
    hours.toString().padStart(2, "0") +
    "시 " +
    minutes.toString().padStart(2, "0") +
    "분";
  calendar.innerText =
    year.toString() + "년 " + month.toString() + "월 " + day.toString() + "일";
}

setInterval(getClock, 500);
