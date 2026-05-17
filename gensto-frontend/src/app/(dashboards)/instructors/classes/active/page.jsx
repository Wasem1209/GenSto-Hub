'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Radio, Video, User, Clock, Loader2, Play, AlertCircle } from 'lucide-react';
import { REST_API } from '../../../constant';

export default function ActiveClassesPage() {
    const router = useRouter();
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchActiveRooms = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Authentication token missing. Please sign in again.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${REST_API}/api/live/active-rooms`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const result = await response.json();

                if (result.success) {
                    setRooms(result.data || []);
                } else {
                    throw new Error(result.message || 'Failed to fetch active workspaces.');
                }
            } catch (err) {
                console.error('Fetch Active Rooms Error:', err);
                setError(err instanceof Error ? err.message : 'Could not synchronize active stream pipelines.');
            } finally {
                setLoading(false);
            }
        };

        fetchActiveRooms();
    }, []);

    const handleJoinAsInstructor = (roomId, courseId) => {
        // Direct routing connection link for instructor streaming orchestration
        router.push(`/regular/learning-room/${roomId}?course_id=${courseId}&role=instructor`);
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[500px] gap-4 font-sans">
                <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Polling Live Operations...</p>
            </div>
        );
    }

    return (
        <div className="p-6 lg:p-10 max-w-7xl mx-auto animate-in fade-in duration-500 font-sans">
            {/* Header section matching INANST standards */}
            <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-xl border border-emerald-500/10 animate-pulse">
                            <Radio size={18} />
                        </div>
                        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Live Operations</span>
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">Active Classes</h1>
                    <p className="text-gray-500 text-sm mt-1">Orchestrate and broadcast real-time data to connected student nodes.</p>
                </div>
                <div className="bg-slate-100 border border-slate-200 px-4 py-2.5 rounded-2xl flex items-center gap-2 self-start sm:self-center">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-[10px] font-black uppercase text-slate-600 tracking-wider">
                        {rooms.length} Channels Operational
                    </span>
                </div>
            </div>

            {error ? (
                <div className="flex items-center gap-3 p-5 rounded-2xl bg-red-50 border border-red-100 text-red-600 max-w-2xl">
                    <AlertCircle size={20} className="shrink-0" />
                    <p className="text-xs font-bold uppercase tracking-wider leading-relaxed">{error}</p>
                </div>
            ) : rooms.length === 0 ? (
                <div className="bg-white border border-gray-100 rounded-[2.5rem] p-12 text-center shadow-sm max-w-3xl mx-auto space-y-4">
                    <div className="p-4 bg-slate-50 text-slate-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                        <Video size={28} />
                    </div>
                    <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">No Active Pipelines Found</h3>
                    <p className="text-gray-500 text-sm max-w-md mx-auto">
                        There are currently no live room containers deployed. Head over to the Schedule Class hub to spin up new infrastructure.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rooms.map((room) => (
                        <div
                            key={room.roomId}
                            className="bg-white border border-gray-100 rounded-[2.5rem] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group"
                        >
                            <span className="absolute top-6 right-6 bg-rose-500 text-white font-black text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-bl-xl rounded-tr-xl rounded-tl-sm rounded-br-sm shadow-sm">
                                Live Now
                            </span>

                            <div className="space-y-4">
                                <div>
                                    <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100/50">
                                        {room.category?.replace(/_/g, ' ')}
                                    </span>
                                    <h3 className="text-xl font-black text-gray-900 mt-3 tracking-tight leading-snug group-hover:text-blue-600 transition-colors">
                                        {room.title}
                                    </h3>
                                </div>

                                <div className="space-y-2.5 pt-2">
                                    <div className="flex items-center gap-2 text-slate-500">
                                        <User size={14} className="text-slate-400" />
                                        <span className="text-xs font-bold text-slate-600">{room.instructorName}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-500">
                                        <Clock size={14} className="text-slate-400" />
                                        <span className="text-xs font-mono font-bold text-slate-600">00:00:00</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between gap-4">
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Workspace ID</span>
                                    <span className="text-xs font-mono font-bold text-slate-700">{room.courseId}</span>
                                </div>
                                <button
                                    onClick={() => handleJoinAsInstructor(room.roomId, room.courseId)}
                                    className="bg-slate-900 hover:bg-blue-600 text-white px-5 py-3 rounded-xl font-black uppercase text-[9px] tracking-[0.15em] transition-all flex items-center gap-2 shadow-sm"
                                >
                                    <Play size={10} fill="currentColor" /> Start Broadcast Room
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}