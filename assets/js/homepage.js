var cityInputEl = document.querySelector("#city-input");
var searchBtn = document.querySelector("#search-button");
var clearBtn = document.querySelector("#clear-history");
var pastSearchEl = document.querySelector("#past-searches");
var nameEl = document.querySelector("#city-name");
var currentPicEl = document.querySelector("#current-pic");
var currentTempEl = document.querySelector("#temperature");
var currentHumidityEl = document.querySelector("#humidity");
var currentWindEl = document.querySelector("#wind-speed");
var fivedayForecastEl = document.querySelector("#fiveday-container");
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
var pastSearchBtnEl = document.querySelector("#past-search-button");

const APIkey = "1efe0d60974aa0f480a402f1c714d10e";

var formSubmitHandler = function (event) {
  event.preventDefault();
  var city = cityInputEl.value.trim();
  if (city) {
    getCityWeather(city);
    get5Day(city);
    pastSearch(city);
    cityInputEl.value = "";
  } else {
    alert("Please enter a City");
  }
}

var getCityWeather = function (city) {
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey;
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayWeather(data, city);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to OpenWeather");
    });
}

var displayWeather = function (weather, searchCity) {
  nameEl.textContent = searchCity;
  var currentDate = new Date(weather.dt * 1000);
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();
  nameEl.textContent = searchCity + " (" + month + "/" + day + "/" + year + ") ";
  var weatherPic = weather.weather[0].icon;
  currentPicEl.setAttribute(
    "src",
    "http://openweathermap.org/img/wn/" + weatherPic + ".png"
  );
  currentPicEl.setAttribute("alt", weather.weather[0].description);
  currentTempEl.textContent = "Temperature: " + k2f(weather.main.temp) + " °F";
  currentHumidityEl.textContent = "Humidity: " + weather.main.humidity + "%";
  currentWindEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
  var lat = weather.coord.lat;
  var lon = weather.coord.lon;
}

var get5Day = function (city) {

  var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIkey;
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      fivedayForecastEl.textContent = "5-Day Forecast:";
      var forecast = data.list;
      for (i = 0; i < forecast.length; i++) {
        if (forecast[i].dt_txt.indexOf("15:00:00") !== -1) {
          var colEl = document.createElement("div");
          colEl.classList.add("col-md-2");
          var cardEl = document.createElement("div");
          cardEl.classList.add("card", "bg-primary", "text-white");
          var windEl = document.createElement("p");
          windEl.classList.add("card-text");
          windEl.textContent = "Wind Speed: " + forecast[i].wind.speed + " MPH";
          var humidityEl = document.createElement("p");
          humidityEl.classList.add("card-text");
          humidityEl.textContent = "Humidity: " + forecast[i].main.humidity + "%";
          var bodyEl = document.createElement("div");
          bodyEl.classList.add("card-body", "p-2");
          var titleEl = document.createElement("h5");
          titleEl.classList.add("card-title");
          var weatherPic = forecast[i].weather[0].icon;
          var imgEl = document.createElement("img");
          imgEl.setAttribute(
            "src",
            "http://openweathermap.org/img/wn/" + weatherPic + ".png"
          );
          var date = forecast[i].dt_txt.split("-").join("/").split(" ")[0];
          titleEl.textContent = date;
          var p1El = document.createElement("p");
          p1El.classList.add("card-text");
          p1El.textContent = "Temp: " + k2f(forecast[i].main.temp) + " °F";
          colEl.appendChild(cardEl);
          bodyEl.appendChild(titleEl);
          bodyEl.appendChild(imgEl);
          bodyEl.appendChild(windEl);
          bodyEl.appendChild(humidityEl);
          bodyEl.appendChild(p1El);
          cardEl.appendChild(bodyEl);
          fivedayForecastEl.appendChild(colEl);
        }
      }
    });
}


var k2f = function (K) {
  return Math.floor((K - 273.15) * 1.8 + 32);
}

var pastSearch = function (input) {
  searchHistory.push(input);
  localStorage.setItem("search", JSON.stringify(searchHistory));
  pastSearchButton(input);
}

var pastSearchButton = function (pastSearch) {
  pastSearchEl = document.createElement("input");
  pastSearchEl.setAttribute("type", "submit");
  pastSearchEl.setAttribute("class", "btn btn-primary btn-block");
  pastSearchEl.setAttribute("value", pastSearch);
  pastSearchEl.addEventListener("click", function () {
    getCityWeather(pastSearch);
    get5Day(pastSearch);
  });
  pastSearchBtnEl.appendChild(pastSearchEl);
}

var pastSearchHandler = function () {
  var pastSearch = JSON.parse(localStorage.getItem("search"));
  if (pastSearch) {
    searchHistory = pastSearch;
    for (i = 0; i < pastSearch.length; i++) {
      pastSearchButton(pastSearch[i]);
    }
  }
}

pastSearchHandler();

var formSubmitHandler = function (event) {
  event.preventDefault();
  var city = cityInputEl.value.trim();
  if (city) {
    getCityWeather(city);
    get5Day(city);
    pastSearch(city);
    cityInputEl.value = "";
  } else {
    alert("Please enter a City");
  }
}

searchBtn.addEventListener("click", formSubmitHandler);






















































