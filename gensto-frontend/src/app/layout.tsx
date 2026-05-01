import './globals.css'
import { ReactNode } from 'react'
import { AuthProvider } from './context/AuthContext'; 
import { NextAuthProvider } from '@/providers/NextAuthProvider'; 
import { Metadata } from 'next'

export const metadata: Metadata = {
  // We put 'Tech Talent' right in the title for Google to see immediately
  title: {
    default: 'INANST | Innovation, Ananlytics, Societal Transformation, Technological ecosystem,Tech ecosystem, & Innovation in Nigeria',
    template: '%s | INANST'
  },
  description: "Join Nigeria's premier tech ecosystem. INANST bridges the gap between academic theory and industry execution through software development, indigenous hardware, software development and data intelligence.",
  
  keywords: [
    'Tech Talent Nigeria', 'Software Development Abuja', 'MERN Stack Training Nigeria', 
    'Embedded Systems Africa', 'Indigenous Tech Hardware', 'INANST', 'Tech Ecosystem Abuja'
  ],
  
  authors: [{ name: 'Philip Terfa Wasem', url: 'https://inanst.com' }],
  
  openGraph: {
    title: 'INANST | Innovation, Ananlytics, Societal Transformation, Technological ecosystem,Tech ecosystem, & Innovation in Nigeria, hands-on training programs, build scalable Software and hardware products for clients across sectors',
    description: 'Dismantling the productivity gap in Nigeria through a unified stack of education, hardware, and software.',
    url: 'https://www.inanst.com',
    siteName: 'INANST',
    images: [{ url: '/images/inanstlogo.png', width: 1200, height: 630, alt: 'INANST Ecosystem' }],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <NextAuthProvider>
          <AuthProvider>
            {/* Removed the extra 'main' here to avoid layout shifts */}
            {children}
          </AuthProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}