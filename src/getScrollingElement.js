export default function getScrollingElement() {
  if (typeof document.scrollingElement !== 'undefined') {
    return document.scrollingElement;
  }

  return (typeof document.documentElement !== 'undefined') ? document.documentElement : document.body;
}
