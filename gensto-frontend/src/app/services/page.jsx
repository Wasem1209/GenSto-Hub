'use client';

import { useState } from 'react';
import {
  Code2,
  Wrench,
  Layers,
  Settings,
  GraduationCap,
  Users,
  ShieldCheck,
  Cpu,
  X,
  MessageCircle,
  Mail,
  Phone,
  CheckCircle,
  Loader2,
  BrainCircuit,
  SearchCheck,
  Smartphone,
  Globe,
  LifeBuoy,
  MessageSquare
} from 'lucide-react';

const techSolutions = [
  {
    title: 'AI Agent & Automation',
    icon: BrainCircuit,
    desc: 'Developing intelligent AI agents and automated workflows to optimize your business operations.'
  },
  {
    title: 'Cross-Platform Web Apps',
    icon: Globe,
    desc: 'High-performance web applications built to work seamlessly across all browsers and devices.'
  },
  {
    title: 'Mobile Application Dev',
    icon: Smartphone,
    desc: 'Native and hybrid mobile solutions for iOS and Android, focusing on scalability and user experience.'
  },
  {
    title: 'Software Security Check',
    icon: ShieldCheck,
    desc: 'Comprehensive security auditing and vulnerability testing to protect your digital assets.'
  },
  {
    title: 'Quality Assurance & Testing',
    icon: SearchCheck,
    desc: 'Rigorous manual and automated testing to ensure your software is bug-free and reliable.'
  },
  {
    title: 'Technical Consultation',
    icon: MessageSquare,
    desc: 'Expert guidance on tech stacks, architecture, and digital transformation strategies.'
  },
  {
    title: 'Tech Mentorship',
    icon: LifeBuoy,
    desc: 'One-on-one and group mentorship for developers and tech teams to accelerate growth.'
  },
  {
    title: 'Software Maintenance',
    icon: Wrench,
    desc: 'Ongoing support, updates, and performance optimization for existing software systems.'
  },
  {
    title: 'Scalable Product Building',
    icon: Layers,
    desc: 'End-to-end product development for startups and enterprises ready to scale.'
  },
  {
    title: 'Custom CMS & LMS',
    icon: GraduationCap,
    desc: 'Specialized systems for central management and digital learning tailored to your needs.'
  },
];

export default function ServicesPage() {
  const [selectedSolution, setSelectedSolution] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    details: ''
  });

  const handleOpenModal = (solution) => {
    setSelectedSolution(solution);
  };

  const handleCloseModal = () => {
    setSelectedSolution(null);
    setShowSuccess(false);
    setFormData({ name: '', email: '', details: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // API INTEGRATION POINT
    // const response = await fetch('/api/solution-request', { method: 'POST', body: JSON.stringify({...formData, solution: selectedSolution.title}) });

    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setShowSuccess(true);
  };

  return (
    <section className="bg-gray-50 mt-8 py-16 px-6 relative">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-black text-gray-800 mb-4 tracking-tight">
          Our Tech Solutions
        </h1>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto font-medium">
          At <span className="text-blue-600 font-bold">INANST</span>, we provide high-end tech solutions that solve real-world problems through innovation and precision.
        </p>

        {/* Grid for Tech Solutions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {techSolutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <div
                key={index}
                onClick={() => handleOpenModal(solution)}
                className="bg-white rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer p-8 flex flex-col items-center text-center border border-gray-100 group"
              >
                <div className="bg-blue-50 p-6 rounded-2xl mb-5 group-hover:bg-blue-600 transition-colors duration-300">
                  <Icon className="w-10 h-10 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  {solution.title}
                </h3>
                <p className="text-gray-500 text-sm mt-3 leading-relaxed">{solution.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest">
                  <span>Get Started</span>
                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Request Modal */}
      {selectedSolution && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">

            <button
              onClick={handleCloseModal}
              className="absolute top-8 right-8 p-2 hover:bg-gray-100 rounded-full transition"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>

            {!showSuccess ? (
              <div className="p-10 md:p-14">
                <div className="mb-10">
                  <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                    Solution Inquiry
                  </span>
                  <h2 className="text-4xl font-black text-gray-900 mt-4 tracking-tighter">
                    {selectedSolution.title}
                  </h2>
                  <p className="text-gray-500 mt-2 font-medium">Connect with INANST experts immediately.</p>
                </div>

                {/* Direct Contact Channels */}
                <div className="grid grid-cols-3 gap-4 mb-10">
                  <a href="https://wa.me/yournumber" className="flex flex-col items-center p-4 rounded-2xl bg-green-50 text-green-600 hover:bg-green-100 transition border border-green-100">
                    <MessageCircle className="w-7 h-7 mb-2" />
                    <span className="text-[10px] font-black uppercase">WhatsApp</span>
                  </a>
                  <a href="mailto:info@inanst.com" className="flex flex-col items-center p-4 rounded-2xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition border border-blue-100">
                    <Mail className="w-7 h-7 mb-2" />
                    <span className="text-[10px] font-black uppercase">Email</span>
                  </a>
                  <a href="tel:+123456789" className="flex flex-col items-center p-4 rounded-2xl bg-gray-50 text-gray-600 hover:bg-gray-100 transition border border-gray-200">
                    <Phone className="w-7 h-7 mb-2" />
                    <span className="text-[10px] font-black uppercase">Call</span>
                  </a>
                </div>

                <div className="relative flex items-center mb-10">
                  <div className="flex-grow border-t border-gray-100"></div>
                  <span className="flex-shrink mx-6 text-gray-400 text-[10px] font-black uppercase tracking-widest">OR Send a Brief</span>
                  <div className="flex-grow border-t border-gray-100"></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      required
                      type="text"
                      placeholder="Name/Company"
                      className="w-full px-6 py-4 rounded-2xl border border-gray-200 outline-none focus:border-blue-500 bg-gray-50 transition"
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <input
                      required
                      type="email"
                      placeholder="Email Address"
                      className="w-full px-6 py-4 rounded-2xl border border-gray-200 outline-none focus:border-blue-500 bg-gray-50 transition"
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <textarea
                    required
                    rows="4"
                    placeholder="Tell us about your project or required solution..."
                    className="w-full px-6 py-4 rounded-2xl border border-gray-200 outline-none focus:border-blue-500 bg-gray-50 transition resize-none"
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  ></textarea>

                  <button
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" /> : 'Submit Inquiry'}
                  </button>
                </form>
              </div>
            ) : (
              <div className="p-16 text-center flex flex-col items-center">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8 animate-bounce-short">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
                <h3 className="text-3xl font-black text-gray-900 tracking-tight">Inquiry Received</h3>
                <p className="text-gray-500 mt-4 leading-relaxed max-w-sm">
                  The <span className="font-bold text-blue-600">INANST</span> team has been notified. We will reach out to you regarding <strong>{selectedSolution.title}</strong> within one business day.
                </p>
                <button
                  onClick={handleCloseModal}
                  className="mt-10 bg-gray-900 text-white px-12 py-5 rounded-2xl font-black hover:bg-black transition uppercase tracking-widest text-xs"
                >
                  Back to Solutions
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}