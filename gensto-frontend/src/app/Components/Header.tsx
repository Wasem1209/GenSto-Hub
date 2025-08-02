'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu,  X } from 'lucide-react';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    if (scrollTop > 100) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, []);

    const toggleMenu = () =>{ setIsOpen(!isOpen)};
    return(
        <header className="w-full bg-white flex items-center  justify-between shadow-md fixed top-0 left-0 z-50">
           <div className="flex items-center space-x-3 ml-2 sm:ml-4 md:ml-6">
            <Image 
            src="/images/GenSto Hub Logo.jpg" 
            alt="GenSto Hub Logo" 
            width={37} 
            height={37}
            priority />
          
                <div className="ml-[-25px]">
                    <h1 className="text-xl font-bold text-gray-800 px-6 pr-40">GenSto Hub</h1>
                    <p className="text-xs text-gra-500 pl-6 mb-2">Advancing the society with Technology</p>
                </div>
                 </div>
                {/* Desktop Menu */}
            <nav className="mr-4">
                <ul className="hidden md:flex space-x-5 ml-2">
                <li><Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link></li>
                <li><Link href="/about" className="text-gray-700 hover:text-blue-600">About</Link></li>
                <li><Link href="/services" className="text-gray-700 hover:text-blue-600">Services</Link></li>
                <li><Link href="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link></li>
                <li><Link href="/faq" className="text-gray-700 hover:text-blue-600">FAQ</Link></li>
                
                </ul>
            </nav>
            { /* Mobile Menu button */}
            <div className="md:hidden mr-4">
                <button onClick={toggleMenu} aria-label="Toggle menu">{isOpen ? <X className="w-6 h-6" /> : < Menu className="w-6 h-6" />}
                </button>
            </div>
            { /* Mobile dropdown Menu */ }
            {isOpen &&(
                <div className="md:hidden mr-8 bg-white px-4 pb-4">
                    <Link href="/" className="block py-2 text-gray-700 hover:text-blue-600">Home</Link>
                     <Link href="/about" className="block py-2 text-gray-700">About</Link>
                      <Link href="/service" className="block py-2 text-gray-700">Services</Link>
                       <Link href="/contact" className="block py-2 text-gray-700">contact</Link>
                        <Link href="faq" className="block  py-2 text-gray-700">FAQ</Link>
                        
                </div>
            )}
        </header>
    );
}