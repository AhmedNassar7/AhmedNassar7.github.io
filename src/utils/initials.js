/**
 * Reduces a name to its first two initials for use as an avatar/logo
 * fallback, e.g. "Beshara Group" -> "BG".
 * @param {string} name
 * @returns {string}
 */
export const getInitials = (name) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
