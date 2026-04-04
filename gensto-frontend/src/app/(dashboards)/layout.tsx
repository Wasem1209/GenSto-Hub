'use client';

import { useEffect, useState, useLayoutEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import DashboardSidebar from './Components/DashboardSidebar';
import DashboardHeader from './Components/DashboardHeader'; 
import { useAuth } from '../context/AuthContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  
  useLayoutEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace('/signin');
        return;
      }

      const rolePath = `/${user.role}`;
      if (!pathname.startsWith(rolePath)) {
        router.replace('/signin'); 
      }
    }
  }, [user, loading, pathname, router]);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const isAuthorized = user && pathname.startsWith(`/${user.role}`);

  if (loading || !isAuthorized) {
    return (
      <div className="h-screen w-full bg-[#000000] flex items-center justify-center">
        <Loader2 className="text-blue-500 animate-spin w-8 h-8 opacity-20" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden">
      <DashboardSidebar 
        role={user.role as "regular" | "admin" | "instructor" | "worker"} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        
        <DashboardHeader 
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} 
          role={user.role} 
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-10">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-[30] md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}