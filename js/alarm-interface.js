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
