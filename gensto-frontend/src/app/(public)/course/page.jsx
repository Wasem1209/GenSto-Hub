'use client';

import Link from "next/link";
import {
  Monitor, Server, Layout, Code2, Layers,
  Shield, Database, BarChart3
} from 'lucide-react';

export default function CoursesPage() {
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
      title: 'Database Management School',
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
            Select a school to enroll with <strong>Inanst</strong>.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <Link
              key={index}
              href="/regular/register"
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl p-8 flex flex-col items-center text-center transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="bg-blue-50 rounded-2xl p-4 mb-6 group-hover:scale-110 transition-transform duration-300">
                {course.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{course.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{course.description}</p>

              <span className="mt-6 text-blue-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                Enroll Now →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}