'use client';

import { useEffect, useState, useLayoutEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import DashboardSidebar from './Components/DashboardSidebar';
import DashboardHeader from './Components/DashboardHeader'; 
import { useAuth } from '../context/AuthContext';

// This prevents the build error you saw earlier by ensuring 
// the dashboard is always rendered on the client/runtime.
export const dynamic = 'force-dynamic';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useLayoutEffect(() => {
    if (!loading) {
      // If no user is logged in, send to signin
      if (!user) {
        router.replace('/signin');
        return;
      }

      
      const rolePath = `/${user.role}`;
      
      if (!pathname.startsWith(rolePath)) {
        console.warn(`Unauthorized access: ${pathname} for role ${user.role}`);
        
        
        router.replace(rolePath);
      }
    }
  }, [user, loading, pathname, router]);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  // Authorization check for the UI render
  const isAuthorized = user && pathname.startsWith(`/${user.role}`);

  // Show loader while checking auth or if the user is on the wrong path
  if (loading || !isAuthorized) {
    return (
      <div className="h-screen w-full bg-[#000000] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="text-blue-500 animate-spin w-10 h-10" />
          <p className="text-gray-500 text-sm animate-pulse">Verifying Access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden">
      <DashboardSidebar 
        role={user.role as "regular" | "admins" | "instructors" | "workers"} 
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

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-[40] md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}