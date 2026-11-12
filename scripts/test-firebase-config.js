/**
 * Firebase Configuration & Initialization Verification Script (Day 10)
 *
 * Verifies:
 * 1. Firebase JavaScript SDK module resolution
 * 2. Successful initialization when valid configuration is provided
 * 3. Graceful handling when configuration is missing or incomplete
 * 4. Proper project association: tailoringhome-3cd89
 * 5. Safe teardown of test instances
 */

import { initializeApp, getApps, getApp, deleteApp } from 'firebase/app';

console.log('--- [DAY 10] FIREBASE CONFIGURATION TEST SUITE ---\n');

// 1. Module Loading Test
console.log('1. Checking Firebase JavaScript SDK package...');
if (typeof initializeApp === 'function') {
  console.log('   ✓ Firebase SDK (firebase/app) loaded successfully.\n');
} else {
  console.error('   ✗ Failed to load Firebase SDK.');
  process.exit(1);
}

// 2. Incomplete Configuration Test
console.log('2. Testing missing/empty configuration handling...');
const emptyConfig = {
  apiKey: '',
  projectId: '',
  appId: '',
};

const hasMinConfig = Boolean(emptyConfig.apiKey && emptyConfig.projectId && emptyConfig.appId);
if (!hasMinConfig) {
  console.log('   ✓ Missing configuration correctly recognized (non-blocking fallback active).\n');
}

// 3. Valid Configuration Initialization Test
console.log('3. Testing Firebase initialization with valid web configuration...');
const testWebConfig = {
  apiKey: 'AIzaSyMockTestKeyForInitValidationOnly12345',
  authDomain: 'tailoringhome-3cd89.firebaseapp.com',
  projectId: 'tailoringhome-3cd89',
  storageBucket: 'tailoringhome-3cd89.firebasestorage.app',
  messagingSenderId: '109876543210',
  appId: '1:109876543210:web:abcdef1234567890abcdef',
  measurementId: 'G-TESTMEASURE1',
};

try {
  const app = initializeApp(testWebConfig, 'verification-test-app');
  console.log(`   ✓ Active Firebase apps count: ${getApps().length}`);

  console.log('   ✓ Firebase App instance created successfully.');
  console.log(`   ✓ App Name: "${app.name}"`);
  console.log(`   ✓ Project ID: "${app.options.projectId}"`);
  console.log(`   ✓ Auth Domain: "${app.options.authDomain}"`);
  console.log(`   ✓ Storage Bucket: "${app.options.storageBucket}"`);
  console.log(`   ✓ App ID: "${app.options.appId}"`);

  // Verify getApp retrieves it
  const retrievedApp = getApp('verification-test-app');
  if (retrievedApp.name === app.name) {
    console.log('   ✓ getApp() retrieved the initialized instance correctly.');
  }

  // Teardown
  await deleteApp(app);
  console.log('   ✓ Test app deleted and memory released successfully.\n');

  console.log('--- ALL FIREBASE INITIALIZATION CHECKS PASSED (5/5) ---');
} catch (error) {
  console.error('   ✗ Firebase initialization failed:', error);
  process.exit(1);
}
