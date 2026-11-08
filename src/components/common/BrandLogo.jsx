import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors } from 'lucide-react';

export const BrandLogo = ({
  className = '',
  size = 'md',
  variant = 'default', // 'default' (on light backgrounds) | 'inverse' (on dark backgrounds)
  onClick,
}) => {
  const isLarge = size === 'lg';
  const isInverse = variant === 'inverse' || variant === 'light';

  return (
    <Link
      to="/"
      onClick={onClick}
      className={`group inline-flex items-center gap-3 transition-opacity hover:opacity-90 ${className}`}
    >
      {/* Emblem Icon */}
      <div
        className={`flex items-center justify-center rounded-sm transition-transform duration-300 group-hover:scale-105 ${
          isInverse
            ? 'bg-gradient-to-br from-chocolate-800 via-chocolate-700 to-maroon-900 text-gold-light shadow-sm border border-gold/45'
            : 'bg-gradient-to-br from-chocolate-800 to-maroon-900 text-gold shadow-xs border border-gold/30'
        } ${isLarge ? 'h-12 w-12 border-2' : 'h-10 w-10 border'}`}
      >
        <Scissors className={isLarge ? 'h-6 w-6' : 'h-5 w-5'} />
      </div>

      {/* Brand Typographic Lockup */}
      <div className="flex flex-col">
        <div
          className={`flex items-center gap-1.5 font-serif font-bold tracking-wider ${
            isInverse ? 'text-ivory' : 'text-chocolate-900'
          }`}
        >
          <span className={isInverse ? 'text-maroon-200' : 'text-maroon-800'}>
            TAILORING
          </span>
          <span
            className={`font-sans text-xs font-semibold ${
              isInverse ? 'text-gold-light' : 'text-gold-dark'
            }`}
          >
            &
          </span>
          <span className={isInverse ? 'text-ivory' : 'text-chocolate-800'}>
            FABRIC
          </span>
          <span
            className={`text-xs uppercase tracking-widest font-sans font-medium ${
              isInverse ? 'text-gold-light/90' : 'text-chocolate-500'
            }`}
          >
            HOME
          </span>
        </div>
        <span
          className={`font-sans text-[10px] tracking-widest uppercase ${
            isInverse ? 'text-ivory/70' : 'text-chocolate-400'
          }`}
        >
          Bespoke Atelier & Fine Textiles
        </span>
      </div>
    </Link>
  );
};

export default BrandLogo;
