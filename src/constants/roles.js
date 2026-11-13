/**
 * Central Role & Permission Definition System
 * Tailoring Home & Fabric Home
 *
 * Defines the 4 administrative roles:
 * 1. super_admin       - Unrestricted atelier access & security governance
 * 2. operations_admin  - Dual-business manager across Tailoring Home & Fabric Home
 * 3. tailoring_admin   - Tailoring cuts, Bohra attire, school uniforms & tailoring gallery
 * 4. fabric_admin      - Textile archive, swatches, silk/linen inventory & fabric gallery
 */

export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  OPERATIONS_ADMIN: 'operations_admin',
  TAILORING_ADMIN: 'tailoring_admin',
  FABRIC_ADMIN: 'fabric_admin',
};

export const VALID_ROLES = Object.values(ROLES);

export const ROLE_LABELS = {
  [ROLES.SUPER_ADMIN]: 'Super Administrator',
  [ROLES.OPERATIONS_ADMIN]: 'Operations Administrator',
  [ROLES.TAILORING_ADMIN]: 'Tailoring Administrator',
  [ROLES.FABRIC_ADMIN]: 'Fabric Administrator',
};

export const ROLE_SHORT_LABELS = {
  [ROLES.SUPER_ADMIN]: 'Super Admin',
  [ROLES.OPERATIONS_ADMIN]: 'Operations Admin',
  [ROLES.TAILORING_ADMIN]: 'Tailoring Admin',
  [ROLES.FABRIC_ADMIN]: 'Fabric Admin',
};

export const ROLE_BADGE_VARIANTS = {
  [ROLES.SUPER_ADMIN]: 'maroon',
  [ROLES.OPERATIONS_ADMIN]: 'dark',
  [ROLES.TAILORING_ADMIN]: 'chocolate',
  [ROLES.FABRIC_ADMIN]: 'gold',
};

export const PERMISSIONS = {
  // Business Scopes
  MANAGE_TAILORING: 'manage_tailoring',
  MANAGE_FABRIC: 'manage_fabric',
  MANAGE_BOTH_BUSINESSES: 'manage_both_businesses',

  // Catalogue Management (Add, Edit, Publish, Unpublish, Delete)
  MANAGE_TAILORING_CATALOGUE: 'manage_tailoring_catalogue',
  MANAGE_FABRIC_CATALOGUE: 'manage_fabric_catalogue',

  // Gallery Showcase Management
  MANAGE_TAILORING_GALLERY: 'manage_tailoring_gallery',
  MANAGE_FABRIC_GALLERY: 'manage_fabric_gallery',
  MANAGE_BOTH_GALLERIES: 'manage_both_galleries',

  // Image Studio Asset Pipeline
  ACCESS_IMAGE_STUDIO: 'access_image_studio',
  MANAGE_STUDIO_IMAGES_BOTH_BUSINESSES: 'manage_studio_images_both_businesses',

  // Customer Enquiries
  VIEW_CUSTOMER_ENQUIRIES: 'view_customer_enquiries',
  MANAGE_CUSTOMER_ENQUIRIES: 'manage_customer_enquiries',
  DELETE_CUSTOMER_ENQUIRIES: 'delete_customer_enquiries', // Reserved for Super Admin

  // Operations Dashboard & Analytics
  ACCESS_DASHBOARD: 'access_dashboard',
  VIEW_ANALYTICS: 'view_analytics',
  VIEW_ACTIVITY_LOGS: 'view_activity_logs',

  // Admin Account & Security Governance (Super Admin Exclusive)
  ACCESS_ADMIN_MANAGEMENT: 'access_admin_management',
  CREATE_ADMIN: 'create_admin',
  INVITE_ADMIN: 'invite_admin',
  REMOVE_ADMIN: 'remove_admin',
  DEACTIVATE_ADMIN: 'deactivate_admin',
  CHANGE_ROLES: 'change_roles',
  MODIFY_SECURITY_SETTINGS: 'modify_security_settings',
  MANAGE_STORAGE_CLEANUP: 'manage_storage_cleanup',
};

/**
 * Granular mapping of roles to granted permission sets.
 */
