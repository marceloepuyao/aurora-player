(function() {
	'use strict';
	var socket = io("http://localhost:1618");
	var connected = false;
	var emitQueue = [];

	socket.on('connected', function() {
		connected = true;
		emitQueue.forEach(function(emitData) {
			socket.emit(emitData.name, emitData.data);
		});
	});

	function AuroraPlay() {
		this.on = _on;
		this.emit = _emit;
		this.request = function(){};
		this.fs = {
			read: function() {},
			write: function() {}
		};
	}
	window.auroraPlay = new AuroraPlay();

	function _on(events, callback) {
		events
			.split(/\s/g)
			.forEach(function(event) {
				socket.on(event, callback);
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
})();