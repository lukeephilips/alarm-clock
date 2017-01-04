var Alarm = require('./../js/alarm.js').alarmModule;

$(document).ready(function() {
  var now = moment();
  var userAlarm = null;
  var userAlarm2 = null;


  $(".alarm-form").submit(function(event) {
    event.preventDefault();
    var alarmTimeInput = $("#user-input-time").val();
    userAlarm = new Alarm(moment(alarmTimeInput,'HH:mm'));
    $('.alarm').text(alarmTimeInput);
  });

  $(".alarm-form-2").submit(function(event) {
    event.preventDefault();
    var alarmTimeInput2 = $("#user-input-time-2").val();
    userAlarm2 = new Alarm(moment(alarmTimeInput2,'HH:mm'));
    $('.alarm-2').text(alarmTimeInput2);
  });

  currentTime = now.format("HH:mm");

  $(".clock").text(currentTime);
  setInterval(function(){
    now = moment();
    currentTime = now.format("HH:mm");
    $(".clock").text(currentTime);

    if (userAlarm !== null && now >= userAlarm.alarmTime && !userAlarm.hasAlerted){
      userAlarm.hasAlerted = true;
      $('.alarm-image').attr("src", userAlarm.randomAlert());
      $(".alarm-alert").show();
      $('.alarm').css("color", "darkred");
    }
    if (userAlarm2 !== null && now >= userAlarm2.alarmTime && !userAlarm2.hasAlerted){
      userAlarm2.hasAlerted = true;
      $('.alarm-image').attr("src", userAlarm2.randomAlert());
      $(".alarm-alert").show();
      $('.alarm').css("color", "darkred");
    }
  }, 5000);

  $("#disable").click(function(){
    $(".alarm-alert").hide();
    $('.alarm').css("color", "darkblue");
  });

  $("#snooze").click(function(){
    $(".alarm-alert").hide();
    setTimeout(function(){
      $(".alarm-alert").show();
      $('.alarm-image').attr("src", userAlarm.randomAlert());
    }, 5000);
  });
});

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
