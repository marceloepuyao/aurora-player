(function() {
	'use strict';

	angular
		.module('aurora')
		.config(moduleConfig)
		.run(moduleRun);

	moduleConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

	function moduleConfig($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('pageView', {
				url: '/',
				views: {
					header: {
						templateUrl: './views/header/header.html'
					},
					main: {
						templateUrl: './views/page-view/main.html'
					},
					cropOptions: {
						templateUrl: './views/crop-options/crop-options.html'
					}
				}
			});
	}

	moduleRun.$inject = ['$rootScope', '$state'];

	function moduleRun($rootScope, $state) {
		$rootScope.$on('$stateChangeStart', function(event, toState, toParams) {

		});
	}
})();
