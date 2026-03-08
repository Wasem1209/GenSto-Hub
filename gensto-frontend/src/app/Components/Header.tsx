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
          <span className="text-2xl font-black tracking-tighter text-gray-900">IN</span>
          
          {/* The Sky Blue Delta Symbol - Adjusted margins to pull text closer */}
          <svg 
            width="24" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="mx-[-2px] mt-1" 
          >
            <path 
              d="M12 2L2 20H22L12 2Z" 
              className="fill-sky-500" 
            />
            <path 
              d="M12 6L5 18H19L12 6Z" 
              className="fill-sky-400 opacity-50" 
            />
          </svg>

          <span className="text-2xl font-black tracking-tighter text-gray-900 ml-[-2px]">NST</span>
        </div>
        
        <p className="text-[8px] md:text-[9px] tracking-[0.15em] text-gray-500 mt-0.5 hidden sm:block font-bold">
          INNOVATION • ANALYTICS • SOCIETAL TRANSFORMATION
        </p>
      </Link>

      {/* Desktop Nav */}
      <nav>
        <ul className="hidden md:flex space-x-6">
          <li><Link href="/" className="text-sm font-semibold text-gray-700 hover:text-sky-600 transition-colors">Home</Link></li>
          <li><Link href="/about" className="text-sm font-semibold text-gray-700 hover:text-sky-600 transition-colors">About</Link></li>
          <li><Link href="/services" className="text-sm font-semibold text-gray-700 hover:text-sky-600 transition-colors">Services</Link></li>
          <li><Link href="/contact" className="text-sm font-semibold text-gray-700 hover:text-sky-600 transition-colors">Contact</Link></li>
          <li><Link href="/faq" className="text-sm font-semibold text-gray-700 hover:text-sky-600 transition-colors">FAQ</Link></li>
        </ul>
      </nav>

      {/* Mobile Toggle */}
      <div className="md:hidden">
        <button onClick={toggleMenu} aria-label="Toggle menu" className="text-gray-700">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isVisible && (
        <div
          className={`absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 overflow-hidden transition-all duration-300 ease-in-out
            ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
        >
          <div className="flex flex-col p-4 space-y-4">
            <Link href="/" onClick={closeMenu} className="text-base font-semibold text-gray-800 hover:text-sky-600 border-b pb-2">Home</Link>
            <Link href="/about" onClick={closeMenu} className="text-base font-semibold text-gray-800 hover:text-sky-600 border-b pb-2">About</Link>
            <Link href="/services" onClick={closeMenu} className="text-base font-semibold text-gray-800 hover:text-sky-600 border-b pb-2">Services</Link>
            <Link href="/contact" onClick={closeMenu} className="text-base font-semibold text-gray-800 hover:text-sky-600 border-b pb-2">Contact</Link>
            <Link href="/faq" onClick={closeMenu} className="text-base font-semibold text-gray-800 hover:text-sky-600 border-b pb-2">FAQ</Link>
          </div>
        </div>
      )}
    </header>
  );
}