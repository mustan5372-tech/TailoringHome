import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors } from 'lucide-react';

export const BrandLogo = ({ className = '', size = 'md' }) => {
  const isLarge = size === 'lg';

  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-3 transition-opacity hover:opacity-90 ${className}`}
    >
      {/* Emblem Icon */}
      <div
        className={`flex items-center justify-center rounded-sm bg-gradient-to-br from-chocolate-800 to-maroon-900 text-gold shadow-xs transition-transform duration-300 group-hover:scale-105 ${
          isLarge ? 'h-12 w-12 border-2 border-gold/40' : 'h-10 w-10 border border-gold/30'
        }`}
      >
        <Scissors className={isLarge ? 'h-6 w-6' : 'h-5 w-5'} />
      </div>

      {/* Brand Typographic Lockup */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 font-serif font-bold tracking-wider text-chocolate-900">
          <span className="text-maroon-800">TAILORING</span>
          <span className="text-gold-dark font-sans text-xs font-semibold">&</span>
          <span className="text-chocolate-800">FABRIC</span>
          <span className="text-xs uppercase tracking-widest text-chocolate-500 font-sans font-medium">HOME</span>
        </div>
        <span className="font-sans text-[10px] tracking-widest text-chocolate-400 uppercase">
          Bespoke Atelier & Fine Textiles
        </span>
      </div>
    </Link>
  );
};

export default BrandLogo;
