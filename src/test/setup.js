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

// jsdom doesn't implement matchMedia either (used for reduced-motion and
// hover-capability checks). Default every query to non-matching, so tilt
// effects gated on `(hover: hover) and (pointer: fine)` stay off — the same
// way a touch device or headless browser would see it.
if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    addEventListener() {},
    removeEventListener() {},
    // Legacy MediaQueryList API — deprecated, but framer-motion's internal
    // reduced-motion detection still calls addListener/removeListener, so
    // without these it throws on mount for every motion component.
    addListener() {},
    removeListener() {},
  });
}
