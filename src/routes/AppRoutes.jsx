import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import PublicLayout from '../layouts/PublicLayout';
import AdminLayout from '../layouts/AdminLayout';

// Public Pages
import HomePage from '../pages/public/HomePage';
import TailoringHomePage from '../pages/public/TailoringHomePage';
import FabricHomePage from '../pages/public/FabricHomePage';
import GalleryPage from '../pages/public/GalleryPage';
import AboutPage from '../pages/public/AboutPage';
import ContactPage from '../pages/public/ContactPage';
import NotFoundPage from '../pages/public/NotFoundPage';

// Admin Pages
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import AdminCleanupPage from '../pages/admin/AdminCleanupPage';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Boutique Routes */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="tailoring" element={<TailoringHomePage />} />
        <Route path="fabric" element={<FabricHomePage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Admin Protected / Operational Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="cleanup" element={<AdminCleanupPage />} />
        <Route
          path="tailoring"
          element={
            <div className="bg-white p-8 rounded-sm border border-stone-200">
              <h2 className="font-serif font-bold text-xl text-chocolate-900 mb-2">
                Tailoring Services Management
              </h2>
              <p className="text-sm text-stone-600">
                Phase 2 Target: Create, edit, and organize tailoring service offerings, pricing guidance, and custom cut profiles.
              </p>
            </div>
          }
        />
        <Route
          path="fabric"
          element={
            <div className="bg-white p-8 rounded-sm border border-stone-200">
              <h2 className="font-serif font-bold text-xl text-chocolate-900 mb-2">
                Fabric Catalogue Management
              </h2>
              <p className="text-sm text-stone-600">
                Phase 2 Target: Manage textile varieties, weave definitions, yarn counts, and swatch availability.
              </p>
            </div>
          }
        />
        <Route
          path="gallery"
          element={
            <div className="bg-white p-8 rounded-sm border border-stone-200">
              <h2 className="font-serif font-bold text-xl text-chocolate-900 mb-2">
                Visual Showcase & Image Uploads
              </h2>
              <p className="text-sm text-stone-600">
                Phase 2 Target: Cloud Storage upload pipeline with automatic thumbnail generation and dual-entity tagging.
              </p>
            </div>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
