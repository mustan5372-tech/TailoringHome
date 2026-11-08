import React from 'react';
import {
  Scissors,
  Layers,
  ArrowRight,
  Compass,
  Award,
  PhoneCall,
} from 'lucide-react';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card } from '../../components/common/Card';
import { ROUTES } from '../../constants/navigation';

export const HomePage = () => {
  return (
    <div className="space-y-16 md:space-y-24 pb-16">
      {/* Hero Showcase Section */}
      <section
        id="overview"
        className="relative bg-gradient-to-b from-cream to-ivory border-b border-cream-border pt-16 pb-20 md:pt-24 md:pb-28 scroll-mt-24 md:scroll-mt-28"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-maroon-50 border border-maroon-200/80 mb-6">
            <span className="text-xs font-semibold tracking-widest text-maroon-800 uppercase">
              Unified Boutique Catalogue
            </span>
          </div>

          {/* Hero Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-chocolate-900 tracking-tight leading-tight max-w-4xl mx-auto">
            Where Sartorial Craftsmanship Meets Exquisite Textiles
          </h1>

          <p className="mt-6 text-base sm:text-lg text-chocolate-600 max-w-2xl mx-auto leading-relaxed font-sans">
            Welcome to the online showcase of <strong>Tailoring Home</strong> and <strong>Fabric Home</strong>.
            Explore our artisanal stitching services and curated collections of premium fabrics.
          </p>

          {/* Quick Dual Actions */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              to={ROUTES.TAILORING}
              variant="primary"
              size="lg"
              icon={Scissors}
              className="shadow-md"
            >
              Explore Tailoring Services
            </Button>
            <Button
              to={ROUTES.FABRIC}
              variant="secondary"
              size="lg"
              icon={Layers}
              className="shadow-md"
            >
              Discover Fabric Varieties
            </Button>
          </div>
        </div>
      </section>

      {/* Dual Shop Showcase Portals */}
      <section
        id="boutiques"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 md:scroll-mt-28"
      >
        <SectionHeading
          eyebrow="Two Distinct Entities"
          title="Curated Under One Prestigious Roof"
          subtitle="Whether you seek master bespoke craftsmanship or the world's most delicate woven cloths, discover our specialized ateliers below."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-10">
          {/* Shop 1: Tailoring Home */}
          <div className="group relative rounded-sm bg-gradient-to-br from-cream to-white border-2 border-maroon-100 hover:border-maroon-300 p-8 sm:p-10 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="h-14 w-14 rounded-sm bg-maroon-800 text-gold flex items-center justify-center shadow-xs">
                <Scissors className="h-7 w-7" />
              </div>
              <Badge variant="maroon" size="sm">
                Bespoke Atelier
              </Badge>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-chocolate-900 mb-3">
              Tailoring Home
            </h3>

            <p className="text-chocolate-600 text-sm sm:text-base leading-relaxed mb-6 font-sans">
              Precision master cutting, bespoke suit tailoring, ceremonial ethnic wear, handcrafted shirts, and tailored alterations engineered for individual perfection.
            </p>

            <div className="space-y-2.5 mb-8 text-xs sm:text-sm text-chocolate-700">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-maroon-700"></span>
                <span>Custom Measurement & Personal Silhouette Styling</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-maroon-700"></span>
                <span>Suits, Tuxedos, Sherwanis, Blazers & Kurtas</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-maroon-700"></span>
                <span>Express Finishing & Precision Alteration Service</span>
              </div>
            </div>

            <Button
              to={ROUTES.TAILORING}
              variant="maroonOutline"
              className="w-full justify-between"
              icon={ArrowRight}
              iconPosition="right"
            >
              Browse Tailoring Catalogue
            </Button>
          </div>

          {/* Shop 2: Fabric Home */}
          <div className="group relative rounded-sm bg-gradient-to-br from-cream to-white border-2 border-chocolate-200 hover:border-chocolate-400 p-8 sm:p-10 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="h-14 w-14 rounded-sm bg-chocolate-800 text-gold flex items-center justify-center shadow-xs">
                <Layers className="h-7 w-7" />
              </div>
              <Badge variant="chocolate" size="sm">
                Textile Archive
              </Badge>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-chocolate-900 mb-3">
              Fabric Home
            </h3>

            <p className="text-chocolate-600 text-sm sm:text-base leading-relaxed mb-6 font-sans">
              An expansive repository of handpicked textiles: pure Banarasi silks, crisp Irish and European linens, Egyptian Giza cottons, raw silks, and regal jacquards.
            </p>

            <div className="space-y-2.5 mb-8 text-xs sm:text-sm text-chocolate-700">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-chocolate-700"></span>
                <span>Pure Mulberry, Tussar & Banarasi Silks</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-chocolate-700"></span>
                <span>Breathable Natural Linens & Fine Wool Blends</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-chocolate-700"></span>
                <span>Embroidered Brocades & Festive Fabric Yards</span>
              </div>
            </div>

            <Button
              to={ROUTES.FABRIC}
              variant="outline"
              className="w-full justify-between"
              icon={ArrowRight}
              iconPosition="right"
            >
              Explore Textile Varieties
            </Button>
          </div>
        </div>
      </section>

      {/* Boutique Values & Standards */}
      <section
        id="standards"
        className="bg-cream py-16 border-y border-cream-border scroll-mt-24 md:scroll-mt-28"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card variant="default">
              <Award className="h-8 w-8 text-maroon-700 mb-3" />
              <h4 className="font-serif font-bold text-lg text-chocolate-900 mb-1">
                Artisanal Masters
              </h4>
              <p className="text-xs text-chocolate-600 leading-relaxed">
                Over 25 years of generational tailoring wisdom and pattern mastery.
              </p>
            </Card>

            <Card variant="default">
              <Layers className="h-8 w-8 text-chocolate-700 mb-3" />
              <h4 className="font-serif font-bold text-lg text-chocolate-900 mb-1">
                Certified Purity
              </h4>
              <p className="text-xs text-chocolate-600 leading-relaxed">
                Authentic fabric origins with strict natural fiber and thread count verification.
              </p>
            </Card>

            <Card variant="default">
              <Compass className="h-8 w-8 text-gold-dark mb-3" />
              <h4 className="font-serif font-bold text-lg text-chocolate-900 mb-1">
                Bespoke Fitting
              </h4>
              <p className="text-xs text-chocolate-600 leading-relaxed">
                Individual trial sessions guaranteeing silhouette harmony and posture precision.
              </p>
            </Card>

            <Card variant="default">
              <Award className="h-8 w-8 text-maroon-800 mb-3" />
              <h4 className="font-serif font-bold text-lg text-chocolate-900 mb-1">
                Punctual Delivery
              </h4>
              <p className="text-xs text-chocolate-600 leading-relaxed">
                Reliable turnaround times for celebratory dates and corporate occasions.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Consultation Call to Action */}
      <section
        id="consultation"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 md:scroll-mt-28"
      >
        <div className="bg-gradient-to-r from-chocolate-900 via-maroon-900 to-chocolate-900 text-ivory rounded-sm p-8 md:p-12 border border-gold/30 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <Badge variant="gold" size="xs" className="mb-3">
              Personalized Consultation
            </Badge>
            <h3 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-ivory">
              Plan Your Bespoke Wardrobe
            </h3>
            <p className="text-ivory/80 text-sm md:text-base leading-relaxed mb-8 font-sans">
              Visit our boutique showroom to feel the fabrics in person or consult with our master tailors for your upcoming event.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button
                to="/contact#enquiry-form"
                variant="gold"
                size="md"
                icon={PhoneCall}
              >
                Contact Our Boutiques
              </Button>
              <Button
                to={ROUTES.GALLERY}
                variant="outline"
                size="md"
                className="text-ivory border-ivory/40 hover:bg-white/10"
              >
                View Creation Gallery
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
