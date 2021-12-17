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
