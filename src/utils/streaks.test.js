import { describe, it, expect } from 'vitest';
import { calculateStreaks } from './streaks';

const day = (count) => ({ count });

describe('calculateStreaks', () => {
  it('returns zeros for empty input', () => {
    expect(calculateStreaks([])).toEqual({ current: 0, longest: 0 });
    expect(calculateStreaks(null)).toEqual({ current: 0, longest: 0 });
  });

  it('returns zeros when every day is empty', () => {
    const contributions = [day(0), day(0), day(0)];
    expect(calculateStreaks(contributions)).toEqual({
      current: 0,
      longest: 0,
    });
  });

  it('counts a streak ending today', () => {
    const contributions = [day(0), day(1), day(2), day(1)];
    expect(calculateStreaks(contributions)).toEqual({
      current: 3,
      longest: 3,
    });
  });

  it('keeps the streak alive when today has no contributions yet', () => {
    const contributions = [day(0), day(1), day(2), day(1), day(0)];
    expect(calculateStreaks(contributions)).toEqual({
      current: 3,
      longest: 3,
    });
  });

  it('finds the longest streak even when it is not the current one', () => {
    const contributions = [
      day(1),
      day(1),
      day(1),
      day(1),
      day(0), // streak of 4 broken here
      day(1),
      day(0), // trailing zero: "today", ignored per the grace rule
    ];
    expect(calculateStreaks(contributions)).toEqual({
      current: 1,
      longest: 4,
    });
  });
});
