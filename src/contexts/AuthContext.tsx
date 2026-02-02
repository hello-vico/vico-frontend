import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isOwner: boolean;
  login: (token: string, role: 'admin' | 'owner') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState(() => ({
    isAuthenticated: !!localStorage.getItem('vico_token'),
    isOwner: localStorage.getItem('vico_user_role') === 'owner'
  }));

  useEffect(() => {
    const handleStorageChange = () => {
      setAuthState({
        isAuthenticated: !!localStorage.getItem('vico_token'),
        isOwner: localStorage.getItem('vico_user_role') === 'owner'
      });
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = (token: string, role: 'admin' | 'owner') => {
    localStorage.setItem('vico_token', token);
    localStorage.setItem('vico_user_role', role);
    setAuthState({
      isAuthenticated: true,
      isOwner: role === 'owner'
    });
  };

  const logout = () => {
    localStorage.removeItem('vico_token');
    localStorage.removeItem('vico_user_role');
    setAuthState({
      isAuthenticated: false,
      isOwner: false
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};