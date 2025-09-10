// app/api/counters/[fleetid]/route.js
import counters from "../../../../data/meta-counters.json";

export async function GET(req, { params }) {
  const { fleetid } = params;
  const fleetCounters = counters[fleetid] || [];
  return Response.json({ counters: fleetCounters });
}
