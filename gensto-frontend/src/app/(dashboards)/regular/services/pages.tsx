'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import {
  Code2,
  Layers,
  Settings,
  Users,
  ShieldCheck,
  Cpu,
  X,
  MessageCircle,
  Phone,
  CheckCircle,
  Loader2,
  BrainCircuit,
  SearchCheck,
  Smartphone,
  Globe,
  LifeBuoy,
  MessageSquare,
  Camera,
  Briefcase,
  LucideIcon
} from 'lucide-react';

interface TechSolution {
  title: string;
  icon: LucideIcon;
  desc: string;
  category: 'Tech' | 'Creative' | 'Consulting';
}

const techSolutions: TechSolution[] = [
  {
    title: 'AI Agent & Automation',
    icon: BrainCircuit,
    category: 'Tech',
    desc: 'Developing intelligent AI agents and automated workflows to optimize your business operations.'
  },
  {
    title: 'Branding & Identity',
    icon: Briefcase,
    category: 'Creative',
    desc: 'Strategic brand positioning, logo design, and visual identity systems for the modern market.'
  },
  {
    title: 'Professional Photography',
    icon: Camera,
    category: 'Creative',
    desc: 'High-end product, corporate, and event photography managed through our multi-service hub.'
  },
  {
    title: 'Cross-Platform Web Apps',
    icon: Globe,
    category: 'Tech',
    desc: 'High-performance web applications built to work seamlessly across all browsers and devices.'
  },
  {
    title: 'Mobile Application Dev',
    icon: Smartphone,
    category: 'Tech',
    desc: 'Native and hybrid mobile solutions for iOS and Android, focusing on scalability.'
  },
  {
    title: 'Software Security Check',
    icon: ShieldCheck,
    category: 'Tech',
    desc: 'Comprehensive security auditing and vulnerability testing to protect your digital assets.'
  },
  {
    title: 'Quality Assurance & Testing',
    icon: SearchCheck,
    category: 'Tech',
    desc: 'Rigorous manual and automated testing to ensure your software is bug-free.'
  },
  {
    title: 'Technical Consultation',
    icon: MessageSquare,
    category: 'Consulting',
    desc: 'Expert guidance on tech stacks, architecture, and digital transformation strategies.'
  },
];

// Secondary tools section to utilize remaining imports
const enterpriseTools = [
  { name: 'Core Infrastructure', icon: Cpu },
  { name: 'DevOps & Scaling', icon: Layers },
  { name: 'Managed Systems', icon: Settings },
  { name: 'Team Collaboration', icon: Users },
  { name: '24/7 Support', icon: LifeBuoy },
];

export default function ServicesPage() {
  const [selectedSolution, setSelectedSolution] = useState<TechSolution | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    details: ''
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setShowSuccess(true);
  };

  const handleCloseModal = () => {
    setSelectedSolution(null);
    setShowSuccess(false);
    setFormData({ name: '', email: '', details: '' });
  };

  return (
    <section className="bg-white min-h-screen py-16 px-4 md:px-8 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full">
            <Code2 size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Inanst Ecosystem</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight">
            Professional Services
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            From MERN stack architecture to creative branding, we provide high-end solutions 
            designed to scale with your vision.
          </p>
        </div>

        {/* Main Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {techSolutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <div
                key={index}
                onClick={() => setSelectedSolution(solution)}
                className="group bg-white border border-gray-100 p-8 rounded-[2.5rem] hover:border-blue-600 hover:shadow-2xl hover:shadow-blue-50 transition-all cursor-pointer"
              >
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Icon size={28} className="text-blue-600 group-hover:text-white" />
                </div>
                <h3 className="text-lg font-black text-gray-900 mb-3">{solution.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">{solution.desc}</p>
                <div className="flex items-center text-blue-600 text-[10px] font-black uppercase tracking-widest">
                  Request Quote <ChevronRight size={14} className="ml-1" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Enterprise Capability Bar (Using remaining icons) */}
        <div className="bg-gray-900 rounded-[3rem] p-10 flex flex-wrap justify-around items-center gap-8 text-white/50 border border-white/10">
          {enterpriseTools.map((tool, i) => (
            <div key={i} className="flex items-center gap-3">
              <tool.icon size={20} className="text-blue-400" />
              <span className="text-[10px] font-black uppercase tracking-widest">{tool.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Overlay */}
      {selectedSolution && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-md">
          <div className="bg-white rounded-[3rem] w-full max-w-xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            {!showSuccess ? (
              <div className="p-10 md:p-12">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <span className="text-blue-600 text-[10px] font-black uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
                      {selectedSolution.category} Inquiry
                    </span>
                    <h2 className="text-3xl font-black text-gray-900 mt-4">{selectedSolution.title}</h2>
                  </div>
                  <button onClick={handleCloseModal} className="p-2 hover:bg-gray-100 rounded-full transition">
                    <X size={24} className="text-gray-400" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Contact Name</label>
                      <input 
                        required name="name" type="text" value={formData.name} onChange={handleInputChange}
                        className="w-full p-4 bg-gray-50 rounded-2xl border-none text-sm focus:ring-2 focus:ring-blue-500" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Work Email</label>
                      <input 
                        required name="email" type="email" value={formData.email} onChange={handleInputChange}
                        className="w-full p-4 bg-gray-50 rounded-2xl border-none text-sm focus:ring-2 focus:ring-blue-500" 
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Project Brief</label>
                    <textarea 
                      required name="details" rows={4} value={formData.details} onChange={handleInputChange}
                      placeholder="Tell us about your requirements..."
                      className="w-full p-4 bg-gray-50 rounded-2xl border-none text-sm focus:ring-2 focus:ring-blue-500 resize-none" 
                    />
                  </div>

                  <div className="flex gap-3 py-4">
                    <a href="https://wa.me/yournumber" className="flex-1 p-4 rounded-2xl bg-emerald-50 text-emerald-600 flex flex-col items-center gap-1 hover:bg-emerald-100 transition">
                      <MessageCircle size={20} />
                      <span className="text-[8px] font-black uppercase">WhatsApp</span>
                    </a>
                    <a href="tel:+123456789" className="flex-1 p-4 rounded-2xl bg-blue-50 text-blue-600 flex flex-col items-center gap-1 hover:bg-blue-100 transition">
                      <Phone size={20} />
                      <span className="text-[8px] font-black uppercase">Call Direct</span>
                    </a>
                  </div>

                  <button 
                    disabled={isSubmitting}
                    className="w-full py-5 bg-blue-600 text-white rounded-[2rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-gray-900 transition-all shadow-xl shadow-blue-100"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" /> : 'Confirm Inquiry'}
                  </button>
                </form>
              </div>
            ) : (
              <div className="p-16 text-center">
                <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                  <CheckCircle size={40} />
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-4">Request Logged</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-10">
                  We&apos;ve received your brief for <strong>{selectedSolution?.title}</strong>. An expert from the Inanst team will contact you within 24 hours.
                </p>
                <button onClick={handleCloseModal} className="w-full py-5 bg-gray-900 text-white rounded-[2rem] font-black uppercase tracking-widest text-xs">
                  Return to Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

// Add this minor icon for the quote link
function ChevronRight({ size, className }: { size: number, className: string }) {
  return (
    <svg 
      width={size} height={size} viewBox="0 0 24 24" fill="none" 
      stroke="currentColor" strokeWidth="3" strokeLinecap="round" 
      strokeLinejoin="round" className={className}
    >
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}