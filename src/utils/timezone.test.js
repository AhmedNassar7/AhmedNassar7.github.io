import { describe, it, expect } from 'vitest';
import {
  getTimezoneOffsetMinutes,
  getTimezoneAbbreviation,
  getHourInTimezone,
  isWithinWorkingHours,
  getHourDifference,
  getTimezoneCityName,
} from './timezone';

// 'Etc/GMT-5' is a fixed UTC+5 offset with no DST (note the inverted POSIX
// sign), which makes it a reliable, environment-independent zone to test
// offset math against — unlike named zones, whose DST rules could vary
// between ICU/tzdata versions in different CI environments.
const JAN_2026_UTC = new Date('2026-01-15T10:00:00Z');
const JUL_2026_UTC = new Date('2026-07-15T10:00:00Z');

describe('getTimezoneOffsetMinutes', () => {
  it('returns 0 for UTC', () => {
    expect(getTimezoneOffsetMinutes(JAN_2026_UTC, 'UTC')).toBe(0);
  });

  it('returns the fixed offset for a non-DST zone', () => {
    expect(getTimezoneOffsetMinutes(JAN_2026_UTC, 'Etc/GMT-5')).toBe(300);
  });
});

describe('getHourInTimezone', () => {
  it('computes the local hour from a UTC instant', () => {
    // 10:00 UTC + 5 hours = 15:00 local
    expect(getHourInTimezone(JAN_2026_UTC, 'Etc/GMT-5')).toBe(15);
  });
});

describe('isWithinWorkingHours', () => {
  it('is true inside the window', () => {
    // Local hour is 15 (see above), window is 10-22
    expect(
      isWithinWorkingHours(JAN_2026_UTC, 'Etc/GMT-5', { start: 10, end: 22 }),
    ).toBe(true);
  });

  it('is false outside the window', () => {
    expect(
      isWithinWorkingHours(JAN_2026_UTC, 'Etc/GMT-5', { start: 16, end: 22 }),
    ).toBe(false);
  });

  it('treats the end boundary as exclusive', () => {
    expect(
      isWithinWorkingHours(JAN_2026_UTC, 'Etc/GMT-5', { start: 10, end: 15 }),
    ).toBe(false);
  });
});

describe('getHourDifference', () => {
  it('is positive when the first zone is ahead', () => {
    expect(getHourDifference(JAN_2026_UTC, 'Etc/GMT-5', 'UTC')).toBe(5);
  });

  it('is the negation when the zones are swapped', () => {
    expect(getHourDifference(JAN_2026_UTC, 'UTC', 'Etc/GMT-5')).toBe(-5);
  });

  it('is 0 for the same zone', () => {
    expect(getHourDifference(JAN_2026_UTC, 'Etc/GMT-5', 'Etc/GMT-5')).toBe(0);
  });
});

describe('getTimezoneAbbreviation', () => {
  it('resolves the standard-time abbreviation in January', () => {
    expect(getTimezoneAbbreviation(JAN_2026_UTC, 'America/New_York')).toBe(
      'EST',
    );
  });

  it('resolves the daylight-time abbreviation in July', () => {
    expect(getTimezoneAbbreviation(JUL_2026_UTC, 'America/New_York')).toBe(
      'EDT',
    );
  });
});

describe('getTimezoneCityName', () => {
  it('takes the last path segment and replaces underscores', () => {
    expect(getTimezoneCityName('Africa/Cairo')).toBe('Cairo');
    expect(getTimezoneCityName('America/New_York')).toBe('New York');
    expect(getTimezoneCityName('America/Argentina/Buenos_Aires')).toBe(
      'Buenos Aires',
    );
  });
});
