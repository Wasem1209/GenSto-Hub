"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { REST_API } from '../../constant';
import {
    Users, Briefcase, Award, Loader2, ClipboardList, TrendingUp,
    ShieldAlert, UserPlus, UserMinus, ShieldCheck,
    MousePointer2, Clock, MessageSquare, GraduationCap,
    Mail, Contact, Handshake, Radio, Share2, MessageCircle,
    Trash2, ListTodo
} from 'lucide-react';

import {
    Chart as ChartJS, CategoryScale, LinearScale,
    PointElement, LineElement, Title, Tooltip,
    Filler, Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale, LinearScale, PointElement,
    LineElement, Title, Tooltip, Filler, Legend
);

export default function AdminDashboard() {
    const router = useRouter();
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Get the token from storage (standard for MERN apps)
                const token = localStorage.getItem('token');

                const response = await fetch(`${REST_API}/v1/admin/oversight-stats`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // This fixes the 401 Error
                    }
                });

                const result = await response.json();

                if (result.success) {
                    setDashboardData(result.data);
                } else {
                    console.error("Dashboard error:", result.message);
                    // Optional: if (response.status === 401) router.push('/login');
                }
            } catch (error) {
                console.error("Dashboard API Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, [router]);

    const navigateTo = (path) => router.push(`/admins/${path}`);

    // --- The rest of your code remains the same ---
    const mainStats = [
        { label: "Worker Pulse", value: dashboardData?.mainStats?.workers || "0", icon: Briefcase, color: "text-blue-600", bg: "bg-blue-50", desc: "Active Staff", path: "monitor-workers" },
        { label: "User Monitor", value: dashboardData?.mainStats?.users || "0", icon: Users, color: "text-emerald-600", bg: "bg-emerald-50", desc: "Total Accounts", path: "monitor-users" },
        { label: "Visitor Rate", value: `${dashboardData?.mainStats?.visitorRate || "0"}%`, icon: MousePointer2, color: "text-orange-600", bg: "bg-orange-50", desc: "Daily Traffic Change", path: "analysis" },
        { label: "Instructors", value: dashboardData?.mainStats?.instructors || "0", icon: Award, color: "text-purple-600", bg: "bg-purple-50", desc: "Faculty Load", path: "monitor-instructors" },
    ];

    const authorityActions = [
        { label: "Promote User", desc: "Grant Access", icon: UserPlus, color: "text-blue-700", bg: "bg-blue-100", path: "manage-users?action=promote" },
        { label: "Role Audit", desc: "Review Permissions", icon: ShieldCheck, color: "text-emerald-700", bg: "bg-emerald-100", path: "role-audit" },
        { label: "Task Center", desc: "Assign Duties", icon: ListTodo, color: "text-indigo-700", bg: "bg-indigo-100", path: "tasks" },
        { label: "Delete User", desc: "Remove Account", icon: Trash2, color: "text-red-700", bg: "bg-red-100", path: "manage-users?action=delete" },
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

    const getSessionTime = (roleName) => {
        const stats = dashboardData?.oversight?.avgEngagement?.find(r => r._id === roleName);
        return stats ? `${Math.round(stats.avgSessionDuration || 0)} mins` : "0 mins";
    };

    const growthChartData = dashboardData?.growthChart || [];
    const chartData = {
        labels: growthChartData.map(day => day.label),
        datasets: [{
            fill: true,
            label: 'System Growth',
            data: growthChartData.map(day => day.value),
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            pointRadius: 4,
            borderWidth: 2,
        }],
    };

    return (
        <div className="p-8 space-y-8 min-h-screen bg-gray-50">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">System Control Unit</h1>
                    <p className="text-gray-500 font-medium">Administrator Command Center | Welcome, Philip</p>
                </div>
                {loading && (
                    <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
                        <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                        <span className="text-xs font-bold text-blue-600">Syncing with DB...</span>
                    </div>
                )}
            </div>

            {/*  Main Oversight Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mainStats.map((stat, i) => (
                    <div key={i} onClick={() => navigateTo(stat.path)} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                        <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
                        <p className="text-2xl font-black text-gray-900">{loading ? "..." : stat.value}</p>
                        <p className="text-[10px] text-gray-400 uppercase mt-1 font-bold">{stat.desc}</p>
                    </div>
                ))}
            </div>

            {/*  Engagement & Growth */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                    <h2 className="font-bold text-gray-800 flex items-center gap-2"><Clock className="w-5 h-5 text-blue-500" /> Avg Session Time</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500 font-medium">Workers:</span>
                            <span className="font-bold text-blue-600">{loading ? "..." : getSessionTime('worker')}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500 font-medium">Instructors:</span>
                            <span className="font-bold text-purple-600">{loading ? "..." : getSessionTime('instructor')}</span>
                        </div>
                    </div>
                    <hr className="border-gray-50" />
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-gray-800">Pending Admissions</span>
                        <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-black">
                            {loading ? "..." : (dashboardData?.oversight?.pendingEnrollments || "0")}
                        </span>
                    </div>
                </div>

                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-blue-500" /> Ecosystem Growth</h2>
                    <div className="h-48 w-full">
                        {growthChartData.length > 0 ? (
                            <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
                        ) : (
                            <div className="h-full bg-gray-50 rounded-xl flex items-center justify-center border-2 border-dashed">
                                <span className="text-gray-400 text-sm font-bold">Waiting for Growth Data...</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Middle Section: Authority Management */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h2 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-blue-600" /> User Authority Management
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {authorityActions.map((action, i) => (
                        <div key={i} onClick={() => navigateTo(action.path)} className={`${action.bg} p-5 rounded-xl cursor-pointer hover:shadow-inner transition-all border border-transparent hover:border-white/20 group`}>
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                                    <action.icon className={`w-6 h-6 ${action.color}`} />
                                </div>
                                <div>
                                    <p className="text-sm font-black text-gray-800">{action.label}</p>
                                    <p className="text-[10px] font-bold text-gray-500 uppercase">{action.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Row: Operational Control Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {operationalCards.map((card, i) => (
                    <div key={i} onClick={() => navigateTo(card.path)} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-blue-300 transition-all cursor-pointer group">
                        <div className={`w-9 h-9 rounded-lg ${card.bg} flex items-center justify-center mb-3`}>
                            <card.icon className={`w-5 h-5 ${card.color}`} />
                        </div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-tighter">{card.label}</h3>
                        <p className="text-xl font-black text-gray-800">{loading ? "..." : card.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}