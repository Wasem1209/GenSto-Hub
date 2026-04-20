'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { REST_API } from '../../constant';

export default function Testimonials() {
  const [comments, setComments] = useState([]);
  const [visibleIndexes, setVisibleIndexes] = useState([0, 1, 2]);
  const [screenSize, setScreenSize] = useState('desktop');

  // Fetch comments from Database (Display only)
  const fetchComments = async () => {
    try {
      // Using REST_API.COMMENTS from  constant file
      const res = await fetch(REST_API.COMMENTS);
      const data = await res.json();
      setComments(data.length > 0 ? data : []);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // Responsive logic to determine how many cards to show
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

  // Auto-scroll animation logic
  useEffect(() => {
    if (comments.length === 0) return;

    let itemsToShow = screenSize === 'mobile' ? 1 : screenSize === 'tablet' ? 2 : 3;

    // Only set up interval if we have enough comments to actually scroll
    if (comments.length <= itemsToShow) {
      setVisibleIndexes(comments.map((_, i) => i));
      return;
    }

    let interval = setInterval(() => {
      setVisibleIndexes((prev) => {
        const nextIndexes = [];
        for (let i = 0; i < itemsToShow; i++) {
          nextIndexes.push((prev[0] + i + 1) % comments.length);
        }
        return nextIndexes;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [screenSize, comments]);

  return (
    <div className="py-12 px-4 md:px-16 bg-white">
      <h2 className="text-3xl font-bold text-center mb-10">
        <span className="text-gray-900">Com</span>
        <span className="text-blue-900">ment</span>s
      </h2>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {comments.length > 0 ? (
          visibleIndexes.map((index) => {
            const item = comments[index];
            if (!item) return null;

            return (
              <div
                key={item._id || index}
                className="bg-gray-100 p-6 rounded-2xl hover:scale-105 shadow-md transition-all duration-500 ease-in-out"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-12 h-12">
                    <Image
                      src={item.image || '/images/default-avatar.jpg'}
                      alt={item.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h4 className="text-lg font-semibold">{item.name}</h4>
                </div>
                <p className="text-gray-700 italic">“{item.comment}”</p>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-10 text-center">
            <p className="text-gray-500 animate-pulse">Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
}