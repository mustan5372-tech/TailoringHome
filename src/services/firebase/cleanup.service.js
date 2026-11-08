/**
 * Coordinated Cleanup Service
 * Guarantees that when a catalogue item or test image is removed,
 * BOTH the Firestore database document AND the Firebase Storage file are purged,
 * preventing orphaned cloud storage files and storage cost leaks.
 */

import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, isConfigured } from '../../config/firebase.config';
import { deleteDocument } from './firestore.service';
import { deleteFile } from './storage.service';

/**
 * Coordinated removal of a Firestore document and its associated Storage asset(s).
 *
 * @param {string} collectionName - Partitioned collection name
 * @param {string} documentId - Firestore document ID
 * @param {string|string[]} storageAssetPathsOrUrls - Path(s) or URL(s) to remove from Firebase Storage
 * @returns {Promise<{ success: boolean, docDeleted: boolean, assetsDeletedCount: number, errors: string[] }>}
 */
export const deleteRecordWithAssets = async (
  collectionName,
  documentId,
  storageAssetPathsOrUrls = []
) => {
  const result = {
    success: false,
    docDeleted: false,
    assetsDeletedCount: 0,
    errors: [],
  };

  const assetList = Array.isArray(storageAssetPathsOrUrls)
    ? storageAssetPathsOrUrls
    : [storageAssetPathsOrUrls].filter(Boolean);

  // 1. Delete associated Storage assets first
  for (const assetPath of assetList) {
    try {
      const deleted = await deleteFile(assetPath);
      if (deleted) {
        result.assetsDeletedCount += 1;
      }
    } catch (err) {
      const errorMsg = `Storage deletion failed for ${assetPath}: ${err.message || err}`;
      console.error(`[CleanupService] ${errorMsg}`);
      result.errors.push(errorMsg);
    }
  }

  // 2. Delete Firestore document
  try {
    await deleteDocument(collectionName, documentId);
    result.docDeleted = true;
    result.success = result.errors.length === 0;
  } catch (err) {
    const errorMsg = `Firestore deletion failed for doc ${documentId}: ${err.message || err}`;
    console.error(`[CleanupService] ${errorMsg}`);
    result.errors.push(errorMsg);
    result.success = false;
  }

  return result;
};

/**
 * Batch cleans all test records and their attached images in a collection.
 * Identifies records where `isTest: true`.
 *
 * @param {string} collectionName - Partitioned collection name
 * @returns {Promise<{ totalFound: number, cleanedCount: number, errors: string[] }>}
 */
export const cleanupTestRecordsInCollection = async (collectionName) => {
  const summary = {
    totalFound: 0,
    cleanedCount: 0,
    errors: [],
  };

  if (!isConfigured || !db) {
    console.warn(`[CleanupService] Firebase not configured. Simulated test cleanup for ${collectionName}.`);
    return summary;
  }

  try {
    const colRef = collection(db, collectionName);
    const testQuery = query(colRef, where('isTest', '==', true));
    const snapshot = await getDocs(testQuery);

    summary.totalFound = snapshot.size;

    for (const docSnap of snapshot.docs) {
      const data = docSnap.data();
      // Look for common image path / URL fields stored in item schemas
      const assetsToDelete = [
        data.imagePath,
        data.imageUrl,
        data.storagePath,
        ...(Array.isArray(data.images) ? data.images.map((img) => img.path || img.url || img) : []),
      ].filter(Boolean);

      const cleanupRes = await deleteRecordWithAssets(collectionName, docSnap.id, assetsToDelete);
      if (cleanupRes.success) {
        summary.cleanedCount += 1;
      } else {
        summary.errors.push(...cleanupRes.errors);
      }
    }
  } catch (error) {
    console.error(`[CleanupService] Error querying test records in ${collectionName}:`, error);
    summary.errors.push(error.message);
  }

  return summary;
};
