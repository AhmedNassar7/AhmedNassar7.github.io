import ReactGA from 'react-ga4';
import { Logger, LogLevel } from './logger';

const logger = new Logger(LogLevel.INFO);

/**
 * Sends a GA4 event. Uses gtag.js directly when available (it's what
 * ReactGA.initialize() loads onto window), falling back to ReactGA's own
 * wrapper. Both are no-ops until the visitor accepts the cookie consent
 * banner and initAnalytics() (src/App.jsx) has run, so this never fires
 * before consent.
 *
 * @param {string} eventName - snake_case GA4 event name (e.g. "select_content").
 *   Avoid GA4's own automatically-collected names (page_view is the one
 *   exception — see useVirtualPageView — plus scroll, click, file_download,
 *   form_start, form_submit, view_search_results, video_start/progress/complete)
 *   for anything NOT meant to represent that same automatic signal: reusing
 *   one of those names merges your custom hits into Enhanced Measurement's
 *   own bucket for that name, double counting the interaction and making the
 *   Events report meaningless for both signals at once.
 * @param {Object} [params] - snake_case GA4 event parameters.
 */
export const trackEvent = (eventName, params = {}) => {
  try {
    const isProduction = import.meta.env.MODE === 'production';

    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    } else if (ReactGA?.event) {
      ReactGA.event(eventName, params);
    } else {
      logger.warn(
        `Analytics provider is not initialized: ${eventName} ${JSON.stringify(params)}`,
      );
      return;
    }

    if (!isProduction) {
      logger.debug(`GA4 event tracked: ${eventName} ${JSON.stringify(params)}`);
    }
  } catch (error) {
    logger.error(`Error tracking event "${eventName}": ${error.message}`);
  }
};
