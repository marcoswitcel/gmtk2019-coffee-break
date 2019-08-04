/*
| ------------
|  ENTIDADES
| ------------
*/
var Entity = (function scope() {
    /*
    | ------------
    |  SPRITE
    | ------------
    */
    var Sprite = function SpriteEntity(obj) {
        this.resource = obj.resource;
        this.color = obj.color;
    };
    /*
    | ------------
    |  BUTTON
    | ------------
    */
    var Button = function ButtonEntity(obj) {
        this.src = obj.src;
        this.sprite = obj.sprite;
        this.color = obj.color;
        this.x = obj.x;
        this.y = obj.y;
        this.width = obj.width;
        this.height = obj.height;
    };
    Button.prototype.update = function() {
        if (!window.isRunning) {
            this.sprite.color = "rgba(0,0,0,1)";
        } else {
            this.sprite.color = this.color;
        }
    }
    /*
    | ------------
    |  OBJECTS (usados para os sapatos e xícaras)
    | ------------
    */
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
            this.updatePosition(2);
        }
        if (this.fillable && !this._counted) {
            if (this.x > CONFIG.width/2) {
                this._counted = true;
                SceneManager.emit('add-cup');
            }
            
        }
    };
    /* Função re cuida da questão da linha */
    Object.prototype.updatePosition = function(increment) {
        if (!Object.prototype.upPoint) {
            Object.prototype.upPoint = CONFIG.width * 0.40;
            Object.prototype.rightPoint = CONFIG.height * 0.69;
            Object.prototype.downPoint = CONFIG.width * 0.57;
            Object.prototype.secondRightPoint = CONFIG.height * 0.87;
        }
        
        var pos = {
            x : this.x,
            y : this.y
        };
        
        var xPosIncremented = pos.x + increment;
        /**
         * Aiaiaiai que coisa feia
         */
        if (xPosIncremented > this.upPoint) {
            if (this.y > this.rightPoint && xPosIncremented <= this.downPoint) {
                this.y -= xPosIncremented - this.upPoint;
                this.x = this.upPoint;
            } else {
                if (xPosIncremented > this.downPoint && this.y < this.secondRightPoint) {
                    this.y += xPosIncremented - this.downPoint;
                    this.x = this.downPoint;
                }  else {
                    this.x += increment;    
                }
            }
        } else {
            this.x += increment;
        }
        
    };

    /*
    | ------------
    |  RENDERIZIBLES (usados para os objeto e xícaras)
    | ------------
    */
    var Renderizable = function RenderizableEntity(obj) {
        this.sprite = obj.sprite;
        this.x = obj.x;
        this.y = obj.y;
        this.width = obj.width;
        this.height = obj.height;
    }
    Renderizable.prototype.update = function() {

    }
    /*
    | ------------
    |  ANIMATION SEQUENCE (usados para os objeto e xícaras)
    | ------------
    */
    var AnimationSequence = function AnimationSequenceEntity(array, time) {
        this.array = array;
        this.time = time;
        this.lastFrame = 0;
    };
    /*
    | ------------
    |  INTERFACE DOS CONSTRUTORES
    | ------------
    */
    return {
        Object: Object,
        Sprite: Sprite,
        Button: Button,
        Renderizable: Renderizable,
        AnimationSequence: AnimationSequence
    }
})();