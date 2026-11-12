/**
 * Navigation and Brand Constants
 * Note: Contact details and addresses are marked as temporary placeholders
 * until verified business information is supplied.
 */

export const ROUTES = {
  HOME: '/',
  TAILORING: '/tailoring',
  FABRIC: '/fabric',
  GALLERY: '/gallery',
  ABOUT: '/about',
  CONTACT: '/contact',
  ADMIN: {
    LOGIN: '/admin/login',
    DASHBOARD: '/admin',
    TAILORING: '/admin/tailoring',
    FABRIC: '/admin/fabric',
    GALLERY: '/admin/gallery',
    IMAGE_STUDIO: '/admin/image-studio',
    ADMIN_MANAGEMENT: '/admin/admins',
    SETTINGS: '/admin/settings',
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
    phone: null,
    phoneDisplay: 'To be announced',
    whatsapp: null,
    location: 'Atelier address to be announced',
  },
  fabricShop: {
    name: 'Fabric Home',
    specialty: 'Pure silks, fine linens, cottons, brocades & designer textiles',
    phone: null,
    phoneDisplay: 'To be announced',
    whatsapp: null,
    location: 'Showroom address to be announced',
  },
  workingHours: 'Visiting hours to be announced',
  fullHours: 'Operating schedule will be updated once boutique details are finalized',
};
