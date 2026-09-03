// Minimal in-house replacement for the `aos` package (which shipped ~6 KB
// gzipped of JS + CSS and a global singleton that had to be re-init'd
// carefully). It reuses the existing [data-aos] / [data-aos-delay]
// attributes already in the markup and the matching rules in
// styles/scrollReveal.scss, so no component markup changes.
//
// Behaviour matches how AOS.init() was configured in App.jsx:
//   - once per element (no replay on scroll-back)
//   - ~50px offset before an element counts as "in view"
//   - fully disabled (everything shown immediately) under
//     prefers-reduced-motion
//   - elements already in or above the viewport on load (e.g. a reload with
//     the page scrolled down) are revealed without waiting for a scroll

const REVEAL_CLASS = 'aos-animate';
const OFFSET = 50;

let started = false;

export const initScrollReveal = () => {
  if (
    started ||
    typeof window === 'undefined' ||
    typeof document === 'undefined'
  )
    return;
  started = true;

  const nodes = () => document.querySelectorAll('[data-aos]');

  const reducedMotion = window.matchMedia?.(
    '(prefers-reduced-motion: reduce)',
  ).matches;

  // Opted out of motion, or no IntersectionObserver — show every element in
  // its final state right away, exactly as AOS's `disable` option did.
  if (reducedMotion || !('IntersectionObserver' in window)) {
    nodes().forEach((el) => el.classList.add(REVEAL_CLASS));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const delay = el.getAttribute('data-aos-delay');
        if (delay) el.style.transitionDelay = `${delay}ms`;
        el.classList.add(REVEAL_CLASS);
        observer.unobserve(el); // `once: true`
      });
    },
    { rootMargin: `0px 0px -${OFFSET}px 0px`, threshold: 0 },
  );

  nodes().forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight - OFFSET) {
      el.classList.add(REVEAL_CLASS);
    } else {
      observer.observe(el);
    }
  });
};
