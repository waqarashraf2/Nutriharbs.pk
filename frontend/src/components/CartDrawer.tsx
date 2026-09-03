'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';

export default function CartDrawer() {
  const router = useRouter();
  const { 
    items, 
    isOpen, 
    closeCart, 
    updateQuantity, 
    removeItem, 
    getSubtotal, 
    getRemainingForFreeShipping, 
    isFreeShipping 
  } = useCartStore();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const subtotal = getSubtotal();
  const freeShippingUnlocked = isFreeShipping();
  const remainingForFree = getRemainingForFreeShipping();
  const progressPercent = Math.min(100, Math.round((subtotal / 2000) * 100));

  const handleProceedCheckout = () => {
    closeCart();
    router.push('/checkout');
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          onClick={closeCart}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 transition-opacity duration-300 animate-in fade-in"
        />
      )}

      {/* Slide-over Drawer Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-[#F4F9F4]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#1B4D3E] text-white flex items-center justify-center font-bold text-xs">
              <ShoppingBag className="w-4 h-4 text-emerald-300" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#1B4D3E]">Your Wellness Cart</h2>
              <p className="text-[11px] text-slate-500">{items.length} unique formula{items.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
          <button 
            onClick={closeCart}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="p-4 bg-emerald-50/70 border-b border-emerald-100">
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
            <span className="flex items-center gap-1.5 text-[#1B4D3E]">
              <Truck className="w-4 h-4 text-[#5BB318]" />
              {freeShippingUnlocked ? (
                <span className="text-[#5BB318] font-bold">🎉 FREE Delivery Unlocked!</span>
              ) : (
                <span>Add <strong className="text-[#1B4D3E]">Rs. {remainingForFree.toLocaleString()}</strong> more for FREE Shipping</span>
              )}
            </span>
            <span className="text-[11px] text-slate-500 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-[#1B4D3E] to-[#5BB318] h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500 space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-[#1B4D3E]">
                <ShoppingBag className="w-8 h-8 text-[#5BB318]" />
              </div>
              <p className="text-base font-bold text-slate-800">Your cart is empty</p>
              <p className="text-xs text-slate-500 max-w-xs">
                Explore our pure botanical formulas formulated for vitality, skin radiance, and joint strength.
              </p>
              <button
                onClick={closeCart}
                className="mt-2 bg-[#1B4D3E] text-white text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-[#13382D] transition-all"
              >
                Browse Natural Products
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div 
                key={`${item.product.id}-${item.selectedPack}`}
                className="p-3 bg-white rounded-xl border border-slate-100 shadow-xs flex gap-3 items-center hover:border-emerald-100 transition-colors"
              >
                {/* Product Thumbnail */}
                <div className="relative w-16 h-16 bg-[#F4F9F4] rounded-lg shrink-0 overflow-hidden border border-slate-100">
                  <Image
                    src={item.product.image}
                    alt={item.product.title}
                    fill
                    className="object-contain p-1"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-bold text-slate-900 truncate">
                    {item.product.title}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-100">
                      {item.selectedPack === 1 
                        ? '1 Pack' 
                        : item.selectedPack === 2 
                        ? '2 Packs (Save 10%)' 
                        : '3 Packs (Save 15%)'}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-[#1B4D3E] mt-1">
                    Rs. {item.packPrice.toLocaleString()}{' '}
                    <span className="text-[10px] text-slate-400 font-normal">/ unit</span>
                  </div>
                </div>

                {/* Quantity Controls & Delete */}
                <div className="flex flex-col items-end justify-between h-full gap-2 shrink-0">
                  <button
                    onClick={() => removeItem(item.product.id, item.selectedPack)}
                    className="text-slate-400 hover:text-red-500 p-1 transition-colors"
                    aria-label="Remove item from cart"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.selectedPack, item.quantity - 1)}
                      className="px-2 py-0.5 text-slate-600 hover:bg-slate-200 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-2 text-xs font-bold text-slate-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.selectedPack, item.quantity + 1)}
                      className="px-2 py-0.5 text-slate-600 hover:bg-slate-200 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {items.length > 0 && (
          <div className="p-4 border-t border-slate-100 bg-[#F4F9F4]/70 space-y-3">
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900">Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Nationwide Courier Delivery</span>
                {freeShippingUnlocked ? (
                  <span className="text-[#5BB318] font-bold">FREE</span>
                ) : (
                  <span className="font-semibold text-slate-800">Rs. 200</span>
                )}
              </div>
              <div className="flex justify-between text-sm font-extrabold text-[#1B4D3E] pt-2 border-t border-slate-200">
                <span>Estimated Total</span>
                <span>Rs. {(subtotal + (freeShippingUnlocked ? 0 : 200)).toLocaleString()}</span>
              </div>
            </div>

            {/* Primary Checkout CTA */}
            <button
              onClick={handleProceedCheckout}
              className="w-full bg-[#1B4D3E] hover:bg-[#13382D] text-white py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.99]"
            >
              <span>Proceed to Pakistani Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* WhatsApp Fallback Order */}
            <a
              href={`https://wa.me/923001234567?text=Hello%20Nutriherbs,%20I%20want%20to%20order%20the%20following%20herbal%20supplements:%0A${items.map(i => `- ${i.product.title} (${i.selectedPack} Pack) x ${i.quantity}`).join('%0A')}%0ASubtotal:%20Rs.%20${subtotal}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-4 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Instant Order via WhatsApp</span>
            </a>

            <div className="text-[10px] text-slate-500 text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#5BB318]" />
              <span>Cash on Delivery available nationwide across Pakistan</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
