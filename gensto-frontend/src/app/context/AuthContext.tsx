'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { API_ROUTES } from '../constant'; 

// Matches your Backend UserSchema exactly
interface BackendUser {
  _id: string;
  name: string;
  email: string;
  role: "regular" | "instructors" | "workers" | "admins";
  isVerified: boolean;
  phone?: string;
  country?: string;
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
        setToken(storedToken);
        
        setUser({
          id: userData._id,
          name: userData.name, // Matches 'name' in your UserSchema
          email: userData.email,
          role: userData.role,
          isVerified: userData.isVerified,
        });
      } else {
        // Log details to help you see if it's a 404 (Route) or 401 (Token)
        console.warn(`Auth failed: Status ${res.status} at ${API_ROUTES.PROFILE}`);
        logout();
      }
    } catch (err) {
      const error = err as Error;
      console.error("Connection to Auth API failed:", error.message);
      setLoading(false); 
    } finally {
      setLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = useCallback((newToken: string, newUser: User) => {
    localStorage.setItem('token', newToken);
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