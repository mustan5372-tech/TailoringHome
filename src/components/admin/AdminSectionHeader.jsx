import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Info, Sparkles } from 'lucide-react';
import { Badge } from '../common/Badge';
import { ROUTES } from '../../constants/navigation';

/**
 * Standardized Admin Section Header
 * Enforces visual consistency, breadcrumbs, demo notices,
 * and action button alignment across all Admin modules.
 */
export const AdminSectionHeader = ({
  title,
  subtitle,
  badgeText,
  badgeVariant = 'maroon',
  badgeIcon = Sparkles,
  actions = null,
  showBackToDashboard = true,
  demoNoticeText = null,
}) => {
  return (
    <div className="space-y-4 font-sans">
      {/* Main Header Card */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-6 sm:p-7 rounded-sm border border-cream-border shadow-2xs">
        <div className="space-y-1.5 max-w-3xl">
          {/* Breadcrumbs & Badge */}
          <div className="flex flex-wrap items-center gap-2 mb-1">
            {showBackToDashboard && (
              <>
                <Link
                  to={ROUTES.ADMIN.DASHBOARD}
                  className="text-xs text-chocolate-500 hover:text-maroon-800 flex items-center gap-1 font-semibold transition-colors"
                >
                  <ArrowLeft className="h-3 w-3" /> Dashboard
                </Link>
                <span className="text-stone-300">/</span>
              </>
            )}
            {badgeText && (
              <Badge variant={badgeVariant} size="xs" icon={badgeIcon}>
                {badgeText}
              </Badge>
            )}
            <span className="text-[11px] text-chocolate-400 font-mono">
              [Demo Mode]
            </span>
          </div>

          {/* Section Title */}
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-chocolate-900 tracking-tight">
            {title}
          </h1>

          {/* Section Subtitle */}
          {subtitle && (
            <p className="text-xs sm:text-sm text-chocolate-600 leading-relaxed font-sans">
              {subtitle}
            </p>
          )}
        </div>

        {/* Action Slot */}
        {actions && (
          <div className="flex flex-wrap items-center gap-2.5 shrink-0 pt-2 lg:pt-0">
            {actions}
          </div>
        )}
      </div>

      {/* Demo Notice Banner */}
      {demoNoticeText && (
        <div className="bg-cream/60 border border-gold/30 rounded-sm p-3.5 sm:p-4 text-xs text-chocolate-700 flex items-start gap-2.5 shadow-2xs">
          <Info className="h-4 w-4 text-gold-dark shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-semibold text-chocolate-900 block sm:inline mr-1">
              Demo Environment Notice:
            </span>
            <span className="text-chocolate-700">{demoNoticeText}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSectionHeader;
