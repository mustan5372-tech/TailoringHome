import React from 'react';
import {
  Scissors,
  Layers,
  Sparkles,
  ArrowRight,
  Clock,
  Phone,
  MapPin,
  ShieldCheck,
  ImageIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge, ScrollReveal } from '../../components/common';
import { ROUTES, BRAND_INFO } from '../../constants/navigation';

export const ContactPage = () => {
  return (
    <div className="space-y-16 pb-20 font-sans">
      {/* Hero Banner */}
      <section
        id="contact-hero"
        className="bg-gradient-to-b from-chocolate-950 via-chocolate-900 to-maroon-950 text-ivory py-16 sm:py-24 border-b border-gold/30 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(var(--color-gold)_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Badge variant="gold" size="sm" icon={Sparkles} className="mb-2 animate-hero-badge">
            Boutique Inquiries
          </Badge>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-ivory tracking-tight leading-tight animate-hero-headline">
            Contact & Visiting Details
          </h1>

          <p className="text-sm sm:text-base text-cream/80 max-w-2xl mx-auto leading-relaxed animate-hero-subtitle">
            Tailoring Home & Fabric Home • Connect with our tailoring atelier and textile showroom.
          </p>
        </div>
      </section>

      {/* Main Status & Postponed Notice Container */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="bg-white rounded-sm border-2 border-gold/40 p-6 sm:p-10 shadow-xs hover:shadow-boutique-md transition-shadow duration-300 space-y-6 text-center">
            <div className="h-14 w-14 rounded-full bg-cream text-maroon-800 border border-gold/40 flex items-center justify-center mx-auto shadow-xs">
              <Clock className="h-7 w-7 text-maroon-800" />
            </div>

            <div className="space-y-2 max-w-2xl mx-auto">
              <span className="text-xs uppercase font-semibold tracking-wider text-gold-dark font-sans block">
                Section Status Notice
              </span>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-chocolate-900">
                Official Contact Channels Under Preparation
              </h2>
              <p className="text-xs sm:text-sm text-chocolate-600 leading-relaxed font-sans pt-2">
                To prevent miscommunication, fake phone numbers, placeholder street addresses, or simulated appointment forms have been removed. Official telephone lines, dedicated WhatsApp support channels, and verified showroom locations will be published here once finalized.
              </p>
            </div>

            {/* Dual Shop Current Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-left">
              {/* Tailoring Home Card */}
              <div className="p-5 rounded-sm border border-maroon-200 bg-stone-50 hover:shadow-boutique-sm transition-shadow duration-300 space-y-3">
                <div className="flex items-center gap-2.5 text-maroon-800 font-serif font-bold text-base">
                  <Scissors className="h-5 w-5 text-gold-dark" />
                  <span>Tailoring Home</span>
                </div>
                <p className="text-xs text-chocolate-600">
                  Bespoke stitching, Dawoodi Bohra attire, school uniforms & alterations.
                </p>
                <div className="space-y-2 pt-2 border-t border-cream-border text-xs text-chocolate-700">
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-maroon-800 shrink-0" />
                    <span>Phone / WhatsApp: {BRAND_INFO.tailoringShop.phoneDisplay}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-maroon-800 shrink-0" />
                    <span>Atelier Location: {BRAND_INFO.tailoringShop.location}</span>
                  </div>
                </div>
              </div>

              {/* Fabric Home Card */}
              <div className="p-5 rounded-sm border border-chocolate-200 bg-stone-50 hover:shadow-boutique-sm transition-shadow duration-300 space-y-3">
                <div className="flex items-center gap-2.5 text-chocolate-800 font-serif font-bold text-base">
                  <Layers className="h-5 w-5 text-gold-dark" />
                  <span>Fabric Home</span>
                </div>
                <p className="text-xs text-chocolate-600">
                  Curated natural silks, linens, cottons, Rida prints & uniform fabrics.
                </p>
                <div className="space-y-2 pt-2 border-t border-cream-border text-xs text-chocolate-700">
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-chocolate-800 shrink-0" />
                    <span>Phone / WhatsApp: {BRAND_INFO.fabricShop.phoneDisplay}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-chocolate-800 shrink-0" />
                    <span>Showroom Location: {BRAND_INFO.fabricShop.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-cream/50 rounded-sm border border-cream-border text-xs text-chocolate-700 max-w-xl mx-auto text-left flex items-start gap-3 mt-4">
              <ShieldCheck className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5" />
              <p>
                <strong>Catalogue Browsing Open:</strong> While contact channels are being established, you can browse all tailoring service specifications and curated fabric varieties directly on this website.
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
                  className="p-4 rounded-sm border border-cream-border bg-stone-50 hover:bg-cream hover:border-maroon-700 hover:shadow-boutique-sm transition-all group"
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
                  className="p-4 rounded-sm border border-cream-border bg-stone-50 hover:bg-cream hover:border-chocolate-700 hover:shadow-boutique-sm transition-all group"
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
                  className="p-4 rounded-sm border border-cream-border bg-stone-50 hover:bg-cream hover:border-gold hover:shadow-boutique-sm transition-all group"
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
        </ScrollReveal>
      </section>
    </div>
  );
};

export default ContactPage;
