/**
 * Firebase Storage Service
 * Handles file uploads and asset removals within partitioned environment buckets.
 * Keeps test assets isolated and trackable for complete deletion.
 */

import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { storage, isConfigured } from '../../config/firebase.config';
import { env } from '../../config/env.config';

/**
 * Builds a path within the environment-specific storage partition.
 * e.g., 'dev_uploads/fabrics/1712000000-linen.jpg'
 */
export const buildStoragePath = (category, fileName) => {
  const sanitizedName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
  const timestamp = Date.now();
  return `${env.storageFolder}/${category}/${timestamp}-${sanitizedName}`;
};

/**
 * Upload a file to Firebase Storage.
 * Accepts a File or Blob object and an optional progress callback.
 */
export const uploadFile = async (category, file, onProgress = null) => {
  if (!isConfigured || !storage) {
    console.warn(`[Storage] Firebase not configured. Returning mock storage reference.`);
    return {
      storagePath: `${env.storageFolder}/${category}/mock-${file.name}`,
      downloadUrl: URL.createObjectURL(file),
      fileName: file.name,
    };
  }

  const storagePath = buildStoragePath(category, file.name);
  const fileRef = ref(storage, storagePath);

  const customMetadata = {
    originalName: file.name,
    environment: env.mode,
    uploadedAt: new Date().toISOString(),
  };

  const uploadTask = uploadBytesResumable(fileRef, file, { customMetadata });

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        if (onProgress && snapshot.totalBytes > 0) {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress(progress);
        }
      },
      (error) => {
        console.error('[Storage] Upload error:', error);
        reject(error);
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({
          storagePath,
          downloadUrl,
          fileName: file.name,
        });
      }
    );
  });
};

/**
 * Delete a file from Firebase Storage using either its path or download URL.
 */
export const deleteFile = async (pathOrUrl) => {
  if (!isConfigured || !storage) {
    console.info(`[Storage] Simulated file deletion for: ${pathOrUrl}`);
    return true;
  }

  if (!pathOrUrl) return false;

  try {
    const fileRef = pathOrUrl.startsWith('http')
      ? ref(storage, pathOrUrl)
      : ref(storage, pathOrUrl);

    await deleteObject(fileRef);
    console.info(`[Storage] Successfully deleted file: ${pathOrUrl}`);
    return true;
  } catch (error) {
    // If the file already doesn't exist, treat as non-blocking
    if (error.code === 'storage/object-not-found') {
      console.warn(`[Storage] File not found in storage: ${pathOrUrl}`);
      return true;
    }
    console.error(`[Storage] Failed to delete file: ${pathOrUrl}`, error);
    throw error;
  }
};
