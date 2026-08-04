import { useEffect, useState } from 'react';

/**
 * Tracks whether a media query currently matches, updating live as the
 * viewport/OS preference changes (resize, reduced-motion toggle, etc).
 *
 * @param {string} query - e.g. '(max-width: 768px)', '(prefers-reduced-motion: reduce)'
 * @returns {boolean}
 */
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handleChange = () => setMatches(mql.matches);

    handleChange();
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
};
