const images = [
  "img_1.jpg",
  "img_2.jpg",
  "img_3.jpg",
  "img_4.jpg",
  "img_5.jpg",
];
const chosenImg = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img");
bgImage.src = `img/${chosenImg}`;

document.body.style.background = `url(img/${chosenImg}) center center no-repeat fixed`;
document.body.style.backgroundSize = "cover";
