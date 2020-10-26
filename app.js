let working = true;
let started = false;
let reset = false;
let set = true;
let promoMinute = 25;
let promoSec = 0;
let shortMinute = 5;
let shortSec = 0;
let longMinute = 25;
let longSec = 0;
let shortRound = 0;
let minute = promoMinute;
let sec = promoSec;
let promoRound = 1;
let audio = new Audio("beep-04.wav");
document.querySelector(".main-minute").innerHTML = minute;
let timeRound = (minute * 60 + sec) / (promoMinute * 60 + promoSec) * 100;
//Fő gombok eseményei
let startBtn = document.querySelector(".start");
startBtn.addEventListener("mousedown", startPromodoro);

let resetBtn = document.querySelector(".reset");
resetBtn.addEventListener("mousedown", resetPromodoro);

function resetPromodoro() {
    reset = true;
    set = true;
    minute = promoMinute;
    sec = promoSec;
    print(minute, sec);
    shortRound = 0;
}

function startPromodoro() {
    if (started) {
        started = false;
    } else {
        started = true;
    }
    reset = false;
    set = false;
    print(minute, sec);
    document.querySelector(".promodoro").innerHTML = "Promodoro" + promoRound;
}
//Mellék gombok eseményei
//Promodoro
let promoPlusBtn = document.querySelector(".promo-plus");
let promoMinusBtn = document.querySelector(".promo-minus");
promoPlusBtn.addEventListener("mousedown", promoPlusMinute);
promoMinusBtn.addEventListener("mousedown", promoMinusMinute);

function promoPlusMinute() {
    if (set) {
        promoMinute++;
        document.querySelector(".promo-minute").innerHTML = promoMinute;
    }
}

function promoMinusMinute() {
    if (promoMinute > 1 && set) {
        promoMinute--;
        document.querySelector(".promo-minute").innerHTML = promoMinute;
    }
}

//Short Breaks
let shortPlusBtn = document.querySelector(".short-plus");
shortPlusBtn.addEventListener("mousedown", shortPlusMinute);

let shortMinusBtn = document.querySelector(".short-minus");
shortMinusBtn.addEventListener("mousedown", shortMinusMinute);


function shortPlusMinute() {
    if (set) {
        shortMinute++;
        if (shortMinute > 9) {
            document.querySelector(".short-break-minute").innerHTML = shortMinute;
        } else {
            document.querySelector(".short-break-minute").innerHTML = "0" + shortMinute;
        }
    }
}

function shortMinusMinute() {
    if (shortMinute > 1 && set) {
        shortMinute--;
    }
    if (shortMinute > 9) {
        document.querySelector(".short-break-minute").innerHTML = shortMinute;
    } else {
        document.querySelector(".short-break-minute").innerHTML = "0" + shortMinute;
    }
}

//Long Breaks
let longPlusBtn = document.querySelector(".long-plus");
longPlusBtn.addEventListener("mousedown", longPlusMinute);

let longMinusBtn = document.querySelector(".long-minus");
longMinusBtn.addEventListener("mousedown", longMinusMinute);

function longPlusMinute() {
    if (set) {
        longMinute++;
        document.querySelector(".long-break-minute").innerHTML = longMinute;
    }
}

function longMinusMinute() {
    if (longMinute > 15 && set) {
        longMinute--;
        document.querySelector(".long-break-minute").innerHTML = longMinute;
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
            //A Hang lejátszása
            audio.play();
            if (working) {
                if (shortRound < 3) {
                    shortBreak();
                    shortRound++;
                } else {
                    longBreak();
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
    promoRound++;
    minute = promoMinute;
    sec = promoSec;
    document.querySelector(".promodoro").innerHTML = "Promodoro" + promoRound;

}

function shortBreak() {
    minute = shortMinute;
    sec = shortSec;
    document.querySelector(".promodoro").innerHTML = "Short Break";
}


function longBreak() {
    minute = longMinute;
    sec = longSec;
    document.querySelector(".promodoro").innerHTML = "Long Break";
    promoRound = 0;
}

function print(minute, sec) {
    if (sec < 10) {
        document.querySelector(".main-sec").innerHTML = "0" + sec;
    } else {
        document.querySelector(".main-sec").innerHTML = sec;
    }
    if (minute < 10) {
        document.querySelector(".main-minute").innerHTML = "0" + minute;
    } else {
        document.querySelector(".main-minute").innerHTML = minute;
    }
}