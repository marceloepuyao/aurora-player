(function() {
	'use strict';
	var query = window.packageContent?{query: window.packageContent}:undefined;
	var socket = io("http://localhost:1618", query);
	//var connected = false;

	/*socket.on('connected', function(isChannel) {
		connected = true;
	});*/

	function AuroraPlayer(packageData) {
		console.log(packageData);
		if(packageData) {
			
		}
	}
	window.auroraPlayer = new AuroraPlayer((window.packageContent?window.packageContent.channelName:undefined));

/*
	function ChildPage(data) {
		this.on = function(events, callback) {

		};
	}

	function addChildPage(data) {
		if(!data) {
			return undefined;
		}
		return new ChildPage(data);
	}*/
})();