/**
 * Firebase Client Initialization
 * Configured with environment partitioning and graceful fallback for initialization stage.
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { env } from './env.config';

let app = null;
let db = null;
let storage = null;
let auth = null;

const isConfigured = env.isFirebaseConfigured();

if (isConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(env.firebase) : getApp();
    db = getFirestore(app);
    storage = getStorage(app);
    auth = getAuth(app);
    console.info(`[Firebase] Initialized successfully in [${env.mode}] mode.`);
  } catch (error) {
    console.error('[Firebase] Initialization error:', error);
  }
} else {
  // In development/initialization phase without credentials, provide informative logging
  if (env.isDev) {
    console.info(
      '[Firebase] Running in staged/mock mode. Set VITE_FIREBASE_* in .env to connect live project.'
    );
  }
}

export { app, db, storage, auth, isConfigured };
export default { app, db, storage, auth, isConfigured };

