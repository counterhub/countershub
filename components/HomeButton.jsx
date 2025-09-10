"use client";

import Link from "next/link";
import "./ui.css";

export default function HomeButton() {
  return (
    <Link href="/" className="btn-home" aria-label="Go to Home">
      ⟵ Home
    </Link>
  );
}
