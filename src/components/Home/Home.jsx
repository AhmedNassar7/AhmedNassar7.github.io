import { lazy, Suspense, useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-scroll';
import { m } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './Home.scss';
import profileImage from '../../assets/images/profile.png';
import profileImageWebp from '../../assets/images/profile.webp';
import { trackEvent } from '../../utils/analytics';
import { useVirtualPageView } from '../../hooks/useVirtualPageView';

// Three.js/react-three-fiber add a non-trivial chunk of JS, so the shape is
// split into its own lazily-loaded bundle — visitors with reduced motion
// enabled never mount it and never pay for the chunk at all.
const RotatableShape = lazy(() => import('./RotatableShape'));

const Home = () => {
  const sectionRef = useVirtualPageView('Home', '/#home');
  const [enable3D, setEnable3D] = useState(false);

  useEffect(() => {
    // Mirrors the reduced-motion check AOS already applies app-wide (see
    // App.jsx) — the shape is decorative, so visitors who've opted out of
    // non-essential motion just don't get it, and never load the chunk.
    setEnable3D(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

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
    <section id="home" className="home-section" ref={sectionRef}>
      <Container>
        <Row className="align-items-center min-vh-100">
          <Col md={6} className="text-center" data-aos="fade-right">
            <div className="profile-image-container">
              <picture>
                <source srcSet={profileImageWebp} type="image/webp" />
                {/* No `fetchPriority` — React 18 doesn't recognise the prop
                    (it warns and drops it); the image is small, above the
                    fold and has explicit dimensions, so the browser
                    prioritises it anyway. */}
                <img
                  src={profileImage}
                  alt="Ahmed Nassar"
                  className="profile-image"
                  width="406"
                  height="301"
                />
              </picture>
              {enable3D ? (
                <Suspense fallback={null}>
                  <RotatableShape />
                </Suspense>
              ) : (
                <div className="orbit-ball orbit-ball-1"></div>
              )}
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
              <m.div
                className="social-links"
                variants={socialContainerVariants}
                initial="hidden"
                animate="visible"
              >
                {socialLinks.map((link, index) => (
                  <m.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    aria-label={link.label}
                    variants={socialItemVariants}
                    whileHover={{
                      y: -8,
                      transition: { duration: 0.2, ease: 'easeOut' },
                    }}
                    whileTap={{
                      scale: 0.85,
                      transition: { duration: 0.1, ease: 'easeOut' },
                    }}
                    onClick={() =>
                      trackEvent('select_content', {
                        content_type: 'social_profile',
                        content_id: link.contentId,
                      })
                    }
                  >
                    <FontAwesomeIcon icon={link.icon} />
                  </m.a>
                ))}
              </m.div>
              <div>
                <Link
                  to="stats"
                  href="#stats"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="scroll-indicator"
                  aria-label="Scroll to Stats section"
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
