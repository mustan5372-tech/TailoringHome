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
    phone: '+91 98765 43210',
    phoneDisplay: '+91 98765 43210 [Placeholder]',
    whatsapp: '+919876543210',
    location: '[Placeholder: Boutique Wing, Main Fashion Street]',
  },
  fabricShop: {
    name: 'Fabric Home',
    specialty: 'Pure silks, fine linens, cottons, brocades & designer textiles',
    phone: '+91 98765 43211',
    phoneDisplay: '+91 98765 43211 [Placeholder]',
    whatsapp: '+919876543211',
    location: '[Placeholder: Textile Pavilion, Main Fashion Street]',
  },
  workingHours: 'Mon - Sat: 10:00 AM – 8:30 PM [Placeholder]',
  fullHours: 'Mon - Sat: 10:00 AM – 8:30 PM | Sunday: 11:00 AM – 6:00 PM [Placeholder]',
};
