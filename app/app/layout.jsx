import './globals.css';

export const metadata = {
  title: 'Countershub',
  description: 'A better place for SWGOH counters',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
