/**
 * Firebase Authentication & Admin Verification Service
 *
 * Enforces Day 13 Security Policy:
 * 1. Authenticates administrators via Google Sign-In (Firebase Auth).
 * 2. Strictly checks against the Firestore `/admins/{uid}` collection.
 * 3. Requires `active: true`.
 * 4. Never creates administrators automatically from the frontend.
 * 5. Rejects and signs out unauthorized or inactive accounts immediately.
 */

import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../../config/firebase.config';

/**
 * Initiates Google Sign-In and verifies administrator authorization.
 * @returns {Promise<{success: boolean, user?: object, adminProfile?: object, reason?: string, error?: string}>}
 */
export const signInWithGoogleAdmin = async () => {
  if (!auth || !db || !googleProvider) {
    throw new Error('Firebase services are not initialized. Check your environment configuration.');
  }

  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Immediately verify authorization in Firestore /admins/{uid}
    const adminDocRef = doc(db, 'admins', user.uid);
    const adminSnap = await getDoc(adminDocRef);

    if (!adminSnap.exists()) {
      // Unregistered Google account
      await signOut(auth);
      return {
        success: false,
        reason: 'not_registered',
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
      };
    }

    const adminData = adminSnap.data();

    if (adminData.active !== true) {
      // Inactive administrator account
      await signOut(auth);
      return {
        success: false,
        reason: 'inactive',
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
      };
    }

    // Authorized administrator
    return {
      success: true,
      user,
      adminProfile: adminData,
      role: adminData.role,
    };
  } catch (error) {
    if (error.code === 'auth/popup-closed-by-user') {
      return {
        success: false,
        reason: 'popup_closed',
        error: 'Sign-in window was closed before completing authentication.',
      };
    }
    if (error.code === 'auth/cancelled-popup-request') {
      return {
        success: false,
        reason: 'cancelled',
        error: 'Sign-in was cancelled.',
      };
    }
    return {
      success: false,
      reason: 'error',
      error: error.message || 'Authentication error occurred.',
    };
  }
};

/**
 * Signs out the current administrator.
 */
export const logoutAdmin = async () => {
  if (!auth) return;
  try {
    await signOut(auth);
  } catch (error) {
    console.error('[AuthService] Logout error:', error);
    throw error;
  }
};

/**
 * Fetches the admin profile for an active UID.
 * @param {string} uid
 */
export const getAdminProfile = async (uid) => {
  if (!db || !uid) return null;
  try {
    const adminDocRef = doc(db, 'admins', uid);
    const snap = await getDoc(adminDocRef);
    if (snap.exists() && snap.data().active === true) {
      return snap.data();
    }
    return null;
  } catch (error) {
    console.error('[AuthService] Error fetching admin profile:', error);
    return null;
  }
};

/**
 * Subscribes to Firebase Auth state changes and verifies against /admins.
 * @param {Function} onChange Callback with auth state payload
 * @returns {Function} Unsubscribe function
 */
export const subscribeToAdminAuth = (onChange) => {
  if (!auth || !db) {
    onChange({
      user: null,
      adminProfile: null,
      role: null,
      isAuthenticated: false,
      loading: false,
      error: 'Firebase Auth is unconfigured',
    });
    return () => {};
  }

  return onAuthStateChanged(auth, async (firebaseUser) => {
    if (!firebaseUser) {
      onChange({
        user: null,
        adminProfile: null,
        role: null,
        isAuthenticated: false,
        loading: false,
      });
      return;
    }

    try {
      const adminDocRef = doc(db, 'admins', firebaseUser.uid);
      const adminSnap = await getDoc(adminDocRef);

      if (adminSnap.exists() && adminSnap.data().active === true) {
        const adminData = adminSnap.data();
        onChange({
          user: firebaseUser,
          adminProfile: adminData,
          role: adminData.role,
          isAuthenticated: true,
          loading: false,
        });
      } else {
        // User is authenticated with Google, but not in /admins or inactive
        const reason = !adminSnap.exists() ? 'not_registered' : 'inactive';
        const unauthorizedPayload = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          reason,
        };

        // Terminate unauthorized Firebase session
        await signOut(auth);

        onChange({
          user: null,
          adminProfile: null,
          role: null,
          isAuthenticated: false,
          loading: false,
          unauthorizedUser: unauthorizedPayload,
        });
      }
    } catch (err) {
      console.error('[AuthService] Verification error:', err);
      onChange({
        user: null,
        adminProfile: null,
        role: null,
        isAuthenticated: false,
        loading: false,
        error: err.message,
      });
    }
  });
};

export default {
  signInWithGoogleAdmin,
  logoutAdmin,
  getAdminProfile,
  subscribeToAdminAuth,
};

