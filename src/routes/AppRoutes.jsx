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

// Admin Authentication & Protection
import AdminLoginPage from '../pages/admin/AdminLoginPage';
import AdminProtectedRoute from './AdminProtectedRoute';

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

      {/* Admin Authentication Entrypoint */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Protected Admin Operations Console Routes (Requires Active Entry in /admins/{uid}) */}
      <Route element={<AdminProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />

          {/* Departmental Access: Tailoring Admin or Super Admin */}
          <Route element={<AdminProtectedRoute requiredRole="tailoring_admin" />}>
            <Route path="tailoring" element={<AdminTailoringPage />} />
          </Route>

          {/* Departmental Access: Fabric Admin or Super Admin */}
          <Route element={<AdminProtectedRoute requiredRole="fabric_admin" />}>
            <Route path="fabric" element={<AdminFabricPage />} />
          </Route>

          {/* Shared Admin Modules */}
          <Route path="gallery" element={<AdminGalleryManagementPage />} />
          <Route path="image-studio" element={<AdminImageStudioPage />} />

          {/* Super Admin Exclusive Governance Modules */}
          <Route element={<AdminProtectedRoute requiredRole="super_admin" />}>
            <Route path="admins" element={<AdminUsersPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
            <Route path="cleanup" element={<AdminCleanupPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
