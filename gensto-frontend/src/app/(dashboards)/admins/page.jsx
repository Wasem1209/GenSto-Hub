"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// Using REST_API directly to construct endpoints
import { REST_API } from '../../constant';
import {
    Users, Briefcase, Award,
    Loader2, ClipboardList, TrendingUp,
    ShieldAlert, UserPlus, UserMinus, ShieldCheck,
    MousePointer2, Clock, MessageSquare, GraduationCap
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
                // Constructing the oversight endpoint manually to avoid missing export errors
                const response = await fetch(`${REST_API}/admin/oversight-stats`);
                const result = await response.json();
                if (result.success) {
                    setDashboardData(result.data);
                }
            } catch (error) {
                console.error("Dashboard API Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    const navigateTo = (path) => router.push(`/admins/${path}`);

    const mainStats = [
        { label: "Worker Pulse", value: dashboardData?.mainStats?.workers || "0", icon: Briefcase, color: "text-blue-600", bg: "bg-blue-50", desc: "Active Staff", path: "monitor-workers" },
        { label: "User Monitor", value: dashboardData?.mainStats?.users || "0", icon: Users, color: "text-emerald-600", bg: "bg-emerald-50", desc: "Total Accounts", path: "monitor-users" },
        { label: "Visitor Rate", value: `${dashboardData?.mainStats?.visitorRate || "0"}%`, icon: MousePointer2, color: "text-orange-600", bg: "bg-orange-50", desc: "Daily Traffic Change", path: "analysis" },
        { label: "Instructors", value: dashboardData?.mainStats?.instructors || "0", icon: Award, color: "text-purple-600", bg: "bg-purple-50", desc: "Faculty Load", path: "monitor-instructors" },
    ];

    const authorityActions = [
        { label: "Promote User", desc: "Grant Worker/Instructor Access", icon: UserPlus, color: "text-blue-700", bg: "bg-blue-100", path: "manage-users?action=promote" },
        { label: "Depromote", desc: "Revoke Dashboard Access", icon: UserMinus, color: "text-red-700", bg: "bg-red-100", path: "manage-users?action=demote" },
        { label: "Role Audit", desc: "Review User Permissions", icon: ShieldCheck, color: "text-emerald-700", bg: "bg-emerald-100", path: "role-audit" },
        { label: "Admin Logs", desc: "Recent Authority Changes", icon: ShieldAlert, color: "text-amber-700", bg: "bg-amber-100", path: "authority-logs" },
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
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">System Control Unit</h1>
                    <p className="text-gray-500 font-medium">Administrator Command Center | Welcome, Wasem</p>
                </div>
                {loading && <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />}
            </div>

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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-blue-500" /> Avg Session Time
                    </h2>
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
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-emerald-500" /> Worker Responses
                    </h2>
                    <div className="flex items-end gap-2">
                        <p className="text-3xl font-black text-gray-900">{dashboardData?.oversight?.workerResponses || "0"}</p>
                        <p className="text-xs text-gray-400 mb-2 font-bold uppercase tracking-widest">Pending</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-purple-500" /> Pending Admissions
                    </h2>
                    <div className="flex items-end gap-2">
                        <p className="text-3xl font-black text-gray-900">{dashboardData?.oversight?.pendingEnrollments || "0"}</p>
                        <p className="text-xs text-gray-400 mb-2 font-bold uppercase tracking-widest">Requests</p>
                    </div>
                </div>
            </div>

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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                        <h2 className="font-bold text-gray-800 flex items-center gap-2"><ClipboardList className="w-5 h-5 text-blue-500" /> Activity Stream</h2>
                        <button onClick={() => navigateTo('logs')} className="text-xs text-blue-600 font-bold hover:underline tracking-widest">FULL REPORT</button>
                    </div>
                    <div className="p-20 text-center text-gray-400 italic font-medium">Monitoring staff performance and student engagement...</div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-blue-500" /> Ecosystem Growth
                    </h2>
                    <div className="h-48 w-full">
                        {growthChartData.length > 0 ? (
                            <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
                        ) : (
                            <div className="h-full bg-gray-50 rounded-xl flex items-center justify-center border-2 border-dashed">No Growth Data</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}