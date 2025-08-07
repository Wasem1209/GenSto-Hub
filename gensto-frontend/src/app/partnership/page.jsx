'use client';

import { Handshake, Building2, Users, Lightbulb, Mail, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

export default function PartnershipPage() {
  // ✅ Partner logo carousel setup
  const partnerLogos = [
    '/images/partners/partner1.png',
    '/images/partners/partner2.png',
    '/images/partners/partner3.png',
    '/images/partners/partner4.png',
    '/images/partners/partner5.png',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(null);

  // ✅ Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % partnerLogos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [partnerLogos.length]);

  // Swipe gesture handling for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX.current) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      // swipe left → next logo
      setCurrentIndex((prev) => (prev + 1) % partnerLogos.length);
    } else if (diff < -50) {
      // swipe right → previous logo
      setCurrentIndex((prev) =>
        prev === 0 ? partnerLogos.length - 1 : prev - 1
      );
    }
    touchStartX.current = null;
  };

  return (
    <section className="bg-gray-50 mt-10 mt-8 py-12 md:py-16 px-4 sm:px-6 md:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">

        {/*  Hero Section */}
        <div className="text-center mb-12 px-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Partner with GenSto Hub
          </h1>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto text-sm sm:text-base md:text-lg">
            At GenSto Hub, we believe in the power of collaboration. We work with forward-thinking organizations,
            institutions, and investors to create meaningful change in education, technology, and innovation.
            Together, we can advance society with tech.
          </p>
        </div>

        {/*  Why Partner Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
          {[
            {
              icon: <Handshake className="w-12 h-12 mx-auto text-blue-600 mb-4" />,
              title: "Mutual Growth",
              text: "Collaborate on projects that expand markets, open opportunities, and bring sustainable impact."
            },
            {
              icon: <Building2 className="w-12 h-12 mx-auto text-green-600 mb-4" />,
              title: "Corporate Partnership",
              text: "Join forces with GenSto Hub on training programs, product development, or sponsorship initiatives."
            },
            {
              icon: <Users className="w-12 h-12 mx-auto text-purple-600 mb-4" />,
              title: "Community Impact",
              text: "Help us bridge the gap between education and real-world skills to impact students and communities."
            },
            {
              icon: <Lightbulb className="w-12 h-12 mx-auto text-yellow-500 mb-4" />,
              title: "Innovation & Research",
              text: "Collaborate on cutting-edge research and tech solutions that solve real-world problems."
            }
          ].map((card, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
              {card.icon}
              <h3 className="text-lg font-bold text-gray-800">{card.title}</h3>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">{card.text}</p>
            </div>
          ))}
        </div>

        {/* Partner Carousel */}
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Valued Partners</h2>
          <div
            className="w-full flex justify-center"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <Image
              src={partnerLogos[currentIndex]}
              alt="Partner Logo"
              width={180}
              height={80}
              className="object-contain transition-transform duration-500 ease-in-out hover:scale-105"
            />
          </div>
          <p className="mt-4 text-gray-600 text-sm sm:text-base">
            We collaborate with organizations that share our vision for impact.
          </p>
        </div>

        {/* Partnership CTA Section */}
        <div className="bg-blue-50 rounded-xl shadow-md p-8 sm:p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Become a Partner</h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            Whether you’re an educational institution, tech company, NGO, or investor, we’d love to collaborate with you.
            Together, we can build solutions that empower students, workers, and communities worldwide.
          </p>

          {/* Contact Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <a
              href="mailto:partnership@genstohub.com"
              className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-full hover:bg-green-700 transition"
            >
              <Mail className="w-5 h-5" /> Our email is always open!
            </a>

            <a
              href="https://wa.me/2347061065498?text=Hello! My name is   and I'm here for a partnership proposal."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-blue-400 text-white rounded-full hover:bg-blue-700 transition"
            >
              <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}