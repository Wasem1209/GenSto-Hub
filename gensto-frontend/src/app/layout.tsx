import './globals.css'
import { ReactNode } from 'react'
import Header from './Components/Header'
import Footer from "./Components/Footer";
import { AuthProvider } from './context/AuthContext'; // Adjust path if needed

export const metadata = {
  title: 'INANST',
  description: 'Advance the society with tech'
}

export default function RootLayout({ children } : {children: ReactNode}){
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          <Header />
          <main className="min-h-[80vh]">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}