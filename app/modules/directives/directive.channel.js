(function() {
	'use strict';

	angular
		.module('aurora')
		.directive('channel', channelFunction);

	channelFunction.$inject = ['channelService'];

	function channelFunction(channelService) {
		return {
			link: channelLink
		};

		function channelLink(scope, element, attr) {

		}
	}
})();