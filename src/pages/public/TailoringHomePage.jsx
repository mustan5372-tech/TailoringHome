import React from 'react';
import {
  Scissors,
  Calendar,
} from 'lucide-react';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card } from '../../components/common/Card';
import { ROUTES, BRAND_INFO } from '../../constants/navigation';

export const TailoringHomePage = () => {
  // Service category placeholders for catalogue display
  const serviceCategories = [
    {
      title: 'Bespoke Suits & Tuxedos',
      desc: 'Hand-canvassed construction, sharp lapel geometry, customized interior linings, and timeless silhouette drape.',
      tags: ['Two-Piece', 'Three-Piece', 'Smoking Jackets', 'Blazers'],
    },
    {
      title: 'Royal Ethnic & Wedding Regalia',
      desc: 'Handcrafted Sherwanis, Bandhgalas, Indo-Western coats, Kurta-Pajamas, and celebratory wedding ensembles.',
      tags: ['Sherwani', 'Bandhgala', 'Indo-Western', 'Kurta'],
    },
    {
      title: 'Custom Sartorial Shirts & Trousers',
      desc: 'Precision collar cuts (spread, cutaway, mandarin), monograms, mother-of-pearl buttons, and pleated or flat-front trousers.',
      tags: ['Formal Shirts', 'Linen Casuals', 'Pleated Trousers', 'Chinos'],
    },
    {
      title: 'Women’s Couture & Traditional Wear',
      desc: 'Exquisite blouses, Anarkali gowns, structured pantsuits, formal waistcoats, and festive coordinates.',
      tags: ['Designer Blouse', 'Anarkali', 'Pantsuits', 'Lehenga Fitting'],
    },
    {
      title: 'Master Alterations & Restyling',
      desc: 'Precision tapering, shoulder repositioning, hem adjustments, relining, and modernizing heritage heirloom garments.',
      tags: ['Suit Alteration', 'Length Adjustment', 'Waist Resizing'],
    },
    {
      title: 'Corporate & Bulk Uniform Tailoring',
      desc: 'Cohesive bespoke uniforms for executive teams, luxury hotels, corporate houses, and fine dining establishments.',
      tags: ['Executive Suits', 'Hospitality', 'Staff Formals'],
    },
  ];

  const steps = [
    {
      step: '01',
      title: 'Fabric & Style Consultation',
      desc: 'Discuss your vision, browse recommended cloths from Fabric Home, and select lapels, pockets, buttons, and linings.',
    },
    {
      step: '02',
      title: 'Anatomical Measurements',
      desc: 'Over 28 precise posture and body measurements recorded by our master cutter for an individual pattern draft.',
    },
    {
      step: '03',
      title: 'Baste Fitting & Sculpting',
      desc: 'A trial session with uncompleted baste stitching allows minute adjustments to shoulder incline, balance, and sleeve drape.',
    },
    {
      step: '04',
      title: 'Hand Finishes & Handover',
      desc: 'Hand-sewn buttonholes, press steaming, final inspection, and delivery in a breathable protective boutique garment bag.',
    },
  ];

  return (
    <div className="space-y-16 md:space-y-24 pb-16">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-maroon-50/60 to-ivory border-b border-cream-border py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="maroon" size="sm" className="mb-4">
            Atelier Portfolio
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-chocolate-900 tracking-tight">
            Tailoring Home
          </h1>
          <p className="mt-4 text-base sm:text-lg text-chocolate-600 max-w-2xl mx-auto leading-relaxed font-sans">
            Artisanal tailoring, meticulous hand cutting, and custom styling engineered to fit your distinct anatomy and personal posture.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button
              to={ROUTES.CONTACT}
              variant="primary"
              size="md"
              icon={Calendar}
            >
              Book Measurement Session
            </Button>
            <Button
              to={ROUTES.GALLERY}
              variant="outline"
              size="md"
            >
              View Finished Work
            </Button>
          </div>
        </div>
      </section>

      {/* Services Catalogue Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Specialized Offerings"
          title="Stitching & Tailoring Catalogue"
          subtitle="Every garment is tailored from raw cloth to personal masterpiece. Browse our core tailoring specialities."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {serviceCategories.map((item, index) => (
            <Card key={index} variant="default" className="flex flex-col justify-between">
              <div>
                <div className="h-10 w-10 rounded-sm bg-maroon-50 text-maroon-800 flex items-center justify-center mb-4 border border-maroon-200/50">
                  <Scissors className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-xl font-bold text-chocolate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-chocolate-600 leading-relaxed mb-6 font-sans">
                  {item.desc}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-cream-border">
                  {item.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="text-[11px] font-medium px-2 py-0.5 rounded bg-cream text-chocolate-700 border border-cream-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* The 4-Step Bespoke Tailoring Experience */}
      <section className="bg-cream py-16 border-y border-cream-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Craftsmanship Journey"
            title="The Bespoke Process"
            subtitle="From first consultation to final stitch, our 4-step craft ensures an impeccable fit that off-the-rack garments cannot replicate."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {steps.map((st, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-sm border border-cream-border relative shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <span className="font-serif text-3xl font-bold text-gold-dark mb-3 block">
                    {st.step}
                  </span>
                  <h4 className="font-serif font-bold text-lg text-chocolate-900 mb-2">
                    {st.title}
                  </h4>
                  <p className="text-xs text-chocolate-600 leading-relaxed font-sans">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tailoring Enquiries Box */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-maroon-900 text-ivory rounded-sm p-8 sm:p-10 border border-gold/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-serif text-2xl font-bold">
              Require Bespoke Consultation or Urgent Alteration?
            </h3>
            <p className="text-xs sm:text-sm text-ivory/80">
              Speak directly with our Master Cutter at <strong>{BRAND_INFO.tailoringShop.phone}</strong> or visit our boutique.
            </p>
          </div>
          <Button
            to={ROUTES.CONTACT}
            variant="gold"
            size="md"
            className="shrink-0"
          >
            Visit Tailoring Home
          </Button>
        </div>
      </section>
    </div>
  );
};

export default TailoringHomePage;
