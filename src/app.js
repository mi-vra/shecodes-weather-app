////////////////////////////////////////////////////////////////////////////////////////////
//Last updated feature

function formatDate(timestamp) {
  let now = new Date(timestamp);
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

  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

////////////////////////////////////////////////////////////////////////////////////////////

//Search part

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;

  document.querySelector("#country").innerHTML = response.data.sys.country;

  temperatureCelsius = response.data.main.temp;

  document.querySelector("#temp-value").innerHTML = Math.round(
    temperatureCelsius
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

  document
    .querySelector("#icon")
    .setAttribute("src", `icons/${response.data.weather[0].icon}.png`);
}

function showForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecastData = null;

  for (let index = 0; index < 5; index++) {
    forecastData = response.data.list[index];
    forecastElement.innerHTML += `
  
          <div class="card rounded-lg mr-0 ml-1">
            <div class="card-body text-center no-1">
              <h4 class="card-title">${formatHours(forecastData.dt * 1000)}</h4>
              <h5 class="card-text">
                <span>${Math.round(forecastData.main.temp)}</span>
                °C / F
              </h5>
              <img
                src="icons/${forecastData.weather[0].icon}.png"
                width="512"
                class="icons"
              />
            </div>
          </div>
  `;
  }
}

function searchLocation(city) {
  let apiKey = "bbf57d20e1cd86b6b49445b7a439032d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
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

function convertToFahrenheit(event) {
  event.preventDefault();
  document.querySelector("#temp-value").innerHTML = Math.round(
    temperatureCelsius * 1.8 + 32
  );
  convertFahrenheit.classList.add("active");
  convertCelsius.classList.remove("active");
}

function convertToCelsius(event) {
  event.preventDefault();
  document.querySelector("#temp-value").innerHTML = Math.round(
    temperatureCelsius
  );
  convertCelsius.classList.add("active");
  convertFahrenheit.classList.remove("active");
}

let convertFahrenheit = document.querySelector("#fahrenheit");
convertFahrenheit.addEventListener("click", convertToFahrenheit);

let temperatureCelsius = null;

let convertCelsius = document.querySelector("#celsius");
convertCelsius.addEventListener("click", convertToCelsius);

searchLocation("Montreal");
