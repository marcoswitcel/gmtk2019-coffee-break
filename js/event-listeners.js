var Event = (function scope() {


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
        if (SceneManager.getScene() !== 'LOADING') {
            SceneManager.changeScene('GAME_SCENE');
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

    return {
        triggerKeydown: triggerKeydown,
        triggerClick: triggerClick
    }
})();



window.addEventListener('keydown', Event.triggerKeydown);
window.addEventListener('click', Event.triggerClick);