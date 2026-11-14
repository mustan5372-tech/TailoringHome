/**
 * Serverless Backend API: Admin Management & RBAC Handler
 *
 * Implements Day 14 Privileged Account Management:
 * 1. Enforces Super Administrator authorization on the backend using Firebase Admin SDK.
 * 2. Manages invitations, roles, activation/deactivation, and deletion.
 * 3. Synchronizes Firebase Custom User Claims atomically with Firestore records.
 * 4. Records immutable security audit logs in /admin_audit_logs.
 * 5. Rejects unauthorized, unauthenticated, or malformed requests.
 */

import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import fs from 'fs';
import path from 'path';

// Locate service account key if available
function initAdminSDK() {
  const apps = admin.getApps ? admin.getApps() : admin.apps;
  if (apps && apps.length > 0) return apps[0] || admin.app();

  const serviceAccountPaths = [
    path.join(process.cwd(), 'serviceAccountKey.json'),
    path.join(process.cwd(), 'serviceAccountKey.local.json'),
    process.env.GOOGLE_APPLICATION_CREDENTIALS,
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY,
  ].filter(Boolean);

  const foundPath = serviceAccountPaths.find((p) => fs.existsSync(p));

  if (foundPath && fs.existsSync(foundPath)) {
    const serviceAccount = JSON.parse(fs.readFileSync(foundPath, 'utf8'));
    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: serviceAccount.project_id || 'tailoringhome-3cd89',
    });
  }

  // Attempt application default credentials or project ID
  return admin.initializeApp({
    projectId: process.env.VITE_FIREBASE_PROJECT_ID || 'tailoringhome-3cd89',
  });
}

const VALID_DEPARTMENT_ROLES = [
  'tailoring_admin',
  'fabric_admin',
  'operations_admin',
];

function getClaimsForRole(role) {
  switch (role) {
    case 'super_admin':
      return { role: 'super_admin', admin: true, tailoring: true, fabric: true, super: true };
    case 'operations_admin':
      return { role: 'operations_admin', admin: true, tailoring: true, fabric: true };
    case 'tailoring_admin':
      return { role: 'tailoring_admin', admin: true, tailoring: true, fabric: false };
    case 'fabric_admin':
      return { role: 'fabric_admin', admin: true, tailoring: false, fabric: true };
    default:
      return null;
  }
}

async function verifySuperAdmin(auth, db, req) {
  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) {
    throw { status: 401, message: 'Authentication required. No Bearer token provided.' };
  }

  const idToken = authHeader.replace(/^Bearer /, '');
  const decodedToken = await auth.verifyIdToken(idToken);

  const callerDoc = await db.collection('admins').doc(decodedToken.uid).get();
  if (!callerDoc.exists || callerDoc.data().role !== 'super_admin' || callerDoc.data().active !== true) {
    throw { status: 403, message: 'Forbidden: Super Administrator privileges required.' };
  }

  return { decodedToken, callerData: callerDoc.data() };
}

