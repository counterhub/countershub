import fleets from "../../data/fleets.json";
import Image from "next/image";
import Link from "next/link";

export default function FleetsPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Fleet Counters</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
        }}
      >
        {fleets.map((fleet, idx) => (
          <Link key={idx} href={`/fleets/${fleet.id}`}>
            <div
              style={{
                textAlign: "center",
                padding: "10px",
                background: "#222",
                borderRadius: "8px",
              }}
            >
              <Image
                src={fleet.target.image}
                alt={fleet.target.name}
                width={150}
                height={150}
              />
              <h3>{fleet.target.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
