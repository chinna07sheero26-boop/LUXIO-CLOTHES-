import React from 'react';
import { Database, BookOpen } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenGuide: () => void;
  onSelectCategory: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenGuide, onSelectCategory }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <span className="text-2xl font-extrabold tracking-tighter text-white font-display">
              THREADLAB<span className="text-stone-500">.</span>
            </span>
            <p className="text-xs text-stone-400 leading-relaxed">
              Modern everyday apparel engineered from heavyweight cottons and authentic selvedge textiles. Powered by a live CSV catalogue, built to deploy for free on GitHub Pages.
            </p>
            <div className="text-xs text-stone-500 pt-1">
              Crafted with care in India.
            </div>
          </div>

          {/* Categories Column 1 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-100 mb-3">
              Tops & Outerwear
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectCategory('Plain T-shirts')}
                  className="hover:text-white transition-colors cursor-pointer text-stone-400"
                >
                  Plain T-shirts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Printed T-shirts')}
                  className="hover:text-white transition-colors cursor-pointer text-stone-400"
                >
                  Printed T-shirts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Gym T-shirts')}
                  className="hover:text-white transition-colors cursor-pointer text-stone-400"
                >
                  Gym T-shirts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Shirts')}
                  className="hover:text-white transition-colors cursor-pointer text-stone-400"
                >
                  Linen & Oxford Shirts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Hoodies & Sweatshirts')}
                  className="hover:text-white transition-colors cursor-pointer text-stone-400"
                >
                  Hoodies & Sweatshirts
                </button>
              </li>
            </ul>
          </div>

          {/* Categories Column 2 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-100 mb-3">
              Bottoms & Trousers
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectCategory('Jeans')}
                  className="hover:text-white transition-colors cursor-pointer text-stone-400"
                >
                  Raw Selvedge Jeans
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Trousers')}
                  className="hover:text-white transition-colors cursor-pointer text-stone-400"
                >
                  Pleated Wide Trousers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Shorts')}
                  className="hover:text-white transition-colors cursor-pointer text-stone-400"
                >
                  Linen & Active Shorts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Joggers')}
                  className="hover:text-white transition-colors cursor-pointer text-stone-400"
                >
                  Heavy French Terry Joggers
                </button>
              </li>
            </ul>
          </div>

          {/* Store Owner & Developer Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-100 mb-3">
              Store Owner Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="hover:text-white transition-colors cursor-pointer text-stone-400 flex items-center gap-1.5"
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>CSV Product Manager</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenGuide}
                  className="hover:text-white transition-colors cursor-pointer text-stone-400 flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>GitHub Pages Free Hosting</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenGuide}
                  className="hover:text-white transition-colors cursor-pointer text-stone-400"
                >
                  Razorpay & Payments Setup
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenGuide}
                  className="hover:text-white transition-colors cursor-pointer text-stone-400"
                >
                  Customer Accounts Architecture
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <div>
            &copy; {new Date().getFullYear()} THREADLAB Apparel Co. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Prices in INR (₹)</span>
            <span aria-hidden="true">·</span>
            <span>All India Courier Fulfillment</span>
            <span aria-hidden="true">·</span>
            <span>Static GitHub Pages Compatible</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
