"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { REST_API } from '../../constant';
import {
    Users, CreditCard, MessageSquare, PlayCircle,
    ClipboardList, TrendingUp, Mail, Contact,
    Briefcase, Handshake, BarChart3, Radio,
    Share2, Award, MessageCircle, Loader2
} from 'lucide-react';

export default function WorkerPage() {
    const router = useRouter();
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // LOGIC UPDATE: Pointing to the correct backend route
                const response = await fetch(`${REST_API}/v1/stats/dashboard`);
                const result = await response.json();
                if (result.success) {
                    setDashboardData(result.data);
                }
            } catch (error) {
                console.error("Hi Wasem, API Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    const navigateTo = (path) => router.push(`/worker/${path}`);

    // LOGIC UPDATE: Map growthData to chart values if it exists
    const growthChart = dashboardData?.growthChart || [];

    const mainStats = [
        { label: "Enrollments", value: dashboardData?.mainStats?.enrollments || "0", icon: Users, color: "text-blue-600", bg: "bg-blue-50", desc: "Pending review", path: "enrollments" },
        { label: "Payments", value: dashboardData?.mainStats?.payments || "0", icon: CreditCard, color: "text-amber-600", bg: "bg-amber-50", desc: "Unverified transfers", path: "payments" },
        { label: "Supports", value: dashboardData?.mainStats?.supports || "0", icon: MessageSquare, color: "text-purple-600", bg: "bg-purple-50", desc: "Open tickets", path: "supports" },
        { label: "Live Now", value: dashboardData?.mainStats?.live || "0", icon: PlayCircle, color: "text-emerald-600", bg: "bg-emerald-50", desc: "Active sessions", path: "live-sessions" },
    ];

    const operationalCards = [
        { label: "Newsletter", value: dashboardData?.operational?.newsletter?.toLocaleString() || "0", icon: Mail, color: "text-pink-600", bg: "bg-pink-50", path: "newsletter" },
        { label: "Contacts Mgmt", value: dashboardData?.operational?.contacts || "0", icon: Contact, color: "text-cyan-600", bg: "bg-cyan-50", path: "contacts" },
        { label: "Internships", value: dashboardData?.operational?.internships || "0", icon: Briefcase, color: "text-orange-600", bg: "bg-orange-50", path: "internships" },
        { label: "Partnerships", value: dashboardData?.operational?.partnerships || "0", icon: Handshake, color: "text-indigo-600", bg: "bg-indigo-50", path: "partnerships" },
        { label: "BroadCast", value: "Active", icon: Radio, color: "text-red-600", bg: "bg-red-50", path: "broadcast" },
        { label: "Collaboration", value: dashboardData?.operational?.collabs || "0", icon: Share2, color: "text-teal-600", bg: "bg-teal-50", path: "collaboration" },
        { label: "Cert. Exams", value: dashboardData?.operational?.exams || "0", icon: Award, color: "text-violet-600", bg: "bg-violet-50", path: "certificates" },
        { label: "Post Comments", value: dashboardData?.operational?.comments || "0", icon: MessageCircle, color: "text-sky-600", bg: "bg-sky-50", path: "comments" },
    ];

    return (
        <div className="p-8 space-y-8 min-h-screen bg-gray-50 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex justify-between items-center slide-in-from-top-4 animate-in duration-500 fill-mode-both">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Operations Control</h1>
                    <p className="text-gray-500 font-medium">Welcome back, Wasem</p>
                </div>
                {loading && <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />}
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mainStats.map((stat, i) => (
                    <div
                        key={i}
                        onClick={() => navigateTo(stat.path)}
                        className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group"
                    >
                        <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
                        {loading ? (
                            <div className="h-8 w-16 bg-gray-200 animate-pulse rounded mt-1"></div>
                        ) : (
                            <p className="text-2xl font-black text-gray-900">{stat.value}</p>
                        )}
                        <p className="text-[10px] text-gray-400 uppercase mt-1 font-bold">{stat.desc}</p>
                    </div>
                ))}
            </div>

            {/* Table & Growth */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                        <h2 className="font-bold text-gray-800 flex items-center gap-2"><ClipboardList className="w-5 h-5 text-blue-500" /> Recent Enrollments</h2>
                        <button onClick={() => navigateTo('enrollments')} className="text-xs text-blue-600 font-bold hover:underline">VIEW ALL</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-400 uppercase text-[10px] font-black">
                                <tr>
                                    <th className="px-6 py-4">Student</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {loading ? (
                                    <tr><td colSpan="3" className="p-10 text-center text-gray-400">Loading records...</td></tr>
                                ) : (
                                    dashboardData?.recentEnrollments?.map((enrollment) => (
                                        <tr key={enrollment._id} className="hover:bg-gray-50/50">
                                            <td className="px-6 py-4 font-semibold">{enrollment.studentName}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded text-[10px] font-bold ${enrollment.status === 'paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                                    {(enrollment.status || 'pending').toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-emerald-600 font-bold hover:text-emerald-700 uppercase tracking-wider text-xs">Manage</button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                    <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-left"><TrendingUp className="w-5 h-5 text-emerald-500" /> User Growth</h2>
                    <div className="h-48 bg-gray-50 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-gray-100">
                        {growthChart.length > 0 ? (
                            <div className="flex items-end gap-2 w-full px-4 h-32">
                                {growthChart.map((day, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                        <div
                                            className="w-full bg-emerald-500 rounded-t-sm transition-all"
                                            style={{ height: `${Math.max((day.value / 10) * 100, 10)}%` }}
                                        ></div>
                                        <span className="text-[8px] text-gray-400 font-bold">{day.label}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <>
                                <BarChart3 className="w-8 h-8 text-gray-200 mb-2" />
                                <p className="text-[10px] text-gray-400 font-bold uppercase">Growth Analytics Data Ready</p>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Operational Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
                {operationalCards.map((card, i) => (
                    <div key={i} onClick={() => navigateTo(card.path)} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-blue-200 transition-all cursor-pointer group">
                        <div className={`w-9 h-9 rounded-lg ${card.bg} flex items-center justify-center mb-3`}>
                            <card.icon className={`w-5 h-5 ${card.color}`} />
                        </div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-tighter">{card.label}</h3>
                        {loading ? (
                            <div className="h-6 w-12 bg-gray-100 animate-pulse rounded mt-1"></div>
                        ) : (
                            <p className="text-xl font-black text-gray-800">{card.value}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}