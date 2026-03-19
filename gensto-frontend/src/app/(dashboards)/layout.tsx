'use client';

import { useEffect, useState } from 'react'; // Added useState
import { usePathname } from 'next/navigation';
import DashboardSidebar from './Components/DashboardSidebar';
import DashboardHeader from './Components/DashboardHeader';
import { useAuth } from '../context/AuthContext';

type UserRole = 'regular' | 'admin' | 'instructor' | 'worker';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, login, loading } = useAuth();
  const pathname = usePathname();
  
  // State to manage mobile sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      login({
        id: 'user-001',
        name: 'Inanst Admin',
        email: 'admin@inanst.com',
        role: 'admin',
        emailVerified: true
      });
    }
  }, [user, loading, login]);

  const getRoleFromPath = (): UserRole => {
    if (pathname.startsWith('/admin')) return 'admin';
    if (pathname.startsWith('/worker')) return 'worker';
    if (pathname.startsWith('/instructor')) return 'instructor';
    return 'regular';
  };

  const currentActiveRole = getRoleFromPath();

  if (loading || !user) {
    return <div className="h-screen w-full bg-[#1a1c23]" />;
  }

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden">
      {/* Sidebar now receives state and the setter to close itself */}
      <DashboardSidebar 
        role={currentActiveRole} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header receives the toggle function for the menu button */}
        <DashboardHeader 
          role={currentActiveRole} 
          onMenuClick={() => setIsSidebarOpen(true)} 
        />

        {!user.emailVerified && (
          <div className="bg-blue-600 text-white py-2 px-4 text-center text-[10px] font-bold uppercase tracking-[0.2em] shadow-inner shrink-0">
            Action Required: Check your inbox to verify {user.email}
          </div>
        )}

        <main className="flex-1 overflow-y-auto bg-[#f9fafb] p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}