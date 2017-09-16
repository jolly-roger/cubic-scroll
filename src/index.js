const SCROLL_SPEED = 20;

let _scrollingElement = getScrollingElement();
let _targetTop;
let _scrollSpeed;

function getScrollingElement() {
	return ((typeof document.scrollingElement !== 'undefined') ? document.scrollingElement :
		(typeof document.documentElement !== 'undefined') ? document.documentElement : document.body);
}

function scroll(currentTop) {
	if (currentTop < _targetTop) {
		window.requestAnimationFrame(function () {
			var nextTop = ((currentTop + SCROLL_SPEED) > _targetTop) ?
				_targetTop : (currentTop + _scrollSpeed);
			_scrollingElement.scrollTop = nextTop;
			scroll(nextTop);
		});
	}
}

export function scrollTo (targetEl, opts = {}) {
	_scrollingElement = opts.scrollView || _scrollingElement;
	_scrollSpeed = opts.scrollSpeed || SCROLL_SPEED;
	_targetTop = targetEl.offsetTop - (opts.marginTop || 0);

	if (_scrollingElement && typeof _targetTop === 'number') {
		scroll(_scrollingElement.offsetTop);
	}
}
