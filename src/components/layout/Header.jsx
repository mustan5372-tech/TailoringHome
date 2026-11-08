import React from 'react';
import { Phone, Clock, Sparkles } from 'lucide-react';
import { BRAND_INFO } from '../../constants/navigation';

export const Header = () => {
  return (
    <div className="bg-chocolate-900 text-ivory/80 text-xs py-2 px-4 border-b border-chocolate-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Boutique Tagline / Announcement */}
        <div className="flex items-center gap-2 text-center md:text-left">
          <Sparkles className="h-3.5 w-3.5 text-gold shrink-0 hidden sm:inline-block" />
          <span className="font-serif italic text-gold-light">
            Two Boutiques Under One Roof:
          </span>
          <span className="hidden sm:inline text-ivory/70">
            Bespoke Tailoring & Handpicked Luxury Textiles
          </span>
        </div>

        {/* Quick Contact & Hours */}
        <div className="flex items-center gap-4 text-[11px] text-ivory/70">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3 w-3 text-gold/80" />
            <span className="hidden lg:inline">{BRAND_INFO.workingHours}</span>
            <span className="lg:hidden">10 AM – 8:30 PM</span>
          </div>
          <span className="text-chocolate-600">|</span>
          <a
            href={`tel:${BRAND_INFO.tailoringShop.phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-1.5 hover:text-gold transition-colors"
          >
            <Phone className="h-3 w-3 text-gold/80" />
            <span>{BRAND_INFO.tailoringShop.phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
