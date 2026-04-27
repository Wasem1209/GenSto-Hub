'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Plus, ArrowLeft, CheckCircle2, X } from 'lucide-react';
import { 
  Monitor, Server, Layout, Code2, Layers, 
  Shield, Database, BarChart3, Smartphone, 
  Cpu, Globe, Lock, PenTool, Terminal 
} from 'lucide-react';
import { REST_API } from '../../../constant';
import Link from 'next/link';

const iconComponentMap: Record<string, React.ElementType> = {
  Monitor, Server, Layout, Code2, Layers, Terminal,
  Shield, Database, BarChart3, Smartphone, Cpu, Globe,
  PenTool, Lock
};

const iconOptions = Object.keys(iconComponentMap);

export default function AddSchoolPage() {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '₦',
    iconName: 'Monitor'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch(`${REST_API}/schools`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      if (data.success) {
        setShowSuccess(true);
        setFormData({ title: '', description: '', price: '₦', iconName: 'Monitor' });
      }
    } catch (error) {
      console.error("Failed to add school:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 pt-24 pb-16 px-4 font-sans relative">
      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1a1f2e]/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[2.5rem] p-8 max-w-sm w-full shadow-2xl text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500" />
              <button 
                onClick={() => setShowSuccess(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </div>
              
              <h3 className="text-2xl font-black text-[#1a1f2e] mb-2">School Published!</h3>
              <p className="text-gray-500 font-medium mb-8">
                The new institution has been successfully added to the enrollment catalog.
              </p>
              
              <button
                onClick={() => setShowSuccess(false)}
                className="w-full bg-[#1a1f2e] text-white font-black py-4 rounded-2xl hover:bg-emerald-600 transition-all duration-300 uppercase tracking-widest text-xs"
              >
                Continue
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <Link href="/admin/dashboard" className="text-blue-600 flex items-center gap-2 mb-4 font-bold uppercase text-xs tracking-widest">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <h1 className="text-[42px] font-black text-[#1a1f2e] tracking-tight leading-none mb-4">
            Add New Tech School
          </h1>
          <p className="text-[#64748b] text-lg font-medium">
            Configure a new specialized school for the <span className="text-blue-600 font-bold">INANST</span> enrollment catalog.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-[#1a1f2e] font-black text-sm uppercase tracking-wider">School Title</label>
              <input 
                type="text"
                required
                placeholder="e.g., Cloud Engineering School"
                className="bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-blue-500 font-medium text-gray-800"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[#1a1f2e] font-black text-sm uppercase tracking-wider">Price</label>
              <input 
                type="text"
                required
                placeholder="₦45,000"
                className="bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-blue-500 font-medium text-gray-800"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
              />
            </div>

            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="text-[#1a1f2e] font-black text-sm uppercase tracking-wider">Select Display Icon</label>
              <div className="grid grid-cols-3 sm:grid-cols-7 gap-3 mt-2">
                {iconOptions.map((iconName) => {
                  const IconComponent = iconComponentMap[iconName];
                  return (
                    <button
                      key={iconName}
                      type="button"
                      onClick={() => setFormData({...formData, iconName})}
                      className={`p-4 rounded-2xl flex flex-col items-center gap-3 transition-all duration-300 border-2 ${
                        formData.iconName === iconName 
                          ? "border-blue-600 bg-blue-50 text-blue-600" 
                          : "border-transparent bg-gray-50 text-gray-400 hover:bg-gray-100"
                      }`}
                    >
                      <IconComponent className="w-6 h-6" />
                      <span className="text-[10px] font-bold uppercase tracking-tighter">{iconName}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="text-[#1a1f2e] font-black text-sm uppercase tracking-wider">Description</label>
              <textarea 
                required
                rows={4}
                placeholder="Describe the curriculum and learning outcomes..."
                className="bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-blue-500 font-medium text-gray-800 resize-none"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-10 w-full bg-[#1a1f2e] text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-blue-600 transition-all duration-300 uppercase tracking-widest text-xs"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
            {loading ? "Publishing School..." : "Add School to Catalog"}
          </button>
        </form>
      </div>
    </section>
  );
}