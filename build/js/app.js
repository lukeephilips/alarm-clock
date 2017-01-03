(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
var Alarm = require('./../js/alarm.js').alarmModule;

$(document).ready(function() {
  var now = moment();
  var userAlarm = null;

  $("form").submit(function(event) {
    event.preventDefault();
    var alarmTimeInput = $("#user-input-time").val();
    userAlarm = new Alarm(moment(alarmTimeInput,'HH:mm'));
    $('.alarm').text(alarmTimeInput);
  });

  currentTime = now.format("HH:mm");
  console.log(currentTime);

  $(".clock").text(currentTime);
  setInterval(function(){
    now = moment();
    currentTime = now.hours() + ":" + now.minutes();
    $(".clock").text(currentTime);

    if (userAlarm !== null && now >= userAlarm.alarmTime && !userAlarm.hasAlerted){
      userAlarm.hasAlerted = true;
      $('.alarm-image').attr("src", userAlarm.randomAlert());
      $(".alarm-alert").show();
    }
  }, 10000);

  $("#disable").click(function(){
    $(".alarm-alert").hide();
  });
});

},{"./../js/alarm.js":1}]},{},[2]);
