import { useState } from 'react';
import PropTypes from 'prop-types';
import { slugify } from '../../utils/slugify';
import { getInitials } from '../../utils/initials';

// PwC and xAI's marks are near-black, which would vanish against the dark
// theme's card background. PwC gets a small white plate behind it in the
// interview marquee (see .org-logo-photo there), but xAI's mark is simple
// enough to invert to white directly instead, so it stays box-free too.
const INVERT_IN_DARK = new Set(['xai']);

// Auto-discovers any logo dropped in assets/images/logos, keyed by the
// slugified company/school name (e.g. "Beshara Group" -> beshara_group.png).
// Orgs without a matching file just fall back to an initials badge, so this
// never breaks the build while logos are being sourced.
//
// Standard for new logo files:
// - Name the file `${slugify(companyName)}.<ext>` (see utils/slugify) so it's
//   picked up automatically — no code changes needed elsewhere.
// - Prefer SVG (the official wordmark/logo, not a favicon or app icon) with
//   a transparent background. If only a raster version is available, it
//   must also have a transparent background (no baked-in white/colored
//   box) and be at least ~300px on its longer side so it doesn't blur when
//   scaled up to the marquee's display size.
// - Keep the source's real brand colors — don't flatten a colored mark to
//   black/grey.
// - If the mark is near-black or very dark, it'll still render fine in
//   light mode; check it against the dark theme's card background too. The
//   marquee already puts every logo on a small white plate in dark mode
//   (see .interview-icon .org-logo-photo in Resume.scss) for contrast — only
//   add a slug to INVERT_IN_DARK below if the mark is simple enough to flip
//   to solid white instead of sitting on that plate.
const logoModules = import.meta.glob(
  '../../assets/images/logos/*.{png,jpg,jpeg,svg,webp}',
  { eager: true, import: 'default' },
);
const logosByKey = Object.fromEntries(
  Object.entries(logoModules).map(([path, url]) => [
    path
      .split('/')
      .pop()
      .replace(/\.[^.]+$/, ''),
    url,
  ]),
);

const OrgLogo = ({ name }) => {
  const [failed, setFailed] = useState(false);
  const key = slugify(name);
  const src = logosByKey[key];

  if (src && !failed) {
    const classes = ['org-logo-photo'];
    if (INVERT_IN_DARK.has(key)) classes.push('org-logo-photo-invert');
    return (
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className={classes.join(' ')}
        width="48"
        height="48"
        loading="lazy"
        decoding="async"
        draggable="false"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <div className="org-logo-fallback" aria-hidden="true">
      {getInitials(name)}
    </div>
  );
};

OrgLogo.propTypes = {
  name: PropTypes.string.isRequired,
};

export default OrgLogo;
