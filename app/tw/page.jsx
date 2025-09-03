'use client';
import React from "react";
import data from "@/data/tw.json";

export default function TWPage() {
  return (
    <main style={{ padding: "20px" }}>
      <h1>Territory War Counters</h1>
      {data.length === 0 ? (
        <p>No TW counters found.</p>
      ) : (
        <ul>
          {data.map((tw, i) => (
            <li key={i} style={{ marginBottom: "15px" }}>
              <strong>{tw.counter}</strong> beats <em>{tw.target}</em> <br />
              Difficulty: {tw.difficulty} <br />
              Notes: {tw.notes} <br />
              <a href={tw.proof} target="_blank" rel="noreferrer">Proof</a>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
