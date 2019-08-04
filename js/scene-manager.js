var SceneManager = (function scope() {

    var SCENES = {
        LOADING: 'LOADING',
        MENU: 'MENU',
        GAME_SCENE: 'GAME_SCENE',
        GAME_OVER: 'GAME_OVER',
        CREDIT_SCREEN: 'CREDIT_SCREEN',
    }

    var ACTUAL_SCENE = SCENES.LOADING;
    var needToClearSceneContext = false;

    var SCENE_MANAGER_DATA = {};
    var LOCAL_SCENE_CONTEXT = null;

    var gameScene = function() {

        if (!LOCAL_SCENE_CONTEXT) {
            
            var wave = new GameWave(1, 5, 0.6, 0.8, 0.1);
            var list = window.cupManager.generateObjects(wave);
            var coffeStream = new Entity.Renderizable({
                sprite: new Entity.Sprite({
                    resource: LoadManager.getAsset('cafe-saindo'),
                    color: '#fff'
                }),
                x: (CONFIG.width/2) - (CONFIG.width * 0.02034722222222222 / 2),
                y: CONFIG.height/2 - 3,
                /**
                 * Valores da razão do svg em relação a width de 1440
                 */
                width: CONFIG.width * 0.02034722222222222,
                height: CONFIG.width * 0.02034722222222222 * 8.84914675767918
            });
            var coffeStream2 = new Entity.Renderizable({
                sprite: new Entity.Sprite({
                    resource: LoadManager.getAsset('cafe-saindo'),
                    color: '#fff'
                }),
                x: (CONFIG.width/2) - (CONFIG.width * 0.02034722222222222 / 2),
                y: CONFIG.height/2 + CONFIG.width * 0.02034722222222222 * 8.84914675767918/3,
                /**
                 * Valores da razão do svg em relação a width de 1440
                 */
                width: CONFIG.width * 0.02034722222222222,
                height: CONFIG.width * 0.02034722222222222 * 8.84914675767918
            });
            var cookie = new Entity.Renderizable({
                sprite: new Entity.Sprite({
                    resource: LoadManager.getAsset('biscoito'),
                    color: '#fff'
                }),
                x: (CONFIG.width/2) - (CONFIG.width * 0.02034722222222222 / 2),
                y: CONFIG.height * 0.76,
                /**
                 * Valores da razão do svg em relação a width de 1440
                 */
                width: CONFIG.width * 0.13343750000000001,
                height: CONFIG.width * 0.13343750000000001 * 0.23018475149622689
            });

            LOCAL_SCENE_CONTEXT = {
                cupList: list,
                uiComponents: [new Entity.Button({
                    src : "",
                    sprite: new Entity.Sprite({ resource: null, color: 'rgba(255,0,0,1)'}),
                    color: 'rgba(255,0,0,1)',
                    x: CONFIG.width - 50,
                    y: CONFIG.height - 50,
                    width: 50,
                    height: 50
                    })
                ],
                coffeStream: coffeStream,
                coffeStream2: coffeStream2,
                cookie: cookie,
                cupsScore: 0
            };
            SceneManager.listen('add-cup', function() {
                if (LOCAL_SCENE_CONTEXT) {
                    LOCAL_SCENE_CONTEXT.cupsScore++;
                }
            });
        }
        /**
         * Background da cena do jogo
         */
        GameRenderer.drawImageBackground(
            LoadManager.getAsset('bg1')
        );
        /**
         * Desenha:
         * placar
         * Líquido
         * Desenha as entidades que passam e checa se precisa adicionar mais
         * Biscoito
         */
        GameRenderer.drawText(
            ("   " + LOCAL_SCENE_CONTEXT.cupsScore).slice(-4),
            145,
            167
        );
        GameRenderer.drawEntities([
            LOCAL_SCENE_CONTEXT.coffeStream,
            LOCAL_SCENE_CONTEXT.coffeStream2
        ]);
        GameRenderer.drawEntities(LOCAL_SCENE_CONTEXT.cupList);
        GameRenderer.drawEntity(LOCAL_SCENE_CONTEXT.cookie);
        GameRenderer.drawEntities(LOCAL_SCENE_CONTEXT.uiComponents);
        /**
         * Listras roxas
         */
        GameRenderer.drawRect({ color: '#5C144F', xStart: CONFIG.width * 0.04791666666666667, yStart: 0, width: CONFIG.width * 0.041666666666666664, height: CONFIG.height});
        GameRenderer.drawRect({ color: '#5C144F', xStart: CONFIG.width * 0.9013888888888889, yStart: 0, width: CONFIG.width * 0.041666666666666664, height: CONFIG.height});
        GameLogic.checkIfNeedMoreCupsAndGiveIt(LOCAL_SCENE_CONTEXT.cupList);
    };
    /*
    |----------------
    | Listen e emit
    |----------------
    */
    var EVENTS_AND_BINDINGS = {};
    var listen = function listen(eventName, callback) {
        EVENTS_AND_BINDINGS[eventName] = callback;
    };
    var emit = function emit(eventName) {
        (EVENTS_AND_BINDINGS[eventName] || function() {})();
    };
    /*
    | ------------------------------------------------------------------------
    |  MÉTODO QUE DESENHA A TELA LOADING E INCIALIZA OS DOWNLOADS DE ASSETS
    | ------------------------------------------------------------------------
    */
    function init() {
        
        /**
         * Requisita todos os assets necessários
         */
        LoadManager.loadAllAssets([
                /*  backgrounds */
                'assets/background/bg1.svg',
                'assets/background/bg2.svg',
                'assets/background/bg3.svg',
                'assets/background/bg-menu.svg',
                /*  imagens */
                'assets/imgs/biscoito.svg',
                'assets/imgs/bolhas1.svg',
                'assets/imgs/bolhas2.svg',
                'assets/imgs/bolhas3.svg',
                'assets/imgs/cafe-saindo.svg',
                'assets/imgs/cuia.svg',
                'assets/imgs/gameover.svg',
                'assets/imgs/sapatenis.svg',
                'assets/imgs/xicara1.svg',
                'assets/imgs/xicara2.svg',
                'assets/imgs/xicara3.svg',
                'assets/imgs/xicara4.svg',
                'assets/imgs/xicarakodo.svg',
                /* Logo */
                'assets/logo.svg'
            ],
            function () {
                /**
                 * Callback que roda quando todos os assets forem baixados
                 */
                SceneManager.changeScene(SCENES.MENU);
            }
        );
        /* Inicia o loop do jogo */
        sceneLoop()
    }
    /*
    | ------------------------------------------------------------------------
    |  método usado para mudar as cenas
    | ------------------------------------------------------------------------
    */
    var sceneLoop = function sceneLoop(scene) {
        /**
         * Se livra dos dados da tela anterior
         */
        if (needToClearSceneContext) {
            LOCAL_SCENE_CONTEXT = null;
            needToClearSceneContext = false;
            Event.resetClick();
        }
        switch(ACTUAL_SCENE) {
            case SCENES.LOADING: {
                /**
                 * A cena de load é só uma tela colorida por hora
                 */
                GameRenderer.drawImageBackground(document.querySelector('#loadingAsset'));
            } break;
            case SCENES.MENU: {
                /**
                 * Imagem de fundo e máscara 
                 */
                GameRenderer.drawImageBackground(
                    LoadManager.getAsset('bg-menu')
                );
                GameRenderer.clearRect('rgba(48, 110,225, 0.35)');
                /**
                 * Logo
                 */
                GameRenderer.drawImage({
                    image: LoadManager.getAsset('logo'),
                    xStart: CONFIG.width/2 - CONFIG.width/2.0839363241678726/2,
                    yStart: CONFIG.height*0.32850940665701883 - CONFIG.width/2.0839363241678726/5.592877377579927/2,
                    width: CONFIG.width/2.0839363241678726,
                    height:  CONFIG.width/2.0839363241678726/5.592877377579927

                });
                if (!LOCAL_SCENE_CONTEXT) {
                    
                    var button1 = new Entity.UIButton({
                        color: '#FF7BAC',
                        colorHover: '#5C144F',
                        shadowColor: '#0FEFDE',
                        text: 'Play',
                        x: CONFIG.width/2 - (CONFIG.width * 0.25219444444444444)/2,
                        y: CONFIG.height * 0.45,
                        width: CONFIG.width * 0.25219444444444444,
                        height: CONFIG.width * 0.25219444444444444 * 0.27180856922568564,
                        sceneToGo: SCENES.GAME_SCENE
                    });
                    var button2 = new Entity.UIButton({
                        color: '#FF7BAC',
                        colorHover: '#5C144F',
                        shadowColor: '#0FEFDE',
                        text: 'Credits',
                        x: CONFIG.width/2 - (CONFIG.width * 0.25219444444444444)/2,
                        y: CONFIG.height * 0.63,
                        width: CONFIG.width * 0.25219444444444444,
                        height: CONFIG.width * 0.25219444444444444 * 0.27180856922568564,
                        sceneToGo: SCENES.CREDIT_SCREEN
                    });

                    LOCAL_SCENE_CONTEXT = {
                        buttons: [ button1, button2 ]
                    };
                }
                GameRenderer.drawEntities(LOCAL_SCENE_CONTEXT.buttons);
            } break;
            case SCENES.GAME_SCENE: {
                gameScene();
            } break;
            case SCENES.GAME_OVER: {
                /**
                 * imagem e máscara azul
                 */
                GameRenderer.drawImageBackground(
                    LoadManager.getAsset('bg1')
                );
                GameRenderer.clearRect('rgba(48, 110,225, 0.35)');
                if (!LOCAL_SCENE_CONTEXT) {
                    
                    var button1 = new Entity.UIButton({
                        color: '#FF7BAC',
                        colorHover: '#5C144F',
                        shadowColor: '#0FEFDE',
                        text: 'Play',
                        x: CONFIG.width/2 - (CONFIG.width * 0.25219444444444444)/2,
                        y: CONFIG.height * 0.45,
                        width: CONFIG.width * 0.25219444444444444,
                        height: CONFIG.width * 0.25219444444444444 * 0.27180856922568564,
                        sceneToGo: SCENES.GAME_SCENE
                    });
                    var button2 = new Entity.UIButton({
                        color: '#FF7BAC',
                        colorHover: '#5C144F',
                        shadowColor: '#0FEFDE',
                        text: 'Credits',
                        x: CONFIG.width/2 - (CONFIG.width * 0.25219444444444444)/2,
                        y: CONFIG.height * 0.63,
                        width: CONFIG.width * 0.25219444444444444,
                        height: CONFIG.width * 0.25219444444444444 * 0.27180856922568564,
                        sceneToGo: SCENES.CREDIT_SCREEN
                    });

                    LOCAL_SCENE_CONTEXT = {
                        buttons: [ button1, button2 ]
                    };
                }
                GameRenderer.drawEntities(LOCAL_SCENE_CONTEXT.buttons);
            } break;
            case SCENES.CREDIT_SCREEN: {
                GameRenderer.drawImageBackground(document.querySelector('#loadingAsset'));
            } break;
            default: {
                console.log('como você chegou aqui?')
            }
        }

        /**
         * Animation frame
         */
        requestAnimationFrame(sceneLoop);
    };
    /*
    | ------------------------------------------------------------------------
    |  método usado para mudar as cenas
    | ------------------------------------------------------------------------
    */
    var changeScene = function changeScene(scene) {
        if (scene != ACTUAL_SCENE) {
            needToClearSceneContext = true;
        }
        ACTUAL_SCENE = scene;
    };
    /**
     * Interface exportada
     */
    return {
        init: init,
        changeScene: changeScene,
        listen: listen,
        emit: emit,
        getScene: function getScene() {
            return ACTUAL_SCENE;
        }
    }
})();