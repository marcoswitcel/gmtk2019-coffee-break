var GameRenderer = (function scope() {

    var drawEntity = function(obj) {
        if (obj.update) {
            obj.update();
        }
        if (obj.render) {
            obj.render();
        } else if (obj.sprite.resource) {
            drawImage({
                image: obj.sprite.resource,
                xStart: obj.x - obj.width / 2,
                yStart: obj.y - obj.height / 2,
                width: obj.width,
                height: obj.height
            })
        } else {
            CTX.fillStyle = obj.sprite.color;
            CTX.fillRect(obj.x, obj.y, obj.width, obj.height);
        }
    };

    var drawEntities = function(lista) {
        for (var i = 0; i < lista.length; i++) {
            drawEntity(lista[i])
        }
    };

    var drawRect = function drawRect(obj) {
        CTX.fillStyle = obj.color;
        CTX.fillRect(obj.xStart, obj.yStart, obj.width, obj.height);
    };

    var drawImageBackground = function drawImageBackground(ref, obj) {
        CTX.drawImage(ref, 0, 0, CONFIG.width, CONFIG.height);
    };

    var drawImage = function drawImage(obj) {
        CTX.drawImage(obj.image, obj.xStart, obj.yStart, obj.width, obj.height);
    };

    var drawText = function drawText(text, x, y, fontSize, color) {
        fontSize = typeof fontSize !== 'undefined' ? fontSize : 24;
        CTX.fillStyle = color ? color : "#FFF";
        CTX.font = fontSize + "px PixelOperator";
        CTX.fillText(text, x, y);
    };

    var clearRect = function clearRect(color) {
        color = color ? color : '#00ff00';
        drawRect({
            color: color,
            xStart: 0,
            yStart: 0,
            width: CONFIG.width,
            height: CONFIG.height
        });
    }

    return {
        clearRect: clearRect,
        drawRect: drawRect,
        drawImageBackground: drawImageBackground,
        drawImage: drawImage,
        drawEntity: drawEntity,
        drawEntities: drawEntities,
        drawText: drawText
    }
})();