'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { REST_API } from '../constant';

interface User {
  id: string;
  name: string;
  email: string;
  role: "regular" | "admins" | "instructors" | "workers";
  isVerified: boolean; 
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setLoading(false);
  }, []);

  const checkAuth = useCallback(async () => {
    const storedToken = localStorage.getItem('token');
    
    // If no token, we aren't logged in via email/password
    if (!storedToken) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${REST_API}/auth/me`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      if (res.ok) {
        const userData = await res.json();
        setToken(storedToken);
        setUser({
          ...userData,
          id: userData._id || userData.id,
        });
      } else {
        logout();
      }
    } catch (err) {
      console.error("Auth verification failed", err);
      logout();
    } finally {
      setLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = (newToken: string, newUser: User) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(newUser);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};