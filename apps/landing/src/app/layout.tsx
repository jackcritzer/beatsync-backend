import Header from '@/components/Header';
import { Inter, DM_Sans } from "next/font/google";

//import { globalsCss } from "./globals.css"; // Import globals.css
import "../styles/styles.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],      // Regular & Medium
  variable: "--font-inter"
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["500", "700"],      // Medium & Bold
  variable: "--font-dmsans"
});

export const metadata = {
  title: 'Cadence Studio',
  description: 'Join the waitlist to collaborate on music projects.',
};

// {`${inter.variable} ${dmSans.variable} antialiased`}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${dmSans.variable} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}