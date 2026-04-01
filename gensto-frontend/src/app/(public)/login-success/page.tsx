'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

export default function LoginSuccess() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useAuth();

    useEffect(() => {
        const token = searchParams.get('token');
        const userString = searchParams.get('user');

        if (token && userString) {
            const user = JSON.parse(decodeURIComponent(userString));
            
            // Save to your AuthContext/localStorage
            login(user); 

            // Handle the same redirect logic as your manual Sign In
            if (user.role === 'admin') router.push('/admin');
            else if (user.role === 'worker') router.push('/worker');
            else if (user.role === 'instructor') router.push('/instructor');
            else router.push('/regular');
        }
    }, [searchParams, login, router]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="font-bold animate-pulse">Completing login...</p>
        </div>
    );
}