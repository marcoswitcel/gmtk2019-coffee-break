var LoadManager = (function() {
	var index = 0;
	var checkAllAssetsLoaded = function(list, callback) {
		for (var i = list.length - 1; i >= 0; i--) {
			if (!list[i]) {
				return;
			}
		}
		callback();
	}
	return {

		loadAllAssets: function(json, callback) {
			posicoes = [];

			for (var i = json.assetsResources.length; i--;) {
				posicoes[i] = false;
			}

			for (var i = json.assetsResources.length; i--;) {
				(function() {
					var a = i;
					img = new Image();
					img.onload = function(){
						posicoes[a] = true;
						checkAllAssetsLoaded(posicoes, callback);
					};
				})()
				img.src = json.assetsResources[i];
			}
		}
	};
})()