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
