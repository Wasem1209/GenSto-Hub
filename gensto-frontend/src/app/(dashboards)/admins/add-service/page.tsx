'use client';

import React, { useState } from 'react';
import { 
  Plus, 
  ArrowLeft, 
  Type, 
  AlignLeft, 
  Link as LinkIcon, 
  Settings,
  Loader2,
  CheckCircle2,
  Sparkles,
  Rocket
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { REST_API } from '../../../constant';

export default function AddServicePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    iconName: '', 
    actionLink: '/regular/service/request'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${REST_API}/services`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        
        setTimeout(() => router.push('/admins/services'), 2500);
      }
    } catch (error) {
      console.error("Failed to add service:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50 p-6 md:p-12 font-sans overflow-hidden">
      
      {/* SUCCESS MODAL OVERLAY */}
      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1a1f2e]/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[3.5rem] p-10 md:p-16 max-w-sm w-full text-center shadow-2xl animate-in zoom-in-95 duration-300 border border-white/20">
            <div className="relative mx-auto w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="text-emerald-500 w-12 h-12" />
                <Sparkles className="absolute -top-1 -right-1 text-amber-400 animate-pulse" size={24} />
            </div>
            <h2 className="text-2xl font-black text-[#1a1f2e] mb-2 tracking-tight">Deployment Successful</h2>
            <p className="text-gray-500 font-medium text-sm leading-relaxed">
              The new tech solution has been initialized and deployed to the ecosystem. Redirecting to fleet...
            </p>
            <div className="mt-8 flex justify-center gap-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-.3s]" />
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-.5s]" />
            </div>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto">
        <Link 
          href="/admins/services" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-8 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-black uppercase tracking-widest">Back to Fleet</span>
        </Link>

        <header className="mb-12 text-center md:text-left">
          <h1 className="text-4xl font-black text-[#1a1f2e] tracking-tight">Deploy New Service</h1>
          <p className="text-gray-500 font-medium mt-1">Register a new solution in the tech ecosystem.</p>
        </header>

        <div className="bg-white rounded-[3.5rem] p-8 md:p-12 shadow-2xl shadow-blue-900/5 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Service Title */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-2">
                <Type size={14} /> Service Title
              </label>
              <input 
                required
                type="text"
                placeholder="e.g. Cross-Platform Web Apps"
                className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all font-bold text-gray-900"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>

            {/* Description */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-2">
                <AlignLeft size={14} /> Description
              </label>
              <textarea 
                required
                rows={4}
                placeholder="Brief summary of the tech solution..."
                className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-3xl px-6 py-4 outline-none transition-all font-medium text-gray-600 leading-relaxed"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Icon Name */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-2">
                  <Settings size={14} /> Icon Name (Lucide)
                </label>
                <input 
                  required
                  type="text"
                  placeholder="Brain, Globe, Cpu, etc."
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all font-mono text-sm"
                  value={formData.iconName}
                  onChange={(e) => setFormData({...formData, iconName: e.target.value})}
                />
              </div>

              {/* Action Link */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-2">
                  <LinkIcon size={14} /> Action Link
                </label>
                <input 
                  required
                  type="text"
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all font-mono text-sm"
                  value={formData.actionLink}
                  onChange={(e) => setFormData({...formData, actionLink: e.target.value})}
                />
              </div>
            </div>

            <button 
              disabled={loading || success}
              type="submit"
              className={`w-full py-6 rounded-3xl font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-3 transition-all ${
                success 
                ? 'bg-emerald-500 text-white cursor-default' 
                : 'bg-[#1a1f2e] text-white hover:bg-blue-600 shadow-xl shadow-blue-900/10 active:scale-95'
              }`}
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : success ? (
                <>
                  <Rocket className="animate-bounce" size={18} />
                  Deployed
                </>
              ) : (
                <>
                  <Plus size={18} />
                  Initialize Service
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}