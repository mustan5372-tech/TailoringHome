/**
 * Central Firebase Client Configuration
 *
 * Official Firebase JavaScript SDK initialization.
 * Reads web configuration values from Vite environment variables (import.meta.env).
 *
 * DAY 13: Activated Firebase Authentication (Google Auth Provider) & Firestore for Admin Access.
 * SECURITY:
 * Service account credentials and private keys are never exposed in frontend code.
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { env } from './env.config.js';

let app = null;
let auth = null;
let db = null;
let storage = null;
let analytics = null;
let googleProvider = null;

// Read Firebase Web configuration from Vite environment variables
export const firebaseConfig = {
  apiKey: env.firebase.apiKey,
  authDomain: env.firebase.authDomain,
  projectId: env.firebase.projectId,
  storageBucket: env.firebase.storageBucket,
  messagingSenderId: env.firebase.messagingSenderId,
  appId: env.firebase.appId,
  measurementId: env.firebase.measurementId,
};

// Check if client-side Firebase web configuration is present
export const isConfigured = env.isFirebaseConfigured();

/**
 * Initializes and returns the central Firebase App instance with its services.
 */
export const initializeFirebase = (customConfig = null) => {
  const config = customConfig || firebaseConfig;

  // Validate required client-side fields (apiKey, projectId, appId)
  const hasMinimumConfig = Boolean(
    config.apiKey && config.projectId && config.appId
  );

  if (!hasMinimumConfig) {
    if (env.isDev) {
      console.info(
        `[Firebase] Web configuration pending for project [${config.projectId || 'tailoringhome-3cd89'}]. Set VITE_FIREBASE_* in your local .env file.`
      );
    }
    return null;
  }

  try {
    const existingApps = getApps();
    const initializedApp =
      existingApps.length === 0 ? initializeApp(config) : getApp();

    console.info(
      `[Firebase] Initialized successfully for project [${config.projectId}].`
    );

    // Initialize Auth & Google Provider
    auth = getAuth(initializedApp);
    googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({ prompt: 'select_account' });

    // Initialize Firestore & Storage
    db = getFirestore(initializedApp);
    storage = getStorage(initializedApp);

    // Initialize Analytics if supported in current browser environment
    if (typeof window !== 'undefined' && config.measurementId) {
      isSupported().then((supported) => {
        if (supported) {
          analytics = getAnalytics(initializedApp);
        }
      }).catch((err) => {
        console.warn('[Firebase] Analytics not supported in this environment:', err);
      });
    }

    return initializedApp;
  } catch (error) {
    console.error('[Firebase] Initialization error:', error);
    return null;
  }
};

// Initialize immediately if valid environment configuration is present
if (isConfigured) {
  app = initializeFirebase();
}

export { app, auth, db, storage, analytics, googleProvider };
export default { app, auth, db, storage, analytics, googleProvider, firebaseConfig, isConfigured, initializeFirebase };
