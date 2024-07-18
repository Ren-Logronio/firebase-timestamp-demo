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

export function getTimezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
