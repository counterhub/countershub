"use client";

import Link from "next/link";
import "./ui.css";

export default function LegalCorner() {
  return (
    <Link href="/legal" className="legal-corner" aria-label="Legal">
      Legal
    </Link>
  );
}
