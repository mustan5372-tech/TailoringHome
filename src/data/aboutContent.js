/**
 * About Us Page Content & Data Store
 * Decoupled content for the dedicated About Us page.
 * Keeps all photography URLs, shop profiles, values, and placeholders
 * ready for future Firebase Firestore integration.
 *
 * NOTE: As per project guidelines, no founding years, owner names,
 * awards or business claims are invented. Explicit placeholders are
 * used where verified information is pending.
 */

import { ROUTES, BRAND_INFO } from '../constants/navigation';

export const aboutContent = {
  // 1. Hero Section
  hero: {
    badge: 'Two Specialists • One Shared Atelier',
    headline: 'Where Master Tailoring Meets Curated Fine Textiles',
    subheadline:
      'Tailoring Home and Fabric Home operate as two complementary boutique businesses under one unified destination. Together, we serve the Dawoodi Bohra community and discerning clients with bespoke craftsmanship and authentic natural fabrics.',
    backgroundImage: null,
    fallbackGradient: 'from-chocolate-950 via-chocolate-900 to-maroon-950',
    highlights: [
      'Two Dedicated Ateliers Under One Roof',
      'Dawoodi Bohra Community Speciality',
      'Individual Anatomical Pattern Drafting',
      'Certified Natural Fiber Repository',
    ],
  },

  // 2. The Unified Philosophy (Why Two Businesses Under One Roof)
  unifiedPhilosophy: {
    eyebrow: 'Our Foundation',
    title: 'The Symbiosis of Cloth and Cut',
    subtitle:
      'An exceptional garment cannot exist without fine cloth, nor can the finest fabric achieve elegance without master cutting. Having both specialists in one destination ensures complete sartorial harmony.',
    storyParagraphs: [
      'In traditional bespoke dressmaking, a client often purchases cloth from one shop and takes it to an independent tailor, frequently resulting in misaligned estimates, improper fabric grain cutting, or mismatched linings. Tailoring Home and Fabric Home were established to unite these two fundamental crafts.',
      'Fabric Home curates certified natural fibers—from crisp white Swiss lawns and printed Rida cottons to approved school uniform textiles and Italian suiting wools. Working in immediate coordination, Tailoring Home drafts unique paper patterns sculpted directly to each client’s individual posture, shoulder slope, and personal comfort.',
      'Our primary focus is dedicated to the Dawoodi Bohra community—providing authentic Kurta-Saya-Izaar and custom Ridas—while serving families with official MSB and ABN school uniforms, and gentlemen and ladies seeking enduring bespoke formalwear.',
    ],
    // Editable placeholders for business identity
    establishmentInfo: {
      foundingNote: '[Placeholder: Established Year / Boutique History]',
      masterArtisans: '[Placeholder: Master Cutter & Textile Curator Details]',
      locationSummary: '[Placeholder: Twin Boutique Address, Main Street]',
    },
  },

  // 3. Tailoring Home Profile
  tailoringHome: {
    id: 'about-tailoring',
    name: 'Tailoring Home',
    badge: 'Bespoke Stitching Atelier',
    tagline: 'Precision Master Cutting & Bespoke Stitching',
    description:
      'Dedicated to the art of individual pattern drafting. We reject standardized factory sizing in favor of personal measurements, anatomical trial baste fittings, and hand-finished detailing.',
    keySpecialities: [
      {
        title: "Bohra Men's Wear: Kurta, Saya & Izaar",
        desc: 'Traditional proportions, crisp band collars, seamless plackets, and functional prayer-ease pockets.',
      },
      {
        title: "Bohra Women's Wear: Rida Tailoring",
        desc: 'Expert Pardi framing, generous Ghagra drape, concealed pockets, and delicate lace appliqué.',
      },
      {
        title: 'MSB & ABN School Uniforms',
        desc: 'Separate, regulation tailoring for boys and girls built with reinforced seams and growth margins.',
      },
      {
        title: 'Gentlemen’s Suiting & Formalwear',
        desc: 'Hand-canvassed formal suits, structured blazers, custom shirts with split yokes, and tailored trousers.',
      },
      {
        title: 'Master Alterations & Restyling',
        desc: 'Precision shoulder narrowing, sleeve pitch adjustment, and heirloom garment restoration.',
      },
    ],
    image: null,
    imageAlt: 'Tailoring Home bespoke craftsmanship showcase',
    isRepresentativeImage: false,
    ctaText: 'Explore Tailoring Services',
    ctaTo: ROUTES.TAILORING,
  },

  // 4. Fabric Home Profile
  fabricHome: {
    id: 'about-fabric',
    name: 'Fabric Home',
    badge: 'Curated Textile Archive',
    tagline: 'Certified Natural Fibers & Speciality Weaves',
    description:
      'A sanctuary of authentic, certified natural fabrics sourced directly from prestigious weaving clusters. We prioritize fiber purity, yarn count consistency, and remarkable tactile drape.',
    keySpecialities: [
      {
        title: 'Specialized Rida Materials',
        desc: 'Curated floral cotton jodis, fine Swiss lawns, French chiffons, satins, and coordinating border laces.',
      },
      {
        title: 'Pristine Kurta-Saya Yardage',
        desc: 'High-thread-count white and ivory Swiss lawns, Egyptian cotton cambrics, and self-jacquard weaves.',
      },
      {
        title: 'Approved School Uniform Cloths',
        desc: 'Certified regulation shades and high-tensile, pill-resistant fabrics for MSB and ABN students.',
      },
      {
        title: 'Natural Fibers & Heritage Silks',
        desc: '100% pure Mulberry and Banarasi handloom silks, Irish linens, and Giza 2-ply long-staple cottons.',
      },
      {
        title: 'Superfine Worsted Suiting Wools',
        desc: 'Super 120s–160s Merino wools, hopsack blazer cloths, and four-season temperature-regulating textiles.',
      },
    ],
    image: null,
    imageAlt: 'Fabric Home textile archive showcase',
    isRepresentativeImage: false,
    ctaText: 'Explore Fabric Archive',
    ctaTo: ROUTES.FABRIC,
  },

  // 5. Pillars of Excellence: Craftsmanship, Fabric Variety, Customer Experience
  pillars: [
    {
      id: 'craftsmanship',
      icon: 'Scissors',
      badge: 'Artisanal Standards',
      title: 'Our Craftsmanship',
      subtitle: 'Anatomy, Precision & Hand-Finishes',
      description:
        'Every garment begins with personal paper patterns rather than standardized factory templates. We take over 28 body measurements to account for shoulder slope, chest arch, and spinal posture.',
      points: [
        'Individual pattern drafting for each client',
        'Traditional baste trial sessions for posture sculpting',
        'Deep mastery of Dawoodi Bohra traditional attire cuts',
        'Reinforced bar-tacking on school uniforms for longevity',
      ],
    },
    {
      id: 'fabric-variety',
      icon: 'Layers',
      badge: 'Textile Integrity',
      title: 'Our Fabric Variety',
      subtitle: 'Fiber Purity & Community Specialities',
      description:
        'We enforce strict yarn authenticity standards across our silks, linens, wools, and cottons. We reject synthetic blends masquerading as natural fibers in our premium collections.',
      points: [
        'Certified 100% natural organic cottons, silks and linens',
        'Direct partnerships with heritage weaving clusters',
        'Pre-shrunk, color-tested textiles that preserve dimensions',
        'Endless variety of Rida prints, laces, and school regulation cloths',
      ],
    },
    {
      id: 'customer-experience',
      icon: 'ShieldCheck',
      badge: 'Boutique Service',
      title: 'The Customer Experience',
      subtitle: 'Unhurried, Personal & Transparent',
      description:
        'We believe in pressure-free catalogue browsing. Our showroom is designed for clients to sit comfortably, touch fabric swatches, inspect stitching details, and consult directly with our artisans.',
      points: [
        'Private measurement and styling consultations',
        'Transparent catalogue browsing without sales pressure',
        'Reliable turnaround schedules for weddings and school sessions',
        'Direct WhatsApp support for swatch inquiries and orders',
      ],
    },
  ],

  // 6. Physical Showroom & Workshop Notice
  showroomNotice: {
    eyebrow: 'In-Person Consultation',
    title: 'Visit Our Twin Boutiques',
    subtitle:
      'Experience the tactile weight of our fabrics and discuss your bespoke requirements directly with our master cutter under one roof.',
    tailoringAddress: BRAND_INFO.tailoringShop.location,
    fabricAddress: BRAND_INFO.fabricShop.location,
    hours: BRAND_INFO.fullHours,
    phone: BRAND_INFO.tailoringShop.phoneDisplay,
    whatsappUrl: BRAND_INFO.tailoringShop.whatsapp
      ? `https://wa.me/${BRAND_INFO.tailoringShop.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
          'Hello, I would like to schedule an in-person consultation at your showroom.'
        )}`
      : null,
  },
};

export default aboutContent;
