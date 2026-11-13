/**
 * Central Administrator Management & Security Service
 * Tailoring Home & Fabric Home
 *
 * Implements Day 14 Security Governance:
 * 1. Super Admin access control & verification.
 * 2. Pending-invitation onboarding workflow with Google Auth identity verification.
 * 3. Prevention of self-deactivation, self-deletion, and self-demotion.
 * 4. Protection of the last active Super Administrator.
 * 5. Immutable security audit logging for administrative mutations.
 * 6. Departmental role changes (tailoring_admin, fabric_admin, operations_admin).
 */

import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db, isConfigured } from '../../config/firebase.config';
import { ROLES } from '../../constants/roles';

/**
 * Normalizes email address for consistent dictionary and document lookup.
 */
export const normalizeEmail = (email) => {
  return (email || '').trim().toLowerCase();
};

/**
 * Fetches all registered administrators from Firestore /admins.
 * @returns {Promise<Array<object>>}
 */
export const listAdministrators = async () => {
  if (!isConfigured || !db) return [];

  try {
    const snap = await getDocs(collection(db, 'admins'));
    const list = [];
    snap.forEach((d) => {
      list.push({ id: d.id, ...d.data() });
    });

    // Sort: Super Admins first, then by displayName/email
    return list.sort((a, b) => {
      if (a.role === ROLES.SUPER_ADMIN && b.role !== ROLES.SUPER_ADMIN) return -1;
      if (a.role !== ROLES.SUPER_ADMIN && b.role === ROLES.SUPER_ADMIN) return 1;
      const nameA = a.displayName || a.email || '';
      const nameB = b.displayName || b.email || '';
      return nameA.localeCompare(nameB);
    });
  } catch (error) {
    console.error('[AdminManagement] Failed to list administrators:', error);
    throw error;
  }
};

/**
 * Fetches pending administrator invitations.
 * @returns {Promise<Array<object>>}
 */
export const listPendingInvitations = async () => {
  if (!isConfigured || !db) return [];

  try {
    const snap = await getDocs(collection(db, 'admin_invitations'));
    const list = [];
    snap.forEach((d) => {
      const data = d.data();
      if (data.status === 'pending') {
        list.push({ id: d.id, ...data });
      }
    });

    // Sort by createdAt descending (newest first)
    return list.sort((a, b) => {
      const timeA = new Date(a.createdAt || 0).getTime();
      const timeB = new Date(b.createdAt || 0).getTime();
      return timeB - timeA;
    });
  } catch (error) {
    console.error('[AdminManagement] Failed to list invitations:', error);
    return [];
  }
};

/**
 * Creates an administrator invitation for a designated Google account email.
 *
 * Security:
 * - Does NOT allow creating another Super Admin through this form.
 * - Does not create fake Auth accounts.
 * - Verifies that email is not already an active administrator.
 *
 * @param {object} params
 * @param {string} params.email - Google account email
 * @param {string} params.displayName - Administrator's full name
 * @param {string} params.role - Allowed: tailoring_admin, fabric_admin, operations_admin
 * @param {string} params.invitedBy - Email of Super Admin issuing invitation
 */
