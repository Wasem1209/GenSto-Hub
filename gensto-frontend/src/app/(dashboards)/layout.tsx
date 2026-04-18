'use client';

import { useEffect, useState, useLayoutEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2, MailCheck, Send, ShieldAlert } from 'lucide-react';
import DashboardSidebar from './Components/DashboardSidebar';
import DashboardHeader from './Components/DashboardHeader'; 
import { useAuth } from '../context/AuthContext';
import { REST_API } from '../constant';
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
  const [resending, setResending] = useState(false);
  const [showInputModal, setShowInputModal] = useState(false);

  const maskEmail = (email: string) => {
    if (!email) return "";
    const [userPart, domain] = email.split("@");
    if (userPart.length <= 2) return `${userPart}***@${domain}`;
    return `${userPart.substring(0, 2)}*****@${domain}`;
  };

  const maskedEmail = user?.email ? maskEmail(user.email) : "";

  useLayoutEffect(() => {
    // FIX: If we are currently in the middle of verifying (modal open), 
    // do not trigger any redirects that might cause 404s.
    if (loading || showInputModal) return;

    if (!user) {
      router.replace('/signin');
      return;
    }

    const rolePath = `/${user.role}`;
    // Only enforce the role-based path if the user is already verified
    if (user.isVerified && !pathname.startsWith(rolePath)) {
      router.replace(rolePath);
    }
  }, [user, loading, pathname, router, showInputModal]);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const handleResend = async () => {
    if (!user?.email) return;
    
    setResending(true);
    try {
      // NOTE: Your logs show a 400 error here. 
      // Ensure the backend expects { email: string }
      const response = await fetch(`${REST_API}/auth/resend-verification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email }),
      });
      
      if (response.ok) {
        setShowInputModal(true);
      } else {
        const errorData = await response.json();
        console.error("Failed to send verification email:", errorData.message);
        // Fallback: Show the modal anyway so user can try the code they already have
        setShowInputModal(true); 
      }
    } catch (err) {
      console.error("Resend Error:", err);
      setShowInputModal(true);
    } finally {
      setResending(false);
    }
  };

  // Allow access if loading OR if user exists (even if not verified yet)
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
        ${!user?.isVerified ? "blur-2xl grayscale pointer-events-none select-none opacity-40 scale-[0.98]" : ""}`}>
        
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
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* VERIFICATION PROMPT */}
      {user && !user.isVerified && !showInputModal && (
        <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-[4px] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white rounded-[3.5rem] shadow-2xl p-10 border border-gray-100 text-center animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
              <MailCheck className="w-12 h-12 text-blue-600" />
            </div>
            
            <h2 className="text-4xl font-extrabold tracking-tight mb-4 text-gray-900">Final Step!</h2>
            <p className="text-gray-500 font-medium mb-10 leading-relaxed text-lg">
              Verify your email to unlock your dashboard and start using <span className="text-blue-600 font-bold uppercase">Inanst</span>. <br/>
              <span className="text-gray-900 font-bold break-all underline decoration-blue-200 tracking-tight">
                {maskedEmail}
              </span>
            </p>

            <div className="space-y-4">
              <button 
                onClick={handleResend}
                disabled={resending}
                className="w-full bg-blue-600 text-white font-bold py-5 rounded-2xl shadow-lg flex items-center justify-center gap-3 hover:bg-blue-700 transition active:scale-95 disabled:opacity-50 uppercase tracking-widest text-xs"
              >
                {resending ? <Loader2 className="animate-spin w-5 h-5" /> : <>Send me a new link <Send className="w-4 h-4 rotate-45" /></>}
              </button>
              
              <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest pt-4">
                <ShieldAlert className="w-3 h-3 text-yellow-500" />
                Feature access restricted
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6-DIGIT CODE MODAL */}
      {showInputModal && (
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