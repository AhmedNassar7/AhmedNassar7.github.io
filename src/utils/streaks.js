// Computes current/longest contribution streaks from a GitHub Contributions
// API response (https://github-contributions-api.jogruber.de), the same
// data source react-github-calendar uses internally for the heatmap.
export const calculateStreaks = (contributions) => {
  if (!contributions || contributions.length === 0) {
    return { current: 0, longest: 0 };
  }

  let longest = 0;
  let running = 0;
  for (const day of contributions) {
    if (day.count > 0) {
      running += 1;
      longest = Math.max(longest, running);
    } else {
      running = 0;
    }
  }

  // Walk backward from the most recent day. Today having zero contributions
  // yet is expected mid-day and shouldn't zero out an otherwise-live streak,
  // so the walk starts from the latest day that already has one.
  let startIndex = contributions.length - 1;
  if (contributions[startIndex].count === 0) {
    startIndex -= 1;
  }

  let current = 0;
  for (let i = startIndex; i >= 0; i -= 1) {
    if (contributions[i].count > 0) {
      current += 1;
    } else {
      break;
    }
  }

  return { current, longest };
};