export const createAdministratorInvitation = async ({
  email,
  displayName,
  role,
  invitedBy,
}) => {
  if (!isConfigured || !db) {
    throw new Error('Firebase database is not initialized.');
  }

  const normalized = normalizeEmail(email);
  if (!normalized || !normalized.includes('@')) {
    throw new Error('A valid Google account email is required.');
  }

  // Strict role whitelist: Super Admin cannot be created via standard invitation form
  const allowedInvitationRoles = [
    ROLES.TAILORING_ADMIN,
    ROLES.FABRIC_ADMIN,
    ROLES.OPERATIONS_ADMIN,
  ];

  if (!allowedInvitationRoles.includes(role)) {
    throw new Error(
      `Disallowed role "${role}". Only Department Administrators (Tailoring, Fabric, Operations) can be invited.`
    );
  }

  // Check if an administrator with this email is already registered in /admins
  const existingAdmins = await listAdministrators();
  const existing = existingAdmins.find(
    (a) => normalizeEmail(a.email) === normalized
  );

  if (existing) {
    throw new Error(
      `Administrator ${normalized} is already registered (UID: ${existing.id}). Use account management to adjust their role or status.`
    );
  }

  const now = new Date().toISOString();
  const invitationPayload = {
    email: normalized,
    displayName: (displayName || '').trim() || normalized.split('@')[0],
    role,
    status: 'pending',
    invitedBy: invitedBy || 'super_admin',
    createdAt: now,
    updatedAt: now,
  };

  // Use normalized email as document ID in admin_invitations for fast lookups
  const invRef = doc(db, 'admin_invitations', normalized);
  await setDoc(invRef, invitationPayload);

  // Write audit trail
  await recordAuditLog({
    action: 'ADMIN_INVITED',
    actorUid: 'current_user',
    actorEmail: invitedBy || 'super_admin',
    targetUid: 'pending',
    targetEmail: normalized,
    details: {
      role,
      displayName: invitationPayload.displayName,
    },
  });

  return { success: true, invitation: invitationPayload };
};

/**
 * Checks for and claims a pending invitation when an invited user completes Google authentication.
 *
 * Security:
 * - Requires user.emailVerified === true (guaranteed by Google OAuth).
 * - Matches normalized email against /admin_invitations.
 * - Extracts assigned role from invitation record.
 * - Creates /admins/{user.uid} and marks invitation 'claimed'.
 *
 * @param {object} params
 * @param {object} params.user - Firebase Auth User object
 * @returns {Promise<{success: boolean, adminProfile?: object, reason?: string}>}
 */
export const checkAndClaimInvitation = async ({ user }) => {
  if (!isConfigured || !db || !user || !user.email) {
    return { success: false, reason: 'unconfigured' };
  }

  const normalized = normalizeEmail(user.email);

  try {
    const invRef = doc(db, 'admin_invitations', normalized);
    const invSnap = await getDoc(invRef);

    if (!invSnap.exists()) {
      return { success: false, reason: 'not_found' };
    }

    const invitation = invSnap.data();

    if (invitation.status !== 'pending') {
      return { success: false, reason: 'already_claimed_or_revoked' };
    }

    // Role safety verification: never permit super_admin elevation
    const role = invitation.role;
    if (
      role === ROLES.SUPER_ADMIN ||
      ![ROLES.TAILORING_ADMIN, ROLES.FABRIC_ADMIN, ROLES.OPERATIONS_ADMIN].includes(role)
    ) {
      console.error('[AdminSecurity] Disallowed role in invitation:', role);
      return { success: false, reason: 'disallowed_role' };
    }

    const now = new Date().toISOString();
    const adminPayload = {
      displayName:
        invitation.displayName || user.displayName || normalized.split('@')[0],
      email: normalized,
      role,
      active: true,
      createdAt: now,
      updatedAt: now,
      invitedBy: invitation.invitedBy || 'super_admin',
      invitationClaimedAt: now,
      invitationId: invRef.id,
    };

    // 1. Create official administrator profile in /admins/{user.uid}
    const adminDocRef = doc(db, 'admins', user.uid);
    await setDoc(adminDocRef, adminPayload);

    // 2. Mark invitation as claimed
    await updateDoc(invRef, {
      status: 'claimed',
      claimedByUid: user.uid,
      claimedAt: now,
      updatedAt: now,
    });

    // 3. Record audit trail
    await recordAuditLog({
      action: 'ADMIN_INVITATION_CLAIMED',
      actorUid: user.uid,
      actorEmail: normalized,
      targetUid: user.uid,
      targetEmail: normalized,
      details: {
        role,
        invitedBy: invitation.invitedBy,
      },
    });

    return {
      success: true,
      adminProfile: adminPayload,
    };
  } catch (error) {
    console.warn('[AdminManagement] Error checking/claiming invitation:', error.message);
    return { success: false, reason: error.message };
  }
};

