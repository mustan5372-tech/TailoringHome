import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Scissors, Layers, Shield, PhoneCall } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { NAV_LINKS, ROUTES } from '../../constants/navigation';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ease-out border-b ${
        isScrolled
          ? 'bg-ivory/98 shadow-boutique-md border-cream-border/90'
          : 'bg-ivory/95 border-cream-border'
      } backdrop-blur-md`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="shrink-0">
            <BrandLogo onClick={closeMenu} />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {NAV_LINKS.map((link) => {
              const isTailoring = link.path === ROUTES.TAILORING;
              const isFabric = link.path === ROUTES.FABRIC;

              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === ROUTES.HOME}
                  className={({ isActive }) =>
                    `nav-link-boutique relative px-3.5 py-2 text-sm font-medium transition-all duration-200 tracking-wide rounded-sm flex items-center gap-1.5 ${
                      isActive
                        ? 'text-maroon-800 font-semibold bg-maroon-50/70 is-active'
                        : 'text-chocolate-800 hover:text-maroon-700 hover:bg-cream-soft'
                    }`
                  }
                >
                  {isTailoring && <Scissors className="h-3.5 w-3.5 text-maroon-700" />}
                  {isFabric && <Layers className="h-3.5 w-3.5 text-chocolate-600" />}
                  <span>{link.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Quick Consultation Button */}
            <Link
              to="/contact#enquiry-form"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-ivory bg-maroon-800 hover:bg-maroon-700 rounded-sm shadow-xs transition-colors"
            >
              <PhoneCall className="h-3.5 w-3.5 text-gold-light" />
              <span>Book Consultation</span>
            </Link>

            {/* Admin Portal Link */}
            <Link
              to={ROUTES.ADMIN.DASHBOARD}
              title="Admin Portal (Future Phase)"
              className="p-2 text-chocolate-400 hover:text-chocolate-800 hover:bg-cream-soft rounded-sm transition-colors"
            >
              <Shield className="h-4 w-4" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to={ROUTES.ADMIN.DASHBOARD}
              className="p-2 text-chocolate-500 hover:text-chocolate-800"
              title="Admin Portal"
            >
              <Shield className="h-4 w-4" />
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-sm text-chocolate-800 hover:bg-cream-soft focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation with Safe Height & Scrolling */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-cream-border bg-ivory shadow-xl px-4 pt-3 pb-6 space-y-1.5 max-h-[calc(100vh-5.5rem)] overflow-y-auto animate-drawer-in">
          {/* Quick Dual-Shop Highlight Pills */}
          <div className="grid grid-cols-2 gap-2 pb-3 mb-2 border-b border-cream-border">
            <Link
              to={ROUTES.TAILORING}
              onClick={closeMenu}
              className="flex items-center gap-2 p-2.5 rounded-sm bg-maroon-50 border border-maroon-200/60 text-maroon-800 text-xs font-semibold"
            >
              <Scissors className="h-4 w-4" />
              <span>Tailoring Home</span>
            </Link>
            <Link
              to={ROUTES.FABRIC}
              onClick={closeMenu}
              className="flex items-center gap-2 p-2.5 rounded-sm bg-chocolate-50 border border-chocolate-200/60 text-chocolate-800 text-xs font-semibold"
            >
              <Layers className="h-4 w-4" />
              <span>Fabric Home</span>
            </Link>
          </div>

          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === ROUTES.HOME}
              onClick={closeMenu}
              className={({ isActive }) =>
                `block px-3 py-2.5 text-base font-medium rounded-sm transition-colors ${
                  isActive
                    ? 'bg-maroon-50 text-maroon-800 font-semibold border-l-4 border-maroon-800'
                    : 'text-chocolate-800 hover:bg-cream-soft'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <div className="pt-4 border-t border-cream-border">
            <Link
              to="/contact#enquiry-form"
              onClick={closeMenu}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-ivory bg-maroon-800 hover:bg-maroon-700 rounded-sm shadow-xs uppercase tracking-wider"
            >
              <PhoneCall className="h-4 w-4 text-gold-light" />
              <span>Book a Consultation</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
