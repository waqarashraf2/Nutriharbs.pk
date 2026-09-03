'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingBag, Check, ShieldCheck, Eye, Share2 } from 'lucide-react';
import { Product } from '@/lib/types';
import { useCartStore } from '@/lib/cart-store';
import ShareProductModal from '@/components/ShareProductModal';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();
  const [added, setAdded] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleOpenShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShareOpen(true);
  };

  return (
    <>
      <div className="group bg-white rounded-2xl border border-slate-100 hover:border-emerald-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative">
        
        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start pointer-events-none">
          {product.discount && (
            <span className="bg-[#5BB318] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
              {product.discount}
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-[#10375C] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
              Best Seller
            </span>
          )}
        </div>

        {/* Top Right Action Strip: DRAP + Share Button */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
          <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-[#1B4D3E] bg-[#F4F9F4]/90 backdrop-blur-xs px-1.5 py-0.5 rounded border border-emerald-100 shadow-2xs">
            <ShieldCheck className="w-2.5 h-2.5 text-[#5BB318]" /> DRAP
          </span>
          <button
            onClick={handleOpenShare}
            className="w-6 h-6 rounded-full bg-white/90 hover:bg-white text-slate-500 hover:text-[#1B4D3E] border border-slate-200/80 flex items-center justify-center shadow-xs transition-transform duration-200 hover:scale-110 active:scale-95"
            title={`Share ${product.title}`}
            aria-label={`Share ${product.title}`}
          >
            <Share2 className="w-3 h-3" />
          </button>
        </div>

        {/* Image Container with View Details Link */}
        <Link 
          href={`/product/${product.slug}`}
          className="relative w-full aspect-square bg-[#F4F9F4]/60 p-4 flex items-center justify-center overflow-hidden"
        >
          <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-108">
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-contain"
            />
          </div>

          {/* Hover Quick Preview Pill */}
          <div className="absolute inset-x-4 bottom-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex justify-center">
            <span className="bg-white/95 backdrop-blur-xs text-[#1B4D3E] font-bold text-xs py-1.5 px-4 rounded-full shadow-md border border-slate-100 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" /> View Formulation
            </span>
          </div>
        </Link>

        {/* Card Body */}
        <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
          
          <div>
            {/* Health Goal & Form tag */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
              <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                {product.healthGoal}
              </span>
              <span>{product.form}</span>
            </div>

            {/* Product Title */}
            <Link href={`/product/${product.slug}`}>
              <h3 className="font-bold text-sm text-slate-900 group-hover:text-[#1B4D3E] transition-colors line-clamp-1">
                {product.title}
              </h3>
            </Link>

            {/* Subtitle / Key Highlight */}
            <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
              {product.subtitle}
            </p>

            {/* Star Ratings */}
            <div className="flex items-center gap-1.5 mt-2">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-700">{product.rating}</span>
              <span className="text-[10px] text-slate-400">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Pricing & 1-Click Quick Add Button */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
            <div>
              <div className="text-sm font-extrabold text-[#1B4D3E]">
                Rs. {product.price.toLocaleString()}
              </div>
              {product.originalPrice && (
                <div className="text-[11px] text-slate-400 line-through">
                  Rs. {product.originalPrice.toLocaleString()}
                </div>
              )}
            </div>

            <button
              onClick={handleQuickAdd}
              disabled={added}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 active:scale-95 shadow-xs ${
                added
                  ? 'bg-[#5BB318] text-white'
                  : 'bg-[#1B4D3E] hover:bg-[#13382D] text-white hover:shadow-md'
              }`}
              aria-label={`Add ${product.title} to cart`}
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>

      {/* Share Modal */}
      <ShareProductModal
        product={product}
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
      />
    </>
  );
}
