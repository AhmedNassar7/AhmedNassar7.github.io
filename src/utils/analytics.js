import ReactGA from 'react-ga4';

/**
 * Tracks an event using Google Analytics.
 *
 * @param {Object} params - The event parameters.
 * @param {string} params.action - The action of the event.
 * @param {string} params.category - The category of the event.
 * @param {string} params.label - The label of the event.
 * @param {number} params.value - The value of the event.
 */
export const trackEvent = ({
  action,
  category,
  label,
  value = 1,
  debug = false,
}) => {
  try {
    // If debug mode is enabled, log the event details
    if (debug) {
      console.info(
        `Tracking Event: ${action} | ${category} | ${label} | ${value}`,
      );
    }

    // Check if GA4 (via gtag.js) is available
    if (typeof window.gtag === 'function') {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value,
      });
      if (debug) {
        console.info(
          `GA4 Event Tracked: ${action} | ${category} | ${label} | ${value}`,
        );
      }
    }
    // Fallback to ReactGA if available and initialized
    else if (ReactGA?.event) {
      ReactGA.event({
        category,
        action,
        label,
        value,
      });
      if (debug) {
        console.info(
          `UA Event Tracked: ${action} | ${category} | ${label} | ${value}`,
        );
      }
    }
    // If no analytics provider is initialized
    else {
      console.warn(
        `Analytics provider is not initialized. Event details: ${action}, ${category}, ${label}, ${value}`,
      );
    }
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};
