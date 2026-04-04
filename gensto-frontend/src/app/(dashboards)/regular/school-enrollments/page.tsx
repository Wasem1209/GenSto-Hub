'use client';

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  Monitor, Server, Layout, Code2, Layers,
  Shield, Database, BarChart3, Smartphone, 
  Cpu, Globe, Lock, PenTool, Terminal
} from 'lucide-react';

export default function SchoolEnrollmentsPage() {
  const schools = [
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
      icon: <Terminal className="w-10 h-10 text-red-600" />,
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
      description: 'Learn how to manage, query, and maintain enterprise databases.',
    },
    {
      title: 'Data Analytics School',
      icon: <BarChart3 className="w-10 h-10 text-yellow-600" />,
      description: 'Gain skills to analyze and interpret data for business decisions.',
    },
    {
      title: 'Mobile App Development School',
      icon: <Smartphone className="w-10 h-10 text-cyan-600" />,
      description: 'Create native and cross-platform mobile applications for iOS and Android.',
    },
    {
      title: 'Embedded Systems School',
      icon: <Cpu className="w-10 h-10 text-emerald-600" />,
      description: 'Learn hardware programming, microcontrollers, and firmware development.',
    },
    {
      title: 'Cloud Computing School',
      icon: <Globe className="w-10 h-10 text-sky-600" />,
      description: 'Master AWS, Azure, and cloud architecture for scalable systems.',
    },
    {
      title: 'UI/UX Design School',
      icon: <PenTool className="w-10 h-10 text-rose-600" />,
      description: 'Design intuitive user experiences and beautiful digital interfaces.',
    },
    {
      title: 'Ethical Hacking School',
      icon: <Lock className="w-10 h-10 text-slate-700" />,
      description: 'Advanced penetration testing and vulnerability assessment skills.',
    },
  ];

  // Explicitly typing variants to resolve the TS error
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
  };

  return (
    <section className="relative bg-gray-50 pt-24 pb-16 px-4 sm:px-6 lg:px-16 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight"
          >
            School Enrollments
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-gray-500 max-w-2xl mx-auto text-base sm:text-lg font-medium"
          >
            Choose your path to excellence. Explore our specialized tech schools and start your journey with <span className="text-blue-600 font-bold">INANST</span>.
          </motion.p>
        </div>

        {/* Schools Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {schools.map((school, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Link
                href="/regular/register"
                className="group h-full bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl p-10 flex flex-col items-center text-center transition-all duration-500 border border-gray-100 hover:border-blue-100"
              >
                <div className="bg-gray-50 rounded-3xl p-6 mb-8 group-hover:bg-blue-50 group-hover:rotate-6 transition-all duration-300">
                  {school.icon}
                </div>
                
                <h3 className="text-xl font-black text-gray-800 mb-4 tracking-tight">
                  {school.title}
                </h3>
                
                <p className="text-gray-500 text-sm leading-relaxed font-medium mb-8">
                  {school.description}
                </p>

                <div className="mt-auto pt-4 w-full border-t border-gray-50 group-hover:border-blue-50">
                   <span className="inline-flex items-center text-blue-600 font-black text-[10px] tracking-widest uppercase group-hover:gap-3 transition-all duration-300">
                    Enroll in School <span className="ml-2">→</span>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}