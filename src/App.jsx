import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import ScrollToTop from './components/common/ScrollToTop';
import AnalyticsTracker from './components/common/AnalyticsTracker';
import CookieConsentBanner from './components/common/CookieConsentBanner';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <AnalyticsTracker />
        <AppRoutes />
        <CookieConsentBanner />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
