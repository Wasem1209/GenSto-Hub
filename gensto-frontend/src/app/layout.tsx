import './globals.css'
import { ReactNode } from 'react'
import { AuthProvider } from './context/AuthContext'; 
import { NextAuthProvider } from '@/providers/NextAuthProvider'; 

export const metadata = {
  title: 'INANST',
  description: 'Advance the society with tech'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* NextAuthProvider must be outside AuthProvider */}
        <NextAuthProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}