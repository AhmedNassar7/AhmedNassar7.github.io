import PropTypes from 'prop-types';
import { Link } from 'react-scroll';
import { m } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faLinkedin,
  faPaypal,
} from '@fortawesome/free-brands-svg-icons';
import './Footer.scss';
import { trackEvent } from '../../utils/analytics';
import { useMagneticHover } from '../../hooks/useMagneticHover';
import Signature from '../Signature/Signature';
import instapayIcon from '../../assets/images/logos/instapay.png';

// Inlined from simple-icons (CC0) — react-icons/si was pulling its whole
// icon module in for this one glyph. Renders at 1em/currentColor exactly
// like the react-icons component it replaces, so the string-vs-object-vs-
// function branch in MagneticSocialIcon and the `.social-icon` CSS are
// unchanged (it still hits the `typeof link.icon === 'function'` case).
const KofiIcon = (props) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path d="M11.351 2.715c-2.7 0-4.986.025-6.83.26C2.078 3.285 0 5.154 0 8.61c0 3.506.182 6.13 1.585 8.493 1.584 2.701 4.233 4.182 7.662 4.182h.83c4.209 0 6.494-2.234 7.637-4a9.5 9.5 0 0 0 1.091-2.338C21.792 14.688 24 12.22 24 9.208v-.415c0-3.247-2.13-5.507-5.792-5.87-1.558-.156-2.65-.208-6.857-.208m0 1.947c4.208 0 5.09.052 6.571.182 2.624.311 4.13 1.584 4.13 4v.39c0 2.156-1.792 3.844-3.87 3.844h-.935l-.156.649c-.208 1.013-.597 1.818-1.039 2.546-.909 1.428-2.545 3.064-5.922 3.064h-.805c-2.571 0-4.831-.883-6.078-3.195-1.09-2-1.298-4.155-1.298-7.506 0-2.181.857-3.402 3.012-3.714 1.533-.233 3.559-.26 6.39-.26m6.547 2.287c-.416 0-.65.234-.65.546v2.935c0 .311.234.545.65.545 1.324 0 2.051-.754 2.051-2s-.727-2.026-2.052-2.026m-10.39.182c-1.818 0-3.013 1.48-3.013 3.142 0 1.533.858 2.857 1.949 3.897.727.701 1.87 1.429 2.649 1.896a1.47 1.47 0 0 0 1.507 0c.78-.467 1.922-1.195 2.623-1.896 1.117-1.039 1.974-2.364 1.974-3.897 0-1.662-1.247-3.142-3.039-3.142-1.065 0-1.792.545-2.338 1.298-.493-.753-1.246-1.298-2.312-1.298" />
  </svg>
);

const FOOTER_NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'stats', label: 'Stats' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'resume', label: 'Resume' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' },
  { id: 'guestbook', label: 'Guestbook' },
];

// A separate component (not inlined in the .map() below) because hooks —
// useMagneticHover included — can't be called inside a loop; each icon
// needs its own independent hover-tracking instance.
const MagneticSocialIcon = ({ link }) => {
  const magnetic = useMagneticHover();

  return (
    <m.a
      ref={magnetic.ref}
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="social-icon"
      aria-label={link.label}
      title={link.label}
      style={magnetic.style}
      onMouseMove={magnetic.onMouseMove}
      onMouseLeave={magnetic.onMouseLeave}
      onClick={() =>
        trackEvent('select_content', {
          content_type: 'social_profile',
          content_id: link.contentId,
        })
      }
    >
      {/* FontAwesome icons are plain objects; react-icons ones (e.g. Ko-fi,
          which FontAwesome's brand set doesn't have) are components; brands
          with no icon-font mark at all (e.g. InstaPay) are image URLs —
          rendered as a CSS mask (silhouette from alpha, not the source
          image's own colors) so it takes the same currentColor/hover
          behavior as the real icon fonts instead of standing out. */}
      {typeof link.icon === 'string' ? (
        <span
          className="brand-mask"
          aria-hidden="true"
          style={{
            WebkitMaskImage: `url(${link.icon})`,
            maskImage: `url(${link.icon})`,
          }}
        />
      ) : typeof link.icon === 'function' ? (
        <link.icon />
      ) : (
        <FontAwesomeIcon icon={link.icon} />
      )}
    </m.a>
  );
};

MagneticSocialIcon.propTypes = {
  link: PropTypes.shape({
    icon: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.func,
      PropTypes.string,
    ]).isRequired,
    url: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    contentId: PropTypes.string.isRequired,
  }).isRequired,
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: faLinkedin,
      url: 'https://www.linkedin.com/in/nasssar/',
      label: 'LinkedIn',
      contentId: 'linkedin_profile',
    },
    {
      icon: faGithub,
      url: 'https://github.com/AhmedNassar7',
      label: 'GitHub',
      contentId: 'github_profile',
    },
  ];

  // Kept out of socialLinks and separated by a divider below — these are
  // support/donation links, not social profiles, so they shouldn't read as
  // just more items in that row. All three are offered rather than picking
  // one, since visitors already set up with one platform rarely have the
  // others — PayPal is the most globally recognized so it leads, Ko-fi
  // follows for anyone who prefers a tip jar, and InstaPay trails since it
  // only works for Egyptian supporters (an Egyptian-bank-only network, not
  // usable from anywhere else, hence the qualifier in its label). InstaPay
  // has no icon-font mark in either set available here (FontAwesome/
  // simple-icons), so it's a local image asset instead — see
  // MagneticSocialIcon's string-vs-object-vs-function branch above.
  const supportLinks = [
    {
      icon: faPaypal,
      url: 'https://paypal.me/Ahmednassar7',
      label: 'Support me on PayPal',
      contentId: 'paypal_support',
    },
    {
      icon: KofiIcon,
      url: 'https://ko-fi.com/ahmed_nassar',
      label: 'Support me on Ko-fi',
      contentId: 'kofi_support',
    },
    {
      icon: instapayIcon,
      url: 'https://ipn.eg/S/ahmed.qnb.com/instapay/7gFajE',
      label: 'Support me via InstaPay (Egypt, mobile banking app only)',
      contentId: 'instapay_support',
    },
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="quick-links">
          {FOOTER_NAV_ITEMS.map((link) => (
            <Link
              key={link.id}
              to={link.id}
              href={`#${link.id}`}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="quick-link"
              onClick={() =>
                window.history.replaceState(null, '', `#${link.id}`)
              }
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="social-links">
          {socialLinks.map((link, index) => (
            <MagneticSocialIcon key={index} link={link} />
          ))}
          <span className="social-divider" aria-hidden="true" />
          {supportLinks.map((link, index) => (
            <MagneticSocialIcon key={index} link={link} />
          ))}
        </div>

        <div className="footer-meta">
          <Signature name="Ahmed Nassar" className="footer-signature" />
          <p className="footer-line">
            Made with <span className="heart">❤️</span> by Ahmed Nassar · ©{' '}
            {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
