// gensto-frontend/src/app/context/AuthContext.tsx
'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession, signOut } from 'next-auth/react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'regular' | 'instructor' | 'worker' | 'admin';
  avatar?: string;
  emailVerified: boolean;
}

interface CustomSessionUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  id: string;
  role: 'regular' | 'instructor' | 'worker' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') {
      setLoading(true);
    } else if (status === 'authenticated' && session?.user) {
      const sessionUser = session.user as CustomSessionUser;

      setUser({
        id: sessionUser.id,
        name: sessionUser.name || '',
        email: sessionUser.email || '',
        role: sessionUser.role || 'regular',
        avatar: sessionUser.image || '',
        emailVerified: true,
      });
      setLoading(false);
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [session, status]);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = async () => {
    setUser(null);
    await signOut({ callbackUrl: '/signin' });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};