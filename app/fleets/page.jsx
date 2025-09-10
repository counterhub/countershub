"use client";

import Link from "next/link";
import fleets from "../../data/fleets.json";
import "./fleets.css";

export default function FleetsPage() {
  return (
    <div className="fleets-page">
      <div className="nav-buttons">
        <Link href="/" className="nav-btn">Home</Link>
      </div>
      <h1 className="page-title">Capital Fleets</h1>
      <div className="fleets-grid">
        {fleets.map((fleet) => (
          <Link key={fleet.id} href={`/fleets/${fleet.id}`} className="fleet-card">
            <img src={`/${fleet.image}`} alt={fleet.name} />
            <p>{fleet.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
