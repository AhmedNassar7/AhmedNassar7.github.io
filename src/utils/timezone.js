// Derives IANA timezone offsets/hours/abbreviations via Intl only — no
// timezone library needed, and DST transitions are handled automatically
// by the environment's tz database instead of being hardcoded here.

// Formats `date` as if it were UTC in `timeZone`, then diffs that against
// the real UTC timestamp to recover the zone's offset — the standard
// Intl-only trick for this, since Intl has no direct "get offset" API.
export const getTimezoneOffsetMinutes = (date, timeZone) => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
    .formatToParts(date)
    .reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});

  const asUTC = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour),
    Number(parts.minute),
    Number(parts.second),
  );
  return (asUTC - date.getTime()) / 60000;
};

export const getTimezoneAbbreviation = (date, timeZone) => {
  const part = new Intl.DateTimeFormat('en-US', {
    timeZone,
    timeZoneName: 'short',
  })
    .formatToParts(date)
    .find((p) => p.type === 'timeZoneName');
  return part ? part.value : '';
};

export const getHourInTimezone = (date, timeZone) =>
  Number(
    new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour: '2-digit',
      hourCycle: 'h23',
    }).format(date),
  );

// `end` is exclusive — a 10-22 window covers the 10:00 through 21:59 hours.
export const isWithinWorkingHours = (date, timeZone, { start, end }) => {
  const hour = getHourInTimezone(date, timeZone);
  return hour >= start && hour < end;
};

// Positive = timeZoneA is ahead of timeZoneB.
export const getHourDifference = (date, timeZoneA, timeZoneB) => {
  const offsetA = getTimezoneOffsetMinutes(date, timeZoneA);
  const offsetB = getTimezoneOffsetMinutes(date, timeZoneB);
  return Math.round((offsetA - offsetB) / 60);
};

// "America/Argentina/Buenos_Aires" -> "Buenos Aires"
export const getTimezoneCityName = (timeZone) =>
  timeZone.split('/').pop().replace(/_/g, ' ');
