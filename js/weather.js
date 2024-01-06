const API_KEY = "7e5206aa55c5d1b078bfb7b898fbbb5c";
const weatherIcon = document.querySelector(".topbar__weather-icon");
const weatherTempMin = document.querySelector(
  "#topbar__weather > div:last-child > span:first-child"
);
const weatherTempMax = document.querySelector(
  "#topbar__weather > div:last-child > span:last-child"
);
const weatherLocation = document.querySelector(".topbar__weather-loc");

function onGeoOK(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}4&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const tempMin = data.main.temp_min;
      const tempMax = data.main.temp_max;
      const presentLocation = data.name;
      const icon = data.weather[0].icon;
      const urlIcon = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      weatherIcon.src = `${urlIcon}`;
      weatherTempMin.innerText = `최저:  ${Math.round(10 * tempMin) / 10} °C`;
      weatherTempMax.innerText = `최고:  ${Math.round(10 * tempMax) / 10} °C`;
      weatherLocation.innerText = `${presentLocation}`;
      console.log(data);
    });
}
function onGeoError() {
  alert("Can't find you. No weather for you.");
}
navigator.geolocation.getCurrentPosition(onGeoOK, onGeoError);