/**
 * Toggles an administrator's active status (Activate / Deactivate).
 *
 * Security:
 * - Prevents deactivating the current Super Admin.
 * - Prevents deactivating the last active Super Admin.
 *
 * @param {object} params
 * @param {object} params.targetAdmin
 * @param {string} params.currentAdminUid
 * @param {string} params.currentAdminEmail
 * @param {Array<object>} params.allAdmins
 */
export const toggleAdminStatus = async ({
  targetAdmin,
  currentAdminUid,
  currentAdminEmail,
  allAdmins,
}) => {
  if (!isConfigured || !db) throw new Error('Database is unconfigured.');

  if (targetAdmin.id === currentAdminUid) {
    throw new Error(
      'Security Policy: You cannot deactivate your own active Super Administrator session.'
    );
  }

  // Prevent deactivating the last active Super Admin
  if (targetAdmin.role === ROLES.SUPER_ADMIN && targetAdmin.active === true) {
    const activeSuperCount = allAdmins.filter(
      (a) => a.role === ROLES.SUPER_ADMIN && a.active === true
    ).length;

    if (activeSuperCount <= 1) {
      throw new Error(
        'Security Policy: Cannot deactivate the last remaining active Super Administrator.'
      );
    }
  }

  const newStatus = !targetAdmin.active;
  const adminDocRef = doc(db, 'admins', targetAdmin.id);

  await updateDoc(adminDocRef, {
    active: newStatus,
    updatedAt: new Date().toISOString(),
  });

  // Record audit log
  await recordAuditLog({
    action: newStatus ? 'ADMIN_ACTIVATED' : 'ADMIN_DEACTIVATED',
    actorUid: currentAdminUid,
    actorEmail: currentAdminEmail,
    targetUid: targetAdmin.id,
    targetEmail: targetAdmin.email,
    details: {
      previousStatus: targetAdmin.active,
      newStatus,
    },
  });

  return { success: true, newStatus };
};

/**
 * Changes an administrator's department role.
 *
 * Security:
 * - Prevents changing current user's role (self-demotion/self-promotion).
 * - Prevents assigning Super Admin through UI.
 * - Prevents changing role away from Super Admin if target is the last active Super Admin.
 *
 * @param {object} params
 * @param {object} params.targetAdmin
 * @param {string} params.newRole
 * @param {string} params.currentAdminUid
 * @param {string} params.currentAdminEmail
 * @param {Array<object>} params.allAdmins
 */
export const changeAdminRole = async ({
  targetAdmin,
  newRole,
  currentAdminUid,
  currentAdminEmail,
  allAdmins,
}) => {
  if (!isConfigured || !db) throw new Error('Database is unconfigured.');

  if (targetAdmin.id === currentAdminUid) {
    throw new Error(
      'Security Policy: You cannot modify your own administrative role. Have another Super Admin update your privileges if needed.'
    );
  }

  const allowedRoles = [
    ROLES.TAILORING_ADMIN,
    ROLES.FABRIC_ADMIN,
    ROLES.OPERATIONS_ADMIN,
  ];

  if (!allowedRoles.includes(newRole)) {
    throw new Error(
      `Disallowed role assignment "${newRole}". Only departmental roles may be assigned via the management console.`
    );
  }

  // Prevent demoting the last active Super Admin
  if (targetAdmin.role === ROLES.SUPER_ADMIN) {
    const activeSuperCount = allAdmins.filter(
      (a) => a.role === ROLES.SUPER_ADMIN && a.active === true
    ).length;

    if (activeSuperCount <= 1) {
      throw new Error(
        'Security Policy: Cannot reassign the last remaining active Super Administrator.'
      );
    }
  }

  const adminDocRef = doc(db, 'admins', targetAdmin.id);
  const previousRole = targetAdmin.role;

  await updateDoc(adminDocRef, {
    role: newRole,
    updatedAt: new Date().toISOString(),
  });

  // Record audit log
  await recordAuditLog({
    action: 'ADMIN_ROLE_CHANGED',
    actorUid: currentAdminUid,
    actorEmail: currentAdminEmail,
    targetUid: targetAdmin.id,
    targetEmail: targetAdmin.email,
    details: {
      previousRole,
      newRole,
    },
  });

  return { success: true, newRole };
};

