////////////////////////////////////////////////////////////////////////////////////////////
//Last updated feature

function formatDate(date) {
  let now = new Date(date);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  return `${day} ${hours}:${minutes}`;
}

////////////////////////////////////////////////////////////////////////////////////////////

//Search part

function showWeather(response) {
  console.log(response.data);

  document.querySelector("#city").innerHTML = response.data.name;

  document.querySelector("#country").innerHTML = response.data.sys.country;

  document.querySelector("#temp-value").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = `Humidity: ${Math.round(
    response.data.main.humidity
  )}%`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;

  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#date").innerHTML = `Last updated: ${formatDate(
    response.data.dt * 1000
  )}`;
}

function searchLocation(city) {
  let apiKey = "bbf57d20e1cd86b6b49445b7a439032d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let location = document.querySelector("#location-input").value;
  searchLocation(location);
}

////////////////////////////////////////////////////////////////////////////////////////////

function getPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "bbf57d20e1cd86b6b49445b7a439032d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function localizeUser(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

let currentLocationButton = document.querySelector("#localization-button");
currentLocationButton.addEventListener("click", localizeUser);

////////////////////////////////////////////////////////////////////////////////////////////

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

function convertToFahrenheit() {
  event.preventDefault();
  let temperatureCelsius = 17;
  let temperatureFahrenheit = temperatureCelsius * 1.8 + 32;
  let temperatureShown = document.querySelector("#temp-value");
  temperatureShown.innerHTML = Math.round(temperatureFahrenheit);
}

function convertToCelsius() {
  let temperatureFahrenheit = 62.6;
  let temperatureCelsius = ((temperatureFahrenheit - 32) * 5) / 9;
  let temperatureShown = document.querySelector("#temp-value");
  temperatureShown.innerHTML = temperatureCelsius;
}

let temp = document.querySelector("#temp-value");
let convertFahrenheit = document.querySelector("#fahrenheit");
let convertCelsius = document.querySelector("#celsius");

convertFahrenheit.addEventListener("click", convertToFahrenheit);
convertCelsius.addEventListener("click", convertToCelsius);

searchLocation("Montreal");
