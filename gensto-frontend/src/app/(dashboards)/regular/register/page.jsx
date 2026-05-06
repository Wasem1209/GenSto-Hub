'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import Script from 'next/script';
import {
  CheckCircle, CreditCard, User, Globe, Loader2, Clock, Banknote
} from 'lucide-react';
import { REST_API } from '@/constant';

function RegisterForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const courseId = searchParams.get('course') || '';

  const [courseData, setCourseData] = useState(null);
  const [loadingCourse, setLoadingCourse] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    mode: 'distance',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (!courseId) return;
      try {
        const res = await fetch(`${REST_API}/v1/courses/${courseId}`);
        const data = await res.json();
        setCourseData(data);
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoadingCourse(false);
      }
    };
    fetchCourseDetails();
  }, [courseId]);

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

  //  PAYSTACK LOGIC START
  const handlePayment = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsProcessing(true);

    const handler = window.PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email: formData.email,
      amount: courseData.amount * 100,
      currency: 'NGN',
      callback: async (response) => {
        // This runs after successful payment
        try {

          const verifyRes = await fetch(`${REST_API}/v1/registrations/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              reference: response.reference,
              courseId: courseId,
              ...formData
            })
          });

          if (verifyRes.ok) {
            setShowSuccess(true);
          } else {
            alert("Payment verified but registration failed. Please contact support.");
          }
        } catch (err) {
          console.error("Verification error:", err);
        } finally {
          setIsProcessing(false);
        }
      },
      onClose: () => {
        setIsProcessing(false);
        alert("Transaction cancelled.");
      }
    });

    handler.openIframe();
  };
  //PAYSTACK LOGIC 

  if (loadingCourse) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white space-y-4">
        <Loader2 className="w-10 h-10 text-sky-500 animate-spin" />
        <p className="text-sky-500 font-black uppercase tracking-widest">Loading School Details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 flex mt-14 items-center justify-center relative font-sans">
      {/* Load Paystack SDK */}
      <Script src="https://js.paystack.co/v1/inline.js" strategy="beforeInteractive" />

      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 relative">
        <div className="bg-sky-500 p-10 text-white text-center">
          <h2 className="text-4xl font-extrabold tracking-tight">
            {courseData?.title || 'Gain Admission'}
          </h2>
          <p className="mt-2 text-sky-100 text-lg opacity-90">
            {courseData?.description || 'Start your journey with Inanst'}
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-bold flex items-center gap-2">
              <Banknote className="w-4 h-4" /> ₦{courseData?.amount?.toLocaleString()}
            </span>
          </div>
        </div>

        <form onSubmit={handlePayment} className="p-8 md:p-12 space-y-8">
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
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none bg-gray-50 focus:border-sky-400 transition font-bold text-sm"
                  value={formData.mode}
                  onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                >
                  <option value="distance">Distance Learning</option>
                  <option value="in-person">In-Person</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">School Duration</label>
                <div className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 flex items-center gap-2 text-gray-600 font-bold text-sm">
                  <Clock className="w-4 h-4 text-sky-500" />
                  {courseData?.duration || 'Not specified'}
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-sky-500 text-white font-black py-5 rounded-2xl shadow-xl shadow-sky-100 hover:bg-sky-600 active:scale-95 transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-3"
          >
            {isProcessing ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" />
                <span>Launching...</span>
              </>
            ) : (
              <>
                <CreditCard className="w-5 h-5" />
                <span>Pay ₦{courseData?.amount?.toLocaleString()} with Paystack</span>
              </>
            )}
          </button>
        </form>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-10 max-w-sm w-full text-center shadow-2xl">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">Welcome Aboard</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Your registration for <b>{courseData?.title}</b> is complete.
            </p>
            <button
              onClick={() => router.push('/')}
              className="w-full bg-sky-500 text-white font-black py-4 rounded-xl hover:bg-sky-600 transition"
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
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white text-sky-500 font-bold uppercase tracking-widest animate-pulse">Inanst EdTech...</div>}>
      <RegisterForm />
    </Suspense>
  );
}