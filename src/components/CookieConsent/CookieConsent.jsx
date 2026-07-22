import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import './CookieConsent.scss';

const CookieConsent = ({ visible, onAccept, onDecline }) => {
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
            your choice anytime via <strong>Cookie Preferences</strong> in the
            footer.
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
