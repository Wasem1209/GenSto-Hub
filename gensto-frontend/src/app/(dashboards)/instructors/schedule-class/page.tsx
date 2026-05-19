'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Calendar, BookOpen, Loader2, CheckCircle2, AlertTriangle, X, Copy, Check, Clock, User } from 'lucide-react';
import { API_ROUTES } from '../../../constant';

interface SchoolTrack {
    _id: string;
    name: string;
    category: string;
}

export default function ScheduleClassPage() {
    const [saving, setSaving] = useState<boolean>(false);
    const [copied, setCopied] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [statusMsg, setStatusMsg] = useState<{ text: string; type: 'success' | 'error' | '' }>({ text: '', type: '' });
    const [generatedRoomId, setGeneratedRoomId] = useState<string>('');
    
    const [schools, setSchools] = useState<SchoolTrack[]>([]);
    const [loadingSchools, setLoadingSchools] = useState<boolean>(true);
    
    
    const [formData, setFormData] = useState({
        courseTitle: '',
        schoolId: '',      
        schoolCategory: '',
        instructorName: '', 
        scheduledStartTime: '', 
        duration: '60' 
    });

   
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                
                const parsedUser = JSON.parse(jsonPayload);
                console.log("Current Logged-in User Token Payload:", parsedUser);

                // Auto-fill instructor name if present in token profile context
                if (parsedUser.name || parsedUser.firstName) {
                    const fallbackName = parsedUser.name || `${parsedUser.firstName} ${parsedUser.lastName || ''}`;
                    setFormData(prev => ({ ...prev, instructorName: fallbackName.trim() }));
                }
            } catch (e) {
                console.error("Failed to parse auth token for role debugging:", e);
            }
        }
    }, []);

    useEffect(() => {
        const fetchSchools = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(API_ROUTES.LIVE_SCHOOLS, {  
                  method: 'GET',
                  headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                           }
                 });

                if (!response.ok) {
                    throw new Error(`Backend fetch rejected with status: ${response.status}`);
                }

                const result = await response.json();
                
                let fetchedData: SchoolTrack[] = [];
                if (Array.isArray(result)) fetchedData = result;
                else if (result && Array.isArray(result.data)) fetchedData = result.data;
                else if (result && Array.isArray(result.schools)) fetchedData = result.schools;

                if (fetchedData.length > 0) {
                    setSchools(fetchedData);
                    setFormData(prev => ({ 
                        ...prev, 
                        schoolId: fetchedData[0]._id,
                        schoolCategory: fetchedData[0].category 
                    }));
                } else {
                    throw new Error("No departmental schools available in database records.");
                }
            } catch (err) {
                console.warn('Database connection failed, deploying UI fallback records:', err);
                
                const fallbacks: SchoolTrack[] = [
                    { _id: 'fallback-frontend', name: 'School of Frontend Web', category: 'SCHOOL_OF_FRONTEND_WEB' },
                    { _id: 'fallback-backend', name: 'School of Backend Web', category: 'SCHOOL_OF_BACKEND_WEB' },
                    { _id: 'fallback-software', name: 'School of Software Engineering', category: 'SCHOOL_OF_SOFTWARE_ENGINEERING' }
                ];
                setSchools(fallbacks);
                setFormData(prev => ({ 
                    ...prev, 
                    schoolId: fallbacks[0]._id,
                    schoolCategory: fallbacks[0].category 
                }));
            } finally {
                setLoadingSchools(false);
            }
        };

        fetchSchools();
    }, []);

    const handleDropdownChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value;
        const matchingSchool = schools.find(school => school._id === selectedId);

        if (matchingSchool) {
            setFormData(prev => ({
                ...prev,
                schoolId: matchingSchool._id,
                schoolCategory: matchingSchool.category
            }));
        }
    };

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
            console.error('Failed to copy Room ID:', err);
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
            const response = await fetch(API_ROUTES.LIVE_CREATE_ROOM, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                
                body: JSON.stringify({
                    title: formData.courseTitle,
                    schoolId: formData.schoolId, 
                    category: formData.schoolCategory,
                    instructorName: formData.instructorName || 'Lead Instructor',
                    startTime: formData.scheduledStartTime || new Date().toISOString(),
                    durationMinutes: parseInt(formData.duration, 10) || 60
                })
            });

            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error("Access Denied: Your account role does not match the specific permission string required by the backend middleware.");
                }
                if (response.status === 404) {
                    throw new Error(`Endpoint not found (404). Verify that the path configuration matches your server routing maps.`);
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
                
                // Clear state keeping baseline configurations populated
                setFormData(prev => ({ 
                    ...prev,
                    courseTitle: '', 
                    scheduledStartTime: '',
                }));
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
        <div className="p-6 lg:p-10 max-w-4xl mx-auto font-sans relative">
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
                        
                        {/* Session Title */}
                        <div className="space-y-2 md:col-span-2">
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

                        {/* Instructor Identity (New Field) */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2 flex items-center gap-2">
                                <User size={12} /> Hosting Instructor
                            </label>
                            <input 
                                type="text" 
                                name="instructorName"
                                required
                                value={formData.instructorName}
                                onChange={handleInputChange}
                                placeholder="e.g., Engr. Alex Rivera" 
                                className="w-full bg-[#0F1113] border border-slate-800 rounded-2xl p-4 text-white text-sm focus:border-blue-600 outline-none transition-all"
                            />
                        </div>

                        {/* School Dropdown Tracks */}
                        <div className="space-y-2">
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
                                            name="schoolId"
                                            value={formData.schoolId}
                                            onChange={handleDropdownChange}
                                            className="w-full bg-[#0F1113] border border-slate-800 rounded-2xl p-4 text-white text-sm focus:border-blue-600 outline-none transition-all appearance-none cursor-pointer"
                                        >
                                            {schools.map((school) => (
                                                <option key={school._id} value={school._id}>
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

                        {/* Start Date & Time (New Field) */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2 flex items-center gap-2">
                                <Calendar size={12} /> Scheduled Start Date & Time
                            </label>
                            <input 
                                type="datetime-local" 
                                name="scheduledStartTime"
                                required
                                value={formData.scheduledStartTime}
                                onChange={handleInputChange}
                                className="w-full bg-[#0F1113] border border-slate-800 rounded-2xl p-4 text-white text-sm focus:border-blue-600 outline-none transition-all custom-datetime-picker"
                            />
                        </div>

                        {/* Block Duration (New Field) */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2 flex items-center gap-2">
                                <Clock size={12} /> Session Block Duration
                            </label>
                            <select 
                                name="duration"
                                value={formData.duration}
                                onChange={handleInputChange}
                                className="w-full bg-[#0F1113] border border-slate-800 rounded-2xl p-4 text-white text-sm focus:border-blue-600 outline-none transition-all cursor-pointer"
                            >
                                <option value="30">30 Minutes</option>
                                <option value="45">45 Minutes</option>
                                <option value="60">1 Hour</option>
                                <option value="90">1.5 Hours</option>
                                <option value="120">2 Hours</option>
                            </select>
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

            {/* Status Modal Window */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                    <div className="bg-[#1A1D21] border border-slate-800 w-full max-w-md rounded-[2rem] p-6 shadow-2xl relative overflow-hidden" role="dialog" aria-modal="true">
                        <div className={`absolute top-0 inset-x-0 h-1.5 ${statusMsg.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`} />

                        <button onClick={() => setShowModal(false)} className="absolute top-5 right-5 p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all outline-none">
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
                                    <button type="button" onClick={() => copyToClipboard(generatedRoomId)} className="p-2.5 rounded-xl bg-[#1A1D21] border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all flex items-center gap-1.5" title="Copy Stream ID Token">
                                        {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                                        <span className="text-[9px] font-black uppercase tracking-wider hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
                                    </button>
                                </div>
                            )}

                            <button onClick={() => setShowModal(false)} className={`w-full mt-4 py-4 rounded-xl font-black uppercase text-[10px] tracking-[0.15em] text-white transition-all shadow-md ${statusMsg.type === 'error' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
                                Acknowledge Operations
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}