import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Image as ImageIcon,
  ArrowLeft,
  Info,
  Plus,
  ExternalLink,
  Filter,
  CheckCircle2,
  Camera,
  Layers,
  Scissors,
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { ROUTES } from '../../constants/navigation';
import { galleryContent } from '../../data/galleryContent';

export const AdminGalleryManagementPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const { items } = galleryContent;

  const filteredItems =
    activeFilter === 'all'
      ? items
      : items.filter((item) => item.category === activeFilter);

  const tailoringCount = items.filter((i) => i.category === 'tailoring').length;
  const fabricCount = items.filter((i) => i.category === 'fabric').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-sm border border-cream-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              to={ROUTES.ADMIN.DASHBOARD}
              className="text-xs text-chocolate-500 hover:text-maroon-800 flex items-center gap-1 font-semibold"
            >
              <ArrowLeft className="h-3 w-3" /> Dashboard
            </Link>
            <span className="text-stone-300">/</span>
            <Badge variant="gold" size="xs">
              Gallery Module
            </Badge>
          </div>
          <h1 className="font-serif font-bold text-2xl text-chocolate-900">
            Showcase Gallery Management
          </h1>
          <p className="text-xs text-chocolate-600 mt-0.5">
            Curate visual showcase imagery for Tailoring Home & Fabric Home collections.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            to={ROUTES.GALLERY}
            variant="outline"
            size="sm"
            icon={ExternalLink}
            iconPosition="right"
          >
            Live Gallery
          </Button>
          <Button variant="primary" size="sm" icon={Plus} disabled className="opacity-80">
            Add Image [Demo]
          </Button>
        </div>
      </div>

      {/* Demo Notice */}
      <div className="bg-cream/60 border border-gold/30 rounded-sm p-3.5 text-xs text-chocolate-700 flex items-start gap-2.5">
        <Info className="h-4 w-4 text-gold-dark shrink-0 mt-0.5" />
        <span>
          <strong>Demo Management View:</strong> Displaying {items.length} visual showcase items currently staged in the decoupled data store. Future Firebase Storage integration will support direct multi-angle photo uploads.
        </span>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-sm border border-cream-border flex items-center gap-3">
          <div className="h-10 w-10 rounded-sm bg-amber-50 text-gold-dark border border-gold/30 flex items-center justify-center shrink-0">
            <Camera className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xl font-serif font-bold text-chocolate-900">{items.length}</div>
            <div className="text-[11px] text-chocolate-500 font-sans">Total Showcase Images [Demo]</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-sm border border-cream-border flex items-center gap-3">
          <div className="h-10 w-10 rounded-sm bg-maroon-50 text-maroon-800 border border-maroon-200 flex items-center justify-center shrink-0">
            <Scissors className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xl font-serif font-bold text-chocolate-900">{tailoringCount}</div>
            <div className="text-[11px] text-chocolate-500 font-sans">Tailoring Home Photos</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-sm border border-cream-border flex items-center gap-3">
          <div className="h-10 w-10 rounded-sm bg-chocolate-50 text-chocolate-800 border border-chocolate-200 flex items-center justify-center shrink-0">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xl font-serif font-bold text-chocolate-900">{fabricCount}</div>
            <div className="text-[11px] text-chocolate-500 font-sans">Fabric Home Swatches</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-cream-border pb-2">
        <Filter className="h-4 w-4 text-chocolate-400 mr-1" />
        <button
          type="button"
          onClick={() => setActiveFilter('all')}
          className={`px-3 py-1.5 rounded-sm text-xs font-semibold transition-colors ${
            activeFilter === 'all'
              ? 'bg-maroon-800 text-ivory'
              : 'text-chocolate-600 hover:bg-cream'
          }`}
        >
          All Items ({items.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter('tailoring')}
          className={`px-3 py-1.5 rounded-sm text-xs font-semibold transition-colors ${
            activeFilter === 'tailoring'
              ? 'bg-maroon-800 text-ivory'
              : 'text-chocolate-600 hover:bg-cream'
          }`}
        >
          Tailoring Home ({tailoringCount})
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter('fabric')}
          className={`px-3 py-1.5 rounded-sm text-xs font-semibold transition-colors ${
            activeFilter === 'fabric'
              ? 'bg-maroon-800 text-ivory'
              : 'text-chocolate-600 hover:bg-cream'
          }`}
        >
          Fabric Home ({fabricCount})
        </button>
      </div>

      {/* Grid of Showcase Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredItems.map((item) => (
          <Card key={item.id} variant="default" className="border border-cream-border overflow-hidden p-0 flex flex-col justify-between">
            <div>
              {/* Image Preview Container */}
              <div className="aspect-4/3 relative bg-stone-100 overflow-hidden border-b border-cream-border">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-chocolate-400 bg-cream">
                    <ImageIcon className="h-8 w-8" />
                  </div>
                )}
                <div className="absolute top-2 left-2">
                  <Badge variant={item.category === 'tailoring' ? 'maroon' : 'chocolate'} size="xs">
                    {item.shop}
                  </Badge>
                </div>
                <div className="absolute top-2 right-2">
                  <span className="text-[10px] font-sans font-medium px-2 py-0.5 rounded bg-chocolate-950/80 text-gold-light backdrop-blur-xs">
                    {item.badge}
                  </span>
                </div>
              </div>

              {/* Content info */}
              <div className="p-4 space-y-2">
                <h3 className="font-serif font-bold text-sm text-chocolate-900 leading-snug line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs text-chocolate-600 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {item.tags.slice(0, 3).map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] px-1.5 py-0.5 rounded bg-cream text-chocolate-600 border border-cream-border"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 pt-2 border-t border-cream-border/60 flex items-center justify-between text-[11px] text-chocolate-500">
              <span className="flex items-center gap-1 text-emerald-700 font-medium">
                <CheckCircle2 className="h-3 w-3" /> Synced
              </span>
              <span className="font-mono text-[10px]">ID: {item.id.replace('gallery-', '')}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminGalleryManagementPage;
