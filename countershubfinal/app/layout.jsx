import './globals.css';
import Link from 'next/link';

export const metadata = { title: 'Countershub', description: 'Counters for GAC, TW, and Fleets' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav><Link href="/">Home</Link> | <Link href="/gac">GAC</Link> | <Link href="/tw">TW</Link> | <Link href="/fleets">Fleets</Link> | <Link href="/search">Search</Link> | <Link href="/legal/disclaimer">Legal</Link></nav>
        <div className="container">{children}</div>
      </body>
    </html>
  );
}