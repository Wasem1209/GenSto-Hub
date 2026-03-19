'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { UserCircle, Menu } from 'lucide-react'; // Added Menu
import { useAuth } from '../../context/AuthContext';

interface DashboardHeaderProps {
  role: string;
  onMenuClick: () => void; // New prop
}

export default function DashboardHeader({ role, onMenuClick }: DashboardHeaderProps) {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState('Welcome');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 17) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  return (
    <header className="h-16 bg-[#1f2937] border-b border-gray-700 flex items-center px-4 md:px-8 shrink-0 text-white relative">
      
      {/* Mobile Menu Toggle */}
      <div className="flex-1 flex items-center">
        <button 
          onClick={onMenuClick}
          className="p-2 mr-2 text-gray-400 hover:text-white md:hidden"
        >
          <Menu size={24} />
        </button>
      </div>

      <div className="absolute left-1/2 transform -translate-x-1/2 text-center pointer-events-none whitespace-nowrap">
        <h1 className="text-sm md:text-base font-medium tracking-tight">
          {greeting}, <span className="font-bold text-blue-400">{user?.name?.split(' ')[0] || 'User'}</span>
        </h1>
      </div>

      <div className="flex-1 flex justify-end">
        <Link href={`/${role}/profile`} className="group transition-all flex items-center justify-center p-1">
          <div className="relative">
            <UserCircle size={32} className="text-gray-400 group-hover:text-blue-400 transition-colors stroke-[1.5]" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#1f2937] rounded-full"></span>
          </div>
        </Link>
      </div>
    </header>
  );
}