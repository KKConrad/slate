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
    $('#AMPM').html("AM");
    return 'yay';
}

function setPM(){
    $('#AMPM').html("PM");
    return 'woo';
}

$ ( function (){
    updateTime();
    $(".chosen-select").chosen({max_selected_options: 5});

    $(".stopAlarm").click(function() {
        console.log('clicked!');
        $('#alarmSound').get(0).pause();
        $('#alarmicon').removeClass('fa-bell-o').addClass('fa-bell-slash-o');
        return false;
    });

    $('.saveAlarm').click(function(){
        console.log('clicked!');
        userAlarmTime.push(getUserAlarm());
        $('#alarmicon').removeClass('fa-bell-slash-o').addClass('fa-bell-o');
        renderAlarms();
        return false;
    });
});

var userAlarmTime = [];

function renderAlarms() {
    var html;

    html = "<ul>";
    userAlarmTime.forEach(function(alarmTime, index){
        html += "<li>" + alarmTime + "</li>"
    });
    html += "</ul>";

    $('#alarmKeeper').html(html);
}

function updateTime() {
    var now = moment().format('hhmmss a');
    for (var i = 0; i <= 5; i++) {
        setDigit(i, now[i]);
    }
    toggleMeridiem(now[7]);

        for (i=0; i < userAlarmTime.length; i++) {
            if (now === userAlarmTime[i]) {
                $('#alarmSound').get(0).play();
            }
        }

    setDay(moment().day());
}


window.setInterval(function (){
    updateTime();
}, 1000);

function toggleMeridiem(a) {
    if (a === "a"){
        setAM();
    } else {
        setPM();
    }
}

// poops out a string with the format 'hhmmss a'
function getUserAlarm() {
    var userHour = $('#alarmHour').val();
    var userMinute = $('#alarmMinute').val();
    var userMeridiem = $('#alarmMeridiem').val();

    var alarmTime = userHour + userMinute + "00" + " " + userMeridiem;
    if (userHour === "" || userMinute === "" || userMeridiem === "") {
        alert('Please put in a completed alarm time, thanks! :D ');
        removeClass('a-bell-slash-o');
    }
    return alarmTime;
}

    //

function setAlarm() {
    $('#')
}

// if now is equal to alarm time, pop an alert box