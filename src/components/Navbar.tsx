import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, SlidersHorizontal, Database, BookOpen, Menu, X } from 'lucide-react';
import { Category } from '../types';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAdmin: () => void;
  onOpenGuide: () => void;
  onSelectCategory: (category: string) => void;
  activeCategory: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenAdmin,
  onOpenGuide,
  onSelectCategory,
  activeCategory,
  searchQuery,
  onSearchChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { label: 'All Items', category: 'All' },
    { label: 'T-Shirts', category: 'Plain T-shirts' },
    { label: 'Shirts', category: 'Shirts' },
    { label: 'Bottoms', category: 'Jeans' },
    { label: 'Hoodies', category: 'Hoodies & Sweatshirts' },
  ];

  return (
    <>
      {/* Top Banner */}
      <div className="bg-stone-900 text-stone-300 text-xs py-2 px-4 text-center tracking-wide font-medium flex items-center justify-center gap-3">
        <span>Free standard delivery across India on orders above ₹999</span>
        <span className="hidden sm:inline text-stone-500">|</span>
        <a
          href="./threadlab-github-pages.zip"
          download="threadlab-github-pages.zip"
          className="text-amber-300 hover:text-white font-semibold underline underline-offset-2 transition-colors inline-flex items-center gap-1"
        >
          <span>Download Website (.ZIP)</span>
        </a>
        <span className="hidden sm:inline text-stone-500">|</span>
        <button
          onClick={onOpenGuide}
          className="hidden sm:inline text-stone-400 hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
        >
          GitHub Pages & SEO Guide
        </button>
      </div>

      {/* Main Top Bar adhering strictly to Section 2 Top Bar Contract */}
      <header className="sticky top-0 z-30 bg-stone-50/95 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Brand title, one line wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                onSelectCategory('All');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-2xl font-extrabold tracking-tighter text-stone-950 font-display hover:opacity-80 transition-opacity whitespace-nowrap shrink-0 text-left cursor-pointer"
            >
              THREADLAB<span className="text-stone-400 text-base font-normal">.</span>
            </button>
          </div>

          {/* Zone 2: 4-5 nav links, 1-2 word labels, single-line */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-700">
            {navLinks.map((link) => (
              <button
                key={link.category}
                onClick={() => {
                  onSelectCategory(link.category);
                  const el = document.getElementById('catalogue-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
                  activeCategory === link.category
                    ? 'text-stone-950 font-semibold border-b-2 border-stone-950'
                    : 'text-stone-600 hover:text-stone-950'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={onOpenAdmin}
              className="whitespace-nowrap shrink-0 text-stone-600 hover:text-stone-950 flex items-center gap-1.5 transition-colors cursor-pointer py-1"
            >
              <Database className="w-3.5 h-3.5" />
              <span>CSV Admin</span>
            </button>
          </nav>

          {/* Zone 3: 1 primary action cluster */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
              title="Search catalogue"
              aria-label="Search catalogue"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-100 rounded-lg transition-colors relative cursor-pointer"
              title="Saved items"
              aria-label="Saved items"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-stone-900 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center tabular-nums">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-stone-950 hover:bg-stone-800 rounded-lg transition-colors flex items-center gap-2 shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
              aria-label="Shopping bag"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Bag</span>
              <span className="bg-stone-800 px-1.5 py-0.5 rounded text-[11px] tabular-nums font-mono">
                {cartCount}
              </span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-700 hover:text-stone-950 rounded-lg cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Collapsible Search Bar */}
        {searchOpen && (
          <div className="border-t border-stone-200 bg-white px-4 py-3 shadow-inner">
            <div className="max-w-2xl mx-auto flex items-center gap-3">
              <Search className="w-5 h-5 text-stone-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search plain tees, selvedge denim, hoodies, SKU, or colors..."
                className="w-full text-sm bg-transparent border-none focus:outline-none text-stone-900 placeholder:text-stone-400"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="text-xs text-stone-500 hover:text-stone-800 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-stone-200 bg-white px-4 py-4 space-y-3">
            <div className="text-xs font-semibold uppercase text-stone-400 tracking-wider mb-2">
              Browse Categories
            </div>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.category}
                  onClick={() => {
                    onSelectCategory(link.category);
                    setMobileMenuOpen(false);
                    const el = document.getElementById('catalogue-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`text-left px-3 py-2 text-sm rounded-md transition-colors cursor-pointer ${
                    activeCategory === link.category
                      ? 'bg-stone-900 text-white font-medium'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-stone-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  onOpenAdmin();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2.5 px-3 py-2 text-sm text-stone-800 hover:bg-stone-100 rounded-md cursor-pointer"
              >
                <Database className="w-4 h-4 text-stone-600" />
                <span>Manage Catalogue (CSV)</span>
              </button>
              <button
                onClick={() => {
                  onOpenGuide();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2.5 px-3 py-2 text-sm text-stone-800 hover:bg-stone-100 rounded-md cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-stone-600" />
                <span>GitHub Pages & Backend Guide</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
