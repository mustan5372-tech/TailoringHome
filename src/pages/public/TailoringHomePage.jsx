import React from 'react';
import {
  Scissors,
  Ruler,
  ShieldCheck,
  Sparkles,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Layers,
  GraduationCap,
  Sparkle,
} from 'lucide-react';

import {
  Button,
  Card,
  SectionHeading,
  Badge,
  ImageContainer,
} from '../../components/common';

import { tailoringContent } from '../../data/tailoringContent';
import { ROUTES } from '../../constants/navigation';

export const TailoringHomePage = () => {
  const {
    hero,
    bohraMenswear,
    bohraWomenswear,
    schoolUniforms,
    mensWear,
    womensWear,
    childrenAndAlterations,
    process,
    contact,
  } = tailoringContent;

  // Icon mapping for bespoke process
  const processIconMap = {
    Scissors: Scissors,
    Ruler: Ruler,
    ShieldCheck: ShieldCheck,
    Sparkles: Sparkles,
  };

  // Helper for generating targeted WhatsApp inquiry links
  const getWhatsAppInquiryUrl = (subject) => {
    const rawNumber = contact.whatsapp.replace(/[^0-9]/g, '');
    const message = `Hello Tailoring Home, I would like to inquire about bespoke tailoring for: ${subject}.`;
    return `https://wa.me/${rawNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="space-y-18 md:space-y-28 pb-20">
      {/* ====================================================================== */}
      {/* 1. HERO SECTION                                                        */}
      {/* ====================================================================== */}
      <section
        id="tailoring-hero"
        className="relative bg-chocolate-950 text-ivory overflow-hidden border-b border-gold/30 scroll-mt-24 md:scroll-mt-28"
      >
        {/* Background Image with Dark Chocolate / Maroon Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={hero.backgroundImage}
            alt="Tailoring Home atelier workshop"
            className="w-full h-full object-cover object-center opacity-30 scale-105 transition-transform duration-1000 ease-out"
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
                href={contact.whatsappUrl}
                variant="gold"
                size="lg"
                icon={MessageCircle}
                target="_blank"
                rel="noopener noreferrer"
              >
                Inquire on WhatsApp
              </Button>
              <Button
                to="#bohra-men"
                variant="outline"
                size="lg"
                icon={Scissors}
                className="text-ivory border-gold/50 hover:bg-gold/10"
              >
                Browse Catalogue Sections
              </Button>
            </div>

            {/* Atelier Key Highlights */}
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
      {/* QUICK JUMP NAVIGATION BAR                                              */}
      {/* ====================================================================== */}
      <nav
        aria-label="Catalogue navigation"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-14 relative z-20"
      >
        <div className="bg-white/95 backdrop-blur-md rounded-sm p-3 sm:p-4 border border-cream-border shadow-md">
          <div className="flex items-center justify-between gap-3 mb-2 px-2 border-b border-cream-border pb-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-chocolate-700 font-sans flex items-center gap-1.5">
              <Scissors className="h-3.5 w-3.5 text-maroon-800" />
              Catalogue Jump Navigation
            </span>
            <span className="text-[11px] text-chocolate-500 font-sans">
              Click to jump to section
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {hero.quickNav.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xs text-xs font-medium font-sans bg-cream/70 hover:bg-maroon-800 hover:text-ivory text-chocolate-800 border border-cream-border transition-colors duration-200"
              >
                {link.label.includes('Bohra') && (
                  <Sparkles className="h-3 w-3 text-gold-dark" />
                )}
                {link.label.includes('School') && (
                  <GraduationCap className="h-3 w-3 text-maroon-700" />
                )}
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ====================================================================== */}
      {/* 2. BOHRA MEN'S WEAR: KURTA, SAYA & IZAAR                                */}
      {/* ====================================================================== */}
      <section
        id={bohraMenswear.id}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 md:scroll-mt-28"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-cream-border">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="gold" size="xs" icon={Sparkles}>
                {bohraMenswear.communityBadge}
              </Badge>
              <Badge variant="maroon" size="xs">
                Prominent Visibility
              </Badge>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-chocolate-900 tracking-tight">
              {bohraMenswear.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-chocolate-600 max-w-2xl font-sans leading-relaxed">
              {bohraMenswear.subtitle}
            </p>
          </div>

          <div className="shrink-0">
            <Button
              href={getWhatsAppInquiryUrl("Bohra Men's Wear (Kurta, Saya, Izaar)")}
              variant="gold"
              size="sm"
              icon={MessageCircle}
              target="_blank"
              rel="noopener noreferrer"
            >
              Inquire Bohra Men's Wear
            </Button>
          </div>
        </div>

        {/* Temporary Notice Pill */}
        <div className="bg-amber-50/60 border border-gold/30 rounded-sm p-3 mb-8 text-xs text-chocolate-700 font-sans flex items-start gap-2">
          <Sparkle className="h-4 w-4 text-gold-dark shrink-0 mt-0.5" />
          <span>{bohraMenswear.notice}</span>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bohraMenswear.items.map((item) => (
            <Card
              key={item.id}
              variant="default"
              padding="none"
              className="overflow-hidden flex flex-col justify-between border-2 border-gold/50 shadow-xs hover:border-gold hover:shadow-md ring-1 ring-gold/20 transition-all duration-300"
            >
              <div>
                <ImageContainer
                  src={item.image}
                  alt={item.title}
                  aspectRatio="landscape"
                  category="tailoring"
                  gradient={item.gradient}
                  badge={item.badge}
                  title={item.title}
                />

                <div className="p-5">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <Badge variant={item.badgeVariant} size="xs" icon={Sparkles}>
                      {item.badge}
                    </Badge>
                    {item.isRepresentativeImage && (
                      <span className="text-[10px] text-chocolate-400 font-sans tracking-wide">
                        Sample Preview
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif font-bold text-lg text-chocolate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-chocolate-600 leading-relaxed font-sans mb-4 line-clamp-3">
                    {item.description}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-cream-border text-[11px] text-chocolate-700 font-sans">
                    {item.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-gold-dark shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-4 mt-3 border-t border-cream-border">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-medium px-2 py-0.5 rounded bg-cream text-chocolate-700 border border-cream-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Button
                  href={getWhatsAppInquiryUrl(item.inquirySubject)}
                  variant="gold"
                  size="sm"
                  fullWidth
                  icon={MessageCircle}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs"
                >
                  Inquire on WhatsApp
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 3. BOHRA WOMEN'S WEAR: RIDA, PARDI & GHAGRA                            */}
      {/* ====================================================================== */}
      <section
        id={bohraWomenswear.id}
        className="bg-cream py-16 md:py-24 border-y border-cream-border scroll-mt-24 md:scroll-mt-28"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-cream-border">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="gold" size="xs" icon={Sparkles}>
                  {bohraWomenswear.communityBadge}
                </Badge>
                <Badge variant="maroon" size="xs">
                  Artisanal Craftsmanship
                </Badge>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-chocolate-900 tracking-tight">
                {bohraWomenswear.title}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-chocolate-600 max-w-2xl font-sans leading-relaxed">
                {bohraWomenswear.subtitle}
              </p>
            </div>

            <div className="shrink-0">
              <Button
                href={getWhatsAppInquiryUrl("Bohra Women's Wear (Rida, Pardi, Ghagra)")}
                variant="gold"
                size="sm"
                icon={MessageCircle}
                target="_blank"
                rel="noopener noreferrer"
              >
                Inquire Rida Stitching
              </Button>
            </div>
          </div>

          {/* Temporary Notice Pill */}
          <div className="bg-amber-50/70 border border-gold/30 rounded-sm p-3 mb-8 text-xs text-chocolate-700 font-sans flex items-start gap-2">
            <Sparkle className="h-4 w-4 text-gold-dark shrink-0 mt-0.5" />
            <span>{bohraWomenswear.notice}</span>
          </div>

          {/* Category Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bohraWomenswear.items.map((item) => (
              <Card
                key={item.id}
                variant="default"
                padding="none"
                className="overflow-hidden flex flex-col justify-between border-2 border-gold/50 shadow-xs hover:border-gold hover:shadow-md ring-1 ring-gold/20 transition-all duration-300"
              >
                <div>
                  <ImageContainer
                    src={item.image}
                    alt={item.title}
                    aspectRatio="landscape"
                    category="tailoring"
                    gradient={item.gradient}
                    badge={item.badge}
                    title={item.title}
                  />

                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <Badge variant={item.badgeVariant} size="xs" icon={Sparkles}>
                        {item.badge}
                      </Badge>
                      {item.isRepresentativeImage && (
                        <span className="text-[10px] text-chocolate-400 font-sans tracking-wide">
                          Sample Preview
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif font-bold text-lg text-chocolate-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-chocolate-600 leading-relaxed font-sans mb-4 line-clamp-3">
                      {item.description}
                    </p>

                    <div className="space-y-1.5 pt-3 border-t border-cream-border text-[11px] text-chocolate-700 font-sans">
                      {item.details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-gold-dark shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-4 mt-3 border-t border-cream-border">
                      {item.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-medium px-2 py-0.5 rounded bg-cream text-chocolate-700 border border-cream-border"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Button
                    href={getWhatsAppInquiryUrl(item.inquirySubject)}
                    variant="gold"
                    size="sm"
                    fullWidth
                    icon={MessageCircle}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs"
                  >
                    Inquire on WhatsApp
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 4. SCHOOL UNIFORMS (SEPARATE MSB AND ABN CATEGORIES)                   */}
      {/* ====================================================================== */}
      <section
        id={schoolUniforms.id}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 md:scroll-mt-28"
      >
        <SectionHeading
          eyebrow={schoolUniforms.eyebrow}
          title={schoolUniforms.title}
          subtitle={schoolUniforms.subtitle}
        />

        {/* Important Uniform Notice / Disclaimer */}
        <div className="mt-6 mb-10 bg-cream/90 border border-maroon-200 rounded-sm p-4 text-xs text-chocolate-700 font-sans leading-relaxed flex items-start gap-3">
          <GraduationCap className="h-5 w-5 text-maroon-800 shrink-0 mt-0.5" />
          <div>
            <strong className="text-maroon-900 block mb-1">
              Official Dress Code Compliance:
            </strong>
            {schoolUniforms.notice}
          </div>
        </div>

        {/* Distinct Dual School Uniform Cards: MSB and ABN Separated */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {schoolUniforms.institutions.map((school) => (
            <Card
              key={school.id}
              variant="default"
              padding="none"
              className="overflow-hidden flex flex-col justify-between border-2 border-maroon-200 hover:border-maroon-300 shadow-xs transition-all duration-300"
            >
              <div>
                <ImageContainer
                  src={school.image}
                  alt={school.title}
                  aspectRatio="landscape"
                  category="tailoring"
                  gradient={school.gradient}
                  badge={school.badge}
                  title={school.title}
                />

                <div className="p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Badge variant={school.badgeVariant} size="sm" icon={GraduationCap}>
                      {school.badge}
                    </Badge>
                    <span className="text-xs font-semibold text-maroon-800 font-sans uppercase tracking-wider">
                      {school.schoolName}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-2xl text-chocolate-900 mb-3">
                    {school.title}
                  </h3>

                  <p className="text-sm text-chocolate-600 leading-relaxed font-sans mb-6">
                    {school.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-cream-border text-xs sm:text-sm text-chocolate-700 font-sans">
                    <div className="text-xs uppercase tracking-wider font-semibold text-chocolate-900 mb-2">
                      Key Tailoring Standards:
                    </div>
                    {school.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-maroon-700 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-6 mt-6 border-t border-cream-border">
                    {school.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-xs font-medium px-2.5 py-0.5 rounded bg-cream text-chocolate-700 border border-cream-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-7 pt-0">
                <Button
                  href={getWhatsAppInquiryUrl(school.inquirySubject)}
                  variant="primary"
                  size="md"
                  fullWidth
                  icon={MessageCircle}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="justify-center"
                >
                  Inquire for {school.title}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 5. MEN'S WEAR: SHIRTS, TROUSERS, SUITS & BLAZERS                       */}
      {/* ====================================================================== */}
      <section
        id={mensWear.id}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 md:scroll-mt-28"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-cream-border">
          <div>
            <Badge variant="chocolate" size="xs" className="mb-2">
              Gentlemen's Atelier
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-chocolate-900 tracking-tight">
              {mensWear.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-chocolate-600 max-w-2xl font-sans leading-relaxed">
              {mensWear.subtitle}
            </p>
          </div>

          <div className="shrink-0">
            <Button
              href={getWhatsAppInquiryUrl("Gentlemen's Suiting & Menswear")}
              variant="outline"
              size="sm"
              icon={MessageCircle}
              target="_blank"
              rel="noopener noreferrer"
            >
              Inquire Men's Formals
            </Button>
          </div>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mensWear.items.map((item) => (
            <Card
              key={item.id}
              variant="default"
              padding="none"
              className="overflow-hidden flex flex-col justify-between border border-cream-border hover:border-chocolate-300 hover:shadow-xs transition-all duration-300"
            >
              <div>
                <ImageContainer
                  src={item.image}
                  alt={item.title}
                  aspectRatio="landscape"
                  category="tailoring"
                  gradient={item.gradient}
                  badge={item.badge}
                  title={item.title}
                />

                <div className="p-5">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <Badge variant={item.badgeVariant} size="xs">
                      {item.badge}
                    </Badge>
                    {item.isRepresentativeImage && (
                      <span className="text-[10px] text-chocolate-400 font-sans tracking-wide">
                        Sample Preview
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif font-bold text-lg text-chocolate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-chocolate-600 leading-relaxed font-sans mb-4 line-clamp-3">
                    {item.description}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-cream-border text-[11px] text-chocolate-700 font-sans">
                    {item.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-chocolate-700 shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-4 mt-3 border-t border-cream-border">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-medium px-2 py-0.5 rounded bg-cream text-chocolate-700 border border-cream-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Button
                  href={getWhatsAppInquiryUrl(item.inquirySubject)}
                  variant="outline"
                  size="sm"
                  fullWidth
                  icon={MessageCircle}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs"
                >
                  Inquire on WhatsApp
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 6. WOMEN'S WEAR: BLOUSES, DRESSES & OTHER STITCHING                    */}
      {/* ====================================================================== */}
      <section
        id={womensWear.id}
        className="bg-cream py-16 md:py-24 border-y border-cream-border scroll-mt-24 md:scroll-mt-28"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-cream-border">
            <div>
              <Badge variant="maroon" size="xs" className="mb-2">
                Ladies' Couture
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-chocolate-900 tracking-tight">
                {womensWear.title}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-chocolate-600 max-w-2xl font-sans leading-relaxed">
                {womensWear.subtitle}
              </p>
            </div>

            <div className="shrink-0">
              <Button
                href={getWhatsAppInquiryUrl("Women's Tailoring & Blouse Fitting")}
                variant="maroonOutline"
                size="sm"
                icon={MessageCircle}
                target="_blank"
                rel="noopener noreferrer"
              >
                Inquire Women's Wear
              </Button>
            </div>
          </div>

          {/* Category Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {womensWear.items.map((item) => (
              <Card
                key={item.id}
                variant="default"
                padding="none"
                className="overflow-hidden flex flex-col justify-between border border-cream-border hover:border-maroon-300 hover:shadow-xs transition-all duration-300"
              >
                <div>
                  <ImageContainer
                    src={item.image}
                    alt={item.title}
                    aspectRatio="landscape"
                    category="tailoring"
                    gradient={item.gradient}
                    badge={item.badge}
                    title={item.title}
                  />

                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <Badge variant={item.badgeVariant} size="xs">
                        {item.badge}
                      </Badge>
                      {item.isRepresentativeImage && (
                        <span className="text-[10px] text-chocolate-400 font-sans tracking-wide">
                          Sample Preview
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif font-bold text-lg text-chocolate-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-chocolate-600 leading-relaxed font-sans mb-4 line-clamp-3">
                      {item.description}
                    </p>

                    <div className="space-y-1.5 pt-3 border-t border-cream-border text-[11px] text-chocolate-700 font-sans">
                      {item.details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-maroon-700 shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-4 mt-3 border-t border-cream-border">
                      {item.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-medium px-2 py-0.5 rounded bg-cream text-chocolate-700 border border-cream-border"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Button
                    href={getWhatsAppInquiryUrl(item.inquirySubject)}
                    variant="maroonOutline"
                    size="sm"
                    fullWidth
                    icon={MessageCircle}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs"
                  >
                    Inquire on WhatsApp
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 7. CHILDREN'S WEAR AND ALTERATIONS                                     */}
      {/* ====================================================================== */}
      <section
        id={childrenAndAlterations.id}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 md:scroll-mt-28"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-cream-border">
          <div>
            <Badge variant="chocolate" size="xs" className="mb-2">
              Youth Tailoring & Restyling
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-chocolate-900 tracking-tight">
              {childrenAndAlterations.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-chocolate-600 max-w-2xl font-sans leading-relaxed">
              {childrenAndAlterations.subtitle}
            </p>
          </div>

          <div className="shrink-0">
            <Button
              href={getWhatsAppInquiryUrl("Children's Tailoring or Alterations")}
              variant="outline"
              size="sm"
              icon={MessageCircle}
              target="_blank"
              rel="noopener noreferrer"
            >
              Inquire Alterations
            </Button>
          </div>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {childrenAndAlterations.items.map((item) => (
            <Card
              key={item.id}
              variant="default"
              padding="none"
              className="overflow-hidden flex flex-col justify-between border border-cream-border hover:border-chocolate-300 hover:shadow-xs transition-all duration-300"
            >
              <div>
                <ImageContainer
                  src={item.image}
                  alt={item.title}
                  aspectRatio="landscape"
                  category="tailoring"
                  gradient={item.gradient}
                  badge={item.badge}
                  title={item.title}
                />

                <div className="p-5">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <Badge variant={item.badgeVariant} size="xs">
                      {item.badge}
                    </Badge>
                    {item.isRepresentativeImage && (
                      <span className="text-[10px] text-chocolate-400 font-sans tracking-wide">
                        Sample Preview
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif font-bold text-lg text-chocolate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-chocolate-600 leading-relaxed font-sans mb-4 line-clamp-3">
                    {item.description}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-cream-border text-[11px] text-chocolate-700 font-sans">
                    {item.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-chocolate-700 shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-4 mt-3 border-t border-cream-border">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-medium px-2 py-0.5 rounded bg-cream text-chocolate-700 border border-cream-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Button
                  href={getWhatsAppInquiryUrl(item.inquirySubject)}
                  variant="outline"
                  size="sm"
                  fullWidth
                  icon={MessageCircle}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs"
                >
                  Inquire on WhatsApp
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 8. THE 4-STEP BESPOKE TAILORING PROCESS                                */}
      {/* ====================================================================== */}
      <section
        id="process"
        className="bg-cream py-16 md:py-24 border-y border-cream-border scroll-mt-24 md:scroll-mt-28"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Atelier Standards"
            title="The Bespoke Crafting Journey"
            subtitle="Every bespoke piece passes through four meticulous stages to ensure poise, comfort, and an enduring hand-tailored fit."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {process.map((item, idx) => {
              const IconComponent = processIconMap[item.icon] || Scissors;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 sm:p-7 rounded-sm border border-cream-border shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-serif text-3xl font-bold text-gold-dark">
                        {item.step}
                      </span>
                      <div className="h-10 w-10 rounded-sm bg-cream text-maroon-800 flex items-center justify-center border border-cream-border">
                        <IconComponent className="h-5 w-5" />
                      </div>
                    </div>

                    <h3 className="font-serif font-bold text-lg text-chocolate-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-chocolate-600 leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-cream-border text-[11px] text-chocolate-500 font-sans">
                    Stage {item.step} of 04
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 9. CONTACT, WHATSAPP & VISIT PLACEHOLDERS                              */}
      {/* ====================================================================== */}
      <section
        id="consultation"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 md:scroll-mt-28"
      >
        <div className="bg-chocolate-950 text-ivory rounded-sm p-8 sm:p-12 border border-gold/30 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <Badge variant="gold" size="sm" icon={Sparkles}>
                {contact.badge}
              </Badge>

              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ivory">
                {contact.title}
              </h2>

              <p className="text-sm sm:text-base text-cream/80 leading-relaxed font-sans">
                {contact.subtitle}
              </p>

              {/* Temporary Notice */}
              <p className="text-xs text-gold-light/90 italic font-sans pt-1">
                {contact.notice}
              </p>

              {/* Contact Meta Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs font-sans text-cream/90">
                <div className="flex items-start gap-2.5">
                  <Phone className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="text-cream/60 block text-[11px]">Primary Phone</span>
                    <a
                      href={`tel:${contact.phone}`}
                      className="hover:text-gold transition-colors font-medium"
                    >
                      {contact.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MessageCircle className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="text-cream/60 block text-[11px]">Direct WhatsApp</span>
                    <a
                      href={contact.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-gold transition-colors font-medium inline-flex items-center gap-1"
                    >
                      <span>Inquire on WhatsApp</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="text-cream/60 block text-[11px]">Atelier Address</span>
                    <span>{contact.location}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="text-cream/60 block text-[11px]">Visiting Hours</span>
                    <span>{contact.hours}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Action & Companion Shop Card */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="bg-chocolate-900/90 border border-gold/30 p-6 rounded-sm space-y-4">
                <div className="flex items-center gap-2 text-gold">
                  <Layers className="h-5 w-5" />
                  <h4 className="font-serif font-bold text-lg text-ivory">
                    {contact.companionShop.title}
                  </h4>
                </div>
                <p className="text-xs text-cream/80 leading-relaxed font-sans">
                  {contact.companionShop.desc}
                </p>
                <Button
                  to={contact.companionShop.ctaTo}
                  variant="gold"
                  size="md"
                  fullWidth
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  {contact.companionShop.ctaText}
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  href={contact.whatsappUrl}
                  variant="primary"
                  size="md"
                  fullWidth
                  icon={MessageCircle}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp Us
                </Button>
                <Button
                  to={ROUTES.CONTACT}
                  variant="outline"
                  size="md"
                  fullWidth
                  className="text-ivory border-gold/40 hover:bg-gold/10"
                >
                  Contact Page
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TailoringHomePage;
