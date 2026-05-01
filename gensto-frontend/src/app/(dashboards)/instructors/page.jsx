'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    School,
    Users,
    Calendar,
    FileText,
    Eye,
    TrendingUp,
    Loader2
} from 'lucide-react';
import { REST_API } from '../../constant';

export default function InstructorPage() {
    const [stats, setStats] = useState({
        schools: 0,
        students: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInstructorData = async () => {
            try {
                // Fetching from the endpoint established in your constants
                const response = await fetch(`${REST_API}/v1/instructor/stats`);
                const data = await response.json();
                if (data.success) {
                    setStats({
                        schools: data.data.schoolCount,
                        students: data.data.studentCount,
                    });
                }
            } catch (error) {
                console.error("Failed to fetch instructor stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInstructorData();
    }, []);

    const instructorCards = [
        {
            label: 'Number of Schools',
            value: stats.schools,
            icon: School,
            href: '/instructors/schools',
            color: 'text-blue-600 bg-blue-50'
        },
        {
            label: 'Number of Students',
            value: stats.students,
            icon: Users,
            href: '/instructors/students',
            color: 'text-indigo-600 bg-indigo-50'
        },
        {
            label: 'Schedule Class',
            value: 'Manage',
            icon: Calendar,
            href: '/instructors/schedule',
            color: 'text-emerald-600 bg-emerald-50'
        },
        {
            label: 'Assignment',
            value: 'Create',
            icon: FileText,
            href: '/instructors/assignments/create',
            color: 'text-amber-600 bg-amber-50'
        },
        {
            label: 'View Assignment',
            value: 'Review',
            icon: Eye,
            href: '/instructors/assignments/view',
            color: 'text-purple-600 bg-purple-50'
        },
        {
            label: 'Student Progress',
            value: 'Analytics',
            icon: TrendingUp,
            href: '/instructors/progress',
            color: 'text-rose-600 bg-rose-50'
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans">
            <div className="max-w-6xl mx-auto">
                <header className="mb-10">
                    <h1 className="text-4xl font-black text-[#1a1f2e] tracking-tight">Faculty Suite</h1>
                    <p className="text-gray-500 font-medium mt-1">Manage your academic oversight and student engagement.</p>
                </header>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Syncing Faculty Data...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {instructorCards.map((card, i) => (
                            <Link
                                key={i}
                                href={card.href}
                                className="group bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all flex items-center gap-6"
                            >
                                <div className={`p-4 rounded-2xl ${card.color} group-hover:scale-110 transition-transform`}>
                                    <card.icon size={28} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] mb-1">
                                        {card.label}
                                    </p>
                                    <h4 className="text-2xl font-black text-gray-900 leading-none">
                                        {card.value}
                                    </h4>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                <div className="mt-10 bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-black text-[#1a1f2e]">Active Cohorts</h3>
                        <span className="px-4 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                            Live Now
                        </span>
                    </div>
                    <div className="space-y-3">
                        <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
                            <div>
                                <p className="font-bold text-gray-900">Full-Stack Web Dev</p>
                                <p className="text-xs text-gray-500">March 2026 Cohort</p>
                            </div>
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}