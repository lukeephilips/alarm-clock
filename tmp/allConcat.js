var Alarm = require('./../js/alarm.js').alarmModule;

$(document).ready(function() {
  var now = moment();
  var userAlarm = null;

  $(".alarm-form").submit(function(event) {
    event.preventDefault();
    var alarmTimeInput = $("#user-input-time").val();
    userAlarm = new Alarm(moment(alarmTimeInput,'HH:mm'));
    $('.alarm').text(alarmTimeInput);
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
  }, 10000);

  $("#disable").click(function(){
    $(".alarm-alert").hide();
    $('.alarm').css("color", "darkblue");
  });
});

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
