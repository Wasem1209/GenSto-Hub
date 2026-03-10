'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import {
  CheckCircle, CreditCard, ChevronDown, GraduationCap,
  User, Mail, Phone, Globe, Loader2, AlertCircle, Timer
} from 'lucide-react';

function RegisterForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedCourse = searchParams.get('course') || '';

  const [showSuccess, setShowSuccess] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [countdown, setCountdown] = useState(600);

  const initialFormState = {
    fullName: '',
    email: '',
    phone: '',
    course: selectedCourse,
    level: 'beginner',
    mode: 'distance',
    paymentMethod: 'card',
    cardNumber: '',
    expiry: '',
    cvv: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    let timer;
    if (showPaymentModal && formData.paymentMethod === 'transfer' && countdown > 0) {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [showPaymentModal, formData.paymentMethod, countdown]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const validate = () => {
    let newErrors = {};
    if (formData.fullName.trim().split(' ').length < 2) {
      newErrors.fullName = "Full name (First & Last) is required.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address.";
    }
    if (formData.phone.length < 10) {
      newErrors.phone = "Invalid phone number.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInitialSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setShowPaymentModal(true);
    }
  };

  const handleFinalPayment = async () => {
    setIsProcessing(true);

    try {
      /* BACKEND INTEGRATION POINT:
         const response = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify(formData)
         });
      */

      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 2500));

      setIsProcessing(false);
      setShowPaymentModal(false);
      setShowSuccess(true);
    } catch (error) {
      setIsProcessing(false);
      alert("Payment failed. Please try again.");
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setFormData(initialFormState);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 flex mt-14 items-center justify-center relative font-sans">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 relative">

        {/* Admission Status */}
        <div className="absolute top-6 right-6 z-20">
          <span className="flex items-center gap-1.5 bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest animate-pulse">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Running
          </span>
        </div>

        <div className="bg-sky-500 p-10 text-white text-center">
          <h2 className="text-4xl font-extrabold tracking-tight">Gain Admission</h2>
          <p className="mt-2 text-sky-100 text-lg opacity-90">Start your journey with Inanst</p>
        </div>

        <form onSubmit={handleInitialSubmit} className="p-8 md:p-12 space-y-8">

          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 border-b pb-2">
              <User className="w-5 h-5 text-sky-500" /> Personal Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Full Name</label>
                <input
                  required
                  className={`w-full px-4 py-3 rounded-xl border ${errors.fullName ? 'border-red-500' : 'border-gray-200'} outline-none bg-gray-50 focus:border-sky-400 transition`}
                  placeholder="e.g. Isaac Newton"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
                {errors.fullName && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.fullName}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Email</label>
                <input
                  required
                  type="email"
                  className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-200'} outline-none bg-gray-50 focus:border-sky-400 transition`}
                  placeholder="hello@inansto.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {errors.email && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.email}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Phone Number</label>
                <input
                  required
                  type="tel"
                  className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500' : 'border-gray-200'} outline-none bg-gray-50 focus:border-sky-400 transition`}
                  placeholder="+234..."
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 border-b pb-2">
              <Globe className="w-5 h-5 text-sky-500" /> Preferences
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Learning Method</label>
                <select
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none bg-gray-50 focus:border-sky-400 transition"
                  value={formData.mode}
                  onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                >
                  <option value="distance">Distance Learning</option>
                  <option value="in-person">In-Person</option>
                </select>
                <div className="mt-2">
                  {formData.mode === 'distance' ? (
                    <span className="text-green-600 text-[10px] font-black flex items-center gap-1 uppercase tracking-tighter">
                      <CheckCircle className="w-3 h-3" /> Available Worldwide
                    </span>
                  ) : (
                    <span className="text-orange-500 text-[10px] font-black flex items-center gap-1 uppercase tracking-tighter">
                      <AlertCircle className="w-3 h-3" /> Coming soon to your region!
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Skill Level</label>
                <div className="flex bg-gray-100 p-1 rounded-xl">
                  {['beginner', 'intermediate', 'advance'].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setFormData({ ...formData, level: lvl })}
                      className={`flex-1 py-2 text-[10px] font-black rounded-lg transition-all capitalize ${formData.level === lvl ? 'bg-white text-sky-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'
                        }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-xs font-bold text-gray-400 uppercase">Payment Method</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                className={`p-4 border-2 rounded-2xl flex flex-col items-center gap-1 transition ${formData.paymentMethod === 'card' ? 'border-sky-500 bg-sky-50' : 'border-gray-100 hover:bg-gray-50'}`}
              >
                <CreditCard className={`w-6 h-6 ${formData.paymentMethod === 'card' ? 'text-sky-500' : 'text-gray-300'}`} />
                <span className="font-bold text-xs text-gray-700">Bank Card</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, paymentMethod: 'transfer' })}
                className={`p-4 border-2 rounded-2xl flex flex-col items-center gap-1 transition ${formData.paymentMethod === 'transfer' ? 'border-sky-500 bg-sky-50' : 'border-gray-100 hover:bg-gray-50'}`}
              >
                <Loader2 className={`w-6 h-6 ${formData.paymentMethod === 'transfer' ? 'text-sky-500' : 'text-gray-300'}`} />
                <span className="font-bold text-xs text-gray-700">Bank Transfer</span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-sky-500 text-white font-black py-5 rounded-2xl shadow-xl shadow-sky-100 hover:bg-sky-600 active:scale-95 transition-all uppercase tracking-widest text-sm"
          >
            Continue to Payment
          </button>
        </form>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
            {formData.paymentMethod === 'card' ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b pb-4">
                  <h3 className="text-xl font-black text-gray-800">Card Payment</h3>
                  <div className="flex gap-2">
                    <div className="w-8 h-5 bg-gray-200 rounded" />
                    <div className="w-8 h-5 bg-gray-300 rounded" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Card Number</label>
                    <input
                      className="w-full px-4 py-3 border rounded-xl outline-none focus:border-sky-400"
                      placeholder="0000 0000 0000 0000"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Expiry</label>
                      <input
                        className="w-full px-4 py-3 border rounded-xl outline-none focus:border-sky-400"
                        placeholder="MM/YY"
                        value={formData.expiry}
                        onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase">CVV</label>
                      <input
                        className="w-full px-4 py-3 border rounded-xl outline-none focus:border-sky-400"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <h3 className="text-xl font-black text-gray-800 tracking-tight">Bank Transfer</h3>
                <div className="bg-sky-50 p-6 rounded-2xl border-2 border-dashed border-sky-200">
                  <p className="text-[10px] text-sky-600 font-black uppercase mb-1">Inansto Virtual Account</p>
                  <p className="text-3xl font-black text-sky-900 tracking-widest">0987654321</p>
                  <div className="mt-4 pt-4 border-t border-sky-100">
                    <p className="text-xs font-bold text-gray-500">Bank: Providus Bank</p>
                    <p className="text-xs font-bold text-gray-500 uppercase mt-1">Name: INANSTO-TECH-ACADEMY</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 text-red-500 font-bold text-xs py-2">
                  <Timer className="w-4 h-4" />
                  <span>SESSION EXPIRES IN: {formatTime(countdown)}</span>
                </div>
              </div>
            )}

            <button
              disabled={isProcessing}
              onClick={handleFinalPayment}
              className="w-full mt-6 bg-gray-900 text-white font-black py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-black transition disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" />
                  <span>VERIFYING...</span>
                </>
              ) : (
                <span>CONFIRM & PAY NOW</span>
              )}
            </button>

            <button
              onClick={() => setShowPaymentModal(false)}
              className="w-full mt-2 text-gray-400 text-xs font-bold py-2 hover:text-gray-600"
            >
              CANCEL
            </button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-10 max-w-sm w-full text-center shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 scale-110">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">Welcome Aboard!</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 font-medium">
              Your registration is complete. A confirmation receipt has been sent to <span className="text-sky-600 font-bold">{formData.email}</span>.
            </p>
            <button
              onClick={handleCloseSuccess}
              className="w-full bg-sky-500 text-white font-black py-4 rounded-xl shadow-lg shadow-sky-100 hover:bg-sky-600 transition"
            >
              FINISH
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function RegistrationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white text-sky-500 font-bold uppercase tracking-widest animate-pulse">Inansto Academy...</div>}>
      <RegisterForm />
    </Suspense>
  );
}