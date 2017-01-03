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
