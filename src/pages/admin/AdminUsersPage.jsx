import React, { useState, useEffect } from 'react';
import {
  Users,
  UserPlus,
  Key,
  CheckCircle2,
  XCircle,
  Clock,
  Lock,
  Shield,
  Copy,
  Check,
  AlertCircle,
  Trash2,
  Power,
  Mail,
  UserCog,
  Eye,
  Search,
  Filter,
  RefreshCw,
  Info,
  Calendar,
  Layers,
  Scissors,
  Sparkles,
  AlertTriangle,
  FileText,
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { AdminSectionHeader } from '../../components/admin/AdminSectionHeader';
import { useAuth } from '../../context';
import {
  ROLES,
  ROLE_DEFINITIONS,
  getRoleDisplayName,
  getRoleShortDisplayName,
  ROLE_BADGE_VARIANTS,
} from '../../constants/roles';
import {
  listAdministrators,
  listPendingInvitations,
  createAdministratorInvitation,
  toggleAdminStatus,
  changeAdminRole,
  deleteAdministrator,
  revokeInvitation,
  listAuditLogs,
} from '../../services/firebase/adminManagement.service';

export const AdminUsersPage = () => {
  const { isSuperAdmin, user: currentUser } = useAuth();

  // Data state
  const [adminList, setAdminList] = useState([]);
  const [pendingInvitations, setPendingInvitations] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  // Tabs: 'staff' | 'invitations' | 'audit' | 'roles'
  const [activeTab, setActiveTab] = useState('staff');

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  // Alerts
  const [actionError, setActionError] = useState(null);
  const [actionSuccess, setActionSuccess] = useState(null);
  const [copiedText, setCopiedText] = useState(null);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [detailsAdmin, setDetailsAdmin] = useState(null);
  const [roleEditAdmin, setRoleEditAdmin] = useState(null);
  const [selectedNewRole, setSelectedNewRole] = useState('');
  const [confirmDialog, setConfirmDialog] = useState(null);

  // Add Admin Form
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    role: ROLES.TAILORING_ADMIN,
  });
  const [submittingInvite, setSubmittingInvite] = useState(false);
  const [formError, setFormError] = useState(null);

  // Refresh trigger
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Load Data
  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      if (!isSuperAdmin) {
        if (isMounted) setLoadingData(false);
        return;
      }

      setLoadingData(true);
      try {
        const [admins, invitations, logs] = await Promise.all([
          listAdministrators(),
          listPendingInvitations(),
          listAuditLogs(40),
        ]);

        if (isMounted) {
          setAdminList(admins);
          setPendingInvitations(invitations);
          setAuditLogs(logs);
          setLoadingData(false);
        }
      } catch (err) {
        console.error('Error fetching admin data:', err);
        if (isMounted) {
          setActionError('Could not load administrators: ' + err.message);
          setLoadingData(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [isSuperAdmin, refreshTrigger]);

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Add / Invite Administrator Form Handler
  const handleInviteAdmin = async (e) => {
    e.preventDefault();
    setFormError(null);
    setActionError(null);

    const emailTrimmed = formData.email.trim().toLowerCase();
    if (!emailTrimmed) {
      setFormError('Google account email is required.');
      return;
    }

    if (!formData.displayName.trim()) {
      setFormError('Administrator full name is required.');
      return;
    }

    // Guard: Prevent Super Admin creation through this form
    if (formData.role === ROLES.SUPER_ADMIN) {
      setFormError('Super Administrators cannot be created via the staff invitation form.');
      return;
    }

    try {
      setSubmittingInvite(true);
      await createAdministratorInvitation({
        email: emailTrimmed,
        displayName: formData.displayName.trim(),
        role: formData.role,
        invitedBy: currentUser?.email || 'super_admin',
      });

      setFormData({
        displayName: '',
        email: '',
        role: ROLES.TAILORING_ADMIN,
      });
      setIsAddModalOpen(false);
      setActionSuccess(
        `Pending invitation created for ${emailTrimmed}. They will be automatically granted ${getRoleDisplayName(
          formData.role
        )} privileges when they sign in with Google.`
      );
      setActiveTab('invitations');
      setRefreshTrigger((prev) => prev + 1);
    } catch (err) {
      setFormError(err.message || 'Failed to create administrator invitation.');
    } finally {
      setSubmittingInvite(false);
    }
  };

  // Confirm Status Toggle (Activate / Deactivate)
  const initiateToggleStatus = (admin) => {
    if (!isSuperAdmin) return;

    if (admin.id === currentUser?.uid) {
      setActionError('Security Policy: You cannot deactivate your own active Super Administrator session.');
      return;
    }

    if (admin.role === ROLES.SUPER_ADMIN && admin.active === true) {
      const activeSuperCount = adminList.filter(
        (a) => a.role === ROLES.SUPER_ADMIN && a.active === true
      ).length;
      if (activeSuperCount <= 1) {
        setActionError('Security Policy: Cannot deactivate the last remaining active Super Administrator.');
        return;
      }
    }

    setConfirmDialog({
      type: 'toggle_status',
      admin,
      title: admin.active ? 'Revoke Administrator Access' : 'Reactivate Administrator',
      message: admin.active
        ? `Are you sure you want to deactivate ${admin.displayName || admin.email}? They will be immediately blocked from accessing the atelier operations dashboard.`
        : `Reactivate ${admin.displayName || admin.email}? Their administrative clearance will be immediately restored.`,
      confirmLabel: admin.active ? 'Deactivate Account' : 'Reactivate Account',
      variant: admin.active ? 'danger' : 'primary',
    });
  };

  // Confirm Role Change
  const initiateChangeRole = (admin) => {
    if (!isSuperAdmin) return;

    if (admin.id === currentUser?.uid) {
      setActionError('Security Policy: You cannot modify your own administrative role. Have another Super Admin update your privileges if needed.');
      return;
    }

    if (admin.role === ROLES.SUPER_ADMIN) {
      const activeSuperCount = adminList.filter(
        (a) => a.role === ROLES.SUPER_ADMIN && a.active === true
      ).length;
      if (activeSuperCount <= 1) {
        setActionError('Security Policy: Cannot reassign the last remaining active Super Administrator.');
        return;
      }
    }

    setRoleEditAdmin(admin);
    setSelectedNewRole(admin.role === ROLES.SUPER_ADMIN ? ROLES.OPERATIONS_ADMIN : admin.role);
  };

  const handleSaveRoleChange = async () => {
    if (!roleEditAdmin || !selectedNewRole) return;

    try {
      await changeAdminRole({
        targetAdmin: roleEditAdmin,
        newRole: selectedNewRole,
        currentAdminUid: currentUser?.uid,
        currentAdminEmail: currentUser?.email,
        allAdmins: adminList,
      });

      setActionSuccess(
        `Role for ${roleEditAdmin.displayName || roleEditAdmin.email} successfully updated to ${getRoleDisplayName(
          selectedNewRole
        )}.`
      );
      setRoleEditAdmin(null);
      setRefreshTrigger((prev) => prev + 1);
    } catch (err) {
      setActionError(err.message || 'Failed to update administrative role.');
    }
  };

  // Confirm Delete
  const initiateDeleteAdmin = (admin) => {
    if (!isSuperAdmin) return;

    if (admin.id === currentUser?.uid) {
      setActionError('Security Policy: You cannot delete your own active Super Administrator account.');
      return;
    }

    if (admin.role === ROLES.SUPER_ADMIN) {
      const activeSuperCount = adminList.filter(
        (a) => a.role === ROLES.SUPER_ADMIN && a.active === true
      ).length;
      if (activeSuperCount <= 1) {
        setActionError('Security Policy: Cannot delete the last remaining active Super Administrator.');
        return;
      }
    }

    setConfirmDialog({
      type: 'delete_admin',
      admin,
      title: 'Permanently Delete Administrator Record',
      message: `Permanently delete the administrator record for ${admin.displayName || admin.email}? This action cannot be undone and will immediately revoke all dashboard privileges.`,
      confirmLabel: 'Permanently Delete',
      variant: 'danger',
    });
  };

  // Confirm Revoke Invitation
  const initiateRevokeInvitation = (invitation) => {
    setConfirmDialog({
      type: 'revoke_invitation',
      invitation,
      title: 'Revoke Pending Invitation',
      message: `Revoke pending invitation for ${invitation.email} (${getRoleDisplayName(
        invitation.role
      )})? They will not be granted access if they attempt to sign in.`,
      confirmLabel: 'Revoke Invitation',
      variant: 'danger',
    });
  };

  // Execute Confirmation Action
  const handleExecuteConfirm = async () => {
    if (!confirmDialog) return;

    try {
      if (confirmDialog.type === 'toggle_status') {
        await toggleAdminStatus({
          targetAdmin: confirmDialog.admin,
          currentAdminUid: currentUser?.uid,
          currentAdminEmail: currentUser?.email,
          allAdmins: adminList,
        });
        setActionSuccess(
          `Status for ${confirmDialog.admin.email} updated to ${
            confirmDialog.admin.active ? 'Inactive' : 'Active'
          }.`
        );
      } else if (confirmDialog.type === 'delete_admin') {
        await deleteAdministrator({
          targetAdmin: confirmDialog.admin,
          currentAdminUid: currentUser?.uid,
          currentAdminEmail: currentUser?.email,
          allAdmins: adminList,
        });
        setActionSuccess(`Administrator record for ${confirmDialog.admin.email} was permanently deleted.`);
      } else if (confirmDialog.type === 'revoke_invitation') {
        await revokeInvitation({
          invitationId: confirmDialog.invitation.id,
          currentAdminUid: currentUser?.uid,
          currentAdminEmail: currentUser?.email,
        });
        setActionSuccess(`Invitation for ${confirmDialog.invitation.email} was successfully revoked.`);
      }

      setConfirmDialog(null);
      setRefreshTrigger((prev) => prev + 1);
    } catch (err) {
      setActionError(err.message || 'Operation failed.');
      setConfirmDialog(null);
    }
  };

  // Filtered staff list
  const filteredStaff = adminList.filter((admin) => {
    const matchesSearch =
      (admin.displayName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (admin.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (admin.id || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === 'all' ? true : admin.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      {/* Standardized Header */}
      <AdminSectionHeader
        title="Administrator Management"
        subtitle="Manage atelier managerial staff, departmental roles, Google identity verification, and security policies."
        badgeText="Access Control"
        badgeVariant="maroon"
        badgeIcon={Users}
        actions={
          isSuperAdmin && (
            <Button
              variant="primary"
              size="sm"
              icon={UserPlus}
              onClick={() => setIsAddModalOpen(true)}
              className="cursor-pointer"
            >
              Add Administrator
            </Button>
          )
        }
      />

      {/* Notifications */}
      {actionSuccess && (
        <div className="p-3.5 rounded-sm bg-emerald-50 border border-emerald-300 text-xs text-emerald-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>{actionSuccess}</span>
          </div>
          <button
            onClick={() => setActionSuccess(null)}
            className="text-emerald-700 hover:text-emerald-950 font-bold ml-4 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {actionError && (
        <div className="p-3.5 rounded-sm bg-red-50 border border-red-300 text-xs text-red-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
            <span>{actionError}</span>
          </div>
          <button
            onClick={() => setActionError(null)}
            className="text-red-700 hover:text-red-950 font-bold ml-4 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Segmented Control / Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-cream-border pb-1">
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('staff')}
            className={`px-3.5 py-2 rounded-t-sm text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'staff'
                ? 'bg-white text-chocolate-900 border-t-2 border-l border-r border-t-gold border-l-cream-border border-r-cream-border shadow-2xs'
                : 'text-chocolate-600 hover:text-chocolate-900 hover:bg-cream/50'
            }`}
          >
            <Users className="h-3.5 w-3.5" />
            <span>Staff Roster ({adminList.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('invitations')}
            className={`px-3.5 py-2 rounded-t-sm text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer relative ${
              activeTab === 'invitations'
                ? 'bg-white text-chocolate-900 border-t-2 border-l border-r border-t-gold border-l-cream-border border-r-cream-border shadow-2xs'
                : 'text-chocolate-600 hover:text-chocolate-900 hover:bg-cream/50'
            }`}
          >
            <Mail className="h-3.5 w-3.5" />
            <span>Pending Invitations ({pendingInvitations.length})</span>
            {pendingInvitations.length > 0 && (
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('audit')}
            className={`px-3.5 py-2 rounded-t-sm text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'audit'
                ? 'bg-white text-chocolate-900 border-t-2 border-l border-r border-t-gold border-l-cream-border border-r-cream-border shadow-2xs'
                : 'text-chocolate-600 hover:text-chocolate-900 hover:bg-cream/50'
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Audit Trail ({auditLogs.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('roles')}
            className={`px-3.5 py-2 rounded-t-sm text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'roles'
                ? 'bg-white text-chocolate-900 border-t-2 border-l border-r border-t-gold border-l-cream-border border-r-cream-border shadow-2xs'
                : 'text-chocolate-600 hover:text-chocolate-900 hover:bg-cream/50'
            }`}
          >
            <Key className="h-3.5 w-3.5" />
            <span>Role Permissions Architecture</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => setRefreshTrigger((p) => p + 1)}
          className="text-xs text-chocolate-500 hover:text-chocolate-800 flex items-center gap-1.5 p-1 rounded hover:bg-cream transition-colors cursor-pointer"
          title="Refresh database records"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Sync</span>
        </button>
      </div>

      {/* ====================================================================== */}
      {/* TAB 1: STAFF ROSTER                                                    */}
      {/* ====================================================================== */}
      {activeTab === 'staff' && (
        <div className="space-y-4">
          {/* Search & Filter Toolbar */}
          <div className="bg-white p-3.5 rounded-sm border border-cream-border shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-chocolate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search staff by name, email or UID..."
                className="w-full pl-9 pr-3 py-1.5 text-xs border border-cream-border rounded-xs focus:ring-1 focus:ring-gold focus:outline-hidden bg-stone-50"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="h-3.5 w-3.5 text-chocolate-400 shrink-0" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-2.5 py-1.5 text-xs border border-cream-border rounded-xs bg-white text-chocolate-800 focus:ring-1 focus:ring-gold focus:outline-hidden"
              >
                <option value="all">All Roles ({adminList.length})</option>
                <option value={ROLES.SUPER_ADMIN}>Super Admin</option>
                <option value={ROLES.OPERATIONS_ADMIN}>Operations Admin</option>
                <option value={ROLES.TAILORING_ADMIN}>Tailoring Admin</option>
                <option value={ROLES.FABRIC_ADMIN}>Fabric Admin</option>
              </select>
            </div>
          </div>

          {/* Staff Table / Cards */}
          <div className="bg-white rounded-sm border border-cream-border overflow-hidden shadow-2xs">
            <div className="p-4 border-b border-cream-border flex items-center justify-between bg-stone-50/50">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-maroon-800" />
                <h2 className="font-serif font-bold text-base text-chocolate-900">
                  Registered Administrators ({filteredStaff.length})
                </h2>
              </div>
              <span className="text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300 font-mono">
                Authoritative: Firestore /admins
              </span>
            </div>

            {loadingData ? (
              <div className="p-12 text-center text-xs text-chocolate-500">
                <div className="h-6 w-6 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <span>Loading administrator records...</span>
              </div>
            ) : filteredStaff.length === 0 ? (
              <div className="p-12 text-center space-y-3">
                <Shield className="h-10 w-10 text-gold mx-auto opacity-70" />
                <h3 className="font-serif font-bold text-chocolate-900">No Administrators Found</h3>
                <p className="text-xs text-chocolate-600 max-w-md mx-auto leading-relaxed">
                  {searchQuery || roleFilter !== 'all'
                    ? 'No registered administrators match your filter criteria.'
                    : 'No staff accounts currently configured. Click Add Administrator above to invite staff.'}
                </p>
                {searchQuery && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchQuery('');
                      setRoleFilter('all');
                    }}
                  >
                    Clear Filter
                  </Button>
                )}
              </div>
            ) : (
              <div className="divide-y divide-cream-border">
                {filteredStaff.map((admin) => {
                  const isCurrent = admin.id === currentUser?.uid;

                  return (
                    <div
                      key={admin.id}
                      className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-cream/30 transition-colors"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="h-11 w-11 rounded-full bg-maroon-900 text-gold flex items-center justify-center font-serif font-bold text-sm shrink-0 border border-gold/40 shadow-2xs">
                          {(admin.displayName || admin.email || 'A').charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-sm text-chocolate-900">
                              {admin.displayName || 'Administrator'}
                            </h3>
                            {isCurrent && (
                              <span className="text-[10px] bg-gold/20 text-chocolate-900 px-1.5 py-0.2 rounded font-semibold border border-gold/40">
                                You
                              </span>
                            )}
                            <Badge
                              variant={
                                ROLE_BADGE_VARIANTS[admin.role] ||
                                (admin.role === ROLES.SUPER_ADMIN
                                  ? 'maroon'
                                  : admin.role === ROLES.OPERATIONS_ADMIN
                                  ? 'dark'
                                  : admin.role === ROLES.TAILORING_ADMIN
                                  ? 'chocolate'
                                  : 'gold')
                              }
                              size="xs"
                            >
                              {getRoleShortDisplayName(admin.role)}
                            </Badge>
                          </div>
                          <div className="text-xs text-chocolate-500 font-mono mt-0.5">{admin.email}</div>
                          <div className="flex items-center gap-1.5 text-[11px] text-chocolate-400 font-mono mt-0.5">
                            <span>UID: {admin.id}</span>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(admin.id, `uid-${admin.id}`)}
                              className="hover:text-gold cursor-pointer inline-flex items-center"
                              title="Copy Firebase UID"
                            >
                              {copiedText === `uid-${admin.id}` ? (
                                <Check className="h-3 w-3 text-emerald-500" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-chocolate-600 pl-14 md:pl-0">
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-chocolate-400" />
                          <span>{admin.createdAt ? new Date(admin.createdAt).toLocaleDateString() : 'N/A'}</span>
                        </div>

                        <div
                          className={`flex items-center gap-1.5 font-medium ${
                            admin.active ? 'text-emerald-700' : 'text-red-700'
                          }`}
                        >
                          {admin.active ? (
                            <>
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                              <span>Active</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="h-3.5 w-3.5 text-red-600" />
                              <span>Inactive</span>
                            </>
                          )}
                        </div>

                        {/* Management Action Buttons */}
                        <div className="flex items-center gap-1 border-l border-cream-border pl-3">
                          {/* View Details */}
                          <button
                            type="button"
                            onClick={() => setDetailsAdmin(admin)}
                            title="View Administrator Details & Access Scope"
                            className="p-1.5 rounded text-chocolate-600 hover:text-chocolate-900 hover:bg-cream transition-colors cursor-pointer"
                          >
                            <Eye className="h-4 w-4" />
                          </button>

                          {/* Change Role */}
                          <button
                            type="button"
                            onClick={() => initiateChangeRole(admin)}
                            disabled={isCurrent}
                            title={
                              isCurrent
                                ? 'Cannot modify your own administrative role'
                                : 'Adjust Departmental Role'
                            }
                            className={`p-1.5 rounded transition-colors ${
                              isCurrent
                                ? 'text-stone-300 cursor-not-allowed'
                                : 'text-chocolate-600 hover:text-chocolate-900 hover:bg-cream cursor-pointer'
                            }`}
                          >
                            <UserCog className="h-4 w-4" />
                          </button>

                          {/* Activate / Deactivate Toggle */}
                          <button
                            type="button"
                            onClick={() => initiateToggleStatus(admin)}
                            disabled={isCurrent}
                            title={
                              isCurrent
                                ? 'Cannot deactivate your own active session'
                                : admin.active
                                ? 'Deactivate (Revoke Access)'
                                : 'Reactivate Access'
                            }
                            className={`p-1.5 rounded transition-colors ${
                              isCurrent
                                ? 'text-stone-300 cursor-not-allowed'
                                : admin.active
                                ? 'text-amber-700 hover:bg-amber-50 cursor-pointer'
                                : 'text-emerald-700 hover:bg-emerald-50 cursor-pointer'
                            }`}
                          >
                            <Power className="h-4 w-4" />
                          </button>

                          {/* Delete Administrator */}
                          <button
                            type="button"
                            onClick={() => initiateDeleteAdmin(admin)}
                            disabled={isCurrent}
                            title={
                              isCurrent
                                ? 'Cannot delete your own active session'
                                : 'Delete Administrator Record'
                            }
                            className={`p-1.5 rounded transition-colors ${
                              isCurrent
                                ? 'text-stone-300 cursor-not-allowed'
                                : 'text-red-600 hover:bg-red-50 cursor-pointer'
                            }`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* TAB 2: PENDING INVITATIONS                                             */}
      {/* ====================================================================== */}
      {activeTab === 'invitations' && (
        <div className="space-y-4">
          <div className="p-4 rounded-sm bg-amber-50/80 border border-gold/40 text-xs text-chocolate-800 space-y-1.5">
            <div className="flex items-center gap-2 font-serif font-bold text-chocolate-900 text-sm">
              <Clock className="h-4 w-4 text-gold-dark" />
              <span>Pending Invitation Workflow & Identity Verification</span>
            </div>
            <p className="text-chocolate-700 leading-relaxed font-sans">
              Invited administrators listed below have been pre-authorized. When they sign in at{' '}
              <code>/admin/login</code> with their verified Google account, their identity is cryptographically
              confirmed, their Firebase UID is permanently bound to their profile, and departmental permissions are
              activated automatically.
            </p>
          </div>

          <div className="bg-white rounded-sm border border-cream-border overflow-hidden shadow-2xs">
            <div className="p-4 border-b border-cream-border flex items-center justify-between bg-stone-50/50">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gold-dark" />
                <h2 className="font-serif font-bold text-base text-chocolate-900">
                  Pending Invitations ({pendingInvitations.length})
                </h2>
              </div>
              <span className="text-[11px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-300 font-mono">
                Source: Firestore /admin_invitations
              </span>
            </div>

            {loadingData ? (
              <div className="p-12 text-center text-xs text-chocolate-500">
                <div className="h-6 w-6 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <span>Loading pending invitations...</span>
              </div>
            ) : pendingInvitations.length === 0 ? (
              <div className="p-12 text-center space-y-3">
                <Mail className="h-10 w-10 text-gold mx-auto opacity-70" />
                <h3 className="font-serif font-bold text-chocolate-900">No Pending Invitations</h3>
                <p className="text-xs text-chocolate-600 max-w-md mx-auto leading-relaxed">
                  All invited administrators have claimed their accounts or no pending invites exist.
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  icon={UserPlus}
                  onClick={() => setIsAddModalOpen(true)}
                >
                  Invite New Administrator
                </Button>
              </div>
            ) : (
              <div className="divide-y divide-cream-border">
                {pendingInvitations.map((inv) => (
                  <div
                    key={inv.id}
                    className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-cream/30 transition-colors"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="h-10 w-10 rounded-full bg-amber-50 text-gold-dark flex items-center justify-center font-serif font-bold text-sm shrink-0 border border-gold/40">
                        {(inv.displayName || inv.email || 'I').charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-sm text-chocolate-900">
                            {inv.displayName || 'Invited Administrator'}
                          </h3>
                          <Badge variant={ROLE_BADGE_VARIANTS[inv.role] || 'chocolate'} size="xs">
                            {getRoleShortDisplayName(inv.role)}
                          </Badge>
                          <span className="text-[10px] bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.2 rounded font-medium">
                            Awaiting Google Sign-In
                          </span>
                        </div>
                        <div className="text-xs text-chocolate-500 font-mono mt-0.5">{inv.email}</div>
                        <div className="text-[11px] text-chocolate-400 font-sans mt-0.5">
                          Invited by: <span className="font-mono text-chocolate-600">{inv.invitedBy}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-chocolate-600 pl-13 md:pl-0">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-chocolate-400" />
                        <span>{inv.createdAt ? new Date(inv.createdAt).toLocaleDateString() : 'N/A'}</span>
                      </div>

                      <Button
                        variant="outline"
                        size="xs"
                        icon={Trash2}
                        onClick={() => initiateRevokeInvitation(inv)}
                        className="text-red-700 border-red-200 hover:bg-red-50"
                      >
                        Revoke Invitation
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* TAB 3: AUDIT TRAIL                                                     */}
      {/* ====================================================================== */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-sm border border-cream-border overflow-hidden shadow-2xs space-y-0">
          <div className="p-4 border-b border-cream-border flex items-center justify-between bg-stone-50/50">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-chocolate-800" />
              <h2 className="font-serif font-bold text-base text-chocolate-900">
                Security & Administrative Audit Log ({auditLogs.length})
              </h2>
            </div>
            <span className="text-[11px] text-stone-700 bg-stone-100 px-2 py-0.5 rounded border border-stone-200 font-mono">
              Immutable: /admin_audit_logs
            </span>
          </div>

          {loadingData ? (
            <div className="p-12 text-center text-xs text-chocolate-500">
              <div className="h-6 w-6 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <span>Loading audit logs...</span>
            </div>
          ) : auditLogs.length === 0 ? (
            <div className="p-12 text-center space-y-2 text-xs text-chocolate-500">
              <Info className="h-8 w-8 text-gold mx-auto" />
              <p>No administrative security audit events recorded yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-cream-border text-xs">
              {auditLogs.map((log) => {
                const isInvite = log.action === 'ADMIN_INVITED';
                const isClaim = log.action === 'ADMIN_INVITATION_CLAIMED';
                const isRoleChange = log.action === 'ADMIN_ROLE_CHANGED';
                const isStatus = log.action === 'ADMIN_ACTIVATED' || log.action === 'ADMIN_DEACTIVATED';
                const isDelete = log.action === 'ADMIN_DELETED';

                return (
                  <div
                    key={log.id}
                    className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-cream/20 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded font-mono font-semibold uppercase ${
                            isInvite
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : isClaim
                              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                              : isRoleChange
                              ? 'bg-purple-100 text-purple-900 border border-purple-300'
                              : isStatus
                              ? 'bg-blue-100 text-blue-900 border border-blue-300'
                              : isDelete
                              ? 'bg-red-100 text-red-900 border border-red-300'
                              : 'bg-stone-100 text-stone-800'
                          }`}
                        >
                          {log.action}
                        </span>
                        <span className="font-semibold text-chocolate-900">
                          Target: {log.targetEmail || log.targetUid}
                        </span>
                      </div>
                      <p className="text-[11px] text-chocolate-600 font-sans">
                        Actor: <span className="font-mono">{log.actorEmail}</span> • Details:{' '}
                        <span className="font-mono text-chocolate-800">
                          {JSON.stringify(log.details || {})}
                        </span>
                      </p>
                    </div>

                    <div className="text-[11px] text-chocolate-400 font-mono shrink-0">
                      {log.timestamp ? new Date(log.timestamp).toLocaleString() : 'N/A'}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ====================================================================== */}
      {/* TAB 4: ROLE PERMISSIONS ARCHITECTURE                                   */}
      {/* ====================================================================== */}
      {activeTab === 'roles' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {ROLE_DEFINITIONS.map((roleDef, idx) => (
              <Card key={idx} variant="default" className="border border-cream-border space-y-3 shadow-2xs">
                <div className="flex items-center justify-between">
                  <Badge variant={roleDef.badgeVariant} size="xs">
                    {roleDef.scope}
                  </Badge>
                  <Lock className="h-3.5 w-3.5 text-chocolate-400" />
                </div>
                <h4 className="font-serif font-bold text-base text-chocolate-900">{roleDef.title}</h4>
                <p className="text-xs text-chocolate-600 leading-relaxed font-sans">
                  {roleDef.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* MODAL 1: ADD ADMINISTRATOR / INVITATION                                */}
      {/* ====================================================================== */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-chocolate-950/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-sm border border-gold/40 shadow-2xl max-w-lg w-full p-6 space-y-5 font-sans">
            <div className="flex items-center justify-between pb-3 border-b border-cream-border">
              <div className="flex items-center gap-2 text-maroon-800">
                <Shield className="h-5 w-5 text-gold-dark" />
                <h3 className="font-serif font-bold text-lg text-chocolate-900">
                  Register / Invite Administrator
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-chocolate-400 hover:text-chocolate-700 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-3 bg-amber-50 border border-gold/30 rounded-xs text-[11px] text-chocolate-700 space-y-1">
              <p className="font-semibold text-chocolate-900 flex items-center gap-1.5">
                <Info className="h-3.5 w-3.5 text-gold-dark" />
                Google Authentication Verification
              </p>
              <p>
                Passwords are never stored. The invited administrator will verify their identity using their Google
                account. Access is bound securely to their verified Firebase UID upon their first sign-in.
              </p>
            </div>

            {formError && (
              <div className="p-3 rounded-xs bg-red-50 border border-red-200 text-xs text-red-800 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleInviteAdmin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-chocolate-800 mb-1">
                  Administrator Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Murtaza Cutpiece"
                  value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-cream-border rounded-xs focus:ring-1 focus:ring-gold focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-chocolate-800 mb-1">
                  Google Account Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. murtaza@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-cream-border rounded-xs focus:ring-1 focus:ring-gold focus:outline-hidden"
                />
                <p className="text-[10px] text-chocolate-500 mt-1">
                  Must correspond to the Google account the staff member will use to authenticate.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-chocolate-800 mb-1">
                  Assigned Administrative Role <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-cream-border rounded-xs focus:ring-1 focus:ring-gold focus:outline-hidden bg-white"
                >
                  <option value={ROLES.TAILORING_ADMIN}>
                    Tailoring Administrator (Tailoring Home, Bohra Wear & Uniforms)
                  </option>
                  <option value={ROLES.FABRIC_ADMIN}>
                    Fabric Administrator (Fabric Home, Swatches & Textile Archive)
                  </option>
                  <option value={ROLES.OPERATIONS_ADMIN}>
                    Operations Administrator (Dual-Business Operations)
                  </option>
                </select>
                <p className="text-[10px] text-chocolate-500 mt-1">
                  Note: Super Administrator privileges can only be provisioned via secure backend CLI bootstrap.
                </p>
              </div>

              <div className="pt-3 border-t border-cream-border flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddModalOpen(false)}
                  disabled={submittingInvite}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={submittingInvite}
                >
                  {submittingInvite ? 'Registering...' : 'Register Administrator'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* MODAL 2: ADMINISTRATOR DETAILS INSPECTION                               */}
      {/* ====================================================================== */}
      {detailsAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-chocolate-950/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-sm border border-gold/40 shadow-2xl max-w-lg w-full p-6 space-y-5 font-sans">
            <div className="flex items-center justify-between pb-3 border-b border-cream-border">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-maroon-800" />
                <h3 className="font-serif font-bold text-lg text-chocolate-900">
                  Administrator Profile Details
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setDetailsAdmin(null)}
                className="text-chocolate-400 hover:text-chocolate-700 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-sm border border-cream-border">
                <div className="h-12 w-12 rounded-full bg-maroon-900 text-gold flex items-center justify-center font-serif font-bold text-lg border border-gold/40 shrink-0">
                  {(detailsAdmin.displayName || detailsAdmin.email || 'A').charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-serif font-bold text-base text-chocolate-900">
                    {detailsAdmin.displayName || 'Administrator'}
                  </div>
                  <div className="text-chocolate-500 font-mono">{detailsAdmin.email}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant={ROLE_BADGE_VARIANTS[detailsAdmin.role] || 'chocolate'}
                      size="xs"
                    >
                      {getRoleDisplayName(detailsAdmin.role)}
                    </Badge>
                    <span
                      className={`text-[10px] px-2 py-0.2 rounded font-medium ${
                        detailsAdmin.active
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {detailsAdmin.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 p-3 bg-white rounded-sm border border-cream-border">
                <div className="flex justify-between py-1 border-b border-cream-border/60">
                  <span className="text-chocolate-500 font-medium">Firebase Auth UID:</span>
                  <div className="flex items-center gap-1 font-mono text-chocolate-800">
                    <span>{detailsAdmin.id}</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(detailsAdmin.id, 'details-uid')}
                      className="hover:text-gold cursor-pointer"
                    >
                      {copiedText === 'details-uid' ? (
                        <Check className="h-3 w-3 text-emerald-500" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex justify-between py-1 border-b border-cream-border/60">
                  <span className="text-chocolate-500 font-medium">Account Created:</span>
                  <span className="font-mono text-chocolate-800">
                    {detailsAdmin.createdAt ? new Date(detailsAdmin.createdAt).toLocaleString() : 'N/A'}
                  </span>
                </div>

                <div className="flex justify-between py-1 border-b border-cream-border/60">
                  <span className="text-chocolate-500 font-medium">Last Modified:</span>
                  <span className="font-mono text-chocolate-800">
                    {detailsAdmin.updatedAt ? new Date(detailsAdmin.updatedAt).toLocaleString() : 'N/A'}
                  </span>
                </div>

                <div className="flex justify-between py-1">
                  <span className="text-chocolate-500 font-medium">Created / Verified By:</span>
                  <span className="font-mono text-chocolate-800">
                    {detailsAdmin.invitedBy || detailsAdmin.createdBy || 'Initial System Setup'}
                  </span>
                </div>
              </div>

              {/* Effective Departmental Capabilities Checklist */}
              <div className="space-y-2">
                <div className="font-serif font-bold text-chocolate-900 text-sm">
                  Active Department Clearance Matrix:
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div
                    className={`p-2 rounded border flex items-center gap-2 ${
                      detailsAdmin.role === ROLES.SUPER_ADMIN ||
                      detailsAdmin.role === ROLES.OPERATIONS_ADMIN ||
                      detailsAdmin.role === ROLES.TAILORING_ADMIN
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                        : 'bg-stone-50 text-stone-400 border-stone-200'
                    }`}
                  >
                    <Scissors className="h-3.5 w-3.5" />
                    <span>Tailoring Home Management</span>
                  </div>

                  <div
                    className={`p-2 rounded border flex items-center gap-2 ${
                      detailsAdmin.role === ROLES.SUPER_ADMIN ||
                      detailsAdmin.role === ROLES.OPERATIONS_ADMIN ||
                      detailsAdmin.role === ROLES.FABRIC_ADMIN
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                        : 'bg-stone-50 text-stone-400 border-stone-200'
                    }`}
                  >
                    <Layers className="h-3.5 w-3.5" />
                    <span>Fabric Home Management</span>
                  </div>

                  <div className="p-2 rounded border bg-emerald-50 text-emerald-900 border-emerald-200 flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Gallery & Image Studio</span>
                  </div>

                  <div
                    className={`p-2 rounded border flex items-center gap-2 ${
                      detailsAdmin.role === ROLES.SUPER_ADMIN
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                        : 'bg-stone-50 text-stone-400 border-stone-200'
                    }`}
                  >
                    <Shield className="h-3.5 w-3.5" />
                    <span>Admin Security Governance</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-cream-border flex justify-end">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setDetailsAdmin(null)}
              >
                Close Profile
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* MODAL 3: CHANGE ROLE                                                   */}
      {/* ====================================================================== */}
      {roleEditAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-chocolate-950/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-sm border border-gold/40 shadow-2xl max-w-md w-full p-6 space-y-5 font-sans">
            <div className="flex items-center justify-between pb-3 border-b border-cream-border">
              <div className="flex items-center gap-2 text-maroon-800">
                <UserCog className="h-5 w-5 text-gold-dark" />
                <h3 className="font-serif font-bold text-lg text-chocolate-900">
                  Modify Departmental Role
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setRoleEditAdmin(null)}
                className="text-chocolate-400 hover:text-chocolate-700 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3 bg-stone-50 rounded-sm border border-cream-border space-y-1">
                <div className="text-chocolate-500 font-medium">Target Administrator:</div>
                <div className="font-semibold text-chocolate-900">
                  {roleEditAdmin.displayName || roleEditAdmin.email}
                </div>
                <div className="text-chocolate-600 font-mono text-[11px]">{roleEditAdmin.email}</div>
                <div className="pt-1 flex items-center gap-2">
                  <span className="text-chocolate-500">Current Role:</span>
                  <Badge variant={ROLE_BADGE_VARIANTS[roleEditAdmin.role] || 'chocolate'} size="xs">
                    {getRoleDisplayName(roleEditAdmin.role)}
                  </Badge>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-chocolate-800 mb-1">
                  Select New Administrative Role <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedNewRole}
                  onChange={(e) => setSelectedNewRole(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-cream-border rounded-xs focus:ring-1 focus:ring-gold focus:outline-hidden bg-white"
                >
                  <option value={ROLES.TAILORING_ADMIN}>
                    Tailoring Administrator (Tailoring, Bohra Wear & Uniforms)
                  </option>
                  <option value={ROLES.FABRIC_ADMIN}>
                    Fabric Administrator (Fabrics, Swatches & Textile Archive)
                  </option>
                  <option value={ROLES.OPERATIONS_ADMIN}>
                    Operations Administrator (Dual-Business Operations)
                  </option>
                </select>
                <p className="text-[10px] text-chocolate-500 mt-1">
                  The updated permissions will take effect immediately across all dashboard operations.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-cream-border flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRoleEditAdmin(null)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSaveRoleChange}
              >
                Update Role
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* MODAL 4: CONFIRMATION DIALOG (Status Toggle, Delete, Revoke)            */}
      {/* ====================================================================== */}
      {confirmDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-chocolate-950/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-sm border border-gold/40 shadow-2xl max-w-md w-full p-6 space-y-4 font-sans">
            <div className="flex items-center gap-3">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${
                  confirmDialog.variant === 'danger'
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}
              >
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-chocolate-900">
                  {confirmDialog.title}
                </h3>
              </div>
            </div>

            <p className="text-xs text-chocolate-600 leading-relaxed font-sans">
              {confirmDialog.message}
            </p>

            <div className="pt-3 border-t border-cream-border flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setConfirmDialog(null)}
              >
                Cancel
              </Button>
              <Button
                variant={confirmDialog.variant === 'danger' ? 'primary' : 'primary'}
                size="sm"
                onClick={handleExecuteConfirm}
                className={confirmDialog.variant === 'danger' ? 'bg-red-800 hover:bg-red-900 border-red-900 text-white' : ''}
              >
                {confirmDialog.confirmLabel}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;
