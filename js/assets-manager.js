var LoadManager = (function() {
	/**
	 * Dict com todos os assets carregados
	 */	
	var assetsDict = {};


	var checkAllAssetsLoaded = function(list, callback) {
		for (var i = list.length - 1; i >= 0; i--) {
			if (!list[i]) {
				return;
			}
		}
		callback()
	}

	var getAsset = function getAsset(identifier) {
		return assetsDict[identifier];
	};

	var loadAllAssets = function(assetsResources, callback) {
		var posicoes = [];
		/**
		 * Vetor usado para sinalizar o load dos assets
		 * inicilizado com false em todas as posições
		 */
		for (var i = assetsResources.length; i--;) {
			posicoes[i] = false;
		}
		/**
		 * criação e adição do listener para sinalizar o load do asset
		 */
		for (var i = assetsResources.length; i--;) {
			(function localScope() {
				var index = i;
				var img = document.createElement('img');
				img.onload = function(){
					posicoes[index] = true;
					checkAllAssetsLoaded(posicoes, callback);
				};
				img.onerror = function(){
					posicoes[index] = true;
					checkAllAssetsLoaded(posicoes, callback);
				};
				img.src = assetsResources[i]

				var splitedURL = assetsResources[i].split('/');
				var lastPart = splitedURL[splitedURL.length - 1];
				var identifier = lastPart.split('.')[0];
				/**
				 * Registrando a entrada com uma chave
				 */
				assetsDict[identifier] = img;
			})()
		}
	};

	/**
	 * Interface do módulo
	 */
	return {
		/**
		 * Método usado para disparar o load de todos os assets e reportar quando terminaram
		 * recebe um array de strings que representam a url relativa das imagens
		 * recebe também uma função de callback que dispara ao terminar de baixar os arquivos
		 */
		loadAllAssets: loadAllAssets,
		/**
		 * Retorna a referencia do asset, recebe um nome que identifica o asset
		 */
		getAsset: getAsset
	};
})()