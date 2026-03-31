'use client';
import { useState, FormEvent } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { User as UserIcon, Mail, Lock, Loader2, ArrowRight, Phone, Globe, X } from 'lucide-react';
import Link from 'next/link';
import { REST_API, countryCode } from '../../constant';

export default function SignUp() {
  const { login } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({ 
    fullName: '', 
    email: '', 
    phoneCode: '+234', 
    phoneNumber: '',
    country: '',
    password: '', 
    confirmPassword: '' 
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // --- Strict Validation ---
    if (!formData.fullName.trim()) return setError("Full name is required");
    if (!formData.email.includes('@')) return setError("Please enter a valid email");
    if (!formData.country) return setError("Please select your country");
    if (!formData.phoneNumber) return setError("Phone number is required");
    
    // Password standard validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    if (!passwordRegex.test(formData.password)) {
      setError("Password needs: 8+ chars, Uppercase, Lowercase, Number, & Special Char (@$!%*?&)");
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    const fullPhone = `${formData.phoneCode}${formData.phoneNumber}`;
    
    // UPDATED: Now sending confirmPassword so the backend validation passes
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
        router.push('/dashboard');
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 pt-24 font-sans text-gray-900">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-xl p-10 border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black italic tracking-tighter">Create Account</h1>
          <p className="text-gray-500 mt-2 font-medium tracking-tight">
            Join the <span className="text-blue-600 font-bold">INANST</span> ecosystem today.
          </p>
        </div>

        {error && (
          <p className="text-red-500 text-[9px] font-black mb-4 text-center bg-red-50 py-2 px-4 rounded-lg tracking-widest uppercase animate-pulse leading-tight">
            {error}
          </p>
        )}

        <div className="grid grid-cols-2 gap-4 mb-8">
          <button type="button" onClick={() => handleSocialSignUp('google')} className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-2xl hover:bg-gray-50 transition font-bold text-[10px] text-gray-600 tracking-widest uppercase">
            <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-4 h-4" alt="Google" /> GOOGLE
          </button>
          <button type="button" onClick={() => handleSocialSignUp('facebook')} className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-2xl hover:bg-gray-50 transition font-bold text-[10px] text-gray-600 tracking-widest uppercase">
            <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="w-4 h-4" alt="Facebook" /> FACEBOOK
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input required className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:border-blue-500 transition" placeholder="Full Name" onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
          </div>
          
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input required type="email" className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:border-blue-500 transition" placeholder="Email Address" onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>

          <div className="flex gap-2">
            <div className="relative w-[110px]">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
              <select 
                value={formData.phoneCode}
                className="w-full pl-8 pr-2 py-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:border-blue-500 transition text-xs appearance-none" 
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
              placeholder="Number" 
              className="flex-1 px-4 py-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:border-blue-500 transition" 
              onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})} 
            />
          </div>

          <div className="relative">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
            <select 
              required 
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:border-blue-500 transition text-sm appearance-none" 
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
            <input required type="password" className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:border-blue-500 transition" placeholder="Password (A@1abc...)" onChange={(e) => setFormData({...formData, password: e.target.value})} />
          </div>
          
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input required type="password" className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:border-blue-500 transition" placeholder="Confirm Password" onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} />
          </div>

          <button disabled={loading} className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl shadow-lg shadow-blue-100 flex items-center justify-center gap-2 hover:bg-blue-700 transition active:scale-95 disabled:opacity-50 uppercase tracking-widest text-sm">
            {loading ? <Loader2 className="animate-spin" /> : <>SIGN UP <ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>

        <p className="text-center mt-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">
          ALREADY HAVE AN ACCOUNT? <Link href="/signin" className="text-blue-600 hover:underline">SIGN IN</Link>
        </p>
      </div>

      {showOtpModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6">
          <div className="bg-white max-w-sm w-full rounded-[2rem] p-10 relative animate-in zoom-in duration-200 shadow-2xl">
            <button onClick={() => setShowOtpModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900"><X /></button>
            <div className="text-center">
              <h2 className="text-2xl font-black tracking-tight">Verify Email</h2>
              <p className="text-gray-500 text-sm mt-2 font-medium">Enter the 6-digit code sent to your mail.</p>
              <form onSubmit={handleVerifyOtp} className="mt-8 space-y-6">
                <input required maxLength={6} className="w-full text-center text-3xl font-black tracking-[1rem] py-4 rounded-2xl bg-gray-50 border border-gray-200 outline-none focus:border-blue-500 transition" placeholder="000000" onChange={(e) => setOtp(e.target.value)} />
                <button disabled={loading} className="w-full bg-blue-600 text-white font-black py-4 rounded-xl shadow-lg hover:bg-blue-700 transition uppercase tracking-widest text-xs">
                  {loading ? <Loader2 className="animate-spin mx-auto" /> : "Verify & Continue"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}