import getScrollingElement from './getScrollingElement';

const ACCELERATE_FACTOR = 40;

function calculateScrollSteps(currentTop, targetTop, accelerateFactor) {
  const steps = [];

  if (currentTop !== targetTop) {
    const isForwardDirection = (currentTop < targetTop);
    const sign = isForwardDirection ? 1 : -1;
    let nextY = isForwardDirection ? (targetTop - currentTop) : (currentTop - targetTop);
    let step = 0;

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

function scroll(index, scrollSteps, scrollingElement) {
  if (index < scrollSteps.length) {
    window.requestAnimationFrame(() => {
      scrollingElement.scrollTop += scrollSteps[index];
      scroll(index + 1, scrollSteps, scrollingElement);
    });
  }
}

export function scrollTo(targetEl, opts = {}) {
  const scrollingElement = opts.scrollView || getScrollingElement();
  const accelerateFactor = opts.accelerateFactor || ACCELERATE_FACTOR;
  const targetTop = targetEl.offsetTop - (opts.marginTop || 0);

  if (scrollingElement && typeof targetTop === 'number') {
    const scrollSteps = calculateScrollSteps(scrollingElement.scrollTop,
      targetTop, accelerateFactor);
    scroll(0, scrollSteps, scrollingElement);
  }
}

export function handleLinkClick(e, opts = {}) {
  e.preventDefault();
  scrollTo(document.querySelector(`#${e.target.href.split('#')[1]}`), opts);
}

export { getScrollingElement };
