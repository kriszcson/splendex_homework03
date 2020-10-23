let working = true;
let started = false;
let reset = false;
let promoMinute = 25;
let promoSec = 0;
let shortMinute = 5;
let shortSec = 0;
let longMinute = 30;
let longSec = 0;
let shortRound = 0;
let minute = promoMinute;
let sec = promoSec;
let audio = new Audio("beep-04.wav");
document.querySelector("#main-minute").innerHTML = minute;
//Fő gombok eseményei
let startBtn = document.querySelector("#start");
startBtn.addEventListener("mousedown", startPromodoro);

let resetBtn = document.querySelector("#reset");
resetBtn.addEventListener("mousedown", resetPromodoro);

function resetPromodoro() {
    reset = true;
    minute = promoMinute;
    sec = promoSec;
    print(minute, sec);
    shortRound = 0;
}

function startPromodoro() {
    started = true;
    reset = false;
    print(minute, sec);
}




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
    if (promoMinute > 1) {
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

//Long Breaks
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
window.setInterval(turn, 1000);

function turn() {
    if (started && !reset) {
        sec--;
        if (sec === -1 && minute !== 0) {
            sec = 59;
            minute--;
        }
        if (minute === 0 && sec === -1) {
            audio.play();
            if (working) {
                if (shortRound < 3) {
                    shortBreak();
                    shortRound++;
                } else {
                    longBreak();
                    window.clearInterval(turn);
                    shortRound = 0;
                }
                working = false;
            } else {
                work();
                working = true;
            }
        }
        print(minute, sec);
    }
}

function work() {
    minute = promoMinute;
    sec = promoSec;
}

function shortBreak() {
    minute = shortMinute;
    sec = shortSec;
}


function longBreak() {
    minute = longMinute;
    sec = longSec;
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