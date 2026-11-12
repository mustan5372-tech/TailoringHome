import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { Shield, Sparkles, Lock } from 'lucide-react';
import { useAuth } from '../context';
import { ROUTES } from '../constants/navigation';

/**
 * AdminProtectedRoute
 *
 * Protects all administrative routes:
 * 1. Shows luxury loading state while verifying Firebase Auth & Firestore role.
 * 2. Redirects unauthenticated users to `/admin/login`.
 * 3. Enforces departmental role restrictions (Super Admin, Tailoring Admin, Fabric Admin).
 */
export const AdminProtectedRoute = ({ requiredRole }) => {
  const { isAuthenticated, loading, role, isSuperAdmin } = useAuth();
  const location = useLocation();

  // 1. Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-chocolate-950 text-ivory flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
        <div className="absolute inset-0 bg-[radial-gradient(var(--color-gold)_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        
        <div className="relative z-10 text-center space-y-6 max-w-md mx-auto">
          <div className="relative inline-block">
            <div className="h-16 w-16 rounded-full border-2 border-gold/30 border-t-gold animate-spin mx-auto" />
            <Shield className="h-6 w-6 text-gold absolute inset-0 m-auto animate-pulse" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-center gap-1.5 text-xs text-gold uppercase tracking-widest font-mono">
              <Sparkles className="h-3 w-3" />
              <span>Security Clearance</span>
            </div>
            <h2 className="font-serif font-bold text-2xl text-ivory">
              Atelier Operations Console
            </h2>
            <p className="text-xs text-cream/70 leading-relaxed font-sans">
              Verifying administrative credentials against the boutique registry...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 2. Unauthenticated -> Redirect to Login
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.ADMIN.LOGIN || '/admin/login'} state={{ from: location }} replace />;
  }

  // 3. Departmental Role Access Control
  if (requiredRole) {
    let hasAccess = isSuperAdmin;

    if (requiredRole === 'tailoring_admin') {
      hasAccess = isSuperAdmin || role === 'tailoring_admin';
    } else if (requiredRole === 'fabric_admin') {
      hasAccess = isSuperAdmin || role === 'fabric_admin';
    } else if (requiredRole === 'super_admin') {
      hasAccess = isSuperAdmin;
    }

    if (!hasAccess) {
      return (
        <div className="max-w-2xl mx-auto my-12 p-8 bg-white rounded-sm border border-amber-300 shadow-sm space-y-4 font-sans text-center">
          <div className="h-12 w-12 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mx-auto">
            <Lock className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif font-bold text-xl text-chocolate-900">
              Department Access Restricted
            </h3>
            <p className="text-xs text-chocolate-600 leading-relaxed max-w-md mx-auto">
              Your administrative role (<strong>{role}</strong>) does not have authorization to access this department. Please contact the Super Administrator if you require elevated privileges.
            </p>
          </div>
        </div>
      );
    }
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
