import React from 'react';
import { ArrowDown, Sparkles, ShieldCheck, RefreshCw, Truck, FileSpreadsheet } from 'lucide-react';

interface HeroBannerProps {
  onExploreClick: () => void;
  onOpenAdmin: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExploreClick, onOpenAdmin }) => {
  return (
    <section className="relative overflow-hidden bg-stone-100 border-b border-stone-200">
      {/* Hero Visual Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-6 space-y-6">
            {/* Clean unboxed metadata kicker */}
            <div className="text-xs uppercase tracking-widest text-stone-500 font-semibold flex items-center gap-2">
              <span>Collection 2026</span>
              <span aria-hidden="true">·</span>
              <span>Heavyweight Streetwear & Tailored Basics</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-950 font-display leading-[1.15] text-balance">
              Refined Everyday Silhouettes, Built From Heavyweight Cottons.
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl">
              Engineered for longevity, comfort, and tactile presence. Browse plain and printed tees, authentic selvedge jeans, heavy hoodies, and gym wear—all dynamically loaded from our live <code className="text-xs bg-stone-200 text-stone-800 px-1.5 py-0.5 rounded font-mono">products.csv</code> catalogue.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreClick}
                className="px-6 py-3 text-sm font-semibold text-white bg-stone-950 hover:bg-stone-800 rounded-lg shadow-sm transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <span>Shop Catalogue</span>
                <ArrowDown className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenAdmin}
                className="px-5 py-3 text-sm font-semibold text-stone-800 bg-white hover:bg-stone-50 border border-stone-300 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4 text-stone-600" />
                <span>Upload Custom CSV</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Media Container */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] bg-stone-200 group">
              <img
                src="/src/assets/images/threadlab_hero_banner_1793012315049.jpg"
                alt="THREADLAB Autumn Winter Apparel Collection"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-stone-100">
                <span className="backdrop-blur-md bg-stone-900/60 px-3 py-1 rounded-md">
                  Studio Campaign 2026
                </span>
                <span className="backdrop-blur-md bg-stone-900/60 px-3 py-1 rounded-md tabular-nums">
                  9 Curated Categories
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Proof & Trust Strip below Hero Split */}
      <div className="border-t border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs sm:text-sm text-stone-600">
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-stone-900 shrink-0" />
              <span>Free Delivery Above ₹999</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-stone-900 shrink-0" />
              <span>100% Combed Heavy Cotton</span>
            </div>
            <div className="flex items-center gap-2.5">
              <RefreshCw className="w-4 h-4 text-stone-900 shrink-0" />
              <span>7-Day Hassle-Free Exchange</span>
            </div>
            <div className="flex items-center gap-2.5">
              <FileSpreadsheet className="w-4 h-4 text-stone-900 shrink-0" />
              <span>100% Free GitHub Pages Ready</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
