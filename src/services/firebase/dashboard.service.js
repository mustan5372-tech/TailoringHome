/**
 * Dashboard Service Layer (Day 15)
 * Dynamic Firebase-Powered Admin Dashboard Service.
 *
 * Responsibilities:
 * 1. Role-based data fetching and listeners for all four administrator roles:
 *    - super_admin: Dual-business scope (Tailoring Home + Fabric Home + Platform)
 *    - operations_admin: Dual-business scope (Tailoring Home + Fabric Home)
 *    - tailoring_admin: Tailoring Home only (Must NEVER query Fabric collections)
 *    - fabric_admin: Fabric Home only (Must NEVER query Tailoring collections)
 * 2. Real-time Firestore snapshot subscriptions with strict unmount cleanup.
 * 3. Accurate statistics aggregation from actual Firestore documents (zero fallback if empty).
 * 4. Genuine activity log formatting from /admin_audit_logs without sensitive exposure.
 * 5. Customer enquiry status breakdown and latest enquiry extraction.
 * 6. Resilient error handling without mock fallbacks.
 */

import {
  collection,
  query,
  limit,
  onSnapshot,
  getDocs,
} from 'firebase/firestore';
import { db, isConfigured } from '../../config/firebase.config.js';
import { COLLECTIONS } from './firestore.service.js';
import { ROLES } from '../../constants/roles.js';

/**
 * Format timestamp safely for human display.
 * @param {string|number|Date|object} timestamp
 * @returns {string}
 */
export const formatDashboardTimestamp = (timestamp) => {
  if (!timestamp) return 'Just now';

  try {
    let date;
    if (timestamp && typeof timestamp.toDate === 'function') {
      date = timestamp.toDate();
    } else if (timestamp && timestamp.seconds) {
      date = new Date(timestamp.seconds * 1000);
    } else {
      date = new Date(timestamp);
    }

    if (isNaN(date.getTime())) return 'Recently';

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return 'Recently';
  }
};

/**
 * Sanitizes and formats an administrative audit log entry.
 * Strictly avoids exposing sensitive tokens, passwords, or raw secrets.
 *
 * @param {object} log - Raw audit document
 * @returns {object} Formatted audit activity
 */
