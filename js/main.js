"use strict";


var CONFIG = {
    width: 800,
    height: 600
};

var CANVAS = document.querySelector("#canvas");
var CTX = CANVAS.getContext("2d");

CANVAS.width = CONFIG.width;
CANVAS.height = CONFIG.height
var FRAMES_PER_SECOND = 1000 / 600;


var isRunning = true;

GameRenderer.renderScene(
    SceneManager.init
);
function triggerKeydown(event) {
    if (event.keyCode == 32) {
        if (!isRunning) {
            isRunning = true;
            return;
        }
        isRunning = false;
    }
}
function triggerClick(event) {
    var x = event.clientX;
    var y = event.clientY;
    if ((x >= 268 && x <= 363) && (y >= 0 && y <= 100)) {
        if (!isRunning) {
            isRunning = true;
            return;
        }
        isRunning = false;
    }
}
window.addEventListener('keydown', triggerKeydown);
window.addEventListener('click', triggerClick);