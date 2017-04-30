window.elementInArea = "(function(x1, y1, x2, y2) {function offset(element) {var rect = element.getBoundingClientRect(), bodyElt = document.body;return {top: rect.top + bodyElt .scrollTop,left: rect.left + bodyElt .scrollLeft}}var elements = document.querySelectorAll('*');var bigElement = {element: undefined,area: 0};for(var i = 0; i < elements.length; i++) {var element = elements[i];var elementOffset = offset(element);var x = elementOffset.left;var y = elementOffset.top;var w = element.offsetWidth;var h = element.offsetHeight;if (x >= x1 &&y >= y1 &&x + w <= x2 &&y + h <= y2 &&w*h > bigElement.area) {bigElement.element = element;bigElement.area = w*h;}}if(bigElement.element) {var element = bigElement.element;var elementOffset = offset(element);return {x: elementOffset.left,y: elementOffset.top,x2: elementOffset.left+element.offsetWidth,y2: elementOffset.top+element.offsetHeight};} else {return undefined;}})";
/*
(function(x1, y1, x2, y2) {
    function offset(element) {
        var rect = element.getBoundingClientRect(), bodyElt = document.body;
        return {
            top: rect.top + bodyElt .scrollTop,
            left: rect.left + bodyElt .scrollLeft
        }
    }
    var elements = document.querySelectorAll('*');
    var bigElement = {
        element: undefined,
        area: 0
    };

    for(var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var elementOffset = offset(element);
        var x = elementOffset.left;
        var y = elementOffset.top;
        var w = element.offsetWidth;
        var h = element.offsetHeight;

        if (
            x >= x1 &&
            y >= y1 &&
            x + w <= x2 &&
            y + h <= y2 &&
            w*h > bigElement.area
        ) {
            bigElement.element = element;
            bigElement.area = w*h;
        }
    }

    if(bigElement.element) {
        var element = bigElement.element;
        var elementOffset = offset(element);
        return {
            x: elementOffset.left,
            y: elementOffset.top,
            x2: elementOffset.left+element.offsetWidth,
            y2: elementOffset.top+element.offsetHeight
        };
    } else {
        return undefined;
    }
})()
*/
