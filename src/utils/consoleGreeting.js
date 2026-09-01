// Guards against React 18 StrictMode double-invoking the mount effect in
// development — the message should appear once per page load.
let printed = false;

/**
 * A friendly, styled message for anyone who opens the browser console —
 * usually a fellow developer or a recruiter poking around. Printed once on
 * app start, one console line per line of text (a single multi-line string
 * renders inconsistently and is awkward to copy). Uses links/handles, not a
 * raw email, so it isn't a scrape target.
 */
export const printConsoleGreeting = () => {
  if (printed) return;
  if (typeof window === 'undefined' || typeof console === 'undefined') return;
  printed = true;

  const title = 'color:#646cff;font-size:15px;font-weight:700';
  const text = 'color:#8a8a99;font-size:12px';
  const link = 'color:#646cff;font-size:12px';

  console.log('%c👋  Hey, curious dev!', title);
  console.log('%cLike the site? The source is open:', text);
  console.log(
    '%c   https://github.com/AhmedNassar7/AhmedNassar7.github.io',
    link,
  );
  console.log(
    "%cI'm open to backend / full-stack roles — say hi via the contact form,",
    text,
  );
  console.log('%c   or linkedin.com/in/nasssar', link);
  console.log(
    '%cPS. there is a Konami code on this page:  ↑ ↑ ↓ ↓ ← → ← → B A',
    text,
  );
};
