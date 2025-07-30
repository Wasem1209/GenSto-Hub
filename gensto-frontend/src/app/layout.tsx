import './globals.css'
import { ReactNode } from 'react'
import Header from './Components/Header'
import Footer from "./components/Footer";



export const metadata = {
  title: 'GenSto Hub',
  description: 'Advance the society with tech'
}



export default function RootLayout({ children } : {children:  ReactNode}){
  return(
    <html lang="en">
      <body ><Header /> <main>{children}</main><Footer /></body>
     
    </html>
  )
}