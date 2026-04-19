//gensto-frontend/src/app/(dashboards)/layout.tsx




'use client';

import { useEffect, useState, useLayoutEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import DashboardSidebar from './Components/DashboardSidebar';
import DashboardHeader from './Components/DashboardHeader'; 
import { useAuth } from '../context/AuthContext';
import VerificationOverlay from '../components/VerificationOverlay';

interface AuthenticatedUser {
  id: string;
  email: string;
  role: "regular" | "admins" | "instructors" | "workers";
  isVerified: boolean;
  name?: string;
}

export const dynamic = 'force-dynamic';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user: authUser, loading } = useAuth();
  const user = authUser as unknown as AuthenticatedUser;
  
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Automatically show the input modal if the user isn't verified
  const showVerification = user && !user.isVerified;

  useLayoutEffect(() => {
    // Prevent redirect loops/404s while loading or verifying
    if (loading || showVerification) return;

    if (!user) {
      router.replace('/signin');
      return;
    }

    const rolePath = `/${user.role}`;
    if (user.isVerified && !pathname.startsWith(rolePath)) {
      router.replace(rolePath);
    }
  }, [user, loading, pathname, router, showVerification]);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const isAuthorized = user || loading;

  if (loading || !isAuthorized) {
    return (
      <div className="h-screen w-full bg-[#000000] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="text-blue-500 animate-spin w-10 h-10" />
          <p className="text-gray-400 text-sm animate-pulse tracking-widest uppercase font-bold">
            Verifying Access...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-screen bg-[#f8fafc] overflow-hidden">
      
      {/* Dashboard Content - Blurred if not verified */}
      <div className={`flex flex-1 h-full overflow-hidden transition-all duration-700 
        ${showVerification ? "blur-2xl grayscale pointer-events-none select-none opacity-40 scale-[0.98]" : ""}`}>
        
        <DashboardSidebar 
          role={user?.role || "regular"} 
          isOpen={isSidebarOpen} 
          setIsOpen={setIsSidebarOpen} 
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader 
            onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            role={user?.role || "regular"} 
          />

          <main className="flex-1 overflow-y-auto p-4 md:p-10">
            <div className="max-w-6xl mx-auto">
             
              {user?.isVerified ? children : (
                <div className="flex flex-col items-center justify-center h-64 gap-4">
                  <Loader2 className="w-10 h-10 animate-spin text-blue-500/30" />
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                    Activation Required
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* SINGLE UNIFIED VERIFICATION MODAL */}
      {showVerification && (
        <VerificationOverlay />
      )}

      {isSidebarOpen && user?.isVerified && (
        <div 
          className="fixed inset-0 bg-black/40 z-[40] md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}