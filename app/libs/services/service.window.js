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
		self.panelOpacityControl = false;
		self.active = true;
		self.activate = activateWindow;
		self.close = closeWindow;
		
		$interval(verifyUserInactivity, 4000);

		function verifyUserInactivity() {
			var currentTime = Number(new Date());
			if(currentTime-lastMove >= 4000 && self.active) {
				self.active = false;
				self.panelOpacity = false;
				auroraPlay.emit('windowActive', false);
			}
		}

		function activateWindow() {
			lastMove = Number(new Date());
			if(!self.active) {
				self.active = true;
				auroraPlay.emit('windowActive', true);
			}
		}

		function closeWindow() {
			auroraPlay.emit('windowClose');
			var currentWindow = require('electron').remote.getCurrentWindow();
			currentWindow.close();
		}
	}
})();