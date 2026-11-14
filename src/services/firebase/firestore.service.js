/**
 * Firestore Service Layer
 * Abstracts database interactions with automatic environment collection partitioning.
 */

import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db, isConfigured } from '../../config/firebase.config.js';
import { env } from '../../config/env.config.js';

/**
 * Returns the environment-partitioned collection name.
 * e.g., 'fabrics' -> 'dev_fabrics' in development, 'prod_fabrics' in production.
 */
export const getPartitionedCollectionName = (baseName) => {
  return `${env.firestorePrefix}${baseName}`;
};

/**
 * Standard collection names across the application.
 */
export const COLLECTIONS = {
  TAILORING: getPartitionedCollectionName('tailoring_services'),
  FABRICS: getPartitionedCollectionName('fabrics_catalogue'),
  GALLERY: getPartitionedCollectionName('gallery_showcase'),
  ENQUIRIES: getPartitionedCollectionName('customer_enquiries'),
  SETTINGS: getPartitionedCollectionName('site_settings'),
  AUDIT_LOGS: getPartitionedCollectionName('admin_audit_logs'),
  ADMINS: 'admins',
  INVITATIONS: getPartitionedCollectionName('admin_invitations'),
};

/**
 * Fetch all documents from a collection.
 */
export const getAllDocuments = async (collectionName) => {
  if (!isConfigured || !db) {
    console.warn(`[Firestore] Firebase not configured. Returning empty for ${collectionName}.`);
    return [];
  }
  const colRef = collection(db, collectionName);
  const snapshot = await getDocs(colRef);
  return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
};

/**
 * Get a single document by ID.
 */
export const getDocumentById = async (collectionName, id) => {
  if (!isConfigured || !db) return null;
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

/**
 * Create a new document with timestamps and environment metadata.
 */
export const createDocument = async (collectionName, data, isTest = env.isDev) => {
  if (!isConfigured || !db) {
    console.warn(`[Firestore] Document creation simulated (Firebase not configured).`);
    return { id: `mock-${Date.now()}`, ...data, isTest };
  }

  const payload = {
    ...data,
    isTest: Boolean(isTest),
    environment: env.mode,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const colRef = collection(db, collectionName);
  const docRef = await addDoc(colRef, payload);
  return { id: docRef.id, ...payload };
};

/**
 * Update an existing document.
 */
export const updateDocument = async (collectionName, id, data) => {
  if (!isConfigured || !db) return;
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

/**
 * Delete a document from Firestore.
 */
export const deleteDocument = async (collectionName, id) => {
  if (!isConfigured || !db) return;
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
};
