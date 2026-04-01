'use client';
import { useState, FormEvent } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Loader2, LogIn } from 'lucide-react';
import Link from 'next/link';
import { REST_API } from '../../constant';

export default function SignIn() {
    const { login } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch(`${REST_API}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (res.ok) {
                login(data.user);
                router.push('/regular');
            } else {
                setError(data.msg || 'Login failed');
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setError('Connection error');
        } finally {
            setLoading(false);
        }
    };

    const handleSocialLogin = (platform: string) => {
        window.location.href = `${REST_API}/auth/${platform}`;
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 pt-24 font-sans text-gray-900">
            <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-xl p-10 border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black">Welcome Back</h1>
                    <p className="text-gray-500 mt-2 font-medium tracking-tight">Log in to your <span className="text-blue-600 font-bold">INANST</span> dashboard.</p>
                </div>

                {error && <p className="text-red-500 text-[10px] font-black mb-4 text-center bg-red-50 py-2 rounded-lg tracking-widest uppercase">{error}</p>}

                <div className="grid grid-cols-2 gap-4 mb-8">
                    <button type="button" onClick={() => handleSocialLogin('google')} className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-2xl hover:bg-gray-50 transition font-bold text-[10px] text-gray-600 tracking-widest uppercase">
                        <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-4 h-4" alt="Google" /> GOOGLE
                    </button>
                    <button type="button" onClick={() => handleSocialLogin('facebook')} className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-2xl hover:bg-gray-50 transition font-bold text-[10px] text-gray-600 tracking-widest uppercase">
                        <img src="https://www.svgrepo.com/show/506499/facebook.svg" className="w-4 h-4" alt="Facebook" /> FACEBOOK
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input required type="email" className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:border-blue-500 transition" placeholder="Email Address" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input required type="password" title="Password" className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:border-blue-500 transition" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                    </div>

                    <button disabled={loading} className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl shadow-lg shadow-blue-100 flex items-center justify-center gap-2 hover:bg-blue-700 transition active:scale-95 disabled:opacity-50 uppercase tracking-widest text-sm">
                        {loading ? <Loader2 className="animate-spin" /> : <>SIGN IN <LogIn className="w-4 h-4" /></>}
                    </button>
                </form>

                <p className="text-center mt-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    NEW TO INANST? <Link href="/signup" className="text-blue-600 hover:underline">CREATE ACCOUNT</Link>
                </p>
            </div>
        </div>
    );
}