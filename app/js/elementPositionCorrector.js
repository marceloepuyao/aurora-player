var elementPositionCorrector = "(function(ide){function offset(element) {var rect = element.getBoundingClientRect(), bodyElt = document.body;return {top: rect.top + bodyElt.scrollTop,left: rect.left + bodyElt.scrollLeft}}var element = document.querySelector('*[data-auroraselector=\"'+ide+'\"]');var elementOffset = offset(element);return {x: elementOffset.left,y: elementOffset.top,x2: elementOffset.left+element.offsetWidth,y2: elementOffset.top+element.offsetHeight};})";
/*
(function(ide){
    function offset(element) {
        var rect = element.getBoundingClientRect(), bodyElt = document.body;
        return {
            top: rect.top + bodyElt.scrollTop,
            left: rect.left + bodyElt.scrollLeft
        }
    }
    var element = document.querySelector('*[data-auroraselector="'+ide+'"]');
    var elementOffset = offset(element);

    return {
        x: elementOffset.left,
        y: elementOffset.top,
        x2: elementOffset.left+element.offsetWidth,
        y2: elementOffset.top+element.offsetHeight
    };
})();
*/
