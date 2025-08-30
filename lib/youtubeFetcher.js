export async function searchYouTube(query, apiKey) {
  const params = new URLSearchParams({
    part: 'snippet',
    q: query,
    type: 'video',
    maxResults: '5',
    safeSearch: 'none',
    order: 'relevance',
    key: apiKey
  });

  const url = `https://www.googleapis.com/youtube/v3/search?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();

  return (data.items || []).map(it => ({
    url: `https://www.youtube.com/watch?v=${it.id.videoId}`,
    title: it.snippet.title,
    thumbnail: it.snippet.thumbnails?.medium?.url || it.snippet.thumbnails?.default?.url || ''
  }));
}