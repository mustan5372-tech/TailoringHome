import React from 'react';

/**
 * Reusable Design System Section Heading
 *
 * Provides consistent typography, golden accent divider lines,
 * eyebrow badges, and scroll-offset positioning.
 */
export const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  align = 'center', // 'center' | 'left' | 'right'
  className = '',
  id,
  variant = 'default', // 'default' (on light backgrounds) | 'dark' (on dark chocolate/maroon)
  size = 'default', // 'default' | 'large' | 'compact'
}) => {
  const isCenter = align === 'center';
  const isRight = align === 'right';
  const isDark = variant === 'dark';

  const titleSizes = {
    compact: 'text-2xl sm:text-3xl',
    default: 'text-3xl sm:text-4xl',
    large: 'text-4xl sm:text-5xl lg:text-6xl',
  }[size] || 'text-3xl sm:text-4xl';

  return (
    <div
      id={id}
      className={`mb-10 ${id ? 'scroll-mt-24 md:scroll-mt-28' : ''} ${
        isCenter
          ? 'text-center mx-auto max-w-2xl'
          : isRight
          ? 'text-right ml-auto max-w-2xl'
          : 'text-left max-w-2xl'
      } ${className}`}
    >
      {/* Eyebrow Label with Dual Gold Flourish Rules */}
      {eyebrow && (
        <div
          className={`flex items-center gap-2 mb-3 ${
            isCenter
              ? 'justify-center'
              : isRight
              ? 'justify-end'
              : 'justify-start'
          }`}
        >
          <span className="h-px w-6 bg-gold/80 shrink-0"></span>
          <span
            className={`text-xs font-semibold tracking-widest uppercase font-sans ${
              isDark ? 'text-gold-light' : 'text-maroon-700'
            }`}
          >
            {eyebrow}
          </span>
          <span className="h-px w-6 bg-gold/80 shrink-0"></span>
        </div>
      )}

      {/* Main Serif Title */}
      <h2
        className={`font-serif font-bold tracking-tight leading-tight ${titleSizes} ${
          isDark ? 'text-ivory' : 'text-chocolate-900'
        }`}
      >
        {title}
      </h2>

      {/* Descriptive Subtitle */}
      {subtitle && (
        <p
          className={`mt-3.5 text-sm sm:text-base leading-relaxed font-sans ${
            isDark ? 'text-ivory/80' : 'text-chocolate-600/90'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
