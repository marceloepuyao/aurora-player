(function() {
	'use strict';

	angular
		.module('aurora', ['ngMaterial', 'ui.router'])
		.config(configFunction);

	configFunction.$inject = ['$mdThemingProvider'];

	function configFunction($mdThemingProvider) {
		//$mdThemingProvider.theme('default')
		//	.primaryPalette('cyan')
		//	.accentPalette('teal');

		var customPrimary = {
			'50': '#a9eaf6',
			'100': '#92e4f4',
			'200': '#7bdef1',
			'300': '#64d8ef',
			'400': '#4dd3ec',
			'500': '#36cdea',
			'600': '#1fc7e8',
			'700': '#16b8d7',
			'800': '#14a4bf',
			'900': '#1290a8',
			'A100': '#c1eff8',
			'A200': '#d8f5fb',
			'A400': '#effbfd',
			'A700': '#0f7c91'
		};

		$mdThemingProvider
			.definePalette('customPrimary', customPrimary);

		var customAccent = {
			'50': '#176d63',
			'100': '#1c8176',
			'200': '#219689',
			'300': '#25ab9c',
			'400': '#2ac0af',
			'500': '#31d2c0',
			'600': '#5bdccc',
			'700': '#70e0d3',
			'800': '#85e5d9',
			'900': '#9ae9e0',
			'A100': '#5bdccc',
			'A200': '#46d7c6',
			'A400': '#31d2c0',
			'A700': '#afeee6'
		};
		
		$mdThemingProvider
			.definePalette('customAccent', customAccent);

		var customWarn = {
			'50': '#ffffff',
			'100': '#ffffff',
			'200': '#ffffff',
			'300': '#ffffff',
			'400': '#f9f9f9',
			'500': '#ececec',
			'600': '#dfdfdf',
			'700': '#d2d2d2',
			'800': '#c6c6c6',
			'900': '#b9b9b9',
			'A100': '#ffffff',
			'A200': '#ffffff',
			'A400': '#ffffff',
			'A700': '#acacac'
		};
		
		$mdThemingProvider
			.definePalette('customWarn', customWarn);

		var customBackground = {
			'50': '#8298a9',
			'100': '#738c9f',
			'200': '#657f93',
			'300': '#5b7284',
			'400': '#506575',
			'500': '#465866',
			'600': '#3c4b57',
			'700': '#313e48',
			'800': '#273139',
			'900': '#1c2429',
			'A100': '#91a5b4',
			'A200': '#a0b1be',
			'A400': '#b0bec8',
			'A700': '#12171a'
		};
		
		$mdThemingProvider
			.definePalette('customBackground', customBackground);

		$mdThemingProvider.theme('default')
			.primaryPalette('customPrimary')
			.accentPalette('customAccent')
			.warnPalette('customWarn')
			.backgroundPalette('customBackground')
	}
})();