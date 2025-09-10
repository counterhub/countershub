"use client";

import { useState } from "react";
import "./submit.css";
import HomeButton from "@/components/HomeButton";
import LegalCorner from "@/components/LegalCorner";

const MODES = [
  { id: "ships", label: "Ships" },
  { id: "gac_3v3", label: "GAC 3v3" },
  { id: "gac_5v5", label: "GAC 5v5" },
  { id: "tw", label: "TW" }
];

export default function SubmitPage() {
  const [mode, setMode] = useState("ships");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [notes, setNotes] = useState("");
  const [agreement, setAgreement] = useState("public");
  const [nickname, setNickname] = useState(""); // honeypot
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, title, link, notes, agreement, nickname })
      });

      if (!res.ok) {
        const { error } = await res.json().catch(() => ({}));
        throw new Error(error || `Submit failed (${res.status})`);
      }

      setSubmitted(true);
    } catch (err) {
      setError(err?.message || "Submit failed.");
    }
  }

  if (submitted) {
    return (
      <div className="submit-page">
        <HomeButton />
        <LegalCorner />
        <h1 className="page-title">Thank You!</h1>
        <p>Your submission has been received.</p>
        <p className="muted">We’ll review it and route it appropriately.</p>
      </div>
    );
  }

  return (
    <div className="submit-page">
      <HomeButton />
      <LegalCorner />

      <h1 className="page-title">Submit a Counter</h1>
      <p className="muted" style={{ marginTop: -6, marginBottom: 10 }}>
        Pick a mode, add your YouTube link and notes. Choose whether we can use your video publicly.
      </p>

      <form onSubmit={handleSubmit} className="submit-form">
        {/* Mode */}
        <fieldset>
          <legend>Mode</legend>
          <div className="radio-row">
            {MODES.map((m) => (
              <label key={m.id} className="radio-pill">
                <input
                  type="radio"
                  name="mode"
                  value={m.id}
                  checked={mode === m.id}
                  onChange={() => setMode(m.id)}
                />
                <span>{m.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Title / Matchup */}
        <label>
          Title / Matchup
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Finalizer vs Executor (no ult), JMK vs LV (5v5)"
            required
          />
        </label>

        {/* YouTube Link */}
        <label>
          YouTube Link
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            required
          />
        </label>

        {/* Notes */}
        <label>
          Notes <span className="optional">(optional)</span>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder="Any setup tips, speeds, piloting notes, omicrons, etc."
          />
        </label>

        {/* Agreement */}
        <fieldset>
          <legend>Agreement</legend>
          <label className="check-row">
            <input
              type="radio"
              name="agreement"
              value="public"
              checked={agreement === "public"}
              onChange={() => setAgreement("public")}
            />
            <span>I allow Countershub to use this video on YouTube and the site.</span>
          </label>
          <label className="check-row">
            <input
              type="radio"
              name="agreement"
              value="private"
              checked={agreement === "private"}
              onChange={() => setAgreement("private")}
            />
            <span>Keep private — do not share publicly.</span>
          </label>
        </fieldset>

        {/* Honeypot (hidden) */}
        <label className="honeypot" aria-hidden>
          Nickname (leave blank)
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </label>

        {error && <p className="error">{error}</p>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
