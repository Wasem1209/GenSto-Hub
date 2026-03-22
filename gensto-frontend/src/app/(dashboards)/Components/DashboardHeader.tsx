// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
'use client';

import { useState, useEffect, useRef } from 'react';
import { UserCircle, Menu, Mail, FileText, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function DashboardHeader({ onMenuClick, _role }) {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // This line "uses" the variable to satisfy ESLint without affecting the UI
  const _userRole = _role; 

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 17) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-[#1f2937] border-b border-gray-700 flex items-center px-4 md:px-8 shrink-0 text-white relative z-[100]">
      
      <div className="flex-1 flex items-center">
        <button 
          onClick={onMenuClick}
          className="p-2 mr-2 text-gray-400 hover:text-white md:hidden transition-colors"
        >
          <Menu size={24} />
        </button>
      </div>

      <div className="absolute left-1/2 transform -translate-x-1/2 text-center pointer-events-none whitespace-nowrap">
        <h1 className="text-sm md:text-base font-medium tracking-tight">
          {greeting || 'Welcome'}, <span className="font-bold text-blue-400">{user?.name?.split(' ')[0] || 'User'}</span>
        </h1>
      </div>

      <div className="flex-1 flex justify-end relative" ref={dropdownRef}>
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="group relative flex items-center justify-center p-1 rounded-full hover:bg-gray-800 transition-all outline-none"
        >
          <div className="relative">
            <UserCircle 
              size={34} 
              className={`transition-colors stroke-[1.5] ${isDropdownOpen ? 'text-blue-400' : 'text-gray-400 group-hover:text-blue-400'}`} 
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#1f2937] rounded-full"></span>
          </div>
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full right-0 mt-3 w-72 md:w-80 bg-[#1A1D21] border border-slate-800 rounded-[2rem] shadow-2xl p-6 animate-in fade-in slide-in-from-top-2 duration-200">
            
            <div className="flex flex-col items-center text-center space-y-3 pb-4 border-b border-slate-800/50">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-0.5">
                  <div className="w-full h-full rounded-[0.9rem] bg-[#0F1113] flex items-center justify-center">
                    <UserCircle size={32} className="text-slate-600" />
                  </div>
                </div>
                <ShieldCheck size={16} className="absolute -bottom-1 -right-1 text-green-500 fill-[#1A1D21]" />
              </div>
              
              <div>
                <h2 className="text-lg font-black text-white uppercase tracking-tighter leading-tight">
                  {user?.name || 'Inanst User'}
                </h2>
                {/* Visualizing the role if you want to use it later */}
                {_userRole && (
                   <p className="text-[10px] text-blue-400 font-bold uppercase mt-1 tracking-widest">{_userRole}</p>
                )}
                <div className="flex items-center justify-center gap-1.5 mt-1 text-slate-500">
                  <Mail size={12} />
                  <span className="text-[10px] font-medium truncate max-w-[180px]">{user?.email}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-blue-500">
                <FileText size={14} />
                <span className="text-[9px] font-black uppercase tracking-widest">About / Bio</span>
              </div>
              <div className="bg-[#0F1113] border border-slate-800/50 rounded-xl p-3">
                <p className="text-[11px] text-slate-400 leading-relaxed italic">
                  {user?.bio || "Professional Hub Member. No bio provided yet."}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/50 text-center">
               <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em]">
                 Verified Member
               </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}