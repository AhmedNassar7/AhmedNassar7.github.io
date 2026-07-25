import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import './CookieConsent.scss';

const CookieConsent = ({ visible, onAccept, onDecline }) => {
  const scrollToFooterPreferences = () => {
    const target = document.getElementById('footer-cookie-preferences');
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // Move focus too, not just the viewport — keyboard/screen-reader users
    // get taken to the real control, not just a visual scroll.
    target.focus({ preventScroll: true });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="cookie-consent"
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        >
          <p className="cookie-consent-text">
            This site uses cookies to understand visits — nothing more. Change
            your choice anytime via{' '}
            <button
              type="button"
              className="cookie-preferences-inline-link"
              onClick={scrollToFooterPreferences}
            >
              Cookie Preferences
            </button>{' '}
            in the footer.
          </p>
          <div className="cookie-consent-actions">
            <button
              type="button"
              className="cookie-btn decline"
              onClick={onDecline}
            >
              Decline
            </button>
            <button
              type="button"
              className="cookie-btn accept"
              onClick={onAccept}
            >
              Accept
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

CookieConsent.propTypes = {
  visible: PropTypes.bool.isRequired,
  onAccept: PropTypes.func.isRequired,
  onDecline: PropTypes.func.isRequired,
};

export default CookieConsent;
