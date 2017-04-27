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
			.state('home', {
				url: '/',
				views: {
					main: {
						templateUrl: './views/home/main.html',
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
