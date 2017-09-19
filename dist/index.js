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

function getRequestAnimationFrame() {
  return window.requestAnimationFrame ? window.requestAnimationFrame : window.webkitRequestAnimationFrame;
}

var ACCELERATE_FACTOR = 40;

function calculateScrollSteps(currentTop, targetTop, accelerateFactor) {
  var steps = [];

  if (currentTop !== targetTop) {
    var isForwardDirection = currentTop < targetTop;
    var sign = isForwardDirection ? 1 : -1;
    var nextY = isForwardDirection ? targetTop - currentTop : currentTop - targetTop;
    var step = 0;

    while (nextY > 0) {
      step = Math.ceil(Math.cbrt(nextY * accelerateFactor));
      nextY -= step;

      if (nextY < 0) {
        step += nextY;
      }

      steps.push(step * sign);
    }
  }

  return steps;
}

function scroll(index, scrollSteps, scrollingElement, callback) {
  if (index < scrollSteps.length) {
    getRequestAnimationFrame()(function () {
      scrollingElement.scrollTop += scrollSteps[index];
      scroll(index + 1, scrollSteps, scrollingElement, callback);
    });
  } else {
    callback();
  }
}

function scrollTo(targetEl) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var scrollingElement = opts.scrollView || getScrollingElement();
  var accelerateFactor = typeof opts.accelerateFactor === 'number' ? opts.accelerateFactor : ACCELERATE_FACTOR;
  var callback = typeof opts.callback === 'function' ? opts.callback : function () {};
  var targetTop = targetEl ? targetEl.offsetTop - (opts.marginTop || 0) : 0;

  if (scrollingElement && typeof targetTop === 'number') {
    var scrollSteps = calculateScrollSteps(scrollingElement.scrollTop, targetTop, accelerateFactor);
    scroll(0, scrollSteps, scrollingElement, function () {
      return callback(targetEl);
    });
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
