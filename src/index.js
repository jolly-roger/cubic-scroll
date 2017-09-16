import getScrollingElement from './getScrollingElement';

const SCROLL_SPEED = 20;

let scrollingElement = getScrollingElement();
let targetTop;
let scrollSpeed;

function scroll(currentTop) {
  if (currentTop < targetTop) {
    window.requestAnimationFrame(() => {
      const nextTop = ((currentTop + SCROLL_SPEED) > targetTop) ?
        targetTop : (currentTop + scrollSpeed);
      scrollingElement.scrollTop = nextTop;
      scroll(nextTop);
    });
  }
}

export default function scrollTo(targetEl, opts = {}) {
  scrollingElement = opts.scrollView || scrollingElement;
  scrollSpeed = opts.scrollSpeed || SCROLL_SPEED;
  targetTop = targetEl.offsetTop - (opts.marginTop || 0);

  if (scrollingElement && typeof targetTop === 'number') {
    scroll(scrollingElement.offsetTop);
  }
}
