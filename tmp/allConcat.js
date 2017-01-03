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
