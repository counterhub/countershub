"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import fleets from "../../../data/fleets.json";
import "./counters.css";
import { fetchYouTubeTop } from "../../../lib/youtubeFetcher";

// helpers
const starters = (arr) => arr.slice(0, 3);
const reinforcements = (arr) => arr.slice(3, 7);

export default function FleetCounterPage({ params }) {
  const fleet = fleets.find((f) => f.id === params.id);
  if (!fleet) return <h1 className="counter-missing">Fleet not found</h1>;

  const [videosByCounter, setVideosByCounter] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const fetchAll = async () => {
      const all = {};
      for (const counter of fleet.counters || []) {
        const query = `SWGOH ${fleet.name} vs ${counter.name} fleet`;
        try {
          const vids = await fetchYouTubeTop(query, { limit: 3 });
          if (!ignore) all[counter.id] = vids;
        } catch {
          if (!ignore) all[counter.id] = [];
        }
      }
      if (!ignore) {
        setVideosByCounter(all);
        setLoading(false);
      }
    };

    fetchAll();
    return () => {
      ignore = true;
    };
  }, [fleet]);

  return (
    <div className="counter-page">
      <div className="nav-buttons">
        <Link href="/" className="nav-btn">Home</Link>
        <button className="nav-btn" onClick={() => history.back()}>Back</button>
      </div>

      <h1 className="page-title">{fleet.name} Counters</h1>

      {fleet.counters.map((counter, i) => (
        <div key={i} className="counter-block">
          {/* Fleet vs Counter */}
          <div className="mirror-grid">
            {/* LEFT: target fleet */}
            <section className="side">
              <div className="capital">
                <img src={`/${fleet.image}`} alt={fleet.name} />
                <p className="capital-name">{fleet.name}</p>
              </div>
              <div className="ships">
                <div className="row starters">
                  {starters(fleet.ships).map((ship, idx) => (
                    <img key={idx} src={`/${ship}`} alt={ship} />
                  ))}
                </div>
                <div className="row reinforcements">
                  {reinforcements(fleet.ships).map((ship, idx) => (
                    <img key={idx} src={`/${ship}`} alt={ship} />
                  ))}
                </div>
              </div>
            </section>

            {/* RIGHT: counter fleet */}
            <section className="side">
              <div className="capital">
                <img src={`/${counter.image}`} alt={counter.name} />
                <p className="capital-name">{counter.name}</p>
              </div>
              <div className="ships">
                <div className="row starters">
                  {starters(counter.ships).map((ship, idx) => (
                    <img key={idx} src={`/${ship}`} alt={ship} />
                  ))}
                </div>
                <div className="row reinforcements">
                  {reinforcements(counter.ships).map((ship, idx) => (
                    <img key={idx} src={`/${ship}`} alt={ship} />
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Confidence */}
          <div className="confidence">
            <p>Confidence: <strong>{counter.confidence}</strong></p>
          </div>

          {/* Videos */}
          <div className="videos">
            <h2>Guides: {fleet.name} vs {counter.name}</h2>
            {loading ? (
              <p className="muted">Fetching YouTube guides...</p>
            ) : videosByCounter[counter.id] && videosByCounter[counter.id].length > 0 ? (
              <div className="video-grid">
                {videosByCounter[counter.id].map((v, idx) => (
                  <a
                    key={idx}
                    href={v.url}
                    target="_blank"
                    rel="noreferrer"
                    className="video-card"
                  >
                    <img src={v.thumbnail} alt={v.title} />
                    <div className="video-meta">
                      <span className="video-title">{v.title}</span>
                      <span className="video-channel">{v.channel}</span>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <p className="muted">No videos available for this counter yet.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
