(function() {
	'use strict';

	angular
		.module('aurora')
		.service('generalService', generalServiceFunction);

	generalServiceFunction.$inject = ['$rootScope', '$sce', 'windowService', 
		'playerService', 'channelService'];

	function generalServiceFunction($rootScope, $sce, windowService, 
		playerService, channelService) {
		var self = this;

		self.window = windowService;
		self.channel = channelService;
		self.player = playerService;
	}
})();