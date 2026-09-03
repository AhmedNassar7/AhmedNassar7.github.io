import { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';
import { scroller } from 'react-scroll';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Stats from './components/Stats/Stats';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Resume from './components/Resume/Resume';
import Testimonials from './components/Testimonials/Testimonials';
import Contact from './components/Contact/Contact';
import Guestbook from './components/Guestbook/Guestbook';
import Quotes from './components/Quotes/Quotes';
import Footer from './components/Footer/Footer';
const ParticlesBackground = lazy(
  () => import('./components/ParticlesBackground/ParticlesBackground'),
);
import CursorGlow from './components/CursorGlow/CursorGlow';
import LikeButton from './components/LikeButton/LikeButton';
import KonamiEasterEgg from './components/KonamiEasterEgg/KonamiEasterEgg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { trackEvent } from './utils/analytics';
import { printConsoleGreeting } from './utils/consoleGreeting';
import CommandPalette from './components/CommandPalette/CommandPalette';
import Terminal from './components/Terminal/Terminal';
import ReactGA from 'react-ga4';
import throttle from 'lodash/throttle';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './styles/main.scss';

const initAnalytics = () => {
  if (ReactGA.isInitialized) return;
  try {
    ReactGA.initialize(import.meta.env.VITE_GOOGLE_ANALYTICS_ID, {
      debug: import.meta.env.MODE !== 'production',
    });
    ReactGA.send('pageview');
  } catch (error) {
    console.error('Google Analytics initialization error:', error);
  }
};

function App() {
  const [theme, setTheme] = useState('light');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initAnalytics();
    printConsoleGreeting();

    // Manage theme from localStorage
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

    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Initialize AOS once the sections have actually mounted (they're gated
    // behind `loading`). AOS is a global singleton — calling AOS.init() from
    // multiple components re-scans and resets every [data-aos] element's
    // state each time, stomping other components' in-progress or completed
    // animations, so it must only happen once for the whole app.
    if (!loading) {
      AOS.init({
        duration: 1000,
        once: true,
        offset: 50,
        // Respect the OS-level reduced-motion preference: AOS has no
        // built-in awareness of it, so without this every scroll-reveal
        // animation still runs (and still does its layout work) for
        // visitors who've explicitly opted out of non-essential motion.
        disable: () =>
          window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      });

      // Sections don't mount until the loading screen clears, so the
      // browser's native fragment navigation (e.g. a shared /#resume link)
      // fires before its target exists and silently does nothing. Finish
      // that navigation manually once the real content is in the DOM.
      const hash = window.location.hash.slice(1);
      if (hash) {
        scroller.scrollTo(hash, { offset: -70, duration: 0 });
      }
    }
  }, [loading]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.className = `${newTheme}-theme`;

    trackEvent('toggle_theme', { theme_mode: newTheme });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    // Track scroll-to-top event
    trackEvent('scroll_to_top');
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <Suspense fallback={null}>
        <ParticlesBackground theme={theme} />
      </Suspense>
      <CursorGlow theme={theme} />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <CommandPalette theme={theme} toggleTheme={toggleTheme} />
      <Terminal theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Home />
        <Stats theme={theme} />
        <About />
        <Projects />
        <Resume />
        <Testimonials />
        <Contact />
        <Guestbook />
        <Quotes />
      </main>
      <Footer />
      <LikeButton scrolled={showScrollTop} />
      <KonamiEasterEgg />
      <AnimatePresence>
        {showScrollTop && (
          <m.button
            className="scroll-to-top"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            whileHover={{ scale: 1.12, y: -3 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </m.button>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}

export default App;
