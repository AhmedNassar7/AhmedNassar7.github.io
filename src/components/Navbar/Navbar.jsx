import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-scroll';
import { Container, Nav, Navbar as BootstrapNavbar } from 'react-bootstrap';
import { Sun, Moon } from 'lucide-react';
import logo from '/logo.svg';
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
              src={logo}
              alt="Logo"
              height="30"
              className="d-inline-block align-top"
            />
          </BootstrapNavbar.Brand>
          {/* Theme Toggle Button */}
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
          {/* Custom Toggler */}
          <BootstrapNavbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setExpanded(!expanded)}
            className="custom-toggler d-block d-sm-none"
          >
            {expanded ? '✕' : '☰'}
          </BootstrapNavbar.Toggle>
          <BootstrapNavbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              {['Home', 'About', 'Resume', 'Contact'].map((item) => (
                <Nav.Item key={item}>
                  <Link
                    className="nav-link"
                    to={item.toLowerCase()}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    onClick={handleNavClick}
                  >
                    {item}
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
