import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowLeft,
  Info,
  Upload,
  Crop,
  Image as ImageIcon,
  CheckCircle2,
  Sliders,
  FolderTree,
} from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { ROUTES } from '../../constants/navigation';

export const AdminImageStudioPage = () => {
  const [selectedRatio, setSelectedRatio] = useState('4:3');
  const [targetShop, setTargetShop] = useState('tailoring');

  const aspectRatios = [
    { id: '1:1', label: 'Square (1:1)', desc: 'Fabric swatches, weave details & icons', class: 'aspect-square' },
    { id: '4:3', label: 'Classic Card (4:3)', desc: 'Showcase gallery & category cards', class: 'aspect-4/3' },
    { id: '16:9', label: 'Widescreen (16:9)', desc: 'Hero banners & section backgrounds', class: 'aspect-video' },
  ];

  const storageFolders = [
    { path: 'images/tailoring/', count: '8 Assets', role: 'Bespoke cuts, suits, Kurta & uniforms' },
    { path: 'images/fabric/', count: '8 Assets', role: 'Silks, cottons, linens & Rida swatches' },
    { path: 'images/hero/', count: '2 Assets', role: 'Homepage & atelier banners' },
    { path: 'images/icons/', count: '4 Assets', role: 'Favicons & brand vector graphics' },
  ];

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
            <Badge variant="gold" size="xs" icon={Sparkles}>
              Image Studio
            </Badge>
          </div>
          <h1 className="font-serif font-bold text-2xl text-chocolate-900">
            Image Studio & Asset Pipeline
          </h1>
          <p className="text-xs text-chocolate-600 mt-0.5">
            Optimize, format, and stage high-resolution boutique photography before publishing.
          </p>
        </div>

        <Button variant="primary" size="sm" icon={Upload} disabled className="opacity-80">
          Upload to Studio [Demo]
        </Button>
      </div>

      {/* Demo Notice */}
      <div className="bg-cream/60 border border-gold/30 rounded-sm p-3.5 text-xs text-chocolate-700 flex items-start gap-2.5">
        <Info className="h-4 w-4 text-gold-dark shrink-0 mt-0.5" />
        <span>
          <strong>Staged Studio Environment:</strong> The Image Studio prepares visual assets according to boutique brand guidelines. Live Cloud Storage integration and client-side WebP compression will be activated in subsequent backend phases.
        </span>
      </div>

      {/* Grid: Specifications & Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Aspect Ratio Calibrator */}
        <div className="lg:col-span-7 bg-white p-6 rounded-sm border border-cream-border space-y-5">
          <div className="flex items-center justify-between border-b border-cream-border pb-3">
            <div className="flex items-center gap-2">
              <Crop className="h-5 w-5 text-maroon-800" />
              <h2 className="font-serif font-bold text-lg text-chocolate-900">
                Aspect Ratio Calibrator [Interactive Preview]
              </h2>
            </div>
            <Badge variant="chocolate" size="xs">
              UI Simulator
            </Badge>
          </div>

          {/* Ratio Selector Buttons */}
          <div className="flex flex-wrap gap-2">
            {aspectRatios.map((ratio) => (
              <button
                key={ratio.id}
                type="button"
                onClick={() => setSelectedRatio(ratio.id)}
                className={`px-3.5 py-2 rounded-sm text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  selectedRatio === ratio.id
                    ? 'bg-maroon-800 text-ivory shadow-xs'
                    : 'bg-cream text-chocolate-700 hover:bg-cream-border'
                }`}
              >
                <span>{ratio.label}</span>
              </button>
            ))}
          </div>

          {/* Preview Box */}
          <div className="bg-stone-100 rounded-sm border border-dashed border-chocolate-300 p-6 flex flex-col items-center justify-center">
            <div
              className={`w-full max-w-md ${
                aspectRatios.find((r) => r.id === selectedRatio)?.class
              } bg-chocolate-950 text-gold rounded-sm flex flex-col items-center justify-center p-6 border border-gold/30 shadow-inner relative overflow-hidden transition-all duration-300`}
            >
              <div className="absolute inset-0 bg-linear-to-br from-maroon-900/60 to-chocolate-950/90 pointer-events-none" />
              <div className="relative z-10 text-center space-y-2">
                <ImageIcon className="h-10 w-10 text-gold mx-auto" />
                <div className="font-serif font-bold text-base text-ivory">
                  {selectedRatio} Framing Window
                </div>
                <p className="text-xs text-cream/70 max-w-xs font-sans">
                  {aspectRatios.find((r) => r.id === selectedRatio)?.desc}
                </p>
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-chocolate-900/80 text-[10px] text-gold-light border border-gold/20">
                  Target Quality: 85% WebP • &lt; 500 KB
                </div>
              </div>
            </div>
          </div>

          {/* Destination Shop Tagging */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-semibold text-chocolate-800 block">
              Target Shop Entity
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTargetShop('tailoring')}
                className={`p-3 rounded-sm text-left border transition-all ${
                  targetShop === 'tailoring'
                    ? 'border-maroon-700 bg-maroon-50/50'
                    : 'border-cream-border hover:bg-cream'
                }`}
              >
                <div className="font-semibold text-xs text-chocolate-900">Tailoring Home</div>
                <div className="text-[11px] text-chocolate-500">Stitching, uniforms, Bohra attire</div>
              </button>

              <button
                type="button"
                onClick={() => setTargetShop('fabric')}
                className={`p-3 rounded-sm text-left border transition-all ${
                  targetShop === 'fabric'
                    ? 'border-chocolate-700 bg-chocolate-50/50'
                    : 'border-cream-border hover:bg-cream'
                }`}
              >
                <div className="font-semibold text-xs text-chocolate-900">Fabric Home</div>
                <div className="text-[11px] text-chocolate-500">Textiles, silks, Rida prints</div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Asset Guidelines & Storage Structure */}
        <div className="lg:col-span-5 space-y-6">
          {/* Storage Directory Structure */}
          <div className="bg-white p-6 rounded-sm border border-cream-border space-y-4">
            <div className="flex items-center gap-2 border-b border-cream-border pb-3">
              <FolderTree className="h-5 w-5 text-chocolate-800" />
              <h3 className="font-serif font-bold text-base text-chocolate-900">
                Asset Storage Architecture
              </h3>
            </div>

            <div className="space-y-2.5">
              {storageFolders.map((f, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-sm bg-stone-50 border border-stone-200 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between font-mono font-semibold text-chocolate-900">
                    <span>{f.path}</span>
                    <span className="text-[10px] text-maroon-800 bg-maroon-50 px-1.5 py-0.5 rounded border border-maroon-200">
                      {f.count}
                    </span>
                  </div>
                  <p className="text-[11px] text-chocolate-600">{f.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Standards & Hygiene Checklist */}
          <div className="bg-white p-6 rounded-sm border border-cream-border space-y-3">
            <div className="flex items-center gap-2 text-chocolate-900 font-serif font-bold text-base border-b border-cream-border pb-2">
              <Sliders className="h-4 w-4 text-gold-dark" />
              <span>Asset Quality Standards</span>
            </div>

            <ul className="text-xs text-chocolate-700 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" />
                <span>Standardized sRGB color profiles for accurate fabric reproduction.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" />
                <span>Dual naming convention: <code>[category]_[item_slug]_[index].webp</code>.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" />
                <span>Responsive width variants staged: 400w, 800w, 1200w.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminImageStudioPage;
