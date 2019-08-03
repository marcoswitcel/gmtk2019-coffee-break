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
            SCENE_CONTEXT = {
                
            };


        }

        GameRenderer.clearRect('#FFF');

        var sprite = new Entity.Sprite({
            src: '',
            color: '#00ff00'
        });
        var obj = new Entity.Object({
            sprite : sprite,
            
            x : 50,
            y : 100,
            width : 200,
            height : 200,

    
            volMin: 20,
            volMax: 100,
            currVol: 0,
    
            fillable: true
        });

        GameRenderer.drawnEntity(obj);

        setTimeout(gameScene, 1000/60);
    };



    /**
     * Interface exportada
     */
    return {
        init: function() {
            GameRenderer.clearRect('#00ff00')

            LoadManager.loadAllAssets({
                    assetsResources: ["../assets/teste1","../assets/teste"]
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
    
    //ObjectEntity.prototype.


    return {
        Object: Object,
        Sprite: Sprite
    }
})();