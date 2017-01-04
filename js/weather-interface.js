var apiKey = require('./../.env').apiKey;
var weatherMap = require('./../js/weather.js').mapModule;

$(document).ready(function() {
  var userMap = null;

  $(".weather-form").submit(function(event) {
    event.preventDefault();
    var location = $('#user-input-location').val();
    $('#user-input-location').val("");
    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + location + '&appid=' + apiKey + '&units=imperial').then(function(response) {
      $('.weather-display').show();
      $('#weather-temp').text(response.main.temp);
      $('#weather-description').text(response.weather[0].description);
      $('#weather-humidity').text(response.main.humidity);
      $('#weather-name').text(response.name);

      $("#map").show();
      var latitude = response.coord.lat;
      var longitude = response.coord.lon;
      userMap = new weatherMap(latitude, longitude);
    }).fail(function(error){
      $('#error').text(error.responseJSON.message);
    });
  });

  $("#new-map-info").click(function(){
    var coordinates = userMap.map.getCenter();
    var coords = "lat=" + coordinates.lat.toFixed(2) + "&lon=" + coordinates.lng.toFixed(2);
    console.log(coords);

    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + coords + '&appid=' + apiKey + '&units=imperial', function(response) {
      console.log(response.coord.lat+ " - " + response.coord.lon);
      $('.weather-display').show();
      $('#weather-temp').text(response.main.temp);
      $('#weather-description').text(response.weather[0].description);
      $('#weather-humidity').text(response.main.humidity);
      $('#weather-name').text(response.name);
    });
  });
});
