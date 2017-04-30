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
		self.smartCrop = smartCrop;
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
			cropHandler.setSelect([0, 0, 200, 200]);
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
			$('webview')[0].insertCSS('body{overflow:hidden}');
		}

		function clearCrop() {
			self.cropped = false;
			require('electron').remote.getCurrentWindow().setContentSize(sizesCropped.width, sizesCropped.height, true);
			$('webview')[0].insertCSS('body{overflow:inherit}');
		}

		function smartCrop() {
			var coors = cropCoors;
			$('webview')[0].executeJavaScript(elementInArea+'('+coors.x+', '+coors.y+', '+coors.x2+', '+coors.y2+');', false, function(_coors) {
				if(_coors) {
					_coors.h = _coors.y2-_coors.y;
					_coors.w = _coors.x2-_coors.x;
					Object.assign(window.cropCoors, _coors);
					cropHandler.animateTo([_coors.x, _coors.y, _coors.x2, _coors.y2]);
					self.cropBrowser();
				}
			});
		}

		$(window).resize(function() {
			if(!self.cropped) {
				cropHandler.updateCrop();
			} else {
				var originalWidth = sizesCropped.width;
				var originalHeight = sizesCropped.height;

				var newWidth = $(window).width();
				var newHeight = $(window).height();

				

				if(originalWidth !== newWidth && originalHeight !== newHeight) {
					var widthFactor = newWidth/originalWidth;
					var heightFactor = newHeight/originalHeight;
				} else if(originalWidth !== newWidth) {
					var widthFactor = newWidth/originalWidth;
				} else if(originalHeight !== newHeight) {
					var heightFactor = newHeight/originalHeight;
				}
				console.log(originalWidth, originalHeight, newWidth, newHeight);
			}
		});
	}
})();
