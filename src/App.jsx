import { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import About from './components/About/About';
import Resume from './components/Resume/Resume';
import Contact from './components/Contact/Contact';
import Quotes from './components/Quotes/Quotes';
import Footer from './components/Footer/Footer';
import ParticlesBackground from './components/ParticlesBackground/ParticlesBackground';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import ReactGA from 'react-ga4';
import './styles/main.scss';

function App() {
  const [theme, setTheme] = useState('light');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Initialize Google Analytics
    ReactGA.initialize('G-XGC9BKTSD1');
    ReactGA.send('pageview');

    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.className = `${savedTheme}-theme`;

    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.className = `${newTheme}-theme`;
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <ParticlesBackground theme={theme} />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Home />
        <About />
        <Resume />
        <Contact />
        <Quotes />
      </main>
      <Footer />
      <button
        className={`scroll-to-top ${showScrollTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </>
  );
}

export default App;
