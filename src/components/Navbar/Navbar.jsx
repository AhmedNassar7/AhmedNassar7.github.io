import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-scroll';
import { Container, Nav, Navbar as BootstrapNavbar } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import './Navbar.scss';

const Navbar = ({ theme, toggleTheme }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [expanded, setExpanded] = useState(false);

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

  const handleNavClick = () => {
    setExpanded(false);
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
          <BootstrapNavbar.Brand href="#home">
            <img
              src="/favicon.svg"
              alt="Logo"
              height="30"
              className="d-inline-block align-top"
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
              {['Home', 'About', 'Resume', 'Testimonials', 'Contact'].map(
                (item) => (
                  <Nav.Item key={item}>
                    <Link
                      className="nav-link"
                      to={item.toLowerCase()}
                      href={`#${item.toLowerCase()}`}
                      spy={true}
                      smooth={true}
                      offset={-70}
                      duration={500}
                      onClick={handleNavClick}
                    >
                      {item}
                    </Link>
                  </Nav.Item>
                ),
              )}
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
