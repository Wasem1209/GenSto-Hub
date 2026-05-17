// gensto-frontend/src/app/(dashboards)/instructors/schedule-class/page.tsx

'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Calendar, Video, BookOpen, Loader2, CheckCircle2, AlertTriangle, X, Copy, Check } from 'lucide-react';

import { REST_API } from '../../../constant';

// Define a structural interface for a School record coming from your DB
interface SchoolTrack {
    _id: string;        // Database record unique identifier
    name: string;       // Human-readable string e.g., "School of Frontend Web"
    category: string;   // Enum matching target system rules e.g., "SCHOOL_OF_FRONTEND_WEB"
}

export default function ScheduleClassPage() {
    const [saving, setSaving] = useState<boolean>(false);
    const [copied, setCopied] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [statusMsg, setStatusMsg] = useState<{ text: string; type: 'success' | 'error' | '' }>({ text: '', type: '' });
    const [generatedRoomId, setGeneratedRoomId] = useState<string>('');
    
    // Asynchronous States for Database Records
    const [schools, setSchools] = useState<SchoolTrack[]>([]);
    const [loadingSchools, setLoadingSchools] = useState<boolean>(true);
    
    const [formData, setFormData] = useState({
        courseTitle: '',
        schoolId: '', 
        schoolCategory: '' // Default placeholder initialized dynamically once loaded
    });

    // Lifecycle Hook to load options on view assembly mount
    useEffect(() => {
        const fetchSchools = async () => {
            const token = localStorage.getItem('token');
            try {
                // Update the route endpoint string here according to your precise API layout architecture
                const response = await fetch(`${REST_API}/api/schools`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`Failed to load school domains from backend: ${response.status}`);
                }

                const result = await response.json();
                
                // Expecting structure: { success: true, data: [...] } or direct array matching
                const fetchedData: SchoolTrack[] = result.data || result;

                if (Array.isArray(fetchedData) && fetchedData.length > 0) {
                    setSchools(fetchedData);
                    setFormData(prev => ({ ...prev, schoolCategory: fetchedData[0].category }));
                } else {
                    throw new Error("Empty tracking category catalog payload returned from context server.");
                }
            } catch (err) {
                console.warn('Dynamic category pull failed, falling back to static structures:', err);
                
                // Safe robust client side interface redundancy logic if connection drops
                const fallbacks: SchoolTrack[] = [
                    { _id: '1', name: 'School of Frontend Web', category: 'SCHOOL_OF_FRONTEND_WEB' },
                    { _id: '2', name: 'School of Backend Web', category: 'SCHOOL_OF_BACKEND_WEB' },
                    { _id: '3', name: 'School of Software Engineering', category: 'SCHOOL_OF_SOFTWARE_ENGINEERING' }
                ];
                setSchools(fallbacks);
                setFormData(prev => ({ ...prev, schoolCategory: fallbacks[0].category }));
            } finally {
                setLoadingSchools(false);
            }
        };

        fetchSchools();
    }, []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy room ID keys:', err);
        }
    };

    const handleCreateSession = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSaving(true);
        setStatusMsg({ text: '', type: '' });
        setGeneratedRoomId('');

        const token = localStorage.getItem('token');
        if (!token) {
            setStatusMsg({ text: 'Authentication missing. Please sign in again.', type: 'error' });
            setShowModal(true);
            setSaving(false);
            return;
        }

        try {
            const response = await fetch(`${REST_API}/api/live/create-room`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: formData.courseTitle,
                    schoolId: formData.schoolId, 
                    category: formData.schoolCategory
                })
            });

            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error("Access Denied: You do not possess instructor clearance credentials to allocate live streaming assets.");
                }
                if (response.status === 404) {
                    throw new Error(`Endpoint not found (404). Please verify that the VideoSDK live-room service is online and mapped to '${REST_API}/api/live/create-room'.`);
                }
                throw new Error(`Server responded with an error status code: ${response.status}`);
            }

            const result = await response.json();

            if (result.success && result.data?.roomId) {
                setGeneratedRoomId(result.data.roomId);
                setStatusMsg({ 
                    text: 'Live workspace broadcast instance successfully provisioned and mapped down to student streams.', 
                    type: 'success' 
                });
                setShowModal(true);
                setFormData({ 
                    courseTitle: '', 
                    schoolId: '', 
                    schoolCategory: schools[0]?.category || 'SCHOOL_OF_FRONTEND_WEB' 
                });
            } else {
                throw new Error(result.message || 'Failed to initialize remote stream environment.');
            }
        } catch (err) {
            console.error('Scheduling Error:', err);
            const errorMessage = err instanceof Error ? err.message : 'Could not map operational live stream context.';
            setStatusMsg({ text: errorMessage, type: 'error' });
            setShowModal(true);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="p-6 lg:p-10 max-w-4xl mx-auto animate-in fade-in duration-500 font-sans relative">
            <div className="mb-10">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-600/10 text-blue-500 rounded-xl border border-blue-500/10">
                        <Calendar size={20} />
                    </div>
                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Operations Hub</span>
                </div>
                <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Schedule Live Class</h1>
                <p className="text-slate-500 text-sm mt-1">Deploy real-time infrastructure pipelines for upcoming learning pathways.</p>
            </div>

            <div className="bg-[#1A1D21] border border-slate-800 rounded-[2.5rem] p-8 space-y-8 shadow-2xl">
                <form onSubmit={handleCreateSession} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2 flex items-center gap-2">
                                <BookOpen size={12} /> Session Title
                            </label>
                            <input 
                                type="text" 
                                name="courseTitle"
                                required
                                value={formData.courseTitle}
                                onChange={handleInputChange}
                                placeholder="e.g., Advanced React Patterns & Hooks" 
                                className="w-full bg-[#0F1113] border border-slate-800 rounded-2xl p-4 text-white text-sm focus:border-blue-600 outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2 flex items-center gap-2">
                                <Video size={12} /> Target School ID
                            </label>
                            <input 
                                type="text" 
                                name="schoolId"
                                required
                                value={formData.schoolId}
                                onChange={handleInputChange}
                                placeholder="e.g., School ID Key (Inanst875)" 
                                className="w-full bg-[#0F1113] border border-slate-800 rounded-2xl p-4 text-white text-sm focus:border-blue-600 outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">School Department Tracks</label>
                            <div className="relative">
                                {loadingSchools ? (
                                    <div className="w-full bg-[#0F1113] border border-slate-800 rounded-2xl p-4 text-slate-400 text-sm flex items-center gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                                        <span>Resolving remote database tracks...</span>
                                    </div>
                                ) : (
                                    <>
                                        <select 
                                            name="schoolCategory"
                                            value={formData.schoolCategory}
                                            onChange={handleInputChange}
                                            className="w-full bg-[#0F1113] border border-slate-800 rounded-2xl p-4 text-white text-sm focus:border-blue-600 outline-none transition-all appearance-none cursor-pointer"
                                        >
                                            {schools.map((school) => (
                                                <option key={school._id} value={school.category}>
                                                    {school.name}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-500">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                            </svg>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end pt-4">
                        <button
                            type="submit"
                            disabled={saving || loadingSchools}
                            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white px-10 py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-lg"
                        >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Calendar size={16} />}
                            {saving ? 'Provisioning Infrastructure...' : 'Deploy Live Room Container'}
                        </button>
                    </div>
                </form>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
                    <div 
                        className="bg-[#1A1D21] border border-slate-800 w-full max-w-md rounded-[2rem] p-6 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300"
                        role="dialog"
                        aria-modal="true"
                    >
                        <div className={`absolute top-0 inset-x-0 h-1.5 ${statusMsg.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`} />

                        <button 
                            onClick={() => setShowModal(false)}
                            className="absolute top-5 right-5 p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all outline-none"
                        >
                            <X size={14} />
                        </button>

                        <div className="flex flex-col items-center text-center mt-4 space-y-4">
                            <div className={`p-4 rounded-full ${statusMsg.type === 'error' ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                                {statusMsg.type === 'error' ? <AlertTriangle size={32} /> : <CheckCircle2 size={32} />}
                            </div>

                            <h3 className="text-xl font-black text-white uppercase tracking-tight">
                                {statusMsg.type === 'error' ? 'Deployment Error' : 'Stream Success'}
                            </h3>

                            <p className="text-slate-400 text-xs px-2 leading-relaxed font-medium">
                                {statusMsg.text}
                            </p>

                            {statusMsg.type === 'success' && generatedRoomId && (
                                <div className="w-full bg-[#0F1113] border border-slate-800 rounded-2xl p-3.5 flex items-center justify-between gap-3 mt-2 group">
                                    <div className="flex flex-col items-start text-left">
                                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Assigned Room Container ID</span>
                                        <span className="text-sm font-mono font-bold text-blue-400 mt-0.5 tracking-wide">{generatedRoomId}</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => copyToClipboard(generatedRoomId)}
                                        className="p-2.5 rounded-xl bg-[#1A1D21] border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all flex items-center gap-1.5 group/btn"
                                        title="Copy Stream ID Token"
                                    >
                                        {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                                        <span className="text-[9px] font-black uppercase tracking-wider hidden sm:inline">
                                            {copied ? 'Copied' : 'Copy'}
                                        </span>
                                    </button>
                                </div>
                            )}

                            <button
                                onClick={() => setShowModal(false)}
                                className={`w-full mt-4 py-4 rounded-xl font-black uppercase text-[10px] tracking-[0.15em] text-white transition-all shadow-md ${
                                    statusMsg.type === 'error' 
                                        ? 'bg-red-600 hover:bg-red-700' 
                                        : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                            >
                                Acknowledge Operations
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}