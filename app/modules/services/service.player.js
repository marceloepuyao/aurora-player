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
					auroraPlay.emit('playerPlay', true);
				break;
				case 'pause':
					auroraPlay.emit('playerPlay', false);
				break;
			}
		}

		auroraPlay.on('player', function(player) {
			$rootScope.$apply(function() {
				self.element = player;
			});
		});
	}
})();