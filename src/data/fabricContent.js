/**
 * Fabric Home Data Store
 * Decoupled content for the dedicated Fabric Home catalogue page.
 * Keeps all photography URLs, specifications, categories, and placeholders
 * ready for future Firebase Firestore integration.
 */

import { ROUTES, BRAND_INFO } from '../constants/navigation';

export const fabricContent = {
  // 1. Hero Section
  hero: {
    badge: 'Textile Archive & Swatch Repository',
    headline: 'Curated Luxury Textiles, Traditional Weaves & Fine Drapery',
    subheadline:
      'The comprehensive textile repository of Fabric Home. Sourcing authentic Rida prints, pristine Kurta-Saya Swiss lawns, approved MSB & ABN school uniform textiles, pure Banarasi silks, European linens, and Italian worsted suiting wools.',
    backgroundImage: null,
    fallbackGradient: 'from-chocolate-950 via-chocolate-900 to-maroon-950',
    highlights: [
      '100% Certified Natural Fibers',
      'Exclusive Rida Prints & Jodi Fabrics',
      'Approved MSB & ABN Uniform Textiles',
      'In-Person Swatch Consultation',
    ],
    quickNav: [
      { label: 'Bohra Specialities', href: '#bohra-fabrics' },
      { label: 'School Uniforms (MSB & ABN)', href: '#uniform-fabrics' },
      { label: 'General Collections', href: '#general-fabrics' },
      { label: 'Purity Standards', href: '#purity-pledge' },
      { label: 'Swatch Inquiries', href: '#swatch-consultation' },
    ],
  },

  // 2. Bohra Speciality Fabrics (Prominent Community Visibility)
  bohraFabrics: {
    id: 'bohra-fabrics',
    eyebrow: 'Community Speciality',
    title: 'Bohra Speciality Fabrics',
    subtitle:
      'Handpicked textiles meeting the unique aesthetic and practical standards of the Dawoodi Bohra community. From vibrant Rida materials to immaculate Kurta-Saya white yardage.',
    communityBadge: 'Dawoodi Bohra Tradition',
    notice:
      'Sample previews shown below. Swatches are available for in-person tactile inspection at our boutique.',
    items: [
      {
        id: 'rida-fabrics-prints',
        title: 'Rida Fabrics & Jodi Prints',
        badge: 'Featured Speciality',
        badgeVariant: 'gold',
        isCommunitySpecial: true,
        weave: 'Printed Soft Cottons, Rayons & Fine Lawns',
        origin: 'Surat, Mumbai & Speciality Textile Centers',
        description:
          'Vibrant floral prints, harmonious pastel palettes, delicate polka dots, and coordinated jodi fabrics selected specifically for Pardi and Ghagra crafting.',
        details: [
          'Colorfast dyes that retain brilliance after washing',
          'Soft hand-feel with comfortable all-day drape',
          'Matching base and panel print combinations',
          'Widths suited for efficient pardi and ghagra cutting',
        ],
        idealFor: 'Everyday Ridas, Miqaat Wear, Coordinated Jodis',
        tags: ['Floral Prints', 'Soft Cotton', 'Jodi Fabrics', 'Colorfast', 'Rida Speciality'],
        image: null,
        gradient: 'from-maroon-900 to-amber-950',
        inquirySubject: 'Rida Fabrics & Jodi Prints',
        isRepresentativeImage: false,
      },
      {
        id: 'rida-designer-panels',
        title: 'Rida Panels, Chiffons & Lace Trims',
        badge: 'Boutique Collection',
        badgeVariant: 'gold',
        isCommunitySpecial: true,
        weave: 'French Chiffon, Satin, Embroidered Lace & Organza',
        origin: 'Artisanal Lace Clusters & Craft Mills',
        description:
          'Delicate border laces, crochet trims, self-embossed panels, and floating French chiffons designed to elevate bespoke Rida designs.',
        details: [
          'Intricate scallop border laces and crochet insertions',
          'Soft non-chafing face-frame trims for Pardis',
          'Embroidered cutwork and organza embellishments',
          'Pre-shrunk lace yardage ready for tailoring',
        ],
        idealFor: 'Pardi Flaps, Ghagra Border Accents, Festive Ridas',
        tags: ['Border Laces', 'Crochet Trims', 'French Chiffon', 'Organza Panels'],
        image: null,
        gradient: 'from-amber-950 to-maroon-950',
        inquirySubject: 'Rida Panels, Chiffons & Lace Trims',
        isRepresentativeImage: false,
      },
      {
        id: 'kurta-saya-fabrics',
        title: 'Kurta-Saya Fabrics',
        badge: 'Community Speciality',
        badgeVariant: 'gold',
        isCommunitySpecial: true,
        weave: 'Swiss Lawn, Egyptian Cotton & Fine Jacquard',
        origin: 'Ahmadabad, Mumbai & Switzerland',
        description:
          'Pristine white and soft ivory textiles engineered for Kurta and Saya draping. High-thread-count cambrics, cool Swiss lawns, and subtle self-textured jacquards.',
        details: [
          'Pristine optical white and natural soft ivory tones',
          'High yarn count delivering cool tropical breathability',
          'Subtle self-jacquard and micro-stripe textures',
          'Optimal drape weight that lays smoothly over the body',
        ],
        idealFor: "Bohra Men's Kurta & Saya, Daily Prayers, Festive Miqaats",
        tags: ['Pristine White', 'Swiss Lawn', 'Egyptian Cambric', 'Self-Jacquard', 'Prayer Wear'],
        image: null,
        gradient: 'from-stone-900 to-chocolate-950',
        inquirySubject: 'Kurta-Saya Fabrics',
        isRepresentativeImage: false,
      },
      {
        id: 'izaar-fabrics',
        title: 'Izaar Fabrics & Cambrics',
        badge: 'Community Speciality',
        badgeVariant: 'gold',
        isCommunitySpecial: true,
        weave: 'Durable Cambric, Fine Poplin & Self-Stripe Weaves',
        origin: 'Leading Indian Textile Mills',
        description:
          'Soft yet resilient unstitched cottons in pure whites, subtle self-stripes, and traditional woven borders tailored for comfortable daily and occasion Izaar wear.',
        details: [
          'Durable weave resistant to abrasion and frequent laundering',
          'Smooth skin-friendly surface minimizing friction',
          'Pre-washed to minimize post-stitch shrinkage',
          'Available with woven traditional border selvedges',
        ],
        idealFor: 'Traditional Izaars, Pajama Bottoms, Lightweight Daily Prayer Wear',
        tags: ['Pure White Cotton', 'Durable Cambric', 'Woven Border', 'Soft Poplin'],
        image: null,
        gradient: 'from-amber-950 to-chocolate-900',
        inquirySubject: 'Izaar Fabrics',
        isRepresentativeImage: false,
      },
    ],
  },

  // 3. School Uniform Fabrics (MSB & ABN Kept Separate)
  schoolUniformFabrics: {
    id: 'uniform-fabrics',
    eyebrow: 'Campus & Institutional',
    title: 'School Uniform Fabrics',
    subtitle:
      'Approved regulation uniform textiles for MSB and ABN students, engineered for durability, colorfastness, and all-day classroom comfort.',
    notice:
      'Important Notice: Textiles are selected in accordance with respective school uniform dress codes. Fabrics are provided as per current academic session requirements. Please consult us with your school branch details.',
    institutions: [
      {
        id: 'msb-uniform-fabrics',
        title: 'MSB Uniform Fabrics',
        schoolName: 'Madrasa Saifiyah Burhaniyah (MSB)',
        badge: 'MSB Regulation',
        badgeVariant: 'maroon',
        isCommunitySpecial: true,
        weave: 'High-Tensile Cotton-Poly Blend & Drill Weave',
        origin: 'Certified Institutional Textile Mills',
        description:
          'Regulation fabrics conforming to Madrasa Saifiyah Burhaniyah (MSB) approved color shades and weave durability. Breathable, colorfast, and pill-resistant for students across all grades.',
        details: [
          'Conforms to MSB approved regulation color shades',
          'High tensile strength to withstand active campus wear',
          'Anti-pilling finish that maintains neatness through repeated washing',
          'Breathable weave ensuring comfort in warm classrooms',
          "Suitability for both boys' shirting/trousers and girls' uniform sets",
        ],
        idealFor: "MSB Boys' & Girls' School Uniforms, Shirts, Trousers & Pinafores",
        tags: ['MSB Approved Shade', 'High-Tensile Weave', 'Anti-Pill', 'Colorfast', 'Grades 1-12'],
        image: null,
        gradient: 'from-chocolate-900 to-maroon-950',
        inquirySubject: 'MSB Uniform Fabrics',
        isRepresentativeImage: false,
      },
      {
        id: 'abn-uniform-fabrics',
        title: 'ABN Uniform Fabrics',
        schoolName: 'Al Madrasa (ABN) Standards',
        badge: 'ABN Regulation',
        badgeVariant: 'maroon',
        isCommunitySpecial: true,
        weave: 'Heavy-Duty Shirting & Suiting Uniform Twill',
        origin: 'Certified Institutional Weavers',
        description:
          'Approved regulation fabrics conforming to Al Madrasa (ABN) school specifications. Tested for tear strength, long-term wash resilience, and day-long classroom comfort.',
        details: [
          'Tested against ABN campus uniform shade requirements',
          'Tear-resistant twill construction for daily campus utility',
          'Easy-care, wrinkle-resistant finish for crisp appearance',
          'Color-locked dyeing ensuring zero fading under regular sun exposure',
          'Available in yardage for shirts, pants, and pinafores',
        ],
        idealFor: 'ABN Campus Uniforms, Student Shirting & Trousers',
        tags: ['ABN Standard Shade', 'Heavy-Duty Twill', 'Tear-Resistant', 'Easy-Care', 'Campus Wear'],
        image: null,
        gradient: 'from-maroon-950 to-chocolate-900',
        inquirySubject: 'ABN Uniform Fabrics',
        isRepresentativeImage: false,
      },
    ],
  },

  // 4. General Fabric Collections (Cotton, Silk, Linen, Suiting, Designer & Other)
  generalFabrics: {
    id: 'general-fabrics',
    eyebrow: 'Textile Archive',
    title: 'General Fabric Collections',
    subtitle:
      'A rich spectrum of natural fibers, heritage handlooms, fine suiting materials, and ornamental designer textiles available by the meter.',
    filterTabs: [
      { id: 'all', label: 'All Collections' },
      { id: 'cotton', label: 'Cotton' },
      { id: 'silk', label: 'Silk' },
      { id: 'linen', label: 'Linen' },
      { id: 'suiting', label: 'Suit Materials' },
      { id: 'designer', label: 'Designer & Embroidered' },
      { id: 'other', label: 'Other Varieties' },
    ],
    items: [
      // Cotton
      {
        id: 'cotton-giza-supima',
        title: 'Egyptian Giza & Supima Cottons',
        category: 'Cotton',
        group: 'cotton',
        badge: 'Long-Staple Cotton',
        badgeVariant: 'chocolate',
        weave: '100s–140s 2-Ply Poplin, Twill & Dobby',
        origin: 'Egypt & Supima USA',
        description:
          'Extra-long staple cotton fibers spun into silky smooth, breathable shirting fabrics with superior tensile strength and brilliant color absorption.',
        details: [
          'Silky handfeel comparable to fine silk',
          'Crisp collar stability and neat placket folds',
          'Exceptional moisture absorption and breathability',
          'Resistant to fraying and fiber pilling',
        ],
        idealFor: 'Executive Boardroom Shirts, Daily Luxury Kurtas, Casual Tops',
        tags: ['Giza 100s-140s', '2-Ply Yarn', 'Silky Smooth', 'Breathable', 'Pure Cotton'],
        image: null,
        gradient: 'from-chocolate-800 to-stone-900',
        inquirySubject: 'Egyptian Giza & Supima Cottons',
        isRepresentativeImage: false,
      },
      {
        id: 'cotton-cambric-mulmul',
        title: 'Pure Cotton Cambrics & Soft Mulmul',
        category: 'Cotton',
        group: 'cotton',
        badge: 'Lightweight Cotton',
        badgeVariant: 'chocolate',
        weave: 'Fine Count Plain Weave & Voile',
        origin: 'Coimbatore & Gujarat',
        description:
          'Featherlight, breathable unstitched cottons in soothing pastels and whites, perfect for warm weather kurtas, linings, and daily loungewear.',
        details: [
          'Ultra-soft gossamer touch against sensitive skin',
          'Unrestricted airflow for maximum summer cooling',
          'Easy to dye, block-print, or embroider',
          'Ideal lightweight lining for heavy silk ensembles',
        ],
        idealFor: 'Summer Kurtas, Inner Linings, Daily Tunics, Nightwear',
        tags: ['Mulmul', 'Fine Cambric', 'Featherlight', 'Summer Cooling'],
        image: null,
        gradient: 'from-amber-950 to-chocolate-900',
        inquirySubject: 'Cotton Cambrics & Soft Mulmul',
        isRepresentativeImage: false,
      },

      // Silk
      {
        id: 'silk-banarasi-katan',
        title: 'Pure Banarasi & Katan Silks',
        category: 'Silk',
        group: 'silk',
        badge: 'Heritage Silk',
        badgeVariant: 'maroon',
        weave: 'Handloom Jacquard with Antique Zari',
        origin: 'Varanasi, Uttar Pradesh',
        description:
          'Lustrous pure silk yarns intertwined with antique gold and silver zari threads, creating majestic floral jaals, paisleys, and regal border motifs.',
        details: [
          'Woven on traditional pit and jacquard handlooms',
          'Authentic zari tested for metal purity and luster',
          'Dense body and regal weight for structured silhouettes',
          'Heirloom-grade fabric that gains character with time',
        ],
        idealFor: 'Wedding Sherwanis, Regal Kurtas, Festive Dupattas & Lehengas',
        tags: ['Pure Silk', 'Banarasi Zari', 'Handloom', 'Heirloom Quality', 'Royal Fabric'],
        image: null,
        gradient: 'from-maroon-900 to-amber-900',
        inquirySubject: 'Banarasi & Katan Silks',
        isRepresentativeImage: false,
      },
      {
        id: 'silk-mulberry-tussar',
        title: 'Raw Mulberry, Tussar & Matka Silks',
        category: 'Silk',
        group: 'silk',
        badge: 'Artisanal Silk',
        badgeVariant: 'maroon',
        weave: 'Textured Wild Silk Plain Weave',
        origin: 'Karnataka & West Bengal',
        description:
          'Characterized by an organic slub texture, subtle natural sheen, and rich tactile warmth. Combines timeless elegance with breathable comfort.',
        details: [
          'Distinctive organic uneven texture (slub effect)',
          'Subtle non-glossy natural sheen',
          'High thermal adaptability (cool in summer, warm in winter)',
          'Sturdy drape suited for jackets and structured kurtas',
        ],
        idealFor: 'Nehru Jackets, Bandhgalas, Festive Kurtas, Modest Tunics',
        tags: ['Tussar Silk', 'Raw Silk', 'Organic Slub', 'Bandhgala Fabric'],
        image: null,
        gradient: 'from-amber-950 to-maroon-900',
        inquirySubject: 'Mulberry, Tussar & Matka Silks',
        isRepresentativeImage: false,
      },

      // Linen
      {
        id: 'linen-irish-french',
        title: 'European & Irish Pure Linens',
        category: 'Linen',
        group: 'linen',
        badge: 'Organic Flax',
        badgeVariant: 'chocolate',
        weave: '60s & 80s Count Plain Weave',
        origin: 'Normandy, France & Ireland',
        description:
          '100% certified organic flax delivering unparalleled air permeability and distinctive cooling slub texture for refined summer tailoring.',
        details: [
          'Pure flax fiber grown in Normandy and Ireland',
          'Natural moisture wicking and hypoallergenic qualities',
          'Becomes noticeably softer with every wash and wear',
          'Rich earthy, pastel, and natural undyed color palettes',
        ],
        idealFor: 'Summer Suits, Unlined Blazers, Casual Leisure Shirts, Trousers',
        tags: ['Pure Flax', 'Irish Linen', 'High Breathability', 'Summer Suiting', 'Eco-Friendly'],
        image: null,
        gradient: 'from-amber-900 to-chocolate-900',
        inquirySubject: 'European & Irish Pure Linens',
        isRepresentativeImage: false,
      },
      {
        id: 'linen-blends',
        title: 'Linen-Silk & Linen-Cotton Blends',
        category: 'Linen',
        group: 'linen',
        badge: 'Hybrid Textile',
        badgeVariant: 'chocolate',
        weave: 'Fine Mixed Weave',
        origin: 'Western India & Italy',
        description:
          'Harmonious blends uniting the crisp cooling nature of linen with the crease recovery of fine cotton or the subtle luster of pure silk.',
        details: [
          'Reduced creasing compared to 100% pure linen',
          'Soft handfeel with structured drape memory',
          'Subtle sheen from the incorporated silk filament',
          'Versatile for both casual and semi-formal wear',
        ],
        idealFor: 'Safari Suits, Waistcoats, Semi-Formal Shirts, Summer Trousers',
        tags: ['Linen Blend', 'Silk-Linen', 'Low Crease', 'Safari Suiting'],
        image: null,
        gradient: 'from-chocolate-900 to-amber-950',
        inquirySubject: 'Linen Blends',
        isRepresentativeImage: false,
      },

      // Suit Materials
      {
        id: 'suit-materials-wool',
        title: 'Super 120s–160s Merino Suiting Wools',
        category: 'Suit Materials',
        group: 'suiting',
        badge: 'Luxury Suiting',
        badgeVariant: 'chocolate',
        weave: 'Worsted Twill, Sharkskin & Glen Plaid',
        origin: 'Biella, Italy & Yorkshire, UK',
        description:
          'Superfine worsted wool cloths engineered for executive tailoring. Renowned for natural wrinkle recovery, four-season comfort, and flawless silhouette drape.',
        details: [
          'Superfine 120s to 160s fiber diameter for ultra-smooth handle',
          'Four-season natural climate and temperature regulation',
          'Natural elasticity ensuring crease recovery after travel',
          'Available in classic solids, chalk stripes, and subtle houndstooth',
        ],
        idealFor: 'Two-Piece Suits, Three-Piece Suits, Executive Tuxedos, Trousers',
        tags: ['Super 120s-160s', 'Worsted Wool', 'Executive Suit', 'Crease Recovery', 'Italian Cloth'],
        image: null,
        gradient: 'from-slate-900 to-chocolate-950',
        inquirySubject: 'Super 120s-160s Merino Suiting Wools',
        isRepresentativeImage: false,
      },
      {
        id: 'suit-materials-hopsack',
        title: 'Tropical Hopsack & Blazer Cloths',
        category: 'Suit Materials',
        group: 'suiting',
        badge: 'Blazer Cloth',
        badgeVariant: 'chocolate',
        weave: 'Open Basketweave Hopsack',
        origin: 'Leading Suiting Mills',
        description:
          'Open-weave wool and wool-blend hopsack delivering superior airflow, textured visual depth, and excellent crease resistance for versatile blazers.',
        details: [
          'Open porous weave allowing continuous air ventilation',
          'Rich tactile texture that pairs effortlessly with trousers',
          'High wrinkle resistance making it ideal for business travel',
          'Available in classic navy, bottle green, charcoal and tan',
        ],
        idealFor: 'Year-Round Blazers, Club Jackets, Travel Sport Coats',
        tags: ['Hopsack', 'Blazer Cloth', 'Open Weave', 'Travel Friendly'],
        image: null,
        gradient: 'from-chocolate-950 to-maroon-950',
        inquirySubject: 'Tropical Hopsack & Blazer Cloths',
        isRepresentativeImage: false,
      },

      // Designer & Embroidered
      {
        id: 'designer-brocades-jacquards',
        title: 'Heritage Brocades & Ornamental Jacquards',
        category: 'Designer & Embroidered',
        group: 'designer',
        badge: 'Ornamental Weave',
        badgeVariant: 'maroon',
        weave: 'Extra-Weft Ornamental Tapestry & Jacquard',
        origin: 'Varanasi & Western India',
        description:
          'Richly detailed raised motifs woven with antique gold, copper, and silver zari threads on fine silk and satin grounds. Ideal for statement festive garments.',
        details: [
          'Intricate architectural and floral damask patterns',
          'Embossed 3D tactile surface effect',
          'Heavy drape suitable for structured tailoring',
          'High color fastness with authentic metallic thread finishes',
        ],
        idealFor: 'Sherwanis, Wedding Bandhgalas, Festive Jackets, Designer Borders',
        tags: ['Brocade', 'Ornamental Jacquard', 'Zari Motifs', 'Festive Statement', 'Wedding Cloth'],
        image: null,
        gradient: 'from-maroon-900 to-amber-950',
        inquirySubject: 'Heritage Brocades & Ornamental Jacquards',
        isRepresentativeImage: false,
      },
      {
        id: 'designer-embroidered-chikankari',
        title: 'Hand-Embroidered Chikankari & Appliqué',
        category: 'Designer & Embroidered',
        group: 'designer',
        badge: 'Artisanal Craft',
        badgeVariant: 'maroon',
        weave: 'Hand Needlework on Pure Georgette & Muslin',
        origin: 'Lucknow & Gujarat',
        description:
          'Delicate tone-on-tone and shadow needlework handcrafted by master artisans on sheer cottons and georgettes for ethereal, graceful festive wear.',
        details: [
          'Traditional shadow work, phanda, and tepchi stitches',
          'Tone-on-tone white or subtle pastel colorways',
          'Pure georgette and organza sheer bases',
          'Pre-washed to protect delicate thread tension',
        ],
        idealFor: 'Festive Kurtas, Designer Rida Panels, Embroidered Dupattas',
        tags: ['Chikankari', 'Hand Embroidery', 'Shadow Work', 'Delicate Craft'],
        image: null,
        gradient: 'from-amber-950 to-chocolate-950',
        inquirySubject: 'Hand-Embroidered Chikankari & Appliqué',
        isRepresentativeImage: false,
      },

      // Other Varieties
      {
        id: 'other-velvet-corduroy',
        title: 'Micro-Velvet, Corduroy & Suede Weaves',
        category: 'Other Varieties',
        group: 'other',
        badge: 'Textured Pile',
        badgeVariant: 'chocolate',
        weave: 'Cut-Pile Velvet & Fine Wale Corduroy',
        origin: 'Specialized Mills',
        description:
          'Plush, light-catching micro-velvets and fine-wale corduroys offering deep jewel tones, structured body, and luxurious tactile warmth.',
        details: [
          'Dense plush pile with minimal shading or crushing',
          'Deep saturated jewel tones (navy, maroon, emerald, black)',
          'Structured silhouette retention for jackets and collars',
          'Soft non-abrasive cotton backing',
        ],
        idealFor: 'Winter Bandhgalas, Smoking Jackets, Velvet Collars & Lapels',
        tags: ['Micro-Velvet', 'Corduroy', 'Jewel Tones', 'Winter Suiting'],
        image: null,
        gradient: 'from-chocolate-950 to-maroon-950',
        inquirySubject: 'Micro-Velvet, Corduroy & Suede Weaves',
        isRepresentativeImage: false,
      },
      {
        id: 'other-linings-interfacings',
        title: 'Bemberg Silk & Breathable Viscose Linings',
        category: 'Other Varieties',
        group: 'other',
        badge: 'Sartorial Linings',
        badgeVariant: 'chocolate',
        weave: 'Cupro & High-Grade Breathable Twill',
        origin: 'Japan & Italy',
        description:
          'Static-free Cupro Bemberg and fine viscose jacquard linings that glide effortlessly over shirts, preventing friction and elevating garment comfort.',
        details: [
          '100% natural cellulose Cupro Bemberg (anti-static)',
          'Silky low-friction glide for effortless wear',
          'High moisture dissipation keeping the body cool',
          'Custom jacquard, paisley, and two-tone shot silk patterns',
        ],
        idealFor: 'Jacket Linings, Waistcoat Backs, Pocket Bags & Facings',
        tags: ['Cupro Bemberg', 'Anti-Static', 'Jacket Lining', 'Breathable Viscose'],
        image: null,
        gradient: 'from-stone-900 to-chocolate-950',
        inquirySubject: 'Bemberg Silk & Viscose Linings',
        isRepresentativeImage: false,
      },
    ],
  },

  // 5. Fabric Purity Standards
  purityStandards: [
    {
      title: '100% Fiber Certified',
      desc: 'Strict yarn authenticity standards across our silks, linens, wools, and cottons. Zero synthetic adulteration in our pure natural collections.',
      icon: 'ShieldCheck',
    },
    {
      title: 'Pre-Shrunk & Colorfast',
      desc: 'Treated, washed, and color-tested so your tailored bespoke garments maintain dimensions and dye radiance after dry cleaning.',
      icon: 'Feather',
    },
    {
      title: 'Direct Mill Provenance',
      desc: 'Direct partnerships with certified weavers in Varanasi, Normandy, Biella, and Surat eliminate intermediaries and ensure authentic heritage provenance.',
      icon: 'Droplet',
    },
  ],

  // 6. Contact & Swatch Inquiries
  contact: {
    badge: 'Textile Consultations & Swatches',
    title: 'Touch & Feel the Weave in Person',
    subtitle:
      'Visit our textile showroom to inspect swatch cards, feel drape weights, and coordinate your fabric with our in-house master tailors.',
    notice:
      'Note: Contact numbers, WhatsApp links and boutique addresses below are temporary demonstration placeholders until verified business details are updated.',
    phone: BRAND_INFO.fabricShop.phone,
    phoneDisplay: BRAND_INFO.fabricShop.phoneDisplay,
    whatsapp: BRAND_INFO.fabricShop.whatsapp,
    whatsappUrl: BRAND_INFO.fabricShop.whatsapp
      ? `https://wa.me/${BRAND_INFO.fabricShop.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
          'Hello Fabric Home, I would like to inquire about fabric varieties and swatches.'
        )}`
      : null,
    location: BRAND_INFO.fabricShop.location,
    hours: BRAND_INFO.workingHours,
    companionShop: {
      title: 'Need Master Stitching?',
      desc: 'Visit our sister atelier Tailoring Home under the same roof for bespoke stitching, Bohra traditional attire, MSB/ABN uniforms, suits, and alterations.',
      ctaText: 'Explore Tailoring Services',
      ctaTo: ROUTES.TAILORING,
    },
  },
};

export default fabricContent;

