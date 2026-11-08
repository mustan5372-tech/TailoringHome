import React from 'react';
import { Scissors, Layers, Award, Shield, Users } from 'lucide-react';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Badge } from '../../components/common/Badge';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';

export const AboutPage = () => {
  return (
    <div className="space-y-16 md:space-y-24 pb-16">
      {/* Header Banner */}
      <section
        id="about-hero"
        className="bg-gradient-to-b from-cream to-ivory border-b border-cream-border py-14 md:py-20 text-center scroll-mt-24 md:scroll-mt-28"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="maroon" size="sm" className="mb-4">
            Our Heritage & Story
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-chocolate-900 tracking-tight">
            Two Crafts, One Unified Vision
          </h1>
          <p className="mt-4 text-base sm:text-lg text-chocolate-600 max-w-2xl mx-auto leading-relaxed font-sans">
            Tailoring Home and Fabric Home were established with an unwavering belief: true sartorial elegance is born when exquisite cloth meets anatomical tailoring perfection.
          </p>
        </div>
      </section>

      {/* The Story of Both Shops */}
      <section
        id="our-story"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 md:scroll-mt-28"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Shop 1: Tailoring Home Story */}
          <div className="bg-white p-8 sm:p-10 rounded-sm border border-cream-border shadow-2xs space-y-4">
            <div className="flex items-center gap-2 text-maroon-800">
              <Scissors className="h-6 w-6" />
              <h3 className="font-serif text-2xl font-bold">The Story of Tailoring Home</h3>
            </div>
            <p className="text-sm text-chocolate-600 leading-relaxed font-sans">
              Founded by master craftsmen dedicated to bespoke dressmaking, Tailoring Home began as a boutique studio focusing on hand-canvassed formal suits and royal Indian silhouettes.
            </p>
            <p className="text-sm text-chocolate-600 leading-relaxed font-sans">
              Unlike industrial mass-production, our master cutters draft unique patterns for every client, accounting for individual nuances like shoulder slope, neck posture, and stride balance. Every seam is engineered for comfort, grace, and longevity.
            </p>
            <div className="pt-2 text-xs font-semibold text-maroon-700 uppercase tracking-widest">
              &bull; 25+ Years Master Cutting Experience
            </div>
          </div>

          {/* Shop 2: Fabric Home Story */}
          <div className="bg-white p-8 sm:p-10 rounded-sm border border-cream-border shadow-2xs space-y-4">
            <div className="flex items-center gap-2 text-chocolate-800">
              <Layers className="h-6 w-6" />
              <h3 className="font-serif text-2xl font-bold">The Vision of Fabric Home</h3>
            </div>
            <p className="text-sm text-chocolate-600 leading-relaxed font-sans">
              Fabric Home emerged from an obsession with authentic textiles. Great tailoring requires pristine fabric with pure natural fibers, consistent warp-weft density, and timeless color depth.
            </p>
            <p className="text-sm text-chocolate-600 leading-relaxed font-sans">
              We travel directly to handloom weaving clusters and historic mills across Varanasi, Normandy, Ireland, and Biella to select silks, linens, fine cottons, and wools. We offer our clients certified purity and endless variety for bespoke expression.
            </p>
            <div className="pt-2 text-xs font-semibold text-chocolate-700 uppercase tracking-widest">
              &bull; Certified Natural Fiber Sourcing
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section
        id="principles"
        className="bg-cream py-16 border-y border-cream-border scroll-mt-24 md:scroll-mt-28"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Commitment"
            title="Pillars of the Atelier"
            subtitle="The fundamental standards upholding every garment we tailor and every meter of cloth we curate."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <Card variant="default">
              <Shield className="h-8 w-8 text-gold-dark mb-3" />
              <h4 className="font-serif font-bold text-lg text-chocolate-900 mb-2">
                Uncompromising Quality
              </h4>
              <p className="text-xs text-chocolate-600 leading-relaxed font-sans">
                We never cut corners with cheap synthetic linings, glued interlinings, or substandard threads.
              </p>
            </Card>

            <Card variant="default">
              <Users className="h-8 w-8 text-maroon-800 mb-3" />
              <h4 className="font-serif font-bold text-lg text-chocolate-900 mb-2">
                Fair Artisan Heritage
              </h4>
              <p className="text-xs text-chocolate-600 leading-relaxed font-sans">
                Our master cutters and handloom weavers are celebrated as partners, preserving generational artisan craft.
              </p>
            </Card>

            <Card variant="default">
              <Award className="h-8 w-8 text-chocolate-700 mb-3" />
              <h4 className="font-serif font-bold text-lg text-chocolate-900 mb-2">
                Personalized Care
              </h4>
              <p className="text-xs text-chocolate-600 leading-relaxed font-sans">
                Every visitor receives attentive, private consultation without high-pressure sales tactics.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Invitation CTA */}
      <section
        id="visit-cta"
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center scroll-mt-24 md:scroll-mt-28"
      >
        <h3 className="font-serif text-3xl font-bold text-chocolate-900 mb-4">
          Experience the Difference in Person
        </h3>
        <p className="text-sm text-chocolate-600 max-w-xl mx-auto mb-8 font-sans">
          Visit our twin boutiques to touch our cloths, inspect our tailoring finishes, and consult with our master artisans.
        </p>
        <Button to="/contact#locations" variant="primary" size="lg">
          Plan Your Visit
        </Button>
      </section>
    </div>
  );
};

export default AboutPage;
