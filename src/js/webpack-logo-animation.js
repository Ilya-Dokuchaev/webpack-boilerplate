/*
 * Copyright (c) 2023. MIT license
 */

// https://webpack.js.org/

// Javascript page visibility api has been used to fixes the bug of the animation.

let setIntervalId;
const intervalDelay = 2000;
let intervalRunning = false;

let i = 0;
let rotateValue1 = 90;
let rotateValue2 = -90;
const topFace = [
    "1px 6px 6px 1px",
    "1px 1px 6px 6px",
    "6px 1px 1px 6px",
    "6px 6px 1px 1px",
];
const side1 = ["1px 6px 6px 1px", "1px 1px 6px 6px", "1px", "1px"];
const side2 = ["1px", "1px", "1px 1px 6px 6px", "1px 6px 6px 1px"];
const side3 = ["1px 6px 6px 1px", "1px", "1px", "1px 1px 6px 6px"];
const side4 = ["1px", "1px 6px 6px 1px", "1px 1px 6px 6px", "1px"];

document.querySelector("body").onload = function () {
    webpackAnimation();
    setIntervalId = setInterval(webpackAnimation, intervalDelay);
};

function webpackAnimation() {
    intervalRunning = true;
    document.querySelector(".cube1").style.transform = "rotateY(" + rotateValue1 + "deg)";
    if(i > 3) {
        i = 0;
    }
    document.querySelector('.text__header-title--animated').classList.toggle('active');
    document.querySelector(".cube1 .face_top").style.borderWidth = topFace[i];
    document.querySelector(".cube1 .face_side_1").style.borderWidth = side1[i];
    document.querySelector(".cube1 .face_side_2").style.borderWidth = side2[i];
    document.querySelector(".cube1 .face_side_3").style.borderWidth = side3[i];
    document.querySelector(".cube1 .face_side_4").style.borderWidth = side4[i];

    rotateValue1 += 90;
    i++;

    document.querySelector(".cube2").style.transform = "translate(-50%, -50%) scale3d(0.5, 0.5, 0.5) rotateY("
        + rotateValue2
        + "deg)";

    rotateValue2 -= 90;
}

// Set the name of the "hidden" property and the change event for visibility
let hidden;
let
    visibilityChange;
if(typeof document.hidden !== "undefined") {
    hidden = "hidden";
    visibilityChange = "visibilitychange";
} else if(typeof document.mozHidden !== "undefined") {
    // Firefox up to v17
    hidden = "mozHidden";
    visibilityChange = "mozvisibilitychange";
} else if(typeof document.webkitHidden !== "undefined") {
    // Chrome up to v32, Android up to v4.4, Blackberry up to v10
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
}

function handleVisibilityChange() {
    if(document[hidden]) {
        clearInterval(setIntervalId);
        intervalRunning = false;
    } else {
        clearInterval(setIntervalId);
        if(!intervalRunning) setIntervalId = setInterval(webpackAnimation, intervalDelay);
    }
}

// Warn if the browser doesn't support addEventListener or the Page Visibility API
if(
    typeof document.addEventListener === "undefined"
    || typeof document[hidden] === "undefined"
) {
    console.warn(
        "This demo requires a modern browser that supports the Page Visibility API.",
    );
} else {
    // Handle page visibility change
    document.addEventListener(visibilityChange, handleVisibilityChange, false);
}
