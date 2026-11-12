import React from 'react';
import {
  Scissors,
  Layers,
  Sparkles,
  ArrowRight,
  Clock,
  ShieldCheck,
  ImageIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '../../components/common/Badge';
import { ROUTES } from '../../constants/navigation';

export const AboutPage = () => {
  return (
    <div className="space-y-16 pb-20 font-sans">
      {/* Hero Banner */}
      <section
        id="about-hero"
        className="bg-gradient-to-b from-chocolate-950 via-chocolate-900 to-maroon-950 text-ivory py-16 sm:py-24 border-b border-gold/30 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(var(--color-gold)_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Badge variant="gold" size="sm" icon={Sparkles} className="mb-2">
            Boutique Heritage & Identity
          </Badge>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-ivory tracking-tight leading-tight">
            About Us
          </h1>

          <p className="text-sm sm:text-base text-cream/80 max-w-2xl mx-auto leading-relaxed">
            Tailoring Home & Fabric Home • Two bespoke craft traditions harmonized under one roof.
          </p>
        </div>
      </section>

      {/* Main Status & Postponed Notice Container */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-sm border-2 border-gold/40 p-6 sm:p-10 shadow-xs space-y-6 text-center">
          <div className="h-14 w-14 rounded-full bg-cream text-maroon-800 border border-gold/40 flex items-center justify-center mx-auto shadow-xs">
            <Clock className="h-7 w-7 text-maroon-800" />
          </div>

          <div className="space-y-2 max-w-2xl mx-auto">
            <span className="text-xs uppercase font-semibold tracking-wider text-gold-dark font-sans block">
              Section Status Notice
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-chocolate-900">
              Genuine Information Being Prepared
            </h2>
            <p className="text-xs sm:text-sm text-chocolate-600 leading-relaxed font-sans pt-2">
              To preserve authentic business representations without inventing unverified claims, founding dates, or artisan biographies, our comprehensive <strong>About Us</strong> heritage section is currently postponed. Verified boutique history, craftsmanship principles, and master tailor profiles will be published here upon official release.
            </p>
          </div>

          <div className="p-4 bg-cream/50 rounded-sm border border-cream-border text-xs text-chocolate-700 max-w-xl mx-auto text-left flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5" />
            <p>
              <strong>Catalogue Access Active:</strong> While background history is being formalized, the full customer-facing catalogue of bespoke tailoring services and handpicked fabrics is active and ready to browse.
            </p>
          </div>

          {/* Quick Catalogue Access Options */}
          <div className="pt-6 border-t border-cream-border">
            <h3 className="font-serif font-bold text-base text-chocolate-900 mb-4">
              Explore Active Boutique Collections
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <Link
                to={ROUTES.TAILORING}
                className="p-4 rounded-sm border border-cream-border bg-stone-50 hover:bg-cream hover:border-maroon-700 transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <Scissors className="h-5 w-5 text-maroon-800" />
                  <ArrowRight className="h-4 w-4 text-chocolate-400 group-hover:text-maroon-800 group-hover:translate-x-0.5 transition-all" />
                </div>
                <h4 className="font-serif font-bold text-sm text-chocolate-900">
                  Tailoring Home
                </h4>
                <p className="text-[11px] text-chocolate-600 mt-1 leading-snug">
                  Kurta-Saya, Ridas, MSB/ABN uniforms & bespoke suiting.
                </p>
              </Link>

              <Link
                to={ROUTES.FABRIC}
                className="p-4 rounded-sm border border-cream-border bg-stone-50 hover:bg-cream hover:border-chocolate-700 transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <Layers className="h-5 w-5 text-chocolate-800" />
                  <ArrowRight className="h-4 w-4 text-chocolate-400 group-hover:text-chocolate-800 group-hover:translate-x-0.5 transition-all" />
                </div>
                <h4 className="font-serif font-bold text-sm text-chocolate-900">
                  Fabric Home
                </h4>
                <p className="text-[11px] text-chocolate-600 mt-1 leading-snug">
                  Swiss lawns, Rida prints, silks, linens & suiting wools.
                </p>
              </Link>

              <Link
                to={ROUTES.GALLERY}
                className="p-4 rounded-sm border border-cream-border bg-stone-50 hover:bg-cream hover:border-gold transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <ImageIcon className="h-5 w-5 text-gold-dark" />
                  <ArrowRight className="h-4 w-4 text-chocolate-400 group-hover:text-gold-dark group-hover:translate-x-0.5 transition-all" />
                </div>
                <h4 className="font-serif font-bold text-sm text-chocolate-900">
                  Creation Gallery
                </h4>
                <p className="text-[11px] text-chocolate-600 mt-1 leading-snug">
                  Showcase imagery & retrospective craftsmanship photos.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
