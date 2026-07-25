import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-scroll';
import { Container, Nav, Navbar as BootstrapNavbar } from 'react-bootstrap';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import './Navbar.scss';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'stats', label: 'Stats' },
  { id: 'about', label: 'About' },
  { id: 'resume', label: 'Resume' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = ({ theme, toggleTheme }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.pageYOffset / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setExpanded(false);
    // Keep the address bar in sync with the section in view without
    // polluting browser history with an entry per section (replaceState,
    // not pushState/location.hash — both of the latter would also fight
    // react-scroll's own smooth-scroll animation with a native jump).
    window.history.replaceState(null, '', `#${id}`);
  };

  return (
    <>
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />
      <BootstrapNavbar
        fixed="top"
        expand="lg"
        className={`navbar-${theme} bg-${theme} bg-opacity-75`}
        expanded={expanded}
      >
        <Container>
          <BootstrapNavbar.Brand href="#home" className="brand-logo-link">
            <motion.img
              src="/favicon.svg"
              alt="Logo"
              width="29"
              height="30"
              className="d-inline-block align-top brand-logo"
              animate={{ scale: 1, filter: 'drop-shadow(0 0 0px transparent)' }}
              whileHover={{
                scale: 1.1,
                filter: 'drop-shadow(0 0 12px var(--primary))',
              }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.94 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </BootstrapNavbar.Brand>
          {/* Theme Toggle Button */}
          <motion.button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.85 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === 'dark' ? (
                <motion.span
                  key="sun"
                  className="theme-icon"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <Sun className="w-5 h-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="moon"
                  className="theme-icon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <Moon className="w-5 h-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
          {/* Custom Toggler */}
          <BootstrapNavbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setExpanded(!expanded)}
            className="custom-toggler"
          >
            {expanded ? '✕' : '☰'}
          </BootstrapNavbar.Toggle>
          <BootstrapNavbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              {NAV_ITEMS.map((item) => (
                <Nav.Item key={item.id}>
                  <Link
                    className="nav-link"
                    to={item.id}
                    href={`#${item.id}`}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    onClick={() => handleNavClick(item.id)}
                  >
                    {item.label}
                  </Link>
                </Nav.Item>
              ))}
            </Nav>
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>
    </>
  );
};

Navbar.propTypes = {
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

export default Navbar;
