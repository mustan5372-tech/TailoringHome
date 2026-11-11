/**
 * Admin Dashboard Content & Data Store
 * Decoupled data store providing clearly marked demo values,
 * activity logs, and administrative configuration for the Admin UI.
 *
 * NOTE: All values, metrics, and activity entries are explicitly
 * labeled as demo/placeholder data until actual database records exist.
 */

import { ROUTES } from '../constants/navigation';

export const adminContent = {
  // Summary Metrics (Clearly labeled Demo Data)
  summaryCards: [
    {
      id: 'tailoring-items',
      label: 'Total Tailoring Categories',
      value: '10',
      unit: 'Active Offerings [Demo]',
      isDemo: true,
      demoBadge: 'Demo Metric',
      subtext: 'Bohra attire, school uniforms, suits, blouses & alterations',
      icon: 'Scissors',
      accentColor: 'maroon',
      route: ROUTES.ADMIN.TAILORING,
      actionLabel: 'Manage Tailoring',
    },
    {
      id: 'fabric-items',
      label: 'Total Fabric Varieties',
      value: '11',
      unit: 'Curated Weaves [Demo]',
      isDemo: true,
      demoBadge: 'Demo Metric',
      subtext: 'Rida prints, Swiss lawns, pure silks, linens & suiting wools',
      icon: 'Layers',
      accentColor: 'chocolate',
      route: ROUTES.ADMIN.FABRIC,
      actionLabel: 'Manage Fabrics',
    },
    {
      id: 'gallery-items',
      label: 'Showcase Gallery Images',
      value: '16',
      unit: 'Archived Photos [Demo]',
      isDemo: true,
      demoBadge: 'Demo Metric',
      subtext: '6 verified boutique photos, 10 sample preview placeholders',
      icon: 'Image',
      accentColor: 'gold',
      route: ROUTES.ADMIN.GALLERY,
      actionLabel: 'Open Gallery Studio',
    },
    {
      id: 'admin-users',
      label: 'Authorized Administrators',
      value: '2',
      unit: 'Assigned Roles [Demo]',
      isDemo: true,
      demoBadge: 'Demo Metric',
      subtext: 'Boutique manager & master cutter accounts staged',
      icon: 'Shield',
      accentColor: 'neutral',
      route: ROUTES.ADMIN.ADMIN_MANAGEMENT,
      actionLabel: 'Manage Admins',
    },
  ],

  // Recent Activity Log (Clearly marked as Demo Data)
  recentActivities: [
    {
      id: 'act-1',
      action: 'Updated Bohra Men’s Kurta & Saya specs',
      entity: 'Tailoring Home',
      shopCategory: 'tailoring',
      time: '2 hours ago',
      user: 'Boutique Admin [Demo]',
      status: 'Updated',
      details: 'Calibrated neckline and pocket detailing descriptions for community accuracy.',
      isDemo: true,
    },
    {
      id: 'act-2',
      action: 'Added 4 floral jodi swatches to Rida Archive',
      entity: 'Fabric Home',
      shopCategory: 'fabric',
      time: '5 hours ago',
      user: 'Textile Curator [Demo]',
      status: 'Published',
      details: 'Organized soft cotton lawn prints with matching panel colorways.',
      isDemo: true,
    },
    {
      id: 'act-3',
      action: 'Separated MSB and ABN School Uniform listings',
      entity: 'Both Shops',
      shopCategory: 'uniform',
      time: 'Yesterday',
      user: 'Boutique Admin [Demo]',
      status: 'Verified',
      details: 'Updated campus dress code compliance disclaimers across tailoring and fabrics.',
      isDemo: true,
    },
    {
      id: 'act-4',
      action: 'Synchronized local boutique workshop photography',
      entity: 'Gallery Studio',
      shopCategory: 'gallery',
      time: '2 days ago',
      user: 'Media Admin [Demo]',
      status: 'Synced',
      details: 'Verified customary attire, collar shirt, and school uniform images in public/images.',
      isDemo: true,
    },
    {
      id: 'act-5',
      action: 'Vercel SPA rewrite deployment verified',
      entity: 'System Architecture',
      shopCategory: 'system',
      time: '3 days ago',
      user: 'DevOps Automated [Demo]',
      status: 'Active',
      details: 'Zero 404s on browser reloads on tailoringhome.vercel.app.',
      isDemo: true,
    },
  ],

  // Category Distribution & Overview
  categoryDistribution: {
    tailoringGroups: [
      { name: 'Bohra Specialities (Kurta, Saya, Izaar, Rida)', count: 2, share: '20%' },
      { name: 'School Uniforms (MSB & ABN separated)', count: 2, share: '20%' },
      { name: "Men's Sartorial & Suits", count: 2, share: '20%' },
      { name: "Women's Couture & Blouses", count: 2, share: '20%' },
      { name: 'Children & Alterations', count: 2, share: '20%' },
    ],
    fabricGroups: [
      { name: 'Bohra Speciality Weaves (Rida prints, Swiss lawns, Izaar cottons)', count: 4, share: '36%' },
      { name: 'School Uniform Textiles (MSB & ABN regulation cloths)', count: 2, share: '18%' },
      { name: 'Natural Cottons, Silks & Linens', count: 3, share: '27%' },
      { name: 'Luxury Suiting & Designer Jacquards', count: 2, share: '19%' },
    ],
  },

  // Staged Administrators (Demo values)
  adminUsers: [
    {
      name: 'Master Cutter & Boutique Manager',
      email: 'admin@tailoringhome.com [Demo]',
      role: 'Super Administrator',
      status: 'Active [Demo]',
      lastLogin: 'Today, 10:15 AM',
    },
    {
      name: 'Textile Archivist & Swatch Curator',
      email: 'fabrics@tailoringhome.com [Demo]',
      role: 'Catalogue Manager',
      status: 'Active [Demo]',
      lastLogin: 'Yesterday, 04:30 PM',
    },
  ],
};

export default adminContent;
