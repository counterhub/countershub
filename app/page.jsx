"use client";

import Link from "next/link";
import "./home.css";

export default function HomePage() {
  return (
    <div className="home-page">
      <div className="overlay">
        <h1 className="title">Countershub</h1>
        <div className="tile-grid">
          <Link href="/gac" className="tile">GAC</Link>
          <Link href="/tw" className="tile">TW</Link>
          <Link href="/fleets" className="tile">Ships</Link>
          <Link href="/submissions" className="tile">New Discoveries</Link>
        </div>
        <footer className="footer">
          <Link href="/legal" className="legal-link">Legal</Link>
        </footer>
      </div>
    </div>
  );
}
