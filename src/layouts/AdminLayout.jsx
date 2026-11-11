import React, { useState } from 'react';
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom';
import {
  Shield,
  LayoutDashboard,
  Scissors,
  Layers,
  Image as ImageIcon,
  Sparkles,
  Users,
  Settings,
  Trash2,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  Database,
  HardDrive,
  User,
  Key,
} from 'lucide-react';
import { ROUTES } from '../constants/navigation';
import { env } from '../config/env.config';

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const location = useLocation();

  // Page title mapping based on current active route
  const getPageInfo = (pathname) => {
    switch (pathname) {
      case ROUTES.ADMIN.DASHBOARD:
        return {
          title: 'Operations Dashboard',
          subtitle: 'Centralized atelier overview & metrics',
          badge: 'Executive View',
        };
      case ROUTES.ADMIN.TAILORING:
        return {
          title: 'Tailoring Home Management',
          subtitle: 'Bespoke tailoring, Dawoodi Bohra attire & uniform cuts',
          badge: 'Tailoring Module',
        };
      case ROUTES.ADMIN.FABRIC:
        return {
          title: 'Fabric Home Textile Archive',
          subtitle: 'Silk, linen, cotton & Rida material collections',
          badge: 'Textile Archive',
        };
      case ROUTES.ADMIN.GALLERY:
        return {
          title: 'Showcase Gallery Studio',
          subtitle: 'Dual-boutique photography & visual retrospective',
          badge: 'Media Showcase',
        };
      case ROUTES.ADMIN.IMAGE_STUDIO:
        return {
          title: 'Image Studio Pipeline',
          subtitle: 'Aspect ratio calibration & asset staging',
          badge: 'Asset Pipeline',
        };
      case ROUTES.ADMIN.ADMIN_MANAGEMENT:
        return {
          title: 'Administrator Management',
          subtitle: 'Atelier user accounts, security roles & permissions',
          badge: 'Access Control',
        };
      case ROUTES.ADMIN.SETTINGS:
        return {
          title: 'Boutique & System Settings',
          subtitle: 'Operating hours, phone placeholders & environment config',
          badge: 'Configuration',
        };
      case ROUTES.ADMIN.CLEANUP:
        return {
          title: 'Storage & Firestore Cleanup',
          subtitle: 'Atomic deletion and partition hygiene',
          badge: 'System Engine',
        };
      default:
        return {
          title: 'Administration Console',
          subtitle: 'Boutique management workspace',
          badge: 'Admin Console',
        };
    }
  };

  const currentPage = getPageInfo(location.pathname);

  // Core navigation items required by Day 9 specification
  const adminNavItems = [
    {
      label: 'Dashboard',
      path: ROUTES.ADMIN.DASHBOARD,
      icon: LayoutDashboard,
      badge: 'Overview',
    },
    {
      label: 'Tailoring Home',
      path: ROUTES.ADMIN.TAILORING,
      icon: Scissors,
      badge: '10 Cuts',
    },
    {
      label: 'Fabric Home',
      path: ROUTES.ADMIN.FABRIC,
      icon: Layers,
      badge: '11 Weaves',
    },
    {
      label: 'Gallery',
      path: ROUTES.ADMIN.GALLERY,
      icon: ImageIcon,
      badge: '16 Photos',
    },
    {
      label: 'Image Studio',
      path: ROUTES.ADMIN.IMAGE_STUDIO,
      icon: Sparkles,
      badge: 'Pipeline',
    },
    {
      label: 'Admin Management',
      path: ROUTES.ADMIN.ADMIN_MANAGEMENT,
      icon: Users,
      badge: '2 Admins',
    },
    {
      label: 'Settings',
      path: ROUTES.ADMIN.SETTINGS,
      icon: Settings,
      badge: 'Config',
    },
  ];

  // Secondary tools (atomic cleanup utility)
  const secondaryNavItems = [
    {
      label: 'Storage Cleanup',
      path: ROUTES.ADMIN.CLEANUP,
      icon: Trash2,
      badge: 'Utility',
    },
  ];

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col md:flex-row text-chocolate-900 font-sans">
      {/* ====================================================================== */}
      {/* 1. MOBILE TOP NAVIGATION BAR (STICKY)                                  */}
      {/* ====================================================================== */}
      <div className="md:hidden bg-chocolate-950 text-ivory p-3.5 sm:p-4 flex items-center justify-between border-b border-gold/30 sticky top-0 z-40 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? 'Close navigation sidebar' : 'Open navigation sidebar'}
            aria-expanded={sidebarOpen}
            className="p-2 -ml-1 text-ivory/80 hover:text-white rounded-sm hover:bg-chocolate-900 focus:outline-hidden focus:ring-1 focus:ring-gold transition-colors"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <div>
            <span className="font-serif font-bold text-sm tracking-wide text-ivory block leading-tight">
              {currentPage.title}
            </span>
            <span className="text-[10px] text-gold-light uppercase tracking-wider block font-sans">
              Tailoring Home & Fabric Home [Demo]
            </span>
          </div>
        </div>

        {/* Mobile Profile Trigger Pill */}
        <button
          type="button"
          onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
          aria-label="Toggle profile details"
          className="flex items-center gap-1.5 p-1 rounded-sm bg-maroon-900 border border-gold/30 text-gold"
        >
          <div className="h-7 w-7 rounded-full bg-maroon-800 text-gold flex items-center justify-center font-serif font-bold text-xs">
            MC
          </div>
        </button>
      </div>

      {/* ====================================================================== */}
      {/* 2. MOBILE BACKDROP OVERLAY                                             */}
      {/* ====================================================================== */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-chocolate-950/80 backdrop-blur-xs md:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ====================================================================== */}
      {/* 3. SIDEBAR NAVIGATION (DESKTOP & MOBILE COLLAPSIBLE DRAWER)            */}
      {/* ====================================================================== */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-chocolate-950 text-ivory border-r border-gold/20 flex flex-col justify-between transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:w-64 lg:w-72 md:min-h-screen shrink-0 ${
          sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div className="p-5 flex-1 overflow-y-auto">
          {/* Admin Header / Logo */}
          <div className="pb-5 border-b border-chocolate-800/80">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-sm bg-maroon-800 text-gold border border-gold/30 shadow-xs">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-serif font-bold text-base text-ivory tracking-wide leading-tight">
                    Admin Console
                  </h2>
                  <p className="text-[11px] text-cream/70 font-sans">
                    Tailoring & Fabric Home
                  </p>
                </div>
              </div>

              {/* Close Button on Mobile Drawer */}
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="md:hidden text-cream/60 hover:text-ivory p-1.5 rounded-sm hover:bg-chocolate-900"
                aria-label="Close sidebar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Architecture Partition Badge */}
            <div className="mt-4 bg-chocolate-900/90 p-2.5 rounded-sm border border-gold/20 text-xs font-sans">
              <div className="flex items-center justify-between text-[11px] text-ivory/80 mb-1">
                <span className="flex items-center gap-1.5 font-medium">
                  <Database className="h-3 w-3 text-gold" /> System State
                </span>
                <span className="uppercase font-semibold text-gold px-1.5 py-0.5 rounded bg-chocolate-950 text-[10px] border border-gold/30">
                  {env.mode} [Demo]
                </span>
              </div>
              <div className="text-[10px] text-cream/60 flex items-center gap-1 font-mono">
                <HardDrive className="h-2.5 w-2.5" />
                Prefix: {env.firestorePrefix} (Isolated)
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 space-y-1">
            <div className="px-2 mb-2 text-[10px] uppercase font-semibold tracking-wider text-gold-light/70 font-sans">
              Core Modules
            </div>

            {adminNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === ROUTES.ADMIN.DASHBOARD}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2.5 text-xs font-medium rounded-sm transition-all duration-200 ${
                      isActive
                        ? 'bg-maroon-800 text-gold-light font-bold border-l-4 border-gold shadow-xs'
                        : 'text-ivory/80 hover:bg-chocolate-900 hover:text-ivory border-l-4 border-transparent'
                    }`
                  }
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4 shrink-0 text-gold/80" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-chocolate-900/90 text-gold-light border border-gold/20 font-sans">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}

            {/* Secondary Tools Header */}
            <div className="pt-5 px-2 mb-2 text-[10px] uppercase font-semibold tracking-wider text-gold-light/70 font-sans">
              System Utilities
            </div>

            {secondaryNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2 text-xs font-medium rounded-sm transition-all duration-200 ${
                      isActive
                        ? 'bg-maroon-800 text-gold-light font-bold border-l-4 border-gold'
                        : 'text-ivory/70 hover:bg-chocolate-900 hover:text-ivory border-l-4 border-transparent'
                    }`
                  }
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4 shrink-0 text-gold/80" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-maroon-900 text-maroon-200 border border-maroon-700">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer & Public Website Link */}
        <div className="p-4 border-t border-chocolate-800/80 bg-chocolate-950/90 space-y-3">
          <div className="flex items-center justify-between px-2 text-[11px] text-cream/70 font-sans">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Admin UI Live</span>
            </span>
            <span className="text-gold-light font-mono text-[10px]">Day 9 Layout</span>
          </div>

          <Link
            to={ROUTES.HOME}
            className="flex items-center justify-between px-3 py-2.5 text-xs font-semibold text-gold hover:text-gold-light hover:bg-chocolate-900 rounded-sm border border-gold/30 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              <span>View Public Website</span>
            </span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </aside>

      {/* ====================================================================== */}
      {/* 4. MAIN ADMIN WORKSPACE AREA                                           */}
      {/* ====================================================================== */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Desktop Admin Header */}
        <header className="bg-white border-b border-cream-border px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-lg text-chocolate-900 leading-tight">
                  {currentPage.title}
                </span>
                <span className="hidden sm:inline-block text-[10px] font-sans font-medium px-2 py-0.5 rounded bg-cream text-chocolate-700 border border-cream-border">
                  {currentPage.badge}
                </span>
              </div>
              <p className="text-xs text-chocolate-500 font-sans hidden sm:block">
                {currentPage.subtitle}
              </p>
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3 relative">
            {/* Demo Status Badge */}
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[11px] font-medium bg-amber-50 text-gold-dark border border-gold/40">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              <span>Demo Mode UI</span>
            </span>

            {/* Quick Public Website Link */}
            <Link
              to={ROUTES.HOME}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-semibold text-chocolate-700 hover:text-maroon-800 bg-cream/70 hover:bg-cream border border-cream-border transition-colors"
            >
              <span>Public Store</span>
              <ExternalLink className="h-3 w-3" />
            </Link>

            {/* Admin Profile Placeholder Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 pl-3 border-l border-cream-border text-left hover:opacity-90 focus:outline-hidden"
                aria-expanded={profileDropdownOpen}
                aria-label="Toggle administrator profile dropdown"
              >
                <div className="h-8 w-8 rounded-full bg-maroon-800 text-gold flex items-center justify-center border border-gold/30 text-xs font-serif font-bold shrink-0 shadow-2xs">
                  MC
                </div>
                <div className="hidden sm:block">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-xs text-chocolate-900 block leading-tight">
                      Master Cutter
                    </span>
                    <ChevronDown className="h-3 w-3 text-chocolate-400" />
                  </div>
                  <span className="text-[10px] text-chocolate-500 block leading-tight">
                    Super Admin [Demo]
                  </span>
                </div>
              </button>

              {/* Profile Dropdown Card */}
              {profileDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setProfileDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-3 w-72 bg-white rounded-sm border border-cream-border shadow-xl p-4 z-40 space-y-3 font-sans">
                    <div className="flex items-center gap-3 pb-3 border-b border-cream-border">
                      <div className="h-10 w-10 rounded-full bg-maroon-800 text-gold flex items-center justify-center font-serif font-bold text-sm border border-gold/30 shrink-0">
                        MC
                      </div>
                      <div>
                        <div className="font-serif font-bold text-sm text-chocolate-900">
                          Master Cutter & Manager
                        </div>
                        <div className="text-[11px] text-chocolate-500 font-mono">
                          admin@tailoringhome.com [Demo]
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs text-chocolate-700">
                      <div className="flex justify-between items-center py-1">
                        <span className="text-chocolate-500">Security Role:</span>
                        <span className="font-semibold text-maroon-800 flex items-center gap-1">
                          <Key className="h-3 w-3" /> Super Admin [Demo]
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-chocolate-500">Environment:</span>
                        <span className="font-mono text-gold-dark font-semibold uppercase">
                          {env.mode}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-chocolate-500">Auth Status:</span>
                        <span className="text-emerald-700 font-medium">Staged UI Mock</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-cream-border space-y-2">
                      <Link
                        to={ROUTES.ADMIN.ADMIN_MANAGEMENT}
                        onClick={() => setProfileDropdownOpen(false)}
                        className="w-full flex items-center justify-between text-xs font-semibold px-2.5 py-1.5 rounded-sm text-chocolate-700 hover:bg-cream transition-colors"
                      >
                        <span className="flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5" />
                          <span>Manage Admin Accounts</span>
                        </span>
                        <ChevronRight className="h-3 w-3" />
                      </Link>

                      <Link
                        to={ROUTES.HOME}
                        onClick={() => setProfileDropdownOpen(false)}
                        className="w-full flex items-center justify-between text-xs font-semibold px-2.5 py-1.5 rounded-sm text-gold-dark hover:bg-amber-50 transition-colors"
                      >
                        <span className="flex items-center gap-1.5">
                          <ExternalLink className="h-3.5 w-3.5" />
                          <span>Exit to Public Store</span>
                        </span>
                        <ChevronRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Content View Container */}
        <main className="flex-1 p-5 sm:p-7 lg:p-9 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
