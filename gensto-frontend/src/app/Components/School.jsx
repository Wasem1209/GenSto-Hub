'use client';


import Link from 'next/link';

export default function School() {
  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
      
     

      {/* TEXT CONTENT ON TOP */}
      <div className="relative z-10 max-w-4xl text-center px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          GenSto Hub Schools
        </h2>

        <p className="mt-4 text-gray-700 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          At <strong>GenSto Hub</strong>, our programs bridge the gap between 
          <span className="text-blue-600"> technology</span> and 
          <span className="text-green-600"> education</span>.  
          We offer hands-on training, certified courses, and mentorship that equips 
          students, workers, and entrepreneurs with practical digital skills for the future.
        </p>

        {/*  CTA BUTTON */}
        <div className="mt-8">
          <Link href="/course">
            <button className="bg-gray-700 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-md">
            Explore Schools
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}