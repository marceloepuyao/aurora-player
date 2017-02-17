(function() {
	'use strict';

	angular
		.module('aurora')
		.directive('channelChild', channelChildFunction);

	channelChildFunction.$inject = [];

	function channelChildFunction() {
		return {
			link: childLink
		}

		function childLink(scope, element, attr) {
			var child = scope.child;
			var webview = $(element[0]);

			var loadPage = false;
			var execQueue = [];

			webview.css({
				height: '0px',
				width: '0px'
			});
			webview[0].addEventListener('did-stop-loading', function() {
				webview.next('.loadSection').css('display', 'none');
				webview.css({
					height: '100%',
					width: '100%'
				});

				//webview[0].openDevTools();
				
				loadPage = true;
				execQueue.forEach(function(data) {
					exectJS(data);
				});
				execQueue = [];
			});
			webview[0].addEventListener('did-navigate', webviewChangeUrl);
			webview[0].addEventListener('did-navigate-in-page', webviewChangeUrl);

			/*auroraPlayer.on('execJSChild', function(data) {
				if(data.name === child.name) {
					if(data.afterLoad && !loadPage) {
						execQueue.push(data);
					} else {
						exectJS(data);
					}
				}
			});*/

			function webviewChangeUrl(e) {
				/*auroraPlayer.emit('childChangeUrl', {
					name: child.name,
					url: e.url
				});*/
			}

			function exectJS(data) {
				webview[0].executeJavaScript(data.script);
			}
		}
	}
})();