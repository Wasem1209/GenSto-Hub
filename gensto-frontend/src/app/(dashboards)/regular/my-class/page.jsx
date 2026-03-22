'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Video, PlayCircle, Calendar, Clock,
    ArrowRight, Monitor, Loader2, X,
    Wifi, ShieldCheck, User, KeyRound
} from 'lucide-react';

// --- SUB-COMPONENT: COUNTDOWN TIMER ---
const CountdownTimer = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const timer = setInterval(() => {
            const difference = new Date(targetDate) - new Date();
            if (difference <= 0) {
                clearInterval(timer);
                return;
            }
            setTimeLeft({
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <span className="font-mono tabular-nums">
            {String(timeLeft.hours).padStart(2, '0')}:
            {String(timeLeft.minutes).padStart(2, '0')}:
            {String(timeLeft.seconds).padStart(2, '0')}
        </span>
    );
};

export default function MyClassPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [verifyingClass, setVerifyingClass] = useState(null); // Course ID Gate
    const [courseId, setCourseId] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 800));
                const mockData = {
                    enrolled: true,
                    scheduled: [
                        {
                            id: 'cls_001',
                            title: 'Advanced React Patterns & Hooks',
                            instructor: 'Dr. Sarah Jenkins',
                            startTime: '2026-03-21T18:00:00Z',
                            isLive: true,
                            school: 'School of Frontend Web'
                        },
                        {
                            id: 'cls_002',
                            title: 'Database Schema Design',
                            instructor: 'Engr. Alex Rivera',
                            startTime: '2026-03-22T10:00:00Z',
                            isLive: false,
                            school: 'School of Backend Web'
                        }
                    ],
                    recorded: [
                        { id: 'rec_01', title: 'Introduction to TypeScript', duration: '1h 20m', school: 'School of Software Engineering', videoUrl: 'https://vimeo.com/example1' },
                        { id: 'rec_02', title: 'Tailwind CSS Mastery', duration: '45m', school: 'School of Frontend Web', videoUrl: 'https://vimeo.com/example2' }
                    ]
                };
                setData(mockData);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return (
        <div className="flex h-[60vh] items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-slate-300" />
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-12 animate-in fade-in duration-700">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 px-2 py-1 bg-green-50 text-green-700 rounded-md border border-green-100">
                        <Wifi size={12} className="animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-tighter">Live Operations</span>
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">My Classes</h1>
                </div>
            </div>

            {/* Scheduled Section */}
            <section className="space-y-6">
                <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-slate-400" />
                    <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Scheduled Sessions</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {data?.scheduled.map((cls) => (
                        <div key={cls.id} className="relative group bg-white border border-gray-100 rounded-[2rem] p-6 transition-all hover:shadow-xl hover:shadow-slate-100 overflow-hidden">
                            {cls.isLive && <div className="absolute top-0 right-0 bg-red-500 text-white px-4 py-1 text-[10px] font-black uppercase rounded-bl-xl animate-pulse">Live Now</div>}

                            <div className="p-3 bg-slate-50 rounded-2xl w-fit mb-4 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                                <Video size={24} />
                            </div>

                            <div className="space-y-1 mb-6">
                                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{cls.school}</p>
                                <h3 className="text-lg font-black text-gray-900 leading-tight">{cls.title}</h3>
                                <div className="flex flex-wrap items-center gap-4 pt-2">
                                    <div className="flex items-center gap-1 text-gray-500 text-xs">
                                        <User size={14} /> <span>{cls.instructor}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-500 text-xs font-bold bg-slate-100 px-2 py-1 rounded-lg">
                                        <Clock size={14} className="text-blue-500" />
                                        <CountdownTimer targetDate={cls.startTime} />
                                    </div>
                                </div>
                            </div>

                            {cls.isLive ? (
                                <button
                                    onClick={() => setVerifyingClass(cls)}
                                    className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-2xl text-sm font-black hover:bg-blue-600 transition-all shadow-lg shadow-slate-200"
                                >
                                    Join Learning Room
                                    <ArrowRight size={16} />
                                </button>
                            ) : (
                                <button disabled className="w-full py-4 rounded-2xl text-sm font-black bg-gray-50 text-gray-400 border border-gray-100 cursor-not-allowed">
                                    Starts in <CountdownTimer targetDate={cls.startTime} />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Recorded Classes Section */}
            <section className="space-y-6 pt-6">
                <div className="flex items-center gap-2">
                    <PlayCircle size={18} className="text-slate-400" />
                    <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Recent Recordings</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data?.recorded.map((rec) => (
                        <div
                            key={rec.id}
                            onClick={() => setSelectedVideo(rec)}
                            className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-2xl hover:border-slate-300 transition-all cursor-pointer group"
                        >
                            <div className="w-12 h-12 shrink-0 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors">
                                <PlayCircle size={24} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[9px] font-black text-blue-500 uppercase tracking-tighter mb-0.5">{rec.school}</p>
                                <h4 className="text-sm font-bold text-gray-800 truncate">{rec.title}</h4>
                                <p className="text-[10px] text-gray-400 font-medium">{rec.duration}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- COURSE ID VERIFICATION MODAL --- */}
            {verifyingClass && (
                <div className="fixed inset-0 z-[110] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 space-y-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
                        <button onClick={() => setVerifyingClass(null)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900">
                            <X size={24} />
                        </button>
                        <div className="text-center space-y-2">
                            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <KeyRound size={32} />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Enrollment Required</h3>
                            <p className="text-sm text-gray-500">Please enter your <b>Course ID</b> to join the live session for {verifyingClass.title}.</p>
                        </div>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Enter Course ID"
                                value={courseId}
                                onChange={(e) => setCourseId(e.target.value)}
                                className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-600 focus:bg-white outline-none transition-all font-bold text-center"
                            />
                            <Link
                                href={`/regular/learning-room/${verifyingClass.id}?course_id=${courseId}`}
                                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-2xl font-black hover:bg-slate-900 transition-all"
                            >
                                Verify & Join Room
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* --- RESPONSIVE REPLAY MODAL --- */}
            {selectedVideo && (
                <div className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8">
                    <div className="bg-white w-full max-w-5xl max-h-[90vh] rounded-[2.5rem] overflow-hidden relative shadow-2xl flex flex-col">
                        <button
                            onClick={() => setSelectedVideo(null)}
                            className="absolute top-6 right-6 z-10 p-2 bg-slate-100 rounded-full hover:bg-red-50 text-slate-500 transition-colors shadow-sm"
                        >
                            <X size={20} />
                        </button>

                        <div className="w-full aspect-video bg-black flex items-center justify-center shrink-0">
                            <div className="text-center">
                                <Monitor className="mx-auto text-slate-700 mb-2" size={48} />
                                <span className="text-gray-500 font-mono text-[10px] uppercase tracking-widest italic block px-4">
                                    Streaming: {selectedVideo.videoUrl}
                                </span>
                            </div>
                        </div>

                        <div className="p-8 sm:p-12 overflow-y-auto">
                            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase rounded-full tracking-widest">
                                {selectedVideo.school}
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-4 leading-tight">
                                {selectedVideo.title}
                            </h2>
                            <div className="flex items-center gap-4 mt-6 text-gray-400">
                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-tighter">
                                    <ShieldCheck size={16} className="text-blue-500" />
                                    Inanst ID: IN-2026-AUTH
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Verified Footer */}
            <div className="bg-slate-900 rounded-[2rem] p-6 flex flex-col md:flex-row items-center justify-between gap-4 text-white">
                <div className="flex items-center gap-3">
                    <ShieldCheck size={20} className="text-blue-400" />
                    <p className="text-[10px] uppercase tracking-widest font-bold">Authorized Session Access Only</p>
                </div>
                <p className="text-[10px] text-slate-500 font-black tracking-tighter uppercase italic">Protected by Inanst Security</p>
            </div>
        </div>
    );
}