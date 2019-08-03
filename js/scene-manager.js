var SceneManager = (function scope() {

    var SCENES = {
        LOADING: 'LOADING',
        MENU: 'MENU',
        GAME_SCENE: 'GAME_SCENE',
        CREDIT_SCREEN: 'CREDIT_SCREEN',
    }

    var SCENES = SCENES.LOADING;

    /**
     * Interface exportada
     */
    return {
        init: function() {
            CTX.fillStyle = '#00ff00';
            CTX.fillRect(0, 0, 800, 600);
        }, 

        menu: function() {
            CTX.fillStyle = '#FFF';
            CTX.fillRect(0, 0, 800, 600);
        } 
    }
})();