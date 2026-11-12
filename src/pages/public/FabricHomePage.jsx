import React from 'react';
import {
  Layers,
  ShieldCheck,
  Sparkles,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Droplet,
  Feather,
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

import { fabricContent } from '../../data/fabricContent';
import { ROUTES } from '../../constants/navigation';

export const FabricHomePage = () => {
  const {
    hero,
    bohraFabrics,
    schoolUniformFabrics,
    generalFabrics,
    purityStandards,
    contact,
  } = fabricContent;

  // Active filter state for general fabric collections
  const [activeGeneralFilter, setActiveGeneralFilter] = React.useState('all');

  // Filtered general fabrics
  const filteredGeneralFabrics = React.useMemo(() => {
    if (activeGeneralFilter === 'all') return generalFabrics.items;
    return generalFabrics.items.filter((item) => item.group === activeGeneralFilter);
  }, [activeGeneralFilter, generalFabrics.items]);

  // Tab count helper
  const getGeneralCount = (tabId) => {
    if (tabId === 'all') return generalFabrics.items.length;
    return generalFabrics.items.filter((item) => item.group === tabId).length;
  };

  // Icon mapping for purity standards
  const purityIconMap = {
    ShieldCheck: ShieldCheck,
    Feather: Feather,
    Droplet: Droplet,
  };

  // Helper for generating targeted WhatsApp inquiry links
  const getWhatsAppInquiryUrl = (subject) => {
    if (!contact.whatsapp) return null;
    const rawNumber = contact.whatsapp.replace(/[^0-9]/g, '');
    const message = `Hello Fabric Home, I would like to inquire about fabric swatches and varieties for: ${subject}.`;
    return `https://wa.me/${rawNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="space-y-18 md:space-y-28 pb-20">
      {/* ====================================================================== */}
      {/* 1. HERO SECTION                                                        */}
      {/* ====================================================================== */}
      <section
        id="fabric-hero"
        className="relative bg-chocolate-950 text-ivory overflow-hidden border-b border-gold/30 scroll-mt-24 md:scroll-mt-28"
      >
        {/* Background Image with Dark Chocolate / Maroon Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          {hero.backgroundImage && (
            <img
              src={hero.backgroundImage}
              alt="Fabric Home luxury textiles collection"
              className="w-full h-full object-cover object-center opacity-30 scale-105 transition-transform duration-1000 ease-out"
            />
          )}
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
                to={contact.whatsappUrl ? undefined : ROUTES.CONTACT}
                href={contact.whatsappUrl || undefined}
                variant="gold"
                size="lg"
                icon={MessageCircle}
                target={contact.whatsappUrl ? '_blank' : undefined}
                rel={contact.whatsappUrl ? 'noopener noreferrer' : undefined}
              >
                {contact.whatsappUrl ? 'Inquire on WhatsApp' : 'Contact Showroom'}
              </Button>
              <Button
                to="#bohra-fabrics"
                variant="outline"
                size="lg"
                icon={Layers}
                className="text-ivory border-gold/50 hover:bg-gold/10"
              >
                Browse Fabric Collections
              </Button>
            </div>

            {/* Textile Archive Key Highlights */}
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
        aria-label="Fabric catalogue navigation"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-14 relative z-20"
      >
        <div className="bg-white/95 backdrop-blur-md rounded-sm p-3 sm:p-4 border border-cream-border shadow-md">
          <div className="flex items-center justify-between gap-3 mb-2 px-2 border-b border-cream-border pb-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-chocolate-700 font-sans flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-chocolate-800" />
              Fabric Catalogue Navigation
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
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xs text-xs font-medium font-sans bg-cream/70 hover:bg-chocolate-800 hover:text-ivory text-chocolate-800 border border-cream-border transition-colors duration-200"
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
      {/* 2. BOHRA SPECIALITY FABRICS (RIDA, KURTA-SAYA & IZAAR)                  */}
      {/* ====================================================================== */}
      <section
        id={bohraFabrics.id}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 md:scroll-mt-28"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-cream-border">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="gold" size="xs" icon={Sparkles}>
                {bohraFabrics.communityBadge}
              </Badge>
              <Badge variant="maroon" size="xs">
                Prominent Visibility
              </Badge>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-chocolate-900 tracking-tight">
              {bohraFabrics.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-chocolate-600 max-w-2xl font-sans leading-relaxed">
              {bohraFabrics.subtitle}
            </p>
          </div>

          <div className="shrink-0">
            <Button
              href={getWhatsAppInquiryUrl('Bohra Speciality Fabrics (Rida, Kurta-Saya, Izaar)')}
              variant="gold"
              size="sm"
              icon={MessageCircle}
              target="_blank"
              rel="noopener noreferrer"
            >
              Inquire Bohra Fabrics
            </Button>
          </div>
        </div>

        {/* Temporary Notice Pill */}
        <div className="bg-amber-50/70 border border-gold/30 rounded-sm p-3 mb-8 text-xs text-chocolate-700 font-sans flex items-start gap-2">
          <Sparkle className="h-4 w-4 text-gold-dark shrink-0 mt-0.5" />
          <span>{bohraFabrics.notice}</span>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bohraFabrics.items.map((item) => (
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
                  category="fabric"
                  gradient={item.gradient}
                  badge={item.origin}
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

                  <div className="text-[11px] text-chocolate-500 font-sans mb-1 font-medium">
                    Weave: {item.weave}
                  </div>

                  <h3 className="font-serif font-bold text-lg text-chocolate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-chocolate-600 leading-relaxed font-sans mb-4 line-clamp-3">
                    {item.description}
                  </p>

                  <div className="bg-cream/70 p-2.5 rounded-sm border border-cream-border text-[11px] text-chocolate-700 mb-3">
                    <span className="font-semibold text-chocolate-900">Recommended For: </span>
                    <span>{item.idealFor}</span>
                  </div>

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
      {/* 3. SCHOOL UNIFORM FABRICS (SEPARATE MSB AND ABN CATEGORIES)            */}
      {/* ====================================================================== */}
      <section
        id={schoolUniformFabrics.id}
        className="bg-cream py-16 md:py-24 border-y border-cream-border scroll-mt-24 md:scroll-mt-28"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={schoolUniformFabrics.eyebrow}
            title={schoolUniformFabrics.title}
            subtitle={schoolUniformFabrics.subtitle}
          />

          {/* Important Uniform Notice / Disclaimer */}
          <div className="mt-6 mb-10 bg-white border border-maroon-200 rounded-sm p-4 text-xs text-chocolate-700 font-sans leading-relaxed flex items-start gap-3 shadow-2xs">
            <GraduationCap className="h-5 w-5 text-maroon-800 shrink-0 mt-0.5" />
            <div>
              <strong className="text-maroon-900 block mb-1">
                Official Dress Code Adherence Notice:
              </strong>
              {schoolUniformFabrics.notice}
            </div>
          </div>

          {/* Distinct Dual School Uniform Cards: MSB and ABN Kept Separate */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {schoolUniformFabrics.institutions.map((school) => (
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
                    category="fabric"
                    gradient={school.gradient}
                    badge={school.origin}
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

                    <div className="text-xs text-chocolate-500 font-sans mb-1 font-medium">
                      Weave: {school.weave}
                    </div>

                    <h3 className="font-serif font-bold text-2xl text-chocolate-900 mb-3">
                      {school.title}
                    </h3>

                    <p className="text-sm text-chocolate-600 leading-relaxed font-sans mb-5">
                      {school.description}
                    </p>

                    <div className="bg-cream/80 p-3 rounded-sm border border-cream-border text-xs text-chocolate-800 mb-5">
                      <span className="font-semibold text-chocolate-900">Recommended Garments: </span>
                      <span>{school.idealFor}</span>
                    </div>

                    <div className="space-y-2.5 pt-4 border-t border-cream-border text-xs sm:text-sm text-chocolate-700 font-sans">
                      <div className="text-xs uppercase tracking-wider font-semibold text-chocolate-900 mb-2">
                        Textile Specifications:
                      </div>
                      {school.details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="h-4 w-4 text-maroon-700 shrink-0 mt-0.5" />
                          <span>{detail}</span>
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
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 4. GENERAL FABRIC COLLECTIONS                                          */}
      {/* ====================================================================== */}
      <section
        id={generalFabrics.id}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 md:scroll-mt-28"
      >
        <SectionHeading
          eyebrow={generalFabrics.eyebrow}
          title={generalFabrics.title}
          subtitle={generalFabrics.subtitle}
        />

        {/* Interactive Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8 mb-10">
          {generalFabrics.filterTabs.map((tab) => {
            const isActive = activeGeneralFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveGeneralFilter(tab.id)}
                type="button"
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-sm text-xs sm:text-sm font-sans transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-chocolate-800 text-ivory font-semibold shadow-xs ring-2 ring-chocolate-800/30'
                    : 'bg-white/90 hover:bg-cream text-chocolate-700 hover:text-chocolate-900 border border-cream-border font-medium'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-sans ${
                    isActive
                      ? 'bg-chocolate-950 text-ivory'
                      : 'bg-cream-border/70 text-chocolate-600'
                  }`}
                >
                  {getGeneralCount(tab.id)}
                </span>
              </button>
            );
          })}
        </div>

        {/* General Fabric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGeneralFabrics.map((item) => (
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
                  category="fabric"
                  gradient={item.gradient}
                  badge={item.origin}
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

                  <div className="text-[11px] text-chocolate-500 font-sans mb-1 font-medium">
                    Weave: {item.weave}
                  </div>

                  <h3 className="font-serif font-bold text-lg text-chocolate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-chocolate-600 leading-relaxed font-sans mb-4 line-clamp-3">
                    {item.description}
                  </p>

                  <div className="bg-cream/70 p-2.5 rounded-sm border border-cream-border text-[11px] text-chocolate-700 mb-3">
                    <span className="font-semibold text-chocolate-900">Recommended For: </span>
                    <span>{item.idealFor}</span>
                  </div>

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
      {/* 5. TEXTILE PURITY STANDARDS                                            */}
      {/* ====================================================================== */}
      <section
        id="purity-pledge"
        className="bg-cream py-16 md:py-24 border-y border-cream-border scroll-mt-24 md:scroll-mt-28"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Integrity of the Loom"
            title="The Fabric Home Purity Guarantee"
            subtitle="We examine thread tension, yarn authenticity, and colorfastness before any textile enters our boutique."
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12">
            {purityStandards.map((item, idx) => {
              const IconComponent = purityIconMap[item.icon] || ShieldCheck;
              return (
                <div
                  key={idx}
                  className="text-center p-8 bg-white rounded-sm border border-cream-border shadow-2xs flex flex-col items-center justify-between"
                >
                  <div>
                    <div className="h-14 w-14 rounded-full bg-amber-50 text-gold-dark mx-auto flex items-center justify-center mb-5 border border-gold/30">
                      <IconComponent className="h-7 w-7" />
                    </div>
                    <h3 className="font-serif font-bold text-xl text-chocolate-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-chocolate-600 leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 6. CONTACT, WHATSAPP & SWATCH INQUIRIES                                */}
      {/* ====================================================================== */}
      <section
        id="swatch-consultation"
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
                    <span className="text-cream/60 block text-[11px]">Showroom Phone</span>
                    {contact.phone ? (
                      <a
                        href={`tel:${contact.phone}`}
                        className="hover:text-gold transition-colors font-medium"
                      >
                        {contact.phoneDisplay}
                      </a>
                    ) : (
                      <span className="text-cream/80 text-sm">{contact.phoneDisplay}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MessageCircle className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="text-cream/60 block text-[11px]">Direct WhatsApp</span>
                    {contact.whatsappUrl ? (
                      <a
                        href={contact.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gold transition-colors font-medium inline-flex items-center gap-1"
                      >
                        <span>Inquire on WhatsApp</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <span className="text-cream/80 text-sm">To be announced</span>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="text-cream/60 block text-[11px]">Textile Pavilion</span>
                    <span>{contact.location}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="text-cream/60 block text-[11px]">Showroom Hours</span>
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
                  to={contact.whatsappUrl ? undefined : ROUTES.CONTACT}
                  href={contact.whatsappUrl || undefined}
                  variant="secondary"
                  size="md"
                  fullWidth
                  icon={MessageCircle}
                  target={contact.whatsappUrl ? '_blank' : undefined}
                  rel={contact.whatsappUrl ? 'noopener noreferrer' : undefined}
                >
                  {contact.whatsappUrl ? 'WhatsApp Swatch Inquiry' : 'Contact Showroom'}
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

export default FabricHomePage;
