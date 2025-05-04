import '../styles/globals.css';
import Header from '@/components/Header';

export const metadata = {
  title: 'Cadence Studio',
  description: 'Join the waitlist to collaborate on music projects.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Header />
        {children}
      </body>
    </html>
  );
}