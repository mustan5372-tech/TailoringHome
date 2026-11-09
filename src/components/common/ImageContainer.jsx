import React, { useState } from 'react';
import { Scissors, Layers, Image as ImageIcon } from 'lucide-react';

/**
 * Reusable Design System Image Container
 *
 * Provides responsive aspect ratios, boutique placeholder graphics,
 * smooth hover zoom transitions, loading fallbacks, and WCAG-compliant overlays.
 *
 * Keeps uploaded binaries out of source code by supplying elegant SVG/CSS
 * placeholder renderings when real image URLs are not yet populated.
 */
export const ImageContainer = ({
  src,
  alt = 'Boutique catalogue preview',
  aspectRatio = 'portrait', // 'square' (1:1) | 'portrait' (3:4) | 'landscape' (4:3) | 'wide' (16:9) | 'banner' (21:9) | 'auto'
  category = 'tailoring', // 'tailoring' | 'fabric' | 'general'
  gradient = 'from-chocolate-900 via-chocolate-800 to-maroon-900',
  title,
  subtitle,
  badge,
  className = '',
  imageClassName = '',
  overlay = false,
  zoomOnHover = true,
  children,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(Boolean(src));

  const aspectStyles = {
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
    wide: 'aspect-video',
    banner: 'aspect-[21/9]',
    auto: 'h-full min-h-[200px]',
  }[aspectRatio] || 'aspect-[3/4]';

  const isTailoring = category === 'tailoring';
  const isFabric = category === 'fabric';

  return (
    <div
      className={`group relative overflow-hidden rounded-sm border border-cream-border bg-stone-100 ${aspectStyles} ${className}`.trim()}
    >
      {/* 1. Real Image Render (when provided and loaded without error) */}
      {src && !hasError ? (
        <>
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setHasError(true);
              setIsLoading(false);
            }}
            className={`h-full w-full object-cover ${
              zoomOnHover ? 'transition-transform duration-500 ease-out group-hover:scale-105' : ''
            } ${isLoading ? 'opacity-0' : 'opacity-100'} ${imageClassName}`}
          />

          {/* Skeleton Pulse during initial loading */}
          {isLoading && (
            <div className="absolute inset-0 bg-stone-200 animate-pulse" />
          )}

          {/* Accessible Gradient Overlay for text contrast */}
          {overlay && (
            <div className="absolute inset-0 bg-gradient-to-t from-chocolate-950/80 via-chocolate-950/20 to-transparent pointer-events-none" />
          )}
        </>
      ) : (
        /* 2. Boutique Placeholder Frame (keeps raw images out of source code) */
        <div
          className={`h-full w-full bg-gradient-to-br ${gradient} p-6 flex flex-col justify-between relative overflow-hidden text-ivory ${
            zoomOnHover ? 'transition-transform duration-500 ease-out group-hover:scale-[1.02]' : ''
          }`}
        >
          {/* Subtle Geometric Weave Overlay */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors pointer-events-none" />

          {/* Top Badge Slot */}
          <div className="relative z-10 flex items-center justify-between">
            {badge && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-ivory/90 text-chocolate-900 text-[10px] font-semibold tracking-wider uppercase shadow-xs">
                {badge}
              </span>
            )}
            <span className="text-[10px] uppercase tracking-widest text-gold-light/80 font-mono ml-auto">
              Atelier Archive
            </span>
          </div>

          {/* Center Emblem Motif */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center py-4">
            <div className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-xs flex items-center justify-center mb-3 border border-gold/30 shadow-xs">
              {isTailoring && <Scissors className="h-6 w-6 text-gold-light" />}
              {isFabric && <Layers className="h-6 w-6 text-gold-light" />}
              {!isTailoring && !isFabric && <ImageIcon className="h-6 w-6 text-gold-light" />}
            </div>

            {title && (
              <h4 className="font-serif font-bold text-lg text-white leading-snug drop-shadow-xs max-w-xs">
                {title}
              </h4>
            )}

            {subtitle && (
              <p className="mt-1 text-xs text-ivory/80 font-sans max-w-xs line-clamp-2">
                {subtitle}
              </p>
            )}
          </div>

          {/* Bottom Slot */}
          {children && (
            <div className="relative z-10 pt-2 border-t border-white/10">
              {children}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageContainer;
