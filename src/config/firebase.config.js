/**
 * Central Firebase Client Configuration
 *
 * Official Firebase JavaScript SDK initialization.
 * Reads web configuration values from Vite environment variables (import.meta.env).
 *
 * SECURITY:
 * Service account credentials and private keys are never exposed in frontend code.
 * Authentication, Firestore queries, and Storage uploads are staged for subsequent days.
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import { env } from './env.config';

let app = null;

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
 * Initializes and returns the central Firebase App instance.
 * Gracefully handles missing credentials during initial setup without crashing the UI.
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

// Staged handles for future services (Firestore, Storage, Auth)
// Staged without executing operations per Day 10 restrictions
export const db = null;
export const storage = null;
export const auth = null;

export { app };
export default { app, firebaseConfig, isConfigured, initializeFirebase };
