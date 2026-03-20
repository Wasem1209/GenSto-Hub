'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { 
  GraduationCap, Code2, Database, ShieldAlert, 
  Cpu, Layout, Smartphone, X, CheckCircle, 
  Loader2, Send, Mail, User, BookOpen, 
  ChevronRight, LucideIcon, Terminal, 
  LineChart, PenTool, BarChart3, Cloud, Layers
} from 'lucide-react';

interface Internship {
  id: string;
  title: string;
  icon: LucideIcon;
  isOpen: boolean;
  description: string;
  color: string;
}

const internships: Internship[] = [
  {
    id: 'fs-01',
    title: 'Full-stack',
    icon: Layers,
    isOpen: true,
    description: 'Master the MERN stack and Next.js to build end-to-end business solutions.',
    color: 'text-indigo-600 bg-indigo-50',
  },
  {
    id: 'fe-01',
    title: 'Frontend',
    icon: Layout,
    isOpen: true,
    description: 'Work with Tailwind CSS and Framer Motion to build world-class UIs.',
    color: 'text-blue-600 bg-blue-50',
  },
  {
    id: 'be-01',
    title: 'Backend',
    icon: Database,
    isOpen: true,
    description: 'Master Node.js and MongoDB architecture for scalable hub services.',
    color: 'text-emerald-600 bg-emerald-50',
  },
  {
    id: 'cs-01',
    title: 'Cyber Security',
    icon: Terminal,
    isOpen: true,
    description: 'Focus on network security, threat detection, and system hardening.',
    color: 'text-slate-700 bg-slate-100',
  },
  {
    id: 'ds-01',
    title: 'Data Science',
    icon: BarChart3,
    isOpen: true,
    description: 'Leverage Python and ML models to extract insights from complex datasets.',
    color: 'text-rose-600 bg-rose-50',
  },
  {
    id: 'ux-01',
    title: 'UI/UX Design',
    icon: PenTool,
    isOpen: true,
    description: 'Create high-fidelity wireframes and user-centric design systems.',
    color: 'text-pink-600 bg-pink-50',
  },
  {
    id: 'pm-01',
    title: 'Product Manager',
    icon: LineChart,
    isOpen: true,
    description: 'Strategy, roadmap planning, and bridging the gap between tech and business.',
    color: 'text-cyan-600 bg-cyan-50',
  },
  {
    id: 'da-01',
    title: 'Data Analysis',
    icon: CheckCircle,
    isOpen: true,
    description: 'Transform raw data into actionable business intelligence reports.',
    color: 'text-amber-600 bg-amber-50',
  },
  {
    id: 'hw-01',
    title: 'Hardware',
    icon: Cpu,
    isOpen: false,
    description: 'IoT prototyping and agricultural storage hardware solutions.',
    color: 'text-orange-600 bg-orange-50',
  },
  {
    id: 'eh-01',
    title: 'Ethical Hacking',
    icon: ShieldAlert,
    isOpen: true,
    description: 'Security auditing, penetration testing, and protecting the ecosystem.',
    color: 'text-red-600 bg-red-50',
  },
  {
    id: 'ma-01',
    title: 'Mobile App',
    icon: Smartphone,
    isOpen: true,
    description: 'Building native-feel experiences using React Native and Flutter.',
    color: 'text-purple-600 bg-purple-50',
  },
  {
    id: 'cl-01',
    title: 'Cloud Engineer',
    icon: Cloud,
    isOpen: false,
    description: 'Architecting AWS/Vercel environments for high availability.',
    color: 'text-sky-600 bg-sky-50',
  }
];

