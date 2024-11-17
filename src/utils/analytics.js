/**
 * Tracks an event using Google Analytics.
 *
 * @param {Object} params - The event parameters.
 * @param {string} params.action - The action of the event.
 * @param {string} params.category - The category of the event.
 * @param {string} params.label - The label of the event.
 * @param {number} params.value - The value of the event.
 */
export const trackEvent = ({ action, category, label, value }) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  } else {
    console.warn(
      `Google Analytics is not initialized. Event details: action=${action}, category=${category}, label=${label}, value=${value}`,
    );
  }
};
