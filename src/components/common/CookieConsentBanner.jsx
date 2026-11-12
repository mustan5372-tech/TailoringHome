import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';
import {
  getConsentStatus,
  setConsentStatus,
  trackPageView,
} from '../../services/analytics/analytics.service';

/**
 * CookieConsentBanner
 *
 * Lightweight, non-intrusive consent banner for Google Analytics 4.
 * - Adheres to Google Consent Mode v2.
 * - Stores user choice in localStorage ('granted' | 'denied').
 * - Only displays if the user has not yet expressed a preference.
 * - Matches the luxury boutique styling without modifying or redesigning pages.
 */
export const CookieConsentBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check initial consent status on mount
    const status = getConsentStatus();
    if (status === 'unspecified') {
      // Delay slightly for smooth page entrance
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    setConsentStatus(true);
    setIsVisible(false);
    // Track current page view immediately upon consent grant
    trackPageView(window.location.pathname + window.location.search);
  };

  const handleDecline = () => {
    setConsentStatus(false);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Privacy & Analytics Preferences"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-fade-in"
    >
      <div className="bg-chocolate-950/95 backdrop-blur-md text-ivory border border-gold/40 shadow-2xl rounded-sm p-4 sm:p-5 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-gold">
            <ShieldCheck className="h-4 w-4 shrink-0" />
            <span className="font-serif text-sm font-semibold tracking-wide text-ivory">
              Privacy & Analytics
            </span>
          </div>
          <button
            onClick={handleDecline}
            aria-label="Close analytics consent banner"
            className="text-cream/50 hover:text-ivory transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="text-xs text-cream/80 leading-relaxed font-sans">
          We use privacy-friendly Google Analytics to understand visits to our tailoring atelier and fabric collections. We never collect personal names, phone numbers, or passwords.
        </p>

        <div className="flex items-center justify-end gap-2 pt-1">
          <button
            onClick={handleDecline}
            className="px-3 py-1.5 text-xs text-cream/70 hover:text-ivory hover:bg-white/5 rounded-xs transition-colors font-medium cursor-pointer"
          >
            Essential Only
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-1.5 text-xs font-semibold bg-gold hover:bg-gold-light text-chocolate-950 rounded-xs shadow-xs transition-all cursor-pointer"
          >
            Accept Analytics
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;

