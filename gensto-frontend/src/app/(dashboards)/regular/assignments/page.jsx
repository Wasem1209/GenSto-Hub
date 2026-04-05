'use client';

import React, { useState } from 'react';
import {
    FileText, Clock, CheckCircle2, AlertCircle,
    Send, BookOpen, ChevronRight, X, Github,
    Lock, ShieldCheck
} from 'lucide-react';

export default function AssignmentsPage() {
    const [activeTab, setActiveTab] = useState('pending');
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);

    // Form State
    const [answer, setAnswer] = useState('');
    const [repoUrl, setRepoUrl] = useState('');
    const [schoolId, setSchoolId] = useState('');
    const [isAuthorized, setIsAuthorized] = useState(false);

    // Mock Data
    const assignments = [
        {
            id: 1,
            title: "Advanced React Patterns",
            course: "Full-Stack Development",
            dueDate: "Oct 25, 2026",
            status: "pending",
            question: "Explain the difference between useMemo and useCallback with code examples. When should you favor one over the other?",
            instructions: "1. Provide a clear written explanation. 2. Push a demo project to GitHub showing both hooks in action. 3. Ensure your README explains the performance gains."
        },
        {
            id: 2,
            title: "Database Normalization",
            course: "PostgreSQL Masterclass",
            dueDate: "Oct 22, 2026",
            status: "completed",
            question: "Submit a schema design for a hospital management system.",
            instructions: "Normalize up to 3NF. Provide the SQL schema file link."
        }
    ];

    //  Validate School ID
    const handleVerifyAccess = (e) => {
        e.preventDefault();
        if (schoolId.length >= 5) {
            setIsAuthorized(true);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to send data 
        console.log("Submitting:", { answer, repoUrl, studentId: schoolId });
        setSelectedAssignment(null);
        setShowSuccess(true);
        setAnswer('');
        setRepoUrl('');
    };

    // ACCESS DENIED STATE
    if (!isAuthorized) {
        return (
            <div className="h-[80vh] flex items-center justify-center p-6">
                <div className=" bg-slate-950/80 border border-slate-800 p-10 rounded-[2.5rem] max-w-md w-full text-center space-y-6 shadow-2xl animate-in zoom-in-95 duration-500">
                    <div className="w-20 h-20 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mx-auto border border-blue-500/20">
                        <Lock size={32} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-white uppercase tracking-tight">Student Access</h2>
                        <p className="text-slate-500 text-xs mt-2">Enter your official School ID to view and submit assignments.</p>
                    </div>
                    <form onSubmit={handleVerifyAccess} className="space-y-4">
                        <input
                            type="text"
                            required
                            placeholder="Enter School ID (e.g. INS-2026)"
                            value={schoolId}
                            onChange={(e) => setSchoolId(e.target.value)}
                            className="w-full bg-[#0F1113] border border-slate-800 rounded-2xl p-4 text-center text-white font-mono focus:border-blue-500 outline-none transition-all"
                        />
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all">
                            Verify Identity
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 lg:p-10 max-w-6xl mx-auto animate-in fade-in duration-500">

            {/* Header */}
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <ShieldCheck size={16} className="text-green-500" />
                        <span className="text-[10px] font-black text-green-500 uppercase tracking-[0.2em]">Authorized: {schoolId}</span>
                    </div>
                    <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Assignments</h1>
                    <p className="text-slate-500 text-sm">Submit your tasks and track your academic progress.</p>
                </div>

                {/* Simple Tab Switcher */}
                <div className="flex bg-[#1A1D21] p-1 rounded-xl border border-slate-800">
                    {['pending', 'completed'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Assignment Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {assignments
                    .filter(a => a.status === activeTab)
                    .map((item) => (
                        <div
                            key={item.id}
                            onClick={() => item.status === 'pending' && setSelectedAssignment(item)}
                            className={`p-8 rounded-[2rem] border transition-all cursor-pointer group relative overflow-hidden ${item.status === 'pending'
                                ? 'bg-[#1A1D21] border-slate-800 hover:border-blue-500/50 shadow-xl hover:shadow-blue-500/5'
                                : 'bg-slate-900/40 border-slate-800/50 opacity-70 grayscale'
                                }`}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-500">
                                    <FileText size={28} />
                                </div>
                                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${item.status === 'completed' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                                    }`}>
                                    {item.status === 'completed' ? 'Done' : `Due: ${item.dueDate}`}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-xs text-slate-500 mb-6 font-medium">{item.course}</p>

                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-500">
                                <span>Open Submission</span>
                                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    ))}
            </div>

            {/* SUBMISSION MODAL */}
            {selectedAssignment && (
                <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="bg-[#1A1D21] border border-slate-800 rounded-[3rem] w-full max-w-3xl overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="p-8 md:p-10 border-b border-slate-800 flex justify-between items-center">
                            <div>
                                <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-1 block">Assignment Details</span>
                                <h2 className="text-3xl font-black text-white uppercase tracking-tight">{selectedAssignment.title}</h2>
                            </div>
                            <button onClick={() => setSelectedAssignment(null)} className="p-3 bg-slate-800/50 hover:bg-red-500/20 hover:text-red-500 rounded-full transition-all">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex flex-col md:flex-row h-[60vh]">
                            {/* Left Side: Question & Instructions */}
                            <div className="w-full md:w-1/2 p-8 md:p-10 bg-[#0F1113]/50 overflow-y-auto border-r border-slate-800 space-y-8">
                                <div>
                                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <BookOpen size={14} /> The Question
                                    </h4>
                                    <p className="text-slate-200 text-sm leading-relaxed font-medium italic">
                                        "{selectedAssignment.question}"
                                    </p>
                                </div>

                                <div className="bg-blue-500/5 border border-blue-500/10 p-6 rounded-2xl">
                                    <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3">
                                        Submission Instructions
                                    </h4>
                                    <p className="text-slate-400 text-xs leading-relaxed">
                                        {selectedAssignment.instructions}
                                    </p>
                                </div>
                            </div>

                            {/* Right Side: Form Submission */}
                            <form onSubmit={handleSubmit} className="w-full md:w-1/2 p-8 md:p-10 overflow-y-auto space-y-6">
                                <div>
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block">
                                        Repository URL (GitHub/GitLab)
                                    </label>
                                    <div className="relative">
                                        <Github className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                                        <input
                                            type="url"
                                            required
                                            placeholder="https://github.com/username/repo"
                                            value={repoUrl}
                                            onChange={(e) => setRepoUrl(e.target.value)}
                                            className="w-full bg-[#0F1113] border border-slate-800 rounded-2xl p-4 pl-12 text-slate-200 text-sm focus:border-blue-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block">
                                        Written Response / Summary
                                    </label>
                                    <textarea
                                        required
                                        rows={5}
                                        value={answer}
                                        onChange={(e) => setAnswer(e.target.value)}
                                        placeholder="Provide your written explanation here..."
                                        className="w-full bg-[#0F1113] border border-slate-800 rounded-2xl p-4 text-slate-200 text-sm focus:border-blue-500 outline-none transition-all resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-900/20"
                                >
                                    <Send size={18} /> Submit to Portal
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* SUCCESS MODAL */}
            {showSuccess && (
                <div className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
                    <div className="bg-[#1A1D21] border border-slate-800 rounded-[3rem] p-12 max-w-sm w-full text-center space-y-8 animate-in scale-90 fade-in duration-300 shadow-2xl">
                        <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto border border-green-500/20 shadow-inner">
                            <CheckCircle2 size={48} />
                        </div>
                        <div>
                            <h3 className="text-3xl font-black text-white uppercase tracking-tight">Success!</h3>
                            <p className="text-slate-500 text-sm mt-3 leading-relaxed">
                                Your repository and response have been recorded for <span className="text-slate-300 font-bold">{schoolId}</span>.
                            </p>
                        </div>
                        <button
                            onClick={() => setShowSuccess(false)}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all"
                        >
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}