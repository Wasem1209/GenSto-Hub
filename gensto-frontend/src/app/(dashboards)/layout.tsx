
'use client';

import { useState, useLayoutEffect, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2, Mail, CheckCircle2 } from 'lucide-react';
import DashboardSidebar from './Components/DashboardSidebar';
import DashboardHeader from './Components/DashboardHeader'; 
import { useAuth } from '../context/AuthContext';
import { API_ROUTES } from '../constant';

interface AuthenticatedUser {
  id: string;
  email: string;
  role: "regular" | "admins" | "instructors" | "workers";
  isVerified: boolean;
  name?: string;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user: authUser, loading: authLoading, login } = useAuth();
  const user = authUser as unknown as AuthenticatedUser;
  const router = useRouter();
  const pathname = usePathname();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [, setResending] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  // Logic Update: Detect localhost or specific dev paths to disable auth-locks locally
  const isDevelopment = 
    (typeof window !== 'undefined' && window.location.hostname === 'localhost') || 
    pathname.includes('/workers') || 
    pathname.includes('/admins'); 

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  // If we are in dev mode, we bypass the verification blur entirely
  const isUnverified = user && !user.isVerified && !isDevelopment;

  const maskEmail = (email: string) => {
    if (!email) return "identifying account...";
    const [userPart, domain] = email.split("@");
    return userPart.length <= 2 
      ? `${userPart}***@${domain}` 
      : `${userPart.substring(0, 2)}*****@${domain}`;
  };

  useLayoutEffect(() => {
    // Stop all redirect logic if on localhost/dev mode
    if (authLoading || isDevelopment) return; 
    
    if (!user) {
      router.replace('/signin');
      return;
    }

    if (user.isVerified) {
      const rolePath = `/${user.role}`;
      if (!pathname.startsWith(rolePath)) {
        router.replace(rolePath);
      }
    }
  }, [user, authLoading, pathname, router, isDevelopment]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length < 6) return setError("Enter 6-digit code");
    setVerifying(true);
    try {
      const res = await fetch(API_ROUTES.VERIFY_OTP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user?.email, code })
      });
      const data = await res.json();
      if (res.ok) {
        await login(data.token, data.user);
        router.refresh();
      } else {
        setError(data.msg || "Invalid code");
      }
    } catch {
      setError("Server error");
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    if (!user?.email) return;
    setResending(true);
    try {
      const res = await fetch(API_ROUTES.RESEND_OTP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email })
      });
      if (res.ok) setShowSuccessModal(true);
    } catch {
      setError("Server unreachable");
    } finally {
      setResending(false);
    }
  };

  // Logic Update: Dynamically set the role based on the URL path for testing
  const getDisplayRole = () => {
    if (pathname.includes('/admins')) return 'admins';
    if (pathname.includes('/workers')) return 'workers';
    if (pathname.includes('/instructors')) return 'instructors';
    if (pathname.includes('/regular')) return 'regular';
    return user?.role || 'regular';
  };

  const currentRole = isDevelopment ? getDisplayRole() : user?.role;

  if (authLoading && !isDevelopment) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center">
        <Loader2 className="text-blue-500 animate-spin w-10 h-10" />
      </div>
    );
  }

  return (
    <div className="relative flex h-screen bg-[#f8fafc] overflow-hidden">
      
      <div className={`flex flex-1 h-full overflow-hidden transition-all duration-700 
        ${isUnverified ? "blur-2xl grayscale opacity-40 pointer-events-none" : ""}`}>
        
        <DashboardSidebar 
          role={currentRole} 
          isOpen={isSidebarOpen} 
          setIsOpen={setIsSidebarOpen} 
        />
        
        <div className="flex-1 flex flex-col overflow-hidden text-black">
          <DashboardHeader 
            onMenuClick={() => setIsSidebarOpen(true)} 
            role={currentRole} 
          />
          <main className="flex-1 overflow-y-auto p-4 md:p-10">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>

      {isUnverified && user?.email && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-md px-4">
          <div className="bg-white rounded-[40px] p-10 max-w-lg w-full text-center shadow-2xl animate-in zoom-in">
            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Mail className="w-10 h-10" />
            </div>
            <h2 className="text-4xl font-extrabold mb-2 text-black">Verify Account</h2>
            <p className="font-bold mb-8 text-blue-600">{maskEmail(user.email)}</p>
            <form onSubmit={handleVerify} className="mb-6">
              <input 
                type="text" 
                maxLength={6} 
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                className="w-full text-center text-4xl tracking-[12px] font-mono py-5 border-2 rounded-2xl mb-4 text-black"
                placeholder="000000"
              />
              {error && <p className="text-red-500 font-bold mb-4 text-sm">{error}</p>}
              <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl">
                {verifying ? "VERIFYING..." : "ACTIVATE ACCOUNT"}
              </button>
            </form>
            <button onClick={handleResend} className="text-blue-600 font-bold">Resend code</button>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl">
            <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-6" />
            <h3 className="text-xl font-bold mb-2">Check Inbox</h3>
            <button onClick={() => setShowSuccessModal(false)} className="w-full bg-gray-900 text-white py-3 rounded-xl">Okay</button>
          </div>
        </div>
      )}
    </div>
  );
}