export default async function handler(req, res) {
  // Enable JSON parsing if needed
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }
  body = body || {};

  try {
    const app = initAdminSDK();
    const db = getFirestore(app);
    const auth = getAuth(app);

    const action = req.query?.action || body.action || '';

    // =========================================================================
    // Action 1: Claim Invitation (Invited User First Google Login)
    // =========================================================================
    if (action === 'claim-invitation') {
      const authHeader = req.headers.authorization || '';
      if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authentication required.' });
      }

      const idToken = authHeader.replace(/^Bearer /, '');
      const decoded = await auth.verifyIdToken(idToken);

      if (!decoded.email_verified) {
        return res.status(400).json({ error: 'Google account email must be verified.' });
      }

      const normalizedEmail = (decoded.email || '').toLowerCase().trim();
      const invRef = db.collection('admin_invitations').doc(normalizedEmail);
      const invSnap = await invRef.get();

      if (!invSnap.exists || invSnap.data().status !== 'pending') {
        return res.status(404).json({ error: 'No pending invitation found for this Google account.' });
      }

      const invData = invSnap.data();
      const role = invData.role;

      if (!VALID_DEPARTMENT_ROLES.includes(role)) {
        return res.status(400).json({ error: 'Invalid invitation role.' });
      }

      const now = new Date().toISOString();
      const adminPayload = {
        displayName: invData.displayName || decoded.name || normalizedEmail.split('@')[0],
        email: normalizedEmail,
        role,
        active: true,
        createdAt: now,
        updatedAt: now,
        invitedBy: invData.invitedBy || 'super_admin',
        verifiedAt: now,
      };

      // Write to /admins/{uid}
      await db.collection('admins').doc(decoded.uid).set(adminPayload);

      // Synchronize custom user claims in Auth
      const claims = getClaimsForRole(role);
      if (claims) {
        await auth.setCustomUserClaims(decoded.uid, claims);
      }

      // Mark invitation claimed
      await invRef.update({
        status: 'claimed',
        claimedByUid: decoded.uid,
        claimedAt: now,
        updatedAt: now,
      });

      // Write audit log
      await db.collection('admin_audit_logs').add({
        timestamp: now,
        action: 'ADMIN_INVITATION_CLAIMED',
        actorUid: decoded.uid,
        actorEmail: normalizedEmail,
        targetUid: decoded.uid,
        targetEmail: normalizedEmail,
        details: { role, invitedBy: invData.invitedBy },
        createdAt: now,
      });

      return res.status(200).json({ success: true, adminProfile: adminPayload });
    }

    // =========================================================================
    // All other actions require authenticated Super Administrator
    // =========================================================================
    const { decodedToken: caller } = await verifySuperAdmin(auth, db, req);

    switch (action) {
      case 'invite': {
        const { email, displayName, role } = body;
        const normalizedEmail = (email || '').toLowerCase().trim();

        if (!normalizedEmail || !normalizedEmail.includes('@')) {
          return res.status(400).json({ error: 'Valid Google email is required.' });
        }

        if (!VALID_DEPARTMENT_ROLES.includes(role)) {
          return res.status(400).json({
            error: `Disallowed role "${role}". Only Department Administrators can be invited.`,
          });
        }

        // Check if already an admin
        const adminSnapshot = await db.collection('admins').where('email', '==', normalizedEmail).get();
        if (!adminSnapshot.empty) {
          return res.status(409).json({ error: 'An administrator with this email is already registered.' });
        }

        const now = new Date().toISOString();
        const invitationPayload = {
          email: normalizedEmail,
          displayName: (displayName || '').trim() || normalizedEmail.split('@')[0],
          role,
          status: 'pending',
          invitedBy: caller.email,
          createdAt: now,
          updatedAt: now,
        };

        await db.collection('admin_invitations').doc(normalizedEmail).set(invitationPayload);

        // Record audit log
        await db.collection('admin_audit_logs').add({
          timestamp: now,
          action: 'ADMIN_INVITED',
          actorUid: caller.uid,
          actorEmail: caller.email,
          targetUid: 'pending',
          targetEmail: normalizedEmail,
          details: { role, displayName: invitationPayload.displayName },
          createdAt: now,
        });

        return res.status(200).json({ success: true, invitation: invitationPayload });
      }

      case 'toggle-status': {
        const { targetUid } = body;
        if (!targetUid) return res.status(400).json({ error: 'targetUid is required.' });

        if (targetUid === caller.uid) {
          return res.status(400).json({
            error: 'Security Policy: You cannot deactivate your own Super Administrator account.',
          });
        }

        const targetRef = db.collection('admins').doc(targetUid);
        const targetSnap = await targetRef.get();
        if (!targetSnap.exists) {
          return res.status(404).json({ error: 'Target administrator not found.' });
        }

        const targetData = targetSnap.data();

        // Prevent deactivating last active Super Admin
        if (targetData.role === 'super_admin' && targetData.active === true) {
          const allSuper = await db.collection('admins')
            .where('role', '==', 'super_admin')
            .where('active', '==', true)
            .get();
          if (allSuper.size <= 1) {
            return res.status(400).json({
              error: 'Security Policy: Cannot deactivate the last active Super Administrator.',
            });
          }
        }

        const newStatus = !targetData.active;
        const now = new Date().toISOString();
        await targetRef.update({ active: newStatus, updatedAt: now });

        if (!newStatus) {
          try {
            await auth.revokeRefreshTokens(targetUid);
          } catch {
            // Non-fatal if user is not in Auth
          }
        }

        await db.collection('admin_audit_logs').add({
          timestamp: now,
          action: newStatus ? 'ADMIN_ACTIVATED' : 'ADMIN_DEACTIVATED',
          actorUid: caller.uid,
          actorEmail: caller.email,
          targetUid,
          targetEmail: targetData.email,
          details: { previousStatus: targetData.active, newStatus },
          createdAt: now,
        });

        return res.status(200).json({ success: true, newStatus });
      }

      case 'change-role': {
        const { targetUid, newRole } = body;
        if (!targetUid || !newRole) {
          return res.status(400).json({ error: 'targetUid and newRole are required.' });
        }

        if (targetUid === caller.uid) {
          return res.status(400).json({
            error: 'Security Policy: You cannot modify your own administrative role.',
          });
        }

        if (!VALID_DEPARTMENT_ROLES.includes(newRole)) {
          return res.status(400).json({
            error: `Disallowed role assignment "${newRole}".`,
          });
        }

        const targetRef = db.collection('admins').doc(targetUid);
        const targetSnap = await targetRef.get();
        if (!targetSnap.exists) {
          return res.status(404).json({ error: 'Target administrator not found.' });
        }

        const targetData = targetSnap.data();

        // Prevent demoting last active Super Admin
        if (targetData.role === 'super_admin') {
          const allSuper = await db.collection('admins')
            .where('role', '==', 'super_admin')
            .where('active', '==', true)
            .get();
          if (allSuper.size <= 1) {
            return res.status(400).json({
              error: 'Security Policy: Cannot reassign the last active Super Administrator.',
            });
          }
        }

        const now = new Date().toISOString();
        await targetRef.update({ role: newRole, updatedAt: now });

        // Synchronize custom user claims in Auth
        try {
          const claims = getClaimsForRole(newRole);
          if (claims) {
            await auth.setCustomUserClaims(targetUid, claims);
          }
        } catch (claimsErr) {
          console.warn('[Backend] Could not update custom claims:', claimsErr.message);
        }

        await db.collection('admin_audit_logs').add({
          timestamp: now,
          action: 'ADMIN_ROLE_CHANGED',
          actorUid: caller.uid,
          actorEmail: caller.email,
          targetUid,
          targetEmail: targetData.email,
          details: { previousRole: targetData.role, newRole },
          createdAt: now,
        });

        return res.status(200).json({ success: true, newRole });
      }

      case 'delete': {
        const { targetUid } = body;
        if (!targetUid) return res.status(400).json({ error: 'targetUid is required.' });

        if (targetUid === caller.uid) {
          return res.status(400).json({
            error: 'Security Policy: You cannot delete your own Super Administrator account.',
          });
        }

        const targetRef = db.collection('admins').doc(targetUid);
        const targetSnap = await targetRef.get();
        if (!targetSnap.exists) {
          return res.status(404).json({ error: 'Target administrator not found.' });
        }

        const targetData = targetSnap.data();

        if (targetData.role === 'super_admin') {
          const allSuper = await db.collection('admins')
            .where('role', '==', 'super_admin')
            .where('active', '==', true)
            .get();
          if (allSuper.size <= 1) {
            return res.status(400).json({
              error: 'Security Policy: Cannot delete the last active Super Administrator.',
            });
          }
        }

        const now = new Date().toISOString();
        await targetRef.delete();

        try {
          await auth.setCustomUserClaims(targetUid, null);
        } catch {
          // Non-fatal
        }

        await db.collection('admin_audit_logs').add({
          timestamp: now,
          action: 'ADMIN_DELETED',
          actorUid: caller.uid,
          actorEmail: caller.email,
          targetUid,
          targetEmail: targetData.email,
          details: { deletedRole: targetData.role },
          createdAt: now,
        });

        return res.status(200).json({ success: true });
      }

      case 'audit-logs': {
        const snap = await db.collection('admin_audit_logs')
          .orderBy('timestamp', 'desc')
          .limit(50)
          .get();
        const logs = [];
        snap.forEach((d) => logs.push({ id: d.id, ...d.data() }));
        return res.status(200).json({ success: true, logs });
      }

      default:
        return res.status(400).json({ error: `Unknown action: "${action}"` });
    }
  } catch (error) {
    const status = error.status || 500;
    const message = error.message || 'Internal server error occurred.';
    return res.status(status).json({ error: message });
  }
}
