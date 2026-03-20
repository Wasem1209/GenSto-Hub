'use client';

import React, { useState } from 'react';
import { 
  Users, Lightbulb, Handshake, Mail, 
  MessageCircle, Zap, Send, Loader2, 
  Sparkles, CheckCircle2, Globe
} from 'lucide-react';

export default function CollaborationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-50 text-cyan-600 rounded-lg">
          <Zap size={14} className="fill-cyan-600" />
          <span className="text-[10px] font-black uppercase tracking-widest">Open Ecosystem</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter">
          Collaborate With Inanst
        </h1>
        <p className="text-gray-500 text-lg leading-relaxed max-w-2xl mx-auto">
          We believe the best solutions are built together. Whether you are a student, 
          a creative professional, or an innovator, there is a seat for you at our table.
        </p>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: <Users className="text-cyan-600" />,
            title: "Community Impact",
            desc: "Co-create programs that empower students and bridge the gap between learning and earning.",
            color: "bg-cyan-50"
          },
          {
            icon: <Lightbulb className="text-amber-500" />,
            title: "Innovation & R&D",
            desc: "Join forces to prototype groundbreaking tools at the intersection of tech and real-world needs.",
            color: "bg-amber-50"
          },
          {
            icon: <Handshake className="text-indigo-600" />,
            title: "Mutual Growth",
            desc: "Access our resources and network in exchange for your unique expertise and perspective.",
            color: "bg-indigo-50"
          }
        ].map((pillar, idx) => (
          <div key={idx} className="bg-white border border-gray-100 rounded-[2rem] p-8 hover:shadow-xl transition-all duration-300 group">
            <div className={`w-14 h-14 ${pillar.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              {pillar.icon}
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-3">{pillar.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{pillar.desc}</p>
          </div>
        ))}
      </div>

      {/* Project Submission Form */}
      <div className="bg-white border border-gray-100 rounded-[3rem] p-8 md:p-12 shadow-sm relative overflow-hidden">
        {/* Subtle decorative background icon */}
        <Sparkles className="absolute -top-10 -right-10 text-cyan-50/50 w-64 h-64 pointer-events-none" />

        {submitted ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="text-2xl font-black text-gray-900">Proposal Logged!</h3>
            <p className="text-gray-500 text-sm max-w-xs">Our creative leads will review your pitch and contact you via your dashboard notifications.</p>
            <button onClick={() => setSubmitted(false)} className="text-cyan-600 text-xs font-black uppercase tracking-widest hover:underline mt-4">Submit another idea</button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-10 relative z-10">
              <div className="p-2 bg-cyan-50 text-cyan-600 rounded-xl">
                <Sparkles size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">Pitch Your Idea</h3>
                <p className="text-gray-500 text-xs uppercase font-bold tracking-[0.2em]">Turn your vision into an Inanst project</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Project Name</label>
                  <input required type="text" placeholder="e.g. Eco-Track App" className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-cyan-500 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Category</label>
                  <select className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-cyan-500 appearance-none cursor-pointer">
                    <option>Software Dev</option>
                    <option>Design & Branding</option>
                    <option>Community Outreach</option>
                    <option>Hardware/IoT</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Project/Portfolio URL (Optional)</label>
                <div className="relative">
                  <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="url" placeholder="https://github.com/... or https://project.com" className="w-full p-4 pl-12 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-cyan-500 transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Brief Description</label>
                <textarea required rows={4} placeholder="What problem are you solving and how can we help?" className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-cyan-500 resize-none transition-all" />
              </div>

              <button 
                disabled={isSubmitting}
                className="w-full py-5 bg-gray-900 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-cyan-600 transition-all shadow-xl shadow-gray-200 disabled:opacity-50 active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <>
                    <Send size={16} />
                    Submit to Review Board
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>

      {/* Final Call to Action */}
      <div className="bg-cyan-600 rounded-[2.5rem] p-10 text-center text-white shadow-2xl shadow-cyan-900/20">
        <h2 className="text-3xl font-black mb-4 tracking-tight">Direct Support</h2>
        <p className="text-cyan-100 max-w-2xl mx-auto text-sm md:text-base mb-8 leading-relaxed">
          Prefer a direct conversation? Our collaboration desk is open for inquiries regarding institutional partnerships or large-scale ventures.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="mailto:genstohub1@gmail.com" className="flex items-center justify-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-black transition-all">
            <Mail size={16} /> Official Email
          </a>
          <a href="https://wa.me/+2349117559163" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-cyan-600 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-cyan-50 transition-all">
            <MessageCircle size={16} /> WhatsApp Support
          </a>
        </div>
      </div>

    </div>
  );
}