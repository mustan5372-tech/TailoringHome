import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate, Link } from 'react-router-dom';
import {
  Shield,
  AlertTriangle,
  Copy,
  Check,
  Store,
  Layers,
  Scissors,
  UserX,
} from 'lucide-react';
import { useAuth } from '../../context';
import { ROUTES } from '../../constants/navigation';

const CURRENT_YEAR = new Date().getFullYear();
const SUPER_ADMIN_EMAIL = 'mustan5372@gmail.com';

export const AdminLoginPage = () => {
  const {
    isAuthenticated,
    loading,
    error,
    unauthorizedUser,
    signInWithGoogle,
    clearUnauthorizedUser,
  } = useAuth();

  const [signingIn, setSigningIn] = useState(false);
  const [copiedUid, setCopiedUid] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // If already authenticated and active, redirect to destination or dashboard
  const destination = location.state?.from?.pathname || ROUTES.ADMIN.DASHBOARD;
  if (isAuthenticated && !loading) {
    return <Navigate to={destination} replace />;
  }

  const handleGoogleLogin = async () => {
    setSigningIn(true);
    const result = await signInWithGoogle();
    setSigningIn(false);

    if (result.success) {
      navigate(destination, { replace: true });
    }
  };

  const copyUidToClipboard = () => {
    if (unauthorizedUser?.uid) {
      navigator.clipboard.writeText(unauthorizedUser.uid);
      setCopiedUid(true);
      setTimeout(() => setCopiedUid(false), 2500);
    }
  };

  const isSuperAdminEmail =
    unauthorizedUser?.email?.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-chocolate-950 via-chocolate-900 to-maroon-950 text-ivory flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Background Radial Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(var(--color-gold)_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />

      {/* Top Boutique Navigation Link */}
      <header className="relative z-10 max-w-7xl w-full mx-auto px-6 py-6 flex items-center justify-between">
        <Link
          to={ROUTES.HOME}
          className="flex items-center gap-2 text-xs font-medium text-cream/70 hover:text-gold transition-colors"
        >
          <Store className="h-4 w-4 text-gold" />
          <span>Return to Boutique Website</span>
        </Link>

        <div className="flex items-center gap-2 text-[11px] text-gold-light/60 font-mono">
          <Shield className="h-3.5 w-3.5 text-gold" />
          <span>Atelier Security Guard • Production RBAC</span>
        </div>
      </header>

      {/* Main Authentication Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full bg-chocolate-900/90 backdrop-blur-md rounded-sm border-2 border-gold/40 shadow-2xl p-6 sm:p-8 space-y-6">
          {/* Atelier Brand Badge */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-maroon-950 border border-gold/40 text-gold shadow-xs mx-auto">
              <Shield className="h-7 w-7 text-gold" />
            </div>

            <div>
              <span className="text-[10px] uppercase font-semibold tracking-widest text-gold-light font-mono block">
                Atelier Operations Console
              </span>
              <h1 className="font-serif font-bold text-2xl sm:text-3xl text-ivory tracking-tight mt-1">
                Administrator Sign In
              </h1>
              <p className="text-xs text-cream/70 mt-1.5 leading-relaxed">
                Tailoring Home & Fabric Home • Managerial access only.
              </p>
            </div>
          </div>

          {/* Case A: Unauthorized Account Message (Requirements 4 & 5) */}
          {unauthorizedUser ? (
            <div className="p-4 rounded-sm bg-red-950/70 border border-red-500/50 space-y-3 text-left animate-fade-in">
              <div className="flex items-start gap-2.5 text-red-200">
                {unauthorizedUser.reason === 'inactive' ? (
                  <UserX className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <h3 className="font-serif font-bold text-sm text-red-200">
                    {unauthorizedUser.reason === 'inactive'
                      ? 'Administrator Inactive'
                      : 'Access Denied'}
                  </h3>
                  <p className="text-xs text-red-100 font-medium leading-relaxed mt-1">
                    {unauthorizedUser.reason === 'inactive'
                      ? 'Your administrator account is inactive. Please contact the Super Admin.'
                      : 'Login failed: This Google account is not registered as an administrator. Please contact the Super Admin.'}
                  </p>
                  <p className="text-[11px] text-red-300/80 mt-1">
                    Signed-in account: <span className="font-mono text-ivory">{unauthorizedUser.email}</span>
                  </p>
                </div>
              </div>

              {/* Super Admin Bootstrap Guidance for mustan5372@gmail.com */}
              {isSuperAdminEmail ? (
                <div className="bg-black/50 rounded-xs p-3 border border-gold/40 space-y-2 mt-2">
                  <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-gold-light">
                    <span>Super Admin Initial Bootstrap</span>
                    <span className="text-emerald-400 text-[9px] bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/40">
                      Authorized Master
                    </span>
                  </div>

                  <p className="text-[11px] text-cream/90 leading-relaxed">
                    Your Google Authentication succeeded! Complete the one-time Super Admin bootstrap by adding your record to Firestore:
                  </p>

                  <div className="bg-chocolate-950/80 rounded p-2 border border-cream/10 space-y-1">
                    <div className="text-[10px] text-cream/60 flex items-center justify-between">
                      <span>Your Permanent Firebase UID:</span>
                      <button
                        type="button"
                        onClick={copyUidToClipboard}
                        className="inline-flex items-center gap-1 text-[10px] text-gold hover:text-gold-light cursor-pointer font-mono"
                        title="Copy UID"
                      >
                        {copiedUid ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            <span>Copy UID</span>
                          </>
                        )}
                      </button>
                    </div>
                    <code className="text-xs font-mono text-gold-light break-all block select-all">
                      {unauthorizedUser.uid}
                    </code>
                  </div>

                  <div className="text-[10px] text-cream/80 space-y-1 pt-1">
                    <p className="font-semibold text-gold">Setup via Firebase Console:</p>
                    <ol className="list-decimal list-inside space-y-0.5 text-cream/70">
                      <li>Go to <strong>Firebase Console &rarr; Firestore Database</strong>.</li>
                      <li>In collection <code>admins</code>, click <strong>Add document</strong>.</li>
                      <li>Document ID: paste your UID above.</li>
                      <li>
                        Add fields: <code>role: "super_admin"</code> (string), <code>active: true</code> (boolean), <code>email: "{SUPER_ADMIN_EMAIL}"</code> (string).
                      </li>
                      <li>Click <strong>Save</strong> and log in again.</li>
                    </ol>
                  </div>
                </div>
              ) : null}

              <div className="pt-2">
                <button
                  type="button"
                  onClick={clearUnauthorizedUser}
                  className="w-full text-center py-2 px-3 text-xs font-medium rounded-xs bg-red-900/60 hover:bg-red-800 text-ivory border border-red-500/40 transition-colors cursor-pointer"
                >
                  Try Another Account
                </button>
              </div>
            </div>
          ) : (
            /* Case B: Standard Sign-In Button (Requirement 3: "Continue with Google") */
            <div className="space-y-4">
              {error && (
                <div className="p-3 rounded-xs bg-red-900/40 border border-red-500/50 text-xs text-red-200 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Official Google Sign-In Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={signingIn || loading}
                className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-sm bg-white hover:bg-stone-100 text-chocolate-950 font-semibold text-sm shadow-md transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed group border border-gold/30 hover:border-gold"
              >
                {signingIn || loading ? (
                  <div className="h-5 w-5 border-2 border-chocolate-900 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                )}
                <span>Continue with Google</span>
              </button>

              <div className="pt-2 text-center">
                <span className="text-[11px] text-cream/50 leading-relaxed block">
                  Public self-registration is closed. Only accounts registered in <code>/admins</code> by the Super Administrator can sign in.
                </span>
              </div>
            </div>
          )}

          {/* Security Policy Footnote */}
          <div className="pt-4 border-t border-chocolate-800 text-[11px] text-cream/60 space-y-2">
            <div className="flex items-center justify-between text-gold-light/80">
              <span className="flex items-center gap-1">
                <Scissors className="h-3 w-3 text-maroon-400" />
                <span>Tailoring Admin</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Layers className="h-3 w-3 text-chocolate-400" />
                <span>Fabric Admin</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Shield className="h-3 w-3 text-gold" />
                <span>Super Admin</span>
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-7xl w-full mx-auto px-6 py-4 text-center text-xs text-cream/40">
        <p>© {CURRENT_YEAR} Tailoring Home & Fabric Home • Proprietary Atelier Console</p>
      </footer>
    </div>
  );
};

export default AdminLoginPage;
