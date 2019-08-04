var Event = (function scope() {


    function triggerKeydown(event) {
        if (SceneManager.getScene() === 'GAME_SCENE' && event.keyCode == 32) {
            isRunning = false;
        }
    }
    function triggerKeyUp(event) {
        if (SceneManager.getScene() === 'GAME_SCENE' && event.keyCode == 32) {
            isRunning = true;
        }
    }
    function triggerClick(event) {
        if (SceneManager.getScene() === 'MENU') {
            MOUSE.clicked = true;
        }
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
    var MOUSE = { x: 0, y: 0, clicked: false};
    var mousePos = function mousePos(event) {
        MOUSE.x = event.clientX - CANVAS.offsetLeft;
        MOUSE.y = event.clientY - CANVAS.offsetTop;
    };
    var getMousePos = function getMousePos() {
        return {
            x: MOUSE.x,
            y: MOUSE.y,
            clicked: MOUSE.clicked
        }
    };

    window.addEventListener('keydown', triggerKeydown);
    window.addEventListener('keyup', triggerKeyUp);
    window.addEventListener('click', triggerClick);
    document.querySelector("#canvas").addEventListener('mousemove', mousePos);

    return {
        getMousePos: getMousePos
    }
})();