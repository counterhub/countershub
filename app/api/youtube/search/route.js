export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim();
  const maxResults = searchParams.get("maxResults") || "6";
  const key = process.env.YOUTUBE_API_KEY;

  if (!key) {
    return NextResponse.json({ error: "Missing YOUTUBE_API_KEY" }, { status: 500 });
  }
  if (!q) {
    return NextResponse.json({ items: [] }, { headers: { "Cache-Control": "no-store" } });
  }

  const url = new URL("https://www.googleapis.com/youtube/v3/search");
  url.search = new URLSearchParams({
    key,
    part: "snippet",
    type: "video",
    maxResults,
    q
  });

  const res = await fetch(url.toString());
  const text = await res.text();

  if (!res.ok) {
    return NextResponse.json(
      { error: "YouTube search failed", status: res.status, body: text },
      { status: res.status, headers: { "Cache-Control": "no-store" } }
    );
  }

  let data;
  try { data = JSON.parse(text); }
  catch {
    return NextResponse.json(
      { error: "Parse error", body: text },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }

  const items = (data.items || [])
    .map(v => ({
      id: v.id?.videoId,
      title: v.snippet?.title,
      channel: v.snippet?.channelTitle,
      publishedAt: v.snippet?.publishedAt,
      thumbnail: v.snippet?.thumbnails?.medium?.url,
      url: v.id?.videoId ? `https://www.youtube.com/watch?v=${v.id.videoId}` : null
    }))
    .filter(v => v.id && v.url);

  return NextResponse.json({ items, q }, { headers: { "Cache-Control": "no-store" } });
}
