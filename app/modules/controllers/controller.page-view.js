(function() {
	'use strict';

	angular
		.module('aurora')
		.controller('pageView', pageViewFunction);

	pageViewFunction.$inject = ['windowService', '$scope', '$sce'];

	function pageViewFunction(windowService, $scope, $sce) {
		var PV = this;

		PV.window = windowService;
		PV.pageUrl = '';

		$scope.$watch('PV.window.url', function(newVal, oldVal) {
			PV.pageUrl = $sce.trustAsResourceUrl(newVal);
		});
	}
})();
