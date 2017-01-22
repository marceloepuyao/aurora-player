(function() {
	'use strict';

	angular
		.module('aurora')
		.service('channelService', channelServiceFunction);

	channelServiceFunction.$inject = ['$rootScope', '$sce'];

	function channelServiceFunction($rootScope, $sce) {
		var self = this;

		self.list = [];
		self.getChannels = getChannels;
		self.active = undefined;
		self.childIsActive = childIsActive;
		self.srcUrl = srcUrl;
		
		self.getChannels();

		function getChannels() {
			var channelsArray = [];
			var folderChannels = './channels';
			var channelsFolders = fs.readdirSync(folderChannels);
			
			channelsFolders.forEach(function(folderName) {
				var folderChannel = folderChannels+'/'+folderName;
				var channelPackage = folderChannel+'/package.json';
				var packageContent = undefined;
				
				if(!fs.lstatSync(folderChannel).isDirectory()) {
					console.log('Channel "'+folderName+'" not is a directory');
					return;
				}
				
				if(
					!fs.existsSync(channelPackage) &&
					!fs.lstatSync(channelPackage).isFile()
				) {
					console.log('Channel "'+folderName+'" not exists or not file');
					return;
				}

				try {
					packageContent = 
						JSON.parse(fs.readFileSync(channelPackage).toString());
				} catch(e) {
					console.log('Channel "'+folderName+'" package.json is not valid');
					return;
				}

				var channelName = packageContent.channelName;
				var channelIcon = folderChannel+'/'+packageContent.channelIcon;
					channelIcon = nativeImage.createFromPath(channelIcon).toDataURL();
				var channelDescription = packageContent.channelDescription;
				var channelMain = 'file://'+__dirname+'/../channels/'+
					folderName+'/'+packageContent.main;

				channelsArray.push({
					name: channelName,
					icon: channelIcon,
					description: channelDescription,
					folder: folderName,
					main: channelMain,
					package: packageContent,
					packageStr: JSON.stringify(packageContent),
					children: {}
				});
			});
			self.list = channelsArray;
		}

		function childIsActive() {
			if(self.active) {
				for(var name in self.active.children) {
					var child = self.active.children[name];
					if(child.active) {
						return true;
					}
				}
			}
			return false;
		}

		function srcUrl(url) {
			return $sce.trustAsResourceUrl(url);
		}

		auroraPlay.on('addChild', function(child) {
			$rootScope.$apply(function() {
				if(self.active && child) {
					if(child.active) {
						for(var name in self.active.children) {
							self.active.children[name].active = false;	
						}
					}
					self.active.children[child.name] = child;
				}
			});
		});
	}
})();