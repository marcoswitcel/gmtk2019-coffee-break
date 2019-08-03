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



GameRenderer.renderScene(
    SceneManager.init
);
