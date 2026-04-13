'use client';

import React, { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { REST_API } from '../constant';

export default function VerificationOverlay() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleResend = async () => {
    setLoading(true);
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
        console.error("Error resending email:", errorData.message);
      }
    } catch (err) {
      console.error("Connection failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/10 backdrop-blur-md px-4">
      {/* THE MAIN CARD */}
      <div className="bg-white rounded-[40px] p-10 max-w-lg w-full text-center shadow-2xl">
        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
           <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
           </svg>
        </div>

        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Final Step!</h2>
        <p className="text-gray-500 text-lg">Verify your email to unlock your dashboard and</p>
        <p className="text-gray-500 text-lg mb-1">start using <span className="text-blue-600 font-bold">INANST</span>.</p>
        <p className="font-bold text-gray-900 mb-8 mt-2">{user?.email}</p>

        <button 
          onClick={handleResend}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-70"
        >
          {loading ? "SENDING..." : "SEND ME A NEW LINK"}
          <svg className="w-5 h-5 rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <p className="mt-8 text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center justify-center gap-2">
          <span className="text-yellow-500 text-sm">🛡️</span> FEATURE ACCESS RESTRICTED
        </p>
      </div>

      {/* SUCCESS MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl scale-in-center">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Check your Inbox!</h3>
            <p className="text-gray-500 mb-8">Verification link sent to <br /><span className="font-semibold text-gray-800">{user?.email}</span></p>
            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-gray-900 text-white font-semibold py-3 rounded-xl hover:bg-gray-800 transition-colors"
            >
              Got it, thanks!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}