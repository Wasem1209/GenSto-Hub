'use client';
import { useState, FormEvent, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Loader2, LogIn, Eye, EyeOff } from 'lucide-react';
import { signIn, useSession } from 'next-auth/react'; 
import Link from 'next/link';
import { REST_API } from '../../constant';

interface GoogleUser {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: "regular" | "admins" | "instructors" | "workers";
}

export default function SignInClient() {
    const { login } = useAuth();
    const router = useRouter();
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State for visibility toggle
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({ email: '', password: '' });

    useEffect(() => {
        if (status === 'authenticated' && session?.user) {
            const googleUser = session.user as GoogleUser;
            const userToLogin = {
                id: googleUser.id,
                name: googleUser.name || '',
                email: googleUser.email || '',
                role: googleUser.role || 'regular',
                isVerified: true 
            };

            login('google-session', userToLogin);
            const targetRole = googleUser.role || 'regular';
            router.push(targetRole === 'regular' ? '/regular' : `/${targetRole}`);
        }
    }, [status, session, login, router]);

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
                login(data.token, data.user);
                router.push(data.user.role === 'regular' ? '/regular' : `/${data.user.role}`);
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

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 pt-24 font-sans text-gray-900">
            <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-xl p-10 border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black italic tracking-tighter">Welcome Back</h1>
                    <p className="text-gray-500 mt-2 font-medium tracking-tight">Log in to your <span className="text-blue-600 font-bold">INANST</span> dashboard.</p>
                </div>

                {error && <p className="text-red-500 text-[10px] font-black mb-4 text-center bg-red-50 py-2 rounded-lg tracking-widest uppercase">{error}</p>}

                <div className="mb-8">
                    <button 
                        type="button" 
                        disabled={status === 'loading'}
                        onClick={() => signIn('google')} 
                        className="w-full flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-2xl hover:bg-gray-50 transition font-bold text-[10px] text-gray-600 tracking-widest uppercase disabled:opacity-50"
                    >
                        {status === 'loading' ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <>
                                <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-4 h-4" alt="Google" /> 
                                CONTINUE WITH GOOGLE
                            </>
                        )}
                    </button>
                </div>

                <div className="relative mb-8 text-center">
                    <hr className="border-gray-100" />
                    <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-[10px] font-bold text-gray-300 uppercase tracking-widest">Or login with email</span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input required type="email" className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:border-blue-500 transition text-sm" placeholder="Email Address" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input 
                            required 
                            type={showPassword ? "text" : "password"} 
                            title="Password" 
                            className="w-full pl-12 pr-12 py-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:border-blue-500 transition text-sm" 
                            placeholder="Password" 
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>

                    <button disabled={loading || status === 'loading'} className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl shadow-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition active:scale-95 disabled:opacity-50 uppercase tracking-widest text-sm">
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