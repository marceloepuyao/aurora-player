(function() {
	'use strict';

	angular
		.module('aurora')
		.service('generalService', generalServiceFunction);

	generalServiceFunction.$inject = ['$interval'];

	function generalServiceFunction($interval) {
		var self = this;

		var lastMove = Number(new Date());

		self.window = {
			opacity: 100,
			active: true,
			activate: function() {
				lastMove = Number(new Date());
				if(!self.window.active) {
					self.window.active = true;
				}
			},
			close: function() {
				var window = require('electron').remote.getCurrentWindow();
       			window.close();
			}
		};

		$interval(function() {
			var currentTime = Number(new Date());
			if(currentTime-lastMove >= 4000) {
				self.window.active = false;
			}
		}, 4000);
	}
})();