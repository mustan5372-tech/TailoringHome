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
import AdminTailoringPage from '../pages/admin/AdminTailoringPage';
import AdminFabricPage from '../pages/admin/AdminFabricPage';
import AdminGalleryManagementPage from '../pages/admin/AdminGalleryManagementPage';
import AdminImageStudioPage from '../pages/admin/AdminImageStudioPage';
import AdminUsersPage from '../pages/admin/AdminUsersPage';
import AdminSettingsPage from '../pages/admin/AdminSettingsPage';
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

      {/* Admin Operations Console Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="tailoring" element={<AdminTailoringPage />} />
        <Route path="fabric" element={<AdminFabricPage />} />
        <Route path="gallery" element={<AdminGalleryManagementPage />} />
        <Route path="image-studio" element={<AdminImageStudioPage />} />
        <Route path="admins" element={<AdminUsersPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
        <Route path="cleanup" element={<AdminCleanupPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
