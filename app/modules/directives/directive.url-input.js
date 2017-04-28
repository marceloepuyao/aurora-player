(function() {
    'use strict';

    angular
        .module('aurora')
        .directive('urlInput', urlInputFunction);

    urlInputFunction.$inject = ['windowService'];

    function urlInputFunction(windowService) {
        return {
            scope: {
                ngModel: '=ngModel'
            },
            link: function(scope, element, attrs) {
                var urlWithoutHTTPReg = new RegExp(
                    "^" +
                        // user:pass authentication
                        "(?:\\S+(?::\\S*)?@)?" +
                        "(?:" +
                          // IP address exclusion
                          // private & local networks
                          "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
                          "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
                          "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
                          // IP address dotted notation octets
                          // excludes loopback network 0.0.0.0
                          // excludes reserved space >= 224.0.0.0
                          // excludes network & broacast addresses
                          // (first & last IP address of each class)
                          "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
                          "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
                          "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
                        "|" +
                          // host name
                          "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
                          // domain name
                          "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
                          // TLD identifier
                          "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
                          // TLD may end with dot
                          "\\.?" +
                        ")" +
                        // port number
                        "(?::\\d{2,5})?" +
                        // resource path
                        "(?:[/?#]\\S*)?" +
                      "$", "i"
                );

                $(element[0]).focus(function(e) {
                    $(this).select();
                });

                $(element[0]).keyup(function(e) {
                    var code = e.keyCode;
                    if(code === 13) {
                        e.preventDefault();
                        scope.$apply(function() {
                            var url = scope.ngModel;

                            if(/^https?\:\/\//.test(url)) {
                                windowService.url = windowService.auxUrl = scope.ngModel;
                            } else if(!/^https?\:\/\//.test(url) && urlWithoutHTTPReg.test(url)) {
                                windowService.url = windowService.auxUrl = 'http://'+url;
                            }else {
                                windowService.url = windowService.auxUrl = 'https://www.google.com/#q='+encodeURI(url);
                            }
                        });
                    }
                    scope.$apply(function() {
                        windowService.activate();
                    });
                });

                $(window).resize(resizeUrlInput);
                resizeUrlInput();

                function resizeUrlInput() {
                    $(element[0]).css({
                        width: ($(window).width()-($('header .header-left').width()+$('header .header-right').width()+35))+'px'
                    });
                }
            }
        };
    }
})();
