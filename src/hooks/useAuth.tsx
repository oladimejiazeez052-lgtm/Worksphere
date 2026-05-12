
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserSession } from '../lib/storage';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../lib/routes';

interface AuthContextType {
  user: UserSession | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, role: UserSession['role'], password: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<UserSession>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (profile) {
          setUser({
            id: session.user.id,
            name: profile.name || session.user.email?.split('@')[0] || 'User',
            email: session.user.email || '',
            role: profile.role || 'Worker',
            onboarded: profile.onboarded || false,
            avatar: profile.avatar
          });
        }
      }
      setIsLoading(false);
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (profile) {
          setUser({
            id: session.user.id,
            name: profile.name || session.user.email?.split('@')[0] || 'User',
            email: session.user.email || '',
            role: profile.role || 'Worker',
            onboarded: profile.onboarded || false,
            avatar: profile.avatar
          });
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const register = async (name: string, email: string, role: UserSession['role'], password: string) => {
    setIsLoading(true);
    
    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: { name, role }
      }
    });

    if (error) {
      setIsLoading(false);
      throw error;
    }

    if (data.user) {
      const { error: profileError } = await supabase.from('profiles').upsert({
        id: data.user.id,
        name,
        role,
        onboarded: false
      });
      if (profileError) console.error('Profile creation error:', profileError);
    }

    setIsLoading(false);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    navigate(ROUTES.LANDING);
  };

  const updateUser = async (updates: Partial<UserSession>) => {
    if (!user) return;
    
    const { error } = await supabase
      .from('profiles')
      .update({
        name: updates.name,
        role: updates.role,
        onboarded: updates.onboarded,
        avatar: updates.avatar
      })
      .eq('id', user.id);

    if (error) throw error;
    
    setUser(prev => prev ? { ...prev, ...updates } : null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
