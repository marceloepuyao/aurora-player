(function() {
	'use strict';

	angular
		.module('aurora')
		.service('playerService', playerServiceFunction);

	playerServiceFunction.$inject = ['$rootScope'];

	function playerServiceFunction($rootScope) {
		var self = this;

		self.element = undefined;
		self.isSimpleItem = isSimpleItem;
		self.emit = emitEvent;

		function isSimpleItem(item) {
			return typeof item === 'string';
		}

		function emitEvent(item) {
			if(typeof item === 'string') {
				emitDefaultEvent(item);
			} else {
				//TODO: Custom items
			}
		}

		function emitDefaultEvent(item) {
			switch(item) {
				case 'play_arrow':
					//auroraPlayer.emit('playerPlay', true);
				break;
				case 'pause':
					//auroraPlayer.emit('playerPlay', false);
				break;
			}
		}

		/*auroraPlayer.on('player', function(player) {
			$rootScope.$apply(function() {
				self.element = player;
			});
		});*/
	}
})();