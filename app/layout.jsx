// app/layout.jsx
import "./globals.css";

export const metadata = {
  title: "Countershub",
  description: "SWGOH counters and fleets",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