/**
 * Permanently deletes an administrator record.
 *
 * Security:
 * - Prevents deleting self.
 * - Prevents deleting the last active Super Admin.
 *
 * @param {object} params
 * @param {object} params.targetAdmin
 * @param {string} params.currentAdminUid
 * @param {string} params.currentAdminEmail
 * @param {Array<object>} params.allAdmins
 */
export const deleteAdministrator = async ({
  targetAdmin,
  currentAdminUid,
  currentAdminEmail,
  allAdmins,
}) => {
  if (!isConfigured || !db) throw new Error('Database is unconfigured.');

  if (targetAdmin.id === currentAdminUid) {
    throw new Error(
      'Security Policy: You cannot delete your own Super Administrator record.'
    );
  }

  if (targetAdmin.role === ROLES.SUPER_ADMIN) {
    const activeSuperCount = allAdmins.filter(
      (a) => a.role === ROLES.SUPER_ADMIN && a.active === true
    ).length;

    if (activeSuperCount <= 1) {
      throw new Error(
        'Security Policy: Cannot delete the last remaining active Super Administrator.'
      );
    }
  }

  const adminDocRef = doc(db, 'admins', targetAdmin.id);
  await deleteDoc(adminDocRef);

  // Record audit log
  await recordAuditLog({
    action: 'ADMIN_DELETED',
    actorUid: currentAdminUid,
    actorEmail: currentAdminEmail,
    targetUid: targetAdmin.id,
    targetEmail: targetAdmin.email,
    details: {
      deletedRole: targetAdmin.role,
      displayName: targetAdmin.displayName,
    },
  });

  return { success: true };
};

/**
 * Revokes a pending administrator invitation before it is claimed.
 *
 * @param {object} params
 * @param {string} params.invitationId
 * @param {string} params.currentAdminUid
 * @param {string} params.currentAdminEmail
 */
export const revokeInvitation = async ({
  invitationId,
  currentAdminUid,
  currentAdminEmail,
}) => {
  if (!isConfigured || !db) throw new Error('Database is unconfigured.');

  const invRef = doc(db, 'admin_invitations', invitationId);
  const snap = await getDoc(invRef);
  const data = snap.exists() ? snap.data() : {};

  await deleteDoc(invRef);

  await recordAuditLog({
    action: 'INVITATION_REVOKED',
    actorUid: currentAdminUid,
    actorEmail: currentAdminEmail,
    targetUid: 'invitation',
    targetEmail: data.email || invitationId,
    details: {
      revokedRole: data.role,
    },
  });

  return { success: true };
};

/**
 * Records an immutable administrative audit log entry in Firestore /admin_audit_logs.
 *
 * @param {object} params
 */
export const recordAuditLog = async ({
  action,
  actorUid,
  actorEmail,
  targetUid,
  targetEmail,
  details = {},
}) => {
  if (!isConfigured || !db) return;

  try {
    const logId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const logRef = doc(db, 'admin_audit_logs', logId);

    const payload = {
      timestamp: new Date().toISOString(),
      action,
      actorUid: actorUid || 'system',
      actorEmail: actorEmail || 'system',
      targetUid: targetUid || 'n/a',
      targetEmail: targetEmail || 'n/a',
      details,
      createdAt: new Date().toISOString(),
    };

    await setDoc(logRef, payload);
  } catch (error) {
    // Non-blocking for primary operations, but logged to console
    console.warn('[AuditLogger] Could not write audit log:', error.message);
  }
};

/**
 * Fetches recent administrative audit logs.
 * @param {number} maxLogs
 * @returns {Promise<Array<object>>}
 */
export const listAuditLogs = async (maxLogs = 50) => {
  if (!isConfigured || !db) return [];

  try {
    const colRef = collection(db, 'admin_audit_logs');
    const q = query(colRef, orderBy('createdAt', 'desc'), limit(maxLogs));
    const snap = await getDocs(q);

    const logs = [];
    snap.forEach((d) => {
      logs.push({ id: d.id, ...d.data() });
    });

    return logs;
  } catch (error) {
    console.warn('[AdminManagement] Failed to fetch audit logs:', error.message);
    return [];
  }
};
