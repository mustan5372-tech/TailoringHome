import React from 'react';

export const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  align = 'center', // 'center' | 'left'
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`mb-10 ${isCenter ? 'text-center mx-auto max-w-2xl' : 'text-left'} ${className}`}>
      {eyebrow && (
        <div className={`flex items-center gap-2 mb-2.5 ${isCenter ? 'justify-center' : 'justify-start'}`}>
          <span className="h-px w-6 bg-gold"></span>
          <span className="text-xs font-semibold tracking-widest text-maroon-700 uppercase">
            {eyebrow}
          </span>
          <span className="h-px w-6 bg-gold"></span>
        </div>
      )}

      <h2 className="text-3xl md:text-4xl font-serif font-bold text-chocolate-900 tracking-tight leading-tight">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-3 text-sm md:text-base text-chocolate-600/90 leading-relaxed font-sans">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;

