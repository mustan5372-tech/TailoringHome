/**
 * Navigation and Brand Constants
 */

export const ROUTES = {
  HOME: '/',
  TAILORING: '/tailoring',
  FABRIC: '/fabric',
  GALLERY: '/gallery',
  ABOUT: '/about',
  CONTACT: '/contact',
  ADMIN: {
    DASHBOARD: '/admin',
    TAILORING: '/admin/tailoring',
    FABRIC: '/admin/fabric',
    GALLERY: '/admin/gallery',
    CLEANUP: '/admin/cleanup',
  },
};

export const NAV_LINKS = [
  { label: 'Home', path: ROUTES.HOME },
  { label: 'Tailoring Home', path: ROUTES.TAILORING, badge: 'Stitching Services' },
  { label: 'Fabric Home', path: ROUTES.FABRIC, badge: 'Textile Varieties' },
  { label: 'Gallery', path: ROUTES.GALLERY },
  { label: 'About Us', path: ROUTES.ABOUT },
  { label: 'Contact', path: ROUTES.CONTACT },
];

export const BRAND_INFO = {
  name: 'Tailoring Home & Fabric Home',
  tagline: 'Bespoke Tailoring & Handpicked Luxury Textiles',
  tailoringShop: {
    name: 'Tailoring Home',
    specialty: 'Custom bespoke stitching, suits, traditional wear & alterations',
    phone: '+91 98765 43210',
    location: 'Boutique Wing, Main Street',
  },
  fabricShop: {
    name: 'Fabric Home',
    specialty: 'Pure silks, fine linens, cottons, brocades & designer textiles',
    phone: '+91 98765 43211',
    location: 'Textile Pavilion, Main Street',
  },
  workingHours: 'Mon - Sat: 10:00 AM – 8:30 PM | Sunday: 11:00 AM – 6:00 PM',
};

