'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { 
  Handshake, Building2, Users, Lightbulb, 
  Mail, MessageCircle, ShieldCheck 
} from 'lucide-react';

export default function PartnershipPage() {
  // Partner logo carousel setup
  const partnerLogos = [
    '/images/partners/partner1.png',
    '/images/partners/partner2.png',
    '/images/partners/partner3.png',
    '/images/partners/partner4.png',
    '/images/partners/partner5.png',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  // Auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % partnerLogos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [partnerLogos.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX.current) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      setCurrentIndex((prev) => (prev + 1) % partnerLogos.length);
    } else if (diff < -50) {
      setCurrentIndex((prev) => (prev === 0 ? partnerLogos.length - 1 : prev - 1));
    }
    touchStartX.current = null;
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* Hero Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-full">
          <Handshake size={16} />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Strategic Alliances</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter">
          Partner with Inanst
        </h1>
        <p className="mt-4 text-gray-500 max-w-3xl mx-auto text-lg leading-relaxed">
          We collaborate with forward-thinking organizations, institutions, and investors 
          to bridge the gap between education and industry. Together, we advance society through tech.
        </p>
      </div>

      {/* Value Propositions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: <Handshake className="text-blue-600" />,
            title: "Mutual Growth",
            text: "Expand markets and create sustainable impact through collaborative project delivery.",
            border: "border-blue-100"
          },
          {
            icon: <Building2 className="text-emerald-600" />,
            title: "Corporate Tier",
            text: "Join forces on specialized training programs, product R&D, and hub sponsorships.",
            border: "border-emerald-100"
          },
          {
            icon: <Users className="text-purple-600" />,
            title: "Community Impact",
            text: "Directly influence the next generation of tech talent through mentored internships.",
            border: "border-purple-100"
          },
          {
            icon: <Lightbulb className="text-amber-500" />,
            title: "Innovation Hub",
            text: "Access cutting-edge research and pilot your solutions within the Inanst ecosystem.",
            border: "border-amber-100"
          }
        ].map((card, index) => (
          <div key={index} className={`bg-white border ${card.border} rounded-[2rem] p-8 transition-all hover:shadow-xl hover:-translate-y-1 duration-300`}>
            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-6">
              {card.icon}
            </div>
            <h3 className="text-lg font-black text-gray-900 mb-2">{card.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{card.text}</p>
          </div>
        ))}
      </div>

      {/* Logo Carousel Section */}
      <div className="bg-white border border-gray-100 rounded-[3rem] p-12 text-center shadow-sm">
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-10">Trusted By Industry Leaders</h2>
        <div
          className="relative w-full max-w-xs mx-auto overflow-hidden flex items-center justify-center h-24"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {partnerLogos.map((logo, index) => (
            <div 
              key={index}
              className={`absolute transition-all duration-700 ease-in-out transform ${
                index === currentIndex ? 'opacity-100 scale-110 translate-x-0' : 'opacity-0 scale-90 translate-x-10'
              }`}
            >
              <Image
                src={logo}
                alt="Partner Logo"
                width={200}
                height={100}
                className="object-contain grayscale hover:grayscale-0 transition-all cursor-pointer"
              />
            </div>
          ))}
        </div>
        <p className="mt-8 text-gray-400 text-xs font-medium italic">
          &quot;Building the future of African tech, one partnership at a time.&quot;
        </p>
      </div>

      {/* Call to Action */}
      <div className="relative bg-gray-900 rounded-[3rem] p-10 md:p-16 overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/10 blur-[100px] rounded-full" />
        
        <div className="relative z-10 flex flex-col items-center text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Become a Partner</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Whether you are an educational institution, tech firm, or investor, we’d love to collaborate. 
              Let’s build solutions that empower communities worldwide.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <a
              href="mailto:partnership@inanast.com"
              className="group flex items-center justify-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-rose-50 transition-all active:scale-95"
            >
              <Mail size={18} />
              Send Proposal
            </a>

            <a
              href="https://wa.me/+2349117559163?text=Hello! We are interested in a partnership proposal with Inanst."
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 px-8 py-4 bg-sky-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-sky-500 transition-all shadow-xl shadow-sky-900/40 active:scale-95"
            >
              <MessageCircle size={18} />
              WhatsApp Support
            </a>
          </div>

          <div className="flex items-center gap-2 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
            <ShieldCheck size={14} className="text-emerald-500" />
            Official Inanst Partnership Program
          </div>
        </div>
      </div>

    </div>
  );
}