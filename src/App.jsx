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
import { trackEvent } from './utils/analytics';
import ReactGA from 'react-ga4';
import { throttle } from 'lodash';
import './styles/main.scss';

function App() {
  const [theme, setTheme] = useState('light');
  const [showScrollTop, setShowScrollTop] = useState(false);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize Google Analytics
    if (!ReactGA.isInitialized) {
      try {
        ReactGA.initialize('G-XGC9BKTSD1');
        ReactGA.send('pageview');
      } catch (error) {
        console.error('Google Analytics initialization error:', error);
      }
    }

    try {
      const savedTheme = localStorage.getItem('theme') || 'light';
      setTheme(savedTheme);
      document.body.className = `${savedTheme}-theme`;
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      setTheme('light');
    }

    // Optimize scroll event handling
    const handleScroll = throttle(() => {
      setShowScrollTop(window.pageYOffset > 300);
    }, 200);

    window.addEventListener('scroll', handleScroll);

    // Simulate loading time (for demo purposes)
    // const timer = setTimeout(() => {
    //   setLoading(false); // After 1 second, set loading to false
    // }, 1500);

    return () => {
      // clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.className = `${newTheme}-theme`;

    trackEvent({
      action: 'toggle_theme',
      category: 'User Preferences',
      label: `Switched to ${newTheme} mode`,
      value: 1,
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    // Track scroll-to-top event
    trackEvent({
      action: 'scroll_to_top',
      category: 'Navigation',
      label: 'Scroll to Top',
      value: 1,
    });
  };

  // if (loading) {
  //   return (
  //     <div className="loading-spinner">
  //       <div className="dots">
  //         <div className="dot"></div>
  //         <div className="dot"></div>
  //         <div className="dot"></div>
  //       </div>
  //     </div>
  //   );
  // }

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
        // aria-live="polite"
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </>
  );
}

export default App;
