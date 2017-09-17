import getScrollingElement from './getScrollingElement';

const SCROLL_SPEED = 20;

let scrollingElement;
let targetTop;
let scrollSpeed;

function scroll() {
  const currentTop = scrollingElement.scrollTop;

  if (currentTop !== targetTop) {
    let nextTop;

    if (currentTop < targetTop) {
      nextTop = ((currentTop + SCROLL_SPEED) > targetTop) ?
        targetTop : (currentTop + scrollSpeed);
    } else {
      nextTop = ((currentTop - SCROLL_SPEED) < targetTop) ?
        targetTop : (currentTop - scrollSpeed);
    }

    window.requestAnimationFrame(() => {
      scrollingElement.scrollTop = nextTop;
      scroll();
    });
  }
}

export function scrollTo(targetEl, opts = {}) {
  scrollingElement = opts.scrollView || getScrollingElement();
  scrollSpeed = opts.scrollSpeed || SCROLL_SPEED;
  targetTop = targetEl.offsetTop - (opts.marginTop || 0);

  if (scrollingElement && typeof targetTop === 'number') {
    scroll();
  }
}

export function handleLinkClick(e, opts = {}) {
  e.preventDefault();
  scrollTo(document.querySelector(`#${e.target.href.split('#')[1]}`), opts);
}

export { getScrollingElement };
