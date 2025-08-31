"use client";
import { useState, useEffect } from "react";

export default function GACPage() {
  const [mode, setMode] = useState("3v3");
  const [data, setData] = useState([]);

  useEffect(() => {
    import(`../../data/gac-${mode}.json`).then((res) => {
      setData(res.default);
    });
  }, [mode]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>GAC Counters</h1>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setMode("3v3")}>3v3</button>
        <button onClick={() => setMode("5v5")}>5v5</button>
      </div>

      {data.length === 0 ? (
        <p>No counters found.</p>
      ) : (
        <ul>
          {data.map((c, i) => (
            <li key={i} style={{ marginBottom: "15px" }}>
              <strong>{c.counter}</strong> beats <em>{c.target}</em> <br />
              Difficulty: {c.difficulty} <br />
              Notes: {c.notes} <br />
              <a href={c.proof} target="_blank" rel="noreferrer">
                Proof
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
