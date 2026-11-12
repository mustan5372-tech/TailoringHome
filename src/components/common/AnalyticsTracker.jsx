import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../../services/analytics/analytics.service';

/**
 * AnalyticsTracker
 *
 * Central React Router tracking component.
 * - Captures initial page view on first load.
 * - Tracks SPA route transitions (pathname + search).
 * - Deduplicates events (prevents duplicate page views across React 19 StrictMode and anchor navigations).
 * - Ensures complete anonymity without capturing form contents or PII.
 */
export const AnalyticsTracker = () => {
  const location = useLocation();
  const lastTrackedPath = useRef(null);

  useEffect(() => {
    const fullPath = location.pathname + location.search;

    // Deduplication: prevent duplicate pageview for identical consecutive route state
    if (lastTrackedPath.current === fullPath) {
      return;
    }

    lastTrackedPath.current = fullPath;

    // Allow page-specific document.title updates to flush before recording
    const timer = setTimeout(() => {
      trackPageView(fullPath, document.title);
    }, 50);

    return () => clearTimeout(timer);
  }, [location.pathname, location.search]);

  return null;
};

export default AnalyticsTracker;

