// Client-side helper that calls our server route (keeps your API key secret)
async function fetchYouTubeTop(query, { limit = 3 } = {}) {
  const q = (query || "").trim();
  if (!q) return [];

  const res = await fetch(
    `/api/youtube/search?q=${encodeURIComponent(q)}&maxResults=${Math.max(limit * 2, limit)}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`YouTube search failed (${res.status}) ${body}`);
  }

  const { items } = await res.json();
  return Array.isArray(items) ? items.slice(0, limit) : [];
}

export { fetchYouTubeTop };
export default fetchYouTubeTop;
