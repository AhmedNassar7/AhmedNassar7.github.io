import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getConsent, setConsent } from './consent';

describe('consent utils', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns null when no decision has been stored', () => {
    expect(getConsent()).toBeNull();
  });

  it('round-trips a decision through localStorage', () => {
    setConsent('granted');
    expect(getConsent()).toBe('granted');

    setConsent('denied');
    expect(getConsent()).toBe('denied');
  });

  it('getConsent falls back to null if localStorage throws', () => {
    const spy = vi
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementation(() => {
        throw new Error('storage disabled');
      });

    expect(getConsent()).toBeNull();
    spy.mockRestore();
  });

  it('setConsent does not throw if localStorage is unavailable', () => {
    const spy = vi
      .spyOn(Storage.prototype, 'setItem')
      .mockImplementation(() => {
        throw new Error('storage disabled');
      });

    expect(() => setConsent('granted')).not.toThrow();
    spy.mockRestore();
  });
});
