import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop
 * Manages scroll restoration and anchor offset positioning across page navigation.
 * - If no hash: resets window to top (x: 0, y: 0).
 * - If anchor hash: smoothly scrolls the target element into view respecting scroll-padding.
 */
export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } else {
      // Delay slightly to ensure component has rendered in DOM
      const timer = setTimeout(() => {
        try {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        } catch {
          // Fallback if invalid selector
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
