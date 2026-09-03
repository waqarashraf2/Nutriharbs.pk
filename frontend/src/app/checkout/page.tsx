'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  CheckCircle2, 
  ArrowLeft, 
  PhoneCall, 
  Tag, 
  AlertCircle,
  Building,
  MapPin,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCartStore } from '@/lib/cart-store';
import { PAKISTAN_CITIES } from '@/lib/products-data';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, isFreeShipping, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [selectedCity, setSelectedCity] = useState(PAKISTAN_CITIES[0].name);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank_transfer'>('cod');
  const [orderNotes, setOrderNotes] = useState('');

  // Coupon
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#1B4D3E] flex items-center justify-center mb-4">
          <Truck className="w-8 h-8 text-[#5BB318]" />
        </div>
        <h1 className="text-2xl font-black text-slate-900 mb-2">Your Cart is Currently Empty</h1>
        <p className="text-xs text-slate-500 max-w-sm mb-6">
          Please select your herbal nutraceutical formula to proceed with Pakistani nationwide Cash on Delivery.
        </p>
        <Link
          href="/#products"
          className="bg-[#1B4D3E] text-white px-6 py-3 rounded-full font-bold text-xs hover:bg-[#13382D] transition-colors"
        >
          Browse Nutriherbs Catalog
        </Link>
      </div>
    );
  }

  const subtotal = getSubtotal();
  const matchedCity = PAKISTAN_CITIES.find((c) => c.name === selectedCity) || PAKISTAN_CITIES[0];
  const shippingFee = isFreeShipping() ? 0 : matchedCity.courierFee;

  let discount = 0;
  if (appliedCoupon === 'NUTRI10') {
    discount = Math.round(subtotal * 0.10);
  }

  const grandTotal = subtotal + shippingFee - discount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (couponInput.trim().toUpperCase() === 'NUTRI10') {
      setAppliedCoupon('NUTRI10');
      setCouponInput('');
    } else {
      setCouponError('Invalid coupon code. Try NUTRI10 for 10% off.');
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address) {
      alert('Please fill out your full name, phone number, and delivery address.');
      return;
    }

    setIsSubmitting(true);

    const orderNumber = `NH-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderData = {
      orderNumber,
      customerName: fullName,
      phone,
      email,
      address,
      city: selectedCity,
      province: matchedCity.province,
      paymentMethod,
      orderNotes,
      subtotal,
      shippingFee,
      discount,
      couponCode: appliedCoupon || undefined,
      total: grandTotal,
      status: 'pending_verification',
      courier: 'trax',
      trackingNumber: `TRX${Math.floor(10000000 + Math.random() * 90000000)}PK`,
      createdAt: new Date().toISOString(),
      items: items.map((i) => ({
        productId: i.product.id,
        productTitle: i.product.title,
        quantity: i.quantity,
        price: i.packPrice,
        total: i.packPrice * i.quantity,
        packCount: i.selectedPack,
        image: i.product.image
      }))
    };

    // Try posting to Laravel Backend API if running, else save locally
    try {
      await fetch('http://localhost:8000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
    } catch {
      // Offline / dev fallback: persist to localStorage
      console.log('Saved order to local storage fallback');
    }

    // Save to local storage for instant invoice rendering & tracking
    const existingOrders = JSON.parse(localStorage.getItem('nutriherbs_orders') || '[]');
    existingOrders.unshift(orderData);
    localStorage.setItem('nutriherbs_orders', JSON.stringify(existingOrders));

    // Celebrate with confetti!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    clearCart();
    setIsSubmitting(false);
    router.push(`/order-success/${orderNumber}`);
  };

  return (
    <div className="bg-[#F4F9F4]/40 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header link */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B4D3E] hover:underline">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Store
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            Pakistani 1-Page Express Checkout
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Cash on Delivery nationwide with Trax, PostEx &amp; Leopards Courier. No upfront payment required.
          </p>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Shipping & Payment Form */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Customer Contact & Delivery Address */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <div className="w-7 h-7 rounded-full bg-[#1B4D3E] text-white flex items-center justify-center text-xs font-black">
                  1
                </div>
                <h2 className="text-base font-bold text-slate-900">
                  Customer Contact &amp; Delivery Address
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Muhammad Hamza"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-[#1B4D3E] bg-white text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Mobile Phone Number (WhatsApp Priority) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0300 1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-[#1B4D3E] bg-white text-slate-800"
                  />
                  <span className="text-[10px] text-slate-400">The courier rider will call/SMS this number before delivery.</span>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. yourname@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-[#1B4D3E] bg-white text-slate-800"
                  />
                  <span className="text-[10px] text-slate-400">For automated PDF invoice and tracking updates.</span>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-[#1B4D3E] bg-white text-slate-800 font-semibold"
                  >
                    {PAKISTAN_CITIES.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name} ({c.province})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Province
                  </label>
                  <input
                    type="text"
                    disabled
                    value={matchedCity.province}
                    className="w-full border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-500 cursor-not-allowed"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">
                    Complete Street Address &amp; Nearest Landmark <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="House/Apartment #, Street #, Sector / Phase / Mohalla, near landmark"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-[#1B4D3E] bg-white text-slate-800"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">
                    Special Delivery Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Call before coming, deliver between 2 PM - 5 PM"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-[#1B4D3E] bg-white text-slate-800"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <div className="w-7 h-7 rounded-full bg-[#1B4D3E] text-white flex items-center justify-center text-xs font-black">
                  2
                </div>
                <h2 className="text-base font-bold text-slate-900">
                  Select Payment Method
                </h2>
              </div>

              <div className="space-y-3">
                {/* Cash on Delivery (Default) */}
                <label className={`p-4 rounded-2xl border cursor-pointer flex items-start gap-3 transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-[#1B4D3E] bg-emerald-50/40 ring-2 ring-[#1B4D3E]/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-1 text-[#1B4D3E] focus:ring-[#1B4D3E]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-slate-900">
                        Cash on Delivery (COD) - Recommended
                      </span>
                      <span className="text-[10px] font-bold bg-[#5BB318] text-white px-2 py-0.5 rounded-full">
                        Zero Risk
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Pay cash upon parcel delivery at your doorstep anywhere in Pakistan.
                    </p>
                  </div>
                </label>

                {/* Direct Bank Transfer / EasyPaisa */}
                <label className={`p-4 rounded-2xl border cursor-pointer flex items-start gap-3 transition-all ${
                  paymentMethod === 'bank_transfer'
                    ? 'border-[#1B4D3E] bg-emerald-50/40 ring-2 ring-[#1B4D3E]/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank_transfer"
                    checked={paymentMethod === 'bank_transfer'}
                    onChange={() => setPaymentMethod('bank_transfer')}
                    className="mt-1 text-[#1B4D3E] focus:ring-[#1B4D3E]"
                  />
                  <div className="flex-1">
                    <span className="text-xs font-extrabold text-slate-900">
                      Direct Bank Transfer / EasyPaisa / Nayapay
                    </span>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Transfer directly to our official Meezan Bank account and share screenshot on WhatsApp.
                    </p>

                    {paymentMethod === 'bank_transfer' && (
                      <div className="mt-3 p-3 rounded-xl bg-white border border-emerald-200 text-xs text-slate-700 space-y-1">
                        <div><strong>Bank:</strong> Meezan Bank Ltd.</div>
                        <div><strong>Account Title:</strong> Nutriherbs Naturals Pakistan</div>
                        <div><strong>Account No:</strong> 0102-0104829102</div>
                        <div><strong>IBAN:</strong> PK64MEZN0001020104829102</div>
                        <div className="text-[10px] text-slate-500 pt-1">
                          Please mention your Order ID as payment reference.
                        </div>
                      </div>
                    )}
                  </div>
                </label>
              </div>
            </div>

            {/* Courier Dispatch Partner Notice */}
            <div className="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-100 flex items-center justify-between text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#5BB318]" />
                <div>
                  <strong>Estimated Delivery:</strong> {matchedCity.deliveryDays} to {selectedCity}
                </div>
              </div>
              <div className="text-[11px] font-bold text-slate-500">
                Via Trax Logistics &amp; PostEx
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary & Instant Action */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-5">
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                Order Summary ({items.length} item{items.length !== 1 ? 's' : ''})
              </h2>

              {/* Items preview */}
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.selectedPack}`} className="flex items-center gap-3">
                    <div className="relative w-12 h-12 bg-[#F4F9F4] rounded-lg border border-slate-100 shrink-0 overflow-hidden">
                      <Image
                        src={item.product.image}
                        alt={item.product.title}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-slate-900 truncate">
                        {item.product.title}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {item.selectedPack === 1 ? '1 Pack' : `${item.selectedPack} Packs`} × {item.quantity}
                      </div>
                    </div>
                    <div className="text-xs font-bold text-[#1B4D3E]">
                      Rs. {(item.packPrice * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Engine */}
              <div className="pt-2 border-t border-slate-100">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon code (e.g. NUTRI10)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#1B4D3E] uppercase"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="bg-[#10375C] hover:bg-[#0D2D4B] text-white px-4 py-2 rounded-xl text-xs font-bold"
                  >
                    Apply
                  </button>
                </div>
                {appliedCoupon && (
                  <div className="mt-2 text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#5BB318]" />
                    Coupon {appliedCoupon} applied (10% discount)
                  </div>
                )}
                {couponError && (
                  <div className="mt-2 text-[11px] text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {couponError}
                  </div>
                )}
              </div>

              {/* Financial Breakdown */}
              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Courier Delivery ({selectedCity})</span>
                  {shippingFee === 0 ? (
                    <span className="text-[#5BB318] font-bold">FREE DELIVERY</span>
                  ) : (
                    <span className="font-semibold text-slate-900">Rs. {shippingFee}</span>
                  )}
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount (10% Coupon)</span>
                    <span>- Rs. {discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-black text-[#1B4D3E] pt-3 border-t border-slate-200">
                  <span>Total Amount</span>
                  <span>Rs. {grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#1B4D3E] hover:bg-[#13382D] text-white py-4 px-4 rounded-2xl font-black text-sm shadow-xl shadow-[#1B4D3E]/20 transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
              >
                <Lock className="w-4 h-4 text-emerald-300" />
                <span>
                  {isSubmitting ? 'Processing Order...' : `Place Order (Rs. ${grandTotal.toLocaleString()})`}
                </span>
              </button>

              {/* WhatsApp direct order concierge fallback */}
              <a
                href={`https://wa.me/923001234567?text=Hello%20Nutriherbs,%20I%20want%20to%20place%20an%20order%20directly%20for:%0A${items.map(i => `- ${i.product.title} (${i.selectedPack} Pack) x ${i.quantity}`).join('%0A')}%0ATotal:%20Rs.%20${grandTotal}%0ACity:%20${selectedCity}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-3 px-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Order Directly via WhatsApp Concierge</span>
              </a>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#5BB318]" />
                <span>100% Encrypted &amp; Confidential Checkout</span>
              </div>
            </div>

          </div>

        </form>

      </div>
    </div>
  );
}
