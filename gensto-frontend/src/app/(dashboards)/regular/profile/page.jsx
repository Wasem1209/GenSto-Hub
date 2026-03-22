'use client';

import React from 'react';
import {
    User, Mail, FileText, Calendar,
    ShieldCheck, Award, MapPin, ExternalLink
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

export default function ProfilePage() {
    const { user } = useAuth();

    // Mock data for extended fields - usually coming from your DB via the user object
    const profileData = {
        joinedDate: "October 2025",
        status: "Active Member",
        location: "Lagos, Nigeria",
        role: "Regular User"
    };

    return (
        <div className="p-6 lg:p-10 max-w-4xl mx-auto animate-in fade-in duration-700">

            {/* Profile Header / Identity Card */}
            <div className="relative overflow-hidden bg-[#1A1D21] border border-slate-800 rounded-[3rem] p-8 md:p-12 mb-8 shadow-2xl">
                {/* Background Decorative Element */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] -z-10" />

                <div className="flex flex-col md:flex-row items-center gap-10">
                    {/* Avatar Area */}
                    <div className="relative">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-[3rem] bg-gradient-to-tr from-blue-600 to-indigo-600 p-1 shadow-xl shadow-blue-900/20">
                            <div className="w-full h-full rounded-[2.8rem] bg-[#0F1113] flex items-center justify-center overflow-hidden">
                                <User size={64} className="text-slate-700" />
                            </div>
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-green-500 p-2 rounded-2xl border-4 border-[#1A1D21] text-white">
                            <ShieldCheck size={20} />
                        </div>
                    </div>

                    {/* Core Info */}
                    <div className="text-center md:text-left space-y-4 flex-1">
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">Verified Profile</p>
                            <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
                                {user?.name || 'Inanst User'}
                            </h1>
                        </div>

                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            <div className="flex items-center gap-2 px-4 py-2 bg-[#0F1113] border border-slate-800 rounded-xl">
                                <Mail size={14} className="text-slate-500" />
                                <span className="text-xs text-slate-300 font-medium">{user?.email}</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-[#0F1113] border border-slate-800 rounded-xl">
                                <Calendar size={14} className="text-slate-500" />
                                <span className="text-xs text-slate-300 font-medium">Joined {profileData.joinedDate}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* About / Bio - Spans 2 columns */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-[#1A1D21] border border-slate-800 rounded-[2.5rem] p-8 space-y-6 min-h-[250px]">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
                                <FileText size={16} className="text-blue-500" /> Professional Bio
                            </h3>
                            <Award size={18} className="text-slate-700" />
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed font-medium italic">
                            "{user?.bio || 'No professional bio provided yet. You can update this in the settings page to showcase your expertise within the hub.'}"
                        </p>
                    </div>
                </div>

                {/* Status & Location Sidebar */}
                <div className="space-y-6">
                    <div className="bg-[#1A1D21] border border-slate-800 rounded-[2.5rem] p-8 space-y-8">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Account Status</p>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <p className="text-sm font-bold text-white uppercase">{profileData.status}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Hub Location</p>
                                <div className="flex items-center gap-2 text-slate-300">
                                    <MapPin size={16} className="text-blue-500" />
                                    <p className="text-sm font-bold">{profileData.location}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Assigned Role</p>
                                <p className="text-sm font-bold text-white uppercase bg-blue-600/10 text-blue-500 px-3 py-1 rounded-lg border border-blue-500/10 inline-block">
                                    {role || 'Hub Member'}
                                </p>
                            </div>
                        </div>

                        <hr className="border-slate-800" />

                        <div className="pt-2">
                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-relaxed">
                                To modify these credentials, please visit the account settings or contact an administrator.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}