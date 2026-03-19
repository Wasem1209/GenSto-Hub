import './globals.css'
import { ReactNode } from 'react'
import { AuthProvider } from './context/AuthContext'; 

export const metadata = {
  title: 'INANST',
  description: 'Advance the society with tech'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}