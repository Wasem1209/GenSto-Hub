'use client';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function SignUp() {
  const { login } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);

    // REST API CALL:
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, { ... });

    setTimeout(() => {
      login({ 
        name: formData.fullName, 
        email: formData.email, 
        role: 'student', 
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${formData.fullName}` 
      });
      setLoading(false);
      router.push('/dashboard');
    }, 2000);
  };

  const handleSocialSignUp = (platform: string) => {
    // This will redirect to your Node.js backend social auth route
    window.location.href = `http://localhost:5000/api/auth/${platform}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 pt-24 font-sans">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-xl p-10 border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-gray-900">Create Account</h1>
          <p className="text-gray-500 mt-2 font-medium tracking-tight">
            Join the <span className="text-blue-600 font-bold">INANST</span> ecosystem today.
          </p>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button 
            type="button"
            onClick={() => handleSocialSignUp('google')}
            className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-2xl hover:bg-gray-50 transition font-bold text-[10px] text-gray-600 tracking-widest"
          >
            <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-4 h-4" alt="Google" />
            GOOGLE
          </button>
          <button 
            type="button"
            onClick={() => handleSocialSignUp('facebook')}
            className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-2xl hover:bg-gray-50 transition font-bold text-[10px] text-gray-600 tracking-widest"
          >
            <img src="https://www.svgrepo.com/show/506499/facebook.svg" className="w-4 h-4" alt="Facebook" />
            FACEBOOK
          </button>
        </div>

        <div className="relative flex items-center mb-8">
          <div className="flex-grow border-t border-gray-100"></div>
          <span className="flex-shrink mx-4 text-gray-300 text-[10px] font-black uppercase tracking-widest">OR USE EMAIL</span>
          <div className="flex-grow border-t border-gray-100"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input required className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:border-blue-500 transition" placeholder="Full Name" onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
          </div>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input required type="email" className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:border-blue-500 transition" placeholder="Email Address" onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input required type="password" className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:border-blue-500 transition" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} />
          </div>

          <button disabled={loading} className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl shadow-lg shadow-blue-100 flex items-center justify-center gap-2 hover:bg-blue-700 transition active:scale-95 disabled:opacity-50 uppercase tracking-widest text-sm">
            {loading ? <Loader2 className="animate-spin" /> : <>SIGN UP <ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>

        <p className="text-center mt-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">
          ALREADY HAVE AN ACCOUNT? <Link href="/signin" className="text-blue-600 hover:underline">SIGN IN</Link>
        </p>
      </div>
    </div>
  );
}