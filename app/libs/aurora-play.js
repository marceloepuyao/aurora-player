(function() {
	'use strict';
	var query = window.packageContent?{query: window.packageContent}:undefined;
	var socket = io("http://localhost:1618", query);
	var connected = false;
	var emitQueue = [];
	var onQueue = [];

	socket.on('connected', function(isChannel) {
		connected = true;
		emitQueue.forEach(function(emitData) {
			socket.emit(emitData.name, emitData.data);
		});
		onQueue.forEach(function(onData) {
			socket.on(onData.name, onData.callback);
		})
	});

	function AuroraPlayer(packageData) {
		this.on = _on;
		this.emit = _emit;
		this.child = ChildAuroraPlayer;
	}
	window.auroraPlayer = new AuroraPlayer((window.packageContent?window.packageContent.channelName:undefined));

	function _on(events, callback) {
		events
			.split(/\s/g)
			.forEach(function(event) {
				if(connected) {
					socket.on(event, callback);
				} else {
					onQueue.push({
						name: event, 
						callback: callback
					});
				}
			});
	}

	function _emit(events, data) {
		events
			.split(/\s/g)
			.forEach(function(event) {
				if(connected) {
					socket.emit(event, data);
				} else {
					emitQueue.push({
						name: event, 
						data: data
					});
				}
			});
	}
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