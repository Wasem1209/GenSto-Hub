'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { API_ROUTES } from '../constant'; 

interface BackendUser {
  _id: string;
  name: string;
  email: string;
  role: "regular" | "instructors" | "workers" | "admins";
  isVerified: boolean;
  phone?: string;
  country?: string;
  fullName?: string; 
}

interface User {
  id: string;
  name: string;
  email: string;
  role: "regular" | "instructors" | "workers" | "admins";
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
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('user_data');
      try {
        return savedUser ? JSON.parse(savedUser) : null;
      } catch { 
        // Omitted the variable entirely to fix ESLint 'unused-vars'
        return null;
      }
    }
    return null;
  });

  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  });

  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_data');
    setToken(null);
    setUser(null);
    setLoading(false);
  }, []);

  const checkAuth = useCallback(async () => {
    const storedToken = localStorage.getItem('token');
    
    if (!storedToken) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(API_ROUTES.PROFILE, {
        headers: { 
          'Authorization': `Bearer ${storedToken}`,
          'Content-Type': 'application/json'
        },
      });

      if (res.ok) {
        const userData: BackendUser = await res.json();
        const mappedUser: User = {
          id: userData._id,
          name: userData.name || userData.fullName || 'User',
          email: userData.email,
          role: userData.role,
          isVerified: userData.isVerified,
        };
        
        setToken(storedToken);
        setUser(mappedUser);
        localStorage.setItem('user_data', JSON.stringify(mappedUser));
      } else {
        if (res.status === 401) {
          const savedUser = localStorage.getItem('user_data');
          const parsedUser = savedUser ? (JSON.parse(savedUser) as User) : null;
          
          if (!parsedUser || parsedUser.isVerified) {
             logout();
          }
        }
      }
    } catch (err) {
      console.error("Connection to Auth API failed", err);
    } finally {
      setLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = useCallback((newToken: string, newUser: User) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('user_data', JSON.stringify(newUser));
    
    setToken(newToken);
    setUser(newUser);
    setLoading(false); 
  }, []);

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