import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import EnvironmentBanner from '../components/common/EnvironmentBanner';

export const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-ivory text-chocolate">
      {/* Dev / Environment Partition Banner */}
      <EnvironmentBanner />

      {/* Boutique Top Announcement Bar */}
      <Header />

      {/* Main Navigation Bar */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Boutique Footer */}
      <Footer />
    </div>
  );
};

export default PublicLayout;