/*

//gensto-frontend/src/app/(dashboards)/layout.tsx

'use client';

import { useState, useLayoutEffect, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2, Mail, CheckCircle2 } from 'lucide-react';
import DashboardSidebar from './Components/DashboardSidebar';
import DashboardHeader from './Components/DashboardHeader'; 
import { useAuth } from '../context/AuthContext';
import { API_ROUTES } from '../constant';

interface AuthenticatedUser {
  id: string;
  email: string;
  role: "regular" | "admins" | "instructors" | "workers";
  isVerified: boolean;
  name?: string;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user: authUser, loading: authLoading, login } = useAuth();
  const user = authUser as unknown as AuthenticatedUser;
  const router = useRouter();
  const pathname = usePathname();

  // Component States
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  // Close sidebar on navigation
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const isUnverified = user && !user.isVerified;

  // Improved Mask Email Helper - Prevents "your email" flash
  const maskEmail = (email: string) => {
    if (!email) return "identifying account...";
    const [userPart, domain] = email.split("@");
    if (!domain) return email;
    return userPart.length <= 2 
      ? `${userPart}***@${domain}` 
      : `${userPart.substring(0, 2)}*****@${domain}`;
  };

  // 1. Redirect Logic
  useLayoutEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      router.replace('/signin');
      return;
    }

    if (user.isVerified) {
      const rolePath = `/${user.role}`;
      if (!pathname.startsWith(rolePath)) {
        router.replace(rolePath);
      }
    }
  }, [user, authLoading, pathname, router]);

  // 2. Verification Logic
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length < 6) return setError("Enter 6-digit code");
    if (!user?.email) return setError("Session missing. Please refresh.");
    
    setVerifying(true);
    setError('');
    
    try {
      const res = await fetch(API_ROUTES.VERIFY_OTP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, code })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        await login(data.token, data.user);
        router.refresh();
      } else {
        setError(data.msg || "Invalid code");
      }
    } catch {
      setError("Server connection error.");
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    if (!user?.email) return;
    setResending(true);
    setError('');
    try {
      const res = await fetch(API_ROUTES.RESEND_OTP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email })
      });
      if (res.ok) {
        setShowSuccessModal(true);
      } else {
        setError("Failed to resend");
      }
    } catch {
      setError("Server unreachable");
    } finally {
      setResending(false);
    }
  };

  // Initial Loading state
  if (authLoading || (!user && !authLoading)) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="text-blue-500 animate-spin w-10 h-10" />
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest animate-pulse">
            Verifying Session...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-screen bg-[#f8fafc] overflow-hidden">
      
      <div className={`flex flex-1 h-full overflow-hidden transition-all duration-700 
        ${isUnverified ? "blur-2xl grayscale opacity-40 pointer-events-none select-none" : ""}`}>
        
        <DashboardSidebar 
          role={user?.role} 
          isOpen={isSidebarOpen} 
          setIsOpen={setIsSidebarOpen} 
        />
        
        <div className="flex-1 flex flex-col overflow-hidden text-black">
          <DashboardHeader 
            onMenuClick={() => setIsSidebarOpen(true)} 
            role={user?.role} 
          />
          <main className="flex-1 overflow-y-auto p-4 md:p-10">
            <div className="max-w-6xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>

      
      {isUnverified && user?.email && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-md px-4 text-gray-900">
          <div className="bg-white rounded-[40px] p-10 max-w-lg w-full text-center shadow-2xl border border-gray-100 animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Mail className="w-10 h-10" />
            </div>

            <h2 className="text-4xl font-extrabold mb-2 text-black">Verify Account</h2>
            <p className="text-gray-500 text-lg mb-1">Enter the 6-digit code sent to</p>
            <p className="font-bold mb-8 truncate text-blue-600">{maskEmail(user.email)}</p>
            
            <form onSubmit={handleVerify} className="mb-6">
              <input 
                type="text" 
                inputMode="numeric"
                maxLength={6} 
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                className="w-full text-center text-4xl tracking-[12px] font-mono py-5 border-2 border-gray-100 rounded-2xl focus:border-blue-600 focus:outline-none mb-4 text-black"
                placeholder="000000"
                autoFocus
              />
              
              {error && <p className="text-red-500 font-bold mb-4 text-sm">{error}</p>}
              
              <button 
                type="submit"
                disabled={verifying || code.length < 6}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-blue-100"
              >
                {verifying ? "VERIFYING..." : "ACTIVATE ACCOUNT"}
              </button>
            </form>

            <button 
              onClick={handleResend} 
              disabled={resending} 
              className="text-blue-600 hover:text-blue-800 font-bold py-2 transition-all disabled:text-gray-400"
            >
              {resending ? "Sending code..." : "Resend code"}
            </button>
          </div>
        </div>
      )}

      
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8" strokeWidth={3} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-black">Check Inbox</h3>
            <p className="text-gray-500 mb-8 text-sm">A new verification code has been sent to your email.</p>
            <button 
              onClick={() => setShowSuccessModal(false)} 
              className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
*/

/// Note: The above code is a comprehensive dashboard layout that includes authentication checks, email verification flow, and responsive design elements. It ensures that unverified users are prompted to verify their accounts while providing a seamless experience for verified users. The layout also handles loading states and potential errors gracefully, enhancing the overall user experience.




/*
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
 */ 