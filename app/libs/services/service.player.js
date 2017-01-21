(function() {
	'use strict';

	angular
		.module('aurora')
		.service('playerService', playerServiceFunction);

	playerServiceFunction.$inject = [];

	function playerServiceFunction() {
		var self = this;

		self.limit = 100;
		self.current = 0;
	}
})();