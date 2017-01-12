(function() {
	'use strict';

	angular
		.module('aurora', ['ngMaterial'])
		.config(configFunction);

	configFunction.$inject = ['$mdThemingProvider'];

	function configFunction($mdThemingProvider) {
		$mdThemingProvider.theme('default')
			.primaryPalette('cyan')
			.accentPalette('teal');
	}
})();