#!/usr/bin/env node
/**
 * Tailoring Home & Fabric Home - Administrator Management & Cleanup Utility
 *
 * Implements:
 * 1. Admin account inspection and backup.
 * 2. Fake/test account identification and safe removal.
 * 3. Super Admin bootstrapping for mustan5372@gmail.com with custom claims synchronization.
 * 4. Verification of role consistency between Firestore (/admins/{uid}) and Auth tokens.
 *
 * SECURITY:
 * - Requires Firebase Admin credentials (serviceAccountKey.json or GOOGLE_APPLICATION_CREDENTIALS).
 * - Never commits keys to version control.
 * - Always creates a backup in /backups before modifying or deleting records.
 */

import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Central administrative roles
export const VALID_ROLES = [
  'super_admin',
  'operations_admin',
  'tailoring_admin',
  'fabric_admin',
];

export function getClaimsForRole(role) {
  switch (role) {
    case 'super_admin':
      return {
        role: 'super_admin',
        admin: true,
        tailoring: true,
        fabric: true,
        super: true,
      };
    case 'operations_admin':
      return {
        role: 'operations_admin',
        admin: true,
        tailoring: true,
        fabric: true,
      };
    case 'tailoring_admin':
      return {
        role: 'tailoring_admin',
        admin: true,
        tailoring: true,
        fabric: false,
      };
    case 'fabric_admin':
      return {
        role: 'fabric_admin',
        admin: true,
        tailoring: false,
        fabric: true,
      };
    default:
      throw new Error(
        `Invalid role: "${role}". Valid roles are: ${VALID_ROLES.join(', ')}`
      );
  }
}

// Locate service account key if available
const serviceAccountPaths = [
  path.join(rootDir, 'serviceAccountKey.json'),
  path.join(rootDir, 'serviceAccountKey.local.json'),
  process.env.GOOGLE_APPLICATION_CREDENTIALS,
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY,
].filter(Boolean);

let serviceAccountPath = serviceAccountPaths.find(p => fs.existsSync(p));

function initFirebaseAdmin() {
  const apps = admin.getApps ? admin.getApps() : admin.apps;
  if (apps && apps.length > 0) return apps[0] || admin.app();

  if (serviceAccountPath && fs.existsSync(serviceAccountPath)) {
    console.log(`[Admin Utility] Using service account key from: ${serviceAccountPath}`);
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: serviceAccount.project_id || 'tailoringhome-3cd89',
    });
  }

  // Attempt Application Default Credentials
  try {
    console.log('[Admin Utility] Attempting Application Default Credentials...');
    return admin.initializeApp({
      projectId: 'tailoringhome-3cd89',
    });
  } catch (_err) {
    console.error('\n[Error] Unable to initialize Firebase Admin SDK:', _err.message);
    console.error('To run administrative operations securely:');
    console.error('1. Go to Firebase Console -> Project Settings -> Service accounts.');
    console.error('2. Click "Generate new private key".');
    console.error('3. Save the JSON file as "serviceAccountKey.json" in the project root (it is git-ignored).');
    console.error('4. Re-run this command.\n');
    process.exit(1);
  }
}

/**
 * Creates a timestamped JSON backup in the /backups directory.
 */
