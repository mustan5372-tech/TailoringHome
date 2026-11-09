/**
 * Homepage Content & Data Store
 * Keeps all photography URLs, catalogue highlights, and copy
 * separate from component logic so it can be updated or connected
 * to Firebase Storage and Firestore in future phases.
 */

import { ROUTES, BRAND_INFO } from '../constants/navigation';

export const homeContent = {
  // 1. Hero Section
  hero: {
    badge: 'Unified Atelier & Textile Archive',
    headline: 'Where Sartorial Craftsmanship Meets Exquisite Textiles',
    subheadline:
      'Welcome to the unified online catalogue of Tailoring Home and Fabric Home. Explore bespoke artisanal tailoring services alongside handpicked collections of pure silks, linens, fine cottons and luxury wools.',
    // Professional tailoring/fabric background image
    backgroundImage:
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=2000&q=80',
    fallbackGradient: 'from-chocolate-950 via-chocolate-900 to-maroon-950',
    primaryCta: {
      label: 'Explore Tailoring Services',
      to: ROUTES.TAILORING,
    },
    secondaryCta: {
      label: 'Discover Fabric Varieties',
      to: ROUTES.FABRIC,
    },
    highlights: [
      'Bespoke Anatomical Cutting',
      'Certified Natural Fibers',
      'Two Dedicated Specialists Under One Roof',
    ],
  },

  // 2. Business Introductions (Tailoring Home & Fabric Home)
  businessIntros: {
    tailoring: {
      name: 'Tailoring Home',
      tagline: 'Artisanal Bespoke Stitching & Tailoring',
      badge: 'Bespoke Atelier',
      description:
        'Precision master cutting, personalized pattern drafting, hand-canvassed formal suits, royal wedding ensembles, and express alterations shaped to your unique posture and anatomy.',
      features: [
        'Over 28 precise anatomical measurements for individual drafting',
        'Handcrafted suits, bandhgalas, sherwanis, blazers & custom shirts',
        'Traditional baste trial sessions for posture and drape perfection',
        'Precision alterations and restoration for cherished heirloom garments',
      ],
      image:
        'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=1000&q=80',
      ctaText: 'Browse Tailoring Catalogue',
      ctaTo: ROUTES.TAILORING,
      accentColor: 'maroon',
    },
    fabric: {
      name: 'Fabric Home',
      tagline: 'Curated Luxury Textiles & Weaves',
      badge: 'Textile Archive',
      description:
        'A comprehensive repository of certified natural fabrics sourced directly from prestigious textile hubs. Hand-selected for fiber purity, thread count consistency, and remarkable tactile drape.',
      features: [
        'Pure Mulberry, Tussar & Banarasi handloom silks with authentic zari',
        'Breathable Irish and Normandy pure linens in rich seasonal hues',
        'Egyptian Giza & Pima long-staple cottons (100s–140s 2-ply count)',
        'Superfine Australian Merino suiting wools & ornamental brocades',
      ],
      image:
        'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=1000&q=80',
      ctaText: 'Explore Fabric Varieties',
      ctaTo: ROUTES.FABRIC,
      accentColor: 'chocolate',
    },
  },

  // 3. Tailoring Highlights (Preview of Main Stitching Categories)
  tailoringHighlights: [
    {
      id: 'suits',
      title: 'Bespoke Suits & Tuxedos',
      category: 'Formal Wear',
      description:
        'Hand-canvassed chest construction, custom lapel geometries, horn buttons, and breathable interior linings tailored for timeless corporate elegance.',
      tags: ['Two-Piece', 'Three-Piece', 'Tuxedos', 'Dinner Jackets'],
      image:
        'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-chocolate-900 to-maroon-950',
    },
    {
      id: 'ceremonial',
      title: 'Royal Ethnic & Wedding Regalia',
      category: 'Celebratory',
      description:
        'Handcrafted Sherwanis, classic Bandhgalas, Indo-Western silhouettes, and celebratory festive Kurta sets detailed with fine artisanal hand-finishes.',
      tags: ['Sherwani', 'Bandhgala', 'Indo-Western', 'Kurta Sets'],
      image:
        'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-maroon-900 to-amber-950',
    },
    {
      id: 'shirts-trousers',
      title: 'Custom Sartorial Shirts & Trousers',
      category: 'Smart Formals',
      description:
        'Custom collars (cutaway, spread, button-down, band), monograms, mother-of-pearl buttons, and pleated or flat-front tailored trousers.',
      tags: ['Giza Cotton Shirts', 'Linen Casuals', 'Pleated Trousers', 'Chinos'],
      image:
        'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-chocolate-800 to-chocolate-950',
    },
    {
      id: 'alterations',
      title: 'Master Alterations & Restyling',
      category: 'Precision Fitting',
      description:
        'Meticulous shoulder reduction, sleeve pitch adjustment, waist contouring, hem tapering, and restructuring high-value heirloom garments.',
      tags: ['Suit Resizing', 'Trouser Hemming', 'Relining', 'Jacket Recut'],
      image:
        'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-maroon-950 to-chocolate-900',
    },
  ],

  // 4. Fabric Highlights (Preview of Main Textile Categories)
  fabricHighlights: [
    {
      id: 'silks',
      name: 'Pure Mulberry & Banarasi Silks',
      origin: 'Varanasi & Karnataka',
      weaveType: 'Handloom & Jacquard Weave',
      description:
        'Lustrous, dense fabric woven with antique golden and silver zari threads. Distinguished by regal drape, rich color depth, and heirloom quality.',
      idealFor: 'Sherwanis, Wedding Kurta Ensembles, Traditional Dupattas',
      image:
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-maroon-900 to-amber-900',
    },
    {
      id: 'linens',
      name: 'European & Irish Pure Linens',
      origin: 'Normandy & Ireland',
      weaveType: '60s & 80s Count Plain Weave',
      description:
        'Natural organic flax delivering unparalleled breathability and distinctive cooling slub texture for refined summer bespoke suiting.',
      idealFor: 'Summer Suits, Unlined Blazers, Leisure Shirts',
      image:
        'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-amber-900 to-chocolate-900',
    },
    {
      id: 'cottons',
      name: 'Egyptian Giza & Pima Cottons',
      origin: 'Egypt & Supima USA',
      weaveType: '100s–140s 2-Ply Poplin & Twill',
      description:
        'Silky smooth feel against the skin, crisp collar stability, brilliant dye retention, and superior tensile durability for luxury shirts.',
      idealFor: 'Executive Boardroom Shirts, Daily Luxury',
      image:
        'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-chocolate-800 to-stone-900',
    },
    {
      id: 'wools',
      name: 'Super 120s – 160s Merino Wool Blends',
      origin: 'Biella, Italy & Australia',
      weaveType: 'Worsted Twill, Sharkskin & Glen Check',
      description:
        'Natural elasticity and four-season temperature control that drapes cleanly and resists creasing throughout active business travel.',
      idealFor: 'Two-Piece Suits, Overcoats, Tailored Trousers',
      image:
        'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-slate-900 to-chocolate-950',
    },
  ],

  // 5. Gallery Preview (Sample Selection of Photographs)
  galleryPreview: [
    {
      id: 1,
      title: 'Midnight Velvet Bandhgala',
      shop: 'Tailoring Home',
      category: 'tailoring',
      tag: 'Bespoke Tailoring',
      description: 'Hand-canvassed construction with antique brass coin buttons and silk lining.',
      image:
        'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-chocolate-950 to-maroon-950',
    },
    {
      id: 2,
      title: 'Heritage Banarasi Katan Silk',
      shop: 'Fabric Home',
      category: 'fabric',
      tag: 'Textile Variety',
      description: 'Handwoven floral jaal motif in antique gold zari on royal crimson base.',
      image:
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-maroon-900 to-amber-950',
    },
    {
      id: 3,
      title: 'Double-Breasted Irish Linen Suit',
      shop: 'Tailoring Home',
      category: 'tailoring',
      tag: 'Bespoke Tailoring',
      description: 'Unbleached natural linen tailored with wide peak lapels and horn buttons.',
      image:
        'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-amber-950 to-chocolate-900',
    },
    {
      id: 4,
      title: 'Italian Super 140s Navy Twill',
      shop: 'Fabric Home',
      category: 'fabric',
      tag: 'Textile Variety',
      description: 'Fine worsted wool blend for sharp boardroom executive suiting.',
      image:
        'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-slate-950 to-chocolate-950',
    },
  ],

  // 6. Why Choose Us (Genuine Business Qualities)
  whyChooseUs: [
    {
      id: 'individual-drafting',
      title: 'Individual Pattern Drafting',
      description:
        'We draft unique, personal paper patterns for every client rather than altering standardized factory templates. This accounts for shoulder slope, chest arch, and spinal posture.',
      icon: 'Scissors',
    },
    {
      id: 'certified-purity',
      title: 'Certified Natural Fibers',
      description:
        'We enforce strict yarn authenticity standards across our silks, linens, wools, and cottons. We reject synthetic blends masquerading as natural fibers in our premium collections.',
      icon: 'ShieldCheck',
    },
    {
      id: 'two-specialists',
      title: 'Two Specialists, One Roof',
      description:
        'Selecting the right fabric and achieving an impeccable cut are intimately connected. Having both ateliers in one destination guarantees your cloth and silhouette work in harmony.',
      icon: 'Layers',
    },
    {
      id: 'trial-fittings',
      title: 'Multiple Trial Fittings',
      description:
        'Baste and intermediate fitting sessions allow real-time sculpting of the garment on your body before final seams, linings, and hand buttonholes are permanently set.',
      icon: 'Ruler',
    },
    {
      id: 'transparent-browsing',
      title: 'Pressure-Free Catalogue Browsing',
      description:
        'Browse our catalogue online and visit our physical boutiques to inspect swatches, observe craftsmanship, and discuss your sartorial vision without high-pressure sales.',
      icon: 'Eye',
    },
    {
      id: 'reliable-handover',
      title: 'Reliable Handover Timelines',
      description:
        'We schedule realistic craftsmanship timelines for celebratory occasions, weddings, and executive commitments, ensuring your completed garment is delivered punctually.',
      icon: 'Clock',
    },
  ],

  // 7. Contact & Visiting Placeholders
  contact: {
    badge: 'Visit & Inquire',
    title: 'Consult Our Master Artisans',
    subtitle:
      'Visit our twin showrooms to inspect fabric swatches in person or book a dedicated measurement consultation with our master cutter.',
    notice:
      'Note: Contact numbers, WhatsApp links and boutique addresses below are temporary demonstration placeholders until verified business details are updated.',
    tailoringContact: {
      shop: 'Tailoring Home',
      specialty: 'Bespoke Stitching, Suits, Sherwanis & Alterations',
      phone: BRAND_INFO.tailoringShop.phone,
      phoneDisplay: BRAND_INFO.tailoringShop.phoneDisplay,
      whatsapp: BRAND_INFO.tailoringShop.whatsapp,
      location: BRAND_INFO.tailoringShop.location,
      hours: BRAND_INFO.workingHours,
    },
    fabricContact: {
      shop: 'Fabric Home',
      specialty: 'Pure Silks, Linens, Egyptian Cottons & Brocades',
      phone: BRAND_INFO.fabricShop.phone,
      phoneDisplay: BRAND_INFO.fabricShop.phoneDisplay,
      whatsapp: BRAND_INFO.fabricShop.whatsapp,
      location: BRAND_INFO.fabricShop.location,
      hours: BRAND_INFO.workingHours,
    },
  },
};

export default homeContent;
