import { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-scroll';
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
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Home.scss';

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 50,
    });
  }, []);

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

  return (
    <section id="home" className="home-section">
      <Container>
        <Row className="align-items-center min-vh-100">
          <Col md={6} className="text-center" data-aos="fade-right">
            <div className="profile-image-container">
              <img
                src="/portfolio/assets/images/profile.png"
                alt="Ahmed Nassar"
                className="profile-image"
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
                    2000,
                    'Web Developer',
                    2000,
                    'Full Stack Developer',
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="typing-text"
                />
              </div>
              <p className="tagline">Turning ideas into reality through code</p>
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
              <div>
                <Link
                  to="about"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="scroll-indicator"
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
