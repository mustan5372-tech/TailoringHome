/**
 * Google Analytics 4 (GA4) Configuration
 *
 * Decoupled from Firebase configuration to preserve clean separation of concerns.
 * Measurement ID: G-WPDJ3V8XF6
 */

export const GA_MEASUREMENT_ID =
  import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-WPDJ3V8XF6';

export const ANALYTICS_CONFIG = {
  measurementId: GA_MEASUREMENT_ID,
  storageKey: 'th_analytics_consent',
  debug: import.meta.env.DEV,

  // Disallowed parameter keys to strictly prohibit PII (Personally Identifiable Information)
  piiBlacklist: [
    'name',
    'email',
    'phone',
    'mobile',
    'telephone',
    'password',
    'token',
    'secret',
    'address',
    'message',
    'notes',
    'first_name',
    'last_name',
    'ssn',
    'credit_card',
  ],
};

export default ANALYTICS_CONFIG;

