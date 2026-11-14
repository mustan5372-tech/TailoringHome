import React from 'react';
import { Link } from 'react-router-dom';
import {
  Scissors,
  Layers,
  ArrowRight,
  ShieldCheck,
  Ruler,
  Eye,
  Clock,
  Phone,
  MessageCircle,
  MapPin,
  Sparkles,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

import {
  Button,
  Card,
  SectionHeading,
  Badge,
  ImageContainer,
  ScrollReveal,
} from '../../components/common';

import { homeContent } from '../../data/homeContent';
import { ROUTES } from '../../constants/navigation';

export const HomePage = () => {
  const {
    hero,
    businessIntros,
    tailoringHighlights,
    tailoringFilterTabs = [],
    fabricHighlights,
    fabricFilterTabs = [],
    galleryPreview,
    whyChooseUs,
    contact,
  } = homeContent;

  // Active filter state for category tabs
  const [activeTailoringFilter, setActiveTailoringFilter] = React.useState('all');
  const [activeFabricFilter, setActiveFabricFilter] = React.useState('all');

  // Filtered lists
  const filteredTailoring = React.useMemo(() => {
    if (activeTailoringFilter === 'all') return tailoringHighlights;
    return tailoringHighlights.filter((item) => item.group === activeTailoringFilter);
  }, [activeTailoringFilter, tailoringHighlights]);

  const filteredFabric = React.useMemo(() => {
    if (activeFabricFilter === 'all') return fabricHighlights;
    return fabricHighlights.filter((item) => item.group === activeFabricFilter);
  }, [activeFabricFilter, fabricHighlights]);

  // Tab counts
  const getTailoringCount = (tabId) => {
    if (tabId === 'all') return tailoringHighlights.length;
    return tailoringHighlights.filter((item) => item.group === tabId).length;
  };

  const getFabricCount = (tabId) => {
    if (tabId === 'all') return fabricHighlights.length;
    return fabricHighlights.filter((item) => item.group === tabId).length;
  };

  // Icon mapping for Why Choose Us section
  const iconMap = {
    Scissors: Scissors,
    ShieldCheck: ShieldCheck,
    Layers: Layers,
    Ruler: Ruler,
    Eye: Eye,
    Clock: Clock,
  };

  return (
    <div className="space-y-20 md:space-y-28 pb-20">
      {/* ====================================================================== */}
      {/* 1. HERO SECTION                                                        */}
      {/* ====================================================================== */}
      <section
        id="overview"
        className="relative bg-chocolate-950 text-ivory overflow-hidden border-b border-gold/30 scroll-mt-24 md:scroll-mt-28"
      >
        {/* Background Image with Dark Chocolate / Maroon Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          {hero.backgroundImage && (
            <img
              src={hero.backgroundImage}
              alt="Tailoring atelier and luxury fabrics backdrop"
              className="animate-hero-bg w-full h-full object-cover object-center opacity-30 scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-chocolate-950/90 via-chocolate-900/85 to-chocolate-950/95" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(94,31,39,0.25)_0,transparent_70%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-36 text-center">
          {/* Eyebrow Badge */}
          <div className="animate-hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-maroon-900/80 border border-gold/40 text-gold-light mb-8 shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            <span className="text-xs font-semibold tracking-widest uppercase font-sans">
              {hero.badge}
            </span>
          </div>

          {/* Premium Headline */}
          <h1 className="animate-hero-headline text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-tight max-w-4xl mx-auto text-ivory">
            {hero.headline}
          </h1>

          {/* Introduction */}
          <p className="animate-hero-subtitle mt-6 text-base sm:text-lg text-ivory/85 max-w-2xl mx-auto leading-relaxed font-sans">
            {hero.subheadline}
          </p>

          {/* Dual Navigation Buttons */}
          <div className="animate-hero-cta mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              to={hero.primaryCta.to}
              variant="primary"
              size="lg"
              icon={Scissors}
              className="shadow-md hover:shadow-lg"
            >
              {hero.primaryCta.label}
            </Button>
            <Button
              to={hero.secondaryCta.to}
              variant="gold"
              size="lg"
              icon={Layers}
              className="shadow-md hover:shadow-lg text-chocolate-950 font-semibold"
            >
              {hero.secondaryCta.label}
            </Button>
          </div>

          {/* Highlights Ribbon */}
          <div className="animate-hero-highlights mt-14 pt-8 border-t border-ivory/15 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto text-xs sm:text-sm text-ivory/80 font-sans">
            {hero.highlights.map((item, index) => (
              <div key={index} className="flex items-center justify-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gold"></span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 2. BUSINESS INTRODUCTION (Tailoring Home & Fabric Home)                */}
      {/* ====================================================================== */}
      <section
        id="boutiques"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 md:scroll-mt-28"
      >
        <ScrollReveal>
          <SectionHeading
            eyebrow="Two Distinct Entities"
            title="Curated Under One Prestigious Roof"
            subtitle="Explore the separate disciplines of our master bespoke tailoring studio and our premier repository of certified fine textiles."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-12">
          {/* Card 1: Tailoring Home */}
          <ScrollReveal delay={100} className="h-full">
            <Card
              variant="default"
              padding="none"
              className="group overflow-hidden border-2 border-maroon-100 hover:border-maroon-300 transition-all duration-300 flex flex-col justify-between h-full"
            >
            <div>
              {/* Image Showcase */}
              <ImageContainer
                src={businessIntros.tailoring.image}
                alt="Tailoring Home master tailoring studio"
                aspectRatio="landscape"
                category="tailoring"
                badge={businessIntros.tailoring.badge}
                title={businessIntros.tailoring.name}
                subtitle={businessIntros.tailoring.tagline}
              />

              <div className="p-7 sm:p-9 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-sm bg-maroon-800 text-gold flex items-center justify-center shadow-xs">
                      <Scissors className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-chocolate-900">
                        {businessIntros.tailoring.name}
                      </h3>
                      <p className="text-xs uppercase tracking-wider text-maroon-700 font-semibold font-sans">
                        {businessIntros.tailoring.tagline}
                      </p>
                    </div>
                  </div>
                  <Badge variant="maroon" size="sm">
                    {businessIntros.tailoring.badge}
                  </Badge>
                </div>

                <p className="text-sm text-chocolate-600 leading-relaxed font-sans">
                  {businessIntros.tailoring.description}
                </p>

                <div className="space-y-2.5 pt-2 border-t border-cream-border text-xs sm:text-sm text-chocolate-700">
                  {businessIntros.tailoring.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-maroon-700 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-7 sm:p-9 pt-0">
              <Button
                to={businessIntros.tailoring.ctaTo}
                variant="maroonOutline"
                fullWidth
                icon={ArrowRight}
                iconPosition="right"
                className="justify-between"
              >
                {businessIntros.tailoring.ctaText}
              </Button>
            </div>
          </Card>
        </ScrollReveal>

          {/* Card 2: Fabric Home */}
          <ScrollReveal delay={200} className="h-full">
            <Card
              variant="default"
              padding="none"
              className="group overflow-hidden border-2 border-chocolate-200 hover:border-chocolate-400 transition-all duration-300 flex flex-col justify-between h-full"
            >
            <div>
              {/* Image Showcase */}
              <ImageContainer
                src={businessIntros.fabric.image}
                alt="Fabric Home luxury textiles collection"
                aspectRatio="landscape"
                category="fabric"
                badge={businessIntros.fabric.badge}
                title={businessIntros.fabric.name}
                subtitle={businessIntros.fabric.tagline}
              />

              <div className="p-7 sm:p-9 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-sm bg-chocolate-800 text-gold flex items-center justify-center shadow-xs">
                      <Layers className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-chocolate-900">
                        {businessIntros.fabric.name}
                      </h3>
                      <p className="text-xs uppercase tracking-wider text-chocolate-600 font-semibold font-sans">
                        {businessIntros.fabric.tagline}
                      </p>
                    </div>
                  </div>
                  <Badge variant="chocolate" size="sm">
                    {businessIntros.fabric.badge}
                  </Badge>
                </div>

                <p className="text-sm text-chocolate-600 leading-relaxed font-sans">
                  {businessIntros.fabric.description}
                </p>

                <div className="space-y-2.5 pt-2 border-t border-cream-border text-xs sm:text-sm text-chocolate-700">
                  {businessIntros.fabric.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-chocolate-700 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-7 sm:p-9 pt-0">
              <Button
                to={businessIntros.fabric.ctaTo}
                variant="outline"
                fullWidth
                icon={ArrowRight}
                iconPosition="right"
                className="justify-between"
              >
                {businessIntros.fabric.ctaText}
              </Button>
            </div>
          </Card>
        </ScrollReveal>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 3. TAILORING HIGHLIGHTS (Stitching & Tailoring Service Categories)      */}
      {/* ====================================================================== */}
      <section
        id="tailoring-highlights"
        className="bg-cream py-18 md:py-24 border-y border-cream-border scroll-mt-24 md:scroll-mt-28"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Sartorial Offerings"
              title="Tailoring Home Specialities"
              subtitle="Bespoke craftsmanship for Dawoodi Bohra traditional attire, official school uniforms, gentlemen's suits and fine alterations."
            />
          </ScrollReveal>

          {/* Category Filter Tabs */}
          {tailoringFilterTabs.length > 0 && (
            <ScrollReveal delay={100}>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-8 mb-10">
              {tailoringFilterTabs.map((tab) => {
                const isActive = activeTailoringFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTailoringFilter(tab.id)}
                    type="button"
                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-sm text-xs sm:text-sm font-sans transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-maroon-800 text-ivory font-semibold shadow-xs ring-2 ring-maroon-800/30'
                        : tab.isFeatured
                        ? 'bg-amber-50/80 text-gold-dark hover:bg-amber-100/80 border border-gold/40 font-medium'
                        : 'bg-white/80 hover:bg-cream text-chocolate-700 hover:text-chocolate-900 border border-cream-border font-medium'
                    }`}
                  >
                    {tab.isFeatured && <Sparkles className="h-3.5 w-3.5 text-gold-dark" />}
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-sans ${
                        isActive
                          ? 'bg-maroon-900/60 text-ivory'
                          : 'bg-cream-border/70 text-chocolate-600'
                      }`}
                    >
                      {getTailoringCount(tab.id)}
                    </span>
                  </button>
                );
              })}
            </div>
            </ScrollReveal>
          )}

          {/* Tailoring Category Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTailoring.map((item, idx) => (
              <ScrollReveal key={item.id} delay={((idx % 4) + 1) * 70} className="h-full">
                <Card
                  variant="default"
                  padding="none"
                  className={`overflow-hidden flex flex-col justify-between transition-all duration-300 h-full ${
                    item.isCommunitySpecial
                      ? 'border-2 border-gold/50 shadow-xs hover:border-gold hover:shadow-md ring-1 ring-gold/20'
                      : 'border border-cream-border hover:border-chocolate-300 hover:shadow-xs'
                  }`}
                >
                <div>
                  <ImageContainer
                    src={item.image}
                    alt={item.title}
                    aspectRatio="landscape"
                    category="tailoring"
                    gradient={item.gradient}
                    badge={item.category}
                    title={item.title}
                  />

                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <Badge
                        variant={item.badgeVariant || (item.isCommunitySpecial ? 'gold' : 'maroon')}
                        size="xs"
                        icon={item.isCommunitySpecial ? Sparkles : undefined}
                      >
                        {item.badge}
                      </Badge>
                      {item.isRepresentativeImage && (
                        <span className="text-[10px] text-chocolate-400 font-sans tracking-wide">
                          Sample Preview
                        </span>
                      )}
                    </div>

                    <h4 className="font-serif font-bold text-lg text-chocolate-900 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-xs text-chocolate-600 leading-relaxed font-sans mb-3 line-clamp-3">
                      {item.description}
                    </p>

                    {item.notice && (
                      <p className="text-[11px] text-chocolate-600 bg-cream/90 p-2.5 rounded-sm border border-cream-border mb-3 font-sans leading-relaxed italic">
                        {item.notice}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-cream-border">
                      {item.tags.map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="text-[10px] font-medium px-2 py-0.5 rounded bg-cream text-chocolate-700 border border-cream-border"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    to={ROUTES.TAILORING}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-maroon-800 hover:text-maroon-900 transition-colors pt-2"
                  >
                    <span>View Service Details</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </Card>
            </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={150} className="mt-12 text-center">
            <Button
              to={ROUTES.TAILORING}
              variant="primary"
              size="md"
              icon={Scissors}
            >
              Explore Complete Tailoring Catalogue
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 4. FABRIC HIGHLIGHTS (Curated Fabric Varieties Preview)                */}
      {/* ====================================================================== */}
      <section
        id="fabric-highlights"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 md:scroll-mt-28"
      >
        <ScrollReveal>
          <SectionHeading
            eyebrow="Textile Repository"
            title="Curated Fabric Varieties"
            subtitle="Specialized Rida materials, Kurta-Saya Swiss lawns and cambrics, approved MSB & ABN uniform textiles alongside pure silks, Irish linens and luxury wools."
          />
        </ScrollReveal>

        {/* Category Filter Tabs */}
        {fabricFilterTabs.length > 0 && (
          <ScrollReveal delay={100}>
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8 mb-10">
              {fabricFilterTabs.map((tab) => {
                const isActive = activeFabricFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveFabricFilter(tab.id)}
                    type="button"
                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-sm text-xs sm:text-sm font-sans transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-chocolate-800 text-ivory font-semibold shadow-xs ring-2 ring-chocolate-800/30'
                        : tab.isFeatured
                        ? 'bg-amber-50/80 text-gold-dark hover:bg-amber-100/80 border border-gold/40 font-medium'
                        : 'bg-white/80 hover:bg-cream text-chocolate-700 hover:text-chocolate-900 border border-cream-border font-medium'
                    }`}
                  >
                    {tab.isFeatured && <Sparkles className="h-3.5 w-3.5 text-gold-dark" />}
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-sans ${
                        isActive
                          ? 'bg-chocolate-950 text-ivory'
                          : 'bg-cream-border/70 text-chocolate-600'
                      }`}
                    >
                      {getFabricCount(tab.id)}
                    </span>
                  </button>
                );
              })}
            </div>
          </ScrollReveal>
        )}

        {/* Fabric Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFabric.map((fabric, idx) => (
            <ScrollReveal key={fabric.id} delay={((idx % 4) + 1) * 70} className="h-full">
              <Card
                variant="default"
                padding="none"
                className={`overflow-hidden flex flex-col justify-between transition-all duration-300 h-full ${
                  fabric.isCommunitySpecial
                    ? 'border-2 border-gold/50 shadow-xs hover:border-gold hover:shadow-md ring-1 ring-gold/20'
                    : 'border border-cream-border hover:border-chocolate-300 hover:shadow-xs'
                }`}
              >
              <div>
                <ImageContainer
                  src={fabric.image}
                  alt={fabric.name}
                  aspectRatio="landscape"
                  category="fabric"
                  gradient={fabric.gradient}
                  badge={fabric.origin}
                  title={fabric.name}
                />

                <div className="p-5">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <Badge
                      variant={fabric.badgeVariant || (fabric.isCommunitySpecial ? 'gold' : 'chocolate')}
                      size="xs"
                      icon={fabric.isCommunitySpecial ? Sparkles : undefined}
                    >
                      {fabric.badge}
                    </Badge>
                    {fabric.isRepresentativeImage && (
                      <span className="text-[10px] text-chocolate-400 font-sans tracking-wide">
                        Sample Preview
                      </span>
                    )}
                  </div>

                  <div className="text-[11px] text-chocolate-500 font-sans mb-1 font-medium">
                    Weave: {fabric.weaveType}
                  </div>
                  <h4 className="font-serif font-bold text-lg text-chocolate-900 mb-2">
                    {fabric.name}
                  </h4>
                  <p className="text-xs text-chocolate-600 leading-relaxed font-sans mb-3 line-clamp-3">
                    {fabric.description}
                  </p>

                  <div className="bg-cream/70 p-2.5 rounded-sm border border-cream-border text-[11px] text-chocolate-700 mb-3">
                    <span className="font-semibold text-chocolate-900">Recommended For: </span>
                    <span>{fabric.idealFor}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-cream-border">
                    {fabric.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="text-[10px] font-medium px-2 py-0.5 rounded bg-cream text-chocolate-700 border border-cream-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  to={ROUTES.FABRIC}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-chocolate-800 hover:text-chocolate-900 transition-colors pt-2"
                >
                  <span>Explore Textile Specs</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </Card>
          </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={150} className="mt-12 text-center">
          <Button
            to={ROUTES.FABRIC}
            variant="secondary"
            size="md"
            icon={Layers}
          >
            Explore Complete Fabric Archive
          </Button>
        </ScrollReveal>
      </section>

      {/* ====================================================================== */}
      {/* 5. GALLERY PREVIEW (Selection of Sample Photographs)                   */}
      {/* ====================================================================== */}
      <section
        id="gallery-preview"
        className="bg-cream py-18 md:py-24 border-y border-cream-border scroll-mt-24 md:scroll-mt-28"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Visual Retrospective"
              title="Craftsmanship & Textile Gallery"
              subtitle="A curated glimpse of completed bespoke creations from Tailoring Home alongside distinct fabric weaves from Fabric Home."
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {galleryPreview.map((item, idx) => (
              <ScrollReveal key={item.id} delay={((idx % 4) + 1) * 70} className="h-full">
                <Card
                  variant="default"
                  padding="none"
                  className="overflow-hidden flex flex-col justify-between h-full"
                >
                <ImageContainer
                  src={item.image}
                  alt={item.title}
                  aspectRatio="portrait"
                  category={item.category}
                  gradient={item.gradient}
                  badge={item.shop}
                  title={item.title}
                />

                <div className="p-5">
                  <span className="text-[10px] uppercase tracking-wider text-gold-dark font-semibold block mb-1">
                    {item.tag}
                  </span>
                  <h4 className="font-serif font-bold text-base text-chocolate-900 mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-chocolate-600 leading-relaxed font-sans line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </Card>
            </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={150} className="mt-12 text-center">
            <Button
              to={ROUTES.GALLERY}
              variant="outline"
              size="md"
              icon={ExternalLink}
              iconPosition="right"
            >
              View Full Creation Gallery
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 6. WHY CHOOSE US (Genuine Business Qualities)                          */}
      {/* ====================================================================== */}
      <section
        id="standards"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 md:scroll-mt-28"
      >
        <ScrollReveal>
          <SectionHeading
            eyebrow="Craftsmanship Values"
            title="Why Choose Tailoring Home & Fabric Home"
            subtitle="Our principles are anchored in generational pattern mastery, verified natural fiber sourcing, and pressure-free customer consultations."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {whyChooseUs.map((pillar, idx) => {
            const Icon = iconMap[pillar.icon] || Scissors;

            return (
              <ScrollReveal key={pillar.id} delay={((idx % 3) + 1) * 90} className="h-full">
                <Card
                  variant="default"
                  className="flex flex-col justify-between h-full"
                >
                <div>
                  <div className="h-12 w-12 rounded-sm bg-maroon-50 text-maroon-800 flex items-center justify-center mb-5 border border-maroon-200/60 shadow-2xs">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h4 className="font-serif font-bold text-xl text-chocolate-900 mb-2.5">
                    {pillar.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-chocolate-600 leading-relaxed font-sans">
                    {pillar.description}
                  </p>
                </div>
              </Card>
            </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 7. CONTACT & LOCATION PLACEHOLDERS SECTION                             */}
      {/* ====================================================================== */}
      <section
        id="consultation"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 md:scroll-mt-28"
      >
        <ScrollReveal>
          <div className="bg-gradient-to-br from-chocolate-950 via-chocolate-900 to-maroon-950 text-ivory rounded-sm p-8 sm:p-12 lg:p-14 border border-gold/40 shadow-xl relative overflow-hidden">
          {/* Subtle Background Ornament */}
          <div className="absolute -right-12 -bottom-12 opacity-5 pointer-events-none">
            <Scissors className="h-96 w-96 text-gold" />
          </div>

          <div className="relative z-10 max-w-3xl mb-10">
            <Badge variant="gold" size="xs" className="mb-3 text-chocolate-950 font-semibold">
              {contact.badge}
            </Badge>

            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-ivory">
              {contact.title}
            </h3>

            <p className="text-ivory/85 text-sm sm:text-base leading-relaxed font-sans">
              {contact.subtitle}
            </p>

            {/* Clearly Identifiable Temporary Notice */}
            <div className="mt-4 p-3 rounded-sm bg-white/10 border border-gold/30 text-[11px] text-gold-light/90 font-mono">
              {contact.notice}
            </div>
          </div>

          {/* Dual Shop Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            {/* Tailoring Home Contact Card */}
            <div className="bg-white/10 backdrop-blur-xs p-6 rounded-sm border border-maroon-400/30 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <Scissors className="h-5 w-5 text-gold" />
                  <span className="font-serif font-bold text-lg text-ivory">
                    {contact.tailoringContact.shop}
                  </span>
                </div>
                <Badge variant="maroon" size="xs">
                  Stitching
                </Badge>
              </div>

              <p className="text-xs text-ivory/70 font-sans">
                {contact.tailoringContact.specialty}
              </p>

              <div className="space-y-2 text-xs text-ivory/85 font-sans pt-1">
                <p className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-gold shrink-0" />
                  <span>{contact.tailoringContact.phoneDisplay}</span>
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-gold shrink-0" />
                  <span>{contact.tailoringContact.location}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-gold shrink-0" />
                  <span>{contact.tailoringContact.hours}</span>
                </p>
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                {contact.tailoringContact.whatsapp ? (
                  <a
                    href={`https://wa.me/${contact.tailoringContact.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm text-xs font-semibold bg-emerald-700 hover:bg-emerald-600 text-white transition-colors shadow-xs"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>WhatsApp Inquire</span>
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-medium bg-white/5 border border-white/10 text-ivory/60">
                    <MessageCircle className="h-3.5 w-3.5 text-gold-light/60" />
                    <span>WhatsApp: Coming Soon</span>
                  </span>
                )}
                <Button
                  to="/tailoring"
                  variant="gold"
                  size="sm"
                  className="text-chocolate-950"
                >
                  View Tailoring
                </Button>
              </div>
            </div>

            {/* Fabric Home Contact Card */}
            <div className="bg-white/10 backdrop-blur-xs p-6 rounded-sm border border-chocolate-400/30 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <Layers className="h-5 w-5 text-gold" />
                  <span className="font-serif font-bold text-lg text-ivory">
                    {contact.fabricContact.shop}
                  </span>
                </div>
                <Badge variant="chocolate" size="xs">
                  Textiles
                </Badge>
              </div>

              <p className="text-xs text-ivory/70 font-sans">
                {contact.fabricContact.specialty}
              </p>

              <div className="space-y-2 text-xs text-ivory/85 font-sans pt-1">
                <p className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-gold shrink-0" />
                  <span>{contact.fabricContact.phoneDisplay}</span>
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-gold shrink-0" />
                  <span>{contact.fabricContact.location}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-gold shrink-0" />
                  <span>{contact.fabricContact.hours}</span>
                </p>
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                {contact.fabricContact.whatsapp ? (
                  <a
                    href={`https://wa.me/${contact.fabricContact.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm text-xs font-semibold bg-emerald-700 hover:bg-emerald-600 text-white transition-colors shadow-xs"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>WhatsApp Swatches</span>
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-medium bg-white/5 border border-white/10 text-ivory/60">
                    <MessageCircle className="h-3.5 w-3.5 text-gold-light/60" />
                    <span>WhatsApp: Coming Soon</span>
                  </span>
                )}
                <Button
                  to="/fabric"
                  variant="outline"
                  size="sm"
                  className="text-ivory border-ivory/40 hover:bg-white/15"
                >
                  View Fabrics
                </Button>
              </div>
            </div>
          </div>
        </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default HomePage;
