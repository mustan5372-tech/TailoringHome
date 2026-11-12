import React, { useState, useEffect } from 'react';
import { AuthContext } from './authContextDef';
import {
  signInWithGoogleAdmin,
  logoutAdmin,
  subscribeToAdminAuth,
} from '../services/firebase/auth.service';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [adminProfile, setAdminProfile] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unauthorizedUser, setUnauthorizedUser] = useState(null);

  // Subscribe to real-time auth state changes
  useEffect(() => {
    const unsubscribe = subscribeToAdminAuth((state) => {
      setUser(state.user || null);
      setAdminProfile(state.adminProfile || null);
      setRole(state.role || null);
      setLoading(state.loading);
      if (state.unauthorizedUser) {
        setUnauthorizedUser(state.unauthorizedUser);
      }
      if (state.error) {
        setError(state.error);
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setLoading(true);
    setError(null);
    setUnauthorizedUser(null);

    try {
      const result = await signInWithGoogleAdmin();

      if (result.success) {
        setUser(result.user);
        setAdminProfile(result.adminProfile);
        setRole(result.role);
        setLoading(false);
        return { success: true };
      }

      // Handle unauthorized or cancelled
      setLoading(false);
      if (result.reason === 'not_registered' || result.reason === 'inactive') {
        setUnauthorizedUser(result.user);
        return {
          success: false,
          reason: result.reason,
          user: result.user,
        };
      }

      if (result.error) {
        setError(result.error);
      }

      return {
        success: false,
        reason: result.reason,
        error: result.error,
      };
    } catch (err) {
      setLoading(false);
      const msg = err.message || 'Authentication failed';
      setError(msg);
      return { success: false, error: msg };
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await logoutAdmin();
      setUser(null);
      setAdminProfile(null);
      setRole(null);
      setUnauthorizedUser(null);
      setError(null);
    } catch (err) {
      console.error('[AuthProvider] Logout failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearUnauthorizedUser = () => {
    setUnauthorizedUser(null);
    setError(null);
  };

  const value = {
    user,
    adminProfile,
    role,
    isAuthenticated: Boolean(user && adminProfile && adminProfile.active),
    isSuperAdmin: role === 'super_admin',
    isTailoringAdmin: role === 'tailoring_admin' || role === 'super_admin',
    isFabricAdmin: role === 'fabric_admin' || role === 'super_admin',
    loading,
    error,
    unauthorizedUser,
    signInWithGoogle,
    logout,
    clearUnauthorizedUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
