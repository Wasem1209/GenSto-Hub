'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // Import Link for navigation
import { 
  TrendingUp, Award, Clock, AlertCircle,
  CheckCircle2, BarChart3, GraduationCap, ChevronRight
} from 'lucide-react';

interface Milestone {
  id: string;
  task: string;
  completed: boolean;
  grade?: string;
}

interface StudentProgress {
  courseName: string;
  instructorName: string;
  overallPercentage: number;
  lastUpdated: string;
  milestones: Milestone[];
  attendance: number;
}

export default function LearningProgressPage() {
  const [progress, setProgress] = useState<StudentProgress | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProgress = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        // Force null to simulate "Not Enrolled" state
        const isEnrolled = false; 
        if (isEnrolled) {
          setProgress({
            courseName: "Full-Stack MERN Development",
            instructorName: "Dr. Inanst",
            overallPercentage: 68,
            lastUpdated: "March 15, 2026",
            attendance: 92,
            milestones: [
              { id: '1', task: "React Hooks & State Management", completed: true, grade: "A" },
              { id: '2', task: "Node.js Middleware Architecture", completed: true, grade: "B+" },
              { id: '3', task: "Database Indexing & Optimization", completed: false },
            ]
          });
        } else {
          setProgress(null);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProgress();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-sky-100 border-t-sky-600 rounded-full animate-spin" />
        <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">Syncing Records...</p>
      </div>
    );
  }

  const strokeDasharray = 251.2 * 2;
  const percentage = progress?.overallPercentage || 0;
  const offset = strokeDasharray - (percentage / 100) * strokeDasharray;

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-sky-600 mb-2">
            <TrendingUp size={18} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Academic Status</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            {progress?.courseName || "No Enrollment Found"}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {progress ? `Instructor: ${progress.instructorName}` : "Enroll in a school to track progress"}
          </p>
        </div>
        <div className="bg-sky-50 px-6 py-3 rounded-2xl border border-sky-100">
          <p className="text-[10px] font-black uppercase text-sky-700 tracking-wider">Status</p>
          <p className="text-sm font-bold text-sky-900">{progress ? 'Active Student' : 'Not Enrolled'}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 flex flex-col items-center justify-center shadow-sm">
          <div className="relative w-48 h-48 mb-6">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-50" />
              <circle 
                cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="12" fill="transparent"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className={`${progress ? 'text-sky-600' : 'text-gray-200'} transition-all duration-1000 ease-out`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-5xl font-black ${progress ? 'text-gray-900' : 'text-gray-300'}`}>
                {percentage}%
              </span>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Mastery</span>
            </div>
          </div>
          {!progress && <p className="text-gray-400 text-xs font-bold uppercase">No Data Available</p>}
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className={`rounded-3xl p-6 transition-all ${progress ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-300 border border-dashed border-gray-200'}`}>
              <Award className={progress ? 'text-sky-500' : 'text-gray-200'} size={24} />
              <p className="text-[10px] font-black uppercase mt-4 opacity-50 tracking-widest">Attendance</p>
              <h3 className="text-2xl font-black">{progress ? `${progress.attendance}%` : '--'}</h3>
            </div>
            <div className="bg-white border border-gray-100 rounded-3xl p-6">
              <Clock className="text-blue-500 mb-4" size={24} />
              <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Next Term</p>
              <h3 className="text-2xl font-black text-gray-900 tracking-tighter">March 2026</h3>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 min-h-[300px] flex flex-col">
            <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
              <BarChart3 size={20} className="text-gray-900" />
              Curriculum Roadmap
            </h3>
            {progress ? (
              <div className="space-y-4">
                {progress.milestones.map((m) => (
                  <div key={m.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl group hover:bg-white hover:shadow-md transition-all">
                    <div className="flex items-center gap-4">
                      {m.completed ? <CheckCircle2 size={20} className="text-emerald-500" /> : <div className="w-5 h-5 rounded-full border-2 border-gray-200" />}
                      <span className="text-sm font-bold text-gray-900">{m.task}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3">
                <AlertCircle size={32} className="text-gray-200" />
                <p className="text-gray-400 text-sm font-medium">No learning milestones to display.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enroll CTA - Now navigates to School Enrollment Page */}
      {!progress && (
        <div className="bg-gray-900 rounded-[2.5rem] p-10 text-center relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-2xl font-black text-white mb-2 tracking-tight">Ready to start your journey?</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto text-sm leading-relaxed">Join our specialized tech tracks and get direct mentorship from the Inanst hub team.</p>
            
            <Link 
              href="/school-enrollement" 
              className="inline-flex items-center gap-3 px-10 py-5 bg-sky-600 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-sky-500 transition-all shadow-xl shadow-sky-900/20 active:scale-95 group"
            >
              Enroll in School
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 p-4 opacity-10">
             <GraduationCap size={120} className="text-white rotate-12" />
          </div>
        </div>
      )}
    </div>
  );
}