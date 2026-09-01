import PropTypes from 'prop-types';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faLinkedin,
  faPaypal,
} from '@fortawesome/free-brands-svg-icons';
import { SiKofi } from 'react-icons/si';
import './Footer.scss';
import { trackEvent } from '../../utils/analytics';
import { useMagneticHover } from '../../hooks/useMagneticHover';
import Signature from '../Signature/Signature';
import instapayIcon from '../../assets/images/logos/instapay.png';

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
    <motion.a
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
    </motion.a>
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
      icon: SiKofi,
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
