"use client";
import data from "../data/fleets.json";

export default function FleetsPage() {
  return (
    <main style={{ padding: "20px" }}>
      <h1 className="text-2xl font-bold mb-4">FLEETS Counters</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((entry, index) => (
          <div
            key={index}
            className="card p-4 border rounded-lg shadow bg-white"
          >
            <img
              src={entry.image}
              alt={entry.target}
              className="w-full h-40 object-contain rounded-md mb-2"
            />
            <h3 className="text-lg font-bold text-center mb-2">
              {entry.target}
            </h3>
            <p><strong>Counter:</strong> {entry.counter.join(", ")}</p>
            <p><strong>Difficulty:</strong> {entry.difficulty}</p>
            <p><strong>Notes:</strong> {entry.notes}</p>
            <a
              href={entry.proof}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline block mt-2 text-center"
            >
              Watch Proof
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
