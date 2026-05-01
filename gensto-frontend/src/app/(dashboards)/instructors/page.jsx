'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    School, Users, Calendar, FileText,
    ClipboardList, TrendingUp, PlayCircle,
    Layers, Loader2
} from 'lucide-react';
// Only importing REST_API as requested
import { REST_API } from '../../constant';

export default function InstructorPage() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInstructorData = async () => {
            try {
                // Using the exact string pattern from your API_ROUTES file
                const response = await fetch(`${REST_API}/v1/instructor/dashboard`);
                const data = await response.json();
                if (data.success) {
                    setStats(data.data);
                }
            } catch (error) {
                console.error("API Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchInstructorData();
    }, []);

    const menuCards = [
        { label: 'Number of schools', value: stats?.schoolCount || 0, icon: School, href: '/schools', color: 'text-blue-600 bg-blue-50' },
        { label: 'Number of Students', value: stats?.studentCount || 0, icon: Users, href: '/students', color: 'text-indigo-600 bg-indigo-50' },
        { label: 'Schedule Class', value: 'Plan', icon: Calendar, href: '/schedule', color: 'text-purple-600 bg-purple-50' },
        { label: 'Assignment', value: 'Create', icon: FileText, href: '/assignments/create', color: 'text-amber-600 bg-amber-50' },
        { label: 'View Assignment', value: 'Review', icon: ClipboardList, href: '/assignments', color: 'text-emerald-600 bg-emerald-50' },
        { label: 'Student progress', value: 'Analytics', icon: TrendingUp, href: '/progress', color: 'text-rose-600 bg-rose-50' },
        { label: 'Active class', value: stats?.activeClasses || 0, icon: PlayCircle, href: '/classes/active', color: 'text-cyan-600 bg-cyan-50' },
        { label: 'Active Cohort', value: stats?.activeCohorts || 0, icon: Layers, href: '/cohorts', color: 'text-orange-600 bg-orange-50' },
    ];

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Loading Faculty Suite...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 p-6">
            <header>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">Faculty Suite</h1>
                <p className="text-gray-500 font-medium">Manage your academic delivery and student engagement.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {menuCards.map((card, i) => (
                    <Link
                        key={i}
                        href={card.href}
                        className="group bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all flex items-center gap-4"
                    >
                        <div className={`p-4 rounded-2xl ${card.color} group-hover:scale-110 transition-transform`}>
                            <card.icon size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{card.label}</p>
                            <h4 className="text-xl font-black text-gray-900">{card.value}</h4>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}