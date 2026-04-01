'use client';
import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

function LoginSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    const userString = searchParams.get('user');

    if (token && userString) {
      try {
        const user = JSON.parse(decodeURIComponent(userString));
        
        // Save to your AuthContext/localStorage
        login(user); 

        // Redirect logic based on role
        if (user.role === 'admin') {
          router.push('/admin');
        } else if (user.role === 'worker') {
          router.push('/worker');
        } else if (user.role === 'instructor') {
          router.push('/instructor');
        } else {
          router.push('/regular');
        }
      } catch (err) {
        console.error("Failed to parse user data:", err);
        router.push('/signin');
      }
    }
  }, [searchParams, login, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="font-bold animate-pulse">Completing login...</p>
    </div>
  );
}

export default function LoginSuccess() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="font-bold animate-pulse">Loading...</p>
        </div>
      }
    >
      <LoginSuccessContent />
    </Suspense>
  );
}