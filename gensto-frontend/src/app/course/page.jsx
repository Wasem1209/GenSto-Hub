'use client';

import { Monitor, Server, Layout, Code2, Layers, Shield, Database, BarChart3 } from 'lucide-react';

export default function CoursesPage() {
  const courses = [
    { 
      title: 'Computer Fundamentals School', 
      icon: <Monitor className="w-10 h-10 text-blue-600" />, 
      description: 'Learn the basics of computer literacy, operations, and applications.',
      link: 'https://forms.gle/computerfundamentals' 
    },
    { 
      title: 'IT Infrastructure School', 
      icon: <Server className="w-10 h-10 text-indigo-600" />, 
      description: 'Master the foundations of IT systems, networking, and infrastructure.',
      link: 'https://forms.gle/itinfrastructure' 
    },
    { 
      title: 'Frontend Web Development School', 
      icon: <Layout className="w-10 h-10 text-green-600" />, 
      description: 'Build engaging, responsive, and modern web interfaces.',
      link: 'https://forms.gle/frontenddev' 
    },
    { 
      title: 'Backend Web Development School', 
      icon: <Code2 className="w-10 h-10 text-purple-600" />, 
      description: 'Learn server-side programming and API development.',
      link: 'https://forms.gle/backenddev' 
    },
    { 
      title: 'Full-stack Web Development School', 
      icon: <Layers className="w-10 h-10 text-orange-600" />, 
      description: 'Combine frontend and backend skills to build complete web apps.',
      link: 'https://forms.gle/fullstack' 
    },
    { 
      title: 'Software Development School', 
      icon: <Code2 className="w-10 h-10 text-red-600" />, 
      description: 'Learn how to design, develop, and maintain software applications.',
      link: 'https://forms.gle/softwaredev' 
    },
    { 
      title: 'Cyber Security School', 
      icon: <Shield className="w-10 h-10 text-teal-600" />, 
      description: 'Understand security fundamentals to protect digital systems.',
      link: 'https://forms.gle/cybersecurity' 
    },
    { 
      title: 'Database School', 
      icon: <Database className="w-10 h-10 text-pink-600" />, 
      description: 'Learn how to manage, query, and maintain databases.',
      link: 'https://forms.gle/database' 
    },
    { 
      title: 'Data Analytics School', 
      icon: <BarChart3 className="w-10 h-10 text-yellow-600" />, 
      description: 'Gain skills to analyze and interpret data for business decisions.',
      link: 'https://forms.gle/dataanalytics' 
    },
  ];

  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">

        {/*  Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Our Schools</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            Explore our specialized schools designed to help you <strong>master IT and tech skills</strong>. 
            Click on any school to access the registration form and start your journey with <strong>GenSto Hub</strong>.
          </p>
        </div>

        {/*  Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <a 
              key={index} 
              href={course.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center transition transform hover:-translate-y-1 hover:shadow-lg duration-300"
            >
              <div className="bg-gray-100 rounded-full p-4 mb-4">
                {course.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{course.description}</p>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}