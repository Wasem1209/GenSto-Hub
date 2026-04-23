import './globals.css'
import { ReactNode } from 'react'
import { AuthProvider } from './context/AuthContext'; 
import { NextAuthProvider } from '@/providers/NextAuthProvider'; 
import { Metadata } from 'next'

export const metadata: Metadata = {
  // Brand identity based on the Ecosystem pillars
  title: {
    default: 'INANST | Innovation, Analytics & Societal Transformation',
    template: '%s | INANST'
  },
  description: "Nigeria's architectural response to the long technology problem. We bridge the gap between academic knowledge and industrial execution through indigenous hardware, software, and data intelligence.",
  
  keywords: [
    'INANST', 'Innovation Nigeria', 'Data Analytics Africa', 
    'Indigenous Hardware Manufacturing', 'Tech Ecosystem Abuja', 
    'MERN Stack Training', 'Societal Transformation', 'African Ed-Tech'
  ],
  
  authors: [{ name: 'Philip Terfa Wasem', url: 'https://inanst.com' }],
  
  openGraph: {
    title: 'INANST Ecosystem',
    description: 'Dismantling the productivity gap in Nigeria through a unified stack of education, hardware, and software.',
    url: 'https://www.inanst.com',
    siteName: 'INANST',
    images: [
      {
        url: '/images/inanstlogo.png', 
        width: 1200,
        height: 630,
        alt: 'INANST Ecosystem Pillars',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'INANST | Innovation, Analytics & Societal Transformation',
    description: 'An ecosystem of infrastructure, intelligence, and talent to solve the long technology problem in Nigeria.',
  },

  // Tells bots specifically how to index the ecosystem
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <NextAuthProvider>
          <AuthProvider>
            <main className="min-h-screen flex flex-col">
              {children}
            </main>
          </AuthProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}