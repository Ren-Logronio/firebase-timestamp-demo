/** Format a timestamp into a unix timestamp and an ISO string.
 * @param {number} timestamp - The timestamp to format
 * @return {Object} The formatted timestamp
 * */
export function formatTimestamp(timestamp?: number | string | null) {
  if (!timestamp) {
    return null;
  }
  const date = new Date(timestamp);
  return {
    unix: date.getTime(),
    iso: date.toISOString(),
  };
}

/** Format a duration into a human-readable string.
 * @param {number} ms - The duration in milliseconds
 * @param {string} locale - The locale to use
 * @return {string} The formatted duration
 */
export function relativeTimeFormat(ms: number, locale = "en-US") {
  const duration = ms / 1000;
  const minutes = Math.floor(duration / 60) % 60;
  const hours = Math.floor(duration / 3600) % 24;
  const days = Math.floor(duration / 86400);
  const months = Math.floor(duration / 2592000);
  const years = Math.floor(duration / 31536000);
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  if (years) {
    return rtf.format(-years, "year");
  }
  if (months) {
    return rtf.format(-months, "month");
  }
  if (days) {
    return rtf.format(-days, "day");
  }
  if (hours) {
    return rtf.format(-hours, "hour");
  }
  if (minutes) {
    return rtf.format(-minutes, "minute");
  }
  return rtf.format(-duration, "second");
}
