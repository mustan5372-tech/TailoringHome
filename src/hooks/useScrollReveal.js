import { useState, useEffect, useRef } from 'react';

/**
 * Lightweight performance-friendly Scroll Reveal Hook.
 * Uses native IntersectionObserver to trigger animations once upon entering viewport.
 * Respects `prefers-reduced-motion` and avoids repeatedly replaying during scrolling.
 *
 * @param {object} options
 * @param {number} [options.threshold=0.1] - Viewport intersection ratio to trigger
 * @param {string} [options.rootMargin='0px 0px -40px 0px'] - Intersection margin offset
 * @param {boolean} [options.once=true] - Disconnects observer once triggered
 * @returns {{ ref: React.RefObject, isRevealed: boolean }}
 */
export const useScrollReveal = ({
  threshold = 0.1,
  rootMargin = '0px 0px -40px 0px',
  once = true,
} = {}) => {
  const elementRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(() => {
    if (typeof window !== 'undefined') {
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return true;
      }
      if (typeof IntersectionObserver === 'undefined') {
        return true;
      }
    }
    return false;
  });

  useEffect(() => {
    if (isRevealed && once) return;

    const node = elementRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            setIsRevealed(false);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, once, isRevealed]);

  return { ref: elementRef, isRevealed };
};

export default useScrollReveal;
