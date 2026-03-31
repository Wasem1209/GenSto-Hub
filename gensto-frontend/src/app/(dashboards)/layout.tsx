'use client';

import { useEffect, useState, useLayoutEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { UserCircle, Bell, Menu, X, Loader2 } from 'lucide-react';
import Link from 'next/link';
import DashboardSidebar from './Components/DashboardSidebar';
import { useAuth } from '../context/AuthContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // useLayoutEffect handles the redirect BEFORE the browser paints the UI
  useLayoutEffect(() => {
    if (!loading) {
      // 1. No user? Bounce to signin
      if (!user) {
        router.replace('/signin');
        return;
      }

      // 2. User exists but path is wrong? Bounce to signin 
      // (This prevents users from seeing dashboards they shouldn't)
      const rolePath = `/${user.role}`;
      if (!pathname.startsWith(rolePath)) {
        router.replace('/signin'); 
      }
    }
  }, [user, loading, pathname, router]);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  /** * STRICT SECURITY GUARD:
   * Returns a black screen immediately if:
   * - Data is still loading
   * - No user object exists
   * - The URL doesn't match the user's role (e.g. /student or /admin when they are /regular)
   */
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
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 md:hidden text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="font-bold text-gray-800 capitalize flex items-center gap-2">
              <span className="hidden md:inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
              {user.role} <span className="text-gray-400 font-normal hidden sm:inline">Console</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 md:space-x-5">
            <button className="relative p-2 text-gray-400 hover:text-blue-600 transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <Link href={`/${user.role}/profile`} className="flex items-center space-x-3 group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {user.fullName || user.name}
                </p>
                <p className="text-[10px] uppercase tracking-tighter text-gray-500">{user.email}</p>
              </div>
              <UserCircle size={32} className="text-gray-300 group-hover:text-blue-600 transition-colors" />
            </Link>
          </div>
        </header>

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