import { Link } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWhatsapp,
  faGithub,
  faFacebook,
  faTelegram,
  faInstagram,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { faCookieBite } from '@fortawesome/free-solid-svg-icons';
import './Footer.scss';
import PropTypes from 'prop-types';

const FOOTER_NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'stats', label: 'Stats' },
  { id: 'about', label: 'About' },
  { id: 'resume', label: 'Resume' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' },
];

const Footer = ({ onOpenCookiePreferences }) => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: faLinkedin,
      url: 'https://www.linkedin.com/in/nasssar/',
      label: 'LinkedIn',
    },
    { icon: faGithub, url: 'https://github.com/AhmedNassar7', label: 'GitHub' },
    { icon: faWhatsapp, url: 'https://wa.me/201110102554', label: 'WhatsApp' },
    {
      icon: faFacebook,
      url: 'https://fb.com/profile.php?id=100004270350132',
      label: 'Facebook',
    },
    {
      icon: faInstagram,
      url: 'https://www.instagram.com/ahmed_nassar__',
      label: 'Instagram',
    },
    { icon: faTelegram, url: 'https://t.me/nassarrrr', label: 'Telegram' },
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
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label={link.label}
            >
              <FontAwesomeIcon icon={link.icon} />
            </a>
          ))}
        </div>

        <div className="footer-meta">
          <div className="copyright">
            © {currentYear} Ahmed Nassar – All Rights Reserved
          </div>
          <button
            type="button"
            className="cookie-preferences-link"
            onClick={onOpenCookiePreferences}
          >
            <FontAwesomeIcon icon={faCookieBite} />
            Cookie Preferences
          </button>
          <div className="made-with-love">
            Made with <span className="heart">❤️</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  onOpenCookiePreferences: PropTypes.func.isRequired,
};

export default Footer;
