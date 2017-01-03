(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "b5504f287bf6791332ce5bcbc92531c0";

},{}],2:[function(require,module,exports){
function Alarm(alarmTime) {
  this.alarmTime = alarmTime;
  this.hasAlerted = false;
}
Alarm.prototype.randomAlert = function() {
  var alertImages = ['https://media.giphy.com/media/6GY01XQBkf3lS/giphy.gif','http://bestanimations.com/HomeOffice/Clocks/Alarm/funny-alarm-clock-animated-gif-16.gif','https://media.giphy.com/media/gBW8Qgfaa2ije/giphy.gif','http://bestanimations.com/HomeOffice/Clocks/Alarm/funny-alarm-clock-animated-gif-6.gif'];

  var randIndex = Math.floor(Math.random()* alertImages.length);

  return alertImages[randIndex];
};
exports.alarmModule = Alarm;

},{}],3:[function(require,module,exports){
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

},{"./../.env":1,"./../js/alarm.js":2}]},{},[3]);
