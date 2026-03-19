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
      
      {/* BRAND LOGO AREA */}
      <Link href="/" className="flex flex-col items-start group">
        <div className="flex items-center">
          
          {/* "IN" - Bold and Tight */}
          <span className="text-2xl md:text-3xl font-black tracking-tighter text-[#43464d] leading-none">
            IN
          </span>
          
          {/* THE STYLIZED 'A' (PATH UNCHANGED) */}
          <svg 
            
            className="-mx-1 md:-mx-1.5 h-7 md:h-[34px] w-auto" 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="inanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#2563EB" />
              </linearGradient>
            </defs>
            <path 
              d="M50 15L90 85H10L50 15ZM50 42L65 70H35L50 42Z" 
              fill="url(#inanGradient)" 
              fillRule="evenodd"
            />
          </svg>

          {/* "NST" - Bold and Tight */}
          <span className="text-2xl md:text-3xl font-black tracking-tighter text-[#43464d] leading-none">
            NST
          </span>
        </div>
       
        {/* Tagline */}
        <p className="text-[7px] md:text-[8px] tracking-[0.12em] text-[#9ca3af] mt-1 font-bold uppercase">
          Innovation • Analytics • Societal Transformation
        </p>
      </Link>

      {/* Desktop Nav */}
      <nav className="mr-4">
        <ul className="hidden md:flex space-x-6">
          <li><Link href="/" className="text-sm font-bold text-[#43464d] hover:text-blue-600 transition-colors">Home</Link></li>
          <li><Link href="/about" className="text-sm font-bold text-[#43464d] hover:text-blue-600 transition-colors">About</Link></li>
          <li><Link href="/services" className="text-sm font-bold text-[#43464d] hover:text-blue-600 transition-colors">Services</Link></li>
          <li><Link href="/contact" className="text-sm font-bold text-[#43464d] hover:text-blue-600 transition-colors">Contact</Link></li>
          {/* Updated to Get Started */}
          <li><Link href="/signup" className="text-sm font-bold text-[#43464d] hover:text-blue-600 transition-colors">Get Started</Link></li>
        </ul>
      </nav>

      {/* Mobile Toggle */}
      <div className="md:hidden mr-2">
        <button onClick={toggleMenu} aria-label="Toggle menu" className="text-gray-700">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isVisible && (
        <div
          className={`absolute top-full left-0 w-full bg-white shadow-lg rounded-b-lg overflow-hidden transition-all duration-300 ease-in-out transform
            ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
        >
          <div className="flex flex-col py-2">
            <Link href="/" onClick={closeMenu} className="block py-3 px-6 text-gray-800 hover:bg-gray-50 font-semibold border-b border-gray-100">Home</Link>
            <Link href="/about" onClick={closeMenu} className="block py-3 px-6 text-gray-800 hover:bg-gray-50 font-semibold border-b border-gray-100">About</Link>
            <Link href="/services" onClick={closeMenu} className="block py-3 px-6 text-gray-800 hover:bg-gray-50 font-semibold border-b border-gray-100">Services</Link>
            <Link href="/contact" onClick={closeMenu} className="block py-3 px-6 text-gray-800 hover:bg-gray-50 font-semibold border-b border-gray-100">Contact</Link>
            {/* Updated to Get Started */}
            <Link href="/signup" onClick={closeMenu} className="block py-3 px-6 text-blue-600 font-bold">Get Started</Link>
          </div>
        </div>
      )}
    </header>
  );
}