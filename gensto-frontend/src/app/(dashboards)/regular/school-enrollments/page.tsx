'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Loader2 } from 'lucide-react';
import {
  Monitor, Server, Layout, Code2, Layers,
  Shield, Database, BarChart3, Smartphone, 
  Cpu, Globe, Lock, PenTool, Terminal
} from 'lucide-react';
import { REST_API } from '../../../constant';

// Helper to map icon names from DB to Lucide Components
const iconMap: Record<string, React.ReactNode> = {
  Monitor: <Monitor className="w-10 h-10 text-blue-600" />,
  Server: <Server className="w-10 h-10 text-indigo-600" />,
  Layout: <Layout className="w-10 h-10 text-green-600" />,
  Code2: <Code2 className="w-10 h-10 text-purple-600" />,
  Layers: <Layers className="w-10 h-10 text-orange-600" />,
  Terminal: <Terminal className="w-10 h-10 text-red-600" />,
  Shield: <Shield className="w-10 h-10 text-teal-600" />,
  Database: <Database className="w-10 h-10 text-pink-600" />,
  BarChart3: <BarChart3 className="w-10 h-10 text-yellow-600" />,
  Smartphone: <Smartphone className="w-10 h-10 text-cyan-600" />,
  Cpu: <Cpu className="w-10 h-10 text-emerald-600" />,
  Globe: <Globe className="w-10 h-10 text-sky-600" />,
  PenTool: <PenTool className="w-10 h-10 text-rose-600" />,
  Lock: <Lock className="w-10 h-10 text-slate-700" />,
};

interface School {
  _id: string;
  title: string;
  iconName: string; 
  description: string;
  price: string;
}

export default function SchoolEnrollmentsPage() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch(`${REST_API}/schools`);
        const data = await response.json();
        if (data.success) {
          setSchools(data.data);
        }
      } catch (error) {
        console.error("Error fetching schools:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

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
        
        {/* STATIC HEADER  */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[54px] md:text-[64px] font-black text-[#1a1f2e] tracking-tight leading-none mb-6"
          >
            School Enrollments
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[#64748b] text-xl md:text-2xl font-medium max-w-4xl mx-auto leading-relaxed"
          >
            Choose your path to excellence. Explore our specialized tech schools and start your journey with <span className="text-[#2563eb] font-bold">INANST</span>.
          </motion.p>
        </div>

        {/* DYNAMIC CONTENT AREA */}
        {loading ? (
          
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-12 h-12 text-[#2563eb] animate-spin" />
            <p className="text-[#64748b] font-bold animate-pulse text-lg">Loading...</p>
          </div>
        ) : (
          /* Schools Grid loaded from DB */
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8"
          >
            {schools.map((school) => (
              <motion.div key={school._id} variants={cardVariants}>
                <Link
                  href="/regular/register"
                  className="group h-full bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl p-10 flex flex-col items-center text-center transition-all duration-500 border border-gray-100 hover:border-blue-100"
                >
                  <div className="bg-gray-50 rounded-3xl p-6 mb-8 group-hover:bg-blue-50 group-hover:rotate-6 transition-all duration-300">
                    {iconMap[school.iconName] || <Monitor className="w-10 h-10 text-blue-600" />}
                  </div>
                  
                  <h3 className="text-xl font-black text-gray-800 mb-4 tracking-tight">
                    {school.title}
                  </h3>
                  
                  <p className="text-gray-500 text-sm leading-relaxed font-medium mb-6">
                    {school.description}
                  </p>

                  <p className="text-gray-900 font-black text-lg mb-8 tracking-tight">
                    {school.price}
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
        )}
      </div>
    </section>
  );
}
/*


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
      price: '₦25,000'
    },
    {
      title: 'IT Infrastructure School',
      icon: <Server className="w-10 h-10 text-indigo-600" />,
      description: 'Master the foundations of IT systems, networking, and infrastructure.',
      price: '₦45,000'
    },
    {
      title: 'Frontend Web Development School',
      icon: <Layout className="w-10 h-10 text-green-600" />,
      description: 'Build engaging, responsive, and modern web interfaces.',
      price: '₦65,000'
    },
    {
      title: 'Backend Web Development School',
      icon: <Code2 className="w-10 h-10 text-purple-600" />,
      description: 'Learn server-side programming and API development.',
      price: '₦70,000'
    },
    {
      title: 'Full-stack Web Development School',
      icon: <Layers className="w-10 h-10 text-orange-600" />,
      description: 'Combine frontend and backend skills to build complete web apps.',
      price: '₦120,000'
    },
    {
      title: 'Software Development School',
      icon: <Terminal className="w-10 h-10 text-red-600" />,
      description: 'Learn how to design, develop, and maintain software applications.',
      price: '₦95,000'
    },
    {
      title: 'Cyber Security School',
      icon: <Shield className="w-10 h-10 text-teal-600" />,
      description: 'Understand security fundamentals to protect digital systems.',
      price: '₦85,000'
    },
    {
      title: 'Database Management School',
      icon: <Database className="w-10 h-10 text-pink-600" />,
      description: 'Learn how to manage, query, and maintain enterprise databases.',
      price: '₦55,000'
    },
    {
      title: 'Data Analytics School',
      icon: <BarChart3 className="w-10 h-10 text-yellow-600" />,
      description: 'Gain skills to analyze and interpret data for business decisions.',
      price: '₦75,000'
    },
    {
      title: 'Mobile App Development School',
      icon: <Smartphone className="w-10 h-10 text-cyan-600" />,
      description: 'Create native and cross-platform mobile applications for iOS and Android.',
      price: '₦80,000'
    },
    {
      title: 'Embedded Systems School',
      icon: <Cpu className="w-10 h-10 text-emerald-600" />,
      description: 'Learn hardware programming, microcontrollers, and firmware development.',
      price: '₦110,000'
    },
    {
      title: 'Cloud Computing School',
      icon: <Globe className="w-10 h-10 text-sky-600" />,
      description: 'Master AWS, Azure, and cloud architecture for scalable systems.',
      price: '₦90,000'
    },
    {
      title: 'UI/UX Design School',
      icon: <PenTool className="w-10 h-10 text-rose-600" />,
      description: 'Design intuitive user experiences and beautiful digital interfaces.',
      price: '₦50,000'
    },
    {
      title: 'Ethical Hacking School',
      icon: <Lock className="w-10 h-10 text-slate-700" />,
      description: 'Advanced penetration testing and vulnerability assessment skills.',
      price: '₦100,000'
    },
  ];

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

        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8"
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
                
                <p className="text-gray-500 text-sm leading-relaxed font-medium mb-6">
                  {school.description}
                </p>

                
                <p className="text-gray-900 font-black text-lg mb-8 tracking-tight">
                  {school.price}
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
  */