import getScrollingElement from './getScrollingElement';

const SPEED = 20;

let scrollingElement;
let targetTop;
let speed;

function scroll() {
  const currentTop = scrollingElement.scrollTop;

  if (currentTop !== targetTop) {
    let nextTop;

    if (currentTop < targetTop) {
      nextTop = ((currentTop + SPEED) > targetTop) ?
        targetTop : (currentTop + speed);
    } else {
      nextTop = ((currentTop - SPEED) < targetTop) ?
        targetTop : (currentTop - speed);
    }

    window.requestAnimationFrame(() => {
      scrollingElement.scrollTop = nextTop;
      scroll();
    });
  }
}

export function scrollTo(targetEl, opts = {}) {
  scrollingElement = opts.scrollView || getScrollingElement();
  speed = opts.speed || SPEED;
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