export const formatAuditActivity = (log) => {
  const { action = 'ACTIVITY', actorEmail, targetEmail, details = {}, timestamp, createdAt } = log;
  const time = timestamp || createdAt || new Date().toISOString();

  let description = 'System activity recorded';
  let business = 'Administrative';
  let category = 'system';

  switch (action) {
    case 'CREATE_ADMIN_INVITATION':
    case 'INVITE_ADMIN': {
      const roleName = details.role ? details.role.replace(/_/g, ' ') : 'administrator';
      description = `Invited ${targetEmail || 'new administrator'} as ${roleName}`;
      business = 'Admin Staff';
      category = 'admin';
      break;
    }
    case 'UPDATE_ADMIN_ROLE': {
      const newRole = details.newRole || details.role || 'updated role';
      description = `Updated role for ${targetEmail || 'administrator'} to ${newRole.replace(/_/g, ' ')}`;
      business = 'Admin Staff';
      category = 'admin';
      break;
    }
    case 'ACTIVATE_ADMIN': {
      description = `Activated account for ${targetEmail || 'administrator'}`;
      business = 'Admin Staff';
      category = 'admin';
      break;
    }
    case 'DEACTIVATE_ADMIN': {
      description = `Deactivated account for ${targetEmail || 'administrator'}`;
      business = 'Admin Staff';
      category = 'admin';
      break;
    }
    case 'DELETE_ADMIN_RECORD': {
      description = `Removed administrator account (${targetEmail || 'staff'})`;
      business = 'Admin Staff';
      category = 'admin';
      break;
    }
    case 'REVOKE_ADMIN_INVITATION': {
      description = `Revoked pending invitation for ${targetEmail || 'candidate'}`;
      business = 'Admin Staff';
      category = 'admin';
      break;
    }
    case 'CLAIM_INVITATION': {
      description = `Verified Google account and claimed admin seat (${actorEmail || targetEmail || 'verified admin'})`;
      business = 'Admin Staff';
      category = 'admin';
      break;
    }
    case 'CREATE_CATALOGUE_ITEM': {
      const itemTitle = details.title || details.name || 'Catalogue item';
      description = `Added new catalogue item: "${itemTitle}"`;
      business = details.business === 'fabric' ? 'Fabric Home' : 'Tailoring Home';
      category = 'catalogue';
      break;
    }
    case 'UPDATE_CATALOGUE_ITEM': {
      const itemTitle = details.title || details.name || 'Catalogue item';
      description = `Updated catalogue item: "${itemTitle}"`;
      business = details.business === 'fabric' ? 'Fabric Home' : 'Tailoring Home';
      category = 'catalogue';
      break;
    }
    case 'PUBLISH_CATALOGUE_ITEM': {
      const itemTitle = details.title || details.name || 'Catalogue item';
      description = `Published catalogue item: "${itemTitle}"`;
      business = details.business === 'fabric' ? 'Fabric Home' : 'Tailoring Home';
      category = 'catalogue';
      break;
    }
    case 'UNPUBLISH_CATALOGUE_ITEM': {
      const itemTitle = details.title || details.name || 'Catalogue item';
      description = `Moved catalogue item to drafts: "${itemTitle}"`;
      business = details.business === 'fabric' ? 'Fabric Home' : 'Tailoring Home';
      category = 'catalogue';
      break;
    }
    case 'DELETE_CATALOGUE_ITEM': {
      const itemTitle = details.title || details.name || 'Catalogue item';
      description = `Deleted catalogue item: "${itemTitle}"`;
      business = details.business === 'fabric' ? 'Fabric Home' : 'Tailoring Home';
      category = 'catalogue';
      break;
    }
    case 'CREATE_GALLERY_ITEM':
    case 'UPLOAD_GALLERY_IMAGE': {
      const cat = details.category === 'fabric' ? 'Fabric Swatch' : 'Tailoring Showcase';
      description = `Uploaded new image to gallery (${cat})`;
      business = details.category === 'fabric' ? 'Fabric Home' : 'Tailoring Home';
      category = 'gallery';
      break;
    }
    case 'UPDATE_GALLERY_ITEM': {
      const imgTitle = details.title || 'showcase image';
      description = `Updated gallery showcase item: "${imgTitle}"`;
      business = details.category === 'fabric' ? 'Fabric Home' : 'Tailoring Home';
      category = 'gallery';
      break;
    }
    case 'DELETE_GALLERY_ITEM': {
      description = `Removed image from showcase gallery`;
      business = details.category === 'fabric' ? 'Fabric Home' : 'Tailoring Home';
      category = 'gallery';
      break;
    }
    case 'UPDATE_ENQUIRY_STATUS': {
      const newStatus = details.newStatus || 'processed';
      description = `Updated customer enquiry status to "${newStatus.replace(/_/g, ' ')}"`;
      business = details.business === 'fabric' ? 'Fabric Home' : 'Tailoring Home';
      category = 'enquiry';
      break;
    }
    case 'CLEANUP_ORPHANED_FILES': {
      const count = details.deletedCount || 0;
      description = `Executed Storage cleanup routine (${count} orphaned file${count === 1 ? '' : 's'} removed)`;
      business = 'System Safety';
      category = 'system';
      break;
    }
    default: {
      const words = action.toLowerCase().split('_');
      description = words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      if (details.business === 'fabric') business = 'Fabric Home';
      else if (details.business === 'tailoring') business = 'Tailoring Home';
      else business = 'Platform Operations';
      category = 'general';
      break;
    }
  }

  return {
    id: log.id || `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    description,
    actor: actorEmail || 'system',
    business,
    category,
    timestamp: time,
    formattedTime: formatDashboardTimestamp(time),
  };
};

/**
 * Normalizes customer enquiry records.
 *
 * @param {object} docData - Raw Firestore doc data
 * @param {string} id - Document ID
 * @returns {object} Formatted enquiry
 */
export const formatCustomerEnquiry = (docData, id) => {
  const {
    name = 'Customer',
    phone = '',
    email = '',
    service = 'General Enquiry',
    message = '',
    status = 'pending',
    createdAt,
  } = docData;

  // Infer business scope from service or enquiry text
  const lowerService = (service || '').toLowerCase();
  const lowerMsg = (message || '').toLowerCase();
  let business = 'tailoring';
  if (
    lowerService.includes('fabric') ||
    lowerService.includes('swatch') ||
    lowerService.includes('silk') ||
    lowerService.includes('cotton') ||
    lowerService.includes('linen') ||
    lowerMsg.includes('fabric') ||
    lowerMsg.includes('swatch')
  ) {
    business = 'fabric';
  }

  return {
    id,
    name: name || 'Customer',
    phone: phone || '',
    email: email || '',
    service: service || 'General Consultation',
    message: message || '',
    status: status || 'pending',
    business,
    createdAt: createdAt || new Date().toISOString(),
    formattedTime: formatDashboardTimestamp(createdAt),
  };
};

/**
 * Subscribes to real-time dashboard data with strict role boundaries.
 * Ensures that departmental administrators NEVER query unauthorized collections.
 * Returns an unbind function for clean unmounting.
 *
 * @param {object} options
 * @param {string} options.role - Current administrator role
 * @param {function} options.onData - Callback invoked when data updates
 * @param {function} options.onError - Callback invoked on query errors
 * @returns {function} Unsubscribe function
 */
export const subscribeToDashboardData = ({ role, onData, onError }) => {
  if (!isConfigured || !db) {
    onData(createEmptyDashboardState(role));
    return () => {};
  }

  const isSuper = role === ROLES.SUPER_ADMIN;
  const isOps = role === ROLES.OPERATIONS_ADMIN;
  const canTailoring = isSuper || isOps || role === ROLES.TAILORING_ADMIN;
  const canFabric = isSuper || isOps || role === ROLES.FABRIC_ADMIN;

  const unsubscribes = [];
  let isMounted = true;

  // Local state caches across active listeners
  const dataCache = {
    tailoringItems: [],
    fabricItems: [],
    galleryItems: [],
    enquiries: [],
    auditLogs: [],
  };

  const recomputeAndNotify = () => {
    if (!isMounted) return;

    try {
      const stats = computeDashboardStats({
        role,
        tailoringItems: dataCache.tailoringItems,
        fabricItems: dataCache.fabricItems,
        galleryItems: dataCache.galleryItems,
        enquiries: dataCache.enquiries,
      });

      // Filter and format activities for current role
      const filteredActivities = filterActivitiesByRole(dataCache.auditLogs, role);
      const recentActivities = filteredActivities
        .slice(0, 8)
        .map(formatAuditActivity);

      // Filter and format customer enquiries for current role
      const filteredEnquiries = filterEnquiriesByRole(dataCache.enquiries, role);
      const recentEnquiries = filteredEnquiries
        .slice(0, 6)
        .map((e) => formatCustomerEnquiry(e, e.id));

      onData({
        role,
        stats,
        recentActivities,
        recentEnquiries,
        loading: false,
        error: null,
      });
    } catch (err) {
      console.warn('[DashboardService] Error recomputing dashboard data:', err);
      if (onError) onError(err);
    }
  };

  // 1. TAILORING SERVICES LISTENER (Super, Operations, Tailoring Admin ONLY)
  if (canTailoring) {
    try {
      const colRef = collection(db, COLLECTIONS.TAILORING);
      const unsub = onSnapshot(
        colRef,
        (snap) => {
          dataCache.tailoringItems = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
          recomputeAndNotify();
        },
        (err) => {
          console.warn('[DashboardService] Tailoring listener error:', err.message);
          dataCache.tailoringItems = [];
          recomputeAndNotify();
        }
      );
      unsubscribes.push(unsub);
    } catch (e) {
      console.warn('[DashboardService] Failed to bind tailoring listener:', e.message);
    }
  }

  // 2. FABRIC CATALOGUE LISTENER (Super, Operations, Fabric Admin ONLY)
  // Departmental Isolation: Tailoring Admin NEVER triggers this listener.
  if (canFabric) {
    try {
      const colRef = collection(db, COLLECTIONS.FABRICS);
      const unsub = onSnapshot(
        colRef,
        (snap) => {
          dataCache.fabricItems = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
          recomputeAndNotify();
        },
        (err) => {
          console.warn('[DashboardService] Fabric listener error:', err.message);
          dataCache.fabricItems = [];
          recomputeAndNotify();
        }
      );
      unsubscribes.push(unsub);
    } catch (e) {
      console.warn('[DashboardService] Failed to bind fabric listener:', e.message);
    }
  }

  // 3. GALLERY SHOWCASE LISTENER
  try {
    const colRef = collection(db, COLLECTIONS.GALLERY);
    const unsub = onSnapshot(
      colRef,
      (snap) => {
        dataCache.galleryItems = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        recomputeAndNotify();
      },
      (err) => {
        console.warn('[DashboardService] Gallery listener error:', err.message);
        dataCache.galleryItems = [];
        recomputeAndNotify();
      }
    );
    unsubscribes.push(unsub);
  } catch (e) {
    console.warn('[DashboardService] Failed to bind gallery listener:', e.message);
  }

  // 4. CUSTOMER ENQUIRIES LISTENER (Ordered by createdAt desc)
  try {
    const colRef = collection(db, COLLECTIONS.ENQUIRIES);
    const q = query(colRef, limit(50));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        // Client-side sort by createdAt descending
        items.sort((a, b) => {
          const tA = new Date(a.createdAt?.toDate ? a.createdAt.toDate() : a.createdAt || 0).getTime();
          const tB = new Date(b.createdAt?.toDate ? b.createdAt.toDate() : b.createdAt || 0).getTime();
          return tB - tA;
        });
        dataCache.enquiries = items;
        recomputeAndNotify();
      },
      (err) => {
        console.warn('[DashboardService] Enquiry listener error:', err.message);
        dataCache.enquiries = [];
        recomputeAndNotify();
      }
    );
    unsubscribes.push(unsub);
  } catch (e) {
    console.warn('[DashboardService] Failed to bind enquiries listener:', e.message);
  }

  // 5. AUDIT LOGS LISTENER (/admin_audit_logs)
  // Fetches genuine audit log records
  try {
    const primaryCol = COLLECTIONS.AUDIT_LOGS;
    const colRef = collection(db, primaryCol);
    const q = query(colRef, limit(40));

    const unsub = onSnapshot(
      q,
      (snap) => {
        const logs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

        // Sort descending by timestamp / createdAt
        logs.sort((a, b) => {
          const tA = new Date(a.timestamp || a.createdAt || 0).getTime();
          const tB = new Date(b.timestamp || b.createdAt || 0).getTime();
          return tB - tA;
        });

        dataCache.auditLogs = logs;
        recomputeAndNotify();
      },
      async (err) => {
        console.warn(`[DashboardService] Audit log listener error on ${primaryCol}:`, err.message);
        // Fallback: If partitioned dev collection threw or is empty, try un-prefixed collection
        if (primaryCol !== 'admin_audit_logs') {
          try {
            const fallbackRef = collection(db, 'admin_audit_logs');
            const fallbackSnap = await getDocs(query(fallbackRef, limit(30)));
            const fallbackLogs = fallbackSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
            fallbackLogs.sort((a, b) => {
              const tA = new Date(a.timestamp || a.createdAt || 0).getTime();
              const tB = new Date(b.timestamp || b.createdAt || 0).getTime();
              return tB - tA;
            });
            dataCache.auditLogs = fallbackLogs;
            recomputeAndNotify();
            return;
          } catch {
            // Silence fallback error
          }
        }
        dataCache.auditLogs = [];
        recomputeAndNotify();
      }
    );
    unsubscribes.push(unsub);
  } catch (e) {
    console.warn('[DashboardService] Failed to bind audit logs listener:', e.message);
  }

  // Clean unmount callback
  return () => {
    isMounted = false;
    unsubscribes.forEach((unsub) => {
      try {
        if (typeof unsub === 'function') unsub();
      } catch {
        // Ignore unmount error
      }
    });
  };
};

/**
 * Filter activities according to role scope.
 * Super Admin and Operations Admin see all activities.
 * Departmental admins see their business events or general platform events affecting them.
 */
export const filterActivitiesByRole = (logs, role) => {
  if (!Array.isArray(logs)) return [];
  if (role === ROLES.SUPER_ADMIN || role === ROLES.OPERATIONS_ADMIN) {
    return logs;
  }

  if (role === ROLES.TAILORING_ADMIN) {
    return logs.filter((l) => {
      const biz = (l.details?.business || '').toLowerCase();
      const cat = (l.details?.category || '').toLowerCase();
      const action = (l.action || '').toUpperCase();
      return (
        biz === 'tailoring' ||
        cat === 'tailoring' ||
        action.includes('TAILORING') ||
        action.includes('ENQUIRY') ||
        biz === 'administrative' ||
        !biz
      );
    });
  }

  if (role === ROLES.FABRIC_ADMIN) {
    return logs.filter((l) => {
      const biz = (l.details?.business || '').toLowerCase();
      const cat = (l.details?.category || '').toLowerCase();
      const action = (l.action || '').toUpperCase();
      return (
        biz === 'fabric' ||
        cat === 'fabric' ||
        action.includes('FABRIC') ||
        action.includes('ENQUIRY') ||
        biz === 'administrative' ||
        !biz
      );
    });
  }

  return logs;
};

/**
 * Filter enquiries according to role scope.
 */
export const filterEnquiriesByRole = (enquiries, role) => {
  if (!Array.isArray(enquiries)) return [];
  if (role === ROLES.SUPER_ADMIN || role === ROLES.OPERATIONS_ADMIN) {
    return enquiries;
  }

  if (role === ROLES.TAILORING_ADMIN) {
    return enquiries.filter((e) => {
      const lowerService = (e.service || '').toLowerCase();
      return (
        !lowerService.includes('fabric') &&
        !lowerService.includes('swatch') &&
        !lowerService.includes('textile')
      );
    });
  }

  if (role === ROLES.FABRIC_ADMIN) {
    return enquiries.filter((e) => {
      const lowerService = (e.service || '').toLowerCase();
      return (
        lowerService.includes('fabric') ||
        lowerService.includes('swatch') ||
        lowerService.includes('textile') ||
        lowerService.includes('silk') ||
        lowerService.includes('cotton') ||
        lowerService.includes('linen')
      );
    });
  }

  return enquiries;
};

/**
 * Computes live statistics from actual Firestore documents.
 * strictly returns zero if collections are empty.
 */
export const computeDashboardStats = ({
  role,
  tailoringItems = [],
  fabricItems = [],
  galleryItems = [],
  enquiries = [],
}) => {
  const isSuper = role === ROLES.SUPER_ADMIN;
  const isOps = role === ROLES.OPERATIONS_ADMIN;
  const isDual = isSuper || isOps;

  // 1. TAILORING CATALOGUE METRICS
  let tailoringPublished = 0;
  let tailoringDrafts = 0;
  tailoringItems.forEach((item) => {
    const isPublished = item.published === true && item.isDraft !== true;
    if (isPublished) tailoringPublished += 1;
    else tailoringDrafts += 1;
  });

  // 2. FABRIC CATALOGUE METRICS
  let fabricPublished = 0;
  let fabricDrafts = 0;
  fabricItems.forEach((item) => {
    const isPublished = item.published === true && item.isDraft !== true;
    if (isPublished) fabricPublished += 1;
    else fabricDrafts += 1;
  });

  // 3. GALLERY METRICS
  let tailoringGallery = 0;
  let fabricGallery = 0;
  galleryItems.forEach((item) => {
    if (item.category === 'fabric') {
      fabricGallery += 1;
    } else {
      tailoringGallery += 1;
    }
  });

  // 4. CUSTOMER ENQUIRIES METRICS
  const scopedEnquiries = filterEnquiriesByRole(enquiries, role);
  let pendingEnquiries = 0;
  let inProgressEnquiries = 0;
  let completedEnquiries = 0;

  scopedEnquiries.forEach((item) => {
    const st = (item.status || 'pending').toLowerCase();
    if (st === 'pending') {
      pendingEnquiries += 1;
    } else if (st === 'in_progress') {
      inProgressEnquiries += 1;
    } else if (st === 'completed' || st === 'resolved') {
      completedEnquiries += 1;
    } else {
      pendingEnquiries += 1;
    }
  });

  const processedEnquiries = inProgressEnquiries + completedEnquiries;
  const totalEnquiries = scopedEnquiries.length;

  return {
    isDualScope: isDual,
    role,

    // Tailoring specifics
    tailoring: {
      total: tailoringItems.length,
      published: tailoringPublished,
      drafts: tailoringDrafts,
      gallery: tailoringGallery,
    },

    // Fabric specifics
    fabric: {
      total: fabricItems.length,
      published: fabricPublished,
      drafts: fabricDrafts,
      gallery: fabricGallery,
    },

    // Combined totals for Super Admin & Operations Admin
    combined: {
      totalCatalogue: tailoringItems.length + fabricItems.length,
      publishedCatalogue: tailoringPublished + fabricPublished,
      draftCatalogue: tailoringDrafts + fabricDrafts,
      galleryTotal: galleryItems.length,
      totalEnquiries,
      pendingEnquiries,
      processedEnquiries,
    },

    // Role-scoped summary numbers for quick rendering
    enquiries: {
      total: totalEnquiries,
      pending: pendingEnquiries,
      inProgress: inProgressEnquiries,
      completed: completedEnquiries,
      processed: processedEnquiries,
    },
  };
};

/**
 * Creates empty fallback state adhering strictly to zero-count requirement.
 */
export const createEmptyDashboardState = (role) => {
  return {
    role,
    stats: computeDashboardStats({ role }),
    recentActivities: [],
    recentEnquiries: [],
    loading: false,
    error: null,
  };
};
