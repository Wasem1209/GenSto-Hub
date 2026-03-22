'use client';

import React, { useState } from 'react';
import {
    LifeBuoy, Send, MessageSquare, AlertCircle,
    CheckCircle2, Clock, ShieldCheck, ChevronRight,
    Headset, Cpu, BookOpen, X, UserCircle
} from 'lucide-react';

export default function SupportPage() {
    const [activeTab, setActiveTab] = useState('new');
    const [showSuccess, setShowSuccess] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        schoolId: '', // Optional field
        category: 'Technical Support',
        priority: 'Medium',
        subject: '',
        message: ''
    });

    // Mock Ticket History
    const myTickets = [
        { id: 'TIC-9921', subject: 'Next.js Build Error', status: 'In Progress', date: 'Mar 20, 2026' },
        { id: 'TIC-8840', subject: 'Course Enrollment Issue', status: 'Resolved', date: 'Mar 15, 2026' },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic: Send to Inanst Admin API
        // If schoolId is empty, it's treated as a guest/general inquiry
        console.log("Ticket Routing to Admin/Workers:", formData);
        setShowSuccess(true);
    };

    return (
        <div className="p-6 lg:p-10 max-w-6xl mx-auto animate-in fade-in duration-500">

            {/* Header */}
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Support Desk</h1>
                    <p className="text-slate-500 text-sm mt-1">Direct communication channel with Inanst Tech Hub staff.</p>
                </div>
                <div className="flex bg-[#1A1D21] p-1 rounded-xl border border-slate-800">
                    <button
                        onClick={() => setActiveTab('new')}
                        className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'new' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500'}`}
                    >
                        New Ticket
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'history' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500'}`}
                    >
                        My Tickets
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* Left Column: The Form / Ticket List */}
                <div className="lg:col-span-2">
                    {activeTab === 'new' ? (
                        <form onSubmit={handleSubmit} className="bg-[#1A1D21] border border-slate-800 rounded-[2.5rem] p-8 md:p-10 space-y-6 shadow-xl">

                            {/* Optional School ID Section */}
                            <div className="bg-[#0F1113] border border-slate-800/50 p-6 rounded-2xl border-dashed">
                                <div className="flex items-center gap-3 mb-4">
                                    <UserCircle size={18} className="text-blue-500" />
                                    <h3 className="text-[10px] font-black text-white uppercase tracking-widest">Identification (Optional)</h3>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Enter School ID (e.g. INS-2026-XXXX)"
                                    value={formData.schoolId}
                                    onChange={(e) => setFormData({ ...formData, schoolId: e.target.value })}
                                    className="w-full bg-[#1A1D21] border border-slate-800 rounded-xl p-4 text-white text-sm focus:border-blue-500 outline-none transition-all"
                                />
                                <p className="text-[9px] text-slate-500 mt-2 italic">* Leave blank if you are a guest or not yet enrolled.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Inquiry Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full bg-[#0F1113] border border-slate-800 rounded-2xl p-4 text-slate-300 text-sm focus:border-blue-500 outline-none appearance-none cursor-pointer"
                                    >
                                        <option>Technical Support</option>
                                        <option>Academic Inquiry</option>
                                        <option>Billing & Payments</option>
                                        <option>General Information</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Priority Level</label>
                                    <select
                                        value={formData.priority}
                                        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                        className="w-full bg-[#0F1113] border border-slate-800 rounded-2xl p-4 text-slate-300 text-sm focus:border-blue-500 outline-none appearance-none cursor-pointer"
                                    >
                                        <option>Low</option>
                                        <option>Medium</option>
                                        <option>Urgent</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Subject</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Summary of your request"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    className="w-full bg-[#0F1113] border border-slate-800 rounded-2xl p-4 text-slate-300 text-sm focus:border-blue-500 outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Message Details</label>
                                <textarea
                                    required
                                    rows={6}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="How can our workers help you today? Please be as descriptive as possible..."
                                    className="w-full bg-[#0F1113] border border-slate-800 rounded-2xl p-4 text-slate-300 text-sm focus:border-blue-500 outline-none transition-all resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-900/20"
                            >
                                <Send size={18} /> Send to Staff
                            </button>
                        </form>
                    ) : (
                        <div className="space-y-4">
                            {myTickets.map((ticket) => (
                                <div key={ticket.id} className="bg-[#1A1D21] border border-slate-800 p-6 rounded-3xl flex items-center justify-between group hover:border-slate-700 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-blue-500 transition-colors">
                                            <MessageSquare size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-sm">{ticket.subject}</h4>
                                            <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-1">ID: {ticket.id} • {ticket.date}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full ${ticket.status === 'Resolved' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                                            {ticket.status}
                                        </span>
                                        <ChevronRight size={18} className="text-slate-600" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Column: Information & Guidelines */}
                <div className="space-y-6">
                    <div className="bg-[#1A1D21] border border-slate-800 p-8 rounded-[2rem] space-y-6">
                        <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
                            <AlertCircle size={16} className="text-blue-500" /> Response Times
                        </h3>
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="mt-1"><Clock size={16} className="text-slate-500" /></div>
                                <p className="text-xs text-slate-400 leading-relaxed">Tickets are processed by admins and workers within **2-6 hours**.</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="mt-1"><ShieldCheck size={16} className="text-slate-500" /></div>
                                <p className="text-xs text-slate-400 leading-relaxed">Enrolled students with a **School ID** should include their school ID.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-600/5 border border-blue-500/10 p-8 rounded-[2rem] space-y-4">
                        <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Staff Availability</h4>
                        <p className="text-xl font-black text-white">09:00 — 18:00</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Monday to Sunday (WAT)</p>
                    </div>
                </div>
            </div>

            {/* SUCCESS MODAL */}
            {showSuccess && (
                <div className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
                    <div className="bg-[#1A1D21] border border-slate-800 rounded-[3rem] p-12 max-w-md w-full text-center space-y-8 animate-in scale-95 duration-300">
                        <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto border border-green-500/20 shadow-inner">
                            <CheckCircle2 size={48} />
                        </div>
                        <div>
                            <h3 className="text-3xl font-black text-white uppercase tracking-tight">Report Received</h3>
                            <p className="text-slate-500 text-sm mt-3 leading-relaxed">
                                Your inquiry has been successfully queued for our team. We'll get back to you shortly.
                            </p>
                        </div>
                        <button
                            onClick={() => { setShowSuccess(false); setActiveTab('history'); }}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest transition-all"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}