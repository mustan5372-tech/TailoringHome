import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Scissors,
  Layers,
  Phone,
  Clock,
  MapPin,
  ArrowUpRight,
  Heart,
  ExternalLink,
  X,
} from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { ROUTES, BRAND_INFO } from '../../constants/navigation';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer = () => {
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  // Close on Escape key and lock body scroll while modal is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isPhotoModalOpen) {
        setIsPhotoModalOpen(false);
      }
    };

    if (isPhotoModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPhotoModalOpen]);
  return (
    <footer className="bg-chocolate-900 text-ivory/80 pt-16 pb-10 border-t-2 border-gold/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-chocolate-800">
          {/* Col 1: Brand Info */}
          <div className="space-y-4 lg:col-span-1">
            <div className="bg-chocolate-950/60 p-3.5 rounded-sm inline-block border border-gold/30 shadow-xs">
              <BrandLogo variant="inverse" />
            </div>
            <p className="text-sm text-ivory/70 leading-relaxed font-sans">
              A bespoke boutique destination harmonizing artisanal custom tailoring with the finest handpicked textile collections.
            </p>
            <div className="pt-2 text-xs text-gold-light flex items-center gap-2">
              <Clock className="h-3.5 w-3.5" />
              <span>{BRAND_INFO.workingHours}</span>
            </div>
          </div>

          {/* Col 2: Tailoring Home Showcase */}
          <div className="space-y-3 bg-chocolate-800/40 p-5 rounded-sm border border-maroon-800/40">
            <div className="flex items-center gap-2 text-maroon-300 font-serif font-bold text-lg">
              <Scissors className="h-5 w-5 text-gold" />
              <h3>Tailoring Home</h3>
            </div>
            <p className="text-xs text-ivory/70 leading-relaxed">
              Precision master cutting, bespoke wedding ensembles, formal corporate suiting, and custom fit alterations.
            </p>
            <div className="pt-2 text-xs space-y-1.5 text-ivory/80">
              <p className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-gold" />
                <span>{BRAND_INFO.tailoringShop.phone}</span>
              </p>
              <p className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-gold" />
                <span>{BRAND_INFO.tailoringShop.location}</span>
              </p>
            </div>
            <Link
              to={ROUTES.TAILORING}
              className="inline-flex items-center gap-1 text-xs font-semibold text-gold hover:text-gold-light transition-colors pt-1"
            >
              <span>Explore Tailoring Services</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Col 3: Fabric Home Showcase */}
          <div className="space-y-3 bg-chocolate-800/40 p-5 rounded-sm border border-chocolate-700/60">
            <div className="flex items-center gap-2 text-gold-light font-serif font-bold text-lg">
              <Layers className="h-5 w-5 text-gold" />
              <h3>Fabric Home</h3>
            </div>
            <p className="text-xs text-ivory/70 leading-relaxed">
              Curated luxury fabrics including pure Banarasi silks, breathable European linens, Egyptian cottons & festive brocades.
            </p>
            <div className="pt-2 text-xs space-y-1.5 text-ivory/80">
              <p className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-gold" />
                <span>{BRAND_INFO.fabricShop.phone}</span>
              </p>
              <p className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-gold" />
                <span>{BRAND_INFO.fabricShop.location}</span>
              </p>
            </div>
            <Link
              to={ROUTES.FABRIC}
              className="inline-flex items-center gap-1 text-xs font-semibold text-gold hover:text-gold-light transition-colors pt-1"
            >
              <span>View Fabric Varieties</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Col 4: Quick Links & Contact */}
          <div className="space-y-4">
            <h4 className="font-serif font-semibold text-base text-ivory tracking-wide uppercase text-xs">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-sm text-ivory/70">
              <li>
                <Link to={ROUTES.HOME} className="hover:text-gold transition-colors">
                  Home Catalogue
                </Link>
              </li>
              <li>
                <Link to={ROUTES.GALLERY} className="hover:text-gold transition-colors">
                  Creation Gallery
                </Link>
              </li>
              <li>
                <Link to={ROUTES.ABOUT} className="hover:text-gold transition-colors">
                  About Our Heritage
                </Link>
              </li>
              <li>
                <Link to={ROUTES.CONTACT} className="hover:text-gold transition-colors">
                  Contact & Visiting Hours
                </Link>
              </li>
              <li>
                <Link to={ROUTES.ADMIN.DASHBOARD} className="text-chocolate-400 hover:text-chocolate-200 text-xs">
                  Administrative Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-ivory/50 gap-4">
          <p>
            © {CURRENT_YEAR} Tailoring Home & Fabric Home. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="h-3 w-3 text-maroon-400 fill-maroon-400" />
            <span>for bespoke craftsmanship</span>
          </p>
        </div>

        {/* About the Developer Section */}
        <div className="mt-8 pt-6 border-t border-chocolate-800/80">
          <div className="bg-chocolate-950/60 rounded-sm border border-gold/25 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-3.5 text-center sm:text-left">
              {/* Developer Photograph Trigger (Clickable) */}
              <button
                type="button"
                onClick={() => setIsPhotoModalOpen(true)}
                aria-label="View enlarged photograph of Mustansir Sanawadwala"
                title="Click to enlarge photograph"
                className="relative shrink-0 group cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-gold rounded-full"
              >
                <img
                  src="/images/developer/mustansir.jpg"
                  alt="Mustansir Sanawadwala"
                  className="h-12 w-12 sm:h-14 sm:w-14 rounded-full object-cover border-2 border-gold/40 group-hover:border-gold group-hover:scale-105 transition-all duration-300 ease-out shadow-xs"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/20261031_102346(1).jpg';
                  }}
                  loading="lazy"
                />
                <span className="sr-only">Click to enlarge photograph</span>
              </button>

              {/* Developer Details */}
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-semibold tracking-wider text-gold-light/80 block">
                  About the Developer
                </span>
                <h4 className="font-serif font-bold text-sm sm:text-base text-ivory">
                  Mustansir Sanawadwala
                </h4>
                <p className="text-xs text-ivory/70 font-sans">
                  Designed and developed by Mustansir Sanawadwala.
                </p>
              </div>
            </div>

            {/* Portfolio Link */}
            <div className="shrink-0">
              <a
                href="https://mustansir.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-sm text-xs font-semibold text-gold bg-chocolate-900/90 hover:bg-maroon-900/80 hover:text-gold-light border border-gold/30 hover:border-gold/60 transition-all duration-200 shadow-xs"
              >
                <span>Visit Portfolio</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox / Modal for Enlarged Photograph */}
      {isPhotoModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mustansir Sanawadwala enlarged photograph"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-chocolate-950/85 backdrop-blur-xs transition-opacity duration-300 ease-out"
          onClick={() => setIsPhotoModalOpen(false)}
        >
          {/* Modal Container */}
          <div
            className="relative max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[92vh] w-auto bg-chocolate-950 border border-gold/40 rounded-sm shadow-2xl p-2 sm:p-3 overflow-hidden flex flex-col transition-all duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Icon Button */}
            <button
              type="button"
              onClick={() => setIsPhotoModalOpen(false)}
              aria-label="Close enlarged photograph"
              className="absolute top-3 right-3 z-20 p-2 rounded-full bg-chocolate-900/90 text-gold-light hover:text-white hover:bg-maroon-800 border border-gold/40 transition-colors shadow-lg cursor-pointer focus:outline-hidden focus:ring-1 focus:ring-gold"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            {/* Enlarged Image displaying original aspect ratio */}
            <div className="overflow-hidden rounded-xs bg-stone-900/60 flex items-center justify-center max-h-[75vh]">
              <img
                src="/images/developer/mustansir.jpg"
                alt="Mustansir Sanawadwala"
                className="w-auto h-auto max-w-full max-h-[75vh] object-contain rounded-xs shadow-inner"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/20261031_102346(1).jpg';
                }}
              />
            </div>

            {/* Modal Caption & Details */}
            <div className="pt-3 px-2 flex items-center justify-between gap-3 text-xs border-t border-chocolate-800/80 mt-2">
              <div>
                <h5 className="font-serif font-bold text-sm sm:text-base text-ivory leading-tight">
                  Mustansir Sanawadwala
                </h5>
                <p className="text-[11px] text-cream/70 font-sans">
                  Designed and developed by Mustansir Sanawadwala.
                </p>
              </div>

              <a
                href="https://mustansir.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-semibold text-gold bg-chocolate-900 hover:bg-maroon-900 hover:text-gold-light border border-gold/30 transition-colors shrink-0"
              >
                <span>Portfolio</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
