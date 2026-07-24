/**
 * Converts a display string into a GA4-friendly snake_case identifier,
 * e.g. "Egypt Metro Backend" -> "egypt_metro_backend".
 * @param {string} value
 * @returns {string}
 */
export const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
