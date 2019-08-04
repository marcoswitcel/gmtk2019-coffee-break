"use strict";
var CONFIG = {
    width: 600 * 1.6/* aspect ratio */,
    height: 600
};

var CANVAS = document.querySelector("#canvas");
var CTX = CANVAS.getContext("2d");
var FRAMES_PER_SECOND = 1000 / 600;
var isRunning = true;
var RAMP_VEL = 2;
var FLOW_SPEED = 30/60;


var main = function () {
    CANVAS.width = CONFIG.width;
    CANVAS.height = CONFIG.height    

    document.querySelector('#loadingAsset').style.display = 'none';

    /* Inicializa as cenas e gerencia o estado */
    SceneManager.init()
};