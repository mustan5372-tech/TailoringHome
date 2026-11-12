import React from 'react';
import { Link } from 'react-router-dom';

/**
 * BrandLogo
 *
 * Official brand identity component featuring the text-free deep green & gold emblem.
 * - Maintains 1:1 original emblem proportions without distortion.
 * - Responsive sizing for desktop and mobile.
 * - Supports default (light ivory/cream background) and inverse (dark chocolate background) variants.
 * - Navigates to homepage on click.
 */
export const BrandLogo = ({
  className = '',
  size = 'md',
  variant = 'default',
  showText = true,
  onClick,
}) => {
  const isLarge = size === 'lg';
  const isSmall = size === 'sm';
  const isInverse = variant === 'inverse' || variant === 'light';

  // Responsive dimensions for the official emblem
  const emblemSizeClasses = isLarge
    ? 'h-14 w-14 sm:h-16 sm:w-16'
    : isSmall
    ? 'h-9 w-9'
    : 'h-11 w-11 sm:h-12 sm:w-12';

  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="Tailoring Home & Fabric Home - Return to homepage"
      className={`group inline-flex items-center gap-3 transition-opacity hover:opacity-95 ${className}`}
    >
      {/* Official Emblem Badge */}
      <div
        className={`relative shrink-0 rounded-md overflow-hidden transition-transform duration-300 group-hover:scale-105 shadow-xs border ${
          isInverse
            ? 'border-gold/40 shadow-chocolate-950/40 bg-chocolate-900'
            : 'border-gold/50 shadow-gold/10 bg-ivory'
        } ${emblemSizeClasses}`}
      >
        <img
          src="/images/logo/emblem-navbar.png"
          alt="Tailoring Home & Fabric Home Official Emblem"
          className="h-full w-full object-contain select-none"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Brand Typographic Lockup */}
      {showText && (
        <div className="flex flex-col">
          <div
            className={`flex items-center gap-1.5 font-serif font-bold tracking-wider leading-tight ${
              isInverse ? 'text-ivory' : 'text-chocolate-900'
            }`}
          >
            <span
              className={`text-sm sm:text-base tracking-wide ${
                isInverse ? 'text-gold-light' : 'text-maroon-800'
              }`}
            >
              TAILORING
            </span>
            <span
              className={`font-sans text-xs font-semibold ${
                isInverse ? 'text-gold' : 'text-gold-dark'
              }`}
            >
              &
            </span>
            <span
              className={`text-sm sm:text-base tracking-wide ${
                isInverse ? 'text-ivory' : 'text-chocolate-800'
              }`}
            >
              FABRIC
            </span>
            <span
              className={`text-[11px] sm:text-xs uppercase tracking-widest font-sans font-medium ${
                isInverse ? 'text-gold-light/90' : 'text-chocolate-500'
              }`}
            >
              HOME
            </span>
          </div>

          <span
            className={`font-sans text-[9px] sm:text-[10px] tracking-widest uppercase mt-0.5 ${
              isInverse ? 'text-ivory/70' : 'text-chocolate-400'
            }`}
          >
            Bespoke Atelier & Fine Textiles
          </span>
        </div>
      )}
    </Link>
  );
};

export default BrandLogo;
