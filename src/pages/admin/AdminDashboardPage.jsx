import React from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  Scissors,
  Image as ImageIcon,
  Database,
  Trash2,
  HardDrive,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { env } from '../../config/env.config';
import { ROUTES } from '../../constants/navigation';

export const AdminDashboardPage = () => {
  const isConfigured = env.isFirebaseConfigured();

  return (
    <div className="max-w-6xl mx-auto space-y-8 font-sans">
      {/* Welcome Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-sm border border-stone-200 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="maroon" size="xs">
                Administrative Shell
              </Badge>
              <span className="text-xs text-stone-500 font-mono">v0.1.0 (Phase 1 Init)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-chocolate-900">
              Boutique Management Console
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-stone-600">
              Future control center for Tailoring Home & Fabric Home catalogues and promotional content.
            </p>
          </div>

          <Button
            to={ROUTES.HOME}
            variant="outline"
            size="sm"
            icon={ExternalLink}
            iconPosition="right"
          >
            Preview Public Site
          </Button>
        </div>
      </div>

      {/* Architecture & Environment Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Environment Partition */}
        <Card variant="default">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Environment Partition
            </span>
            <Database className="h-4 w-4 text-gold-dark" />
          </div>
          <div className="text-2xl font-serif font-bold text-chocolate-900 uppercase">
            {env.mode}
          </div>
          <div className="mt-2 text-xs text-stone-600 space-y-1">
            <p>
              Firestore Prefix: <code className="font-mono text-maroon-700 font-semibold">{env.firestorePrefix}</code>
            </p>
            <p>
              Storage Folder: <code className="font-mono text-maroon-700 font-semibold">{env.storageFolder}/</code>
            </p>
          </div>
        </Card>

        {/* Firebase Connectivity */}
        <Card variant="default">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Firebase Status
            </span>
            {isConfigured ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-amber-500" />
            )}
          </div>
          <div className="text-2xl font-serif font-bold text-chocolate-900">
            {isConfigured ? 'Connected' : 'Staged Ready'}
          </div>
          <p className="mt-2 text-xs text-stone-600">
            {isConfigured
              ? 'Firestore & Cloud Storage services actively responding.'
              : 'Architecture configured with mock/dev fallbacks. Set keys in .env when ready.'}
          </p>
        </Card>

        {/* Data Isolation Policy */}
        <Card variant="default">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Storage Safety Policy
            </span>
            <HardDrive className="h-4 w-4 text-chocolate-700" />
          </div>
          <div className="text-2xl font-serif font-bold text-chocolate-900">
            Isolated
          </div>
          <p className="mt-2 text-xs text-stone-600">
            Test images and staging collections are isolated from production storage.
          </p>
        </Card>
      </div>

      {/* Catalogue Management Modules (Future Development Roadmap) */}
      <div>
        <h2 className="font-serif text-lg font-bold text-chocolate-900 mb-4">
          Catalogue Management Modules (Prepared for Day 2+)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-5 rounded-sm border border-stone-200 shadow-2xs hover:border-maroon-300 transition-colors">
            <div className="h-9 w-9 rounded bg-maroon-50 text-maroon-800 flex items-center justify-center mb-3">
              <Scissors className="h-5 w-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-chocolate-900 mb-1">
              Tailoring Services
            </h3>
            <p className="text-xs text-stone-600 mb-4">
              Add bespoke services, cutting details, turnaround timelines, and price indicators.
            </p>
            <span className="text-[11px] font-semibold text-stone-400 uppercase">
              Phase 2 Target
            </span>
          </div>

          <div className="bg-white p-5 rounded-sm border border-stone-200 shadow-2xs hover:border-chocolate-300 transition-colors">
            <div className="h-9 w-9 rounded bg-chocolate-50 text-chocolate-800 flex items-center justify-center mb-3">
              <Layers className="h-5 w-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-chocolate-900 mb-1">
              Fabric Repository
            </h3>
            <p className="text-xs text-stone-600 mb-4">
              Catalogue silks, linens, wools, cotton counts, origins, and stock availability.
            </p>
            <span className="text-[11px] font-semibold text-stone-400 uppercase">
              Phase 2 Target
            </span>
          </div>

          <div className="bg-white p-5 rounded-sm border border-stone-200 shadow-2xs hover:border-amber-300 transition-colors">
            <div className="h-9 w-9 rounded bg-amber-50 text-gold-dark flex items-center justify-center mb-3">
              <ImageIcon className="h-5 w-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-chocolate-900 mb-1">
              Visual Gallery
            </h3>
            <p className="text-xs text-stone-600 mb-4">
              Upload finished bespoke garments and fabric texture showcases via Cloud Storage.
            </p>
            <span className="text-[11px] font-semibold text-stone-400 uppercase">
              Phase 2 Target
            </span>
          </div>

          <div className="bg-white p-5 rounded-sm border-2 border-dashed border-red-200 bg-red-50/20 shadow-2xs">
            <div className="h-9 w-9 rounded bg-red-100 text-red-700 flex items-center justify-center mb-3">
              <Trash2 className="h-5 w-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-red-900 mb-1">
              Test Asset Purge
            </h3>
            <p className="text-xs text-stone-600 mb-4">
              Atomically delete Firestore test records and their associated Firebase Storage images.
            </p>
            <Link
              to={ROUTES.ADMIN.CLEANUP}
              className="text-xs font-semibold text-red-700 hover:text-red-900 flex items-center gap-1"
            >
              Open Cleanup Utility &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
