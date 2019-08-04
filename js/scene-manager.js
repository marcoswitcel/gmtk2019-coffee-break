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
        GameRenderer.drawEntities(SCENE_CONTEXT.cupList);
        GameRenderer.drawButton(new Entity.Button({
            src : "",
            color: "rgba(255,0,0,1)",
            x: 0,
            y: 0,
            width: 100,
            height: 100
        }));
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
        },
        //gameScene: gameScene
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

    var Button = function ButtonEntity(obj) {
        this.src = obj.src;
        this.color = obj.color;
        this.x = obj.x;
        this.y = obj.y;
        this.width = obj.width;
        this.height = obj.height;
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

    Button.prototype.update = function() {
        if (!window.isRunning) {
            this.color = "rgba(0,0,0,1)";
        }
    }


    return {
        Object: Object,
        Sprite: Sprite,
        Button:Button
    }
})();