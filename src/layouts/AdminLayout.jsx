import React, { useState } from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import {
  Shield,
  LayoutDashboard,
  Scissors,
  Layers,
  Image as ImageIcon,
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

  const adminNavItems = [
    { label: 'Overview', path: ROUTES.ADMIN.DASHBOARD, icon: LayoutDashboard },
    { label: 'Tailoring Services', path: ROUTES.ADMIN.TAILORING, icon: Scissors },
    { label: 'Fabric Catalogue', path: ROUTES.ADMIN.FABRIC, icon: Layers },
    { label: 'Gallery Showcase', path: ROUTES.ADMIN.GALLERY, icon: ImageIcon },
    {
      label: 'Test Image Cleanup',
      path: ROUTES.ADMIN.CLEANUP,
      icon: Trash2,
      badge: 'Firebase Utility',
    },
  ];

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col md:flex-row text-chocolate-900">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-chocolate-900 text-ivory p-4 flex items-center justify-between border-b border-chocolate-800">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-gold" />
          <span className="font-serif font-bold text-sm">Boutique Admin</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-ivory/80 hover:text-white"
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'block' : 'hidden'
        } md:block md:w-64 bg-chocolate-900 text-ivory shrink-0 border-r border-chocolate-800 min-h-screen p-5 flex flex-col justify-between`}
      >
        <div>
          {/* Admin Header */}
          <div className="pb-6 border-b border-chocolate-800">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded bg-maroon-800 text-gold border border-gold/30">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h1 className="font-serif font-bold text-base text-ivory">Admin Console</h1>
                <p className="text-[11px] text-ivory/60">Boutique Catalogue Management</p>
              </div>
            </div>

            {/* Environment Badge */}
            <div className="mt-3 bg-chocolate-800/80 p-2.5 rounded border border-chocolate-700 text-xs">
              <div className="flex items-center justify-between text-[11px] text-ivory/70 mb-1">
                <span className="flex items-center gap-1">
                  <Database className="h-3 w-3 text-gold" /> Environment
                </span>
                <span className="uppercase font-semibold text-gold px-1.5 py-0.5 rounded bg-chocolate-900 text-[10px]">
                  {env.mode}
                </span>
              </div>
              <div className="text-[10px] text-ivory/50 flex items-center gap-1 font-mono">
                <HardDrive className="h-2.5 w-2.5" />
                Prefix: {env.firestorePrefix}
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="mt-6 space-y-1.5">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === ROUTES.ADMIN.DASHBOARD}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2.5 text-xs font-medium rounded transition-colors ${
                      isActive
                        ? 'bg-maroon-800 text-gold-light font-semibold border-l-2 border-gold'
                        : 'text-ivory/75 hover:bg-chocolate-800 hover:text-ivory'
                    }`
                  }
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-maroon-900 text-maroon-200 border border-maroon-700">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Back to Public Catalogue */}
        <div className="pt-6 border-t border-chocolate-800">
          <Link
            to={ROUTES.HOME}
            className="flex items-center justify-between px-3 py-2 text-xs font-medium text-gold hover:text-gold-light hover:bg-chocolate-800 rounded transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              <span>View Public Website</span>
            </span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </aside>

      {/* Main Admin Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between">
          <div className="text-xs text-stone-500 font-sans">
            Tailoring Home & Fabric Home &bull; Phase 1 Architecture
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200">
              Future Development Area
            </span>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
