/**
 * Tailoring Home Data Store
 * Decoupled content for the dedicated Tailoring Home catalogue page.
 * Keeps all photography URLs, specifications, categories, and placeholders
 * ready for future Firebase Firestore integration.
 */

import { ROUTES, BRAND_INFO } from '../constants/navigation';

export const tailoringContent = {
  // 1. Hero Section
  hero: {
    badge: 'Artisanal Atelier & Community Tailoring',
    headline: 'Bespoke Sartorial Mastery for Every Silhouette',
    subheadline:
      'Dedicated to the Dawoodi Bohra community and clients who value hand-cut precision. From traditional Kurta-Saya-Izaar and custom Ridas to official MSB & ABN school uniforms, executive suits, and fine alterations.',
    backgroundImage: null,
    fallbackGradient: 'from-chocolate-950 via-maroon-950 to-chocolate-900',
    highlights: [
      'Over 28 Anatomical Body Measurements',
      'Dawoodi Bohra Traditional Speciality',
      'Official MSB & ABN School Uniforms',
      'Trial Baste Fittings for Flawless Poise',
    ],
    quickNav: [
      { label: "Bohra Men's Wear", href: '#bohra-men' },
      { label: "Bohra Women's Wear", href: '#bohra-women' },
      { label: 'School Uniforms (MSB & ABN)', href: '#school-uniforms' },
      { label: "Men's Wear", href: '#mens-wear' },
      { label: "Women's Wear", href: '#womens-wear' },
      { label: 'Children & Alterations', href: '#children-alterations' },
      { label: 'Crafting Process', href: '#process' },
    ],
  },

  // 2. Bohra Men's Wear – Kurta, Saya and Izaar (Prominent Community Category)
  bohraMenswear: {
    id: 'bohra-men',
    eyebrow: 'Community Speciality',
    title: "Bohra Men's Wear: Kurta, Saya & Izaar",
    subtitle:
      'Honoring centuries-old sartorial traditions with immaculate white-on-white precision, calibrated neckline comfort, and graceful silhouette drape.',
    communityBadge: 'Dawoodi Bohra Heritage',
    notice:
      'Temporary sample photographs shown below. Master patterns and stitching strictly conform to traditional community standards.',
    items: [
      {
        id: 'bohra-kurta-saya-combo',
        title: 'Complete Kurta & Saya Ensemble',
        badge: 'Featured Speciality',
        badgeVariant: 'gold',
        isCommunitySpecial: true,
        description:
          'Proportioned Kurta and flowing Saya ensemble crafted from matching high-count Swiss lawn or Egyptian cotton. Features clean-finish band collars, hidden plackets, miswak pocket, and balanced side slits.',
        details: [
          'Precision band collar with zero neck-chafe',
          'Internal alignment for batwa and miswak pockets',
          'Reinforced side slits for prayer ease',
          'Hand-finished buttons and loop closures',
        ],
        tags: ['Complete Ensemble', 'Swiss Lawn', 'Miqaat Wear', 'Hand-Finished'],
        image: null,
        gradient: 'from-amber-950 to-chocolate-950',
        inquirySubject: "Kurta and Saya Ensemble",
        isRepresentativeImage: false,
      },
      {
        id: 'bohra-kurta',
        title: 'Bespoke Bohra Kurta',
        badge: 'Bohra Traditional',
        badgeVariant: 'gold',
        isCommunitySpecial: true,
        description:
          'Individual Kurtas cut to your distinct chest breadth, armhole depth, and posture. Built with classic white cambric or soft cotton for all-day comfort during daily prayers and gatherings.',
        details: [
          'Multiple traditional pocket placement choices',
          'Clean-edge single or double hidden plackets',
          'Soft collar interfacing that retains crispness',
          'Breathable natural cotton construction',
        ],
        tags: ['Daily Prayer Wear', 'Egyptian Cambric', 'Custom Armhole', 'Crisp Band'],
        image: null,
        gradient: 'from-chocolate-900 to-amber-950',
        inquirySubject: 'Bespoke Bohra Kurta',
        isRepresentativeImage: false,
      },
      {
        id: 'bohra-saya',
        title: 'Artisanal Flowing Saya',
        badge: 'Bohra Traditional',
        badgeVariant: 'gold',
        isCommunitySpecial: true,
        description:
          'Lightweight outer Saya tailored for regal drape over the kurta. Features calibrated lapels, neat cuff hems, and balanced bottom flare that falls gracefully in movement.',
        details: [
          'Calibrated bottom flair to match individual height',
          'Ultra-clean lightweight seam construction',
          'Crisp lapel roll tailored to lay flat',
          'Wrinkle-resistant lightweight cotton interfacing',
        ],
        tags: ['Outer Saya', 'Lightweight Lawn', 'Regal Drape', 'Festive Miqaat'],
        image: null,
        gradient: 'from-stone-900 to-chocolate-950',
        inquirySubject: 'Traditional Saya',
        isRepresentativeImage: false,
      },
      {
        id: 'bohra-izaar',
        title: 'Traditional Tailored Izaar',
        badge: 'Bohra Traditional',
        badgeVariant: 'gold',
        isCommunitySpecial: true,
        description:
          'Comfortable, durable unstitched or tailored cotton Izaars with drawstring or elasticated waist options, reinforced crotch gussets, and classic woven border or plain bottom hems.',
        details: [
          'Reinforced crotch panel for prayer flexibility',
          'Soft inner drawstring or non-rolling elastic',
          'Traditional woven border or plain hem finish',
          'Generous calf cut ensuring ease of movement',
        ],
        tags: ['Cotton Izaar', 'Woven Border', 'Prayer Comfort', 'Reinforced Gusset'],
        image: null,
        gradient: 'from-amber-950 to-chocolate-900',
        inquirySubject: 'Traditional Izaar',
        isRepresentativeImage: false,
      },
    ],
  },

  // 3. Bohra Women's Wear – Rida, Pardi and Ghagra (Prominent Community Category)
  bohraWomenswear: {
    id: 'bohra-women',
    eyebrow: 'Community Speciality',
    title: "Bohra Women's Wear: Rida, Pardi & Ghagra",
    subtitle:
      'Artisanal stitching of traditional two-piece Ridas, ensuring harmonious panel coordination, delicate lace attachments, and elegant modesty.',
    communityBadge: 'Dawoodi Bohra Traditional',
    notice:
      'Sample previews shown. We tailor custom Ridas using fabrics provided by you or hand-selected from Fabric Home.',
    items: [
      {
        id: 'rida-complete-set',
        title: 'Complete Two-Piece Rida',
        badge: 'Custom Atelier',
        badgeVariant: 'gold',
        isCommunitySpecial: true,
        description:
          'Full bespoke stitching of coordinated Pardi and Ghagra with harmonious panel arrangements, border alignments, and delicate crochet or embroidered lace attachments.',
        details: [
          'Flawless panel matching across jodis',
          'Color-coordinated inner thread finishing',
          'Custom neck and face opening calibrated to client',
          'Soft interior facings for skin comfort',
        ],
        tags: ['Two-Piece Rida', 'Pardi & Ghagra', 'Panel Matching', 'Bespoke Stitch'],
        image: null,
        gradient: 'from-maroon-900 to-amber-950',
        inquirySubject: 'Complete Two-Piece Rida',
        isRepresentativeImage: false,
      },
      {
        id: 'rida-pardi-crafting',
        title: 'Artisanal Pardi Crafting',
        badge: 'Precision Stitching',
        badgeVariant: 'gold',
        isCommunitySpecial: true,
        description:
          'Meticulously proportioned Pardi cut to frame the face gracefully with gentle drape, secure chin fastenings, and custom border lace integration.',
        details: [
          'Soft non-chafing forehead bands and inner facings',
          'Precision flap lace attachments and mitred corners',
          'Balanced shoulder drape preventing pulling',
          'Hand-anchored decorative border appliqués',
        ],
        tags: ['Pardi Stitching', 'Face Framing', 'Lace Border', 'Comfort Facing'],
        image: null,
        gradient: 'from-maroon-950 to-chocolate-900',
        inquirySubject: 'Pardi Crafting',
        isRepresentativeImage: false,
      },
      {
        id: 'rida-ghagra-tailoring',
        title: 'Tailored Flowing Ghagra',
        badge: 'Comfort & Modesty',
        badgeVariant: 'gold',
        isCommunitySpecial: true,
        description:
          'Generously flared Ghagra tailored with comfortable drawstrings, deep concealed side-seam pockets, and reinforced bottom hems designed to carry decorative borders seamlessly.',
        details: [
          'Concealed deep side pockets for essentials',
          'Sturdy canvas bottom hem reinforcement',
          'Even gathers or flat-pleated waistband options',
          'Generous walking flare calibrated to personal height',
        ],
        tags: ['Ghagra Tailoring', 'Concealed Pockets', 'Canvas Hem', 'Graceful Flare'],
        image: null,
        gradient: 'from-chocolate-900 to-maroon-950',
        inquirySubject: 'Ghagra Tailoring',
        isRepresentativeImage: false,
      },
      {
        id: 'rida-lace-panel-embellishment',
        title: 'Lace Appliqué & Panel Assembly',
        badge: 'Artisanal Detailing',
        badgeVariant: 'gold',
        isCommunitySpecial: true,
        description:
          'Specialized craftsmanship for attaching heirloom borders, French laces, crochet accents, and intricate printed jodi panels with pucker-free seam work.',
        details: [
          'Pucker-free curved and straight lace attachments',
          'Tonal color-matched thread for invisible finishes',
          'Delicate scallop border edge binding',
          'Reinforced anchoring on high-friction areas',
        ],
        tags: ['Lace Appliqué', 'Jodi Assembly', 'Scallop Edging', 'Border Attachment'],
        image: null,
        gradient: 'from-amber-950 to-chocolate-950',
        inquirySubject: 'Rida Lace and Panel Assembly',
        isRepresentativeImage: false,
      },
    ],
  },

  // 4. School Uniforms – Separate MSB and ABN Categories
  schoolUniforms: {
    id: 'school-uniforms',
    eyebrow: 'Campus & Academic',
    title: 'School Uniform Tailoring',
    subtitle:
      'Durable, comfortable school uniforms tailored in accordance with official school uniform guidelines for MSB and ABN institutions.',
    notice:
      'Important: Tailored in accordance with respective school uniform dress codes. Fabrics and tailoring are provided as per current school session requirements. Please consult us with your school branch details.',
    institutions: [
      {
        id: 'uniform-msb',
        title: 'MSB School Uniforms',
        schoolName: 'Madrasa Saifiyah Burhaniyah (MSB)',
        badge: 'MSB Regulation',
        badgeVariant: 'maroon',
        isCommunitySpecial: true,
        description:
          'Complete uniform tailoring for MSB boys and girls from primary grades to higher secondary. Built with heavy-duty reinforced stress points, growth-friendly seam allowances, and comfortable collars.',
        features: [
          'Tailored to MSB approved dress codes and regulations',
          "Boys' regulation shirts, trousers & standard collars",
          "Girls' regulation pinafores, shirts & modest uniforms",
          'Reinforced bar-tacking on pocket stress points',
          'Generous growth seam margins for growing students',
          'Tested against frequent washing and active play',
        ],
        tags: ['MSB Boys', 'MSB Girls', 'Grade 1–12', 'Campus Standard', 'Durable Fit'],
        image: null,
        gradient: 'from-chocolate-900 to-maroon-950',
        inquirySubject: 'MSB School Uniform Tailoring',
        isRepresentativeImage: false,
      },
      {
        id: 'uniform-abn',
        title: 'ABN School Uniforms',
        schoolName: 'Al Madrasa (ABN) Standards',
        badge: 'ABN Regulation',
        badgeVariant: 'maroon',
        isCommunitySpecial: true,
        description:
          'Approved school uniform tailoring conforming to Al Madrasa (ABN) campus guidelines. Cleanly finished collars, durable stitching, and comfortable daily proportions designed for academic focus.',
        features: [
          'Conforms to ABN school uniform patterns and dress codes',
          "Boys' campus shirts, formal trousers & pocket finishes",
          "Girls' approved uniform sets matching school specifications",
          'Breathable fabric tailoring for long study hours',
          'Pucker-free collar band construction that stays crisp',
          'Reinforced double-stitched pocket corners',
        ],
        tags: ['ABN Boys', 'ABN Girls', 'Campus Standard', 'Reinforced Seams', 'Academic Wear'],
        image: null,
        gradient: 'from-maroon-950 to-chocolate-900',
        inquirySubject: 'ABN School Uniform Tailoring',
        isRepresentativeImage: false,
      },
    ],
  },

  // 5. Men's Wear – Shirts, Trousers, Suits and Blazers
  mensWear: {
    id: 'mens-wear',
    eyebrow: "Gentlemen's Sartorial",
    title: "Men's Wear: Formals, Suits & Blazers",
    subtitle:
      'Individually drafted patterns that balance shoulder slope, posture, and drape for confident boardroom presence and timeless elegance.',
    notice: 'Sample photographs shown below. Available in full bespoke cuts.',
    items: [
      {
        id: 'mens-suits-tuxedos',
        title: 'Bespoke Suits & Tuxedos',
        badge: 'Hand-Canvassed',
        badgeVariant: 'chocolate',
        description:
          'Two-piece and three-piece suits with floating horsehair canvas chest pieces, handcrafted lapel rolls, functional button cuffs, and silk interior linings.',
        details: [
          'Two-piece & three-piece bespoke cuts',
          'Peak, notch, or celebratory shawl lapel styles',
          'Double or single vented back construction',
          'Genuine horn or mother-of-pearl buttons',
        ],
        tags: ['Executive Suits', 'Tuxedos', 'Three-Piece', 'Hand-Canvassed'],
        image: null,
        gradient: 'from-chocolate-950 to-maroon-950',
        inquirySubject: 'Bespoke Suit or Tuxedo',
        isRepresentativeImage: false,
      },
      {
        id: 'mens-blazers-jackets',
        title: 'Structured Blazers & Sport Coats',
        badge: 'Smart Formals',
        badgeVariant: 'chocolate',
        description:
          'Single-breasted or double-breasted blazers cut from fine hopsack, linen, or worsted wool, ideal for club meetings, weddings, and business travel.',
        details: [
          'Unlined, half-lined or fully-lined interior options',
          'Classic patch, welt or flap pocket geometries',
          'Natural soft shoulders or structured padding',
          'Contrast interior piping and ticket pockets',
        ],
        tags: ['Tailored Blazers', 'Sport Jackets', 'Linen Blazers', 'Club Wear'],
        image: null,
        gradient: 'from-chocolate-900 to-chocolate-950',
        inquirySubject: 'Tailored Blazer or Jacket',
        isRepresentativeImage: false,
      },
      {
        id: 'mens-custom-shirts',
        title: 'Custom Sartorial Shirts',
        badge: 'Precision Collar',
        badgeVariant: 'chocolate',
        description:
          'Individual pattern shirts tailored from Egyptian Giza cottons or Irish linens with customized collar spread, cuff geometry, split yoke, and monogram embroidery.',
        details: [
          'Cutaway, spread, button-down and band collars',
          'Single-needle French side seams for flat comfort',
          'Split back yoke tailored to shoulder contours',
          'Personalized hand-embroidered monograms',
        ],
        tags: ['Giza Cotton Shirts', 'French Cuffs', 'Split Yoke', 'Monogrammed'],
        image: null,
        gradient: 'from-amber-950 to-chocolate-900',
        inquirySubject: 'Custom Sartorial Shirt',
        isRepresentativeImage: false,
      },
      {
        id: 'mens-tailored-trousers',
        title: 'Tailored Trousers & Chinos',
        badge: 'Anatomical Fit',
        badgeVariant: 'chocolate',
        description:
          'Pleated or flat-front trousers with customized waistband construction, side adjusters, curtained interior waistbands, and neat cuff breaks.',
        details: [
          'Extended tab waistbands with hook-and-bar closure',
          'Brass side buckle adjusters (belt-free fit)',
          'Slanted side pockets and secure rear jet pockets',
          'Clean break, half break, or no-break hem finishes',
        ],
        tags: ['Pleated Trousers', 'Side Adjusters', 'Wool Trousers', 'Clean Break'],
        image: null,
        gradient: 'from-chocolate-800 to-stone-900',
        inquirySubject: 'Tailored Trousers',
        isRepresentativeImage: false,
      },
    ],
  },

  // 6. Women's Wear – Blouses, Dresses and Other Stitching
  womensWear: {
    id: 'womens-wear',
    eyebrow: "Ladies' Bespoke",
    title: "Women's Wear: Blouses, Dresses & Stitching",
    subtitle:
      'Custom tailored saree blouses, festive salwar kameez, and contemporary modest dresses shaped to your unique measurements and personal style.',
    notice: 'Sample previews shown. Each garment is tailored individually to client measurements.',
    items: [
      {
        id: 'womens-designer-blouses',
        title: 'Custom Saree Blouses',
        badge: 'Boutique Fit',
        badgeVariant: 'maroon',
        description:
          'Flawlessly fitted saree blouses with structured cups, customized back necklines (deep V, boat neck, sweetheart), piped edges, and personalized latkan ties.',
        details: [
          'Padded and non-padded cup structuring',
          'Concealed side, front or back zip options',
          'Hand-finished edge piping and clean seam encasing',
          'Princess cut, katori cut, or traditional darting',
        ],
        tags: ['Saree Blouses', 'Princess Cut', 'Designer Backs', 'Padded Cups'],
        image: null,
        gradient: 'from-maroon-900 to-amber-950',
        inquirySubject: 'Custom Saree Blouse',
        isRepresentativeImage: false,
      },
      {
        id: 'womens-salwar-kameez',
        title: 'Salwar Suits & Anarkalis',
        badge: 'Traditional Grace',
        badgeVariant: 'maroon',
        description:
          'Straight-cut suits, flared Anarkalis, sharara and gharara sets stitched with precision necklines, matching dupattas, and comfortable armhole ease.',
        details: [
          'Straight, A-line & kalidar flared silhouettes',
          'Palazzo, churidar, or tulip bottom options',
          'Custom sleeve lengths (cap, elbow, 3/4th, full)',
          'Delicate hem lace finishes and border attachments',
        ],
        tags: ['Salwar Suits', 'Anarkali', 'Sharara Sets', 'Festive Wear'],
        image: null,
        gradient: 'from-maroon-950 to-chocolate-900',
        inquirySubject: 'Salwar Suit or Anarkali',
        isRepresentativeImage: false,
      },
      {
        id: 'womens-festive-kurtis',
        title: 'Festive Kurtis & Tunics',
        badge: 'Everyday & Occasion',
        badgeVariant: 'chocolate',
        description:
          'Tailored cotton and silk kurtis for festive gatherings or refined daily wear, customized with side slits, pocket insertions, and hand-embroidered yokes.',
        details: [
          'Functional deep concealed side pockets',
          'Mandarin, sweetheart or boat neck styles',
          'Breathable natural cotton and silk cuts',
          'Contrast fabric inner facings and side slit tapes',
        ],
        tags: ['Festive Kurtis', 'Daily Tunics', 'Concealed Pockets', 'Silk Kurtis'],
        image: null,
        gradient: 'from-amber-950 to-maroon-900',
        inquirySubject: 'Festive Kurti or Tunic',
        isRepresentativeImage: false,
      },
      {
        id: 'womens-dresses-gowns',
        title: 'Modest Dresses & Gowns',
        badge: 'Contemporary',
        badgeVariant: 'chocolate',
        description:
          'Floor-length evening gowns, tiered maxi dresses, and modest silhouettes crafted with premium linings, hidden zips, and waist-defining darts.',
        details: [
          'Full breathable cotton voile interior lining',
          'Flattering empire, flared or natural waistlines',
          'Concealed invisible zippers and clean hems',
          'Custom sleeve and neckline modesty adjustments',
        ],
        tags: ['Modest Gowns', 'Tiered Dresses', 'Evening Wear', 'Full Lining'],
        image: null,
        gradient: 'from-chocolate-950 to-stone-900',
        inquirySubject: 'Modest Dress or Gown',
        isRepresentativeImage: false,
      },
    ],
  },

  // 7. Children's Wear and Alterations
  childrenAndAlterations: {
    id: 'children-alterations',
    eyebrow: 'Youth & Restyling',
    title: "Children's Wear & Master Alterations",
    subtitle:
      'Gentle traditional attire for growing children alongside master-level tailoring alterations that restore and re-sculpt high-value garments.',
    notice: 'Sample photographs shown below. Growth margins included in youth apparel.',
    items: [
      {
        id: 'children-traditional-attire',
        title: "Children's Traditional Attire",
        badge: 'Comfort Lining',
        badgeVariant: 'chocolate',
        description:
          "Junior Kurta-Saya sets, boys' Nehru jackets, and girls' festive suits made with soft, non-irritating inner linings and generous seam allowances for fast-growing kids.",
        details: [
          'Zero-scratch seam construction and soft thread',
          'Ultra-soft cotton voiles interior facings',
          '1.5-inch growth seam allowances for future letting out',
          'Child-safe front button closures and soft elastics',
        ],
        tags: ['Junior Kurta-Saya', 'Boys Ethnic', 'Girls Festive', 'Growth Margin'],
        image: null,
        gradient: 'from-amber-950 to-chocolate-900',
        inquirySubject: "Children's Traditional Attire",
        isRepresentativeImage: false,
      },
      {
        id: 'children-formals',
        title: 'Junior Suits & Blazers',
        badge: 'Youth Sartorial',
        badgeVariant: 'chocolate',
        description:
          'Two-piece junior suits, blazers, and custom shirts tailored for celebrations, weddings, and formal occasions with proportioned comfort and ease of movement.',
        details: [
          'Flexible soft shoulder pads suited for youth postures',
          'Adjustable waistband trousers for all-day comfort',
          'Stain-resistant outer fabrics with breathable lining',
          'Easy-to-clean construction with reinforced knees',
        ],
        tags: ['Junior Suits', 'Occasion Wear', 'Soft Shoulder', 'Adjustable Waist'],
        image: null,
        gradient: 'from-chocolate-900 to-maroon-950',
        inquirySubject: 'Junior Suit or Blazer',
        isRepresentativeImage: false,
      },
      {
        id: 'alterations-suits',
        title: 'Suit & Blazer Restyling',
        badge: 'Master Alteration',
        badgeVariant: 'maroon',
        description:
          'Precision shoulder narrowing, chest contouring, sleeve shortening from the shoulder head, and jacket hem reductions that preserve balanced lapel symmetry.',
        details: [
          'Shoulder recutting and shoulder pad repositioning',
          'Sleeve shortening preserving functional cuff buttons',
          'Waist suppression along back and side seams',
          'Full or partial jacket interior relining',
        ],
        tags: ['Shoulder Recut', 'Sleeve Shortening', 'Waist Tapering', 'Suit Relining'],
        image: null,
        gradient: 'from-maroon-950 to-chocolate-900',
        inquirySubject: 'Suit or Blazer Alteration',
        isRepresentativeImage: false,
      },
      {
        id: 'alterations-trousers-heirlooms',
        title: 'Trouser & Heirloom Restyling',
        badge: 'Precision Fitting',
        badgeVariant: 'maroon',
        description:
          'Trouser tapering, seat adjustments, hem length setting, zipper replacements, and vintage heirloom garment restoration performed with original stitching techniques.',
        details: [
          'Blind-stitch trouser hemming and cuff creation',
          'Waist take-in and let-out along center back rise',
          'High-grade brass or concealed zipper replacement',
          'Delicate antique embroidery and heirloom fabric reinforcement',
        ],
        tags: ['Trouser Hemming', 'Waist Let-out', 'Zipper Repair', 'Heirloom Restoration'],
        image: null,
        gradient: 'from-chocolate-950 to-stone-900',
        inquirySubject: 'Trouser or Garment Alteration',
        isRepresentativeImage: false,
      },
    ],
  },

  // 8. The 4-Step Bespoke Tailoring Experience
  process: [
    {
      step: '01',
      title: 'Consultation & Style Selection',
      desc: 'Discuss your requirements with our master cutter. Browse fabric swatches from Fabric Home, select lapels, collars, pockets, and lace details.',
      icon: 'Scissors',
    },
    {
      step: '02',
      title: 'Anatomical Measurement Draft',
      desc: 'Over 28 personal measurements recorded to draft an individual paper pattern, accounting for shoulder incline, posture, and chest symmetry.',
      icon: 'Ruler',
    },
    {
      step: '03',
      title: 'Trial Baste Fitting',
      desc: 'An uncompleted baste trial session allows real-time contouring on your body before final seams, linings, and hand buttonholes are permanently set.',
      icon: 'ShieldCheck',
    },
    {
      step: '04',
      title: 'Hand Finishes & Handover',
      desc: 'Detailed press steaming, hand-sewn buttonholes, strict quality control, and handover in a boutique garment bag ready for your occasion.',
      icon: 'Sparkles',
    },
  ],

  // 9. Contact & Inquiries Placeholders
  contact: {
    badge: 'Atelier Inquiries & Consultations',
    title: 'Consult Our Master Artisans',
    subtitle:
      'Visit our tailoring atelier for a personal measurement session or contact us directly on WhatsApp with your stitching requirements.',
    notice:
      'Note: Phone numbers, WhatsApp contacts and boutique addresses below are temporary demonstration placeholders until verified shop details are updated.',
    phone: BRAND_INFO.tailoringShop.phone,
    phoneDisplay: BRAND_INFO.tailoringShop.phoneDisplay,
    whatsapp: BRAND_INFO.tailoringShop.whatsapp,
    whatsappUrl: BRAND_INFO.tailoringShop.whatsapp
      ? `https://wa.me/${BRAND_INFO.tailoringShop.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
          'Hello Tailoring Home, I would like to inquire about bespoke tailoring services.'
        )}`
      : null,
    location: BRAND_INFO.tailoringShop.location,
    hours: BRAND_INFO.workingHours,
    companionShop: {
      title: 'Need Fabric First?',
      desc: 'Visit our sister shop Fabric Home under the same roof for certified Rida prints, Swiss lawns, MSB/ABN uniform textiles, pure silks and fine linens.',
      ctaText: 'Explore Fabric Varieties',
      ctaTo: ROUTES.FABRIC,
    },
  },
};

export default tailoringContent;
