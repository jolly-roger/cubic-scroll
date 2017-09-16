(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.fluidScroll = {})));
}(this, (function (exports) { 'use strict';

var SCROLL_SPEED = 20;

var _scrollingElement = getScrollingElement();
var _targetTop = void 0;
var _scrollSpeed = void 0;

function getScrollingElement() {
	return typeof document.scrollingElement !== 'undefined' ? document.scrollingElement : typeof document.documentElement !== 'undefined' ? document.documentElement : document.body;
}

function scroll(currentTop) {
	if (currentTop < _targetTop) {
		window.requestAnimationFrame(function () {
			var nextTop = currentTop + SCROLL_SPEED > _targetTop ? _targetTop : currentTop + _scrollSpeed;
			_scrollingElement.scrollTop = nextTop;
			scroll(nextTop);
		});
	}
}

function scrollTo(targetEl) {
	var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	_scrollingElement = opts.scrollView || _scrollingElement;
	_scrollSpeed = opts.scrollSpeed || SCROLL_SPEED;
	_targetTop = targetEl.offsetTop - (opts.marginTop || 0);

	if (_scrollingElement && typeof _targetTop === 'number') {
		scroll(_scrollingElement.offsetTop);
	}
}

exports.scrollTo = scrollTo;

Object.defineProperty(exports, '__esModule', { value: true });

})));
