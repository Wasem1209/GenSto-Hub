'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const testimonials = [
  {
    name: 'Mis. Joy Anih',
    image: '/images/Joy Anil.jpg',
    comment: 'GenSto Hub transformed my tech skills. I was able to land a remote internship in 4 months!',
  },
  {
    name: 'Abbah Clement',
    image: '/images/Success Agu.jpg',
    comment: 'The instructors are top-notch. I built my first web app through GenSto’s training!',
  },
  {
    name: 'John miles',
    image: '/images/Yohanna.jpg',
    comment: 'Learning here gave me clarity and confidence. I highly recommend it to any serious student.',
  },
  {
    name: 'Michael Bassey',
    image: '/images/Otor Paul.jpg',
    comment: 'I got certified in just a few weeks. The content is practical and straight to the point.',
  },
  {
    name: 'Grace Ayuba',
    image: '/images/Joy Anil.jpg',
    comment: 'Thanks to GenSto Hub, I launched my freelance career and I’m earning already.',
  },
  {
    name: 'Emeka Obi',
    image: '/images/Official-philip.png',
    comment: 'I’ve attended different programs but this one is different — truly impactful.',
  },
];

export default function Testimonials() {
  const [visibleIndexes, setVisibleIndexes] = useState([0, 1, 2]);
  const [screenSize, setScreenSize] = useState('desktop');

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < 768) setScreenSize('mobile');
      else if (width >= 768 && width < 1024) setScreenSize('tablet');
      else setScreenSize('desktop');
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  useEffect(() => {
    let itemsToShow = screenSize === 'mobile' ? 1 : screenSize === 'tablet' ? 2 : 3;
    let interval = setInterval(() => {
      setVisibleIndexes((prev) => {
        const nextIndexes = [];
        for (let i = 0; i < itemsToShow; i++) {
          nextIndexes.push((prev[0] + i + 1) % testimonials.length);
        }
        return nextIndexes;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [screenSize]);

  return (
    <div className="py-12 px-4 md:px-16 bg-white">
      <h2 className="text-3xl font-bold text-center mb-10">What Our Students Say</h2>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {visibleIndexes.map((index) => {
          const { name, image, comment } = testimonials[index];
          return (
            <div key={index} className="bg-gray-100 p-6 rounded-2xl hover:scale-105 shadow-md transition-opacity duration-500 ease-in-out">
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={image}
                  alt={name}
                  width={50}
                  height={50}
                  className="rounded-full no-repeat object-cover"
                />
                <h4 className="text-lg font-semibold">{name}</h4>
              </div>
              <p className="text-gray-700 italic">“{comment}”</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}