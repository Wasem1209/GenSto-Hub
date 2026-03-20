'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Monitor, Server, Layout, Code2, Layers,
  Shield, Database, BarChart3, Plus,
  Loader2, ChevronRight, ShieldCheck,
  Sparkles, User
} from 'lucide-react';

// Exact mapping based on your Edtech department file
const iconMap = {
  'computer-fundamentals': <Monitor className="w-10 h-10 text-blue-600" />,
  'it-infrastructure': <Server className="w-10 h-10 text-indigo-600" />,
  'frontend-web': <Layout className="w-10 h-10 text-green-600" />,
  'backend-web': <Code2 className="w-10 h-10 text-purple-600" />,
  'fullstack-web': <Layers className="w-10 h-10 text-orange-600" />,
  'software-dev': <Code2 className="w-10 h-10 text-red-600" />,
  'cyber-security': <Shield className="w-10 h-10 text-teal-600" />,
  'database': <Database className="w-10 h-10 text-pink-600" />,
  'data-analytics': <BarChart3 className="w-10 h-10 text-yellow-600" />,
};

// API Call: GET /api/v1/user/my-enrollments
const fetchMySchools = async () => {
  await new Promise(resolve => setTimeout(resolve, 1200));

  // Mocking one active enrollment to show the card UI
  return [
    {
      id: 'enr_101',
      title: 'Frontend Web Development School',
      slug: 'frontend-web',
      description: 'Build engaging, responsive, and modern web interfaces.',
      status: 'Active',
      instructor: 'Dr. Sarah Jenkins', // New field from DB
      credentialId: 'IN-2026-AUTH-001'
    }
  ];
};

export default function MySchoolPage() {
  const [enrolledSchools, setEnrolledSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchMySchools();
        setEnrolledSchools(data);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg border border-blue-100">
            <Sparkles size={14} className="animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Student Portal</span>
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter">My Schools</h1>
          <p className="text-gray-500 text-sm max-w-md">
            Overview of your specialized tracks at <strong>Inanst</strong>.
          </p>
        </div>

        {enrolledSchools.length > 0 && (
          <Link
            href="/regular/school-enrollment"
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
          >
            <Plus size={18} />
            Enroll in Another
          </Link>
        )}
      </div>

      <div className="min-h-[400px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-slate-200 animate-spin" />
          </div>
        ) : enrolledSchools.length === 0 ? (
          /* No Enrolled School State */
          <div className="bg-white border-2 border-dashed border-gray-100 rounded-[3rem] p-16 text-center space-y-8">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
              <Monitor size={40} />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">No Enrolled School</h2>
              <p className="text-gray-500 text-sm max-w-xs mx-auto">
                You are not currently enrolled in any tech schools. Begin your journey today.
              </p>
            </div>
            <Link
              href="/regular/school-enrollment"
              className="school-enrollment-btn inline-flex items-center gap-3 bg-slate-900 text-white px-10 py-4 rounded-full text-sm font-black hover:scale-105 transition-all"
            >
              School Enrollment
              <ChevronRight size={18} />
            </Link>
          </div>
        ) : (
          /* Card UI - Exactly as the Image provided */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {enrolledSchools.map((school) => (
              <div
                key={school.id}
                className="bg-white rounded-[1.5rem] shadow-sm border border-gray-100 p-8 flex flex-col items-center text-center transition-all hover:shadow-md"
              >
                <div className="bg-gray-50 rounded-full p-6 mb-6">
                  {iconMap[school.slug] || <Code2 className="w-10 h-10 text-gray-400" />}
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight">
                  {school.title}
                </h3>

                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                  {school.description}
                </p>

                <div className="w-full pt-4 border-t border-gray-50 flex items-center justify-center gap-2">
                  <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black uppercase rounded-full">
                    {school.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Branding - Instructor & ID Section */}
      <div className="bg-slate-900 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-white shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10">
            <ShieldCheck size={24} className="text-blue-400" />
          </div>
          <div>
            <h4 className="text-sm font-bold">Inanst Verified Student</h4>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">
              Credential ID: IN-2026-AUTH
            </p>
          </div>
        </div>

        {/* Dynamic Instructor Area from DB */}
        {enrolledSchools.length > 0 && (
          <div className="flex items-center gap-3 bg-white/5 px-5 py-3 rounded-2xl border border-white/10">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
              <User size={16} />
            </div>
            <div>
              <p className="text-[9px] text-slate-500 uppercase font-black tracking-tighter">Lead Instructor</p>
              <p className="text-xs font-bold text-slate-200">{enrolledSchools[0].instructor}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}