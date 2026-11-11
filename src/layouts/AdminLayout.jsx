import React, { useState } from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
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
  Menu,
  X,
  Database,
  HardDrive,
} from 'lucide-react';
import { ROUTES } from '../constants/navigation';
import { env } from '../config/env.config';

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sidebar navigation items matching user requirements:
  // Dashboard, Tailoring Home, Fabric Home, Gallery, Image Studio, Admin Management and Settings
  const adminNavItems = [
    {
      label: 'Dashboard',
      path: ROUTES.ADMIN.DASHBOARD,
      icon: LayoutDashboard,
      badge: null,
    },
    {
      label: 'Tailoring Home',
      path: ROUTES.ADMIN.TAILORING,
      icon: Scissors,
      badge: '10 Offerings',
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
      badge: 'Media Tool',
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
      badge: null,
    },
  ];

  // Secondary tools
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
      {/* MOBILE TOP NAVIGATION BAR                                              */}
      {/* ====================================================================== */}
      <div className="md:hidden bg-chocolate-950 text-ivory p-4 flex items-center justify-between border-b border-gold/30 sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-sm bg-maroon-800 text-gold border border-gold/40">
            <Shield className="h-4 w-4" />
          </div>
          <div>
            <span className="font-serif font-bold text-sm tracking-wide text-ivory block">
              Tailoring Home & Fabric Home
            </span>
            <span className="text-[10px] text-gold-light uppercase tracking-wider block">
              Admin Console [Demo UI]
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          className="p-2 text-ivory/80 hover:text-white rounded-sm hover:bg-chocolate-900 transition-colors"
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* ====================================================================== */}
      {/* MOBILE BACKDROP OVERLAY                                                */}
      {/* ====================================================================== */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-chocolate-950/80 backdrop-blur-xs md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ====================================================================== */}
      {/* SIDEBAR NAVIGATION (DESKTOP & MOBILE DRAWER)                           */}
      {/* ====================================================================== */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-chocolate-950 text-ivory border-r border-gold/20 flex flex-col justify-between transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:w-64 lg:w-72 md:min-h-screen shrink-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
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
                  <h1 className="font-serif font-bold text-base text-ivory tracking-wide">
                    Admin Console
                  </h1>
                  <p className="text-[11px] text-cream/70 font-sans">
                    Catalogue & Atelier Management
                  </p>
                </div>
              </div>

              {/* Close Button on Mobile Drawer */}
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="md:hidden text-cream/60 hover:text-ivory"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Environment Badge */}
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

          {/* Main Navigation Items */}
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
                        ? 'bg-maroon-800 text-gold-light font-semibold border-l-4 border-gold shadow-xs'
                        : 'text-ivory/80 hover:bg-chocolate-900 hover:text-ivory'
                    }`
                  }
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4 shrink-0" />
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
              Maintenance Tools
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
                        ? 'bg-maroon-800 text-gold-light font-semibold border-l-4 border-gold'
                        : 'text-ivory/70 hover:bg-chocolate-900 hover:text-ivory'
                    }`
                  }
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4 shrink-0" />
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

        {/* Sidebar Footer & Public Site Navigation */}
        <div className="p-4 border-t border-chocolate-800/80 bg-chocolate-950/90 space-y-3">
          <div className="flex items-center justify-between px-2 text-[11px] text-cream/70 font-sans">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Admin UI Active</span>
            </span>
            <span className="text-gold-light font-mono text-[10px]">v0.8.0</span>
          </div>

          <Link
            to={ROUTES.HOME}
            className="flex items-center justify-between px-3 py-2.5 text-xs font-medium text-gold hover:text-gold-light hover:bg-chocolate-900 rounded-sm border border-gold/30 transition-colors"
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
      {/* MAIN ADMIN WORKSPACE AREA                                              */}
      {/* ====================================================================== */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Desktop Admin Header */}
        <header className="bg-white border-b border-cream-border px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-3">
            <span className="font-serif font-bold text-sm text-chocolate-900 hidden sm:inline">
              Tailoring Home & Fabric Home
            </span>
            <span className="text-stone-300 hidden sm:inline">|</span>
            <span className="text-xs text-chocolate-600 font-sans">
              Administration & Operations Console
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Demo Status Badge */}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[11px] font-medium bg-amber-50 text-gold-dark border border-gold/40">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              <span>Demo Mode UI</span>
            </span>

            {/* Admin Avatar Pill */}
            <div className="flex items-center gap-2 pl-3 border-l border-cream-border">
              <div className="h-8 w-8 rounded-full bg-maroon-800 text-gold flex items-center justify-center border border-gold/30 text-xs font-serif font-bold">
                MC
              </div>
              <div className="hidden lg:block text-left text-xs">
                <span className="font-semibold text-chocolate-900 block leading-tight">
                  Master Cutter
                </span>
                <span className="text-[10px] text-chocolate-500 block leading-tight">
                  admin@tailoringhome.com [Demo]
                </span>
              </div>
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
