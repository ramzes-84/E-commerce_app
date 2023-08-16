import './globals.css';
import type { Metadata } from 'next';
import Navbar from './header';

export const metadata: Metadata = {
  title: 'Cyber Ducks App',
  description: 'E-commerce app for Ostara Glass from The Cyber Ducks',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
