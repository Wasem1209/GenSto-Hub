import { ReactNode } from 'react'
import Header from './Components/Header'
import Footer from "./Components/Footer";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-[80vh]">
        {children}
      </main>
      <Footer />
    </>
  )
}