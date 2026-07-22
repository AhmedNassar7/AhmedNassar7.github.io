const CONSENT_KEY = 'cookie_consent';

/**
 * Reads the stored analytics consent decision.
 * @returns {'granted'|'denied'|null} null means the visitor hasn't decided yet.
 */
export const getConsent = () => {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
};

export const setConsent = (decision) => {
  try {
    localStorage.setItem(CONSENT_KEY, decision);
  } catch {
    // localStorage unavailable (private mode, storage disabled, etc.) — the
    // banner will simply reappear next visit, which is an acceptable fallback.
  }
};
