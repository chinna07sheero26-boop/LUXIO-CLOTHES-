import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, Tag, Truck, Check } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedCheckout,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPercent: number; flatDiscount: number } | null>(null);
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Delivery: Free if >= 999 or FREESHIP code, else 99
  const isFreeDelivery = subtotal >= 999 || (appliedPromo && appliedPromo.code === 'FREESHIP');
  const deliveryFee = isFreeDelivery ? 0 : 99;

  let discount = 0;
  if (appliedPromo) {
    if (appliedPromo.discountPercent > 0) {
      discount = Math.round((subtotal * appliedPromo.discountPercent) / 100);
    } else if (appliedPromo.flatDiscount > 0) {
      discount = Math.min(subtotal, appliedPromo.flatDiscount);
    }
  }

  const grandTotal = Math.max(0, subtotal - discount + deliveryFee);
  const freeShippingThreshold = 999;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCode.trim().toUpperCase();

    if (code === 'THREAD10') {
      setAppliedPromo({ code: 'THREAD10', discountPercent: 10, flatDiscount: 0 });
    } else if (code === 'WELCOME50') {
      setAppliedPromo({ code: 'WELCOME50', discountPercent: 0, flatDiscount: 50 });
    } else if (code === 'FREESHIP') {
      setAppliedPromo({ code: 'FREESHIP', discountPercent: 0, flatDiscount: 0 });
    } else {
      setPromoError('Invalid coupon. Try THREAD10 (10% off) or WELCOME50 (₹50 off)');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-950/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-stone-900 font-display">Shopping Bag</h2>
              <span className="text-xs bg-stone-100 text-stone-700 px-2 py-0.5 rounded-full font-mono font-semibold tabular-nums">
                {items.reduce((acc, i) => acc + i.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-stone-100 px-6 py-3 border-b border-stone-200">
            {amountToFreeShipping > 0 ? (
              <div className="space-y-1.5 text-xs text-stone-700">
                <div className="flex items-center justify-between">
                  <span>
                    Add <strong className="text-stone-950 font-bold tabular-nums">₹{amountToFreeShipping}</strong> more for Free Delivery!
                  </span>
                  <span className="text-stone-500 font-mono">{progressPercent}%</span>
                </div>
                <div className="w-full bg-stone-300 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-stone-900 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
                <Truck className="w-4 h-4 text-emerald-700" />
                <span>You've unlocked Free Standard Delivery across India!</span>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center text-stone-400">
                  <Tag className="w-8 h-8" />
                </div>
                <div className="text-base font-semibold text-stone-900">Your bag is empty</div>
                <p className="text-xs text-stone-500 max-w-xs">
                  Explore our heavyweight plain tees, tailored trousers, and hoodies to start building your wardrobe.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-5 py-2.5 text-xs font-semibold text-white bg-stone-950 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-stone-50 rounded-xl border border-stone-200/80 items-start"
                >
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-18 h-22 object-cover rounded-lg bg-stone-200 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-stone-900 line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-stone-400 hover:text-red-600 transition-colors cursor-pointer p-0.5"
                        title="Remove garment"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-stone-500 mt-0.5 flex items-center gap-2">
                      <span>Size: <strong className="text-stone-800">{item.size}</strong></span>
                      <span aria-hidden="true">·</span>
                      <span>{item.product.color}</span>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="text-xs font-bold font-mono text-stone-950 tabular-nums">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center border border-stone-300 rounded-md bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1 text-stone-600 hover:bg-stone-100 rounded-l transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono font-semibold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 text-stone-600 hover:bg-stone-100 rounded-r transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Order Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-stone-50 space-y-4">
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="space-y-1">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Coupon code (e.g. THREAD10)"
                    className="flex-1 text-xs uppercase px-3 py-2 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 text-xs font-semibold bg-stone-200 text-stone-800 hover:bg-stone-300 rounded-lg transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {appliedPromo && (
                  <div className="text-[11px] text-emerald-700 flex items-center gap-1 font-medium pt-1">
                    <Check className="w-3 h-3" />
                    <span>Coupon {appliedPromo.code} applied!</span>
                  </div>
                )}
                {promoError && (
                  <div className="text-[11px] text-red-600 pt-1">{promoError}</div>
                )}
              </form>

              {/* Price Calculation breakdown */}
              <div className="space-y-2 text-xs text-stone-600 pt-1 border-t border-stone-200/60">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-stone-900 font-medium">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Coupon Discount</span>
                    <span className="font-mono tabular-nums">-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Standard Shipping</span>
                  <span className="font-mono tabular-nums text-stone-900">
                    {deliveryFee === 0 ? (
                      <strong className="text-emerald-700 font-bold">FREE</strong>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-stone-400 text-[11px]">
                  <span>Estimated 5% GST</span>
                  <span className="font-mono tabular-nums">Included in prices</span>
                </div>

                <div className="flex justify-between text-sm font-bold text-stone-950 pt-2 border-t border-stone-300">
                  <span>Total Amount</span>
                  <span className="font-mono text-base tabular-nums">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={() => {
                  onClose();
                  onProceedCheckout();
                }}
                className="w-full py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-white bg-stone-950 hover:bg-stone-800 rounded-lg shadow-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
