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
