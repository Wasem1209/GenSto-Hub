'use client';
import { useEffect, useState } from 'react';
import { REST_API } from '../../constant';

export default function Testimonials() {
  const [comments, setComments] = useState([]);
  const [visibleIndexes, setVisibleIndexes] = useState([0, 1, 2]);
  const [screenSize, setScreenSize] = useState('desktop');

  const fetchComments = async () => {
    try {
      // Cast as any if using TS to avoid the property error we saw earlier
      const apiEndpoints = REST_API;
      const res = await fetch(apiEndpoints.COMMENTS);
      const data = await res.json();
      setComments(data.length > 0 ? data : []);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

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
    if (comments.length === 0) return;
    let itemsToShow = screenSize === 'mobile' ? 1 : screenSize === 'tablet' ? 2 : 3;

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
      {/* Aligned Heading Style */}
      <h2 className="text-3xl font-bold text-center mb-10">
        <span className="text-gray-900">User </span>
        <span className="text-blue-900">Com</span>
        <span className="text-blue-900">ments</span>
      </h2>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {comments.length > 0 ? (
          visibleIndexes.map((index) => {
            const item = comments[index];
            if (!item) return null;

            return (
              <div
                key={item._id || index}
                className="bg-gray-100 p-6 rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-500 ease-in-out min-h-[160px] flex flex-col justify-center"
              >
                {/* Header matching the new preview style */}
                <div className="border-b border-gray-200 pb-2 mb-3">
                  <h4 className="text-lg font-bold text-gray-900 truncate">
                    {item.name}
                  </h4>
                </div>

                {/* Comment body */}
                <p className="text-gray-700 italic leading-relaxed">
                  “{item.comment}”
                </p>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-10 text-center">
            <p className="text-gray-400 animate-pulse font-medium">Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
}