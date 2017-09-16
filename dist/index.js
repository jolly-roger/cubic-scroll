(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.fluidScroll = factory());
}(this, (function () { 'use strict';

function getScrollingElement() {
  if (typeof document.scrollingElement !== 'undefined') {
    return document.scrollingElement;
  }

  return typeof document.documentElement !== 'undefined' ? document.documentElement : document.body;
}

var SCROLL_SPEED = 20;

var scrollingElement = getScrollingElement();
var targetTop = void 0;
var scrollSpeed = void 0;

function scroll(currentTop) {
  if (currentTop < targetTop) {
    window.requestAnimationFrame(function () {
      var nextTop = currentTop + SCROLL_SPEED > targetTop ? targetTop : currentTop + scrollSpeed;
      scrollingElement.scrollTop = nextTop;
      scroll(nextTop);
    });
  }
}

function scrollTo(targetEl) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  scrollingElement = opts.scrollView || scrollingElement;
  scrollSpeed = opts.scrollSpeed || SCROLL_SPEED;
  targetTop = targetEl.offsetTop - (opts.marginTop || 0);

  if (scrollingElement && typeof targetTop === 'number') {
    scroll(scrollingElement.offsetTop);
  }
}

return scrollTo;

})));
