'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import Script from 'next/script';
import { CheckCircle, CreditCard, User, Globe, Loader2, Clock, Banknote, AlertCircle } from 'lucide-react';
import { REST_API } from '../../../constant';

function RegisterForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const schoolId = searchParams.get('course') || searchParams.get('school');

  const [schoolData, setSchoolData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [paystackLoaded, setPaystackLoaded] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    mode: 'distance',
  });

  useEffect(() => {
    const fetchSchool = async () => {
      if (!schoolId) {
        setError("No School ID found in the URL.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${REST_API}/schools/${schoolId}`);
        const result = await res.json();
        const school = result.data || result;

        if (!school || !school.title) {
          throw new Error("School not found");
        }

        setSchoolData(school);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Could not load school information.");
      } finally {
        setLoading(false);
      }
    };

    fetchSchool();
  }, [schoolId]);

  const handlePayment = (e) => {
    e.preventDefault();


    if (!window.PaystackPop) {
      alert("Payment gateway is still loading. Please wait a moment.");
      return;
    }

    if (!schoolData || isProcessing) return;

    setIsProcessing(true);

    const amountInKobo = Math.round(Number(schoolData.price) * 100);

    try {
      const handler = window.PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
        email: formData.email,
        amount: amountInKobo,
        currency: 'NGN',
        metadata: {
          schoolId: schoolData._id,
          schoolTitle: schoolData.title
        },
        callback: async (response) => {
          try {
            const verifyRes = await fetch(`${REST_API}/registrations/verify`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                reference: response.reference,
                schoolId: schoolData._id,
                ...formData
              })
            });

            if (verifyRes.ok) setShowSuccess(true);
            else alert("Payment verified but registration failed. Please contact support.");
          } catch (err) {
            console.error("Verification error:", err);
          } finally {
            setIsProcessing(false);
          }
        },
        onClose: () => setIsProcessing(false)
      });

      handler.openIframe();
    } catch (err) {
      console.error("Paystack error:", err);
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white space-y-4">
        <Loader2 className="w-10 h-10 text-sky-500 animate-spin" />
        <p className="text-sky-500 font-bold tracking-widest uppercase">Fetching School...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-gray-800">{error}</h2>
        <button onClick={() => router.back()} className="mt-4 text-sky-500 font-bold underline">Go Back</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 flex mt-14 items-center justify-center font-sans">

      <Script
        src="https://js.paystack.co/v1/inline.js"
        strategy="lazyOnload"
        onLoad={() => setPaystackLoaded(true)}
      />

      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-sky-500 p-10 text-white text-center">
          <h2 className="text-4xl font-extrabold tracking-tight uppercase">{schoolData.title}</h2>
          <div className="mt-4 flex justify-center gap-4">
            <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-bold flex items-center gap-2">
              <Banknote className="w-4 h-4" /> ₦{schoolData.price?.toLocaleString()}
            </span>
            <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-bold flex items-center gap-2">
              <Clock className="w-4 h-4" /> {schoolData.duration}
            </span>
          </div>
        </div>

        <form onSubmit={handlePayment} className="p-8 md:p-12 space-y-8">
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 border-b pb-2">
              <User className="w-5 h-5 text-sky-500" /> Personal Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Full Name</label>
                <input
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none bg-gray-50 focus:border-sky-400 font-medium"
                  placeholder="Isaac Newton"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Email Address</label>
                <input
                  required
                  type="email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none bg-gray-50 focus:border-sky-400 font-medium"
                  placeholder="hello@inanst.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Phone Number</label>
                <input
                  required
                  type="tel"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none bg-gray-50 focus:border-sky-400 font-medium"
                  placeholder="08012345678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 border-b pb-2">
              <Globe className="w-5 h-5 text-sky-500" /> Learning Preferences
            </h3>
            <select
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:border-sky-400 font-bold text-sm"
              value={formData.mode}
              onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
            >
              <option value="distance">Distance Learning</option>

            </select>
          </div>

          <button
            type="submit"
            disabled={isProcessing || !paystackLoaded}
            className="w-full bg-sky-500 text-white font-black py-5 rounded-2xl shadow-xl hover:bg-sky-600 active:scale-95 transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-3 disabled:bg-gray-300"
          >
            {isProcessing ? <Loader2 className="animate-spin w-5 h-5" /> : <CreditCard className="w-5 h-5" />}
            <span>{isProcessing ? "Processing..." : `Enroll for ₦${schoolData.price?.toLocaleString()}`}</span>
          </button>
        </form>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-10 max-w-sm w-full text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h3 className="text-2xl font-black mb-2">Registration Successful</h3>
            <p className="text-gray-500 mb-8">You have been enrolled in {schoolData.title}.</p>
            <button onClick={() => router.push('/regular')} className="w-full bg-sky-500 text-white font-black py-4 rounded-xl">GO TO DASHBOARD</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function RegistrationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-sky-500 font-bold uppercase tracking-widest animate-pulse">Loading Application...</div>}>
      <RegisterForm />
    </Suspense>
  );
}

