"use client";
import data from "../data/fleets.json";

export default function FleetsPage() {
  return (
    <main style={{ padding: "20px" }}>
      <h1>FLEETS Counters</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item, index) => (
          <div key={index} className="card p-4 border rounded-lg shadow bg-white">
            <img
              src={item.image}
              alt={item.target}
              className="w-20 h-20 object-cover rounded-full mb-2"
            />
            <h3 className="font-bold">{item.target}</h3>
            <p><strong>Counter:</strong> {item.counter.join(", ")}</p>
            <p><strong>Difficulty:</strong> {item.difficulty}</p>
            <p><strong>Notes:</strong> {item.notes}</p>
            <a
              href={item.proof}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Proof
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}