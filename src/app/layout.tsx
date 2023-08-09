import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cyber Ducks App',
  description: 'E-commerce app for Ostara Glass from The Cyber Ducks',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
