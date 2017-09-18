export default function getRequestAnimationFrame() {
  return window.requestAnimationFrame ?
    window.requestAnimationFrame : window.webkitRequestAnimationFrame;
}