export const ROLE_PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: [
    PERMISSIONS.MANAGE_TAILORING,
    PERMISSIONS.MANAGE_FABRIC,
    PERMISSIONS.MANAGE_BOTH_BUSINESSES,
    PERMISSIONS.MANAGE_TAILORING_CATALOGUE,
    PERMISSIONS.MANAGE_FABRIC_CATALOGUE,
    PERMISSIONS.MANAGE_TAILORING_GALLERY,
    PERMISSIONS.MANAGE_FABRIC_GALLERY,
    PERMISSIONS.MANAGE_BOTH_GALLERIES,
    PERMISSIONS.ACCESS_IMAGE_STUDIO,
    PERMISSIONS.MANAGE_STUDIO_IMAGES_BOTH_BUSINESSES,
    PERMISSIONS.VIEW_CUSTOMER_ENQUIRIES,
    PERMISSIONS.MANAGE_CUSTOMER_ENQUIRIES,
    PERMISSIONS.DELETE_CUSTOMER_ENQUIRIES,
    PERMISSIONS.ACCESS_DASHBOARD,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.VIEW_ACTIVITY_LOGS,
    PERMISSIONS.ACCESS_ADMIN_MANAGEMENT,
    PERMISSIONS.CREATE_ADMIN,
    PERMISSIONS.INVITE_ADMIN,
    PERMISSIONS.REMOVE_ADMIN,
    PERMISSIONS.DEACTIVATE_ADMIN,
    PERMISSIONS.CHANGE_ROLES,
    PERMISSIONS.MODIFY_SECURITY_SETTINGS,
    PERMISSIONS.MANAGE_STORAGE_CLEANUP,
  ],
  [ROLES.OPERATIONS_ADMIN]: [
    PERMISSIONS.MANAGE_TAILORING,
    PERMISSIONS.MANAGE_FABRIC,
    PERMISSIONS.MANAGE_BOTH_BUSINESSES,
    PERMISSIONS.MANAGE_TAILORING_CATALOGUE,
    PERMISSIONS.MANAGE_FABRIC_CATALOGUE,
    PERMISSIONS.MANAGE_TAILORING_GALLERY,
    PERMISSIONS.MANAGE_FABRIC_GALLERY,
    PERMISSIONS.MANAGE_BOTH_GALLERIES,
    PERMISSIONS.ACCESS_IMAGE_STUDIO,
    PERMISSIONS.MANAGE_STUDIO_IMAGES_BOTH_BUSINESSES,
    PERMISSIONS.VIEW_CUSTOMER_ENQUIRIES,
    PERMISSIONS.MANAGE_CUSTOMER_ENQUIRIES,
    PERMISSIONS.ACCESS_DASHBOARD,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.VIEW_ACTIVITY_LOGS,
    // Explicitly NO:
    // DELETE_CUSTOMER_ENQUIRIES, ACCESS_ADMIN_MANAGEMENT, CREATE_ADMIN,
    // INVITE_ADMIN, REMOVE_ADMIN, DEACTIVATE_ADMIN, CHANGE_ROLES,
    // MODIFY_SECURITY_SETTINGS, MANAGE_STORAGE_CLEANUP
  ],
  [ROLES.TAILORING_ADMIN]: [
    PERMISSIONS.MANAGE_TAILORING,
    PERMISSIONS.MANAGE_TAILORING_CATALOGUE,
    PERMISSIONS.MANAGE_TAILORING_GALLERY,
    PERMISSIONS.ACCESS_IMAGE_STUDIO,
    PERMISSIONS.VIEW_CUSTOMER_ENQUIRIES,
    PERMISSIONS.MANAGE_CUSTOMER_ENQUIRIES,
    PERMISSIONS.ACCESS_DASHBOARD,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.VIEW_ACTIVITY_LOGS,
  ],
  [ROLES.FABRIC_ADMIN]: [
    PERMISSIONS.MANAGE_FABRIC,
    PERMISSIONS.MANAGE_FABRIC_CATALOGUE,
    PERMISSIONS.MANAGE_FABRIC_GALLERY,
    PERMISSIONS.ACCESS_IMAGE_STUDIO,
    PERMISSIONS.VIEW_CUSTOMER_ENQUIRIES,
    PERMISSIONS.MANAGE_CUSTOMER_ENQUIRIES,
    PERMISSIONS.ACCESS_DASHBOARD,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.VIEW_ACTIVITY_LOGS,
  ],
};

/**
 * Visual descriptions for the Role Hierarchy reference cards in AdminUsersPage.
 */