export default function InternshipPage() {
  const [selectedRole, setSelectedRole] = useState<Internship | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    portfolio: '',
    reason: ''
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleApply = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setShowSuccess(true);
  };

  const closeModal = () => {
    setSelectedRole(null);
    setShowSuccess(false);
    setFormData({ name: '', email: '', portfolio: '', reason: '' });
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 md:px-8 space-y-12 animate-in fade-in duration-700">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sky-600">
          <GraduationCap size={20} />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Careers & Training</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">Open Internships</h1>
        <p className="text-gray-500 max-w-xl text-sm md:text-base leading-relaxed">
          Select a track below to apply. Our internships focus on real-world projects 
          within the <span className="text-gray-800 font-bold">INANST</span> ecosystem.
        </p>
      </div>

      {/* Grid: 2 columns mobile, 3 columns tablet, 4 columns desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
        {internships.map((role) => (
          <button
            key={role.id}
            onClick={() => setSelectedRole(role)}
            className="group relative flex flex-col bg-white border border-gray-100 p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] text-left hover:border-gray-900 hover:shadow-xl hover:shadow-orange-50 transition-all duration-300"
          >
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 ${role.color} transition-transform group-hover:scale-110`}>
              <role.icon size={22} />
            </div>
            
            <h3 className="text-xs md:text-sm font-black text-gray-900 mb-1 leading-tight">{role.title}</h3>
            
            <div className="flex items-center gap-1.5 mt-auto">
              <div className={`w-1.5 h-1.5 rounded-full ${role.isOpen ? 'bg-emerald-500' : 'bg-gray-300'}`} />
              <span className={`text-[8px] md:text-[9px] font-bold uppercase tracking-wider ${role.isOpen ? 'text-emerald-600' : 'text-gray-400'}`}>
                {role.isOpen ? 'Open' : 'Closed'}
              </span>
            </div>

            <ChevronRight size={14} className="absolute bottom-4 right-4 text-gray-300 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
          </button>
        ))}
      </div>

      {/* Modal remains the same as the previous implementation */}
      {selectedRole && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl relative">
            <button onClick={closeModal} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition">
              <X size={20} className="text-gray-400" />
            </button>

            {!showSuccess ? (
              <div className="p-8 md:p-10">
                {!selectedRole.isOpen ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="w-16 h-16 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto">
                      <BookOpen size={30} />
                    </div>
                    <h2 className="text-2xl font-black text-gray-900">Applications Closed</h2>
                    <p className="text-sm text-gray-500">The {selectedRole.title} internship is currently full. Check back in 3 months.</p>
                  </div>
                ) : (
                  <form onSubmit={handleApply} className="space-y-5">
                    <div className="mb-6">
                      <h2 className="text-2xl font-black text-gray-900 tracking-tight">{selectedRole.title} Intern</h2>
                      <p className="text-xs text-gray-400 mt-1 uppercase font-bold tracking-widest">Inanst Talent Program</p>
                    </div>

                    <div className="space-y-4">
                      <div className="relative">
                        <User className="absolute left-4 top-4 text-gray-300" size={18} />
                        <input required name="name" type="text" placeholder="Full Name" value={formData.name} onChange={handleInputChange} className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-orange-500" />
                      </div>
                      <div className="relative">
                        <Mail className="absolute left-4 top-4 text-gray-300" size={18} />
                        <input required name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-orange-500" />
                      </div>
                      <div className="relative">
                        <Code2 className="absolute left-4 top-4 text-gray-300" size={18} />
                        <input required name="portfolio" type="url" placeholder="Portfolio / LinkedIn" value={formData.portfolio} onChange={handleInputChange} className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-sky-500" />
                      </div>
                      <textarea required name="reason" rows={3} placeholder="Why this role?" value={formData.reason} onChange={handleInputChange} className="w-full p-5 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-sky-500 resize-none" />
                    </div>

                    <button disabled={isSubmitting} className="w-full py-5 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-gray-700 transition-all shadow-xl shadow-sky-100">
                      {isSubmitting ? <Loader2 className="animate-spin" /> : <><Send size={16} /> Submit Application</>}
                    </button>
                  </form>
                )}
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                  <CheckCircle size={40} />
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Application Sent</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-10">We have sent a confirmation email to <strong>{formData.email}</strong>. Our hiring team will review your portfolio and reach out shortly.</p>
                <button onClick={closeModal} className="w-full py-5 bg-gray-900 text-white rounded-[2rem] font-black uppercase tracking-widest text-xs">Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}