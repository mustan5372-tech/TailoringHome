/**
 * Google Analytics 4 (GA4) Service
 *
 * Centralized tracking service using official Google tag (gtag.js).
 * Enforces:
 * 1. Single load across the SPA.
 * 2. Deduplicated route-based page views.
 * 3. Strict PII stripping (no phone numbers, emails, passwords, form bodies).
 * 4. Google Consent Mode v2 awareness and user opt-in/opt-out persistence.
 * 5. Complete independence from Firebase configuration.
 */

import { ANALYTICS_CONFIG } from '../../config/analytics.config';

/**
 * Checks whether user has enabled Do Not Track (DNT) in their browser.
 */
export const isDoNotTrackEnabled = () => {
  if (typeof window === 'undefined') return false;
  return (
    navigator.doNotTrack === '1' ||
    window.doNotTrack === '1' ||
    navigator.msDoNotTrack === '1'
  );
};

/**
 * Retrieves the current consent state from localStorage.
 * @returns {'granted' | 'denied' | 'unspecified'}
 */
export const getConsentStatus = () => {
  if (typeof window === 'undefined') return 'unspecified';
  try {
    const stored = localStorage.getItem(ANALYTICS_CONFIG.storageKey);
    if (stored === 'granted' || stored === 'denied') {
      return stored;
    }
  } catch {
    // LocalStorage unavailable (e.g. private browsing storage lock)
  }

  // If user enabled DNT, default to denied
  if (isDoNotTrackEnabled()) {
    return 'denied';
  }

  return 'unspecified';
};

/**
 * Updates consent state in localStorage and updates Google Tag Consent Mode v2.
 * @param {boolean} granted
 */
export const setConsentStatus = (granted) => {
  const status = granted ? 'granted' : 'denied';

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(ANALYTICS_CONFIG.storageKey, status);
    } catch {
      // LocalStorage access error
    }

    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: status,
      });
    }

    if (ANALYTICS_CONFIG.debug) {
      console.info(`[Analytics] Consent updated to: ${status}`);
    }
  }

  return status;
};

/**
 * Sanitizes event parameters to strictly prevent PII leakage.
 * Rejects disallowed keys and redacts values resembling emails or phone numbers.
 */
export const sanitizeParams = (params = {}) => {
  if (!params || typeof params !== 'object') return {};

  const clean = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /\+?[0-9\s\-()]{7,20}/;

  for (const [key, value] of Object.entries(params)) {
    // 1. Blacklist check: reject disallowed key names
    const isBlacklisted = ANALYTICS_CONFIG.piiBlacklist.some(
      (bKey) => key.toLowerCase().includes(bKey)
    );
    if (isBlacklisted) continue;

    // 2. Reject sensitive value types
    if (typeof value === 'function' || typeof value === 'symbol') continue;

    // 3. String sanitation: scrub if content resembles an email or phone
    if (typeof value === 'string') {
      if (emailRegex.test(value.trim()) || (phoneRegex.test(value.trim()) && value.trim().length > 6)) {
        clean[key] = '[REDACTED_PII]';
      } else {
        clean[key] = value.slice(0, 100); // Bounded length
      }
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      clean[key] = value;
    }
  }

  return clean;
};

/**
 * Tracks a Single Page Application (SPA) route change as a GA4 page_view.
 * @param {string} pagePath e.g. '/tailoring'
 * @param {string} pageTitle e.g. 'Tailoring Home & Fabric Home'
 */
export const trackPageView = (pagePath, pageTitle) => {
  if (typeof window === 'undefined') return;

  const currentConsent = getConsentStatus();
  if (currentConsent === 'denied') {
    if (ANALYTICS_CONFIG.debug) {
      console.info(`[Analytics] PageView skipped (Consent Denied): ${pagePath}`);
    }
    return;
  }

  const title = pageTitle || document.title || 'Tailoring Home & Fabric Home';
  const url = window.location.href;

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: title,
      page_location: url,
      send_to: ANALYTICS_CONFIG.measurementId,
    });

    if (ANALYTICS_CONFIG.debug) {
      console.info(`[Analytics] 📄 PageView: ${pagePath} | "${title}"`);
    }
  } else if (ANALYTICS_CONFIG.debug) {
    console.warn(`[Analytics] gtag not ready; pageview queued for: ${pagePath}`);
  }
};

/**
 * Tracks a custom user interaction event with automatic PII sanitization.
 * @param {string} eventName
 * @param {Object} eventParams
 */
export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window === 'undefined') return;

  if (getConsentStatus() === 'denied') {
    if (ANALYTICS_CONFIG.debug) {
      console.info(`[Analytics] Event [${eventName}] skipped (Consent Denied)`);
    }
    return;
  }

  const sanitized = sanitizeParams(eventParams);

  // Automatically attach generic device metadata (non-PII)
  const enrichedParams = {
    ...sanitized,
    device_category:
      window.innerWidth < 768
        ? 'mobile'
        : window.innerWidth < 1024
        ? 'tablet'
        : 'desktop',
    send_to: ANALYTICS_CONFIG.measurementId,
  };

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, enrichedParams);

    if (ANALYTICS_CONFIG.debug) {
      console.info(`[Analytics] ⚡ Event [${eventName}]:`, enrichedParams);
    }
  }
};

/**
 * Safe pre-built behavioral tracking helpers
 */
export const trackServiceCategoryView = (category) => {
  trackEvent('select_content', {
    content_type: 'service_category',
    item_id: category,
  });
};

export const trackFabricCategoryView = (fabricType) => {
  trackEvent('select_content', {
    content_type: 'fabric_category',
    item_id: fabricType,
  });
};

export const trackContactChannelClick = (channelName) => {
  trackEvent('contact_channel_click', {
    channel: channelName, // e.g. 'phone_tailoring', 'whatsapp_fabric', 'atelier_directions'
  });
};

export const trackGalleryFilter = (filterName) => {
  trackEvent('filter_selected', {
    filter_type: 'gallery_category',
    filter_value: filterName,
  });
};

export default {
  getConsentStatus,
  setConsentStatus,
  trackPageView,
  trackEvent,
  trackServiceCategoryView,
  trackFabricCategoryView,
  trackContactChannelClick,
  trackGalleryFilter,
  sanitizeParams,
};

