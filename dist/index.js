(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.fluidScroll = {})));
}(this, (function (exports) { 'use strict';

function getScrollingElement(documentEl) {
  var doc = documentEl || document;

  if (doc.scrollingElement) {
    return doc.scrollingElement;
  }

  return doc.documentElement ? doc.documentElement : doc.body;
}

var SPEED = 20;

var scrollingElement = void 0;
var targetTop = void 0;
var speed = void 0;

function scroll() {
  var currentTop = scrollingElement.scrollTop;

  if (currentTop !== targetTop) {
    var nextTop = void 0;

    if (currentTop < targetTop) {
      nextTop = currentTop + SPEED > targetTop ? targetTop : currentTop + speed;
    } else {
      nextTop = currentTop - SPEED < targetTop ? targetTop : currentTop - speed;
    }

    window.requestAnimationFrame(function () {
      scrollingElement.scrollTop = nextTop;
      scroll();
    });
  }
}

function scrollTo(targetEl) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  scrollingElement = opts.scrollView || getScrollingElement();
  speed = opts.speed || SPEED;
  targetTop = targetEl.offsetTop - (opts.marginTop || 0);

  if (scrollingElement && typeof targetTop === 'number') {
    scroll();
  }
}

function handleLinkClick(e) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  e.preventDefault();
  scrollTo(document.querySelector('#' + e.target.href.split('#')[1]), opts);
}

exports.scrollTo = scrollTo;
exports.handleLinkClick = handleLinkClick;
exports.getScrollingElement = getScrollingElement;

Object.defineProperty(exports, '__esModule', { value: true });

})));
