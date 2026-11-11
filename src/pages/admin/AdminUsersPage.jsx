import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  ArrowLeft,
  Info,
  UserPlus,
  Key,
  CheckCircle2,
  Clock,
  Lock,
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { ROUTES } from '../../constants/navigation';
import { adminContent } from '../../data/adminContent';

export const AdminUsersPage = () => {
  const { adminUsers } = adminContent;

  const roleDefinitions = [
    {
      title: 'Super Administrator',
      scope: 'Full atelier authority',
      description:
        'Unrestricted access to edit tailoring categories, fabric swatches, gallery showcase, and assign permissions.',
      badgeVariant: 'maroon',
    },
    {
      title: 'Catalogue Manager',
      scope: 'Merchandise & Swatches',
      description:
        'Authority to manage fabric collections, school uniform specifications, and update descriptive texts.',
      badgeVariant: 'chocolate',
    },
    {
      title: 'Media Curator',
      scope: 'Image Studio & Gallery',
      description:
        'Dedicated access to prepare, crop, and upload high-resolution boutique photographs to the showcase gallery.',
      badgeVariant: 'gold',
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-sm border border-cream-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              to={ROUTES.ADMIN.DASHBOARD}
              className="text-xs text-chocolate-500 hover:text-maroon-800 flex items-center gap-1 font-semibold"
            >
              <ArrowLeft className="h-3 w-3" /> Dashboard
            </Link>
            <span className="text-stone-300">/</span>
            <Badge variant="maroon" size="xs">
              Access Control
            </Badge>
          </div>
          <h1 className="font-serif font-bold text-2xl text-chocolate-900">
            Administrator Management [Demo UI]
          </h1>
          <p className="text-xs text-chocolate-600 mt-0.5">
            Configure boutique managerial roles, atelier staff permissions, and security policies.
          </p>
        </div>

        <Button variant="primary" size="sm" icon={UserPlus} disabled className="opacity-80">
          Invite Administrator [Demo]
        </Button>
      </div>

      {/* Demo Notice */}
      <div className="bg-cream/60 border border-gold/30 rounded-sm p-3.5 text-xs text-chocolate-700 flex items-start gap-2.5">
        <Info className="h-4 w-4 text-gold-dark shrink-0 mt-0.5" />
        <span>
          <strong>Authentication Staged (Demo Only):</strong> Firebase Authentication and role-based access control (RBAC) are not yet connected. The accounts below represent staged mock administrators for interface testing.
        </span>
      </div>

      {/* Admin Users Table / Cards */}
      <div className="bg-white rounded-sm border border-cream-border overflow-hidden">
        <div className="p-5 border-b border-cream-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-maroon-800" />
            <h2 className="font-serif font-bold text-lg text-chocolate-900">
              Active Authorized Accounts ({adminUsers.length}) [Demo]
            </h2>
          </div>
          <span className="text-xs text-chocolate-500 font-mono">Status: Mock UI</span>
        </div>

        <div className="divide-y divide-cream-border">
          {adminUsers.map((user, idx) => (
            <div
              key={idx}
              className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-cream/30 transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <div className="h-10 w-10 rounded-full bg-maroon-800 text-gold flex items-center justify-center font-serif font-bold text-sm shrink-0 border border-gold/30">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm text-chocolate-900">{user.name}</h3>
                    <Badge
                      variant={user.role.includes('Super') ? 'maroon' : 'chocolate'}
                      size="xs"
                    >
                      {user.role}
                    </Badge>
                  </div>
                  <div className="text-xs text-chocolate-500 font-mono mt-0.5">{user.email}</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-xs text-chocolate-600 pl-13 md:pl-0">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-chocolate-400" />
                  <span>Last active: {user.lastLogin}</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>{user.status}</span>
                </div>
                <button
                  type="button"
                  disabled
                  className="text-xs text-chocolate-400 cursor-not-allowed hover:text-chocolate-500"
                >
                  Edit Permissions [Demo]
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Role Hierarchy Reference */}
      <div className="space-y-3">
        <h3 className="font-serif font-bold text-base text-chocolate-900 flex items-center gap-2">
          <Key className="h-4 w-4 text-gold-dark" />
          <span>Role Permissions Architecture</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {roleDefinitions.map((role, idx) => (
            <Card key={idx} variant="default" className="border border-cream-border space-y-2">
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
    </div>
  );
};

export default AdminUsersPage;
