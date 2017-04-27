(function() {
	'use strict';

	angular
		.module('aurora')
		.controller('general', generalControllerFunction);

	generalControllerFunction.$inject = ['windowService'];

	function generalControllerFunction(windowService) {
		var g = this;

		g.window = windowService;
	}
})();
