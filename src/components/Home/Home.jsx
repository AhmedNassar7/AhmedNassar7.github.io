import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWhatsapp,
  faGithub,
  faLinkedin,
  faTelegram,
  faInstagram,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './Home.scss';
import profileImage from '../../assets/images/profile.png';
import { trackEvent } from '../../utils/analytics';

const Home = () => {
  const socialLinks = [
    {
      icon: faLinkedin,
      url: 'https://www.linkedin.com/in/nasssar/',
      label: 'LinkedIn',
    },
    { icon: faGithub, url: 'https://github.com/AhmedNassar7', label: 'GitHub' },
    { icon: faWhatsapp, url: 'https://wa.me/201110102554', label: 'WhatsApp' },
    { icon: faTelegram, url: 'https://t.me/nassarrrr', label: 'Telegram' },
    {
      icon: faInstagram,
      url: 'https://www.instagram.com/ahmed_nassar__',
      label: 'Instagram',
    },
    {
      icon: faFacebook,
      url: 'https://fb.com/profile.php?id=100004270350132',
      label: 'Facebook',
    },
  ];

  const socialContainerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: 0.3 },
    },
  };

  const socialItemVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <section id="home" className="home-section">
      <Container>
        <Row className="align-items-center min-vh-100">
          <Col md={6} className="text-center" data-aos="fade-right">
            <div className="profile-image-container">
              <img
                src={profileImage}
                alt="Ahmed Nassar"
                className="profile-image"
                loading="lazy"
              />
              <div className="orbit-ball orbit-ball-1"></div>
              <div className="orbit-ball orbit-ball-2"></div>
              {/* <div className="orbit-ball orbit-ball-3"></div> */}
            </div>
          </Col>
          <Col md={6} className="text-center" data-aos="fade-left">
            <div className="content-wrapper">
              <h1 className="name">Ahmed Nassar</h1>
              <div className="typing-container">
                <TypeAnimation
                  sequence={[
                    'Software Engineer',
                    1000,
                    'Java Developer',
                    1000,
                    'Python Developer',
                    1000,
                    'DSF Member',
                    1000,
                    'Community Builder',
                    1000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="typing-text"
                />
              </div>
              <p className="tagline">Turning ideas into reality through code</p>
              <motion.div
                className="social-links"
                variants={socialContainerVariants}
                initial="hidden"
                animate="visible"
              >
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    aria-label={link.label}
                    variants={socialItemVariants}
                    whileTap={{ scale: 0.85 }}
                    onClick={() => {
                      try {
                        trackEvent({
                          action: 'click_social_media',
                          category: 'Social Media',
                          label: link.label,
                          url: link.url,
                          value: 1,
                        });
                      } catch (error) {
                        console.error(
                          'Tracking social media link click home failed:',
                          error,
                        );
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={link.icon} />
                  </motion.a>
                ))}
              </motion.div>
              <div>
                <Link
                  to="about"
                  href="#about"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="scroll-indicator"
                  aria-label="Scroll to About section"
                >
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="scroll-arrow"
                  />
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Home;
