import './globals.css';
import type { Metadata } from 'next';
import Navbar from './header';
import { SessionProvider } from '@/controller/session/client';
import { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'Cyber Ducks App',
  description: 'E-commerce app for Ostara Glass from The Cyber Ducks',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Navbar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
