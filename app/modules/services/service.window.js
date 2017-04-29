(function() {
	'use strict';

	angular
		.module('aurora')
		.service('windowService', windowServiceFunction);

	windowServiceFunction.$inject = ['$interval'];

	function windowServiceFunction($interval) {
		var self = this;
		var lastMove = Number(new Date());
		var sizesCropped = {
			height: 0,
			width: 0
		};

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
		self.clearCrop = clearCrop;
		self.cropCoors = window.cropCoors = {};

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
			cropHandler.updateCrop();
		}

		function closeCrop() {
			self.showCropOptions = false;
			cropHandler.release();
		}

		function cropBrowser() {
			var coors = cropCoors;
			self.showCropOptions = false;
			self.cropped = true;
			cropHandler.release();
			require('electron').remote.getCurrentWindow().setContentSize(coors.w, coors.h+$('header').height(), true);
			sizesCropped.width = $(window).width();
			sizesCropped.height = $(window).height();
		}

		function clearCrop() {
			self.cropped = false;
			require('electron').remote.getCurrentWindow().setContentSize(sizesCropped.width, sizesCropped.height, true);
		}

		$(window).resize(function() {
			if(!self.cropped) {
				cropHandler.updateCrop();
			}
		});
	}
})();
