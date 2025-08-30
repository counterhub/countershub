import { NextResponse } from 'next/server';
import { searchYouTube } from '@/lib/youtubeFetcher';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query') || '';
  if (!query) return NextResponse.json([], { status: 200 });

  const key = process.env.YOUTUBE_API_KEY || process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || '';
  if (!key) return NextResponse.json([], { status: 200 });

  try {
    const items = await searchYouTube(query, key);
    return NextResponse.json(items ?? []);
  } catch (e) {
    return NextResponse.json([], { status: 200 });
  }
}