'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { API_ROUTES } from '../constant'; // Using the routes constant
import { useRouter } from 'next/navigation';
import { Loader2, CheckCircle2, ShieldCheck, Mail, RefreshCcw } from 'lucide-react';

export default function VerificationOverlay() {
  const { user, login, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [loading, setLoading] = useState(false); 
  const [verifying, setVerifying] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  useEffect(() => {
    if (!authLoading && user?.email) {
      setError('');
    }
  }, [user, authLoading]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (authLoading) return;
    if (code.length < 6) return setError("Please enter the 6-digit code");
    
    if (!user?.email) {
      return setError("Session error: Please sign in again.");
    }

    setVerifying(true);
    setError('');
    
    try {
      const res = await fetch(API_ROUTES.VERIFY_OTP, { // Updated to API_ROUTES
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, code })
      });

      const data = await res.json();

      if (res.ok) {
        await login(data.token, data.user); 
        router.refresh();
      } else {
        setError(data.msg || "Invalid verification code");
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Connection failed. Please check your internet.");
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    if (!user?.email) return setError("Cannot resend: Session lost.");
    
    setLoading(true);
    setError('');
    try {
      const res = await fetch(API_ROUTES.RESEND_OTP, { // Updated to API_ROUTES
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email })
      });

      if (res.ok) {
        setShowModal(true);
        setResendTimer(60); 
      } else {
        const errorData = await res.json();
        setError(errorData.msg || "Error resending code");
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to reach server.");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="fixed inset-0 z-[110] flex items-center justify-center bg-gray-900/60 backdrop-blur-md">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-white" />
          <p className="text-white text-[10px] font-black tracking-widest animate-pulse uppercase">Restoring Session</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-gray-900/60 backdrop-blur-md px-4">
      {/* Reduced size: max-w-md and smaller padding (p-6) */}
      <div className="bg-white rounded-[32px] p-6 sm:p-8 max-w-md w-full text-center shadow-2xl border border-gray-100 animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
           <Mail className="w-8 h-8" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-1 tracking-tighter italic uppercase">Verify</h2>
        <p className="text-gray-400 text-[10px] font-bold mb-1 uppercase tracking-[2px]">Enter the code sent to</p>
        <p className="font-bold text-gray-900 text-xs mb-6 truncate underline decoration-blue-200 decoration-2">
          {user?.email || "your email"}
        </p>

        <form onSubmit={handleVerify} className="mb-4">
          <input 
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="000000"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} 
            className="w-full text-center text-3xl tracking-[8px] font-black py-4 border-2 border-gray-100 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-50 focus:outline-none mb-3 transition-all bg-gray-50"
            autoFocus
          />
          
          {error && (
            <div className="bg-red-50 text-red-600 p-2 rounded-lg mb-3 text-[9px] font-black uppercase tracking-widest">
              {error}
            </div>
          )}

          <button 
            type="submit"
            disabled={verifying || code.length < 6}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3.5 rounded-xl transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-blue-100 flex items-center justify-center gap-2 uppercase tracking-widest text-[11px]"
          >
            {verifying ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify Now"}
          </button>
        </form>

        <button 
          onClick={handleResend}
          disabled={loading || resendTimer > 0}
          className="text-blue-600 hover:text-blue-800 font-black py-1 transition-all flex items-center justify-center gap-2 mx-auto disabled:text-gray-300 text-[9px] uppercase tracking-widest"
        >
          {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCcw className="w-2.5 h-2.5" />}
          {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend code"}
        </button>

        <p className="mt-6 text-[9px] font-black text-gray-300 uppercase tracking-widest flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-green-500" /> Secure SSL
        </p>
      </div>

      {/* Internal Success Modal is also smaller */}
      {showModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[1.5rem] p-6 max-w-[280px] w-full text-center shadow-2xl animate-in zoom-in duration-200">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-gray-900 mb-1 uppercase tracking-tighter">Sent!</h3>
            <p className="text-gray-400 mb-6 text-[10px] font-bold uppercase">Check your inbox.</p>
            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-gray-900 text-white font-black py-2.5 rounded-lg hover:bg-gray-800 transition-colors uppercase tracking-widest text-[9px]"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}