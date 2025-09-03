import fleets from "../../../data/fleets.json";
import Image from "next/image";
import { notFound } from "next/navigation";

export default function FleetDetail({ params }) {
  // Find the fleet by ID from the URL
  const fleet = fleets.find(
    (f) => f.id.toLowerCase() === params.id.toLowerCase()
  );

  if (!fleet) return notFound();

  return (
    <div style={{ padding: "20px" }}>
      <h1>{fleet.target.name} Counters</h1>

      {/* Enemy Fleet (the fleet itself) */}
      <section>
        <h2>Enemy Fleet: {fleet.target.name}</h2>
        <Image
          src={fleet.target.image}
          alt={fleet.target.name}
          width={120}
          height={120}
        />
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          {fleet.ships.map((ship, idx) => (
            <div key={idx} style={{ textAlign: "center" }}>
              <Image
                src={ship.image}
                alt={ship.name}
                width={80}
                height={80}
              />
              <p>{ship.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Counter Fleets */}
      {fleet.counters.map((counter, cidx) => (
        <div
          key={cidx}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            background: "#111",
            padding: "10px",
            borderRadius: "6px",
          }}
        >
          {/* Counter Capital Ship (Left Side) */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Image
              src={counter.image}
              alt={counter.name}
              width={90}
              height={90}
              title={counter.name}
            />
            <div style={{ display: "flex", gap: "6px" }}>
              {counter.fleet.map((ship, sidx) => (
                <Image
                  key={sidx}
                  src={ship.image}
                  alt={ship.name}
                  width={60}
                  height={60}
                  title={ship.name}
                />
              ))}
            </div>
          </div>

          {/* Enemy Fleet again (Right Side) */}
          <div style={{ display: "flex", gap: "6px" }}>
            <Image
              src={fleet.target.image}
              alt={fleet.target.name}
              width={90}
              height={90}
              title={fleet.target.name}
            />
            {fleet.ships.map((ship, sidx) => (
              <Image
                key={sidx}
                src={ship.image}
                alt={ship.name}
                width={60}
                height={60}
                title={ship.name}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
