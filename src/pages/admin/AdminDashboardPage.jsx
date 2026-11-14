import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Scissors,
  Layers,
  Image as ImageIcon,
  Shield,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Clock,
  CheckCircle2,
  Database,
  Users,
  AlertCircle,
  RefreshCw,
  MessageSquare,
  FileText,
  Inbox,
  Activity,
  Trash2,
  UserCheck,
} from 'lucide-react';

import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';

import { ROUTES } from '../../constants/navigation';
import { env } from '../../config/env.config';
import { useAuth } from '../../context';
import { ROLES, getRoleDisplayName } from '../../constants/roles';
import {
  subscribeToDashboardData,
  createEmptyDashboardState,
} from '../../services/firebase/dashboard.service';

export const AdminDashboardPage = () => {
  const {
    user,
    adminProfile,
    role,
    isSuperAdmin,
    isOperationsAdmin,
    canManageTailoring,
    canManageFabric,
    canManageBothBusinesses,
    canManageAdmins,
  } = useAuth();

  const [dashboardData, setDashboardData] = useState(() =>
    createEmptyDashboardState(role)
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [enquiryFilter, setEnquiryFilter] = useState('all');

  // Real-time Firestore subscription with unmount cleanup
  useEffect(() => {
    let active = true;

    const unsubscribe = subscribeToDashboardData({
      role,
      onData: (data) => {
        if (!active) return;
        setDashboardData(data);
        setLoading(false);
        setRefreshing(false);
      },
      onError: (err) => {
        if (!active) return;
        console.warn('[AdminDashboard] Subscription error:', err);
        setError(err.message || 'Failed to sync with Firestore database.');
        setLoading(false);
        setRefreshing(false);
      },
    });

    return () => {
      active = false;
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [role]);

  // Manual refresh trigger
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setError(null);

    const unsubscribe = subscribeToDashboardData({
      role,
      onData: (data) => {
        setDashboardData(data);
        setRefreshing(false);
      },
      onError: (err) => {
        setError(err.message || 'Refresh failed.');
        setRefreshing(false);
      },
    });

    // Clean up temporary manual subscription after 3 seconds
    setTimeout(() => {
      if (typeof unsubscribe === 'function') unsubscribe();
    }, 3000);
  }, [role]);

  const { stats, recentActivities, recentEnquiries } = dashboardData;
  const isDual = isSuperAdmin || isOperationsAdmin;
  const roleDisplay = getRoleDisplayName(role);
  const adminName =
    user?.displayName || adminProfile?.displayName || 'Administrator';

  // Filtered customer enquiries for status tabs
  const filteredEnquiries = (recentEnquiries || []).filter((item) => {
    if (enquiryFilter === 'all') return true;
    if (enquiryFilter === 'pending') return item.status === 'pending';
    if (enquiryFilter === 'in_progress') return item.status === 'in_progress';
    if (enquiryFilter === 'completed')
      return item.status === 'completed' || item.status === 'resolved';
    return true;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12 font-sans">
      {/* ====================================================================== */}
      {/* 1. WELCOME & REPOSITORY STATUS BANNER                                  */}
      {/* ====================================================================== */}
      <div className="bg-white rounded-sm border border-cream-border p-6 sm:p-8 shadow-2xs relative overflow-hidden">
        {/* Subtle Background Accent */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-cream/60 to-transparent pointer-events-none hidden md:block" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant={
                  isSuperAdmin
                    ? 'maroon'
                    : isOperationsAdmin
                    ? 'gold'
                    : role === ROLES.TAILORING_ADMIN
                    ? 'maroon'
                    : 'chocolate'
                }
                size="xs"
                icon={
                  isSuperAdmin || isOperationsAdmin
                    ? Shield
                    : role === ROLES.TAILORING_ADMIN
                    ? Scissors
                    : Layers
                }
              >
                {roleDisplay}
              </Badge>

              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                Live Firebase Sync
              </span>

              <span className="text-xs text-chocolate-500 font-mono">
                Prefix: {env.firestorePrefix || 'prod_'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-chocolate-900 tracking-tight">
              Welcome back, {adminName}
            </h1>

            <p className="text-xs sm:text-sm text-chocolate-600 leading-relaxed font-sans">
              {isDual
                ? 'Centralized operations console for Tailoring Home & Fabric Home. Monitor real-time catalogue items, review security audit logs, and manage customer enquiries.'
                : role === ROLES.TAILORING_ADMIN
                ? 'Tailoring Home Atelier Console. Manage bespoke stitching offerings, Dawoodi Bohra attire, school uniforms, and tailoring gallery showcase.'
                : 'Fabric Home Textile Console. Manage luxury natural fabrics, pure silks, organic linens, and showroom textile swatches.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Button
              onClick={handleRefresh}
              variant="outline"
              size="sm"
              icon={RefreshCw}
              disabled={refreshing}
              className={`border-cream-border text-chocolate-700 hover:bg-cream ${
                refreshing ? 'animate-spin' : ''
              }`}
            >
              {refreshing ? 'Syncing...' : 'Refresh'}
            </Button>

            <Button
              to={ROUTES.HOME}
              variant="outline"
              size="sm"
              icon={ExternalLink}
              iconPosition="right"
              className="text-chocolate-800 border-cream-border hover:bg-cream"
            >
              Public Site
            </Button>

            {canManageTailoring && (
              <Button
                to={ROUTES.ADMIN.TAILORING}
                variant="primary"
                size="sm"
                icon={Scissors}
              >
                Tailoring
              </Button>
            )}

            {canManageFabric && (
              <Button
                to={ROUTES.ADMIN.FABRIC}
                variant="secondary"
                size="sm"
                icon={Layers}
              >
                Fabrics
              </Button>
            )}
          </div>
        </div>

        {/* Error notification banner if any Firestore operation fails */}
        {error && (
          <div className="mt-5 p-3.5 bg-rose-50 border border-rose-200 rounded-sm flex items-start justify-between gap-3 text-rose-800 text-xs font-sans">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong>Database Sync Notice:</strong> {error}
              </div>
            </div>
            <button
              onClick={handleRefresh}
              className="text-xs underline font-semibold hover:text-rose-950 shrink-0 cursor-pointer"
            >
              Retry Connection
            </button>
          </div>
        )}
      </div>

      {/* ====================================================================== */}
      {/* 2. SUMMARY METRIC CARDS (POWERED BY LIVE FIREBASE DATA)                */}
      {/* ====================================================================== */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white rounded-sm border border-cream-border p-6 shadow-2xs animate-pulse space-y-4"
            >
              <div className="h-10 w-10 bg-cream rounded-sm" />
              <div className="h-4 bg-cream w-2/3 rounded-xs" />
              <div className="h-8 bg-cream w-1/3 rounded-xs" />
              <div className="h-3 bg-cream w-full rounded-xs" />
            </div>
          ))}
        </div>
      ) : isDual ? (
        /* SUPER ADMIN & OPERATIONS ADMIN: DUAL-BUSINESS METRICS */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Published Catalogue Items */}
          <Card
            variant="default"
            className="flex flex-col justify-between border border-cream-border hover:border-gold transition-all duration-300 hover:shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="h-10 w-10 rounded-sm flex items-center justify-center border bg-amber-50 text-gold-dark border-gold/40">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <Badge variant="gold" size="xs">
                  Dual Business
                </Badge>
              </div>

              <div className="text-xs uppercase tracking-wider font-semibold text-chocolate-500 font-sans mb-1">
                Published Catalogue Items
              </div>

              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-chocolate-900">
                  {stats.combined.publishedCatalogue}
                </span>
                <span className="text-xs font-semibold text-maroon-800 font-sans">
                  Live Items
                </span>
              </div>

              <p className="mt-2 text-xs text-chocolate-600 font-sans leading-relaxed">
                {stats.tailoring.published} Tailoring Offerings •{' '}
                {stats.fabric.published} Fabric Weaves
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-cream-border flex items-center justify-between text-xs">
              <Link
                to={ROUTES.ADMIN.TAILORING}
                className="inline-flex items-center gap-1 font-semibold text-chocolate-800 hover:text-maroon-800"
              >
                Tailoring <ArrowRight className="h-3 w-3" />
              </Link>
              <Link
                to={ROUTES.ADMIN.FABRIC}
                className="inline-flex items-center gap-1 font-semibold text-chocolate-800 hover:text-maroon-800"
              >
                Fabrics <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </Card>

          {/* Card 2: Catalogue Drafts / Unpublished */}
          <Card
            variant="default"
            className="flex flex-col justify-between border border-cream-border hover:border-chocolate-300 transition-all duration-300 hover:shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="h-10 w-10 rounded-sm flex items-center justify-center border bg-chocolate-50 text-chocolate-800 border-chocolate-200">
                  <FileText className="h-5 w-5" />
                </div>
                <Badge variant="chocolate" size="xs">
                  Staging / Drafts
                </Badge>
              </div>

              <div className="text-xs uppercase tracking-wider font-semibold text-chocolate-500 font-sans mb-1">
                Unpublished & Drafts
              </div>

              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-chocolate-900">
                  {stats.combined.draftCatalogue}
                </span>
                <span className="text-xs font-semibold text-chocolate-600 font-sans">
                  Staged
                </span>
              </div>

              <p className="mt-2 text-xs text-chocolate-600 font-sans leading-relaxed">
                {stats.tailoring.drafts} Tailoring Drafts •{' '}
                {stats.fabric.drafts} Fabric Drafts
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-cream-border">
              <span className="text-xs text-chocolate-500 font-sans">
                Visible only to authenticated administrators
              </span>
            </div>
          </Card>

          {/* Card 3: Showcase Gallery Images */}
          <Card
            variant="default"
            className="flex flex-col justify-between border border-cream-border hover:border-maroon-300 transition-all duration-300 hover:shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="h-10 w-10 rounded-sm flex items-center justify-center border bg-maroon-50 text-maroon-800 border-maroon-200">
                  <ImageIcon className="h-5 w-5" />
                </div>
                <Badge variant="maroon" size="xs">
                  Showcase Studio
                </Badge>
              </div>

              <div className="text-xs uppercase tracking-wider font-semibold text-chocolate-500 font-sans mb-1">
                Showcase Gallery
              </div>

              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-chocolate-900">
                  {stats.combined.galleryTotal}
                </span>
                <span className="text-xs font-semibold text-maroon-800 font-sans">
                  Curated Assets
                </span>
              </div>

              <p className="mt-2 text-xs text-chocolate-600 font-sans leading-relaxed">
                {stats.tailoring.gallery} Tailoring Photos •{' '}
                {stats.fabric.gallery} Fabric Swatches
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-cream-border">
              <Link
                to={ROUTES.ADMIN.GALLERY}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-chocolate-800 hover:text-maroon-800 transition-colors"
              >
                <span>Curate Showcase</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Card>

          {/* Card 4: Customer Enquiries */}
          <Card
            variant="default"
            className="flex flex-col justify-between border border-cream-border hover:border-gold transition-all duration-300 hover:shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="h-10 w-10 rounded-sm flex items-center justify-center border bg-amber-50 text-gold-dark border-gold/40">
                  <MessageSquare className="h-5 w-5" />
                </div>
                {stats.enquiries.pending > 0 ? (
                  <Badge variant="maroon" size="xs">
                    {stats.enquiries.pending} Pending
                  </Badge>
                ) : (
                  <Badge variant="gold" size="xs">
                    Up to Date
                  </Badge>
                )}
              </div>

              <div className="text-xs uppercase tracking-wider font-semibold text-chocolate-500 font-sans mb-1">
                Customer Inquiries
              </div>

              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-chocolate-900">
                  {stats.enquiries.total}
                </span>
                <span className="text-xs font-semibold text-emerald-800 font-sans">
                  Total
                </span>
              </div>

              <p className="mt-2 text-xs text-chocolate-600 font-sans leading-relaxed">
                {stats.enquiries.pending} Pending •{' '}
                {stats.enquiries.processed} Processed
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-cream-border">
              <a
                href="#customer-enquiries"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-chocolate-800 hover:text-maroon-800 transition-colors"
              >
                <span>Review Inquiries</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </Card>
        </div>
      ) : role === ROLES.TAILORING_ADMIN ? (
        /* TAILORING ADMIN: DEPARTMENTAL METRICS ONLY */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Card
            variant="default"
            className="flex flex-col justify-between border border-cream-border hover:border-maroon-300 transition-all duration-300 hover:shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="h-10 w-10 rounded-sm flex items-center justify-center border bg-maroon-50 text-maroon-800 border-maroon-200">
                  <Scissors className="h-5 w-5" />
                </div>
                <Badge variant="maroon" size="xs">
                  Tailoring Atelier
                </Badge>
              </div>

              <div className="text-xs uppercase tracking-wider font-semibold text-chocolate-500 font-sans mb-1">
                Published Tailoring Cuts
              </div>

              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-chocolate-900">
                  {stats.tailoring.published}
                </span>
                <span className="text-xs font-semibold text-maroon-800 font-sans">
                  Active
                </span>
              </div>

              <p className="mt-2 text-xs text-chocolate-600 font-sans leading-relaxed">
                Bespoke suits, Dawoodi Bohra attire & school uniforms
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-cream-border">
              <Link
                to={ROUTES.ADMIN.TAILORING}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-chocolate-800 hover:text-maroon-800 transition-colors"
              >
                <span>Manage Offerings</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Card>

          <Card
            variant="default"
            className="flex flex-col justify-between border border-cream-border hover:border-chocolate-300 transition-all duration-300 hover:shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="h-10 w-10 rounded-sm flex items-center justify-center border bg-chocolate-50 text-chocolate-800 border-chocolate-200">
                  <FileText className="h-5 w-5" />
                </div>
                <Badge variant="chocolate" size="xs">
                  Drafts
                </Badge>
              </div>

              <div className="text-xs uppercase tracking-wider font-semibold text-chocolate-500 font-sans mb-1">
                Unpublished Staging
              </div>

              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-chocolate-900">
                  {stats.tailoring.drafts}
                </span>
                <span className="text-xs font-semibold text-chocolate-600 font-sans">
                  Drafts
                </span>
              </div>

              <p className="mt-2 text-xs text-chocolate-600 font-sans leading-relaxed">
                Unpublished cuts awaiting public release
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-cream-border">
              <span className="text-xs text-chocolate-500 font-sans">
                Internal atelier drafts
              </span>
            </div>
          </Card>

          <Card
            variant="default"
            className="flex flex-col justify-between border border-cream-border hover:border-gold transition-all duration-300 hover:shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="h-10 w-10 rounded-sm flex items-center justify-center border bg-amber-50 text-gold-dark border-gold/40">
                  <ImageIcon className="h-5 w-5" />
                </div>
                <Badge variant="gold" size="xs">
                  Gallery
                </Badge>
              </div>

              <div className="text-xs uppercase tracking-wider font-semibold text-chocolate-500 font-sans mb-1">
                Tailoring Showcase
              </div>

              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-chocolate-900">
                  {stats.tailoring.gallery}
                </span>
                <span className="text-xs font-semibold text-gold-dark font-sans">
                  Photos
                </span>
              </div>

              <p className="mt-2 text-xs text-chocolate-600 font-sans leading-relaxed">
                Visual showcase photos of finished stitching
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-cream-border">
              <Link
                to={ROUTES.ADMIN.GALLERY}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-chocolate-800 hover:text-maroon-800 transition-colors"
              >
                <span>Curate Gallery</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Card>

          <Card
            variant="default"
            className="flex flex-col justify-between border border-cream-border hover:border-emerald-300 transition-all duration-300 hover:shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="h-10 w-10 rounded-sm flex items-center justify-center border bg-emerald-50 text-emerald-800 border-emerald-200">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <Badge variant="maroon" size="xs">
                  {stats.enquiries.pending} Pending
                </Badge>
              </div>

              <div className="text-xs uppercase tracking-wider font-semibold text-chocolate-500 font-sans mb-1">
                Tailoring Enquiries
              </div>

              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-chocolate-900">
                  {stats.enquiries.total}
                </span>
                <span className="text-xs font-semibold text-emerald-800 font-sans">
                  Total
                </span>
              </div>

              <p className="mt-2 text-xs text-chocolate-600 font-sans leading-relaxed">
                {stats.enquiries.pending} Pending •{' '}
                {stats.enquiries.processed} Processed
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-cream-border">
              <a
                href="#customer-enquiries"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-chocolate-800 hover:text-maroon-800 transition-colors"
              >
                <span>View Enquiries</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </Card>
        </div>
      ) : (
        /* FABRIC ADMIN: DEPARTMENTAL METRICS ONLY */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Card
            variant="default"
            className="flex flex-col justify-between border border-cream-border hover:border-chocolate-300 transition-all duration-300 hover:shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="h-10 w-10 rounded-sm flex items-center justify-center border bg-chocolate-50 text-chocolate-800 border-chocolate-200">
                  <Layers className="h-5 w-5" />
                </div>
                <Badge variant="chocolate" size="xs">
                  Textile Showroom
                </Badge>
              </div>

              <div className="text-xs uppercase tracking-wider font-semibold text-chocolate-500 font-sans mb-1">
                Published Fabric Weaves
              </div>

              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-chocolate-900">
                  {stats.fabric.published}
                </span>
                <span className="text-xs font-semibold text-chocolate-800 font-sans">
                  Active
                </span>
              </div>

              <p className="mt-2 text-xs text-chocolate-600 font-sans leading-relaxed">
                Silks, organic linens, Egyptian cottons & brocades
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-cream-border">
              <Link
                to={ROUTES.ADMIN.FABRIC}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-chocolate-800 hover:text-maroon-800 transition-colors"
              >
                <span>Manage Archive</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Card>

          <Card
            variant="default"
            className="flex flex-col justify-between border border-cream-border hover:border-chocolate-300 transition-all duration-300 hover:shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="h-10 w-10 rounded-sm flex items-center justify-center border bg-stone-100 text-stone-700 border-stone-200">
                  <FileText className="h-5 w-5" />
                </div>
                <Badge variant="stone" size="xs">
                  Drafts
                </Badge>
              </div>

              <div className="text-xs uppercase tracking-wider font-semibold text-chocolate-500 font-sans mb-1">
                Unpublished Swatches
              </div>

              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-chocolate-900">
                  {stats.fabric.drafts}
                </span>
                <span className="text-xs font-semibold text-chocolate-600 font-sans">
                  Drafts
                </span>
              </div>

              <p className="mt-2 text-xs text-chocolate-600 font-sans leading-relaxed">
                Unpublished textile swatches awaiting release
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-cream-border">
              <span className="text-xs text-chocolate-500 font-sans">
                Internal showroom drafts
              </span>
            </div>
          </Card>

          <Card
            variant="default"
            className="flex flex-col justify-between border border-cream-border hover:border-gold transition-all duration-300 hover:shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="h-10 w-10 rounded-sm flex items-center justify-center border bg-amber-50 text-gold-dark border-gold/40">
                  <ImageIcon className="h-5 w-5" />
                </div>
                <Badge variant="gold" size="xs">
                  Gallery
                </Badge>
              </div>

              <div className="text-xs uppercase tracking-wider font-semibold text-chocolate-500 font-sans mb-1">
                Fabric Swatches
              </div>

              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-chocolate-900">
                  {stats.fabric.gallery}
                </span>
                <span className="text-xs font-semibold text-gold-dark font-sans">
                  Swatches
                </span>
              </div>

              <p className="mt-2 text-xs text-chocolate-600 font-sans leading-relaxed">
                Showcase imagery of luxury textile weaves
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-cream-border">
              <Link
                to={ROUTES.ADMIN.GALLERY}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-chocolate-800 hover:text-maroon-800 transition-colors"
              >
                <span>Curate Swatches</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Card>

          <Card
            variant="default"
            className="flex flex-col justify-between border border-cream-border hover:border-emerald-300 transition-all duration-300 hover:shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="h-10 w-10 rounded-sm flex items-center justify-center border bg-emerald-50 text-emerald-800 border-emerald-200">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <Badge variant="maroon" size="xs">
                  {stats.enquiries.pending} Pending
                </Badge>
              </div>

              <div className="text-xs uppercase tracking-wider font-semibold text-chocolate-500 font-sans mb-1">
                Fabric Enquiries
              </div>

              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-chocolate-900">
                  {stats.enquiries.total}
                </span>
                <span className="text-xs font-semibold text-emerald-800 font-sans">
                  Total
                </span>
              </div>

              <p className="mt-2 text-xs text-chocolate-600 font-sans leading-relaxed">
                {stats.enquiries.pending} Pending •{' '}
                {stats.enquiries.processed} Processed
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-cream-border">
              <a
                href="#customer-enquiries"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-chocolate-800 hover:text-maroon-800 transition-colors"
              >
                <span>View Enquiries</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </Card>
        </div>
      )}

      {/* ====================================================================== */}
      {/* 3. QUICK ACTIONS SHORTCUTS (ROLE-PERMISSIONS RESTRICTED)              */}
      {/* ====================================================================== */}
      <div className="bg-white rounded-sm border border-cream-border p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-cream-border pb-3">
          <div className="flex items-center gap-2 text-chocolate-900">
            <Sparkles className="h-4 w-4 text-gold-dark" />
            <h2 className="font-serif font-bold text-lg">Quick Operations</h2>
          </div>
          <span className="text-xs text-chocolate-500">
            Permissions configured for {roleDisplay}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {canManageTailoring && (
            <Link
              to={ROUTES.ADMIN.TAILORING}
              className="p-3.5 rounded-sm border border-cream-border hover:border-maroon-300 hover:bg-cream/40 transition-colors flex flex-col items-center text-center gap-2 group"
            >
              <div className="h-9 w-9 rounded-full bg-maroon-50 text-maroon-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Scissors className="h-4 w-4" />
              </div>
              <span className="text-xs font-semibold text-chocolate-800">
                Tailoring Home
              </span>
            </Link>
          )}

          {canManageFabric && (
            <Link
              to={ROUTES.ADMIN.FABRIC}
              className="p-3.5 rounded-sm border border-cream-border hover:border-chocolate-300 hover:bg-cream/40 transition-colors flex flex-col items-center text-center gap-2 group"
            >
              <div className="h-9 w-9 rounded-full bg-chocolate-50 text-chocolate-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Layers className="h-4 w-4" />
              </div>
              <span className="text-xs font-semibold text-chocolate-800">
                Fabric Home
              </span>
            </Link>
          )}

          <Link
            to={ROUTES.ADMIN.GALLERY}
            className="p-3.5 rounded-sm border border-cream-border hover:border-gold hover:bg-cream/40 transition-colors flex flex-col items-center text-center gap-2 group"
          >
            <div className="h-9 w-9 rounded-full bg-amber-50 text-gold-dark flex items-center justify-center group-hover:scale-105 transition-transform">
              <ImageIcon className="h-4 w-4" />
            </div>
            <span className="text-xs font-semibold text-chocolate-800">
              Open Gallery
            </span>
          </Link>

          <Link
            to={ROUTES.ADMIN.IMAGE_STUDIO}
            className="p-3.5 rounded-sm border border-cream-border hover:border-gold hover:bg-cream/40 transition-colors flex flex-col items-center text-center gap-2 group"
          >
            <div className="h-9 w-9 rounded-full bg-cream text-chocolate-800 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="text-xs font-semibold text-chocolate-800">
              Image Studio
            </span>
          </Link>

          <a
            href="#customer-enquiries"
            className="p-3.5 rounded-sm border border-cream-border hover:border-emerald-300 hover:bg-cream/40 transition-colors flex flex-col items-center text-center gap-2 group"
          >
            <div className="h-9 w-9 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:scale-105 transition-transform">
              <MessageSquare className="h-4 w-4" />
            </div>
            <span className="text-xs font-semibold text-chocolate-800">
              Customer Enquiries
            </span>
          </a>

          {/* Super Admin Exclusive Shortcuts */}
          {canManageAdmins && (
            <Link
              to={ROUTES.ADMIN.ADMIN_MANAGEMENT || '/admin/admins'}
              className="p-3.5 rounded-sm border border-cream-border hover:border-maroon-300 hover:bg-cream/40 transition-colors flex flex-col items-center text-center gap-2 group"
            >
              <div className="h-9 w-9 rounded-full bg-maroon-100 text-maroon-900 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Users className="h-4 w-4" />
              </div>
              <span className="text-xs font-semibold text-chocolate-800">
                Staff Governance
              </span>
            </Link>
          )}

          {isSuperAdmin && (
            <Link
              to={ROUTES.ADMIN.CLEANUP || '/admin/cleanup'}
              className="p-3.5 rounded-sm border border-cream-border hover:border-rose-300 hover:bg-cream/40 transition-colors flex flex-col items-center text-center gap-2 group"
            >
              <div className="h-9 w-9 rounded-full bg-rose-50 text-rose-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Trash2 className="h-4 w-4" />
              </div>
              <span className="text-xs font-semibold text-chocolate-800">
                Storage Cleanup
              </span>
            </Link>
          )}
        </div>
      </div>

      {/* ====================================================================== */}
      {/* 4. CUSTOMER ENQUIRY OVERVIEW                                           */}
      {/* ====================================================================== */}
      <div
        id="customer-enquiries"
        className="bg-white rounded-sm border border-cream-border p-6 sm:p-8 shadow-2xs space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-cream-border">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MessageSquare className="h-5 w-5 text-gold-dark" />
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-chocolate-900">
                Customer Enquiry Overview
              </h2>
            </div>
            <p className="text-xs text-chocolate-600 font-sans">
              Real-time consultation requests, bespoke tailoring bookings, and fabric swatch inquiries.
            </p>
          </div>

          {/* Status Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All', count: stats.enquiries.total },
              {
                id: 'pending',
                label: 'Pending',
                count: stats.enquiries.pending,
                badgeVariant: 'maroon',
              },
              {
                id: 'in_progress',
                label: 'In Progress',
                count: stats.enquiries.inProgress,
                badgeVariant: 'gold',
              },
              {
                id: 'completed',
                label: 'Completed',
                count: stats.enquiries.completed,
                badgeVariant: 'emerald',
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setEnquiryFilter(tab.id)}
                className={`px-3 py-1.5 rounded-sm text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                  enquiryFilter === tab.id
                    ? 'bg-chocolate-900 text-ivory font-semibold'
                    : 'bg-cream/60 text-chocolate-700 hover:bg-cream border border-cream-border'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    enquiryFilter === tab.id
                      ? 'bg-white/20 text-ivory'
                      : 'bg-chocolate-100 text-chocolate-800'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Enquiry List / Table */}
        {loading ? (
          <div className="py-8 text-center text-chocolate-500 text-xs font-sans">
            Loading customer inquiries from Firestore...
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="p-8 sm:p-12 text-center border-2 border-dashed border-cream-border rounded-sm space-y-3 bg-stone-50/50">
            <div className="h-12 w-12 rounded-full bg-cream text-chocolate-500 flex items-center justify-center mx-auto">
              <Inbox className="h-6 w-6 text-chocolate-400" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-base text-chocolate-900">
                No Customer Enquiries Recorded
              </h3>
              <p className="text-xs text-chocolate-500 max-w-md mx-auto">
                {enquiryFilter === 'all'
                  ? 'No enquiries submitted from the public contact forms or WhatsApp booking links yet. When customers reach out, their requests will appear here dynamically.'
                  : `No enquiries currently matching the "${enquiryFilter}" status filter.`}
              </p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-cream-border overflow-hidden">
            {filteredEnquiries.map((enq) => {
              const isPending = enq.status === 'pending';
              const isInProgress = enq.status === 'in_progress';

              return (
                <div
                  key={enq.id}
                  className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-cream/30 px-3 -mx-3 rounded-sm transition-colors cursor-pointer"
                  onClick={() => setSelectedEnquiry(enq)}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 border mt-0.5 ${
                        isPending
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : isInProgress
                          ? 'bg-blue-50 text-blue-800 border-blue-200'
                          : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      }`}
                    >
                      <MessageSquare className="h-4 w-4" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-xs sm:text-sm text-chocolate-900 font-sans">
                          {enq.name}
                        </span>

                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                            isPending
                              ? 'bg-amber-50 text-amber-800 border-amber-200'
                              : isInProgress
                              ? 'bg-blue-50 text-blue-800 border-blue-200'
                              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          }`}
                        >
                          {isPending
                            ? 'Pending'
                            : isInProgress
                            ? 'In Progress'
                            : 'Completed'}
                        </span>

                        {isDual && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cream border border-cream-border text-chocolate-600">
                            {enq.business === 'fabric'
                              ? 'Fabric Home'
                              : 'Tailoring Home'}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-chocolate-600 font-sans line-clamp-1">
                        <strong>Service:</strong> {enq.service} — {enq.message}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-sans text-chocolate-500 pl-12 md:pl-0 shrink-0">
                    {enq.phone && (
                      <span className="font-mono text-chocolate-700">
                        {enq.phone}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {enq.formattedTime}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal for viewing customer enquiry details */}
        {selectedEnquiry && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-sm border border-cream-border max-w-lg w-full p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-cream-border pb-3">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-gold-dark" />
                  <h3 className="font-serif font-bold text-lg text-chocolate-900">
                    Customer Enquiry Details
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedEnquiry(null)}
                  className="text-xs text-chocolate-500 hover:text-chocolate-800 cursor-pointer font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs font-sans">
                <div>
                  <span className="text-chocolate-500 block">Customer Name</span>
                  <span className="font-semibold text-chocolate-900 text-sm">
                    {selectedEnquiry.name}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-chocolate-500 block">Phone</span>
                    <span className="font-mono text-chocolate-900">
                      {selectedEnquiry.phone || 'Not provided'}
                    </span>
                  </div>
                  <div>
                    <span className="text-chocolate-500 block">Email</span>
                    <span className="font-mono text-chocolate-900">
                      {selectedEnquiry.email || 'Not provided'}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-chocolate-500 block">Service Requested</span>
                  <span className="font-medium text-chocolate-900">
                    {selectedEnquiry.service}
                  </span>
                </div>

                <div>
                  <span className="text-chocolate-500 block">Message</span>
                  <p className="p-3 bg-cream/40 rounded-sm border border-cream-border text-chocolate-800 leading-relaxed">
                    {selectedEnquiry.message || 'No additional message provided.'}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-chocolate-500">
                    Received: {selectedEnquiry.formattedTime}
                  </span>
                  <span className="font-semibold capitalize text-chocolate-800">
                    Status: {selectedEnquiry.status}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-cream-border flex justify-end">
                <Button
                  onClick={() => setSelectedEnquiry(null)}
                  variant="outline"
                  size="sm"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ====================================================================== */}
      {/* 5. RECENT ACTIVITY LOG (FROM GENUINE /admin_audit_logs)                */}
      {/* ====================================================================== */}
      <div className="bg-white rounded-sm border border-cream-border p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-cream-border">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Activity className="h-5 w-5 text-maroon-800" />
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-chocolate-900">
                Recent Operations & Activity Log
              </h2>
            </div>
            <p className="text-xs text-chocolate-600 font-sans">
              Genuine security audit trail of staff actions, catalogue mutations, and invitations.
            </p>
          </div>

          <Badge variant="stone" size="sm" icon={Shield}>
            Immutable: /admin_audit_logs
          </Badge>
        </div>

        {/* Activity Table / List */}
        {loading ? (
          <div className="py-8 text-center text-chocolate-500 text-xs font-sans">
            Loading activity log records...
          </div>
        ) : recentActivities.length === 0 ? (
          <div className="p-8 sm:p-12 text-center border-2 border-dashed border-cream-border rounded-sm space-y-3 bg-stone-50/50">
            <div className="h-12 w-12 rounded-full bg-cream text-chocolate-500 flex items-center justify-center mx-auto">
              <Clock className="h-6 w-6 text-chocolate-400" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-base text-chocolate-900">
                No Administrative Activity Recorded
              </h3>
              <p className="text-xs text-chocolate-500 max-w-md mx-auto">
                No administrative events recorded yet in the audit log. When administrators invite staff, publish offerings, or update gallery collections, records will be logged automatically.
              </p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-cream-border overflow-hidden">
            {recentActivities.map((act) => {
              const isTailoring = act.business === 'Tailoring Home';
              const isFabric = act.business === 'Fabric Home';

              return (
                <div
                  key={act.id}
                  className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-cream/40 px-3 -mx-3 rounded-sm transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 border mt-0.5 ${
                        isTailoring
                          ? 'bg-maroon-50 text-maroon-800 border-maroon-200'
                          : isFabric
                          ? 'bg-chocolate-50 text-chocolate-800 border-chocolate-200'
                          : 'bg-stone-100 text-stone-700 border-stone-200'
                      }`}
                    >
                      {isTailoring ? (
                        <Scissors className="h-4 w-4" />
                      ) : isFabric ? (
                        <Layers className="h-4 w-4" />
                      ) : (
                        <UserCheck className="h-4 w-4" />
                      )}
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-xs sm:text-sm text-chocolate-900 font-sans">
                          {act.description}
                        </span>
                      </div>
                      <p className="text-[11px] text-chocolate-500 font-sans">
                        Performed by: <span className="font-mono">{act.actor}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-sans text-chocolate-500 pl-11 md:pl-0 shrink-0">
                    <span className="px-2 py-0.5 rounded bg-cream border border-cream-border text-chocolate-700 font-medium">
                      {act.business}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {act.formattedTime}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ====================================================================== */}
      {/* 6. ENVIRONMENT ARCHITECTURE STATUS FOOTER                              */}
      {/* ====================================================================== */}
      <div className="bg-chocolate-950 text-ivory rounded-sm p-6 sm:p-8 border border-gold/30 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gold">
              <Database className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Firestore Namespace
              </span>
            </div>
            <div className="text-xl font-serif font-bold text-ivory">
              {env.mode.toUpperCase()} MODE
            </div>
            <p className="text-xs text-cream/70 leading-relaxed font-sans">
              Collection prefix: <code className="text-gold font-mono">{env.firestorePrefix || '(default)'}</code>. Zero mock data fallbacks active.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gold">
              <Shield className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Active Governance
              </span>
            </div>
            <div className="text-xl font-serif font-bold text-ivory">
              {roleDisplay}
            </div>
            <p className="text-xs text-cream/70 leading-relaxed font-sans">
              {canManageBothBusinesses
                ? 'Dual-business authorization active across Tailoring & Fabric collections.'
                : 'Departmentally scoped authorization enforced at database rule layer.'}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gold">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Security Rules Status
              </span>
            </div>
            <div className="text-xl font-serif font-bold text-emerald-400">
              Rules Active ● Enforced
            </div>
            <p className="text-xs text-cream/70 leading-relaxed font-sans">
              Firestore & Storage rules strictly enforce role integrity, audit logging, and anti-tampering.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
