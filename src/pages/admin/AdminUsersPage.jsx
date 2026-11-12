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
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { AdminSectionHeader } from '../../components/admin/AdminSectionHeader';
import { useAuth } from '../../context';
import { db } from '../../config/firebase.config';
import { collection, getDocs, doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';

export const AdminUsersPage = () => {
  const { isSuperAdmin, user: currentUser } = useAuth();
  const [adminList, setAdminList] = useState([]);
  const [loadingAdmins, setLoadingAdmins] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedUid, setCopiedUid] = useState(null);
  const [actionError, setActionError] = useState(null);
  const [actionSuccess, setActionSuccess] = useState(null);

  // New admin form state
  const [formData, setFormData] = useState({
    uid: '',
    displayName: '',
    email: '',
    role: 'tailoring_admin',
    active: true,
  });
  const [savingAdmin, setSavingAdmin] = useState(false);
  const [formError, setFormError] = useState(null);

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      if (!db || !isSuperAdmin) {
        if (isMounted) setLoadingAdmins(false);
        return;
      }

      try {
        const snap = await getDocs(collection(db, 'admins'));
        const admins = [];
        snap.forEach((d) => {
          admins.push({ id: d.id, ...d.data() });
        });
        if (isMounted) {
          setAdminList(admins);
          setLoadingAdmins(false);
        }
      } catch (err) {
        console.error('Failed to load admins from Firestore:', err);
        if (isMounted) {
          setActionError('Could not load administrators: ' + err.message);
          setLoadingAdmins(false);
        }
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [isSuperAdmin, refreshTrigger]);

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setFormError(null);
    setActionError(null);

    const trimmedUid = formData.uid.trim();
    if (!trimmedUid) {
      setFormError('Firebase UID is required. The administrator must first attempt Google sign-in to get their UID.');
      return;
    }

    if (!formData.email.trim()) {
      setFormError('Email is required.');
      return;
    }

    try {
      setSavingAdmin(true);
      const adminDocRef = doc(db, 'admins', trimmedUid);
      const payload = {
        displayName: formData.displayName.trim() || formData.email.split('@')[0],
        email: formData.email.trim().toLowerCase(),
        role: formData.role,
        active: Boolean(formData.active),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: currentUser?.email || 'super_admin',
      };

      await setDoc(adminDocRef, payload, { merge: true });

      setFormData({
        uid: '',
        displayName: '',
        email: '',
        role: 'tailoring_admin',
        active: true,
      });
      setIsModalOpen(false);
      setActionSuccess(`Administrator ${payload.email} saved successfully.`);
      setRefreshTrigger((prev) => prev + 1);
    } catch (err) {
      console.error('Failed to save admin:', err);
      setFormError(err.message || 'Failed to save admin document');
    } finally {
      setSavingAdmin(false);
    }
  };

  const handleToggleActive = async (admin) => {
    if (!isSuperAdmin) return;
    if (admin.id === currentUser?.uid) {
      alert('You cannot deactivate your own active Super Administrator session.');
      return;
    }

    const newStatus = !admin.active;
    const confirmMsg = newStatus
      ? `Reactivate administrator ${admin.email}?`
      : `Revoke administrative access for ${admin.email}? They will be immediately signed out and blocked from all operations.`;

    if (!window.confirm(confirmMsg)) return;

    try {
      const adminDocRef = doc(db, 'admins', admin.id);
      await updateDoc(adminDocRef, {
        active: newStatus,
        updatedAt: new Date().toISOString(),
      });
      setActionSuccess(`Status for ${admin.email} updated to ${newStatus ? 'Active' : 'Inactive'}.`);
      setRefreshTrigger((prev) => prev + 1);
    } catch (err) {
      console.error('Failed to toggle admin status:', err);
      setActionError('Failed to update status: ' + err.message);
    }
  };

  const handleDeleteAdmin = async (admin) => {
    if (!isSuperAdmin) return;
    if (admin.id === currentUser?.uid) {
      alert('Security Protection: You cannot delete your own Super Administrator account.');
      return;
    }

    if (!window.confirm(`Permanently remove administrator record for ${admin.email || admin.id}? This action cannot be undone.`)) {
      return;
    }

    try {
      const adminDocRef = doc(db, 'admins', admin.id);
      await deleteDoc(adminDocRef);
      setActionSuccess(`Administrator record ${admin.email || admin.id} deleted successfully.`);
      setRefreshTrigger((prev) => prev + 1);
    } catch (err) {
      console.error('Failed to delete admin:', err);
      setActionError('Failed to delete admin: ' + err.message);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedUid(text);
    setTimeout(() => setCopiedUid(null), 2000);
  };

  const roleDefinitions = [
    {
      title: 'Super Administrator',
      scope: 'Full Atelier Access',
      description:
        'Unrestricted administrative access to Tailoring Home, Fabric Home, Admin Management, Settings, and Image Studio. Can invite, edit, and revoke staff accounts.',
      badgeVariant: 'maroon',
    },
    {
      title: 'Tailoring Administrator',
      scope: 'Tailoring Operations Only',
      description:
        'Manages bespoke tailoring services, Bohra attire, school uniforms, and tailoring gallery items. Cannot edit fabric inventory or manage administrator accounts.',
      badgeVariant: 'chocolate',
    },
    {
      title: 'Fabric Administrator',
      scope: 'Fabric Operations Only',
      description:
        'Manages textiles, fabric catalogue, silk & linen inventory, and fabric gallery items. Cannot edit tailoring prices or manage administrator accounts.',
      badgeVariant: 'gold',
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      {/* Standardized Header */}
      <AdminSectionHeader
        title="Administrator Management"
        subtitle="Configure boutique managerial roles, atelier staff permissions, and active security policies."
        badgeText="Access Control"
        badgeVariant="maroon"
        badgeIcon={Users}
        actions={
          isSuperAdmin && (
            <Button
              variant="primary"
              size="sm"
              icon={UserPlus}
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer"
            >
              Add / Assign Administrator
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

      {/* Admin Users Table / Cards */}
      <div className="bg-white rounded-sm border border-cream-border overflow-hidden shadow-2xs">
        <div className="p-5 border-b border-cream-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-maroon-800" />
            <h2 className="font-serif font-bold text-lg text-chocolate-900">
              Registered Administrators ({adminList.length})
            </h2>
          </div>
          <span className="text-xs text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-300 font-mono">
            Source: Firestore /admins
          </span>
        </div>

        {loadingAdmins ? (
          <div className="p-8 text-center text-xs text-chocolate-500">
            <div className="h-6 w-6 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <span>Loading registered administrators...</span>
          </div>
        ) : adminList.length === 0 ? (
          <div className="p-8 text-center space-y-3">
            <Shield className="h-8 w-8 text-gold mx-auto" />
            <h3 className="font-serif font-bold text-chocolate-900">No Administrators Registered in Database</h3>
            <p className="text-xs text-chocolate-600 max-w-md mx-auto leading-relaxed">
              Click <strong>Add / Assign Administrator</strong> above to register staff accounts using their Firebase Google UID.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-cream-border">
            {adminList.map((admin) => {
              const isCurrent = admin.id === currentUser?.uid;

              return (
                <div
                  key={admin.id}
                  className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-cream/30 transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="h-10 w-10 rounded-full bg-maroon-800 text-gold flex items-center justify-center font-serif font-bold text-sm shrink-0 border border-gold/30">
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
                            admin.role === 'super_admin'
                              ? 'maroon'
                              : admin.role === 'tailoring_admin'
                              ? 'chocolate'
                              : 'gold'
                          }
                          size="xs"
                        >
                          {admin.role === 'super_admin'
                            ? 'Super Admin'
                            : admin.role === 'tailoring_admin'
                            ? 'Tailoring Admin'
                            : 'Fabric Admin'}
                        </Badge>
                      </div>
                      <div className="text-xs text-chocolate-500 font-mono mt-0.5">{admin.email}</div>
                      <div className="flex items-center gap-1.5 text-[11px] text-chocolate-400 font-mono mt-0.5">
                        <span>UID: {admin.id}</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(admin.id)}
                          className="hover:text-gold cursor-pointer inline-flex items-center"
                          title="Copy UID"
                        >
                          {copiedUid === admin.id ? (
                            <Check className="h-3 w-3 text-emerald-500" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-chocolate-600 pl-13 md:pl-0">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-chocolate-400" />
                      <span>{admin.createdAt ? new Date(admin.createdAt).toLocaleDateString() : 'N/A'}</span>
                    </div>

                    <div className={`flex items-center gap-1.5 font-medium ${admin.active ? 'text-emerald-700' : 'text-red-700'}`}>
                      {admin.active ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                          <span>Active</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-3.5 w-3.5 text-red-600" />
                          <span>Revoked</span>
                        </>
                      )}
                    </div>

                    {/* Actions: Toggle Active & Delete */}
                    {isSuperAdmin && !isCurrent && (
                      <div className="flex items-center gap-2 border-l border-cream-border pl-4">
                        <button
                          type="button"
                          onClick={() => handleToggleActive(admin)}
                          title={admin.active ? 'Deactivate (Revoke Access)' : 'Activate'}
                          className={`p-1.5 rounded transition-colors cursor-pointer ${
                            admin.active
                              ? 'text-amber-700 hover:bg-amber-50'
                              : 'text-emerald-700 hover:bg-emerald-50'
                          }`}
                        >
                          <Power className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteAdmin(admin)}
                          title="Delete Administrator Record"
                          className="p-1.5 rounded text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Role Hierarchy Reference */}
      <div className="space-y-3">
        <h3 className="font-serif font-bold text-base text-chocolate-900 flex items-center gap-2">
          <Key className="h-4 w-4 text-gold-dark" />
          <span>Role Permissions Architecture</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {roleDefinitions.map((role, idx) => (
            <Card key={idx} variant="default" className="border border-cream-border space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <Badge variant={role.badgeVariant} size="xs">
                  {role.scope}
                </Badge>
                <Lock className="h-3.5 w-3.5 text-chocolate-400" />
              </div>
              <h4 className="font-serif font-bold text-base text-chocolate-900">{role.title}</h4>
              <p className="text-xs text-chocolate-600 leading-relaxed font-sans">
                {role.description}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Add Administrator Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-chocolate-950/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-sm border border-gold/40 shadow-2xl max-w-lg w-full p-6 space-y-5 font-sans">
            <div className="flex items-center justify-between pb-3 border-b border-cream-border">
              <div className="flex items-center gap-2 text-maroon-800">
                <Shield className="h-5 w-5 text-gold-dark" />
                <h3 className="font-serif font-bold text-lg text-chocolate-900">
                  Register / Assign Administrator
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-chocolate-400 hover:text-chocolate-700 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-xs bg-red-50 border border-red-200 text-xs text-red-800 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleCreateAdmin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-chocolate-800 mb-1">
                  Firebase User UID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. o1Xv9RzK..."
                  value={formData.uid}
                  onChange={(e) => setFormData({ ...formData, uid: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-mono border border-cream-border rounded-xs focus:ring-1 focus:ring-gold focus:outline-hidden"
                />
                <p className="text-[10px] text-chocolate-500 mt-1">
                  Obtained when staff member signs in at <code>/admin/login</code> or in Firebase Auth console.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-chocolate-800 mb-1">
                  Administrator Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Murtaza Cutpiece"
                  value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-cream-border rounded-xs focus:ring-1 focus:ring-gold focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-chocolate-800 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="admin@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-cream-border rounded-xs focus:ring-1 focus:ring-gold focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-chocolate-800 mb-1">
                  Administrative Role <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-cream-border rounded-xs focus:ring-1 focus:ring-gold focus:outline-hidden bg-white"
                >
                  <option value="tailoring_admin">Tailoring Administrator (Tailoring & Uniforms)</option>
                  <option value="fabric_admin">Fabric Administrator (Fabrics & Swatches)</option>
                  <option value="super_admin">Super Administrator (Full Atelier Access)</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="activeCheck"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="rounded border-cream-border text-gold focus:ring-gold cursor-pointer"
                />
                <label htmlFor="activeCheck" className="text-xs text-chocolate-800 font-medium cursor-pointer">
                  Active (Uncheck to immediately revoke administrative access)
                </label>
              </div>

              <div className="pt-3 border-t border-cream-border flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                  disabled={savingAdmin}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={savingAdmin}
                >
                  {savingAdmin ? 'Saving...' : 'Save Administrator'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;
