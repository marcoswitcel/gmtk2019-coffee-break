var GameRenderer = (function scope() {

    var  drawnEntity = function(obj) {
        obj.update();
        
        CTX.fillStyle = obj.sprite.color;
        CTX.fillRect(obj.x, obj.y, obj.width, obj.height);
    };

    var  drawnEntities = function(lista) {
        for(var i = 0; i < lista.length; i++) {
            drawnEntity(lista[i])
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
        drawnEntity: drawnEntity,
        drawnEntities: drawnEntities
    }
})();