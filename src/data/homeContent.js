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
    backgroundImage: null,
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
      image: null,
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
      image: null,
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
      image: '/images/tailoring/customary_attire.jpg',
      gradient: 'from-amber-950 to-chocolate-950',
      isRepresentativeImage: false,
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
      image: null,
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
      image: '/images/tailoring/bohra_uniform.jpg',
      gradient: 'from-chocolate-900 to-maroon-950',
      isRepresentativeImage: false,
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
      image: null,
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
      image: null,
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
      image: null,
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
      image: null,
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
      image: null,
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
      image: null,
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
      image: null,
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
      image: null,
      gradient: 'from-maroon-900 to-amber-950',
      isRepresentativeImage: true,
    },
    {
      id: 'kurta-saya-fabrics',
      name: 'Kurta-Saya Fabrics',
      category: 'Bohra Speciality',
      group: 'bohra',
      isCommunitySpecial: true,
      origin: 'Ahmadabad, Mumbai & Speciality Mills',
      weaveType: 'Crisp White Swiss Lawn, Egyptian Cotton & Fine Jacquard',
      badge: 'Community Speciality',
      badgeVariant: 'gold',
      description:
        'Pristine white and ivory textiles engineered for Kurta and Saya draping. High-thread-count cambrics, soft lawns, and subtle self-textured jacquards offering cool breathability.',
      idealFor: 'Bohra Men\'s Kurta & Saya, Prayer Attire, Religious & Festive Miqaats',
      tags: ['Pristine White', 'Swiss Lawn', 'Egyptian Cambric', 'Self-Jacquard Weave'],
      image: null,
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
      image: null,
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
      image: null,
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
      image: null,
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
      origin: 'India, Egypt & Speciality Centers',
      weaveType: 'Certified Natural Weaves',
      badge: 'Natural Fibers',
      badgeVariant: 'chocolate',
      description:
        'A comprehensive library of certified pure natural fabrics: breathable long-staple cottons, artisanal mulberry handloom silks, and organic flax linens for versatile tailored creations.',
      idealFor: 'Kurtas, Casual Shirts, Traditional Ensembles, Summer Trousers',
      tags: ['Natural Weaves', 'Breathable Linens', 'Mulberry Silks', 'Long-Staple Cotton'],
      image: null,
      gradient: 'from-amber-900 to-chocolate-900',
      isRepresentativeImage: true,
    },
    {
      id: 'suit-designer-fabrics',
      name: 'Suit and Designer Fabrics',
      category: 'Luxury Suiting',
      group: 'designer',
      isCommunitySpecial: false,
      origin: 'Luxury Mills & Textile Clusters',
      weaveType: 'Superfine Worsted Wool, Brocade & Jacquard',
      badge: 'Luxury Suiting',
      badgeVariant: 'chocolate',
      description:
        'Premium worsted suiting cloths, rich brocades, and designer textile blends chosen for drape memory, wrinkle resistance, and refined surface luster.',
      idealFor: 'Executive Two-Piece Suits, Tuxedos, Blazers & Royal Festive Jackets',
      tags: ['Superfine Count', 'Worsted Wool', 'Royal Brocades', 'Crease Resistant'],
      image: null,
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
      image: null,
      gradient: 'from-maroon-900 to-amber-900',
      isRepresentativeImage: true,
    },
    {
      id: 'linens',
      name: 'European & Irish Pure Linens',
      category: 'Pure Flax',
      group: 'natural',
      isCommunitySpecial: false,
      origin: 'Speciality Flax Centers',
      weaveType: 'Plain Weave',
      badge: 'Organic Flax',
      badgeVariant: 'chocolate',
      description:
        'Natural organic flax delivering unparalleled breathability and distinctive cooling slub texture for refined summer bespoke suiting.',
      idealFor: 'Summer Suits, Unlined Blazers, Leisure Shirts',
      tags: ['Pure Flax', 'High Breathability', 'Summer Suiting'],
      image: null,
      gradient: 'from-amber-900 to-chocolate-900',
      isRepresentativeImage: true,
    },
    {
      id: 'cottons',
      name: 'Fine Long-Staple Cottons',
      category: 'Fine Cottons',
      group: 'natural',
      isCommunitySpecial: false,
      origin: 'Speciality Cotton Mills',
      weaveType: 'Poplin & Twill Weave',
      badge: 'Long-Staple',
      badgeVariant: 'chocolate',
      description:
        'Silky smooth feel against the skin, crisp collar stability, brilliant dye retention, and superior tensile durability for luxury shirts.',
      idealFor: 'Executive Boardroom Shirts, Daily Luxury',
      tags: ['Long-Staple', 'Silky Handfeel', 'Crisp Collars'],
      image: null,
      gradient: 'from-chocolate-800 to-stone-900',
      isRepresentativeImage: true,
    },
    {
      id: 'wools',
      name: 'Worsted Suiting Wool Blends',
      category: 'Worsted Wools',
      group: 'designer',
      isCommunitySpecial: false,
      origin: 'Speciality Suiting Mills',
      weaveType: 'Worsted Twill, Sharkskin & Glen Check',
      badge: 'Four-Season',
      badgeVariant: 'chocolate',
      description:
        'Natural elasticity and four-season temperature control that drapes cleanly and resists creasing throughout active business travel.',
      idealFor: 'Two-Piece Suits, Overcoats, Tailored Trousers',
      tags: ['Worsted Wool', 'Wrinkle Resistant', 'Executive Suit'],
      image: null,
      gradient: 'from-slate-900 to-chocolate-950',
      isRepresentativeImage: true,
    },
  ],

  // 5. Gallery Preview (Sample Selection of Photographs)
  galleryPreview: [
    {
      id: 1,
      title: "Bohra Men's Kurta & Saya Ensemble",
      shop: 'Tailoring Home',
      category: 'tailoring',
      tag: 'Bespoke Tailoring',
      description: 'Master-tailored traditional Kurta and flowing Saya cut from pristine Swiss lawn.',
      image: '/images/tailoring/customary_attire.jpg',
      gradient: 'from-amber-950 to-chocolate-950',
    },
    {
      id: 2,
      title: 'MSB School Uniform Tailoring',
      shop: 'Tailoring Home',
      category: 'tailoring',
      tag: 'School Uniform',
      description: 'Official uniform tailoring for Madrasa Saifiyah Burhaniyah (MSB) students with reinforced seams.',
      image: '/images/tailoring/bohra_uniform.jpg',
      gradient: 'from-chocolate-900 to-maroon-950',
    },
    {
      id: 3,
      title: 'Fine Silk & Cotton Textile Swatches',
      shop: 'Fabric Home',
      category: 'fabric',
      tag: 'Textile Variety',
      description: 'Curated selection of pure natural silks, linens, and soft cotton lawn swatches.',
      image: null,
      gradient: 'from-maroon-900 to-amber-950',
    },
    {
      id: 4,
      title: 'Worsted Suiting & Festive Brocades',
      shop: 'Fabric Home',
      category: 'fabric',
      tag: 'Textile Variety',
      description: 'Structured worsted wools and heritage brocades selected for custom suiting and regalia.',
      image: null,
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
      'Visit our twin showrooms to inspect fabric swatches in person or discuss tailoring requirements.',
    notice:
      'Visiting hours, boutique addresses and direct inquiry lines will be officially published upon store launch.',
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
