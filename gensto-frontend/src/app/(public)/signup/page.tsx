'use client';
import { useState, FormEvent, useEffect, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { User as UserIcon, Mail, Lock, Loader2, ArrowRight, Phone, Globe, X, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { REST_API, countryCode } from '../../constant';

// Sub-component for live feedback
function RequirementItem({ label, met }: { label: string; met: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${met ? 'bg-green-500' : 'bg-gray-300'}`} />
      <span className={`text-[8px] uppercase font-bold tracking-tight transition-colors duration-300 ${met ? 'text-green-600' : 'text-gray-400'}`}>
        {label}
      </span>
    </div>
  );
}

export default function SignUp() {
  const { login } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  
  // Visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({ 
    fullName: '', 
    email: '', 
    phoneCode: '+234', 
    phoneNumber: '',
    country: '',
    password: '', 
    confirmPassword: '' 
  });

  // Track password strength in real-time
  const passwordRequirements = useMemo(() => ({
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    number: /\d/.test(formData.password),
    special: /[@$!%*?&]/.test(formData.password),
  }), [formData.password]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.fullName.trim()) return setError("Full name is required");
    if (!formData.email.includes('@')) return setError("Please enter a valid email");
    if (!formData.country) return setError("Please select your country");
    if (!formData.phoneNumber) return setError("Phone number is required");
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setError("Password requirements not met");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    const fullPhone = `${formData.phoneCode}${formData.phoneNumber}`;
    
    const submissionData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: fullPhone,
        country: formData.country,
        password: formData.password,
        confirmPassword: formData.confirmPassword 
    };

    try {
      const res = await fetch(`${REST_API}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });
      const data = await res.json();
      if (res.ok) {
        setShowOtpModal(true);
        setResendTimer(60);
      } else {
        setError(data.msg || 'Registration failed');
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Connection to server failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0) return;
    setLoading(true);
    try {
      const res = await fetch(`${REST_API}/auth/resend-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });
      if (res.ok) {
        setResendTimer(60);
        setError('');
      } else {
        const data = await res.json();
        setError(data.msg || "Failed to resend code");
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to resend code");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${REST_API}/auth/verify-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, code: otp }),
      });
      const data = await res.json();
      if (res.ok) {
        login(data.user);
        const role = data.user.role;
        if (role && role !== 'regular') {
            router.push(`/${role}`);
        } else {
            router.push('/regular');
        }
      } else {
        setError(data.msg || 'Invalid Code');
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignUp = (platform: string) => {
    window.location.href = `${REST_API}/auth/${platform}`;
  };

  return (
    <div className="min-h-screen mt-14 bg-gray-50 flex items-center justify-center p-4 sm:p-6 md:p-8 pt-24 font-sans text-gray-900">
      <div className="w-full max-w-md bg-white rounded-[1.5rem] sm:rounded-[2.5rem] shadow-xl p-6 sm:p-10 border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-black italic tracking-tighter text-gray-900">Create Account</h1>
          <p className="text-gray-500 mt-2 text-sm sm:text-base font-medium tracking-tight">
            Join the <span className="text-blue-600 font-bold">INANST</span> ecosystem today.
          </p>
        </div>

        {error && (
          <p className="text-red-500 text-[9px] font-black mb-4 text-center bg-red-50 py-2 px-4 rounded-lg tracking-widest uppercase animate-pulse leading-tight">
            {error}
          </p>
        )}

        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-8">
          <button type="button" onClick={() => handleSocialSignUp('google')} className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl sm:rounded-2xl hover:bg-gray-50 transition font-bold text-[9px] sm:text-[10px] text-gray-600 tracking-widest uppercase">
            <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-4 h-4" alt="Google" /> GOOGLE
          </button>
          <button type="button" onClick={() => handleSocialSignUp('facebook')} className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl sm:rounded-2xl hover:bg-gray-50 transition font-bold text-[9px] sm:text-[10px] text-gray-600 tracking-widest uppercase">
            <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="w-4 h-4" alt="Facebook" /> FACEBOOK
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div className="relative">
            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input required className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:border-blue-500 transition text-sm sm:text-base" placeholder="Full Name" onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
          </div>
          
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input required type="email" className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:border-blue-500 transition text-sm sm:text-base" placeholder="Email Address" onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>

          <div className="flex items-center bg-gray-50 border border-gray-100 rounded-xl sm:rounded-2xl overflow-hidden focus-within:border-blue-500 transition">
            <div className="relative flex items-center border-r border-gray-200">
              <Phone className="absolute left-3 text-gray-400 w-4 h-4 z-10" />
              <select 
                value={formData.phoneCode}
                className="pl-8 pr-2 py-3 sm:py-4 bg-transparent outline-none text-[10px] sm:text-xs appearance-none font-bold" 
                onChange={(e) => setFormData({...formData, phoneCode: e.target.value})}
              >
                {countryCode.map((c) => (
                  <option key={c.code} value={c.phoneCode}>{c.flagEmoji} {c.phoneCode}</option>
                ))}
              </select>
            </div>
            <input 
              required 
              type="tel" 
              placeholder="Phone Number" 
              className="flex-1 px-4 py-3 sm:py-4 bg-transparent outline-none text-sm sm:text-base" 
              onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})} 
            />
          </div>

          <div className="relative">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
            <select 
              required 
              className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:border-blue-500 transition text-xs sm:text-sm appearance-none" 
              onChange={(e) => setFormData({...formData, country: e.target.value})}
            >
              <option value="">Select Country</option>
              {countryCode.map((c) => (
                <option key={c.code} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              required 
              type={showPassword ? "text" : "password"} 
              className="w-full pl-12 pr-12 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:border-blue-500 transition text-sm sm:text-base" 
              placeholder="Password" 
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)} 
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              required 
              type={showConfirmPassword ? "text" : "password"} 
              className="w-full pl-12 pr-12 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:border-blue-500 transition text-sm sm:text-base" 
              placeholder="Confirm Password" 
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} 
            />
            <button 
              type="button" 
              onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Password Live Requirements Tracker */}
          <div className="px-2 grid grid-cols-2 gap-y-1.5 gap-x-4">
            <RequirementItem label="8+ Characters" met={passwordRequirements.length} />
            <RequirementItem label="An Uppercase" met={passwordRequirements.uppercase} />
            <RequirementItem label="A Number" met={passwordRequirements.number} />
            <RequirementItem label="A Symbol (@$!)" met={passwordRequirements.special} />
          </div>

          <button disabled={loading} className="w-full bg-blue-600 text-white font-black py-4 sm:py-5 rounded-xl sm:rounded-2xl shadow-lg shadow-blue-100 flex items-center justify-center gap-2 hover:bg-blue-700 transition active:scale-95 disabled:opacity-50 uppercase tracking-widest text-xs sm:text-sm">
            {loading ? <Loader2 className="animate-spin" /> : <>SIGN UP <ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>

        <p className="text-center mt-6 sm:mt-8 text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest leading-relaxed">
          ALREADY HAVE AN ACCOUNT? <Link href="/signin" className="text-blue-600 hover:underline">SIGN IN</Link>
        </p>
      </div>

      {showOtpModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6">
          <div className="bg-white max-w-sm w-full rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-10 relative animate-in zoom-in duration-200 shadow-2xl">
            <button onClick={() => setShowOtpModal(false)} className="absolute top-4 sm:top-6 right-4 sm:right-6 text-gray-400 hover:text-gray-900"><X /></button>
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight">Verify Email</h2>
              <p className="text-gray-500 text-xs sm:text-sm mt-2 font-medium">Enter the 6-digit code sent to your mail.</p>
              <form onSubmit={handleVerifyOtp} className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
                <input required maxLength={6} className="w-full text-center text-2xl sm:text-3xl font-black tracking-[0.5rem] sm:tracking-[1rem] py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-gray-50 border border-gray-200 outline-none focus:border-blue-500 transition" placeholder="000000" onChange={(e) => setOtp(e.target.value)} />
                <button disabled={loading} className="w-full bg-blue-600 text-white font-black py-3 sm:py-4 rounded-xl shadow-lg hover:bg-blue-700 transition uppercase tracking-widest text-[10px] sm:text-xs">
                  {loading ? <Loader2 className="animate-spin mx-auto" /> : "Verify & Continue"}
                </button>
              </form>
              <div className="mt-6">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Didn&apos;t get code?{' '}
                  {resendTimer > 0 ? (
                    <span className="text-blue-600 ml-1">Retry in {resendTimer}s</span>
                  ) : (
                    <button type="button" onClick={handleResendOtp} className="text-blue-600 hover:underline ml-1">Resend Now</button>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}