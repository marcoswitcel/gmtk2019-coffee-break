window.GameWave = function(id, size, cupRatio, maxVolVar, minVolVar) {
    id = id ? id : 0;
    size = size ? size : 5;
    cupRatio = cupRatio ? cupRatio : 0.5;
    maxVolVar = maxVolVar ? maxVolVar : 0.5;
    minVolVar = minVolVar ? minVolVar : 0.5;

    function getId() {
        return id;
    }

    function getSize() {
        return size;
    }

    function getCupRatio() {
        return cupRatio;
    }

    function getMaxVolVar() {
        return maxVolVar;
    }

    function getMinVolVar() {
        return minVolVar;
    }

    return {
        getId: getId,
        getSize: getSize,
        getCupRatio: getCupRatio,
        getMaxVolVar: getMaxVolVar,
        getMinVolVar: getMinVolVar,

    }

}

window.cupManager = (function() {

    function getRandom(max, min) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function generateMaxVol(maxVolVar) {
        // debugger;
        if (maxVolVar > 1) {
            maxVolVar = 1;
        }
        if (maxVolVar < 0.1) {
            maxVolVar = 0.1;
        }

        return getRandom(1000 * maxVolVar, 100);
    }

    function generateMinVol(mx, minVolVar) {

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

    function generateType(ratio) {
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

    var randomCupSprite = function() {
        return [
            'xicara1',
            'xicara2',
            'xicara3',
            'xicara4',
            'cuia'
        ][Math.floor(Math.random() * 5)]
    };

    function generateObjects(wave) {
        //var wave = new GameWave(1, 5);
        if (wave.getSize() == 0) {
            return [];
        }
        var obj;
        var generated = 0;
        var list = [];
        var max, min;
        while (generated < wave.getSize()) {
            max = generateMaxVol(wave.getMaxVolVar());
            min = generateMinVol(max, wave.getMinVolVar());
            type = generateType(wave.getCupRatio());
            var sprite = new Entity.Sprite({
                resource: LoadManager.getAsset(
                    (type) ? randomCupSprite() : 'sapatenis'
                ),
                color: '#00ff00'
            });
            var obj = new Entity.Object({
                sprite: sprite,
                id: generated,
                x: generated * -300,
                y: CONFIG.height * 0.87,
                width: type ? 40 : 40 * 2.169811320754717,
                height: type ? 50 : 40,
                /* função que define a aleatoriedade dos volumes */
                volMin: 35 + (Math.random() * 50),
                volMax: 100,
                currVol: 0,
                fillable: type
            });
            list.push(obj);
            generated++;
        }
        return list;
    }

    function runTest() {
        var wave = new GameWave(1, 15, 0.6, 0.8, 0.1);
        generateObjects(wave);
    }

    return {
        generateObjects: generateObjects,
        runTest: runTest
    }
})();

window.pathManager = (function() {

    function percentage(total, relative) {
        return (relative * 100) / total;
    }

    /*Entradas:
    posObj = objeto com atributos x e y (em px)
    stepX/stepY = tamanho do avanço em pixels
    
    Saída: 
    porcentagem atual em relação ao canvas e porcentagem no próximo passo
    */
    function getNextStep(posObj, stepX, stepY) {
        var width = CTX.canvas.clientWidth;
        var height = CTX.canvas.clientHeight;
        var px, py;

        px = percentage(width, posObj.x);
        py = percentage(height, posObj.y);
        pIncX = percentage(width, stepX);
        pIncY = percentage(height, stepY);

        return {
            currentPX: px,
            currentPY: py,
            nextPX: px + pIncX,
            nextPY: py + pIncY
        }
    }

    /*Entradas:
    Quantidade de objetos a serem desenhados antes da origem
    Width de cada sprite (em px, aqui considerando que será igual pra todos)
    Spacing desejado entre sprites (em px)

    Saída:
    Quantos porcento ANTES da boundary de origem do canvas o path deverá iniciar, pensando que os objetos irão ser incializados fora do canto esquerdo do canvas (ou seja, se a tela for de 1024px e o resultado for 100%, significa que os sprites deverão começar a -1024px da boundary da origem do eixo x)
    */

    function getStartPosition(qty, width, spacing) {
        var preLength = (qty * width) + (qty * spacing);
        var canvasWidth = CTX.canvas.clientWidth;
        var perPre = percentage(canvasWidth, preLength);
        return perPre;
    }

    return {
        getStartPosition: getStartPosition,
        getNextStep: getNextStep
    }
})();



var GameLogic = (function() {

    var randomCupSprite = function() {
        return [
            'xicara1',
            'xicara2',
            'xicara3',
            'xicara4',
            'cuia'
        ][Math.floor(Math.random() * 5)]
    };

    var checkIfNeedMoreCupsAndGiveIt = function checkIfNeedMoreCupsAndGiveIt(list) {
        var lastItem = list[list.length - 1];

        if (lastItem.x > -150) {
            var wave = new GameWave(1, 5, 0.8, 0.8, 0.1);
            var lista = window.cupManager.generateObjects(wave);
            for (var i = 0; i < lista.length; i++) {
                var sprite = new Entity.Sprite({
                    resource: LoadManager.getAsset(
                        (type) ? randomCupSprite() : 'sapatenis'
                    ),
                    color: '#00ff00'
                });
                var obj = new Entity.Object({
                    sprite: sprite,
                    id: i,
                    x: i * -300,
                    y: CONFIG.height * 0.87,
                    width: type ? 40 : 40 * 2.169811320754717,
                    height: type ? 50 : 40,
                    /* função que define a aleatoriedade dos volumes */
                    volMin: 35 + (Math.random() * 50),
                    volMax: 100,
                    currVol: 0,
                    fillable: type
                });
                list.push(obj);
            }

        }
    };
    return {
        checkIfNeedMoreCupsAndGiveIt: checkIfNeedMoreCupsAndGiveIt
    }
})();