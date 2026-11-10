import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MessageCircle,
  CheckCircle2,
  ExternalLink,
  Layers,
  Scissors,
  Filter,
} from 'lucide-react';

import {
  Button,
  Card,
  Badge,
  ImageContainer,
} from '../../components/common';

import { galleryContent } from '../../data/galleryContent';
import { ROUTES } from '../../constants/navigation';

export const GalleryPage = () => {
  const { header, filterTabs, items, consultationBanner } = galleryContent;

  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  // Filtered gallery items based on active primary filter
  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') return items;
    return items.filter((item) => item.category === activeFilter);
  }, [activeFilter, items]);

  // Tab counts
  const getTabCount = useCallback(
    (tabId) => {
      if (tabId === 'all') return items.length;
      return items.filter((item) => item.category === tabId).length;
    },
    [items]
  );

  // Currently opened item in the lightbox modal
  const selectedItem =
    selectedItemIndex !== null ? filteredItems[selectedItemIndex] : null;

  // Lightbox navigation helpers
  const handleOpenModal = (index) => {
    setSelectedItemIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedItemIndex(null);
  };

  const handlePrevItem = useCallback(() => {
    if (selectedItemIndex === null) return;
    setSelectedItemIndex((prev) =>
      prev === 0 ? filteredItems.length - 1 : prev - 1
    );
  }, [selectedItemIndex, filteredItems.length]);

  const handleNextItem = useCallback(() => {
    if (selectedItemIndex === null) return;
    setSelectedItemIndex((prev) =>
      prev === filteredItems.length - 1 ? 0 : prev + 1
    );
  }, [selectedItemIndex, filteredItems.length]);

  // Keyboard navigation for the lightbox (Esc to close, Left/Right arrows)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedItemIndex === null) return;
      if (e.key === 'Escape') {
        handleCloseModal();
      } else if (e.key === 'ArrowLeft') {
        handlePrevItem();
      } else if (e.key === 'ArrowRight') {
        handleNextItem();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItemIndex, handlePrevItem, handleNextItem]);

  // Prevent background scrolling while modal is open
  useEffect(() => {
    if (selectedItemIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedItemIndex]);

  // Helper for generating targeted WhatsApp inquiry links
  const getWhatsAppInquiryUrl = (subject) => {
    const rawNumber = '919876543210';
    const message = `Hello, I am viewing the online gallery and would like to inquire about: ${subject}.`;
    return `https://wa.me/${rawNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="space-y-16 md:space-y-24 pb-20">
      {/* ====================================================================== */}
      {/* 1. HERO SECTION                                                        */}
      {/* ====================================================================== */}
      <section
        id="gallery-hero"
        className="relative bg-chocolate-950 text-ivory overflow-hidden border-b border-gold/30 scroll-mt-24 md:scroll-mt-28"
      >
        {/* Background Image with Dark Chocolate / Maroon Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=2000&q=80"
            alt="Atelier creations and fabrics backdrop"
            className="w-full h-full object-cover object-center opacity-25 scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-chocolate-950/92 via-chocolate-900/88 to-chocolate-950/95" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(94,31,39,0.25)_0,transparent_70%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 text-center">
          <div className="max-w-3xl mx-auto">
            {/* Boutique Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-gold-light" />
              <Badge variant="gold" size="sm" icon={Sparkles}>
                {header.badge}
              </Badge>
              <span className="h-px w-8 bg-gold-light" />
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-ivory tracking-tight leading-[1.15]">
              {header.headline}
            </h1>

            {/* Subheadline */}
            <p className="mt-5 text-base sm:text-lg text-cream/90 leading-relaxed font-sans">
              {header.subheadline}
            </p>

            {/* Placeholder Transparency Notice */}
            <p className="mt-4 text-xs text-gold-light/90 italic font-sans max-w-xl mx-auto">
              {header.notice}
            </p>
          </div>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 2. GALLERY FILTER TABS & SHOWCASE GRID                                 */}
      {/* ====================================================================== */}
      <section
        id="gallery-showcase"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 md:scroll-mt-28"
      >
        {/* Primary Filter Tabs: All, Tailoring Home, Fabric Home */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveFilter(tab.id);
                  setSelectedItemIndex(null);
                }}
                type="button"
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-sm text-xs sm:text-sm font-sans transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-maroon-800 text-ivory font-semibold shadow-xs ring-2 ring-maroon-800/30'
                    : 'bg-white/90 hover:bg-cream text-chocolate-700 hover:text-chocolate-900 border border-cream-border font-medium'
                }`}
              >
                {tab.id === 'tailoring' && (
                  <Scissors className="h-3.5 w-3.5 text-maroon-700" />
                )}
                {tab.id === 'fabric' && (
                  <Layers className="h-3.5 w-3.5 text-chocolate-700" />
                )}
                {tab.id === 'all' && (
                  <Filter className="h-3.5 w-3.5 text-gold-dark" />
                )}
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-sans ${
                    isActive
                      ? 'bg-maroon-950 text-ivory'
                      : 'bg-cream-border/70 text-chocolate-600'
                  }`}
                >
                  {getTabCount(tab.id)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Gallery Image Grid with Consistent Spacing & Aspect Ratios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, idx) => (
            <Card
              key={item.id}
              variant="default"
              padding="none"
              className={`overflow-hidden flex flex-col justify-between transition-all duration-300 group ${
                item.isCommunitySpecial
                  ? 'border-2 border-gold/50 shadow-xs hover:border-gold hover:shadow-md ring-1 ring-gold/20'
                  : 'border border-cream-border hover:border-chocolate-300 hover:shadow-xs'
              }`}
            >
              <div>
                {/* Clickable Image Container with Hover Inspect Overlay */}
                <div
                  onClick={() => handleOpenModal(idx)}
                  className="relative cursor-pointer overflow-hidden block"
                  title="Click to view full photograph"
                >
                  <ImageContainer
                    src={item.image}
                    alt={item.title}
                    aspectRatio="landscape"
                    category={item.category}
                    gradient={item.gradient}
                    badge={item.shop}
                    title={item.title}
                  />

                  {/* Subtle Hover Overlay with Magnifying Eye Icon */}
                  <div className="absolute inset-0 bg-chocolate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 text-ivory p-4 text-center z-10">
                    <div className="h-11 w-11 rounded-full bg-gold/90 text-chocolate-950 flex items-center justify-center shadow-md transform scale-90 group-hover:scale-100 transition-transform duration-300">
                      <Eye className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-semibold tracking-wider uppercase font-sans text-gold-light">
                      Click to Inspect Image
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6">
                  {/* Shop Entity and Badge Indicators */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <Badge
                      variant={item.badgeVariant || (item.isCommunitySpecial ? 'gold' : 'chocolate')}
                      size="xs"
                      icon={item.isCommunitySpecial ? Sparkles : undefined}
                    >
                      {item.badge}
                    </Badge>

                    {item.isRepresentativeImage ? (
                      <span className="text-[10px] text-chocolate-400 font-sans tracking-wide">
                        Sample Preview
                      </span>
                    ) : (
                      <span className="text-[10px] text-maroon-700 font-sans font-semibold tracking-wide">
                        Boutique Photo
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif font-bold text-lg text-chocolate-900 mb-2 group-hover:text-maroon-900 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-chocolate-600 leading-relaxed font-sans mb-4 line-clamp-3">
                    {item.description}
                  </p>

                  {/* Highlights Checklist */}
                  <div className="space-y-1.5 pt-3 border-t border-cream-border text-[11px] text-chocolate-700 font-sans">
                    {item.details.slice(0, 3).map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-gold-dark shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
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

              {/* Action Footer */}
              <div className="p-5 sm:p-6 pt-0 flex items-center justify-between gap-3 border-t border-cream-border/60 mt-2">
                <button
                  type="button"
                  onClick={() => handleOpenModal(idx)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-chocolate-800 hover:text-maroon-900 transition-colors cursor-pointer py-1"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>Inspect Photo</span>
                </button>

                <a
                  href={getWhatsAppInquiryUrl(item.inquirySubject)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-maroon-800 hover:text-maroon-900 transition-colors py-1"
                >
                  <span>Inquire</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ====================================================================== */}
      {/* 3. LIGHTBOX IMAGE-VIEWING MODAL                                        */}
      {/* ====================================================================== */}
      {selectedItem !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedItem.title}
          className="fixed inset-0 z-50 bg-chocolate-950/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-10 animate-fade-in"
          onClick={handleCloseModal}
        >
          {/* Modal Container */}
          <div
            className="bg-white rounded-sm border border-gold/40 shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto relative z-10 flex flex-col lg:flex-row"
            onClick={(e) => e.stopPropagation()} // Prevent backdrop click when clicking inside modal
          >
            {/* Top Close Button (Visible on all viewports) */}
            <button
              type="button"
              onClick={handleCloseModal}
              aria-label="Close image viewer"
              className="absolute top-3 right-3 z-30 h-9 w-9 rounded-full bg-chocolate-950/80 text-ivory hover:bg-maroon-800 transition-colors flex items-center justify-center cursor-pointer shadow-md"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Left Column: High-Resolution Image Presentation */}
            <div className="lg:w-3/5 bg-chocolate-950 relative flex items-center justify-center min-h-[300px] lg:min-h-[500px]">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-full object-cover max-h-[550px]"
              />

              {/* Watermark Tag for Sample Previews */}
              <div className="absolute bottom-3 left-3 z-10">
                {selectedItem.isRepresentativeImage ? (
                  <Badge variant="dark" size="xs">
                    Sample Preview Placeholder
                  </Badge>
                ) : (
                  <Badge variant="gold" size="xs">
                    Actual Boutique Creation
                  </Badge>
                )}
              </div>

              {/* Prev / Next Navigation Arrows within Image Frame */}
              <button
                type="button"
                onClick={handlePrevItem}
                aria-label="Previous photograph"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-chocolate-950/70 hover:bg-maroon-800 text-ivory flex items-center justify-center transition-colors cursor-pointer shadow-md"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={handleNextItem}
                aria-label="Next photograph"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-chocolate-950/70 hover:bg-maroon-800 text-ivory flex items-center justify-center transition-colors cursor-pointer shadow-md"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Right Column: Detailed Craftsmanship & Inquiry Panel */}
            <div className="lg:w-2/5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Shop Origin & Badge */}
                <div className="flex items-center justify-between gap-2 border-b border-cream-border pb-3">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-chocolate-800 font-sans">
                    {selectedItem.category === 'tailoring' ? (
                      <Scissors className="h-4 w-4 text-maroon-800" />
                    ) : (
                      <Layers className="h-4 w-4 text-chocolate-700" />
                    )}
                    <span>{selectedItem.shop}</span>
                  </div>

                  <span className="text-[11px] text-chocolate-400 font-sans">
                    Item {selectedItemIndex + 1} of {filteredItems.length}
                  </span>
                </div>

                <Badge
                  variant={selectedItem.badgeVariant || (selectedItem.isCommunitySpecial ? 'gold' : 'chocolate')}
                  size="sm"
                  icon={selectedItem.isCommunitySpecial ? Sparkles : undefined}
                >
                  {selectedItem.badge}
                </Badge>

                {/* Title */}
                <h2 className="text-2xl font-serif font-bold text-chocolate-900 leading-tight">
                  {selectedItem.title}
                </h2>

                {/* Description */}
                <p className="text-xs sm:text-sm text-chocolate-600 leading-relaxed font-sans">
                  {selectedItem.description}
                </p>

                {/* Craftsmanship Specifications Checklist */}
                <div className="space-y-2 pt-3 border-t border-cream-border text-xs text-chocolate-700 font-sans">
                  <div className="text-[11px] uppercase tracking-wider font-semibold text-chocolate-900">
                    Craftsmanship Highlights:
                  </div>
                  {selectedItem.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-gold-dark shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-cream-border">
                  {selectedItem.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-medium px-2 py-0.5 rounded bg-cream text-chocolate-700 border border-cream-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-cream-border space-y-2.5">
                <Button
                  href={getWhatsAppInquiryUrl(selectedItem.inquirySubject)}
                  variant="gold"
                  size="md"
                  fullWidth
                  icon={MessageCircle}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="justify-center"
                >
                  Inquire on WhatsApp
                </Button>

                {/* Link to respective dedicated catalogue page */}
                <Button
                  to={
                    selectedItem.category === 'tailoring'
                      ? ROUTES.TAILORING
                      : ROUTES.FABRIC
                  }
                  variant="outline"
                  size="sm"
                  fullWidth
                  icon={ArrowRight}
                  iconPosition="right"
                  className="justify-center text-xs"
                >
                  Explore {selectedItem.shop} Catalogue
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* 4. CONSULTATION & INQUIRY BANNER                                       */}
      {/* ====================================================================== */}
      <section
        id="gallery-enquiry"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 md:scroll-mt-28"
      >
        <div className="bg-chocolate-950 text-ivory rounded-sm p-8 sm:p-10 border border-gold/30 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-serif text-2xl font-bold">
              {consultationBanner.title}
            </h3>
            <p className="text-xs sm:text-sm text-cream/80 max-w-xl">
              {consultationBanner.desc}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Button
              href={consultationBanner.whatsappUrl}
              variant="gold"
              size="md"
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
              className="text-ivory border-gold/40 hover:bg-gold/10"
            >
              Contact & Visit
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;
