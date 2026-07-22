import '@testing-library/jest-dom/vitest';

// jsdom doesn't implement Element.scrollTo (all real browsers do), which
// crashes any component that calls it on a ref (e.g. auto-scrolling a log).
if (!Element.prototype.scrollTo) {
  Element.prototype.scrollTo = () => {};
}
