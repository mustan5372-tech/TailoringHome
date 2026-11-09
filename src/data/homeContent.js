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
      'Welcome to the unified online catalogue of Tailoring Home and Fabric Home. Serving the Dawoodi Bohra community and discerning clients with bespoke artisanal tailoring, traditional attire, and curated fine fabrics.',
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
      'Bohra Traditional Attire & School Uniforms',
      'Certified Natural Fibers',
    ],
  },

  // 2. Business Introductions (Tailoring Home & Fabric Home)
  businessIntros: {
    tailoring: {
      name: 'Tailoring Home',
      tagline: 'Artisanal Bespoke Stitching & Community Tailoring',
      badge: 'Bespoke Atelier',
      description:
        'Precision master cutting and traditional craftsmanship for Bohra Men\'s Kurta-Saya-Izaar, Women\'s Ridas, MSB & ABN school uniforms, executive suiting, and fine alterations.',
      features: [
        'Dedicated Dawoodi Bohra traditional tailoring: Kurta, Saya, Izaar & Ridas',
        'Official MSB & ABN school uniform tailoring with durable construction',
        'Bespoke gentlemen\'s suits, blazers, bandhgalas, custom shirts & trousers',
        'Traditional baste trial sessions and precision restoration alterations',
      ],
      image:
        'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=1000&q=80',
      ctaText: 'Browse Tailoring Catalogue',
      ctaTo: ROUTES.TAILORING,
      accentColor: 'maroon',
    },
    fabric: {
      name: 'Fabric Home',
      tagline: 'Curated Luxury Textiles, Rida Materials & Uniform Weaves',
      badge: 'Textile Archive',
      description:
        'A comprehensive repository of certified fabrics: specialized Rida prints, pristine Kurta-Saya Swiss lawns and cambrics, approved MSB & ABN uniform textiles, and luxury wools & silks.',
      features: [
        'Exclusive Rida fabrics: floral cottons, French chiffons, panels & lace borders',
        'Pristine white Kurta-Saya lawns, fine cambrics & durable Izaar weaves',
        'Approved regulation MSB and ABN uniform fabrics in certified shades',
        'Pure Mulberry silks, Irish linens, Egyptian Giza cottons & Merino wools',
      ],
      image:
        'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=1000&q=80',
      ctaText: 'Explore Fabric Varieties',
      ctaTo: ROUTES.FABRIC,
      accentColor: 'chocolate',
    },
  },

  // 3. Tailoring Highlights (Preview of Main Stitching Categories)
  // Prominently features Bohra community attire and separate MSB/ABN uniforms, while retaining all existing categories.
  tailoringFilterTabs: [
    { id: 'all', label: 'All Offerings' },
    { id: 'bohra', label: 'Bohra Specialities', isFeatured: true },
    { id: 'uniform', label: 'School Uniforms' },
    { id: 'general', label: 'Men & Women' },
    { id: 'formal', label: 'Suits & Formal' },
  ],

  tailoringHighlights: [
    // --- Prominent Bohra Community Categories ---
    {
      id: 'bohra-menswear',
      title: 'Bohra Men\'s Wear: Kurta, Saya, Izaar',
      category: 'Bohra Speciality',
      group: 'bohra',
      isCommunitySpecial: true,
      badge: 'Community Speciality',
      badgeVariant: 'gold',
      description:
        'Master-tailored traditional Kurta, Saya, and Izaar crafted with precise proportions, neat hand-finishing, and classic pocket detailing suited for daily prayers and festive miqaats.',
      tags: ['Kurta & Saya', 'Izaar', 'Bohra Traditional', 'Miqaat Wear', 'Hand-Finished'],
      image:
        'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-amber-950 to-chocolate-950',
      isRepresentativeImage: true,
    },
    {
      id: 'bohra-womenswear',
      title: 'Bohra Women\'s Wear: Rida',
      category: 'Bohra Speciality',
      group: 'bohra',
      isCommunitySpecial: true,
      badge: 'Community Speciality',
      badgeVariant: 'gold',
      description:
        'Artisanal stitching of traditional Ridas, including Pardi and Ghagra with elegant panel matching, lace attachment, intricate border appliqué, and custom color coordination.',
      tags: ['Rida Tailoring', 'Pardi & Ghagra', 'Lace Appliqué', 'Panel Matching', 'Bespoke Stitch'],
      image:
        'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-maroon-900 to-amber-950',
      isRepresentativeImage: true,
    },

    // --- Separate School Uniform Categories ---
    {
      id: 'school-uniform-msb',
      title: 'MSB School Uniforms',
      category: 'School Uniform',
      group: 'uniform',
      isCommunitySpecial: true,
      badge: 'School Uniform',
      badgeVariant: 'maroon',
      description:
        'Tailored in accordance with Madrasa Saifiyah Burhaniyah (MSB) uniform dress codes for boys and girls across all grade divisions. Built with reinforced seams for active school life.',
      notice: 'Tailored as per respective school uniform dress codes and academic session requirements.',
      tags: ['MSB Uniform', 'Boys & Girls', 'Campus Standard', 'Grade 1–12', 'Reinforced Fit'],
      image:
        'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-chocolate-900 to-maroon-950',
      isRepresentativeImage: true,
    },
    {
      id: 'school-uniform-abn',
      title: 'ABN School Uniforms',
      category: 'School Uniform',
      group: 'uniform',
      isCommunitySpecial: true,
      badge: 'School Uniform',
      badgeVariant: 'maroon',
      description:
        'Tailored to match Al Madrasa (ABN) approved school uniform patterns and dress codes. Cleanly finished collars, durable stitching, and comfortable daily campus proportions.',
      notice: 'Tailored as per respective school uniform dress codes and academic session requirements.',
      tags: ['ABN Uniform', 'Boys & Girls', 'Approved Standard', 'Durable Stitch', 'Daily Wear'],
      image:
        'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-maroon-950 to-chocolate-900',
      isRepresentativeImage: true,
    },

    // --- Men's, Women's & Children's Wear ---
    {
      id: 'mens-wear',
      title: 'Men\'s Wear',
      category: 'Gentlemen\'s Attire',
      group: 'general',
      isCommunitySpecial: false,
      badge: 'Bespoke Cut',
      badgeVariant: 'chocolate',
      description:
        'Custom-tailored everyday and formal menswear, including classic bespoke shirts, pleated and flat-front trousers, waistcoats, and casual linen wear crafted for personal comfort.',
      tags: ['Bespoke Shirts', 'Pleated Trousers', 'Waistcoats', 'Linen Casuals'],
      image:
        'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-chocolate-900 to-chocolate-950',
      isRepresentativeImage: true,
    },
    {
      id: 'womens-wear',
      title: 'Women\'s Wear',
      category: 'Ladies\' Bespoke',
      group: 'general',
      isCommunitySpecial: false,
      badge: 'Artisanal Stitch',
      badgeVariant: 'chocolate',
      description:
        'Bespoke tailoring for women including elegant salwar kameez, festive kurtis, ceremonial suits, modest designer wear, and custom silhouette drafting.',
      tags: ['Salwar Suits', 'Custom Kurtis', 'Festive Sets', 'Modest Wear'],
      image:
        'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-maroon-950 to-amber-950',
      isRepresentativeImage: true,
    },
    {
      id: 'childrens-wear',
      title: 'Children\'s Wear',
      category: 'Youth Tailoring',
      group: 'general',
      isCommunitySpecial: false,
      badge: 'Comfort Fit',
      badgeVariant: 'chocolate',
      description:
        'Tailored festive and traditional garments for boys and girls, including junior kurta-saya sets, ceremonial jackets, and occasion wear with growth-friendly seam allowances.',
      tags: ['Junior Kurta-Saya', 'Boys Ethnic', 'Girls Festive', 'Comfort Lining'],
      image:
        'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-amber-950 to-chocolate-900',
      isRepresentativeImage: true,
    },

    // --- Suits, Blazers and Formal Wear (Retained and Enhanced) ---
    {
      id: 'suits-blazers-alterations',
      title: 'Suits, Blazers and Alterations',
      category: 'Formal & Alterations',
      group: 'formal',
      isCommunitySpecial: false,
      badge: 'Formal Atelier',
      badgeVariant: 'chocolate',
      description:
        'Hand-canvassed formal suits, executive blazers, tuxedos, and master alterations including shoulder recutting, sleeve pitch adjustments, and garment restyling.',
      tags: ['Corporate Suits', 'Tailored Blazers', 'Tuxedos', 'Master Alterations'],
      image:
        'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-chocolate-900 to-maroon-950',
      isRepresentativeImage: true,
    },
    {
      id: 'ceremonial',
      title: 'Royal Ethnic & Wedding Regalia',
      category: 'Celebratory',
      group: 'formal',
      isCommunitySpecial: false,
      badge: 'Occasion Wear',
      badgeVariant: 'maroon',
      description:
        'Handcrafted Sherwanis, classic Bandhgalas, Indo-Western silhouettes, and celebratory festive Kurta sets detailed with fine artisanal hand-finishes.',
      tags: ['Sherwani', 'Bandhgala', 'Indo-Western', 'Kurta Sets'],
      image:
        'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-maroon-900 to-amber-950',
      isRepresentativeImage: true,
    },
    {
      id: 'alterations',
      title: 'Master Alterations & Restyling',
      category: 'Precision Fitting',
      group: 'formal',
      isCommunitySpecial: false,
      badge: 'Restyling',
      badgeVariant: 'chocolate',
      description:
        'Meticulous shoulder reduction, sleeve pitch adjustment, waist contouring, hem tapering, and restructuring high-value heirloom garments.',
      tags: ['Suit Resizing', 'Trouser Hemming', 'Relining', 'Jacket Recut'],
      image:
        'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-maroon-950 to-chocolate-900',
      isRepresentativeImage: true,
    },
  ],

  // 4. Fabric Highlights (Preview of Main Textile Categories)
  // Prominently features Bohra traditional textiles and separate MSB/ABN uniform fabrics, while retaining all existing varieties.
  fabricFilterTabs: [
    { id: 'all', label: 'All Textiles' },
    { id: 'bohra', label: 'Bohra Traditional Fabrics', isFeatured: true },
    { id: 'uniform', label: 'School Uniform Fabrics' },
    { id: 'natural', label: 'Cotton, Silk & Linen' },
    { id: 'designer', label: 'Suit & Designer' },
  ],

  fabricHighlights: [
    // --- Prominent Bohra Community Fabrics ---
    {
      id: 'rida-fabrics',
      name: 'Rida Fabrics & Designer Panels',
      category: 'Bohra Speciality',
      group: 'bohra',
      isCommunitySpecial: true,
      origin: 'Surat, Mumbai & Speciality Centers',
      weaveType: 'Printed Cottons, French Chiffons, Satins & Lace Borders',
      badge: 'Community Speciality',
      badgeVariant: 'gold',
      description:
        'Curated floral prints, harmonious color combinations, soft cotton lawn jodis, self-embossed panels, and coordinating lace trims handpicked specifically for Rida creation.',
      idealFor: 'Pardi & Ghagra, Everyday & Miqaat Ridas, Coordinating Jodi Sets',
      tags: ['Floral Prints', 'Lace Trims', 'Soft Cotton Jodi', 'Embroidered Panels'],
      image:
        'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-maroon-900 to-amber-950',
      isRepresentativeImage: true,
    },
    {
      id: 'kurta-saya-fabrics',
      name: 'Kurta-Saya Fabrics',
      category: 'Bohra Speciality',
      group: 'bohra',
      isCommunitySpecial: true,
      origin: 'Ahmadabad, Mumbai & Switzerland',
      weaveType: 'Crisp White Swiss Lawn, Egyptian Cotton & Fine Jacquard',
      badge: 'Community Speciality',
      badgeVariant: 'gold',
      description:
        'Pristine white and ivory textiles engineered for Kurta and Saya draping. High-thread-count cambrics, soft lawns, and subtle self-textured jacquards offering cool breathability.',
      idealFor: 'Bohra Men\'s Kurta & Saya, Prayer Attire, Religious & Festive Miqaats',
      tags: ['Pristine White', 'Swiss Lawn', 'Egyptian Cambric', 'Self-Jacquard Weave'],
      image:
        'https://images.unsplash.com/photo-1528458876859-9944061a5b48?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-stone-900 to-chocolate-950',
      isRepresentativeImage: true,
    },
    {
      id: 'izaar-fabrics',
      name: 'Izaar Fabrics & Cambrics',
      category: 'Bohra Speciality',
      group: 'bohra',
      isCommunitySpecial: true,
      origin: 'Leading Indian Textile Mills',
      weaveType: 'Durable Cambric, Fine Poplin & Self-Stripe Weaves',
      badge: 'Community Speciality',
      badgeVariant: 'gold',
      description:
        'Soft yet resilient unstitched cottons in pure whites, subtle self-stripes, and traditional woven borders tailored for comfortable daily and occasion Izaar wear.',
      idealFor: 'Traditional Izaars, Pajama Bottoms, Lightweight Daily Prayer Wear',
      tags: ['Pure White Cotton', 'Durable Cambric', 'Woven Border Accents'],
      image:
        'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-amber-950 to-chocolate-900',
      isRepresentativeImage: true,
    },

    // --- Separate School Uniform Fabrics ---
    {
      id: 'uniform-fabric-msb',
      name: 'MSB Uniform Fabrics',
      category: 'School Uniform',
      group: 'uniform',
      isCommunitySpecial: true,
      origin: 'Certified Institutional Textile Mills',
      weaveType: 'High-Tensile Cotton-Poly Blend & Drill Weave',
      badge: 'School Uniform',
      badgeVariant: 'maroon',
      description:
        'Regulation uniform textiles matching Madrasa Saifiyah Burhaniyah (MSB) approved color shades and weave durability. Breathable, colorfast, and pill-resistant for students.',
      idealFor: 'MSB Boys\' & Girls\' School Uniforms, Shirts, Trousers & Pinafores',
      tags: ['MSB Regulation Shade', 'High Tensile Weave', 'Colorfast', 'Easy-Care'],
      image:
        'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-chocolate-900 to-maroon-950',
      isRepresentativeImage: true,
    },
    {
      id: 'uniform-fabric-abn',
      name: 'ABN Uniform Fabrics',
      category: 'School Uniform',
      group: 'uniform',
      isCommunitySpecial: true,
      origin: 'Certified Institutional Weavers',
      weaveType: 'Heavy-Duty Shirting & Suiting Uniform Twill',
      badge: 'School Uniform',
      badgeVariant: 'maroon',
      description:
        'Approved regulation fabrics conforming to Al Madrasa (ABN) school specifications. Tested for tear strength, long-term wash resilience, and day-long classroom comfort.',
      idealFor: 'ABN Campus Uniforms, Student Shirting & Trousers',
      tags: ['ABN Standard Shade', 'High Tear Strength', 'Classroom Comfort'],
      image:
        'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-maroon-950 to-chocolate-900',
      isRepresentativeImage: true,
    },

    // --- Cotton, Silk & Linen and Suit & Designer Fabrics ---
    {
      id: 'cotton-silk-linen',
      name: 'Cotton, Silk and Linen',
      category: 'Natural Fibers',
      group: 'natural',
      isCommunitySpecial: false,
      origin: 'India, Egypt & Western Europe',
      weaveType: 'Certified 100% Natural Organic Weaves',
      badge: 'Natural Fibers',
      badgeVariant: 'chocolate',
      description:
        'A comprehensive library of certified pure natural fabrics: breathable long-staple cottons, artisanal mulberry handloom silks, and organic flax linens for versatile tailored creations.',
      idealFor: 'Kurtas, Casual Shirts, Traditional Ensembles, Summer Trousers',
      tags: ['100% Organic', 'Breathable Linens', 'Mulberry Silks', 'Long-Staple Cotton'],
      image:
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-amber-900 to-chocolate-900',
      isRepresentativeImage: true,
    },
    {
      id: 'suit-designer-fabrics',
      name: 'Suit and Designer Fabrics',
      category: 'Luxury Suiting',
      group: 'designer',
      isCommunitySpecial: false,
      origin: 'Biella Italy, Yorkshire UK & Indian Luxury Mills',
      weaveType: 'Superfine Worsted Wool, Brocade & Jacquard',
      badge: 'Luxury Suiting',
      badgeVariant: 'chocolate',
      description:
        'Premium worsted suiting cloths, rich brocades, and designer textile blends chosen for drape memory, wrinkle resistance, and refined surface luster.',
      idealFor: 'Executive Two-Piece Suits, Tuxedos, Blazers & Royal Festive Jackets',
      tags: ['Super 120s–160s', 'Worsted Wool', 'Royal Brocades', 'Crease Resistant'],
      image:
        'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-slate-900 to-chocolate-950',
      isRepresentativeImage: true,
    },

    // --- Retained Existing Specific Varieties ---
    {
      id: 'silks',
      name: 'Pure Mulberry & Banarasi Silks',
      category: 'Heritage Silks',
      group: 'natural',
      isCommunitySpecial: false,
      origin: 'Varanasi & Karnataka',
      weaveType: 'Handloom & Jacquard Weave',
      badge: 'Heritage Handloom',
      badgeVariant: 'maroon',
      description:
        'Lustrous, dense fabric woven with antique golden and silver zari threads. Distinguished by regal drape, rich color depth, and heirloom quality.',
      idealFor: 'Sherwanis, Wedding Kurta Ensembles, Traditional Dupattas',
      tags: ['Handloom', 'Pure Zari', 'Varanasi Weave', 'Heirloom Quality'],
      image:
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-maroon-900 to-amber-900',
      isRepresentativeImage: true,
    },
    {
      id: 'linens',
      name: 'European & Irish Pure Linens',
      category: 'Pure Flax',
      group: 'natural',
      isCommunitySpecial: false,
      origin: 'Normandy & Ireland',
      weaveType: '60s & 80s Count Plain Weave',
      badge: 'Organic Flax',
      badgeVariant: 'chocolate',
      description:
        'Natural organic flax delivering unparalleled breathability and distinctive cooling slub texture for refined summer bespoke suiting.',
      idealFor: 'Summer Suits, Unlined Blazers, Leisure Shirts',
      tags: ['Pure Flax', 'Irish Weave', 'High Breathability', 'Summer Suiting'],
      image:
        'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-amber-900 to-chocolate-900',
      isRepresentativeImage: true,
    },
    {
      id: 'cottons',
      name: 'Egyptian Giza & Pima Cottons',
      category: 'Fine Cottons',
      group: 'natural',
      isCommunitySpecial: false,
      origin: 'Egypt & Supima USA',
      weaveType: '100s–140s 2-Ply Poplin & Twill',
      badge: 'Long-Staple',
      badgeVariant: 'chocolate',
      description:
        'Silky smooth feel against the skin, crisp collar stability, brilliant dye retention, and superior tensile durability for luxury shirts.',
      idealFor: 'Executive Boardroom Shirts, Daily Luxury',
      tags: ['Giza 2-Ply', '100s–140s Count', 'Silky Handfeel', 'Crisp Collars'],
      image:
        'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-chocolate-800 to-stone-900',
      isRepresentativeImage: true,
    },
    {
      id: 'wools',
      name: 'Super 120s – 160s Merino Wool Blends',
      category: 'Worsted Wools',
      group: 'designer',
      isCommunitySpecial: false,
      origin: 'Biella, Italy & Australia',
      weaveType: 'Worsted Twill, Sharkskin & Glen Check',
      badge: 'Four-Season',
      badgeVariant: 'chocolate',
      description:
        'Natural elasticity and four-season temperature control that drapes cleanly and resists creasing throughout active business travel.',
      idealFor: 'Two-Piece Suits, Overcoats, Tailored Trousers',
      tags: ['Super 120s–160s', 'Biella Weave', 'Wrinkle Resistant', 'Executive Suit'],
      image:
        'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-slate-900 to-chocolate-950',
      isRepresentativeImage: true,
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
      specialty: 'Bespoke Stitching, Bohra Attire, Uniforms, Suits & Alterations',
      phone: BRAND_INFO.tailoringShop.phone,
      phoneDisplay: BRAND_INFO.tailoringShop.phoneDisplay,
      whatsapp: BRAND_INFO.tailoringShop.whatsapp,
      location: BRAND_INFO.tailoringShop.location,
      hours: BRAND_INFO.workingHours,
    },
    fabricContact: {
      shop: 'Fabric Home',
      specialty: 'Rida Fabrics, Kurta-Saya Lawns, Uniform Weaves & Fine Silks',
      phone: BRAND_INFO.fabricShop.phone,
      phoneDisplay: BRAND_INFO.fabricShop.phoneDisplay,
      whatsapp: BRAND_INFO.fabricShop.whatsapp,
      location: BRAND_INFO.fabricShop.location,
      hours: BRAND_INFO.workingHours,
    },
  },
};

export default homeContent;
