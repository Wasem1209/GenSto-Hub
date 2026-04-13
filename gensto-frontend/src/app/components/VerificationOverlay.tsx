'use client';

import React, { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { REST_API } from '../constant';

export default function VerificationOverlay() {
  const { user, login } = useAuth(); // Assuming login updates the user state in context
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  // 1. Handle the OTP Verification
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length < 6) return setError("Please enter the full 6-digit code");
    
    setVerifying(true);
    setError('');
    
    try {
      const res = await fetch(`${REST_API}/auth/verify-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user?.email, code })
      });

      const data = await res.json();

      if (res.ok) {
        // This updates the local AuthContext. 
        // Once user.isVerified becomes true, this overlay will unmount automatically.
        login(data.token, data.user); 
      } else {
        setError(data.msg || "Invalid verification code");
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Connection failed. Try again.");
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${REST_API}/auth/resend-verification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user?.email })
      });

      if (res.ok) {
        setShowModal(true);
      } else {
        const errorData = await res.json();
        setError(errorData.msg || "Error resending email");
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Connection failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/10 backdrop-blur-md px-4">
      <div className="bg-white rounded-[40px] p-10 max-w-lg w-full text-center shadow-2xl border border-gray-100">
        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
           <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
           </svg>
        </div>

        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Final Step!</h2>
        <p className="text-gray-500 text-lg">Enter the 6-digit code sent to:</p>
        <p className="font-bold text-gray-900 mb-6">{user?.email}</p>

        {/* --- NEW CODE INPUT SECTION --- */}
        <form onSubmit={handleVerify} className="mb-6">
          <input 
            type="text"
            maxLength={6}
            placeholder="000000"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} // Only allow numbers
            className="w-full text-center text-3xl tracking-[10px] font-mono py-4 border-2 border-gray-100 rounded-2xl focus:border-blue-500 focus:outline-none mb-4"
          />
          
          {error && <p className="text-red-500 text-sm mb-4 font-medium">{error}</p>}

          <button 
            type="submit"
            disabled={verifying || code.length < 6}
            className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-2xl transition-all active:scale-95 disabled:opacity-50"
          >
            {verifying ? "VERIFYING..." : "VERIFY ACCOUNT"}
          </button>
        </form>

        <button 
          onClick={handleResend}
          disabled={loading}
          className="w-full bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all disabled:opacity-70"
        >
          {loading ? "SENDING..." : "RESEND NEW CODE"}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <p className="mt-8 text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center justify-center gap-2">
          <span className="text-yellow-500 text-sm">🛡️</span> FEATURE ACCESS RESTRICTED
        </p>
      </div>

      {/* SUCCESS MODAL (for resend confirmation) */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Code Sent!</h3>
            <p className="text-gray-500 mb-8">Check your inbox for a new 6-digit verification code.</p>
            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-gray-900 text-white font-semibold py-3 rounded-xl hover:bg-gray-800 transition-colors"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}