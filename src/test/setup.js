import '@testing-library/jest-dom/vitest';

// jsdom doesn't implement Element.scrollTo (all real browsers do), which
// crashes any component that calls it on a ref (e.g. auto-scrolling a log).
if (!Element.prototype.scrollTo) {
  Element.prototype.scrollTo = () => {};
}

// jsdom doesn't implement IntersectionObserver either (used for virtual
// pageview / scroll tracking). Components just never see an intersection
// in tests, which is fine — nothing under test asserts on it firing.
if (!globalThis.IntersectionObserver) {
  globalThis.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}
