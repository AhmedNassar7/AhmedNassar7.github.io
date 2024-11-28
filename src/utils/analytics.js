import ReactGA from 'react-ga4';
import { Logger, LogLevel } from './logger';

// Instantiate the Logger
const logger = new Logger(LogLevel.DEBUG);

/**
 * Tracks an event using Google Analytics.
 *
 * @param {Object} params - The event parameters.
 * @param {string} params.action - The action of the event.
 * @param {string} params.category - The category of the event.
 * @param {string} params.label - The label of the event.
 * @param {number} params.value - The value of the event.
 * @param {boolean} params.debug - Whether to log debug information.
 */
export const trackEvent = ({
  action,
  category,
  label,
  value = 1,
  debug = false,
}) => {
  try {
    // Check if the environment is production (use the Vite environment variable)
    const isProduction = import.meta.env.MODE === 'production';
    // Only enable debug in development
    debug = debug && !isProduction;
    // Log the event details to the console
    // console.log('Event triggered:', action, category, label, value);
    // // Log the debug mode to the console
    // console.log('Debug is', debug);
    // // Log the environment to the console
    // console.log('Is production?', isProduction);

    // If debug mode is enabled, log the event details
    if (debug) {
      logger.debug(
        `Tracking Event: ${action} | ${category} | ${label} | ${value}`,
      );
    }

    // Track event using GA4 if gtag.js is available
    if (typeof window.gtag === 'function') {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value,
      });
      if (debug) {
        logger.debug(
          `GA4 Event Tracked: ${action} | ${category} | ${label} | ${value}`,
        );
      }
    }
    // Fallback to ReactGA if gtag.js is unavailable
    else if (ReactGA?.event) {
      ReactGA.event({
        category,
        action,
        label,
        value,
      });
      if (debug) {
        logger.debug(
          `UA Event Tracked: ${action} | ${category} | ${label} | ${value}`,
        );
      }
    }
    // Warn if no analytics provider is initialized
    else {
      logger.warn(
        `Analytics provider is not initialized: ${action}, ${category}, ${label}, ${value}`,
      );
    }
  } catch (error) {
    logger.error(`Error tracking event: ${error.message}`);
  }
};
