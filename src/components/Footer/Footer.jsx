import PropTypes from 'prop-types';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import './Footer.scss';
import { trackEvent } from '../../utils/analytics';
import { useMagneticHover } from '../../hooks/useMagneticHover';

const FOOTER_NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'stats', label: 'Stats' },
  { id: 'about', label: 'About' },
  { id: 'resume', label: 'Resume' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' },
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
      <FontAwesomeIcon icon={link.icon} />
    </motion.a>
  );
};

MagneticSocialIcon.propTypes = {
  link: PropTypes.shape({
    icon: PropTypes.object.isRequired,
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
        </div>

        <div className="footer-meta">
          <div className="copyright">
            © {currentYear} Ahmed Nassar – All Rights Reserved
          </div>
          <div className="made-with-love">
            Made with <span className="heart">❤️</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
