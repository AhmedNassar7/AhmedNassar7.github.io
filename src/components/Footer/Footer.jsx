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
import './Footer.scss';
import { useState, useEffect } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const currentDate = new Date().toLocaleDateString();

  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString(),
  );

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000); // Update every second

    return () => clearInterval(timeInterval); // Cleanup the interval on unmount
  }, []);

  const quickLinks = ['Home', 'About', 'Resume', 'Contact'];
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
          {quickLinks.map((link) => (
            <Link
              key={link}
              to={link.toLowerCase()}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="quick-link"
            >
              {link}
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

        <div className="date-time">
          <div className="date-container">
            <span className="label">Date</span>
            <span className="date">{currentDate}</span>
          </div>
          <div className="time-container">
            <span className="label">Time</span>
            <span className="time">{currentTime}</span>
          </div>
        </div>

        <div className="copyright">
          © {currentYear} Ahmed Nassar – All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
