import { NextResponse } from "next/server";

function isValidYouTube(url) {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    if (!["youtube.com", "m.youtube.com", "youtu.be"].includes(host)) return false;
    return !!(u.searchParams.get("v") || (host === "youtu.be" && u.pathname.slice(1)));
  } catch {
    return false;
  }
}
function uid() {
  return Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-4);
}

export async function POST(req) {
  const { mode, title, link, notes, agreement, nickname } = await req.json();

  // Honeypot: if bots fill it, drop the request silently
  if (nickname && nickname.trim() !== "") {
    return NextResponse.json({ ok: true, skipped: true });
  }

  // Validate
  const modes = new Set(["ships", "gac_3v3", "gac_5v5", "tw"]);
  if (!modes.has(mode)) return NextResponse.json({ error: "Invalid mode" }, { status: 400 });
  if (!title || !title.trim()) return NextResponse.json({ error: "Missing title" }, { status: 400 });
  if (!link || !isValidYouTube(link)) return NextResponse.json({ error: "Invalid YouTube link" }, { status: 400 });
  if (!["public", "private"].includes(agreement)) return NextResponse.json({ error: "Invalid agreement" }, { status: 400 });

  const id = uid();
  const ts = new Date().toISOString();

  const payload = {
    id,
    ts,
    mode,
    title: title.trim(),
    link: link.trim(),
    notes: (notes || "").trim(),
    agreement,
    status: "pending"
  };

  // For now, just log to server console
  console.log("New submission:", payload);

  return NextResponse.json({ ok: true, id });
}
