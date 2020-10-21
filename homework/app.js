let working = true;
let started = false;
let resetBo = false;
let promoMinute = 25;
let promoSec = 0;
let shortMinute = 5;
let shortSec = 0;
let longMinute = 30;
let longSec = 0;
let sec = promoSec;
let minute = promoMinute;
let shortRound = 1;
document.querySelector("#short-break-minute").innerHTML = "0" + shortMinute;
document.querySelector("#long-break-minute").innerHTML = longMinute;
document.querySelector("#promo-minute").innerHTML = promoMinute;
document.querySelector("#main-minute").innerHTML = promoMinute;

//Fő gombok eseményei
let startBtn = document.querySelector("#start");
startBtn.addEventListener("mousedown", start);

let resetBtn = document.querySelector("#reset");
resetBtn.addEventListener("mousedown", reset);

function reset() {
    resetBo = true;
    minute = promoMinute;
    sec = promoSec;
    print(minute, sec);
    document.querySelector("#main-minute").innerHTML = minute;
}

function start() {
    started = true;
    resetBo = false;
    print(minute, sec);
}

window.setInterval(work, 1000);
window.setInterval(shortBreak, 1000);
window.setInterval(longBreak, 1000);



//Mellék gombok eseményei
//Promodoro
let promoPlusBtn = document.querySelector("#promo-plus");
let promoMinusBtn = document.querySelector("#promo-minus");
promoPlusBtn.addEventListener("mousedown", promoPlusMinute);
promoMinusBtn.addEventListener("mousedown", promoMinusMinute);

function promoPlusMinute() {
    promoMinute++;
    document.querySelector("#promo-minute").innerHTML = promoMinute;
}

function promoMinusMinute() {
    if (promoMinute > 10) {
        promoMinute--;
        document.querySelector("#promo-minute").innerHTML = promoMinute;
    }
}

//Short Breaks
let shortPlusBtn = document.querySelector("#short-plus");
shortPlusBtn.addEventListener("mousedown", shortPlusMinute);

let shortMinusBtn = document.querySelector("#short-minus");
shortMinusBtn.addEventListener("mousedown", shortMinusMinute);


function shortPlusMinute() {
    shortMinute++;
    if (shortMinute > 9) {
        document.querySelector("#short-break-minute").innerHTML = shortMinute;
    } else {
        document.querySelector("#short-break-minute").innerHTML = "0" + shortMinute;
    }
}

function shortMinusMinute() {
    if (shortMinute > 1) {
        shortMinute--;
    }
    if (shortMinute > 9) {
        document.querySelector("#short-break-minute").innerHTML = shortMinute;
    } else {
        document.querySelector("#short-break-minute").innerHTML = "0" + shortMinute;
    }
}

//Long Brakes
let longPlusBtn = document.querySelector("#long-plus");
longPlusBtn.addEventListener("mousedown", longPlusMinute);

let longMinusBtn = document.querySelector("#long-minus");
longMinusBtn.addEventListener("mousedown", longMinusMinute);

function longPlusMinute() {
    longMinute++;
    document.querySelector("#long-break-minute").innerHTML = longMinute;
}

function longMinusMinute() {
    if (longMinute > 15) {
        longMinute--;
        document.querySelector("#long-break-minute").innerHTML = longMinute;
    }
}

//A promodoro, és a szünetek metódusai
function work() {
    if (working && !resetBo && started) {
        sec--;
        if (sec === -1 && minute === 0) {
            working = false;
            print(shortMinute, shortSec);
            return;
        }
        if (sec === -1 && minute !== 0) {
            minute--;
        }
        if (sec === -1) {
            sec = 59;
        }
        print(minute, sec);
    }
}

function stopWork() {
    clearInterval(work);
}

function shortBreak() {

    if (!working && !resetBo && shortRound < 4) {
        shortSec--;
        if (shortSec === -1) {
            shortSec = 59;
            shortMinute--;
        }
        if (shortMinute === 0 && shortSec === 0) {
            working = true;
            sec = promoSec;
            minute = promoMinute;
        }
        print(shortMinute, shortSec);
    }
}

function longBreak() {

    if (!working && !resetBo && shortRound > 3) {
        longSec--;
        if (longSec === -1) {
            longSec = 59;
            longMinute--;
        }
        if (longMinute === 0 && longSec == -1) {
            working = true;
            sec = promoSec;
            minute = promoMinute;
        }
        print(longMinute, longSec);
    }
}


function print(minute, sec) {
    if (sec < 10) {
        document.getElementById("main-sec").innerHTML = "0" + sec;
    } else {
        document.getElementById("main-sec").innerHTML = sec;
    }
    if (minute < 10) {
        document.getElementById("main-minute").innerHTML = "0" + minute;
    } else {
        document.getElementById("main-minute").innerHTML = minute;
    }
}