var track = (function () {

  var options = {};

  var init = function (opts) {
    options = opts;
    bindEvents();
  };

  var bindEvents = function () {
    var elements = document.querySelectorAll(options.el);
    var type = null;

    [].forEach.call(elements, function (el) {
      addListener(el, 'click', onClick);
    });
  };

  var onClick = function (event) {
    event.preventDefault();
    var el = getTarget(event);
    var trackName = el.dataset.track;

    ga('send', 'event', trackName, 'click', trackName);

    return false;
  };

  var addListener = function (element, type, callback) {
    if (element.addEventListener) {
      return element.addEventListener(type, callback);
    } else if (element.attachEvent) {
      return element.attachEvent('on' + type, callback);
    }
  };

  var getTarget = function (event) {
    var targetElement = null;
    try {
      if (typeof event.target !== "undefined") {
        targetElement = event.target;
      }
      else {
        targetElement = event.srcElement;
      }
      if (targetElement !== null && targetElement.nodeType && targetElement.parentNode) {
        while (targetElement.nodeType === 3 && targetElement.parentNode !== null) {
          targetElement = targetElement.parentNode;
        }
      }
    } catch (error) {
      console.log("getEventTarget failed: " + error);
    }
    return targetElement;
  };

  return {
    init: init
  };
})();
