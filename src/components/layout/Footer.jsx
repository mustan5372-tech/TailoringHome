import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Layers, Phone, Clock, MapPin, ArrowUpRight, Heart } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { ROUTES, BRAND_INFO } from '../../constants/navigation';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer = () => {
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
      </div>
    </footer>
  );
};

export default Footer;
