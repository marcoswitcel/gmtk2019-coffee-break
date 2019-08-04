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
    var UIButton = function UIButtonEntity(obj) {
        this.sprite = new Entity.Sprite({ resource: null, color: obj.color})
        this.color = obj.color;
        this.colorHover = obj.colorHover;
        this.shadowColor = obj.shadowColor;
        this.x = obj.x;
        this.y = obj.y;
        this.text = obj.text;
        this.width = obj.width;
        this.height = obj.height;
        this.sceneToGo = obj.sceneToGo;
        this.hover = false;
    };
    UIButton.prototype.update = function() {
        var mouseData = Event.getMousePos();
        if (mouseData.x >= this.x && mouseData.x <= this.x + this.width &&
            mouseData.y >= this.y && mouseData.y <= this.y + this.height) {
                if (mouseData.clicked) {
                    SceneManager.changeScene(this.sceneToGo)
                }
            this.hover = true;
        } else {
            this.hover = false;
        }
    }
    UIButton.prototype.render = function() {
        /**
         * Sombra e e bloco principal
         */
        GameRenderer.drawRect({
            color: this.shadowColor,
            xStart: this.x + 0.1326530612244898*this.height,
            yStart: this.y + 0.1326530612244898*this.height,
            width: this.width,
            height: this.height
        });
        GameRenderer.drawRect({
            color: this.hover ? this.colorHover : this.color,
            xStart: this.x,
            yStart: this.y,
            width: this.width,
            height: this.height
        });
        var fontSize = 20;
        GameRenderer.drawText(this.text, this.x + this.width/2 - 20, this.y + this.height/2 + fontSize/2, fontSize);
    };
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
            this.updatePosition(RAMP_VEL);
        }
        if (this.fillable){
            if (Math.abs(CONFIG.width*0.48 - this.x) < 15) {
                SceneManager.changeScene('GAME_OVER');
            }
            if (!this._counted) {
                if (this.x > CONFIG.width*0.51) {
                    this._counted = true;
                    SceneManager.emit('add-cup');
                }
                
            }
        } 
    };
    /* Função re cuida da questão da linha */
    Object.prototype.updatePosition = function(increment) {
        if (!Object.prototype.upPoint) {
            Object.prototype.upPoint = CONFIG.width * 0.40;
            Object.prototype.rightPoint = CONFIG.height * 0.695;
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
        AnimationSequence: AnimationSequence,
        UIButton: UIButton
    }
})();