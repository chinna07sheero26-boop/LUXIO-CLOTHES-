import React, { useState, useEffect, useMemo } from 'react';
import { Product, CartItem, FilterState, OrderDetails, ALL_CATEGORIES } from './types';
import { loadProductsCatalogue, DEFAULT_PRODUCTS } from './services/csvService';
import { getStoredReviews, getProductRatingData } from './services/reviewService';
import { getPaginatedLargeProducts } from './services/largeCatalogueService';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { FilterBar } from './components/FilterBar';
import { FilterDrawer } from './components/FilterDrawer';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AdminCatalogueModal } from './components/AdminCatalogueModal';
import { DeveloperGuideModal } from './components/DeveloperGuideModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { Pagination } from './components/Pagination';
import { Footer } from './components/Footer';
import { SlidersHorizontal, ShoppingBag, Heart, ArrowUp, RefreshCw, CheckCircle2, Layers } from 'lucide-react';

export default function App() {
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [catalogueSource, setCatalogueSource] = useState<'csv' | 'localstorage' | 'defaults'>('defaults');
  const [csvWarnings, setCsvWarnings] = useState<string[]>([]);

  // Catalogue Scale: '2lakhs' (2,00,000 items) | '4lakhs' (4,00,000 items) | 'csv' (from products.csv)
  const [catalogueScale, setCatalogueScale] = useState<'csv' | '2lakhs' | '4lakhs'>('2lakhs');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(24);

  // Filter State
  const [filter, setFilter] = useState<FilterState>({
    search: '',
    category: 'All',
    sizes: [],
    colors: [],
    maxPrice: 3000,
    minPrice: 0,
    inStockOnly: false,
    sortBy: 'featured',
  });

  // Shopping Bag and Wishlist
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('threadlab_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('threadlab_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal / Drawer controls
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load products on mount from public/products.csv
  useEffect(() => {
    const fetchCatalog = async () => {
      setIsLoading(true);
      const res = await loadProductsCatalogue();
      setProducts(res.products);
      setCatalogueSource(res.source);
      setCsvWarnings(res.errors);
      setIsLoading(false);
    };
    fetchCatalog();
  }, []);

  // Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem('threadlab_cart', JSON.stringify(cart));
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('threadlab_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Cart operations
  const handleAddToCart = (product: Product, size: string, quantity = 1) => {
    const itemId = `${product.sku}-${size}`;
    setCart((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (existing) {
        return prev.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { id: itemId, product, size, quantity }];
    });
    showToast(`Added ${product.name} (${size}) to your bag`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const totalCartCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);

  // Wishlist toggle
  const handleToggleWishlist = (product: Product) => {
    const isSaved = wishlist.some((p) => p.sku === product.sku);
    if (isSaved) {
      setWishlist((prev) => prev.filter((p) => p.sku !== product.sku));
      showToast(`Removed from saved garments`);
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast(`Saved ${product.name} to wishlist`);
    }
  };

  // Catalogue update by Admin
  const handleUpdateProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem('threadlab_custom_products', JSON.stringify(newProducts));
    setCatalogueSource('localstorage');
  };

  // Derive unique sizes and colors for filter drawer
  const { availableSizes, availableColors } = useMemo(() => {
    const sizeSet = new Set<string>();
    const colorSet = new Set<string>();

    products.forEach((p) => {
      p.sizes.forEach((s) => sizeSet.add(s.trim()));
      if (p.color) colorSet.add(p.color.trim());
    });

    const standardSizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '28', '30', '32', '34', '36'];
    const sortedSizes = Array.from(sizeSet).sort((a, b) => {
      const idxA = standardSizeOrder.indexOf(a);
      const idxB = standardSizeOrder.indexOf(b);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.localeCompare(b);
    });

    return {
      availableSizes: sortedSizes,
      availableColors: Array.from(colorSet).sort(),
    };
  }, [products]);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search
        if (filter.search.trim()) {
          const q = filter.search.toLowerCase();
          const match =
            p.name.toLowerCase().includes(q) ||
            p.sku.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.color.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            (p.material && p.material.toLowerCase().includes(q));
          if (!match) return false;
        }

        // Category
        if (filter.category !== 'All' && p.category !== filter.category) {
          return false;
        }

        // Sizes
        if (filter.sizes.length > 0) {
          const hasSize = filter.sizes.some((s) => p.sizes.includes(s));
          if (!hasSize) return false;
        }

        // Colors
        if (filter.colors.length > 0) {
          if (!filter.colors.includes(p.color)) return false;
        }

        // Price
        if (p.price > filter.maxPrice) {
          return false;
        }

        // Stock
        if (filter.inStockOnly && p.stock <= 0) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filter.sortBy === 'price-asc') return a.price - b.price;
        if (filter.sortBy === 'price-desc') return b.price - a.price;
        if (filter.sortBy === 'name-asc') return a.name.localeCompare(b.name);
        if (filter.sortBy === 'stock') return b.stock - a.stock;
        return 0; // featured maintains default order
      });
  }, [products, filter]);

  // Reset page to 1 when filters or scale change
  const handleFilterChange = (newFilter: FilterState) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const handleScaleChange = (newScale: 'csv' | '2lakhs' | '4lakhs') => {
    setCatalogueScale(newScale);
    setCurrentPage(1);
    const countLabel = newScale === '2lakhs' ? '2,00,000' : newScale === '4lakhs' ? '4,00,000' : products.length;
    showToast(`Catalogue scale updated: ${countLabel} items loaded`);
  };

  // Compute displayed products, total count, and total pages
  const { paginatedProducts, totalGarmentsCount, totalPages } = useMemo(() => {
    if (catalogueScale === '2lakhs' || catalogueScale === '4lakhs') {
      const totalCapacity = catalogueScale === '2lakhs' ? 200000 : 400000;
      const { items, totalMatches } = getPaginatedLargeProducts(
        currentPage,
        pageSize,
        totalCapacity,
        filter.category,
        filter.search
      );
      const pages = Math.max(1, Math.ceil(totalMatches / pageSize));
      return {
        paginatedProducts: items,
        totalGarmentsCount: totalMatches,
        totalPages: pages,
      };
    } else {
      // Standard CSV mode
      const totalMatches = filteredProducts.length;
      const pages = Math.max(1, Math.ceil(totalMatches / pageSize));
      const start = (currentPage - 1) * pageSize;
      const items = filteredProducts.slice(start, start + pageSize);
      return {
        paginatedProducts: items,
        totalGarmentsCount: totalMatches,
        totalPages: pages,
      };
    }
  }, [catalogueScale, currentPage, pageSize, filter.category, filter.search, filteredProducts]);

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col text-stone-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-stone-800 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        onSelectCategory={(cat) => handleFilterChange({ ...filter, category: cat })}
        activeCategory={filter.category}
        searchQuery={filter.search}
        onSearchChange={(q) => handleFilterChange({ ...filter, search: q })}
      />

      {/* Main Campaign Hero Banner */}
      <HeroBanner
        onExploreClick={() => {
          const el = document.getElementById('catalogue-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Catalogue & Shopping Section */}
      <main id="catalogue-section" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full space-y-8">
        {/* Section Header & Subtitle */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-5">
          <div>
            <div className="text-xs uppercase tracking-wider text-stone-500 font-semibold mb-1">
              Curated Garment Lineup · Autumn 2026
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950 font-display">
              {filter.category === 'All' ? 'All Clothing Essentials' : filter.category}
            </h2>
          </div>

          {/* Catalogue Scale Switcher (2 to 4 Lakhs) */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-1 bg-stone-200/80 p-1 rounded-xl text-xs font-semibold">
              <span className="text-[11px] text-stone-500 px-2 flex items-center gap-1 font-medium">
                <Layers className="w-3.5 h-3.5 text-stone-700" />
                <span>Scale:</span>
              </span>
              <button
                type="button"
                onClick={() => handleScaleChange('2lakhs')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  catalogueScale === '2lakhs'
                    ? 'bg-stone-950 text-white shadow-xs font-bold'
                    : 'text-stone-700 hover:text-stone-950 hover:bg-stone-300/60'
                }`}
              >
                2 Lakhs (200k)
              </button>
              <button
                type="button"
                onClick={() => handleScaleChange('4lakhs')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  catalogueScale === '4lakhs'
                    ? 'bg-stone-950 text-white shadow-xs font-bold'
                    : 'text-stone-700 hover:text-stone-950 hover:bg-stone-300/60'
                }`}
              >
                4 Lakhs (400k)
              </button>
              <button
                type="button"
                onClick={() => handleScaleChange('csv')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  catalogueScale === 'csv'
                    ? 'bg-stone-950 text-white shadow-xs font-bold'
                    : 'text-stone-700 hover:text-stone-950 hover:bg-stone-300/60'
                }`}
              >
                CSV File
              </button>
            </div>

            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-xs text-stone-900 font-semibold hover:underline underline-offset-2 ml-1 cursor-pointer self-start sm:self-auto"
            >
              CSV Admin
            </button>
          </div>
        </div>

        {/* Filter Bar Controls */}
        <FilterBar
          filter={filter}
          onChangeFilter={handleFilterChange}
          onOpenDrawer={() => setIsFilterDrawerOpen(true)}
          totalCount={totalGarmentsCount}
          availableColors={availableColors}
          availableSizes={availableSizes}
        />

        {/* Products Grid */}
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3">
            <RefreshCw className="w-8 h-8 text-stone-400 animate-spin" />
            <span className="text-sm text-stone-500 font-medium">Loading products catalogue...</span>
          </div>
        ) : paginatedProducts.length === 0 ? (
          <div className="py-20 text-center space-y-4 max-w-md mx-auto">
            <div className="text-stone-400 font-display text-4xl">No garments found</div>
            <p className="text-xs text-stone-500 leading-relaxed">
              We couldn't find any garments matching your current search or active filters. Try clearing your filters or selecting a different category.
            </p>
            <button
              onClick={() =>
                handleFilterChange({
                  ...filter,
                  search: '',
                  category: 'All',
                  sizes: [],
                  colors: [],
                  maxPrice: 3000,
                  inStockOnly: false,
                })
              }
              className="px-5 py-2.5 text-xs font-semibold text-white bg-stone-950 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {paginatedProducts.map((product) => {
                const rData = getProductRatingData(product.sku, getStoredReviews());
                return (
                  <ProductCard
                    key={product.sku}
                    product={product}
                    rating={rData.averageRating}
                    reviewCount={rData.totalReviews}
                    onOpenDetail={(p) => setSelectedProduct(p)}
                    onAddToCart={(p, sz) => handleAddToCart(p, sz)}
                    isWishlisted={wishlist.some((w) => w.sku === product.sku)}
                    onToggleWishlist={handleToggleWishlist}
                  />
                );
              })}
            </div>

            {/* Pagination Controls */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(p) => {
                setCurrentPage(p);
                const el = document.getElementById('catalogue-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              pageSize={pageSize}
              onPageSizeChange={setPageSize}
              totalItems={totalGarmentsCount}
            />
          </>
        )}
      </main>

      {/* Mobile Floating Bottom Bar - 15% Mobile Sticky Cap rule */}
      <div className="md:hidden fixed bottom-0 inset-x-0 bg-stone-900/95 backdrop-blur-md text-white border-t border-stone-800 py-2.5 px-4 z-20 flex items-center justify-around shadow-2xl">
        <button
          onClick={() => setIsFilterDrawerOpen(true)}
          className="flex flex-col items-center gap-1 text-[11px] text-stone-300 hover:text-white cursor-pointer"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters</span>
        </button>

        <button
          onClick={() => setIsWishlistOpen(true)}
          className="flex flex-col items-center gap-1 text-[11px] text-stone-300 hover:text-white relative cursor-pointer"
        >
          <Heart className="w-4 h-4" />
          <span>Saved</span>
          {wishlist.length > 0 && (
            <span className="absolute -top-1 -right-2 bg-stone-100 text-stone-900 text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="flex items-center gap-2 bg-white text-stone-950 px-4 py-1.5 rounded-full text-xs font-bold cursor-pointer"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Bag</span>
          <span className="bg-stone-900 text-white text-[10px] px-1.5 py-0.2 rounded-full font-mono tabular-nums">
            {totalCartCount}
          </span>
        </button>
      </div>

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        onSelectCategory={(cat) => {
          setFilter({ ...filter, category: cat });
          window.scrollTo({ top: 400, behavior: 'smooth' });
        }}
      />

      {/* Modals & Slide-over Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p, sz, qty) => handleAddToCart(p, sz, qty)}
        isWishlisted={selectedProduct ? wishlist.some((w) => w.sku === selectedProduct.sku) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      <FilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filter={filter}
        onChangeFilter={setFilter}
        availableSizes={availableSizes}
        availableColors={availableColors}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedCheckout={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onOrderComplete={(order) => {
          setCart([]);
          showToast(`Order ${order.orderId} placed successfully!`);
        }}
      />

      <AdminCatalogueModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        onUpdateProducts={handleUpdateProducts}
      />

      <DeveloperGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveWishlist={(sku) => setWishlist((prev) => prev.filter((p) => p.sku !== sku))}
        onAddToCart={(p, sz) => handleAddToCart(p, sz)}
      />
    </div>
  );
}
