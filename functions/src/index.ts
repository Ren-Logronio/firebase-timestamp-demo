import { onRequest } from "firebase-functions/v2/https";
import { formatTimestamp, relativeTimeFormat } from "./helpers/time-helpers";

type TimestampRequest = {
  timestamp?: string | number | null;
  locale?: string;
};

/**
 * Difference between the server's and client's timestamp in unix format.
 */
export const timestamp = onRequest(
  { enforceAppCheck: true },
  (request, response) => {
    let { timestamp: clientTimestamp = "", locale = "en" }: TimestampRequest =
      request.query;
    const timestamp = Date.now();
    clientTimestamp = clientTimestamp
      ? Number.isNaN(Number(clientTimestamp))
        ? new Date(clientTimestamp).getTime()
        : Number(clientTimestamp)
      : null;
    const difference = clientTimestamp ? timestamp - clientTimestamp : null;
    response.send({
      timestamp: {
        client: formatTimestamp(clientTimestamp),
        server: formatTimestamp(timestamp),
      },
      difference,
      differenceRelativeTime: difference
        ? relativeTimeFormat(difference, locale)
        : null,
    });
  }
);
