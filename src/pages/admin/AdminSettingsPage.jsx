import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Info,
  Save,
  Globe,
  Phone,
  Clock,
  MapPin,
  Database,
  Layers,
  Scissors,
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { ROUTES, BRAND_INFO } from '../../constants/navigation';
import { env } from '../../config/env.config';

export const AdminSettingsPage = () => {
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
            <Badge variant="chocolate" size="xs">
              System Settings
            </Badge>
          </div>
          <h1 className="font-serif font-bold text-2xl text-chocolate-900">
            Boutique & Atelier Settings [Demo]
          </h1>
          <p className="text-xs text-chocolate-600 mt-0.5">
            Configure contact placeholders, atelier operating hours, and deployment environment preferences.
          </p>
        </div>

        <Button variant="primary" size="sm" icon={Save} disabled className="opacity-80">
          Save Preferences [Demo]
        </Button>
      </div>

      {/* Demo Notice */}
      <div className="bg-cream/60 border border-gold/30 rounded-sm p-3.5 text-xs text-chocolate-700 flex items-start gap-2.5">
        <Info className="h-4 w-4 text-gold-dark shrink-0 mt-0.5" />
        <span>
          <strong>Staged Configuration View:</strong> Current settings reflect parameters defined in <code>BRAND_INFO</code>. Once database persistence is configured, changes made here will update the public website in real time.
        </span>
      </div>

      {/* Two Column Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tailoring Home Settings Card */}
        <Card variant="default" className="border border-cream-border space-y-4">
          <div className="flex items-center justify-between border-b border-cream-border pb-3">
            <div className="flex items-center gap-2 text-maroon-800">
              <Scissors className="h-5 w-5" />
              <h2 className="font-serif font-bold text-lg text-chocolate-900">
                Tailoring Home Information
              </h2>
            </div>
            <Badge variant="maroon" size="xs">
              Stitching Atelier
            </Badge>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-semibold text-chocolate-800 block mb-1">Business Name</label>
              <input
                type="text"
                disabled
                defaultValue={BRAND_INFO.tailoringShop.name}
                className="w-full bg-stone-50 border border-stone-200 rounded-sm p-2 text-chocolate-900 font-sans cursor-not-allowed"
              />
            </div>

            <div>
              <label className="font-semibold text-chocolate-800 block mb-1">
                Phone Number (Placeholder)
              </label>
              <div className="flex items-center gap-2 bg-stone-50 border border-stone-200 rounded-sm p-2 text-chocolate-900">
                <Phone className="h-3.5 w-3.5 text-chocolate-500" />
                <span className="font-mono">{BRAND_INFO.tailoringShop.phoneDisplay}</span>
              </div>
            </div>

            <div>
              <label className="font-semibold text-chocolate-800 block mb-1">
                WhatsApp Inquiry Line (Placeholder)
              </label>
              <div className="flex items-center gap-2 bg-stone-50 border border-stone-200 rounded-sm p-2 text-chocolate-900">
                <Globe className="h-3.5 w-3.5 text-chocolate-500" />
                <span className="font-mono">{BRAND_INFO.tailoringShop.whatsapp}</span>
              </div>
            </div>

            <div>
              <label className="font-semibold text-chocolate-800 block mb-1">
                Atelier Location (Placeholder)
              </label>
              <div className="flex items-center gap-2 bg-stone-50 border border-stone-200 rounded-sm p-2 text-chocolate-900">
                <MapPin className="h-3.5 w-3.5 text-chocolate-500" />
                <span>{BRAND_INFO.tailoringShop.location}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Fabric Home Settings Card */}
        <Card variant="default" className="border border-cream-border space-y-4">
          <div className="flex items-center justify-between border-b border-cream-border pb-3">
            <div className="flex items-center gap-2 text-chocolate-800">
              <Layers className="h-5 w-5" />
              <h2 className="font-serif font-bold text-lg text-chocolate-900">
                Fabric Home Information
              </h2>
            </div>
            <Badge variant="chocolate" size="xs">
              Textile Store
            </Badge>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-semibold text-chocolate-800 block mb-1">Business Name</label>
              <input
                type="text"
                disabled
                defaultValue={BRAND_INFO.fabricShop.name}
                className="w-full bg-stone-50 border border-stone-200 rounded-sm p-2 text-chocolate-900 font-sans cursor-not-allowed"
              />
            </div>

            <div>
              <label className="font-semibold text-chocolate-800 block mb-1">
                Phone Number (Placeholder)
              </label>
              <div className="flex items-center gap-2 bg-stone-50 border border-stone-200 rounded-sm p-2 text-chocolate-900">
                <Phone className="h-3.5 w-3.5 text-chocolate-500" />
                <span className="font-mono">{BRAND_INFO.fabricShop.phoneDisplay}</span>
              </div>
            </div>

            <div>
              <label className="font-semibold text-chocolate-800 block mb-1">
                WhatsApp Inquiry Line (Placeholder)
              </label>
              <div className="flex items-center gap-2 bg-stone-50 border border-stone-200 rounded-sm p-2 text-chocolate-900">
                <Globe className="h-3.5 w-3.5 text-chocolate-500" />
                <span className="font-mono">{BRAND_INFO.fabricShop.whatsapp}</span>
              </div>
            </div>

            <div>
              <label className="font-semibold text-chocolate-800 block mb-1">
                Textile Store Location (Placeholder)
              </label>
              <div className="flex items-center gap-2 bg-stone-50 border border-stone-200 rounded-sm p-2 text-chocolate-900">
                <MapPin className="h-3.5 w-3.5 text-chocolate-500" />
                <span>{BRAND_INFO.fabricShop.location}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Operating Hours & Environment Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Operating Hours */}
        <div className="bg-white p-6 rounded-sm border border-cream-border space-y-4">
          <div className="flex items-center gap-2 text-chocolate-900 font-serif font-bold text-base border-b border-cream-border pb-2">
            <Clock className="h-4 w-4 text-gold-dark" />
            <span>Operating Hours (Placeholder)</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-semibold text-chocolate-800 block mb-1">Standard Hours</label>
              <input
                type="text"
                disabled
                defaultValue={BRAND_INFO.workingHours}
                className="w-full bg-stone-50 border border-stone-200 rounded-sm p-2 text-chocolate-900 font-sans cursor-not-allowed"
              />
            </div>
            <div>
              <label className="font-semibold text-chocolate-800 block mb-1">Extended Hours Display</label>
              <input
                type="text"
                disabled
                defaultValue={BRAND_INFO.fullHours}
                className="w-full bg-stone-50 border border-stone-200 rounded-sm p-2 text-chocolate-900 font-sans cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* System & Architecture */}
        <div className="bg-white p-6 rounded-sm border border-cream-border space-y-4">
          <div className="flex items-center gap-2 text-chocolate-900 font-serif font-bold text-base border-b border-cream-border pb-2">
            <Database className="h-4 w-4 text-maroon-800" />
            <span>Architecture & Environment Flags</span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-2 rounded-sm bg-stone-50 border border-stone-200">
              <span className="font-semibold text-chocolate-900">Current Environment</span>
              <span className="font-mono text-gold-dark font-bold uppercase">{env.mode}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-sm bg-stone-50 border border-stone-200">
              <span className="font-semibold text-chocolate-900">Firestore Collection Prefix</span>
              <span className="font-mono text-chocolate-700">{env.firestorePrefix}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-sm bg-stone-50 border border-stone-200">
              <span className="font-semibold text-chocolate-900">Storage Bucket Prefix</span>
              <span className="font-mono text-chocolate-700">{env.storagePrefix}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
