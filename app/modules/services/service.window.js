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
		self.auxUrl = self.url;
		self.crop = crop;
		self.cropped = false;
		self.showCropOptions = false;
		self.closeCrop = closeCrop;
		self.cropBrowser = cropBrowser;

		$interval(verifyUserInactivity, 4000);

		function verifyUserInactivity() {
			var currentTime = Number(new Date());
			if(currentTime-lastMove >= 4000 && self.active) {
				self.active = false;
				self.panelOpacity = false;
			}
		}

		function activateWindow() {
			lastMove = Number(new Date());
			if(!self.active) {
				self.active = true;
			}
		}

		function closeWindow() {
			var currentWindow = require('electron').remote.getCurrentWindow();
			currentWindow.close();
		}

		function crop() {
			self.showCropOptions = true;
			cropCoors = undefined;
			cropHandler.updateCrop()
		}

		function closeCrop() {
			self.showCropOptions = false;
			cropHandler.release();
		}

		function cropBrowser() {
			self.showCropOptions = false;
			cropHandler.release();
			console.log(cropCoors);
		}

		$(window).resize(function() {
			cropHandler.updateCrop();
		});
	}
})();
