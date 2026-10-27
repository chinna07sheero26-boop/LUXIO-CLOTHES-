import React, { useState, useEffect } from 'react';
import {
  X,
  Heart,
  ShoppingBag,
  Check,
  ShieldCheck,
  Ruler,
  Truck,
  Star,
  MessageSquare,
  ThumbsUp,
  UserCheck,
} from 'lucide-react';
import { Product, ProductReview } from '../types';
import { getStoredReviews, saveReview, getProductRatingData } from '../services/reviewService';
import { LazyImage } from './LazyImage';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!product) return null;

  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState<number>(1);
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  // Reviews state
  const [reviewsList, setReviewsList] = useState<ProductReview[]>([]);
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState<number>(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newFit, setNewFit] = useState<'Runs Small' | 'True to Size' | 'Runs Large'>('True to Size');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    const all = getStoredReviews();
    setReviewsList(all);
  }, [product.sku]);

  const ratingData = getProductRatingData(product.sku, reviewsList);

  const handleAdd = () => {
    onAddToCart(product, selectedSize, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 900);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const saved = saveReview({
      sku: product.sku,
      author: newAuthor.trim(),
      rating: newRating,
      title: newTitle.trim() || 'Verified Purchase',
      comment: newComment.trim(),
      fitFeedback: newFit,
    });

    setReviewsList((prev) => [saved, ...prev]);
    setNewAuthor('');
    setNewTitle('');
    setNewComment('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row my-auto max-h-[92vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-stone-500 hover:text-stone-950 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:bg-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Visual Media Container with LazyImage */}
        <div className="md:w-1/2 bg-stone-100 relative min-h-[320px] md:min-h-full">
          <LazyImage
            src={product.imageUrl}
            alt={product.name}
            aspectRatioClass="h-full min-h-[320px] md:min-h-full"
            className="w-full h-full object-cover"
            fallbackText={`${product.category} · ${product.name}`}
          />
          {product.badge && (
            <div className="absolute top-4 left-4 bg-stone-900 text-white text-xs font-semibold px-3 py-1 rounded-md z-10 shadow-sm">
              {product.badge}
            </div>
          )}
        </div>

        {/* Right Column: Contiguous Purchase Module & Reviews */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Tab navigation: Product Details vs Customer Reviews */}
            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg mb-5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('details')}
                className={`flex-1 py-1.5 rounded-md transition-colors cursor-pointer ${
                  activeTab === 'details'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Garment Overview
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('reviews')}
                className={`flex-1 py-1.5 rounded-md transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === 'reviews'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>Reviews ({ratingData.totalReviews})</span>
              </button>
            </div>

            {/* TAB 1: PRODUCT DETAILS */}
            {activeTab === 'details' && (
              <div className="space-y-5">
                {/* Metadata Header */}
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
                    <span>{product.category}</span>
                    <span className="font-mono text-stone-400">SKU: {product.sku}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-stone-950 font-display mt-1">
                    {product.name}
                  </h2>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-2xl font-bold font-mono text-stone-900 tabular-nums">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-stone-500">incl. of all taxes</span>
                    <button
                      type="button"
                      onClick={() => setActiveTab('reviews')}
                      className="ml-auto text-xs text-stone-700 hover:text-stone-950 flex items-center gap-1 underline underline-offset-2 cursor-pointer font-medium"
                    >
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{ratingData.averageRating} ({ratingData.totalReviews} reviews)</span>
                    </button>
                  </div>
                </div>

                {/* Color & Stock */}
                <div className="flex items-center justify-between text-xs py-2 border-y border-stone-100">
                  <span className="text-stone-600">
                    Color: <strong className="text-stone-900 font-semibold">{product.color}</strong>
                  </span>
                  <span className="font-medium">
                    {product.stock > 0 ? (
                      <span className="text-emerald-700">In Stock ({product.stock} units available)</span>
                    ) : (
                      <span className="text-red-600">Out of Stock</span>
                    )}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-stone-600 leading-relaxed">{product.description}</p>

                {/* Size Selector */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-900">
                      Select Size
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowSizeGuide(!showSizeGuide)}
                      className="text-xs text-stone-600 hover:text-stone-950 flex items-center gap-1 underline underline-offset-2 cursor-pointer font-medium"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>Size Guide</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((sz) => {
                      const isSelected = selectedSize === sz;
                      return (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => setSelectedSize(sz)}
                          className={`min-w-11 py-2 px-3 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                            isSelected
                              ? 'border-stone-950 bg-stone-950 text-white shadow-xs'
                              : 'border-stone-200 bg-white text-stone-800 hover:border-stone-400'
                          }`}
                        >
                          {sz}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Size Guide Drawer */}
                {showSizeGuide && (
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-2">
                    <div className="font-bold text-stone-900">Standard Garment Dimensions (Inches)</div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left tabular-nums">
                        <thead>
                          <tr className="border-b border-stone-200 text-stone-500">
                            <th className="py-1">Size</th>
                            <th className="py-1">Chest</th>
                            <th className="py-1">Length</th>
                            <th className="py-1">Shoulder</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                          <tr><td className="py-1 font-medium">S</td><td>38"</td><td>27.5"</td><td>18"</td></tr>
                          <tr><td className="py-1 font-medium">M</td><td>40"</td><td>28.5"</td><td>19"</td></tr>
                          <tr><td className="py-1 font-medium">L</td><td>42"</td><td>29.5"</td><td>20"</td></tr>
                          <tr><td className="py-1 font-medium">XL</td><td>44"</td><td>30.5"</td><td>21"</td></tr>
                          <tr><td className="py-1 font-medium">XXL</td><td>46"</td><td>31.5"</td><td>22"</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Garment Details & Care */}
                <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                  <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                    <span className="text-stone-400 block text-[10px] uppercase font-bold">Fabric Material</span>
                    <span className="font-medium text-stone-800">{product.material || '100% Combed Cotton'}</span>
                  </div>
                  <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                    <span className="text-stone-400 block text-[10px] uppercase font-bold">Fit Profile</span>
                    <span className="font-medium text-stone-800">{product.fit || 'Structured Relaxed Fit'}</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: CUSTOMER REVIEWS */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {/* Rating Overview Summary */}
                <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-center sm:text-left">
                    <div className="text-3xl font-extrabold text-stone-950 font-display tabular-nums">
                      {ratingData.averageRating}
                      <span className="text-stone-400 text-lg font-normal"> / 5.0</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500 my-1 justify-center sm:justify-start">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-500" />
                      ))}
                    </div>
                    <div className="text-xs text-stone-500">
                      Based on {ratingData.totalReviews} verified buyers
                    </div>
                  </div>

                  {/* Rating Breakdown Bars */}
                  <div className="w-full sm:w-1/2 space-y-1.5 text-xs text-stone-600">
                    <div className="flex items-center gap-2">
                      <span className="w-6 text-right font-mono">5★</span>
                      <div className="flex-1 bg-stone-200 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '88%' }} />
                      </div>
                      <span className="w-7 text-right font-mono">88%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-6 text-right font-mono">4★</span>
                      <div className="flex-1 bg-stone-200 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '10%' }} />
                      </div>
                      <span className="w-7 text-right font-mono">10%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-6 text-right font-mono">3★</span>
                      <div className="flex-1 bg-stone-200 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '2%' }} />
                      </div>
                      <span className="w-7 text-right font-mono">2%</span>
                    </div>
                  </div>
                </div>

                {/* Customer Fit Feedback */}
                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100 flex items-center justify-between text-xs text-emerald-900">
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span><strong>96% of customers</strong> confirm this garment fits <strong>True to Size</strong>.</span>
                  </div>
                </div>

                {/* Write a Review Form */}
                <form onSubmit={handleReviewSubmit} className="bg-white p-4 rounded-xl border border-stone-200 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                    Write a Verified Review
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={newAuthor}
                        onChange={(e) => setNewAuthor(e.target.value)}
                        placeholder="e.g. Rahul S."
                        className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">Star Rating</label>
                      <div className="flex items-center gap-1 pt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewRating(star)}
                            className="p-1 hover:scale-110 transition-transform cursor-pointer"
                          >
                            <Star
                              className={`w-5 h-5 ${
                                star <= newRating ? 'text-amber-500 fill-amber-500' : 'text-stone-300'
                              }`}
                            />
                          </button>
                        ))}
                        <span className="ml-2 text-xs font-semibold text-stone-800 tabular-nums">
                          {newRating} / 5
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">Review Headline</label>
                      <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="e.g. Incredible fabric thickness"
                        className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">Fit Feedback</label>
                      <select
                        value={newFit}
                        onChange={(e) => setNewFit(e.target.value as any)}
                        className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900 cursor-pointer"
                      >
                        <option value="True to Size">True to Size (Recommended)</option>
                        <option value="Runs Small">Runs Small</option>
                        <option value="Runs Large">Runs Large</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">Review Comments</label>
                    <textarea
                      required
                      rows={2}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Comment on fabric softness, stitching, color accuracy, and wearability..."
                      className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    {reviewSubmitted && (
                      <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                        <Check className="w-4 h-4" /> Review published!
                      </span>
                    )}
                    <button
                      type="submit"
                      className="ml-auto px-5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-stone-950 hover:bg-stone-800 rounded-lg shadow-sm transition-colors cursor-pointer"
                    >
                      Post Review
                    </button>
                  </div>
                </form>

                {/* Reviews List */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                    Verified Customer Reviews
                  </h4>

                  {reviewsList.map((rev) => (
                    <div key={rev.id} className="p-3.5 bg-stone-50 rounded-xl border border-stone-200/80 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-stone-900">{rev.author}</span>
                          {rev.verifiedPurchase && (
                            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-semibold">
                              <UserCheck className="w-3 h-3" /> Verified Buyer
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-stone-400 font-mono">{rev.date}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < rev.rating ? 'fill-amber-500' : 'text-stone-300'}`}
                            />
                          ))}
                        </div>
                        {rev.fitFeedback && (
                          <span className="text-[10px] bg-stone-200 text-stone-800 px-1.5 py-0.2 rounded font-medium">
                            Fit: {rev.fitFeedback}
                          </span>
                        )}
                      </div>

                      <h5 className="font-semibold text-stone-900 text-xs">{rev.title}</h5>
                      <p className="text-stone-600 leading-relaxed text-[11px]">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Row & Quantity (Stick to bottom) */}
          <div className="pt-6 border-t border-stone-100 mt-6 space-y-3">
            <div className="flex items-center gap-3">
              {/* Quantity Selector */}
              <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-stone-50 shrink-0">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-stone-700 hover:bg-stone-200 transition-colors font-bold cursor-pointer"
                >
                  -
                </button>
                <span className="px-3 py-2 text-xs font-mono font-semibold tabular-nums text-stone-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-3 py-2 text-stone-700 hover:bg-stone-200 transition-colors font-bold cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                type="button"
                onClick={handleAdd}
                disabled={product.stock === 0}
                className={`flex-1 py-3 px-5 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                  product.stock === 0
                    ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                    : addedSuccess
                    ? 'bg-emerald-600 text-white'
                    : 'bg-stone-950 hover:bg-stone-800 text-white'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag · ₹{(product.price * quantity).toLocaleString('en-IN')}</span>
                  </>
                )}
              </button>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={() => onToggleWishlist(product)}
                className={`p-3 rounded-lg border transition-colors cursor-pointer shrink-0 ${
                  isWishlisted
                    ? 'border-red-500 bg-red-50 text-red-600'
                    : 'border-stone-300 hover:border-stone-900 text-stone-700'
                }`}
                aria-label="Save to wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Quick Guarantees */}
            <div className="flex items-center justify-between text-[11px] text-stone-500 pt-2">
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-stone-700" />
                Dispatch within 24 Hours
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-700" />
                7-Day Size Exchanges
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
