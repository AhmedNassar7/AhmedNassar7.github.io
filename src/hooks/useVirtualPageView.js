import { useEffect, useRef } from 'react';
import { trackEvent } from '../utils/analytics';

// Module-scope, not component state: guarantees each virtual page fires at
// most once per full page load no matter how many times its section
// re-enters the viewport while the visitor scrolls up and down.
const firedPaths = new Set();

/**
 * Fires a GA4 "page_view" event the first time a section clears the
 * viewport, standing in for a real navigation in this single-page app.
 * page_title/page_location are automatically-collected GA4 parameters, so
 * these virtual views need no custom dimension setup — they show up
 * immediately in the standard "Pages and screens" report.
 *
 * @param {string} title - e.g. "Home", "Resume" — shown as the GA4 page title.
 * @param {string} path - virtual path, e.g. "/#home" — shown as the page path.
 * @returns {React.RefObject} attach to the section's root DOM node.
 */
export const useVirtualPageView = (title, path) => {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || firedPaths.has(path)) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || firedPaths.has(path)) return;
        firedPaths.add(path);
        trackEvent('page_view', {
          page_title: title,
          page_location: `${window.location.origin}${window.location.pathname}${path}`,
        });
        observer.disconnect();
      },
      { threshold: 0.5 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [title, path]);

  return ref;
};
