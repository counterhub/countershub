import Link from "next/link";
import fleets from "../../data/fleets.json";
import "./fleets.css";

export default function FleetsPage() {
  return (
    <div className="fleets-page">
      <h1>Capital Fleets</h1>
      <div className="fleets-grid">
        {fleets.map((fleet) => (
          <div key={fleet.id} className="fleet-card">
            <img
              src={`/assets/ships/${fleet.image}`}
              alt={fleet.name}
              title={fleet.name}
            />
            <h2>{fleet.name}</h2>
            <Link href={`/fleets/${fleet.id}`}>View Counters</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
