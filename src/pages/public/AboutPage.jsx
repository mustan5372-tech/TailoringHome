import React from 'react';
import {
  Scissors,
  Layers,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  MapPin,
  Clock,
  Phone,
  Store,
  Sparkle,
} from 'lucide-react';

import {
  Button,
  Card,
  SectionHeading,
  Badge,
  ImageContainer,
} from '../../components/common';

import { aboutContent } from '../../data/aboutContent';
import { ROUTES } from '../../constants/navigation';

export const AboutPage = () => {
  const {
    hero,
    unifiedPhilosophy,
    tailoringHome,
    fabricHome,
    pillars,
    showroomNotice,
  } = aboutContent;

  const pillarIconMap = {
    Scissors: Scissors,
    Layers: Layers,
    ShieldCheck: ShieldCheck,
  };

  return (
    <div className="space-y-18 md:space-y-28 pb-20">
      {/* ====================================================================== */}
      {/* 1. HERO SECTION                                                        */}
      {/* ====================================================================== */}
      <section
        id="about-hero"
        className="relative bg-chocolate-950 text-ivory overflow-hidden border-b border-gold/30 scroll-mt-24 md:scroll-mt-28"
      >
        {/* Background Image with Dark Chocolate / Maroon Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={hero.backgroundImage}
            alt="Tailoring Home and Fabric Home atelier backdrop"
            className="w-full h-full object-cover object-center opacity-25 scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-chocolate-950/92 via-chocolate-900/88 to-chocolate-950/95" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(94,31,39,0.25)_0,transparent_70%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
          <div className="max-w-3xl">
            {/* Boutique Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="h-px w-8 bg-gold-light" />
              <Badge variant="gold" size="sm" icon={Sparkles}>
                {hero.badge}
              </Badge>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-ivory tracking-tight leading-[1.15]">
              {hero.headline}
            </h1>

            {/* Subheadline */}
            <p className="mt-6 text-base sm:text-lg text-cream/90 leading-relaxed font-sans max-w-2xl">
              {hero.subheadline}
            </p>

            {/* Dual CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Button
                to={ROUTES.TAILORING}
                variant="gold"
                size="lg"
                icon={Scissors}
              >
                Explore Tailoring Home
              </Button>
              <Button
                to={ROUTES.FABRIC}
                variant="outline"
                size="lg"
                icon={Layers}
                className="text-ivory border-gold/50 hover:bg-gold/10"
              >
                Explore Fabric Home
              </Button>
            </div>

            {/* Key Atelier Highlights */}
            <div className="mt-12 pt-8 border-t border-gold/20 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-sans text-cream/80">
              {hero.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-gold-light shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 2. UNIFIED PHILOSOPHY: TWO BUSINESSES UNDER ONE DESTINATION            */}
      {/* ====================================================================== */}
      <section
        id="unified-philosophy"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 md:scroll-mt-28"
      >
        <SectionHeading
          eyebrow={unifiedPhilosophy.eyebrow}
          title={unifiedPhilosophy.title}
          subtitle={unifiedPhilosophy.subtitle}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-12 items-start">
          {/* Story Narrative */}
          <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-chocolate-700 leading-relaxed font-sans">
            {unifiedPhilosophy.storyParagraphs.map((para, idx) => (
              <p key={idx} className="leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          {/* Business Structure & Provenance Card (With Editable Placeholders) */}
          <div className="lg:col-span-5 bg-cream/70 rounded-sm border-2 border-gold/40 p-6 sm:p-8 space-y-5 shadow-xs">
            <div className="flex items-center gap-2">
              <Store className="h-5 w-5 text-maroon-800" />
              <h3 className="font-serif font-bold text-xl text-chocolate-900">
                Atelier Profile & Structure
              </h3>
            </div>

            <div className="space-y-4 text-xs font-sans text-chocolate-700 border-t border-cream-border pt-4">
              <div>
                <span className="font-semibold text-chocolate-900 block text-[11px] uppercase tracking-wider mb-0.5">
                  Business Entity 1:
                </span>
                <p>
                  <strong>Tailoring Home:</strong> Bespoke stitching, pattern drafting, Dawoodi Bohra traditional attire, MSB & ABN school uniforms, and alterations.
                </p>
              </div>

              <div>
                <span className="font-semibold text-chocolate-900 block text-[11px] uppercase tracking-wider mb-0.5">
                  Business Entity 2:
                </span>
                <p>
                  <strong>Fabric Home:</strong> Certified natural fibers, fine silks, Swiss lawns, Rida jodis and lace borders, and regulation uniform textiles.
                </p>
              </div>

              <div className="pt-2 border-t border-cream-border/70 space-y-2 text-[11px] text-chocolate-500 italic">
                <p className="flex items-start gap-1.5">
                  <Sparkle className="h-3.5 w-3.5 text-gold-dark shrink-0 mt-0.5" />
                  <span>
                    Boutique Origin: {unifiedPhilosophy.establishmentInfo.foundingNote}
                  </span>
                </p>
                <p className="flex items-start gap-1.5">
                  <Sparkle className="h-3.5 w-3.5 text-gold-dark shrink-0 mt-0.5" />
                  <span>
                    Master Artisans: {unifiedPhilosophy.establishmentInfo.masterArtisans}
                  </span>
                </p>
                <p className="flex items-start gap-1.5">
                  <Sparkle className="h-3.5 w-3.5 text-gold-dark shrink-0 mt-0.5" />
                  <span>
                    Twin Destination: {unifiedPhilosophy.establishmentInfo.locationSummary}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 3. SEPARATE SECTION: TAILORING HOME                                    */}
      {/* ====================================================================== */}
      <section
        id={tailoringHome.id}
        className="bg-cream py-16 md:py-24 border-y border-cream-border scroll-mt-24 md:scroll-mt-28"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Visual Card */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <Card variant="default" padding="none" className="overflow-hidden shadow-md border-2 border-maroon-200">
                <ImageContainer
                  src={tailoringHome.image}
                  alt={tailoringHome.imageAlt}
                  aspectRatio="landscape"
                  category="tailoring"
                  badge={tailoringHome.name}
                  title={tailoringHome.tagline}
                />
                <div className="p-5 bg-white flex items-center justify-between gap-2 border-t border-cream-border">
                  <span className="text-xs font-semibold text-chocolate-800 font-sans">
                    Master Craftsmanship Atelier
                  </span>
                  <Badge variant="gold" size="xs">
                    Boutique Photo
                  </Badge>
                </div>
              </Card>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="maroon" size="xs" icon={Scissors}>
                    {tailoringHome.badge}
                  </Badge>
                  <span className="text-xs font-semibold text-maroon-800 font-sans tracking-wide">
                    {tailoringHome.tagline}
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-chocolate-900 tracking-tight">
                  {tailoringHome.name}
                </h2>
              </div>

              <p className="text-sm sm:text-base text-chocolate-600 leading-relaxed font-sans">
                {tailoringHome.description}
              </p>

              {/* Key Specialities Checklist */}
              <div className="space-y-3 pt-2">
                <div className="text-xs uppercase tracking-wider font-semibold text-chocolate-900 font-sans">
                  Core Atelier Specialities:
                </div>
                {tailoringHome.keySpecialities.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-chocolate-700 font-sans">
                    <CheckCircle2 className="h-4 w-4 text-maroon-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-chocolate-900">{item.title}:</strong>{' '}
                      <span>{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Button
                  to={tailoringHome.ctaTo}
                  variant="primary"
                  size="md"
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  {tailoringHome.ctaText}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 4. SEPARATE SECTION: FABRIC HOME                                       */}
      {/* ====================================================================== */}
      <section
        id={fabricHome.id}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 md:scroll-mt-28"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Content Column */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="chocolate" size="xs" icon={Layers}>
                  {fabricHome.badge}
                </Badge>
                <span className="text-xs font-semibold text-chocolate-700 font-sans tracking-wide">
                  {fabricHome.tagline}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-chocolate-900 tracking-tight">
                {fabricHome.name}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-chocolate-600 leading-relaxed font-sans">
              {fabricHome.description}
            </p>

            {/* Key Specialities Checklist */}
            <div className="space-y-3 pt-2">
              <div className="text-xs uppercase tracking-wider font-semibold text-chocolate-900 font-sans">
                Curated Textile Specialities:
              </div>
              {fabricHome.keySpecialities.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-chocolate-700 font-sans">
                  <CheckCircle2 className="h-4 w-4 text-chocolate-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-chocolate-900">{item.title}:</strong>{' '}
                    <span>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Button
                to={fabricHome.ctaTo}
                variant="secondary"
                size="md"
                icon={ArrowRight}
                iconPosition="right"
              >
                {fabricHome.ctaText}
              </Button>
            </div>
          </div>

          {/* Visual Card */}
          <div className="lg:col-span-5">
            <Card variant="default" padding="none" className="overflow-hidden shadow-md border-2 border-chocolate-200">
              <ImageContainer
                src={fabricHome.image}
                alt={fabricHome.imageAlt}
                aspectRatio="landscape"
                category="fabric"
                badge={fabricHome.name}
                title={fabricHome.tagline}
              />
              <div className="p-5 bg-white flex items-center justify-between gap-2 border-t border-cream-border">
                <span className="text-xs font-semibold text-chocolate-800 font-sans">
                  Certified Textile Repository
                </span>
                <Badge variant="dark" size="xs">
                  Sample Preview
                </Badge>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 5. CRAFTSMANSHIP, FABRIC VARIETY & CUSTOMER EXPERIENCE                 */}
      {/* ====================================================================== */}
      <section
        id="pillars-of-excellence"
        className="bg-cream py-16 md:py-24 border-y border-cream-border scroll-mt-24 md:scroll-mt-28"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Atelier Standards"
            title="Pillars of Our Craft & Service"
            subtitle="The fundamental commitments defining our tailoring precision, fabric sourcing ethics, and client consultation."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {pillars.map((pillar) => {
              const IconComponent = pillarIconMap[pillar.icon] || Scissors;
              return (
                <Card
                  key={pillar.id}
                  variant="default"
                  className="flex flex-col justify-between border border-cream-border shadow-2xs hover:border-chocolate-300 hover:shadow-xs transition-all duration-300"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="h-12 w-12 rounded-sm bg-cream text-maroon-800 flex items-center justify-center border border-cream-border">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <Badge variant="gold" size="xs">
                        {pillar.badge}
                      </Badge>
                    </div>

                    <div>
                      <h3 className="font-serif font-bold text-xl text-chocolate-900 mb-1">
                        {pillar.title}
                      </h3>
                      <p className="text-xs font-semibold text-maroon-800 font-sans uppercase tracking-wider">
                        {pillar.subtitle}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-chocolate-600 leading-relaxed font-sans">
                      {pillar.description}
                    </p>

                    <div className="space-y-2 pt-4 border-t border-cream-border text-xs text-chocolate-700 font-sans">
                      {pillar.points.map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-gold-dark shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 6. PHYSICAL SHOWROOM & IN-PERSON CONSULTATION BANNER                   */}
      {/* ====================================================================== */}
      <section
        id="showroom-consultation"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 md:scroll-mt-28"
      >
        <div className="bg-chocolate-950 text-ivory rounded-sm p-8 sm:p-12 border border-gold/30 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-4">
              <Badge variant="gold" size="sm" icon={Sparkles}>
                {showroomNotice.eyebrow}
              </Badge>

              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ivory">
                {showroomNotice.title}
              </h2>

              <p className="text-sm sm:text-base text-cream/80 leading-relaxed font-sans">
                {showroomNotice.subtitle}
              </p>

              <p className="text-xs text-gold-light/90 italic font-sans pt-1">
                Note: Showroom addresses and phone numbers below are demonstration placeholders until verified business details are updated.
              </p>

              {/* Showroom Meta Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs font-sans text-cream/90">
                <div className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="text-cream/60 block text-[11px]">Tailoring Home Atelier</span>
                    <span>{showroomNotice.tailoringAddress}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="text-cream/60 block text-[11px]">Fabric Home Pavilion</span>
                    <span>{showroomNotice.fabricAddress}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Phone className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="text-cream/60 block text-[11px]">Primary Phone</span>
                    <span>{showroomNotice.phone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="text-cream/60 block text-[11px]">Visiting Hours</span>
                    <span>{showroomNotice.hours}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column Action */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="bg-chocolate-900/90 border border-gold/30 p-6 rounded-sm space-y-4">
                <div className="flex items-center gap-2 text-gold">
                  <Store className="h-5 w-5" />
                  <h4 className="font-serif font-bold text-lg text-ivory">
                    In-Person Fitting & Swatches
                  </h4>
                </div>
                <p className="text-xs text-cream/80 leading-relaxed font-sans">
                  Schedule an unhurried session with our master cutter to discuss measurements or review physical swatch books in person.
                </p>
                <Button
                  href={showroomNotice.whatsappUrl}
                  variant="gold"
                  size="md"
                  fullWidth
                  icon={MessageCircle}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Schedule via WhatsApp
                </Button>
              </div>

              <Button
                to={ROUTES.CONTACT}
                variant="outline"
                size="md"
                fullWidth
                className="text-ivory border-gold/40 hover:bg-gold/10"
              >
                View Full Contact Page
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
