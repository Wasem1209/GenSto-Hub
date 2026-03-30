'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import {
  Monitor, Server, Layout, Code2, Layers,
  Shield, Database, BarChart3, X, UserPlus, LogIn
} from 'lucide-react';

export default function CoursesPage() {
  // Fixed: Removed the TypeScript <any> generic to prevent ReferenceError in .jsx files
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedCourse) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedCourse]);

  const courses = [
    {
      title: 'Computer Fundamentals School',
      icon: <Monitor className="w-10 h-10 text-blue-600" />,
      description: 'Learn the basics of computer literacy, operations, and applications.',
    },
    {
      title: 'IT Infrastructure School',
      icon: <Server className="w-10 h-10 text-indigo-600" />,
      description: 'Master the foundations of IT systems, networking, and infrastructure.',
    },
    {
      title: 'Frontend Web Development School',
      icon: <Layout className="w-10 h-10 text-green-600" />,
      description: 'Build engaging, responsive, and modern web interfaces.',
    },
    {
      title: 'Backend Web Development School',
      icon: <Code2 className="w-10 h-10 text-purple-600" />,
      description: 'Learn server-side programming and API development.',
    },
    {
      title: 'Full-stack Web Development School',
      icon: <Layers className="w-10 h-10 text-orange-600" />,
      description: 'Combine frontend and backend skills to build complete web apps.',
    },
    {
      title: 'Software Development School',
      icon: <Code2 className="w-10 h-10 text-red-600" />,
      description: 'Learn how to design, develop, and maintain software applications.',
    },
    {
      title: 'Cyber Security School',
      icon: <Shield className="w-10 h-10 text-teal-600" />,
      description: 'Understand security fundamentals to protect digital systems.',
    },
    {
      title: 'Database School',
      icon: <Database className="w-10 h-10 text-pink-600" />,
      description: 'Learn how to manage, query, and maintain databases.',
    },
    {
      title: 'Data Analytics School',
      icon: <BarChart3 className="w-10 h-10 text-yellow-600" />,
      description: 'Gain skills to analyze and interpret data for business decisions.',
    },
  ];

  return (
    <section className="relative bg-gray-50 mt-8 py-16 px-4 sm:px-6 lg:px-16 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Our Schools</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            Explore our specialized schools designed to help you <strong>master IT and tech skills</strong>.
            Select a school to continue with <strong>Inanst</strong>.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedCourse(course)}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl p-8 flex flex-col items-center text-center transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="bg-blue-50 rounded-2xl p-4 mb-6 group-hover:scale-110 transition-transform duration-300">
                {course.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{course.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{course.description}</p>

              <span className="mt-6 text-blue-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                View Details →
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Action Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => setSelectedCourse(null)}
          ></div>

          {/* Modal Content */}
          <div
            role="dialog"
            aria-modal="true"
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 sm:p-10 animate-in fade-in zoom-in slide-in-from-bottom-4 duration-300"
          >
            <button
              onClick={() => setSelectedCourse(null)}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-50 p-5 rounded-3xl mb-6 shadow-inner">
                {selectedCourse.icon}
              </div>

              <h2 className="text-2xl font-black text-gray-900 mb-3">
                {selectedCourse.title}
              </h2>

              <p className="text-gray-500 text-base mb-10 leading-relaxed">
                Unlock specialized training in {selectedCourse.title.toLowerCase()}.
                Join the Inanst community to start your journey.
              </p>

              <div className="w-full space-y-4">
                <Link
                  href="/signup"
                  className="flex items-center justify-center gap-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-200 active:scale-[0.98]"
                >
                  <UserPlus size={20} />
                  Get Started Now
                </Link>

                <Link
                  href="/signin"
                  className="flex items-center justify-center gap-3 w-full bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold py-4 rounded-2xl transition-all active:scale-[0.98]"
                >
                  <LogIn size={20} />
                  Sign In
                </Link>
              </div>

              <button
                onClick={() => setSelectedCourse(null)}
                className="mt-8 text-sm font-medium text-gray-400 hover:text-blue-600 transition-colors"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}