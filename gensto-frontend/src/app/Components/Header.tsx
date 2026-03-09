'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen) {
      setIsVisible(true);
      timer = setTimeout(() => setIsOpen(false), 3000);
    }
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isOpen && isVisible) {
      timer = setTimeout(() => setIsVisible(false), 300);
    }
    return () => clearTimeout(timer);
  }, [isOpen, isVisible]);

  return (
    <header className="w-full bg-white flex items-center justify-between shadow-sm fixed top-0 left-0 z-50 px-4 md:px-10 h-16">
      {/* Coded Logo as Brand Name */}
      <Link href="/" className="flex flex-col items-start group">
        <div className="flex items-center">
          {/* The Sky Blue Ring - Negative margin pulls the "IN" inside the gap */}
          <svg 
            width="32" 
            height="32" 
            viewBox="0 0 40 40" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="mr-[-3px] md:mr-[-5px] z-10"
          >
            <path 
              d="M32 10C29.5 7.5 26 6 22 6C14.268 6 8 12.268 8 20C8 27.732 14.268 34 22 34C26 34 29.5 32.5 32 30" 
              stroke="#38bdf8" 
              strokeWidth="4" 
              strokeLinecap="round" 
            />
          </svg>

          <span className="text-xl md:text-2xl font-black tracking-tighter text-gray-700 relative z-0">IN</span>
          
          {/* The Sky Blue Delta Symbol as the letter 'A' */}
          <svg 
            width="24" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="mx-[-1px] md:mx-[-2px] mt-1" 
          >
            <path 
              d="M12 2L2 20H22L12 2Z" 
              className="fill-sky-400" 
            />
            <path 
              d="M12 6L7 17H17L12 6Z" 
              className="fill-sky-500" 
            />
          </svg>

          <span className="text-xl md:text-2xl font-black tracking-tighter text-gray-700 ml-[-1px] md:ml-[-2px]">NST</span>
        </div>
        
        <p className="text-[7px] md:text-[9px] tracking-[0.1em] md:tracking-[0.15em] text-gray-400 mt-0.5 font-bold uppercase">
          Innovation • Analytics • Societal Transformation
        </p>
      </Link>

      {/* Desktop Nav */}
      <nav className="mr-4">
        <ul className="hidden md:flex space-x-5 ml-2">
          <li><Link href="/" className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors">Home</Link></li>
          <li><Link href="/about" className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors">About</Link></li>
          <li><Link href="/services" className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors">Services</Link></li>
          <li><Link href="/contact" className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors">Contact</Link></li>
          <li><Link href="/faq" className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors">FAQ</Link></li>
        </ul>
      </nav>

      {/* Mobile Toggle */}
      <div className="md:hidden mr-4">
        <button onClick={toggleMenu} aria-label="Toggle menu" className="text-gray-700">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isVisible && (
        <div
          className={`absolute top-full left-0 w-full bg-white shadow-lg rounded-b-lg overflow-hidden transition-all duration-800 ease-in-out transform
            ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
        >
          <div className="flex flex-col py-2">
            <Link href="/" onClick={closeMenu} className="block py-2 px-6 text-gray-800 hover:text-blue-600 font-medium border-b border-gray-50">
              Home »
            </Link>
            <Link href="/about" onClick={closeMenu} className="block py-2 px-6 text-gray-800 hover:text-blue-600 font-medium border-b border-gray-50">
              About »
            </Link>
            <Link href="/services" onClick={closeMenu} className="block py-2 px-6 text-gray-800 hover:text-blue-600 font-medium border-b border-gray-50">
              Services »
            </Link>
            <Link href="/contact" onClick={closeMenu} className="block py-2 px-6 text-gray-800 hover:text-blue-600 font-medium border-b border-gray-50">
              Contacts »
            </Link>
            <Link href="/faq" onClick={closeMenu} className="block py-2 px-6 text-gray-800 hover:text-blue-600 font-medium">
              FAQ »
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}