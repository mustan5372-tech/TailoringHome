/**
 * Gallery Content & Showcase Data Store
 * Decoupled data store for the dedicated Gallery page.
 * Keeps all photography paths, shop entities, tags, and placeholder flags
 * ready for future Firebase Firestore integration.
 */

import { BRAND_INFO } from '../constants/navigation';

export const galleryContent = {
  // Page Header & Overview
  header: {
    badge: 'Visual Archive & Retrospective',
    headline: 'Craftsmanship & Textile Showcase',
    subheadline:
      'Explore bespoke tailored creations from Tailoring Home alongside handpicked luxury fabrics and traditional community textiles from Fabric Home.',
    notice:
      'Where actual boutique photographs are pending, items are marked with "Sample Preview" to represent the weave or tailoring silhouette accurately.',
  },

  // Primary Filter Tabs
  filterTabs: [
    { id: 'all', label: 'All Collections' },
    { id: 'tailoring', label: 'Tailoring Home', entity: 'Tailoring Home' },
    { id: 'fabric', label: 'Fabric Home', entity: 'Fabric Home' },
  ],

  // Gallery Showcase Items
  items: [
    // --- TAILORING HOME ITEMS ---
    {
      id: 'gallery-customary-attire',
      title: "Bohra Men's Kurta & Saya Ensemble",
      shop: 'Tailoring Home',
      category: 'tailoring',
      subCategory: 'bohra',
      badge: 'Community Heritage',
      badgeVariant: 'gold',
      isCommunitySpecial: true,
      description:
        'Master-tailored traditional Kurta and flowing Saya cut from pristine Swiss lawn. Features clean-finished band collar, seamless placket, and proportioned prayer-ease side slits.',
      details: [
        'Anatomically balanced shoulder drape',
        'Traditional internal miswak pocket',
        'Reinforced side slits for prayer comfort',
        'Hand-finished loop closures',
      ],
      tags: ['Kurta-Saya', 'Bohra Traditional', 'Swiss Lawn', 'Prayer Attire'],
      image: '/images/tailoring/customary_attire.jpg',
      gradient: 'from-amber-950 to-chocolate-950',
      isRepresentativeImage: false, // User provided real boutique image
      inquirySubject: "Bohra Men's Kurta & Saya Ensemble",
    },
    {
      id: 'gallery-bohra-uniform',
      title: 'MSB School Uniform Tailoring',
      shop: 'Tailoring Home',
      category: 'tailoring',
      subCategory: 'uniform',
      badge: 'School Uniform',
      badgeVariant: 'maroon',
      isCommunitySpecial: true,
      description:
        'Official uniform tailoring for Madrasa Saifiyah Burhaniyah (MSB) students. Built with reinforced double seams, durable collar interfacings, and growth allowances.',
      details: [
        'Tailored to MSB approved regulation dress codes',
        'Reinforced bar-tacking on pocket stress points',
        'Generous inner seam margins for growing students',
        'Wash-resilient stitching that holds shape',
      ],
      tags: ['MSB Uniform', 'Student Wear', 'Reinforced Fit', 'Campus Standard'],
      image: '/images/tailoring/bohra_uniform.jpg',
      gradient: 'from-chocolate-900 to-maroon-950',
      isRepresentativeImage: false, // User provided real boutique image
      inquirySubject: 'MSB School Uniform Tailoring',
    },
    {
      id: 'gallery-rida-crafting',
      title: 'Artisanal Two-Piece Bohra Rida',
      shop: 'Tailoring Home',
      category: 'tailoring',
      subCategory: 'bohra',
      badge: 'Community Traditional',
      badgeVariant: 'gold',
      isCommunitySpecial: true,
      description:
        'Bespoke crafting of traditional Rida with harmonious Pardi and Ghagra coordination, precise lace border appliqué, delicate scallop edging, and soft facial facings.',
      details: [
        'Flawless panel matching across jodis',
        'Custom face and neck opening calibrated to client',
        'Concealed deep side pockets in Ghagra',
        'Pucker-free curved lace attachments',
      ],
      tags: ['Rida Crafting', 'Pardi & Ghagra', 'Lace Appliqué', 'Bespoke Stitch'],
      image:
        'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80',
      gradient: 'from-maroon-900 to-amber-950',
      isRepresentativeImage: true,
      inquirySubject: 'Two-Piece Bohra Rida Crafting',
    },
    {
      id: 'gallery-collar-shirt',
      title: 'Custom Sartorial Egyptian Cotton Shirt',
      shop: 'Tailoring Home',
      category: 'tailoring',
      subCategory: 'formal',
      badge: 'Bespoke Cut',
      badgeVariant: 'chocolate',
      isCommunitySpecial: false,
      description:
        'Hand-cut dress shirt tailored from 120s 2-ply Egyptian cotton. Features a semi-spread collar, split back yoke, single-needle French seams, and mother-of-pearl buttons.',
      details: [
        'Semi-spread collar with removable brass stays',
        'Split back yoke tailored to shoulder incline',
        'Single-needle side seams with reinforcement gussets',
        'Monogrammed left cuff embroidery',
      ],
      tags: ['Egyptian Cotton', 'French Seams', 'Bespoke Shirt', 'Split Yoke'],
      image: '/images/tailoring/collar_shirt.jpg',
      gradient: 'from-chocolate-900 to-stone-900',
      isRepresentativeImage: false, // User provided real boutique image
      inquirySubject: 'Custom Sartorial Egyptian Cotton Shirt',
    },
    {
      id: 'gallery-wardrobe-blazers',
      title: 'Structured Blazers & Suiting Atelier',
      shop: 'Tailoring Home',
      category: 'tailoring',
      subCategory: 'formal',
      badge: 'Master Tailoring',
      badgeVariant: 'chocolate',
      isCommunitySpecial: false,
      description:
        'Hand-canvassed single and double-breasted blazers cut from superfine worsted wool and hopsack cloth. Shaped to client anatomy for confident boardroom poise.',
      details: [
        'Floating horsehair canvas chest piece',
        'Functional four-button surgical cuffs',
        'Soft natural shoulder construction',
        'Contrast interior piping and ticket pocket',
      ],
      tags: ['Tailored Blazer', 'Worsted Wool', 'Hand-Canvassed', 'Executive Wear'],
      image: '/images/tailoring/wardrobe.jpg',
      gradient: 'from-chocolate-950 to-maroon-950',
      isRepresentativeImage: false, // User provided real boutique image
      inquirySubject: 'Structured Blazers & Suiting Atelier',
    },
    {
      id: 'gallery-children-attire',
      title: "Children's Traditional Attire & Junior Kurtas",
      shop: 'Tailoring Home',
      category: 'tailoring',
      subCategory: 'children',
      badge: 'Comfort Fit',
      badgeVariant: 'chocolate',
      isCommunitySpecial: false,
      description:
        'Junior traditional garments designed with zero-scratch cotton voiles interior linings, soft elastic waistbands, and generous 1.5-inch growth seam allowances.',
      details: [
        'Zero-friction cotton voiles interior facings',
        'Growth-friendly seam margins for growing kids',
        'Child-safe smooth closures and soft necklines',
        'Breathable pure natural cotton fabrics',
      ],
      tags: ['Children Ethnic', 'Junior Kurta', 'Growth Margin', 'Comfort Lining'],
      image: '/images/tailoring/apparel_1.jpg',
      gradient: 'from-amber-950 to-chocolate-900',
      isRepresentativeImage: false, // User provided real boutique image
      inquirySubject: "Children's Traditional Attire",
    },
    {
      id: 'gallery-trousers-folded',
      title: 'Tailored Pleated Trousers & Chinos',
      shop: 'Tailoring Home',
      category: 'tailoring',
      subCategory: 'formal',
      badge: 'Anatomical Fit',
      badgeVariant: 'chocolate',
      isCommunitySpecial: false,
      description:
        'Precision tailored trousers with extended tab waistbands, brass side adjusters, curtained interior waistbands, and clean-break tapered cuffs.',
      details: [
        'Extended tab waistbands with hook-and-bar closure',
        'Side buckle adjusters for a belt-free silhouette',
        'Curtained interior waistband preventing shirt ride-up',
        'Hand-stitched blind hem finishes',
      ],
      tags: ['Pleated Trousers', 'Side Adjusters', 'Wool Trousers', 'Clean Break'],
      image: '/images/tailoring/folded_shirts.jpg',
      gradient: 'from-chocolate-900 to-chocolate-950',
      isRepresentativeImage: false, // User provided real boutique image
      inquirySubject: 'Tailored Pleated Trousers',
    },
    {
      id: 'gallery-tuxedo-suit',
      title: 'Midnight Velvet Bandhgala & Tuxedo',
      shop: 'Tailoring Home',
      category: 'tailoring',
      subCategory: 'formal',
      badge: 'Formal Couture',
      badgeVariant: 'maroon',
      isCommunitySpecial: false,
      description:
        'Celebratory dinner jacket and bandhgala tailored from plush micro-velvet, featuring antique brass coin buttons, pure silk jacquard lining, and hand-canvassed chest contour.',
      details: [
        'Plush micro-velvet with deep jewel tone luster',
        'Hand-set shoulder pitch for upright stance',
        'Antique metal button appointments',
        'Full breathable silk interior lining',
      ],
      tags: ['Bandhgala', 'Velvet Tuxedo', 'Dinner Jacket', 'Celebratory'],
      image:
        'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80',
      gradient: 'from-chocolate-950 to-maroon-950',
      isRepresentativeImage: true,
      inquirySubject: 'Midnight Velvet Bandhgala & Tuxedo',
    },

    // --- FABRIC HOME ITEMS ---
    {
      id: 'gallery-banarasi-silk',
      title: 'Heritage Banarasi Katan Silk',
      shop: 'Fabric Home',
      category: 'fabric',
      subCategory: 'silk',
      badge: 'Heritage Handloom',
      badgeVariant: 'maroon',
      isCommunitySpecial: false,
      description:
        'Handwoven pure silk yardage from Varanasi featuring dense floral jaal patterns in authentic antique golden zari on a royal crimson base.',
      details: [
        'Woven on traditional pit and jacquard wooden looms',
        'Tested metallic zari thread with permanent luster',
        'Heavy royal drape suited for sherwanis and lehengas',
        'Certified 100% natural mulberry silk warp and weft',
      ],
      tags: ['Pure Silk', 'Banarasi Zari', 'Handloom', 'Heirloom Quality'],
      image:
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
      gradient: 'from-maroon-900 to-amber-950',
      isRepresentativeImage: true,
      inquirySubject: 'Heritage Banarasi Katan Silk Fabric',
    },
    {
      id: 'gallery-rida-fabrics-jodi',
      title: 'Curated Floral Rida Jodi Prints',
      shop: 'Fabric Home',
      category: 'fabric',
      subCategory: 'bohra',
      badge: 'Community Speciality',
      badgeVariant: 'gold',
      isCommunitySpecial: true,
      description:
        'Coordinated floral cotton jodis handpicked for Bohra women. Combines matching pastel base yardage, floral borders, and soft lawn texture.',
      details: [
        'Vibrant colorfast reactive dye technology',
        'Soft breathable cotton lawn base',
        'Pre-coordinated matching jodi yardage',
        'Width calibrated for minimal pardi and ghagra wastage',
      ],
      tags: ['Floral Prints', 'Rida Jodi', 'Soft Cotton', 'Bohra Speciality'],
      image:
        'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=1000&q=80',
      gradient: 'from-maroon-900 to-amber-950',
      isRepresentativeImage: true,
      inquirySubject: 'Curated Floral Rida Jodi Prints',
    },
    {
      id: 'gallery-irish-linen',
      title: 'European & Irish Pure Flax Linen',
      shop: 'Fabric Home',
      category: 'fabric',
      subCategory: 'linen',
      badge: 'Organic Flax',
      badgeVariant: 'chocolate',
      isCommunitySpecial: false,
      description:
        'Certified organic unbleached flax woven in Normandy and Ireland. Characterized by distinctive rustic slub textures, natural cooling, and remarkable longevity.',
      details: [
        '60s & 80s count pure organic flax weave',
        'Unmatched natural air permeability and heat dissipation',
        'Becomes softer and more supple with every cleaning',
        'Natural undyed oatmeal and earth-toned palettes',
      ],
      tags: ['Irish Linen', 'Pure Flax', 'Organic Weave', 'Summer Suiting'],
      image:
        'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
      gradient: 'from-amber-900 to-chocolate-900',
      isRepresentativeImage: true,
      inquirySubject: 'European & Irish Pure Flax Linen',
    },
    {
      id: 'gallery-kurta-lawn',
      title: 'Swiss Lawn & Egyptian Kurta Cambric',
      shop: 'Fabric Home',
      category: 'fabric',
      subCategory: 'bohra',
      badge: 'Community Speciality',
      badgeVariant: 'gold',
      isCommunitySpecial: true,
      description:
        'High-count pristine white Swiss lawns and Egyptian cotton cambrics engineered for Kurta and Saya draping with cool breathability in tropical climates.',
      details: [
        'Pristine optical white and soft ivory selections',
        'Fine-spun high-twist yarns offering crispness without stiffness',
        'Subtle self-jacquard micro-checks and self-stripes',
        'Pre-shrunk fabric ensuring post-tailoring size accuracy',
      ],
      tags: ['Swiss Lawn', 'Pristine White', 'Kurta-Saya Cloth', 'High-Count'],
      image:
        'https://images.unsplash.com/photo-1528458876859-9944061a5b48?auto=format&fit=crop&w=1000&q=80',
      gradient: 'from-stone-900 to-chocolate-950',
      isRepresentativeImage: true,
      inquirySubject: 'Swiss Lawn & Egyptian Kurta Cambric',
    },
    {
      id: 'gallery-giza-cotton',
      title: 'Egyptian Giza 140s 2-Ply Cotton',
      shop: 'Fabric Home',
      category: 'fabric',
      subCategory: 'cotton',
      badge: 'Long-Staple Cotton',
      badgeVariant: 'chocolate',
      isCommunitySpecial: false,
      description:
        'Extra-long staple Egyptian Giza cotton woven into 140s 2-ply poplin and twill. Delivers silky smooth skin contact, crisp collar stability, and deep dye luster.',
      details: [
        '140s 2-ply compact yarn construction',
        'Natural luster comparable to fine silk filament',
        'Resistant to fraying, fuzzing, and surface pilling',
        'Available in executive whites, sky blues, and chalk stripes',
      ],
      tags: ['Giza Cotton', '140s Count', 'Silky Touch', 'Executive Shirt'],
      image:
        'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80',
      gradient: 'from-chocolate-800 to-stone-900',
      isRepresentativeImage: true,
      inquirySubject: 'Egyptian Giza 140s 2-Ply Cotton',
    },
    {
      id: 'gallery-italian-wool',
      title: 'Super 140s Italian Worsted Suiting Wool',
      shop: 'Fabric Home',
      category: 'fabric',
      subCategory: 'suiting',
      badge: 'Luxury Suiting',
      badgeVariant: 'chocolate',
      isCommunitySpecial: false,
      description:
        'Superfine worsted wool woven in Biella, Italy. Renowned for four-season thermal regulation, wrinkle recovery, and a sharp, clean drape for corporate suiting.',
      details: [
        'Super 140s fine Australian merino fleece',
        'Natural memory and wrinkle recovery after folding',
        'Subtle twill weave with understated natural luster',
        'Available in midnight navy, charcoal, and Glen checks',
      ],
      tags: ['Super 140s', 'Worsted Wool', 'Biella Weave', 'Executive Suit'],
      image:
        'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80',
      gradient: 'from-slate-900 to-chocolate-950',
      isRepresentativeImage: true,
      inquirySubject: 'Super 140s Italian Worsted Suiting Wool',
    },
    {
      id: 'gallery-msb-uniform-textile',
      title: 'Approved MSB School Uniform Textile',
      shop: 'Fabric Home',
      category: 'fabric',
      subCategory: 'uniform',
      badge: 'MSB Regulation',
      badgeVariant: 'maroon',
      isCommunitySpecial: true,
      description:
        'Certified uniform fabric matching Madrasa Saifiyah Burhaniyah regulation shades and drill weave specifications. Pill-resistant, high tensile strength, and colorfast.',
      details: [
        'Approved MSB regulation color and weave match',
        'High tensile strength tested for active playground durability',
        'Anti-pill finish maintaining clean appearance over time',
        'Breathable cotton-rich blend for all-day classroom comfort',
      ],
      tags: ['MSB Textile', 'Regulation Shade', 'High Tensile', 'Anti-Pill'],
      image:
        'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=1000&q=80',
      gradient: 'from-chocolate-900 to-maroon-950',
      isRepresentativeImage: true,
      inquirySubject: 'Approved MSB School Uniform Textile',
    },
    {
      id: 'gallery-brocades-damask',
      title: 'Heritage Brocade & Ornamental Jacquard',
      shop: 'Fabric Home',
      category: 'fabric',
      subCategory: 'designer',
      badge: 'Ornamental Weave',
      badgeVariant: 'maroon',
      isCommunitySpecial: false,
      description:
        'Intricate 3D extra-weft damask and architectural motifs raised on silk and satin grounds with antique metallic threads. Ideal for wedding jackets and regal accents.',
      details: [
        'Raised 3D tactile jacquard weave',
        'Tested metallic thread finishes that resist tarnishing',
        'Firm, structured body suitable for wedding tailoring',
        'Rich festive colorways (emerald, royal blue, antique gold)',
      ],
      tags: ['Brocade', 'Ornamental Weave', 'Zari Motifs', 'Wedding Cloth'],
      image:
        'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=1000&q=80',
      gradient: 'from-maroon-900 to-amber-950',
      isRepresentativeImage: true,
      inquirySubject: 'Heritage Brocade & Ornamental Jacquard Fabric',
    },
  ],

  // Inquiries & Showroom Visit Notice
  consultationBanner: {
    title: 'Interested in Any Creation or Fabric Swatch?',
    desc: 'Speak directly with our Master Cutter or Textile Specialist. Visit our twin showrooms or send an inquiry via WhatsApp with the item reference.',
    whatsappUrl: `https://wa.me/${BRAND_INFO.tailoringShop.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
      'Hello, I would like to inquire about an item featured in your online gallery.'
    )}`,
  },
};

export default galleryContent;
