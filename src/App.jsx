import { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { scroller } from 'react-scroll';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
// Below-the-fold sections are code-split out of the initial bundle — they're
// still fetched right away (see the prefetch effect below), just as separate
// chunks the browser can load in parallel instead of parsing/executing them
// all as part of the critical initial script.
const ParticlesBackground = lazy(
  () => import('./components/ParticlesBackground/ParticlesBackground'),
);
const Stats = lazy(() => import('./components/Stats/Stats'));
const About = lazy(() => import('./components/About/About'));
const Resume = lazy(() => import('./components/Resume/Resume'));
const Testimonials = lazy(
  () => import('./components/Testimonials/Testimonials'),
);
const Contact = lazy(() => import('./components/Contact/Contact'));
const Quotes = lazy(() => import('./components/Quotes/Quotes'));
const Footer = lazy(() => import('./components/Footer/Footer'));
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { trackEvent } from './utils/analytics';
import { getConsent, setConsent } from './utils/consent';
import CookieConsent from './components/CookieConsent/CookieConsent';
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
  const [cookieBannerVisible, setCookieBannerVisible] = useState(false);

  useEffect(() => {
    // Google Analytics only starts collecting data once the visitor has
    // explicitly accepted the cookie consent banner (GDPR requirement).
    const consent = getConsent();
    if (consent === 'granted') {
      initAnalytics();
    } else if (consent === null) {
      setCookieBannerVisible(true);
    }

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
    // The below-the-fold sections are code-split so the initial bundle stays
    // small, but they're reached within the same scroll session rather than
    // a real navigation — so fetch their chunks during idle time right away
    // instead of waiting for each Suspense boundary to request them on
    // render. That way the chunks are usually already cached by the time the
    // user scrolls down, and Suspense's fallback rarely has to show at all.
    if (loading) return undefined;

    const prefetch = () => {
      import('./components/Stats/Stats');
      import('./components/About/About');
      import('./components/Resume/Resume');
      import('./components/Testimonials/Testimonials');
      import('./components/Contact/Contact');
      import('./components/Quotes/Quotes');
      import('./components/Footer/Footer');
    };

    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(prefetch);
      return () => window.cancelIdleCallback(id);
    }
    const timer = setTimeout(prefetch, 200);
    return () => clearTimeout(timer);
  }, [loading]);

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

  const handleAcceptCookies = () => {
    setConsent('granted');
    setCookieBannerVisible(false);
    initAnalytics();
  };

  const handleDeclineCookies = () => {
    setConsent('denied');
    setCookieBannerVisible(false);
  };

  const handleOpenCookiePreferences = () => {
    setCookieBannerVisible(true);
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
    <>
      <Suspense fallback={null}>
        <ParticlesBackground theme={theme} />
      </Suspense>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <CommandPalette theme={theme} toggleTheme={toggleTheme} />
      <Terminal theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Home />
        <Suspense fallback={null}>
          <Stats theme={theme} />
        </Suspense>
        <Suspense fallback={null}>
          <About />
        </Suspense>
        <Suspense fallback={null}>
          <Resume />
        </Suspense>
        <Suspense fallback={null}>
          <Testimonials />
        </Suspense>
        <Suspense fallback={null}>
          <Contact />
        </Suspense>
        <Suspense fallback={null}>
          <Quotes />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer onOpenCookiePreferences={handleOpenCookiePreferences} />
      </Suspense>
      <CookieConsent
        visible={cookieBannerVisible}
        onAccept={handleAcceptCookies}
        onDecline={handleDeclineCookies}
      />
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
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
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
