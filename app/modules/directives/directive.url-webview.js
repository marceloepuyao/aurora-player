(function() {
    'use strict';

    angular
        .module('aurora')
        .directive('urlWebview', urlWebviewFunction);

    urlWebviewFunction.$inject = [];

    function urlWebviewFunction() {
        return {
            scope: {
                urlWebview: '=urlWebview'
            },
            link: function(scope, element, attrs) {
                element[0].addEventListener('did-navigate', function(obj) {
        			var url = obj.url;
                    if(scope.urlWebview !== url) {
                        scope.$apply(function() {
                            scope.urlWebview = url
                        });
                    }
        		});
                element[0].addEventListener('did-navigate-in-page', function(obj) {
                    var url = obj.url;
                    if(scope.urlWebview !== url) {
                        scope.$apply(function() {
                            scope.urlWebview = url
                        });
                    }
                });
            }
        };
    }
})();
