(function() {
	'use strict';

	angular
		.module('aurora')
		.service('windowService', windowServiceFunction);

	windowServiceFunction.$inject = ['$interval'];

	function windowServiceFunction($interval) {
		var self = this;

		var lastMove = Number(new Date());

		self.opacity = 100;
		self.panelOpacity = false;
		self.active = true;
		self.activate = activateWindow;
		self.close = closeWindow;
		self.url = 'http://www.youtube.com/';

		$interval(verifyUserInactivity, 4000);

		function verifyUserInactivity() {
			var currentTime = Number(new Date());
			if(currentTime-lastMove >= 4000 && self.active) {
				self.active = false;
				self.panelOpacity = false;
				//auroraPlayer.emit('windowActive', false);
			}
		}

		function activateWindow() {
			lastMove = Number(new Date());
			if(!self.active) {
				self.active = true;
				//auroraPlayer.emit('windowActive', true);
			}
		}

		function closeWindow() {
			//auroraPlayer.emit('windowClose');
			var currentWindow = require('electron').remote.getCurrentWindow();
			currentWindow.close();
		}
	}
})();
