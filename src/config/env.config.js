/**
 * Application Environment Configuration
 * Centralizes environment variable management and validates runtime environment.
 * Ensures isolation between Development and Production data stores.
 */

const getEnvVar = (key, fallback = '') => {
  return import.meta.env[key] !== undefined ? import.meta.env[key] : fallback;
};

export const env = {
  // Application Mode
  mode: getEnvVar('VITE_APP_ENV', import.meta.env.MODE || 'development'),
  appName: getEnvVar('VITE_APP_NAME', 'Tailoring Home & Fabric Home'),
  appUrl: getEnvVar('VITE_APP_URL', 'http://localhost:5173'),

  isDev: (getEnvVar('VITE_APP_ENV') || import.meta.env.MODE) === 'development',
  isProd: (getEnvVar('VITE_APP_ENV') || import.meta.env.MODE) === 'production',

  // Firebase Web SDK Configuration (Read from Vite environment variables)
  firebase: {
    apiKey: getEnvVar('VITE_FIREBASE_API_KEY'),
    authDomain: getEnvVar('VITE_FIREBASE_AUTH_DOMAIN'),
    projectId: getEnvVar('VITE_FIREBASE_PROJECT_ID'),
    storageBucket: getEnvVar('VITE_FIREBASE_STORAGE_BUCKET'),
    messagingSenderId: getEnvVar('VITE_FIREBASE_MESSAGING_SENDER_ID'),
    appId: getEnvVar('VITE_FIREBASE_APP_ID'),
    measurementId: getEnvVar('VITE_FIREBASE_MEASUREMENT_ID'),
  },

  // Partitioning: Keeps Dev and Prod Firestore collections & Storage folders separate
  firestorePrefix: getEnvVar('VITE_FIRESTORE_COLLECTION_PREFIX', 'dev_'),
  storageFolder: getEnvVar('VITE_FIREBASE_STORAGE_FOLDER', 'dev_uploads'),

  // Helper to validate whether required client-side Firebase web keys are populated
  isFirebaseConfigured() {
    return Boolean(
      this.firebase.apiKey &&
      this.firebase.projectId &&
      this.firebase.appId
    );
  },
};

export default env;
