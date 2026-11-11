import React from 'react';
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
  HardDrive,
  Users,
  Settings,
  Info,
} from 'lucide-react';

import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';

import { adminContent } from '../../data/adminContent';
import { ROUTES } from '../../constants/navigation';
import { env } from '../../config/env.config';

export const AdminDashboardPage = () => {
  const {
    summaryCards,
    recentActivities,
    categoryDistribution,
  } = adminContent;

  const iconMap = {
    Scissors: Scissors,
    Layers: Layers,
    Image: ImageIcon,
    Shield: Shield,
    Users: Users,
    Settings: Settings,
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ====================================================================== */}
      {/* 1. WELCOME & REPOSITORY STATUS BANNER                                  */}
      {/* ====================================================================== */}
      <div className="bg-white rounded-sm border border-cream-border p-6 sm:p-8 shadow-2xs relative overflow-hidden">
        {/* Subtle Background Accent */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-cream/60 to-transparent pointer-events-none hidden md:block" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="maroon" size="xs">
                Administrative Shell
              </Badge>
              <Badge variant="gold" size="xs" icon={Sparkles}>
                Day 8 UI Implementation
              </Badge>
              <span className="text-xs text-chocolate-500 font-mono">
                Environment: {env.mode} [Demo]
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-chocolate-900 tracking-tight">
              Boutique Management Console
            </h1>

            <p className="text-xs sm:text-sm text-chocolate-600 leading-relaxed font-sans">
              Welcome to the centralized operations dashboard for <strong>Tailoring Home</strong> and <strong>Fabric Home</strong>. Monitor catalogue counts, review activity logs, and configure upcoming database models.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Button
              to={ROUTES.HOME}
              variant="outline"
              size="md"
              icon={ExternalLink}
              iconPosition="right"
              className="text-chocolate-800 border-cream-border hover:bg-cream"
            >
              Public Website
            </Button>
            <Button
              to={ROUTES.ADMIN.TAILORING}
              variant="primary"
              size="md"
              icon={Scissors}
            >
              Tailoring Module
            </Button>
          </div>
        </div>

        {/* Demo Data Notice */}
        <div className="mt-6 pt-4 border-t border-cream-border flex items-start gap-2.5 text-xs text-chocolate-600 font-sans bg-cream/50 p-3 rounded-sm">
          <Info className="h-4 w-4 text-gold-dark shrink-0 mt-0.5" />
          <span>
            <strong>Demo Data Indicator:</strong> All metric counters, activity logs, and administrative records on this dashboard represent illustrative mock values staged for UI testing and layout verification.
          </span>
        </div>
      </div>

      {/* ====================================================================== */}
      {/* 2. SUMMARY METRIC CARDS (ALL CLEARLY LABELED DEMO DATA)                */}
      {/* ====================================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {summaryCards.map((card) => {
          const IconComponent = iconMap[card.icon] || Scissors;
          const isMaroon = card.accentColor === 'maroon';
          const isGold = card.accentColor === 'gold';
          const isChocolate = card.accentColor === 'chocolate';

          return (
            <Card
              key={card.id}
              variant="default"
              className={`flex flex-col justify-between transition-all duration-300 hover:shadow-xs border ${
                isGold
                  ? 'hover:border-gold border-cream-border'
                  : isMaroon
                  ? 'hover:border-maroon-300 border-cream-border'
                  : 'hover:border-chocolate-300 border-cream-border'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div
                    className={`h-10 w-10 rounded-sm flex items-center justify-center border ${
                      isMaroon
                        ? 'bg-maroon-50 text-maroon-800 border-maroon-200'
                        : isGold
                        ? 'bg-amber-50 text-gold-dark border-gold/40'
                        : isChocolate
                        ? 'bg-chocolate-50 text-chocolate-800 border-chocolate-200'
                        : 'bg-stone-100 text-stone-700 border-stone-200'
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                  </div>

                  <Badge variant="gold" size="xs">
                    {card.demoBadge}
                  </Badge>
                </div>

                <div className="text-xs uppercase tracking-wider font-semibold text-chocolate-500 font-sans mb-1">
                  {card.label}
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-chocolate-900">
                    {card.value}
                  </span>
                  <span className="text-xs font-semibold text-maroon-800 font-sans">
                    {card.unit}
                  </span>
                </div>

                <p className="mt-2 text-xs text-chocolate-600 font-sans leading-relaxed">
                  {card.subtext}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-cream-border">
                <Link
                  to={card.route}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-chocolate-800 hover:text-maroon-800 transition-colors"
                >
                  <span>{card.actionLabel}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </Card>
          );
        })}
      </div>

      {/* ====================================================================== */}
      {/* 3. RECENT ACTIVITY LOG SECTION (CLEARLY MARKED AS DEMO DATA)          */}
      {/* ====================================================================== */}
      <div className="bg-white rounded-sm border border-cream-border p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-cream-border">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-4 w-4 text-maroon-800" />
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-chocolate-900">
                Recent Operations & Activity Log
              </h2>
            </div>
            <p className="text-xs text-chocolate-600 font-sans">
              Audit trail of catalogue modifications, image updates, and system events.
            </p>
          </div>

          <Badge variant="gold" size="sm" icon={Sparkles}>
            Demo Audit Trail
          </Badge>
        </div>

        {/* Activity Table / List */}
        <div className="divide-y divide-cream-border overflow-hidden">
          {recentActivities.map((act) => (
            <div
              key={act.id}
              className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-cream/40 px-3 -mx-3 rounded-sm transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-cream text-maroon-800 flex items-center justify-center shrink-0 border border-cream-border mt-0.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                </div>

                <div className="space-y-0.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-xs sm:text-sm text-chocolate-900 font-sans">
                      {act.action}
                    </span>
                    <span className="text-[10px] font-medium px-2 py-0.2 rounded bg-amber-50 text-gold-dark border border-gold/30">
                      Demo Log
                    </span>
                  </div>
                  <p className="text-xs text-chocolate-600 font-sans">
                    {act.details}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-sans text-chocolate-500 pl-11 md:pl-0 shrink-0">
                <span className="px-2 py-0.5 rounded bg-cream border border-cream-border text-chocolate-700 font-medium">
                  {act.entity}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {act.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ====================================================================== */}
      {/* 4. CATEGORY DISTRIBUTION & CATALOGUE HEALTH                            */}
      {/* ====================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Tailoring Distribution */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-7 rounded-sm border border-cream-border shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-cream-border pb-3">
            <div className="flex items-center gap-2 text-maroon-800">
              <Scissors className="h-5 w-5" />
              <h3 className="font-serif font-bold text-lg text-chocolate-900">
                Tailoring Home Categories
              </h3>
            </div>
            <Link
              to={ROUTES.ADMIN.TAILORING}
              className="text-xs font-semibold text-maroon-800 hover:text-maroon-900"
            >
              View All &rarr;
            </Link>
          </div>

          <div className="space-y-3 pt-1">
            {categoryDistribution.tailoringGroups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-1">
                <div className="flex justify-between text-xs font-sans">
                  <span className="font-medium text-chocolate-800">{group.name}</span>
                  <span className="text-chocolate-500">{group.count} Items ({group.share})</span>
                </div>
                <div className="w-full bg-cream h-2 rounded-full overflow-hidden border border-cream-border">
                  <div
                    className="bg-maroon-800 h-full rounded-full"
                    style={{ width: group.share }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fabric Distribution */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-7 rounded-sm border border-cream-border shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-cream-border pb-3">
            <div className="flex items-center gap-2 text-chocolate-800">
              <Layers className="h-5 w-5" />
              <h3 className="font-serif font-bold text-lg text-chocolate-900">
                Fabric Home Textile Archive
              </h3>
            </div>
            <Link
              to={ROUTES.ADMIN.FABRIC}
              className="text-xs font-semibold text-chocolate-800 hover:text-chocolate-900"
            >
              View All &rarr;
            </Link>
          </div>

          <div className="space-y-3 pt-1">
            {categoryDistribution.fabricGroups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-1">
                <div className="flex justify-between text-xs font-sans">
                  <span className="font-medium text-chocolate-800">{group.name}</span>
                  <span className="text-chocolate-500">{group.count} Weaves ({group.share})</span>
                </div>
                <div className="w-full bg-cream h-2 rounded-full overflow-hidden border border-cream-border">
                  <div
                    className="bg-chocolate-800 h-full rounded-full"
                    style={{ width: group.share }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ====================================================================== */}
      {/* 5. ARCHITECTURE & SYSTEM HEALTH STATUS                                 */}
      {/* ====================================================================== */}
      <div className="bg-chocolate-950 text-ivory rounded-sm p-6 sm:p-8 border border-gold/30 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gold">
              <Database className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Environment Architecture
              </span>
            </div>
            <div className="text-xl font-serif font-bold text-ivory">
              {env.mode.toUpperCase()} MODE
            </div>
            <p className="text-xs text-cream/70 leading-relaxed font-sans">
              Dual dev/prod isolation active with separate Firestore collections and Storage prefixes.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gold">
              <HardDrive className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Storage & Deletion Safety
              </span>
            </div>
            <div className="text-xl font-serif font-bold text-ivory">
              Atomic Sync Staged
            </div>
            <p className="text-xs text-cream/70 leading-relaxed font-sans">
              Dual deletion service (`cleanup.service.js`) prepared for both Firestore records and Storage files.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gold">
              <Shield className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Deployment Pipeline
              </span>
            </div>
            <div className="text-xl font-serif font-bold text-emerald-400">
              Vercel Live ● Ready
            </div>
            <p className="text-xs text-cream/70 leading-relaxed font-sans">
              CI/CD connected to GitHub `main` with SPA wildcard rewrite routing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
