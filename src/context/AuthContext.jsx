import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../lib/api';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [authRedirectUrl, setAuthRedirectUrl] = useState(null);
  const { addToast } = useToast();

  // Load existing session on boot
  useEffect(() => {
    async function initAuth() {
      const token = localStorage.getItem('unicom_token');
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.getMe();
        setUser(res.user);
      } catch (err) {
        console.warn('Session expired or invalid:', err.message);
        localStorage.removeItem('unicom_token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    initAuth();
  }, []);

  const loginWithGoogle = async (googlePayload, redirectUrl = null) => {
    try {
      const res = await api.googleAuth(googlePayload);
      localStorage.setItem('unicom_token', res.token);
      setUser(res.user);
      setShowGoogleModal(false);
      addToast(`Welcome back, ${res.user.name}! Authenticated with Google.`, 'success');
      if (redirectUrl && redirectUrl !== window.location.pathname) {
        window.location.href = redirectUrl;
      }
      return res.user;
    } catch (err) {
      addToast(err.message || 'Google authentication failed', 'error');
      throw err;
    }
  };

  const loginAdmin = async (email, password) => {
    try {
      const res = await api.adminLogin({ email, password });
      localStorage.setItem('unicom_token', res.token);
      setUser(res.user);
      addToast('Admin authenticated successfully', 'success');
      return res.user;
    } catch (err) {
      addToast(err.message || 'Admin authentication failed', 'error');
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('unicom_token');
    setUser(null);
    addToast('Signed out successfully', 'info');
  };

  const promptGoogleAuth = (redirectUrl = '/my-order') => {
    setAuthRedirectUrl(redirectUrl);
    setShowGoogleModal(true);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user && !user.isAdmin,
        isAdmin: !!user && user.isAdmin,
        loginWithGoogle,
        loginAdmin,
        logout,
        promptGoogleAuth,
        showGoogleModal,
        setShowGoogleModal,
        authRedirectUrl,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
