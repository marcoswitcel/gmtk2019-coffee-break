var GameRenderer = (function scope() {

    var  drawEntity = function(obj) {
        obj.update();
        CTX.fillStyle = obj.sprite.color;
        CTX.fillRect(obj.x, obj.y, obj.width, obj.height);
    };

    var drawButton = function(btn) {
        btn.update();
        CTX.fillStyle = btn.color;
        CTX.fillRect(btn.x, btn.y, btn.width, btn.height);
    };

    var  drawEntities = function(lista) {
        for(var i = 0; i < lista.length; i++) {
            drawEntity(lista[i])
        }
    };

    return {
        renderScene: function(sceneStartFunction) {
            sceneStartFunction();
        },
        clearRect: function(color) {
            color = color ? color : '#00ff00';
            CTX.fillStyle = color;
            CTX.fillRect(0, 0, 800, 600);
        },
        drawEntity: drawEntity,
        drawEntities: drawEntities,
        drawButton: drawButton
    }
})();