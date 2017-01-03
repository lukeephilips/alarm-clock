var apiKey = require('./../.env').apiKey;

$(document).ready(function() {
  $(".weather-form").submit(function(event) {
    event.preventDefault();
    var location = $('#user-input-location').val();
    $('#user-input-location').val("");
    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + location + '&appid=' + apiKey + '&units=imperial', function(response) {
      $('.weather-display').show();
      $('#weather-temp').text(response.main.temp);
      $('#weather-description').text(response.weather[0].description);
      $('#weather-humidity').text(response.main.humidity);
      $('#weather-name').text(response.name);
    });
  });
});
