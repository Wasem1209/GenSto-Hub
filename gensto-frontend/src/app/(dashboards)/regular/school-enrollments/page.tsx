'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { School, ArrowRight, AlertCircle, Loader2, PlusCircle } from 'lucide-react';

interface EnrolledSchool {
  id: string;
  schoolName: string;
  description: string;
  enrollmentDate: string;
  status: 'active' | 'completed' | 'pending';
}

export default function MySchoolPage() {
  const [schools, setSchools] = useState<EnrolledSchool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMySchools = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/schools`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Connection Issue. Please check your internet or try again later.');
      }

      const data = await response.json();
      setSchools(data.enrolledSchools || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMySchools();
  }, []);

  // 1. Loading State - Displayed while the API is working
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 animate-pulse">
        <div className="relative">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          <div className="absolute inset-0 bg-blue-400 blur-xl opacity-20 animate-pulse"></div>
        </div>
        <p className="text-gray-500 font-bold tracking-tight">Accessing Inanst Schools...</p>
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="text-red-600" size={32} />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Connection Issue</h2>
        <p className="text-gray-500 mt-2 max-w-xs">{error}</p>
        <button 
          onClick={() => fetchMySchools()}
          className="mt-6 px-8 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95"
        >
          Try Again
        </button>
      </div>
    );
  }

  // 3. Empty State
  if (schools.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-8 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 text-center">
        <div className="w-20 h-20 bg-white shadow-sm border border-gray-100 rounded-2xl flex items-center justify-center mb-6">
          <School className="text-blue-600" size={40} />
        </div>
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">No available enrolled School</h2>
        <p className="text-gray-500 mt-2 mb-8 max-w-sm text-sm">
          No current school enrolled for this account. Start your learning journey today with Inanst.
        </p>
        <Link 
          href="/regular/school-enrollments"
          className="flex items-center space-x-2 bg-blue-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 group"
        >
          <PlusCircle size={20} />
          <span>Enroll Now</span>
          <ArrowRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    );
  }

  // 4. Success State
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center justify-between border-b border-gray-100 pb-5">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">My Schools</h1>
          <p className="text-sm text-gray-500 mt-1">Access your active learning environments.</p>
        </div>
        <Link 
          href="/regular/school-enrollments" 
          className="flex items-center space-x-1 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
        >
          <span>Enroll in another</span>
          <PlusCircle size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schools.map((school) => (
          <div key={school.id} className="group bg-white border border-gray-200 rounded-3xl p-6 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-50/50 transition-all duration-300 flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-blue-50 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <School className="text-blue-600" size={24} />
              </div>
              <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                school.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-50 text-gray-500'
              }`}>
                {school.status}
              </span>
            </div>
            
            <div className="flex-grow">
              <h3 className="font-bold text-xl text-gray-900 group-hover:text-blue-600 transition-colors">{school.schoolName}</h3>
              <p className="text-sm text-gray-500 mt-3 line-clamp-2 leading-relaxed">{school.description}</p>
            </div>
            
            <Link 
              href={`/regular/school/${school.id}`}
              className="mt-8 w-full flex items-center justify-center space-x-2 py-4 bg-gray-50 text-gray-900 rounded-2xl font-black group-hover:bg-blue-600 group-hover:text-white transition-all duration-300"
            >
              <span>Enter School</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}