/*
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import Script from 'next/script';
import { CheckCircle, CreditCard, User, Globe, Loader2, Clock, Banknote } from 'lucide-react';
import { REST_API } from '../../../constant';

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
        // Fetching from the schools collection
        const res = await fetch(`${REST_API}/schools/${courseId}`);
        const result = await res.json();
        setCourseData(result.data);
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

  const handlePayment = (e) => {
    e.preventDefault();
    if (!validate() || !courseData) return;

    setIsProcessing(true);

    // Parse the price string (e.g., "₦45,000" -> 45000)
    const cleanAmount = Number(courseData.price.replace(/[^0-9.-]+/g, ""));

    const handler = window.PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email: formData.email,
      amount: cleanAmount * 100, // Paystack works in kobo
      currency: 'NGN',
      metadata: { courseId, mode: formData.mode },
      callback: async (response) => {
        try {
          const verifyRes = await fetch(`${REST_API}/registrations/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              reference: response.reference,
              courseId: courseId,
              ...formData
            })
          });

          if (verifyRes.ok) setShowSuccess(true);
          else alert("Verification failed. Contact support.");
        } catch (err) {
          console.error("Verification error:", err);
        } finally {
          setIsProcessing(false);
        }
      },
      onClose: () => setIsProcessing(false)
    });

    handler.openIframe();
  };

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
      <Script src="https://js.paystack.co/v1/inline.js" strategy="beforeInteractive" />

      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-sky-500 p-10 text-white text-center">
          <h2 className="text-4xl font-extrabold tracking-tight">{courseData?.title}</h2>
          <div className="mt-4 flex justify-center gap-4">
            <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-bold flex items-center gap-2">
              <Banknote className="w-4 h-4" /> {courseData?.price}
            </span>
            <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-bold flex items-center gap-2">
              <Clock className="w-4 h-4" /> {courseData?.duration}
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
                  required className={`w-full px-4 py-3 rounded-xl border ${errors.fullName ? 'border-red-500' : 'border-gray-200'} outline-none bg-gray-50 focus:border-sky-400`}
                  placeholder="Isaac Newton"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Email</label>
                <input
                  required type="email"
                  className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-200'} outline-none bg-gray-50 focus:border-sky-400`}
                  placeholder="hello@inanst.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Phone Number</label>
                <input
                  required type="tel"
                  className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500' : 'border-gray-200'} outline-none bg-gray-50 focus:border-sky-400`}
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
            <div className="flex flex-col gap-2">
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Learning Method</label>
              <select
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:border-sky-400 font-bold text-sm"
                value={formData.mode}
                onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
              >
                <option value="distance">Distance Learning</option>
                <option value="in-person">In-Person</option>
              </select>
            </div>
          </div>

          <button
            type="submit" disabled={isProcessing}
            className="w-full bg-sky-500 text-white font-black py-5 rounded-2xl shadow-xl hover:bg-sky-600 active:scale-95 transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-3"
          >
            {isProcessing ? <Loader2 className="animate-spin w-5 h-5" /> : <CreditCard className="w-5 h-5" />}
            <span>{isProcessing ? "Processing..." : `Pay ${courseData?.price}`}</span>
          </button>
        </form>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-10 max-w-sm w-full text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h3 className="text-2xl font-black mb-2">Success!</h3>
            <p className="text-gray-500 mb-8">Registration for {courseData?.title} is complete.</p>
            <button onClick={() => router.push('/')} className="w-full bg-sky-500 text-white font-black py-4 rounded-xl">FINISH</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function RegistrationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-sky-500 font-bold uppercase tracking-widest animate-pulse">Loading...</div>}>
      <RegisterForm />
    </Suspense>
  );
}
*/