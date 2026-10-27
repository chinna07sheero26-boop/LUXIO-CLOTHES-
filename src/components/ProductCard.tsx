import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Check, Star } from 'lucide-react';
import { Product } from '../types';
import { LazyImage } from './LazyImage';

interface ProductCardProps {
  product: Product;
  onOpenDetail: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  rating?: number;
  reviewCount?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetail,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  rating = 4.9,
  reviewCount = 18,
}) => {
  const [selectedQuickSize, setSelectedQuickSize] = useState<string>(product.sizes[0] || 'M');
  const [addedNotice, setAddedNotice] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedQuickSize);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 1500);
  };

  return (
    <div
      onClick={() => onOpenDetail(product)}
      className="group relative bg-white rounded-xl border border-stone-200/90 overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
    >
      {/* Product Image Slot with Progressive Lazy Loading (65-75% height) */}
      <div className="relative aspect-[4/5] bg-stone-100 overflow-hidden">
        <LazyImage
          src={product.imageUrl}
          alt={product.name}
          aspectRatioClass="aspect-[4/5]"
          className="transition-transform duration-500 group-hover:scale-104"
          fallbackText={`${product.category} · ${product.name}`}
        />

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
            isWishlisted
              ? 'bg-red-500 text-white shadow-sm'
              : 'bg-white/80 text-stone-700 hover:bg-white hover:text-stone-950'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Optional Clean Badge (e.g. Best Seller / Flagship) */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-stone-900/90 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-md tracking-wide">
            {product.badge}
          </div>
        )}

        {/* Low Stock Indicator */}
        {product.stock > 0 && product.stock <= 5 && (
          <div className="absolute bottom-3 left-3 bg-amber-500 text-stone-950 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
            Only {product.stock} left
          </div>
        )}

        {product.stock === 0 && (
          <div className="absolute inset-0 bg-stone-900/50 backdrop-blur-xs flex items-center justify-center">
            <span className="bg-white text-stone-900 text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}

        {/* Quick View Overlay on Desktop Hover */}
        <div className="hidden sm:flex absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetail(product);
            }}
            className="flex-1 py-2 bg-white/95 hover:bg-white text-stone-900 text-xs font-semibold rounded-lg shadow-md backdrop-blur-sm flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Clean Unboxed Metadata: Category · Rating */}
          <div className="text-[11px] text-stone-500 font-medium tracking-wide flex items-center justify-between gap-1.5 truncate">
            <div className="flex items-center gap-1.5 truncate">
              <span>{product.category}</span>
              {product.material && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="truncate">{product.material}</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-stone-700 shrink-0 font-medium">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span className="tabular-nums">{rating}</span>
              <span className="text-stone-400">({reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="text-sm font-semibold text-stone-900 group-hover:text-stone-700 transition-colors line-clamp-1 mt-1">
            {product.name}
          </h3>

          {/* Color specification */}
          <div className="text-xs text-stone-500 mt-0.5">
            {product.color}
          </div>
        </div>

        {/* Price & Quick Add */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
          <div>
            <div className="text-base font-bold font-mono text-stone-950 tabular-nums">
              ₹{product.price.toLocaleString('en-IN')}
            </div>
            <div className="text-[10px] text-stone-400">incl. all taxes</div>
          </div>

          {/* Quick Size Selection & Add to Cart */}
          {product.stock > 0 ? (
            <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
              <select
                value={selectedQuickSize}
                onChange={(e) => setSelectedQuickSize(e.target.value)}
                className="text-xs font-semibold bg-stone-100 text-stone-800 border-none rounded px-2 py-1.5 cursor-pointer focus:ring-1 focus:ring-stone-900"
                aria-label="Select size"
              >
                {product.sizes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={handleQuickAdd}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  addedNotice
                    ? 'bg-emerald-600 text-white'
                    : 'bg-stone-900 hover:bg-stone-800 text-white'
                }`}
                title={`Add size ${selectedQuickSize} to bag`}
                aria-label={`Add size ${selectedQuickSize} to bag`}
              >
                {addedNotice ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
              </button>
            </div>
          ) : (
            <span className="text-xs text-stone-400 font-medium">Sold Out</span>
          )}
        </div>
      </div>
    </div>
  );
};
