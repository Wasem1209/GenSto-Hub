'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { REST_API } from '../constant';
import { useRouter } from 'next/navigation';
import { Loader2, CheckCircle2, ShieldCheck, Mail } from 'lucide-react';

export default function VerificationOverlay() {
  // Pulling 'loading' from AuthContext to sync with checkAuth()
  const { user, login, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [loading, setLoading] = useState(false); // For resend button
  const [verifying, setVerifying] = useState(false); // For submit button
  const [showModal, setShowModal] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  // Automatically clear error if the user object finally loads
  useEffect(() => {
    if (!authLoading && user?.email) {
      setError('');
    }
  }, [user, authLoading]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Safety check: Don't proceed if Context is still loading the session
    if (authLoading) return;
    
    if (code.length < 6) return setError("Please enter the 6-digit code");
    
    if (!user?.email) {
      console.error("Verification failed: No user email found in AuthContext.");
      return setError("Session error: Please sign in again.");
    }

    setVerifying(true);
    setError('');
    
    try {
      console.log("Attempting verification for:", user.email);
      
      const res = await fetch(`${REST_API}/auth/verify-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, code })
      });

      const data = await res.json();
      console.log("Server Response:", data);

      if (res.ok) {
        await login(data.token, data.user); 
        router.refresh();
      } else {
        setError(data.msg || "Invalid verification code");
      }
    } catch (err) {
      console.error("Network/Server Error:", err);
      setError("Connection failed. Please check your internet.");
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    if (!user?.email) return setError("Cannot resend: Session lost.");
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${REST_API}/auth/resend-verification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email })
      });

      if (res.ok) {
        setShowModal(true);
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

  // If the AuthProvider is still running checkAuth(), show a skeleton or loader
  if (authLoading) {
    return (
      <div className="fixed inset-0 z-[110] flex items-center justify-center bg-gray-900/60 backdrop-blur-md">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-white" />
          <p className="text-white text-sm font-bold animate-pulse">RESTORING SESSION...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-gray-900/60 backdrop-blur-md px-4">
      <div className="bg-white rounded-[40px] p-10 max-w-lg w-full text-center shadow-2xl border border-gray-100 animate-in fade-in zoom-in duration-300">
        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
           <Mail className="w-10 h-10" />
        </div>

        <h2 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">Verify Account</h2>
        <p className="text-gray-500 text-lg mb-1">Enter the 6-digit code sent to</p>
        <p className="font-bold text-gray-900 mb-8 truncate underline decoration-blue-200 decoration-2">
          {user?.email || "your email"}
        </p>

        <form onSubmit={handleVerify} className="mb-6">
          <input 
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            placeholder="000000"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} 
            className="w-full text-center text-4xl tracking-[12px] font-mono py-5 border-2 border-gray-100 rounded-2xl focus:border-blue-600 focus:ring-4 focus:ring-blue-50 focus:outline-none mb-4 transition-all"
            autoFocus
          />
          
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-4 text-sm font-bold animate-shake">
              {error}
            </div>
          )}

          <button 
            type="submit"
            disabled={verifying || code.length < 6}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
          >
            {verifying ? <Loader2 className="w-5 h-5 animate-spin" /> : "ACTIVATE ACCOUNT"}
          </button>
        </form>

        <button 
          onClick={handleResend}
          disabled={loading}
          className="text-blue-600 hover:text-blue-800 font-bold py-2 transition-all flex items-center justify-center gap-2 mx-auto disabled:text-gray-400"
        >
          {loading ? "Sending Code..." : "Resend code"}
        </button>

        <p className="mt-8 text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-yellow-500" /> SECURE VERIFICATION
        </p>
      </div>

      {/* Success Modal for Resend */}
      {showModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl animate-in zoom-in duration-200">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Check Inbox</h3>
            <p className="text-gray-500 mb-8 text-sm leading-relaxed">A new verification code has been sent to your email address.</p>
            <button
              onClick={() => setShowModal(false)}
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