export const ROLE_DEFINITIONS = [
  {
    role: ROLES.SUPER_ADMIN,
    title: 'Super Administrator',
    scope: 'Full Atelier Access',
    description:
      'Unrestricted administrative access to Tailoring Home, Fabric Home, Admin Management, Settings, and Image Studio. Can invite, edit, and revoke staff accounts.',
    badgeVariant: 'maroon',
  },
  {
    role: ROLES.OPERATIONS_ADMIN,
    title: 'Operations Administrator',
    scope: 'Dual-Business Operations',
    description:
      'Manages catalogue items, fabric swatches, dual galleries, Image Studio assets, customer enquiries, and shared dashboard metrics for both Tailoring Home and Fabric Home. Restricted from Admin Management and security settings.',
    badgeVariant: 'dark',
  },
  {
    role: ROLES.TAILORING_ADMIN,
    title: 'Tailoring Administrator',
    scope: 'Tailoring Operations Only',
    description:
      'Manages bespoke tailoring services, Bohra attire, school uniforms, and tailoring gallery items. Cannot edit fabric inventory or manage administrator accounts.',
    badgeVariant: 'chocolate',
  },
  {
    role: ROLES.FABRIC_ADMIN,
    title: 'Fabric Administrator',
    scope: 'Fabric Operations Only',
    description:
      'Manages textiles, fabric catalogue, silk & linen inventory, and fabric gallery items. Cannot edit tailoring prices or manage administrator accounts.',
    badgeVariant: 'gold',
  },
];

/**
 * Checks whether a given role holds a specific permission.
 * @param {string} role
 * @param {string} permission
 * @returns {boolean}
 */
export const hasPermission = (role, permission) => {
  if (!role || !permission) return false;
  const permissions = ROLE_PERMISSIONS[role];
  return Boolean(permissions && permissions.includes(permission));
};

/**
 * Evaluates whether a role satisfies a required role clearance level.
 * @param {string} userRole
 * @param {string} requiredRole
 * @returns {boolean}
 */
export const hasRoleAccess = (userRole, requiredRole) => {
  if (!userRole) return false;
  if (userRole === ROLES.SUPER_ADMIN) return true;

  if (requiredRole === ROLES.SUPER_ADMIN) {
    return userRole === ROLES.SUPER_ADMIN;
  }

  if (requiredRole === ROLES.TAILORING_ADMIN) {
    return (
      userRole === ROLES.TAILORING_ADMIN ||
      userRole === ROLES.OPERATIONS_ADMIN ||
      userRole === ROLES.SUPER_ADMIN
    );
  }

  if (requiredRole === ROLES.FABRIC_ADMIN) {
    return (
      userRole === ROLES.FABRIC_ADMIN ||
      userRole === ROLES.OPERATIONS_ADMIN ||
      userRole === ROLES.SUPER_ADMIN
    );
  }

  if (requiredRole === ROLES.OPERATIONS_ADMIN) {
    return (
      userRole === ROLES.OPERATIONS_ADMIN ||
      userRole === ROLES.SUPER_ADMIN
    );
  }

  return userRole === requiredRole;
};

/**
 * Resolves human-readable role display name.
 * @param {string} role
 * @returns {string}
 */
export const getRoleDisplayName = (role) => {
  return ROLE_LABELS[role] || 'Administrator';
};

/**
 * Resolves human-readable role short display name for badges.
 * @param {string} role
 * @returns {string}
 */
export const getRoleShortDisplayName = (role) => {
  return ROLE_SHORT_LABELS[role] || 'Admin';
};

/**
 * Returns Firebase Custom Claims payload associated with a role.
 * Used for backend token synchronization.
 * @param {string} role
 * @returns {object|null}
 */
export const getCustomClaimsForRole = (role) => {
  switch (role) {
    case ROLES.SUPER_ADMIN:
      return {
        role: ROLES.SUPER_ADMIN,
        admin: true,
        tailoring: true,
        fabric: true,
        super: true,
      };
    case ROLES.OPERATIONS_ADMIN:
      return {
        role: ROLES.OPERATIONS_ADMIN,
        admin: true,
        tailoring: true,
        fabric: true,
      };
    case ROLES.TAILORING_ADMIN:
      return {
        role: ROLES.TAILORING_ADMIN,
        admin: true,
        tailoring: true,
        fabric: false,
      };
    case ROLES.FABRIC_ADMIN:
      return {
        role: ROLES.FABRIC_ADMIN,
        admin: true,
        tailoring: false,
        fabric: true,
      };
    default:
      return null;
  }
};
