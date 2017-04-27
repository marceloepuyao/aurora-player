(function() {
	'use strict';

	angular
		.module('aurora')
		.controller('generalView', generalViewFunction);

	generalViewFunction.$inject = ['windowService'];

	function generalViewFunction(windowService) {
		var GV = this;

		GV.window = windowService;
	}
})();
