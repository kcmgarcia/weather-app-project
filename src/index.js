function dateAndTime(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let today = days[day];

  return `${today} ${hours}:${minutes}`;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#upcoming-days-forecast");
  let forecast = response.data.daily;

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col-4">
      <div class="forecast-days">
        ${forecastDay.dt}
        <br />
        02/11 15˚ 🌤
        <br />
        max ${forecastDay.temp.max}˚ | min ${forecastDay.temp.min}˚ 
        <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="forecast">
    </div>
    </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function forecastUpcomingDays(coordinates) {
  let units = "metric";
  let apiKey = "c7fd5e424407c1c48c90ef23a84bc8d5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=${units}&appid=${apiKey}`;
  console.log(apiUrl);

  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  celsiusTemp = response.data.main.temp;

  let cityDislpayName = document.querySelector("#place");
  cityDislpayName.innerHTML = response.data.name;
  let temperatueDisplay = document.querySelector("#tempNumber");
  temperatueDisplay.innerHTML = Math.round(celsiusTemp);
  let icon = document.querySelector("#weather-icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );



  document.querySelector("#max-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#min-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main; 

  // forecastUpcomingDays(response.data.coord);
}

function searchDefault(city) {
  let units = "metric";
  let apiKey = "c7fd5e424407c1c48c90ef23a84bc8d5";
  let apiDomain = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiDomain}?q=${city}&units=${units}&appid=${apiKey}`;

  axios(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  searchDefault(city);
}

function searchCurrentLocation(position) {
  let units = "metric";
  let apiKey = "c7fd5e424407c1c48c90ef23a84bc8d5";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

  console.log(apiUrl);

  axios(apiUrl).then(displayWeather);
}

function displayCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9 / 5) + 32;
  let temperatureElement = document.querySelector("#tempNumber");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#tempNumber");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let now = new Date();
let date = document.querySelector("#current-date");

date.innerHTML = dateAndTime(now);

let cityInput = document.querySelector("form");
cityInput.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", displayCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-convert");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-convert");
celsiusLink.addEventListener("click", displayCelsiusTemp);

searchDefault("Rotterdam");
