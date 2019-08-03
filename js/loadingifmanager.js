var LoadManager = (function() {
	var index = 0;

	return {

		loadAllAssets: function(jason, callback) {
			setTimeout(function() {
				callback();
			}, 1000);
		}
	};
})()