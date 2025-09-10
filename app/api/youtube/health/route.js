export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

export async function GET() {
  const hasKey = !!process.env.YOUTUBE_API_KEY;
  const keyLen = process.env.YOUTUBE_API_KEY ? process.env.YOUTUBE_API_KEY.length : 0;

  // If no key, report immediately
  if (!hasKey) {
    return NextResponse.json(
      { ok: false, reason: "Missing YOUTUBE_API_KEY in this environment." },
      { status: 500 }
    );
  }

  // Try a very broad query to rule out “no results”
  const url = new URL("https://www.googleapis.com/youtube/v3/search");
  url.search = new URLSearchParams({
    key: process.env.YOUTUBE_API_KEY,
    part: "snippet",
    type: "video",
    maxResults: "1",
    q: "SWGOH fleet counter"
  });

  const res = await fetch(url.toString());
  const text = await res.text(); // raw response for debugging

  if (!res.ok) {
    return NextResponse.json(
      {
        ok: false,
        reason: "YouTube search failed",
        status: res.status,
        body: text
      },
      { status: res.status }
    );
  }

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = { parseError: "Could not parse JSON", raw: text };
  }

  return NextResponse.json({
    ok: true,
    hasKey,
    keyLen,
    sampleItems: data.items?.length || 0
  });
}
