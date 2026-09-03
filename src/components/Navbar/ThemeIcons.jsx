import PropTypes from 'prop-types';

// Inlined from lucide-react (ISC licensed) so the theme toggle's two icons
// don't pull the whole `lucide-react` package into the bundle for a single
// pair of glyphs. Same 24×24 viewBox, stroke geometry and default props as
// lucide's <Sun /> and <Moon />, so the existing CSS (`.theme-icon svg`)
// and `size` prop keep working unchanged.
const base = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export const Sun = ({ size = 24, ...props }) => (
  <svg width={size} height={size} {...base} {...props} aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

export const Moon = ({ size = 24, ...props }) => (
  <svg width={size} height={size} {...base} {...props} aria-hidden="true">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

Sun.propTypes = {
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
Moon.propTypes = {
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
