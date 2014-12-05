// 00:00:00
// setDigit(1,2);
function setDigit(position, digit) {
    var digitSelector = "#digit-" + position;
    var divDigit = $(digitSelector);
    divDigit.removeClass();
    var digitClass = "num-" + digit;
    divDigit.addClass(digitClass);
}

$ ( function (){
    updateTime();
});

function setAM(){
    $('#AMPM').html("AM");
    return 'yay';
}

function setPM(){
    $('#AMPM').html("PM");
    return 'woo';
}

function updateTime() {
    var now = moment().format('hhmmss a');
    for (var i = 0; i <= 5; i++) {
        setDigit(i, now[i]);
    }
    toggleMeridiem(now[7]);
    // if moment returns AM, setAM()
    // else setPM()
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
