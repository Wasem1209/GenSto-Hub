'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, Check, ExternalLink, Loader2, 
  User, Link as LinkIcon, MessageSquare,
  AlertCircle, Users, Clock, CheckCircle2, XCircle
} from 'lucide-react';
// Updated import to use REST_API
import { REST_API } from '../../../constant';

interface Applicant {
  _id: string;
  name: string;
  email: string;
  portfolio: string;
  reason: string;
  roleTitle: string;
  status: 'pending' | 'accepted' | 'denied';
}

interface Stats {
  total: number;
  pending: number;
  accepted: number;
  denied: number;
}

export default function AdminInternshipPage() {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, pending: 0, accepted: 0, denied: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);

  // Fetch applications and stats from the REST_API
  const fetchData = async () => {
    try {
      const response = await fetch(`${REST_API}/v1/internships`);
      const data = await response.json();
      if (data.success) {
        setApplicants(data.data);
        setStats(data.figures);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDecision = async (id: string, status: 'accepted' | 'denied') => {
    setProcessingId(id);
    try {
      const response = await fetch(`${REST_API}/v1/internships/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      
      if (response.ok) {
        // Refresh local state to reflect new counts and status
        await fetchData();
        setSelectedApplicant(null);
      }
    } catch (error) {
      console.error("Decision update failed:", error);
    } finally {
      setProcessingId(null);
    }
  };

  const statCards = [
    { label: 'Total Apps', value: stats.total, icon: Users, color: 'text-blue-600 bg-blue-50' },
    { label: 'Pending', value: stats.pending, icon: Clock, color: 'text-amber-600 bg-amber-50' },
    { label: 'Accepted', value: stats.accepted, icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Denied', value: stats.denied, icon: XCircle, color: 'text-rose-600 bg-rose-50' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-black text-[#1a1f2e] tracking-tight">Internship Desk</h1>
          <p className="text-gray-500 font-medium mt-1">Reviewing submissions from the Inanst Talent Program.</p>
        </header>

        {/* Figures/Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {statCards.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4">
              <div className={`p-3 rounded-2xl ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                <h4 className="text-xl font-black text-gray-900">{stat.value}</h4>
              </div>
            </div>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            <p className="text-xs font-black uppercase tracking-widest text-gray-400">Loading Talent Pool...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {applicants.map((app) => (
              <div key={app._id} className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                      <User size={14} /> <span className="text-[10px] font-black uppercase tracking-wider">Applicant</span>
                    </div>
                    <p className="font-bold text-[#1a1f2e]">{app.name}</p>
                    <p className="text-xs text-gray-500">{app.email}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                      <LinkIcon size={14} /> <span className="text-[10px] font-black uppercase tracking-wider">Portfolio</span>
                    </div>
                    <a href={app.portfolio} target="_blank" className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:underline">
                      View Work <ExternalLink size={12} />
                    </a>
                    <p className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded inline-block uppercase mt-1">
                      {app.roleTitle}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                      <MessageSquare size={14} /> <span className="text-[10px] font-black uppercase tracking-wider">Reason</span>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed italic">&quot;{app.reason}&quot;</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                   {app.status !== 'pending' && (
                      <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl ${
                        app.status === 'accepted' ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'
                      }`}>
                        {app.status}
                      </span>
                   )}
                   <button 
                    onClick={() => setSelectedApplicant(app)}
                    className="bg-[#1a1f2e] text-white text-[10px] font-black px-6 py-4 rounded-2xl uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-blue-50"
                  >
                    Take Action
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Decision Mini-Modal */}
      {selectedApplicant && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-[#1a1f2e]/60 backdrop-blur-md">
          <div className="bg-white w-full max-w-sm rounded-[3rem] p-10 shadow-2xl text-center relative">
            <button onClick={() => setSelectedApplicant(null)} className="absolute top-8 right-8 text-gray-400 hover:text-gray-600 transition-colors">
              <X size={24} />
            </button>
            
            <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10 text-gray-300" />
            </div>
            
            <h3 className="text-2xl font-black text-[#1a1f2e] mb-2">Final Decision</h3>
            <p className="text-sm text-gray-500 font-medium mb-10 leading-relaxed">
              Decide the status for <span className="text-blue-600 font-bold">{selectedApplicant.name}</span> for the {selectedApplicant.roleTitle} track.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => handleDecision(selectedApplicant._id, 'accepted')}
                disabled={!!processingId}
                className="flex flex-col items-center gap-3 p-6 rounded-[2rem] bg-emerald-50 border-2 border-transparent hover:border-emerald-500 transition-all group disabled:opacity-50"
              >
                <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-100 group-hover:scale-110 transition-transform">
                  {processingId === selectedApplicant._id ? <Loader2 className="animate-spin" /> : <Check size={24} />}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700">Accept</span>
              </button>

              <button 
                onClick={() => handleDecision(selectedApplicant._id, 'denied')}
                disabled={!!processingId}
                className="flex flex-col items-center gap-3 p-6 rounded-[2rem] bg-rose-50 border-2 border-transparent hover:border-rose-500 transition-all group disabled:opacity-50"
              >
                <div className="w-12 h-12 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-rose-100 group-hover:scale-110 transition-transform">
                  {processingId === selectedApplicant._id ? <Loader2 className="animate-spin" /> : <X size={24} />}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-rose-700">Denied</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}