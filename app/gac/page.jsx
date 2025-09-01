"use client";
import { useState } from "react";
import gac3v3 from "../data/gac-3v3.json";
import gac5v5 from "../data/gac-5v5.json";

export default function GACPage() {
  const [mode, setMode] = useState("3v3");
  const data = mode === "3v3" ? gac3v3 : gac5v5;

  return (
    <div style={{ padding: "20px" }}>
      <h1>GAC Counters</h1>

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setMode("3v3")}
          style={{
            padding: "6px 12px",
            marginRight: "8px",
            background: mode === "3v3" ? "#0070f3" : "#eaeaea",
            color: mode === "3v3" ? "#fff" : "#000",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          3v3
        </button>
        <button
          onClick={() => setMode("5v5")}
          style={{
            padding: "6px 12px",
            background: mode === "5v5" ? "#0070f3" : "#eaeaea",
            color: mode === "5v5" ? "#fff" : "#000",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          5v5
        </button>
      </div>

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
    </div>
  );
}
