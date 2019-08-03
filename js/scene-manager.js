var SceneManager = (function scope() {

    var SCENES = {
        LOADING: 'LOADING',
        MENU: 'MENU',
        GAME_SCENE: 'GAME_SCENE',
        CREDIT_SCREEN: 'CREDIT_SCREEN',
    }

    var ACTUAL_SCENES = SCENES.LOADING;

    var index = 0;
    var SCENE_CONTEXT = null;

    var gameScene = function() {

        if (!SCENE_CONTEXT) {



            var wave = new GameWave(1, 15, 0.6, 0.8, 0.1);
            var list = window.cupManager.generateObjects(wave);

            SCENE_CONTEXT = {
                cupList: list
            };
        }

        GameRenderer.clearRect('#FFF');

       

        GameRenderer.drawnEntities(SCENE_CONTEXT.cupList);

        setTimeout(gameScene, 1000/60);
    };



    /**
     * Interface exportada
     */
    return {
        init: function() {
            GameRenderer.clearRect('#00ff00')

            LoadManager.loadAllAssets({
                    assetsResources: ["assets/teste2.png","assets/teste.jpg"]
                },
                SceneManager.menu
            );
        }, 

        menu: function() {
            
            gameScene();
        } 
    }
})();

/**
 * Entidades
 */
var Entity = (function scope() {

    var Sprite = function SpriteEntity(obj) {
        this.src = obj.src;
        this.color = obj.color;
    };

    var Object = function ObjectEntity(obj) {
        this.sprite = obj.sprite;
        this.x = obj.x;
        this.y = obj.y;
        this.width = obj.width;
        this.height = obj.height;

        this.volMin = obj.volMin;
        this.volMax = obj.volMax;
        this.currVol = obj.currVol;

        this.fillable = obj.fillable;
    };
    
    Object.prototype.update = function() {
        if (window.isRunning) {
            this.x += 5;
        }
    }


    return {
        Object: Object,
        Sprite: Sprite
    }
})();