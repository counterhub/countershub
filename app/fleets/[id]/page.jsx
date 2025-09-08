import fleets from "../../../data/fleets.json";
import "./counters.css";

export default function FleetCounterPage({ params }) {
  const fleet = fleets.find(f => f.id === params.id);

  if (!fleet) return <h1>Fleet not found</h1>;

  return (
    <div className="counter-page">
      <h1>{fleet.name} Counters</h1>
      <div className="counter-grid">
        {/* Capital ship */}
        <div className="capital">
          <img src={`/assets/ships/${fleet.image}`} alt={fleet.name} title={fleet.name} />
          <p>{fleet.name}</p>
        </div>

        {/* Fleet ships */}
        <div className="ships">
          {fleet.ships.map((ship, idx) => (
            <img
              key={idx}
              src={`/assets/ships/${ship}`}
              alt={ship.replace(".webp", "")}
              title={ship.replace(".webp", "")}
            />
          ))}
        </div>

        {/* Counter side */}
        <div className="capital">
          <img src={`/assets/ships/${fleet.counter.image}`} alt={fleet.counter.name} title={fleet.counter.name} />
          <p>{fleet.counter.name}</p>
        </div>

        <div className="ships">
          {fleet.counter.ships.map((ship, idx) => (
            <img
              key={idx}
              src={`/assets/ships/${ship}`}
              alt={ship.replace(".webp", "")}
              title={ship.replace(".webp", "")}
            />
          ))}
        </div>
      </div>

      <div className="confidence">
        <p>Confidence: {fleet.counter.confidence}</p>
        <a href={fleet.counter.video} target="_blank">Watch Counter Guide</a>
      </div>
    </div>
  );
}
