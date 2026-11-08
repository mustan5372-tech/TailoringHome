import React, { useState } from 'react';
import { Scissors, Layers } from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';

export const GalleryPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Collections' },
    { id: 'tailoring', label: 'Tailoring Home Creations' },
    { id: 'fabric', label: 'Fabric Home Textiles' },
    { id: 'ceremonial', label: 'Royal & Wedding' },
  ];

  // Showcase gallery items represented cleanly without embedding bulky images in source code
  const galleryItems = [
    {
      id: 1,
      title: 'Midnight Velvet Bandhgala',
      shop: 'Tailoring Home',
      category: 'tailoring',
      subCategory: 'ceremonial',
      description: 'Crafted with hand-carved brass buttons and silk thread accents.',
      accentColor: 'from-chocolate-900 to-maroon-900',
    },
    {
      id: 2,
      title: 'Heritage Banarasi Katan Silk',
      shop: 'Fabric Home',
      category: 'fabric',
      subCategory: 'ceremonial',
      description: 'Handwoven floral jaal motif in antique gold zari on royal crimson base.',
      accentColor: 'from-maroon-800 to-amber-900',
    },
    {
      id: 3,
      title: 'Double-Breasted Linen Suit',
      shop: 'Tailoring Home',
      category: 'tailoring',
      subCategory: 'formal',
      description: 'Tailored from unbleached Irish linen with peak lapels and horn buttons.',
      accentColor: 'from-amber-800/80 to-chocolate-800',
    },
    {
      id: 4,
      title: 'Italian Super 140s Navy Twill',
      shop: 'Fabric Home',
      category: 'fabric',
      subCategory: 'formal',
      description: 'Fine worsted wool blend for sharp boardroom executive suiting.',
      accentColor: 'from-slate-800 to-chocolate-900',
    },
    {
      id: 5,
      title: 'Handcrafted Ivory Sherwani',
      shop: 'Tailoring Home',
      category: 'tailoring',
      subCategory: 'ceremonial',
      description: 'Bespoke groom ensemble paired with custom raw silk churidar and safa.',
      accentColor: 'from-amber-700/70 to-chocolate-700',
    },
    {
      id: 6,
      title: 'French Lavender Pure Linen',
      shop: 'Fabric Home',
      category: 'fabric',
      subCategory: 'casual',
      description: 'Washed pure linen fabric yardage with natural organic texture.',
      accentColor: 'from-chocolate-800 to-stone-700',
    },
  ];

  const filteredItems = galleryItems.filter((item) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'tailoring') return item.category === 'tailoring';
    if (activeFilter === 'fabric') return item.category === 'fabric';
    if (activeFilter === 'ceremonial') return item.subCategory === 'ceremonial';
    return true;
  });

  return (
    <div className="space-y-16 pb-16">
      {/* Page Header */}
      <section
        id="gallery-hero"
        className="bg-gradient-to-b from-cream to-ivory border-b border-cream-border py-14 md:py-20 text-center scroll-mt-24 md:scroll-mt-28"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="gold" size="sm" className="mb-4">
            Visual Archive
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-chocolate-900 tracking-tight">
            Creation & Textile Gallery
          </h1>
          <p className="mt-4 text-base sm:text-lg text-chocolate-600 max-w-2xl mx-auto leading-relaxed font-sans">
            A visual retrospective of bespoke garments tailored by Tailoring Home alongside distinctive textile varieties curated by Fabric Home.
          </p>
        </div>
      </section>

      {/* Gallery Filter Navigation & Grid */}
      <section
        id="gallery-showcase"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 md:scroll-mt-28"
      >
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-sm transition-all tracking-wider uppercase ${
                activeFilter === f.id
                  ? 'bg-maroon-800 text-ivory shadow-xs'
                  : 'bg-white text-chocolate-700 border border-cream-border hover:bg-cream-soft'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-sm border border-cream-border overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Boutique Aesthetic Visual Frame */}
              <div
                className={`h-56 bg-gradient-to-br ${item.accentColor} p-6 flex flex-col justify-between relative overflow-hidden`}
              >
                <div className="flex items-center justify-between z-10">
                  <Badge
                    variant={item.category === 'tailoring' ? 'maroon' : 'chocolate'}
                    size="xs"
                    className="bg-white/90 text-chocolate-900"
                  >
                    {item.shop}
                  </Badge>
                  <span className="text-[10px] uppercase tracking-widest text-gold-light font-medium">
                    Catalogue #{item.id}
                  </span>
                </div>

                <div className="z-10 text-ivory">
                  <div className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-xs flex items-center justify-center mb-2">
                    {item.category === 'tailoring' ? (
                      <Scissors className="h-5 w-5 text-gold-light" />
                    ) : (
                      <Layers className="h-5 w-5 text-gold-light" />
                    )}
                  </div>
                  <h4 className="font-serif font-bold text-lg text-white">
                    {item.title}
                  </h4>
                </div>

                {/* Subtle Geometric Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors pointer-events-none" />
              </div>

              {/* Card Body */}
              <div className="p-6">
                <p className="text-xs text-chocolate-600 leading-relaxed font-sans mb-4">
                  {item.description}
                </p>

                <div className="pt-3 border-t border-cream-border flex items-center justify-between text-xs text-chocolate-500">
                  <span className="font-serif italic">Boutique Reference</span>
                  <Button
                    to="/contact#enquiry-form"
                    variant="ghost"
                    size="sm"
                    className="text-maroon-800 hover:text-maroon-900 p-0"
                  >
                    Inquire Item &rarr;
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;
