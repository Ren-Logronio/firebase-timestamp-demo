import { onRequest } from "firebase-functions/v2/https";
import { formatTimestamp, getTimezone } from "./helpers/date-helpers";

/**
 * Difference between the server's timestamp and the client's timestamp in unix format.
 */
export const timestamp = onRequest((request, response) => {
  const { timestamp: clientTimestamp } = request.body;
  const timestamp = Date.now();
  const difference = clientTimestamp ? timestamp - clientTimestamp : null;
  response.send({
    timestamp: {
      client: formatTimestamp(clientTimestamp),
      server: formatTimestamp(timestamp),
    },
    difference,
    timezone: getTimezone(),
  });
});
