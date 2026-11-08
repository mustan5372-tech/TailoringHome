import React from 'react';
import { env } from '../../config/env.config';
import { Database, ShieldCheck, AlertCircle } from 'lucide-react';

export const EnvironmentBanner = () => {
  // Only render banner in development mode to assist developers
  if (!env.isDev) return null;

  const isConfigured = env.isFirebaseConfigured();

  return (
    <div className="bg-chocolate-900 border-b border-chocolate-800 text-ivory/90 text-xs py-1.5 px-4 font-sans">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded bg-maroon-800/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold-light border border-gold/20">
            {env.mode} environment
          </span>
          <span className="hidden sm:inline text-ivory/60">|</span>
          <span className="text-ivory/80 flex items-center gap-1">
            <Database className="h-3 w-3 text-gold" />
            Partition Prefix: <code className="text-gold font-mono text-[11px]">{env.firestorePrefix}</code>
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-ivory/70">
          {isConfigured ? (
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="h-3 w-3" /> Firebase Linked
            </span>
          ) : (
            <span className="flex items-center gap-1 text-amber-300/90">
              <AlertCircle className="h-3 w-3" /> Firebase Architecture Ready (Staged)
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnvironmentBanner;
