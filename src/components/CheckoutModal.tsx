import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, QrCode, CreditCard, Banknote, Landmark, Download, ArrowRight, ArrowLeft } from 'lucide-react';
import { CartItem, OrderDetails } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderComplete: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderComplete,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'shipping' | 'payment' | 'success'>('shipping');
  const [customer, setCustomer] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: 'Maharashtra',
    pincode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod' | 'card' | 'netbanking'>('upi');
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal >= 999 ? 0 : 99;
  const tax = Math.round(subtotal * 0.05); // 5% apparel GST
  const total = subtotal + shipping;

  const validateShipping = () => {
    const errors: Record<string, string> = {};
    if (!customer.fullName.trim()) errors.fullName = 'Full name is required';
    if (!customer.phone.trim() || customer.phone.length < 10) errors.phone = 'Valid 10-digit mobile number required';
    if (!customer.email.trim() || !customer.email.includes('@')) errors.email = 'Valid email required';
    if (!customer.address.trim()) errors.address = 'Street address is required';
    if (!customer.city.trim()) errors.city = 'City is required';
    if (!customer.pincode.trim() || customer.pincode.length < 6) errors.pincode = 'Valid 6-digit Indian PIN code required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProceedPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateShipping()) {
      setStep('payment');
    }
  };

  const handlePlaceOrder = () => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newOrder: OrderDetails = {
      orderId: `TL-2026-${randomNum}`,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      customer,
      items: [...items],
      subtotal,
      discount: 0,
      shipping,
      tax,
      total,
      paymentMethod:
        paymentMethod === 'upi'
          ? 'UPI / QR Code'
          : paymentMethod === 'cod'
          ? 'Cash on Delivery (COD)'
          : paymentMethod === 'card'
          ? 'Credit / Debit Card'
          : 'NetBanking',
      status: 'Confirmed',
    };

    setConfirmedOrder(newOrder);
    setStep('success');
    onOrderComplete(newOrder);
  };

  const printReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[95vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-3">
            <span className="font-bold font-display text-stone-950 text-lg">THREADLAB Checkout</span>
            <span className="text-xs bg-stone-200 text-stone-800 px-2 py-0.5 rounded font-mono font-medium">
              INR ₹{total.toLocaleString('en-IN')}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-900 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Realism Notice Banner - Required by prompt instruction 13 & 9 */}
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-2.5 text-xs text-amber-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            <strong>Simulated Checkout Mode:</strong> No real money will be charged. Payment credentials are never collected in frontend code.
          </span>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* STEP 1: SHIPPING ADDRESS */}
          {step === 'shipping' && (
            <form onSubmit={handleProceedPayment} className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900">
                1. Delivery & Contact Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={customer.fullName}
                    onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                  {formErrors.fullName && (
                    <span className="text-[10px] text-red-600">{formErrors.fullName}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Mobile Phone (+91)
                  </label>
                  <input
                    type="tel"
                    required
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    placeholder="10-digit mobile number"
                    className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                  {formErrors.phone && (
                    <span className="text-[10px] text-red-600">{formErrors.phone}</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Email Address (for order tracking)
                </label>
                <input
                  type="email"
                  required
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
                {formErrors.email && (
                  <span className="text-[10px] text-red-600">{formErrors.email}</span>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Street Address & Apartment
                </label>
                <textarea
                  required
                  rows={2}
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  placeholder="Flat / House No., Building Name, Street, Landmark"
                  className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
                {formErrors.address && (
                  <span className="text-[10px] text-red-600">{formErrors.address}</span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={customer.city}
                    onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                    placeholder="City"
                    className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                  {formErrors.city && (
                    <span className="text-[10px] text-red-600">{formErrors.city}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">State</label>
                  <select
                    value={customer.state}
                    onChange={(e) => setCustomer({ ...customer, state: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900 cursor-pointer"
                  >
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Delhi">Delhi NCR</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="West Bengal">West Bengal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">PIN Code</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={customer.pincode}
                    onChange={(e) => setCustomer({ ...customer, pincode: e.target.value })}
                    placeholder="6 digits"
                    className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900 font-mono"
                  />
                  {formErrors.pincode && (
                    <span className="text-[10px] text-red-600">{formErrors.pincode}</span>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-stone-950 hover:bg-stone-800 rounded-lg shadow-sm flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: PAYMENT METHOD */}
          {step === 'payment' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900">
                  2. Select Payment Method
                </h3>
                <button
                  onClick={() => setStep('shipping')}
                  className="text-xs text-stone-500 hover:text-stone-950 flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Edit Address</span>
                </button>
              </div>

              {/* Delivery Recap */}
              <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 text-xs text-stone-700 flex justify-between items-center">
                <div>
                  <span className="font-semibold text-stone-900">{customer.fullName}</span> ·{' '}
                  <span>{customer.city}, {customer.state} ({customer.pincode})</span>
                </div>
                <span className="text-[11px] text-stone-500 font-mono">{customer.phone}</span>
              </div>

              {/* Payment Options Grid */}
              <div className="space-y-3">
                {/* UPI Option */}
                <label
                  className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-stone-950 bg-stone-50/80 shadow-xs ring-1 ring-stone-950'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="mt-0.5 accent-stone-950"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <QrCode className="w-4 h-4 text-stone-900" />
                      <span className="text-xs font-bold text-stone-900">
                        UPI Instant (GPay / PhonePe / Paytm / QR)
                      </span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-semibold">
                        Instant
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-1">
                      Pay directly via any UPI app or scan dynamic QR code. Zero transaction fee.
                    </p>
                  </div>
                </label>

                {/* Cash on Delivery */}
                <label
                  className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-stone-950 bg-stone-50/80 shadow-xs ring-1 ring-stone-950'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-0.5 accent-stone-950"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Banknote className="w-4 h-4 text-stone-900" />
                      <span className="text-xs font-bold text-stone-900">Cash on Delivery (COD)</span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-1">
                      Pay cash or UPI to the courier delivery executive upon arrival at your doorstep.
                    </p>
                  </div>
                </label>

                {/* Card Option */}
                <label
                  className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-stone-950 bg-stone-50/80 shadow-xs ring-1 ring-stone-950'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="mt-0.5 accent-stone-950"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-stone-900" />
                      <span className="text-xs font-bold text-stone-900">Debit / Credit Cards</span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-1">
                      Visa, Mastercard, RuPay. Production setup uses Razorpay/Stripe tokenized gateways.
                    </p>
                  </div>
                </label>

                {/* NetBanking */}
                <label
                  className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'netbanking'
                      ? 'border-stone-950 bg-stone-50/80 shadow-xs ring-1 ring-stone-950'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'netbanking'}
                    onChange={() => setPaymentMethod('netbanking')}
                    className="mt-0.5 accent-stone-950"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Landmark className="w-4 h-4 text-stone-900" />
                      <span className="text-xs font-bold text-stone-900">NetBanking</span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-1">
                      All major Indian banks: HDFC, SBI, ICICI, Axis, Kotak.
                    </p>
                  </div>
                </label>
              </div>

              {/* Order Final Summary */}
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs space-y-2">
                <div className="flex justify-between text-stone-600">
                  <span>Items Total ({items.length} garments)</span>
                  <span className="font-mono tabular-nums">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Shipping Fee</span>
                  <span className="font-mono tabular-nums">
                    {shipping === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-950 pt-2 border-t border-stone-200">
                  <span>Payable Now</span>
                  <span className="font-mono text-base tabular-nums">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className="px-4 py-2.5 text-xs text-stone-700 hover:text-stone-950 cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  className="px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-stone-950 hover:bg-stone-800 rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  Confirm & Place Order · ₹{total.toLocaleString('en-IN')}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: ORDER SUCCESS CONFIRMATION */}
          {step === 'success' && confirmedOrder && (
            <div className="py-6 space-y-6 text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-stone-950 font-display">
                  Order Successfully Placed!
                </h3>
                <p className="text-xs text-stone-500">
                  Thank you, <strong className="text-stone-800">{confirmedOrder.customer.fullName}</strong>. Your apparel is being prepared for dispatch.
                </p>
                <div className="inline-block mt-2 bg-stone-100 text-stone-900 font-mono text-xs font-bold px-3 py-1 rounded-md">
                  Order ID: {confirmedOrder.orderId}
                </div>
              </div>

              {/* Order Breakdown Box */}
              <div className="text-left bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs space-y-3">
                <div className="font-bold text-stone-900 border-b border-stone-200 pb-2">
                  Order Summary
                </div>
                <div className="space-y-2">
                  {confirmedOrder.items.map((i) => (
                    <div key={i.id} className="flex justify-between items-center">
                      <div>
                        <span className="font-medium text-stone-900">{i.product.name}</span>
                        <span className="text-stone-500 ml-2">
                          (Size: {i.size}, Qty: {i.quantity})
                        </span>
                      </div>
                      <span className="font-mono tabular-nums text-stone-900">
                        ₹{(i.product.price * i.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-stone-200 flex justify-between font-bold text-stone-950">
                  <span>Grand Total ({confirmedOrder.paymentMethod})</span>
                  <span className="font-mono text-sm tabular-nums">
                    ₹{confirmedOrder.total.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="text-[11px] text-stone-500 pt-1">
                  Shipping to: {confirmedOrder.customer.address}, {confirmedOrder.customer.city},{' '}
                  {confirmedOrder.customer.state} - {confirmedOrder.customer.pincode}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={printReceipt}
                  className="px-5 py-2.5 text-xs font-semibold text-stone-800 bg-white border border-stone-300 hover:bg-stone-50 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download / Print Invoice</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-stone-950 hover:bg-stone-800 rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
