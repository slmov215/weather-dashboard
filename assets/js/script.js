// global Vars
var APIKey = '51ddbf8bf8c2712d3a6ff77d6583fa7f';
var inputEl = $('#search-input');
var btnEl = $('#search-btn');
var history = $('#search-history');
var currentCity = $('#current-city');
var iconEl = $('#current-icon');
var currentTemp = $('#current-temp');
var currentHumidity = $('#current-humidity');
var currentWind = $('#current-wind');

var previousCities = [];
var weatherApiRootUrl = 'https://api.openweathermap.org/';


function displayWeather(event) {
  event.preventDefault();
  if (inputEl.val().trim() !== '') {
    city = inputEl.val().trim();
    getWeatherCurrent(city);
  }
}

function getWeatherCurrent(city) {
  var currentUrl = weatherApiRootUrl + 'data/2.5/weather?q=' + city + '&APPID=' + APIKey + '&units=imperial';
  $.ajax( {
    url: currentUrl,
    method: 'GET',
  })
  .then(function (response) {

    console.log(response);

    var weatherIcon = response.weather[0].icon;
    var iconURL = 'https://openweathermap.org/img/wn/' + weatherIcon + '.png';

    var date = new Date(response.dt * 1000).toLocaleDateString();
    var lat = response.coord.lat;
    var lon = response.coord.lon;

    $(currentCity).html(response.name + '(' + date + ')' + '<img src' + iconURL + '>');
    $(currentTemp).html(response.main.temp + '&#8457');
    $(currentHumidity).html(response.main.humidity + '%');
    $(currentWind).html(response.wind.speed + 'MPH');

    fetchFiveDayForecast(lat, lon);
    if (response.cod == 200) {
      previousCities = JSON.parse(localStorage.getItem('cityname'));
      console.log(previousCities);
      if (previousCities == null) {
        previousCities = [];
        previousCities.push(city.toUpperCase()
        );
        localStorage.setItem('cityname', JSON.stringify(previousCities));
        addToList(city);
      }
      else {
        if (find(city) > 0) {
          previousCities.push(city.toUpperCase());
          localStorage.setItem('cityname', JSON.stringify(previousCities));
          addToList(city);
        }
      }
    }
  })
}

var fetchFiveDayForecast = function (lat, lon) {
  var fiveDayForecastURL = weatherApiRootUrl + 'data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + APIKey + '&units=imperial'; 
  $.ajax({
    url: fiveDayForecastURL,
    method: 'GET'
  }).then(function (response) {

    for (i = 0; i < 5; i++) {
      var date = new Date((response.list[((i + 1) * 8) - 1].dt) * 1000).toLocaleDateString();
      var iconcode = response.list[((i + 1) * 8) - 1].weather[0].icon;
      var iconurl = 'https://openweathermap.org/img/wn/' + iconcode + '.png';
      var temp = response.list[((i + 1) * 8) - 1].main.temp;
      var humidity = response.list[((i + 1) * 8) - 1].main.humidity;

      $('#day-' + i).html(date);
      $('#icon-' + i).html('<img src=' + iconurl + '>');
      $('#temp-' + i).html(temp + '&#8457');
      $('#humidity-' + i).html(humidity + '%');
    }
  });
}

function addToList(child) {
  var listEl = $('<li>' + child.toUpperCase() + '</li>');
  $(listEl).attr('class', 'list-group-item');
  $(listEl).attr('data-value', child.toUpperCase());
  $('#search-history').append(listEl);
}
function invokePastSearch(event) {
  var liEl = event.target;
  if (event.target.matches('li')) {
    city = liEl.textContent.trim();
    getWeatherCurrent(city);
  }
}

$('.clear').on('click', function () {
  event.preventDefault();
  if (previousCities.length === 0) {
  }
  else {
      previousCities = [];
      document.getElementById('search-history').remove();
      localStorage.removeItem('cityname');
      location.reload();
  }
})
function loadlastCity() {
  event.preventDefault();
  $('ul').empty();
  var previousCities = JSON.parse(localStorage.getItem('cityname'));
  if (previousCities !== null) {
    previousCities = JSON.parse(localStorage.getItem('cityname'));
    for (i = 0; i < previousCities.length; i++) {
      addToList(previousCities[i]);
    }
    city = previousCities[i - 1];
    getWeatherCurrent(city);
  }
}

$('#search-btn').on('click', displayWeather);
$('#search-input').keyup(function(event){
  if (event.keyCode === 13) {
    $('#search-btn').click();
  }
});
$(document).on('click', invokePastSearch);
$(window).on('load', loadlastCity);