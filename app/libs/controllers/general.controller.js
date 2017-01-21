(function() {
	'use strict';

	angular
		.module('aurora')
		.controller('general', generalControllerFunction);

	generalControllerFunction.$inject = ['generalService'];

	function generalControllerFunction(generalService) {
		var g = this;

		g.window = generalService.window;
		g.channel = generalService.channel;
		g.player = generalService.player;
	}
})();