// 00:00:00
// setDigit(1,2);
function setDigit(position, digit) {
    var digitSelector = "#digit-" + position;
    var divDigit = $(digitSelector);
    divDigit.removeClass();
    var digitClass = "num-" + digit;
    divDigit.addClass(digitClass);
}

function setDay(dow) {
    var daySelector = "#day-" + dow;
    var divDay = $(daySelector);
    $('span.day').removeClass('today');
    divDay.addClass('today');
}

function setAM(){
    ampm.html('AM');
    return 'yay';
}

function setPM(){
    ampm.html('PM');
    return 'woo';
}

var ampm = $('#AMPM');
var userAlarmTime = [];

function renderAlarms() {
    var html;
    html = "Your Alarms!";
    html += "<ul>";
    userAlarmTime.forEach(function(alarmTime, index){
        html += "<li>" + alarmTime.humanizedTime + "<button class='deleteAlarm'>X</button>" + "</li>"
    });
    html += "</ul>";

    $('#alarmKeeper').html(html);

    $('.deleteAlarm').click(function() {
        console.log("clicked~");
        delete_alarm();
        persistAlarms();
        return false;
    });
}

function persistAlarms() {
    localStorage.setItem('objectAlarm', JSON.stringify(userAlarmTime));
}

function delete_alarm(index){
    console.log(index);
    userAlarmTime.splice(index, 1);
    renderAlarms();
}

function updateTime() {
    var now = moment().format('hhmmss a');
    for (var i = 0; i <= 5; i++) {
        setDigit(i, now[i]);
    }
    toggleMeridiem(now[7]);

    for (i=0; i < userAlarmTime.length; i++) {
        if (now === userAlarmTime[i].momentTime) {
            alarmTheUser();
        }
    }
    setDay(moment().day());
}

function alarmTheUser() {
    $('#alarmSound').get(0).play();
    alert("BEEP BEEP BEEP!");
}

function toggleMeridiem(a) {
    if (a === "a"){
        setAM();
    } else {
        setPM();
    }
}

function getUserAlarm() {
    var userHour = $('#alarmHour').val();
    var userMinute = $('#alarmMinute').val();
    var userMeridiem = $('#alarmMeridiem').val();
    var peopleTime = userHour + ":" + userMinute + userMeridiem;
    var alarmTime = userHour + userMinute + "00" + " " + userMeridiem;

    if (userHour === "" || userMinute === "" || userMeridiem === "") {
        alert('Please put in a completed alarm time, thanks! :D ');
        removeClass('a-bell-slash-o');
    }

    var objectTime = {
        momentTime: alarmTime,
        humanizedTime: peopleTime
    };

    return objectTime;
}

$ ( function (){
    if (localStorage.getItem('objectAlarm') == null) {
        userAlarmTime = [];
    } else {
        userAlarmTime = JSON.parse(localStorage.getItem('objectAlarm'));
    };
    renderAlarms();

    updateTime();
    $(".chosen-select").chosen({max_selected_options: 5});

    $(".stopAlarm").click(function() {
        console.log('clicked!');
        $('#alarmSound').get(0).pause();
        $('#alarmicon').removeClass('fa-bell-o').addClass('fa-bell-slash-o');
        return false;
    });

    window.setInterval(function (){
        updateTime();
    }, 1000);

    $('.saveAlarm').click(function(){
        console.log('clicked!');
        if (userAlarmTime.length > 4) {
            alert('sorry, too many cooks! (alarms)');
            return false;
        }
        userAlarmTime.push(getUserAlarm());
        persistAlarms();
        $('#alarmicon').removeClass('fa-bell-slash-o').addClass('fa-bell-o');
        renderAlarms();
        return false;
    });
});