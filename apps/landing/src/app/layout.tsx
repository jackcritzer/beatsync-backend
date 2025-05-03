import '../styles/globals.css';

export const metadata = {
  title: 'Cadence Studio',
  description: 'Join the waitlist to collaborate on music projects.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}