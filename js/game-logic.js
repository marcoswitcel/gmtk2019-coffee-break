window.GameObject = function(name, minVol, maxVol, fillable) {
    name = name ? name : "";
    minVol = minVol ? minVol : 1;
    maxVol = maxVol ? maxVol : 99;
    curVol = 0;
    // debugger;
    fillable = typeof(fillable) != 'undefined' ? fillable : true;
    sprite = null;
    xPos = 0;
    yPos = 0;

    function getMinVol(){
        return minVol;
    }
    function getMaxVol(){
        return maxVol;
    }
    function getCurVol(){
        return curVol;
    }
    function isFillable(){
        return fillable;
    }
    function getSprite(){
        return sprite;
    }
    function setSprite(value){
        sprite = value;
    }
    function setXPos(value){
        xPos = value;
    }
    function setYPos(value){
        yPos = value;
    }
    
    return {
        getMinVol:getMinVol,
        getMaxVol:getMaxVol,
        getCurVol:getCurVol,
        isFillable:isFillable,
        getSprite:getSprite,
        setSprite:setSprite,
        setXPos:setXPos,
        setYPos:setYPos
    }
}

window.GameWave = function(id, size, cupRatio, maxVolVar, minVolVar) {
    id = id ? id : 0;
    size = size ? size : 5;
    cupRatio = cupRatio ? cupRatio : 0.5;
    maxVolVar = maxVolVar ? maxVolVar : 0.5;
    minVolVar = minVolVar ? minVolVar : 0.5;

    function getId(){
        return id;
    }
    function getSize(){
        return size;
    }
    function getCupRatio(){
        return cupRatio;
    }
    function getMaxVolVar(){
        return maxVolVar;
    }
    function getMinVolVar(){
        return minVolVar;
    }

    return {
        getId:getId,
        getSize:getSize,
        getCupRatio:getCupRatio,
        getMaxVolVar:getMaxVolVar,
        getMinVolVar:getMinVolVar,

    }

}

window.cupManager = (function () {

    function getRandom(max, min){
        return Math.floor(Math.random() * (max - min)) + min; 
    }
    
    function generateMaxVol(maxVolVar){
        // debugger;
        if (maxVolVar > 1) {
            maxVolVar = 1;
        }
        if (maxVolVar < 0.1) {
            maxVolVar = 0.1;
        }

        return getRandom(1000 * maxVolVar, 100);
    }

    function generateMinVol(mx, minVolVar){
         
        if (minVolVar > 1) {
            minVolVar = 1;
        }
        if (minVolVar <= 0.1) {
            minVolVar = 0.1;
        }
        var margin = mx * 0.2;
        var n = Math.floor(getRandom(mx - margin, margin));

        if (n > mx) {
            return Math.floor((mx - margin) * 0.5);
        } else {
            return n;
        }
 
    }

    function generateType(ratio){
        if (ratio > 1 || ratio < 0.1) {
            ratio = 0.5;
        }
        var limit = 100 * ratio;
        var n = getRandom(100, 1);
        if (n < limit) {
            return true; //if value is within limit, it's fillable
        } 
        
        return false;
    }

    function generateObjects(wave){
        //var wave = new GameWave(1, 5);
        if (wave.getSize() == 0) {
            return [];
        }
        var obj;
        var generated = 0;
        var list = [];
        var max, min, ration;
        while (generated < wave.getSize()) {
            max = generateMaxVol(wave.getMaxVolVar());
            min = generateMinVol(max, wave.getMinVolVar());
            type = generateType(wave.getCupRatio());
            var sprite = new Entity.Sprite({
                src: '',
                color: '#00ff00'
            });
            var obj = new Entity.Object({
                sprite : sprite,
                id: generated,
                x : 50 + (generated * 300) - wave.getSize() * 300,
                y : 500,
                width : 40,
                height : 50,
                volMin: min,
                volMax: max,
                currVol: 0,
                fillable: type
            });
            list.push(obj);
            generated++;
        }
        return list;
    }

    function runTest(){
        var wave = new GameWave(1, 15, 0.6, 0.8, 0.1);
        generateObjects(wave);
    }

    return {
        generateObjects:generateObjects,
        runTest:runTest
    }
})();