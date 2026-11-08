import React from 'react';
import {
  Droplet,
  Feather,
  ShieldCheck,
  PhoneCall,
} from 'lucide-react';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card } from '../../components/common/Card';
import { ROUTES, BRAND_INFO } from '../../constants/navigation';

export const FabricHomePage = () => {
  const fabricVarieties = [
    {
      name: 'Pure Mulberry & Banarasi Silks',
      category: 'Luxury Silk',
      origin: 'Varanasi & Karnataka',
      weave: 'Handloom & Jacquard',
      desc: 'Lustrous, rich texture woven with authentic golden/silver zari threads. Ideal for regal sherwanis, festive kurtas, and traditional sarees.',
      idealFor: 'Weddings, Formal Evenings, Traditional Festivities',
    },
    {
      name: 'European & Irish Pure Linens',
      category: 'Natural Linen',
      origin: 'Ireland & Normandy',
      weave: '60s & 80s Count Plain Weave',
      desc: 'Unmatched breathability, natural cooling slub texture, and sophisticated rustic drape for summer suits, jackets, and smart-casual shirts.',
      idealFor: 'Summer Suits, Resort Jackets, Casual Shirts',
    },
    {
      name: 'Giza & Pima Long-Staple Cottons',
      category: 'Fine Cotton',
      origin: 'Egypt & Supima USA',
      weave: '100s - 140s 2-Ply Poplin & Twill',
      desc: 'Silky smooth feel against skin, crisp collar structure, high durability, and brilliant color retention for boardroom bespoke shirts.',
      idealFor: 'Executive Formal Shirts, Daily Luxury',
    },
    {
      name: 'Super 120s – 160s Merino Wool Blends',
      category: 'Wool & Suiting',
      origin: 'Australia & Biella, Italy',
      weave: 'Worsted Twill, Sharkskin & Glen Plaid',
      desc: 'Exceptional wrinkle recovery, four-season temperature regulation, and elegant drape for formal two-piece and three-piece suits.',
      idealFor: 'Business Suiting, Tuxedos, Blazers',
    },
    {
      name: 'Handcrafted Brocades & Jamdani',
      category: 'Heritage Weave',
      origin: 'Bengal & Western India',
      weave: 'Extra-Weft Ornamental Tapestry',
      desc: 'Intricate raised floral and architectural motifs woven meticulously on wooden pit looms for statement wedding jackets and dupattas.',
      idealFor: 'Groom Wear, Designer Waistcoats, Accents',
    },
    {
      name: 'Plush Micro-Velvet & Corduroy',
      category: 'Textured Velvet',
      origin: 'Specialized Mills',
      weave: 'Cut-Pile Dense Weave',
      desc: 'Deep jewel tones, soft tactile hand, and structured silhouette retention for modern winter bandhgalas and tuxedo collars.',
      idealFor: 'Winter Galas, Evening Smoking Jackets',
    },
  ];

  return (
    <div className="space-y-16 md:space-y-24 pb-16">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-chocolate-50 to-ivory border-b border-cream-border py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="chocolate" size="sm" className="mb-4">
            Textile Repository
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-chocolate-900 tracking-tight">
            Fabric Home
          </h1>
          <p className="mt-4 text-base sm:text-lg text-chocolate-600 max-w-2xl mx-auto leading-relaxed font-sans">
            A sanctuary of authentic, hand-selected luxury fabrics sourced directly from prestigious textile hubs worldwide.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button
              to={ROUTES.CONTACT}
              variant="secondary"
              size="md"
              icon={PhoneCall}
            >
              Inquire Fabric Swatches
            </Button>
            <Button
              to={ROUTES.TAILORING}
              variant="outline"
              size="md"
            >
              Pair With Tailoring Service
            </Button>
          </div>
        </div>
      </section>

      {/* Fabric Varieties Catalogue */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Curated Textile Gallery"
          title="Different Varieties of Fabrics & Textiles"
          subtitle="Explore the weaves, counts, origins, and tactile beauty of our premier textile collection."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {fabricVarieties.map((fabric, idx) => (
            <Card key={idx} variant="default" className="flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="chocolate" size="xs">
                    {fabric.category}
                  </Badge>
                  <span className="text-[11px] text-chocolate-500 font-sans">
                    Origin: <strong>{fabric.origin}</strong>
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-chocolate-900 mb-2">
                  {fabric.name}
                </h3>

                <p className="text-sm text-chocolate-600 leading-relaxed mb-5 font-sans">
                  {fabric.desc}
                </p>

                <div className="space-y-1.5 text-xs text-chocolate-700 bg-cream/70 p-3 rounded-sm mb-5 border border-cream-border/60">
                  <p>
                    <span className="font-semibold text-chocolate-800">Weave & Count:</span> {fabric.weave}
                  </p>
                  <p>
                    <span className="font-semibold text-chocolate-800">Recommended For:</span> {fabric.idealFor}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-cream-border flex items-center justify-between">
                <span className="text-xs text-chocolate-500 font-medium">Available by the meter</span>
                <Button
                  to={ROUTES.CONTACT}
                  variant="ghost"
                  size="sm"
                  className="text-maroon-800 hover:text-maroon-900 p-0"
                >
                  Ask about stock &rarr;
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Sourcing & Textile Authenticity Pledge */}
      <section className="bg-cream py-16 border-y border-cream-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Integrity of the Loom"
            title="The Fabric Home Purity Guarantee"
            subtitle="We examine thread tension, yarn authenticity, and colorfastness before any textile enters our boutique."
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-10">
            <div className="text-center p-6 bg-white rounded-sm border border-cream-border">
              <div className="h-12 w-12 rounded-full bg-amber-50 text-gold-dark mx-auto flex items-center justify-center mb-4 border border-gold/30">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h4 className="font-serif font-bold text-lg text-chocolate-900 mb-2">
                100% Fiber Certified
              </h4>
              <p className="text-xs text-chocolate-600 leading-relaxed font-sans">
                No synthetic adulteration in our pure silk, cotton, and linen offerings.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-sm border border-cream-border">
              <div className="h-12 w-12 rounded-full bg-maroon-50 text-maroon-800 mx-auto flex items-center justify-center mb-4 border border-maroon-200">
                <Feather className="h-6 w-6" />
              </div>
              <h4 className="font-serif font-bold text-lg text-chocolate-900 mb-2">
                Pre-Shrunk & Colorfast
              </h4>
              <p className="text-xs text-chocolate-600 leading-relaxed font-sans">
                Treated and prepared so your tailored bespoke garments maintain dimensions after dry cleaning.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-sm border border-cream-border">
              <div className="h-12 w-12 rounded-full bg-chocolate-50 text-chocolate-800 mx-auto flex items-center justify-center mb-4 border border-chocolate-200">
                <Droplet className="h-6 w-6" />
              </div>
              <h4 className="font-serif font-bold text-lg text-chocolate-900 mb-2">
                Direct Mill Partnerships
              </h4>
              <p className="text-xs text-chocolate-600 leading-relaxed font-sans">
                Direct relationships with heritage weavers eliminate intermediaries and guarantee fair artisan pricing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fabric Yardage Enquiry Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-chocolate-900 text-ivory rounded-sm p-8 sm:p-10 border border-gold/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-serif text-2xl font-bold">
              Looking for a Specific Colorway or Custom Yardage?
            </h3>
            <p className="text-xs sm:text-sm text-ivory/80">
              Visit Fabric Home at <strong>{BRAND_INFO.fabricShop.location}</strong> or call <strong>{BRAND_INFO.fabricShop.phone}</strong> for sample swatches.
            </p>
          </div>
          <Button
            to={ROUTES.CONTACT}
            variant="gold"
            size="md"
            className="shrink-0"
          >
            Visit Fabric Home
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FabricHomePage;