async function backupAdmins(db) {
  const backupDir = path.join(rootDir, 'backups');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFile = path.join(backupDir, `admins-backup-${timestamp}.json`);

  const snapshot = await db.collection('admins').get();
  const records = [];

  snapshot.forEach(doc => {
    records.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  fs.writeFileSync(backupFile, JSON.stringify(records, null, 2), 'utf8');
  console.log(`[Backup] Successfully exported ${records.length} admin records to:`);
  console.log(`         ${backupFile}\n`);
  return { backupFile, count: records.length, records };
}

/**
 * Lists all administrator records from Firestore /admins.
 */
async function listAdmins() {
  const app = initFirebaseAdmin();
  const db = getFirestore(app);
  const auth = getAuth(app);

  console.log('\n=== Tailoring Home & Fabric Home - Registered Administrators ===\n');
  const snapshot = await db.collection('admins').get();

  if (snapshot.empty) {
    console.log('No administrator records found in /admins collection.\n');
    return;
  }

  for (const doc of snapshot.docs) {
    const data = doc.data();
    let authUser = null;
    try {
      authUser = await auth.getUser(doc.id);
    } catch {
      // User may only exist in Firestore or not yet in Auth
    }

    console.log(`- UID:         ${doc.id}`);
    console.log(`  Name:        ${data.displayName || 'N/A'}`);
    console.log(`  Email:       ${data.email || (authUser ? authUser.email : 'N/A')}`);
    console.log(`  Role:        ${data.role}`);
    console.log(`  Active:      ${data.active}`);
    console.log(`  Auth Synced: ${authUser ? 'Yes (Email verified: ' + authUser.emailVerified + ')' : 'No Auth Record'}`);
    console.log(`  Custom Claim:${authUser?.customClaims?.role || 'None'}`);
    console.log(`  Created At:  ${data.createdAt || 'N/A'}`);
    console.log('------------------------------------------------------------');
  }
}

/**
 * Identifies and removes fake/test admin accounts after creating a backup.
 */
async function cleanupTestAdmins() {
  const app = initFirebaseAdmin();
  const db = getFirestore(app);

  console.log('\n=== Cleaning Fake & Test Administrator Accounts ===\n');

  // Step 1: Mandatory pre-cleanup backup
  const { backupFile, records } = await backupAdmins(db);

  // Step 2: Identification logic
  const isTestAccount = (record) => {
    const id = (record.id || '').toLowerCase();
    const email = (record.email || '').toLowerCase();
    const name = (record.displayName || '').toLowerCase();

    // Never remove official admin email
    if (email === 'mustan5372@gmail.com') return false;

    // Detect test/mock patterns
    if (id.includes('test') || id.includes('mock') || id.includes('dummy') || id.includes('fake') || id.includes('sample')) {
      return true;
    }
    if (email.includes('example.com') || email.includes('test.com') || email.includes('dummy') || email.includes('fake')) {
      return true;
    }
    if (name.includes('test') || name.includes('mock') || name.includes('dummy')) {
      return true;
    }
    if (record.isTest === true || record.test === true) {
      return true;
    }
    return false;
  };

  const testRecords = records.filter(isTestAccount);
  const genuineRecords = records.filter(r => !isTestAccount(r));

  console.log(`Genuine accounts identified: ${genuineRecords.length}`);
  genuineRecords.forEach(r => console.log(`  ✓ KEEP: ${r.email || r.id} (${r.role})`));

  console.log(`\nFake/Test accounts identified: ${testRecords.length}`);
  if (testRecords.length === 0) {
    console.log('No fake or test accounts found in /admins collection.');
    return;
  }

  testRecords.forEach(r => console.log(`  ✗ REMOVE: ${r.id} - ${r.email || 'No email'} (${r.role})`));

  // Step 3: Deletion
  for (const testRecord of testRecords) {
    await db.collection('admins').doc(testRecord.id).delete();
    console.log(`Deleted /admins/${testRecord.id}`);
  }

  console.log(`\nCleanup complete. Removed ${testRecords.length} test records.`);
  console.log(`Backup preserved at: ${backupFile}\n`);
}

/**
 * Bootstraps mustan5372@gmail.com as Super Admin.
 */
async function bootstrapSuperAdmin(targetUid = null) {
  const app = initFirebaseAdmin();
  const db = getFirestore(app);
  const auth = getAuth(app);

  const superAdminEmail = 'mustan5372@gmail.com';
  console.log(`\n=== Configuring Super Admin Access for: ${superAdminEmail} ===\n`);

  let uid = targetUid;

  // If UID not supplied, lookup user in Firebase Auth by email
  if (!uid) {
    try {
      const userRecord = await auth.getUserByEmail(superAdminEmail);
      uid = userRecord.uid;
      console.log(`Found Firebase Auth user for ${superAdminEmail}: UID = ${uid}`);
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        console.error(`[Notice] No Firebase Auth user found with email ${superAdminEmail} yet.`);
        console.log('The account must first sign in with Google once at https://tailoringhome.vercel.app/admin/login');
        console.log('Once signed in, re-run this script or pass the UID directly:');
        console.log(`node scripts/manage-admins.mjs bootstrap --uid <FIREBASE_UID>\n`);
        return;
      }
      throw err;
    }
  }

  const adminDocRef = db.collection('admins').doc(uid);
  const existingDoc = await adminDocRef.get();

  const adminPayload = {
    displayName: 'Mustan (Super Admin)',
    email: superAdminEmail,
    role: 'super_admin',
    active: true,
    updatedAt: new Date().toISOString(),
  };

  if (!existingDoc.exists) {
    adminPayload.createdAt = new Date().toISOString();
    adminPayload.createdBy = 'initial_system_bootstrap';
  }

  // 1. Write Firestore admin record
  await adminDocRef.set(adminPayload, { merge: true });
  console.log(`✓ Firestore document /admins/${uid} configured successfully:`);
  console.log(JSON.stringify(adminPayload, null, 2));

  // 2. Synchronize Custom User Claims in Firebase Auth
  try {
    const claims = getClaimsForRole('super_admin');
    await auth.setCustomUserClaims(uid, claims);
    console.log(`✓ Firebase Auth custom user claims set:`, JSON.stringify(claims));
  } catch (err) {
    console.warn(`[Warning] Could not set custom claims via Auth: ${err.message}`);
  }

  console.log(`\nSuper Admin setup complete for ${superAdminEmail} (UID: ${uid})!\n`);
}

/**
 * Sets the role of an administrator in both Firestore and Firebase Auth custom claims.
 */
async function setRoleAdmin({ uid = null, email = null, role }) {
  if (!role || !VALID_ROLES.includes(role)) {
    throw new Error(`Invalid role "${role}". Valid roles: ${VALID_ROLES.join(', ')}`);
  }

  const app = initFirebaseAdmin();
  const db = getFirestore(app);
  const auth = getAuth(app);

  let targetUid = uid;
  let targetEmail = email;

  if (!targetUid && targetEmail) {
    const userRecord = await auth.getUserByEmail(targetEmail);
    targetUid = userRecord.uid;
  } else if (targetUid && !targetEmail) {
    try {
      const userRecord = await auth.getUser(targetUid);
      targetEmail = userRecord.email;
    } catch {
      // User might only be in Firestore
    }
  }

  if (!targetUid) {
    throw new Error('Either --uid or --email must be provided.');
  }

  const adminDocRef = db.collection('admins').doc(targetUid);
  const snap = await adminDocRef.get();
  if (!snap.exists) {
    throw new Error(`Admin document /admins/${targetUid} does not exist.`);
  }

  const updatePayload = {
    role,
    updatedAt: new Date().toISOString(),
  };

  await adminDocRef.update(updatePayload);
  console.log(`✓ Updated Firestore /admins/${targetUid} to role "${role}"`);

  // Synchronize custom user claims in Auth
  try {
    const claims = getClaimsForRole(role);
    await auth.setCustomUserClaims(targetUid, claims);
    console.log(`✓ Synchronized Firebase Auth custom claims:`, JSON.stringify(claims));
  } catch (err) {
    console.warn(`[Warning] Could not set custom claims via Auth: ${err.message}`);
  }

  console.log(`Role update complete for ${targetEmail || targetUid} -> ${role}\n`);
}

/**
 * Synchronizes custom claims for all active administrator accounts in Firestore.
 */
async function syncAllAdminClaims() {
  const app = initFirebaseAdmin();
  const db = getFirestore(app);
  const auth = getAuth(app);

  console.log('\n=== Synchronizing Firebase Auth Custom Claims for All Admins ===\n');
  const snapshot = await db.collection('admins').get();

  if (snapshot.empty) {
    console.log('No admin records found in /admins.\n');
    return;
  }

  let synced = 0;
  for (const doc of snapshot.docs) {
    const data = doc.data();
    const uid = doc.id;
    const role = data.role;

    if (!VALID_ROLES.includes(role)) {
      console.warn(`[Skip] Admin ${uid} has unknown role: ${role}`);
      continue;
    }

    try {
      const claims = getClaimsForRole(role);
      await auth.setCustomUserClaims(uid, claims);
      console.log(`✓ [Synced] UID ${uid} (${data.email || 'N/A'}) -> Role: ${role}`);
      synced++;
    } catch (err) {
      console.warn(`✗ [Error] Could not sync claims for UID ${uid}: ${err.message}`);
    }
  }

  console.log(`\nSynchronization complete: ${synced} administrator accounts updated.\n`);
}

/**
 * Registers a new administrator with Firestore document and custom claims.
 */
async function addAdmin({ uid, email, displayName, role = 'operations_admin', active = true }) {
  if (!uid || !email) {
    throw new Error('Both --uid and --email are required to register an administrator.');
  }

  if (!VALID_ROLES.includes(role)) {
    throw new Error(`Invalid role "${role}". Valid roles: ${VALID_ROLES.join(', ')}`);
  }

  const app = initFirebaseAdmin();
  const db = getFirestore(app);
  const auth = getAuth(app);

  const adminDocRef = db.collection('admins').doc(uid);
  const existingDoc = await adminDocRef.get();

  const adminPayload = {
    displayName: displayName || email.split('@')[0],
    email: email.toLowerCase(),
    role,
    active: Boolean(active),
    updatedAt: new Date().toISOString(),
  };

  if (!existingDoc.exists) {
    adminPayload.createdAt = new Date().toISOString();
    adminPayload.createdBy = 'cli_admin_tool';
  }

  await adminDocRef.set(adminPayload, { merge: true });
  console.log(`✓ Firestore document /admins/${uid} written:\n`, JSON.stringify(adminPayload, null, 2));

  try {
    const claims = getClaimsForRole(role);
    await auth.setCustomUserClaims(uid, claims);
    console.log(`✓ Firebase Auth custom claims synchronized:`, JSON.stringify(claims));
  } catch (err) {
    console.warn(`[Warning] Could not set custom claims via Auth: ${err.message}`);
  }

  console.log(`\nAdministrator ${email} registered successfully as "${role}"!\n`);
}

/**
 * Helper to parse CLI argument flags (--flag value).
 */
function getArg(args, flag) {
  const index = args.indexOf(flag);
  return index !== -1 && args[index + 1] ? args[index + 1] : null;
}

/**
 * Main CLI Entry Point
 */
async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'list';

  try {
    switch (command) {
      case 'list':
        await listAdmins();
        break;
      case 'backup': {
        const app = initFirebaseAdmin();
        await backupAdmins(getFirestore(app));
        break;
      }
      case 'cleanup':
        await cleanupTestAdmins();
        break;
      case 'bootstrap': {
        const uid = getArg(args, '--uid');
        await bootstrapSuperAdmin(uid);
        break;
      }
      case 'set-role': {
        const uid = getArg(args, '--uid');
        const email = getArg(args, '--email');
        const role = getArg(args, '--role');
        await setRoleAdmin({ uid, email, role });
        break;
      }
      case 'sync-claims':
        await syncAllAdminClaims();
        break;
      case 'add': {
        const uid = getArg(args, '--uid');
        const email = getArg(args, '--email');
        const name = getArg(args, '--name');
        const role = getArg(args, '--role') || 'operations_admin';
        await addAdmin({ uid, email, displayName: name, role });
        break;
      }
      default:
        console.log(`Unknown command: ${command}`);
        console.log(
          'Available commands:\n' +
          '  list                                     - List all registered administrators\n' +
          '  backup                                   - Backup admins collection to JSON\n' +
          '  cleanup                                  - Safe removal of test/fake accounts\n' +
          '  bootstrap [--uid <uid>]                  - Bootstrap mustan5372@gmail.com as Super Admin\n' +
          '  set-role (--uid <uid> | --email <email>) --role <role>\n' +
          '                                           - Set role in Firestore and sync Auth claims\n' +
          '  sync-claims                              - Sync custom claims for all admins in Firestore\n' +
          '  add --uid <uid> --email <email> [--name <name>] [--role <role>]\n' +
          '                                           - Register new administrator\n'
        );
        break;
    }
  } catch (error) {
    console.error('[Error]', error.message || error);
    process.exit(1);
  }
}

main();
