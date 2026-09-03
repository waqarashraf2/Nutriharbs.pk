'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  ShoppingBag, 
  Menu, 
  X, 
  ChevronDown, 
  ShieldCheck, 
  Sparkles,
  Phone,
  ArrowRight
} from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { PRODUCTS, HEALTH_GOALS, PRODUCT_FORMS } from '@/lib/products-data';

export default function Navbar() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState<'goals' | 'forms' | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const { items, openCart, getTotalItemsCount } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalCount = mounted ? getTotalItemsCount() : 0;

  // Filter products live
  const searchResults = searchQuery.trim().length > 1
    ? PRODUCTS.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.healthGoal.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.form.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSelectProduct = (slug: string) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    router.push(`/product/${slug}`);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo & Tagline */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="relative w-44 h-12 transition-transform duration-300 group-hover:scale-[1.02]">
              <Image
                src="/images/logo.png"
                alt="Nutriherbs - All Pure, All Natural"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            <Link 
              href="/" 
              className="text-sm font-semibold text-slate-700 hover:text-[#1B4D3E] transition-colors"
            >
              Home
            </Link>

            {/* Health Goals Mega Menu Trigger */}
            <div 
              className="relative"
              onMouseEnter={() => setMegaMenuOpen('goals')}
              onMouseLeave={() => setMegaMenuOpen(null)}
            >
              <button 
                type="button"
                className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-[#1B4D3E] transition-colors py-2"
              >
                Health Goals
                <ChevronDown className="w-4 h-4 transition-transform duration-200" />
              </button>

              {megaMenuOpen === 'goals' && (
                <div className="absolute top-full left-0 w-[520px] bg-white rounded-2xl shadow-xl border border-slate-100 p-5 grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  {HEALTH_GOALS.map((goal) => (
                    <Link
                      key={goal.id}
                      href={`/#products`}
                      onClick={() => setMegaMenuOpen(null)}
                      className="p-3 rounded-xl hover:bg-[#F4F9F4] transition-colors flex flex-col gap-1 border border-transparent hover:border-emerald-100 group"
                    >
                      <span className="text-sm font-bold text-slate-800 group-hover:text-[#1B4D3E] flex items-center justify-between">
                        {goal.title}
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#5BB318]" />
                      </span>
                      <span className="text-xs text-slate-500">{goal.desc}</span>
                    </Link>
                  ))}
                  <div className="col-span-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1 text-emerald-700 font-medium">
                      <ShieldCheck className="w-4 h-4 text-[#5BB318]" /> All DRAP Enlisted Formulas
                    </span>
                    <Link href="/#products" className="text-[#1B4D3E] font-semibold hover:underline">
                      View all products →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Product Forms Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setMegaMenuOpen('forms')}
              onMouseLeave={() => setMegaMenuOpen(null)}
            >
              <button 
                type="button"
                className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-[#1B4D3E] transition-colors py-2"
              >
                Product Forms
                <ChevronDown className="w-4 h-4 transition-transform duration-200" />
              </button>

              {megaMenuOpen === 'forms' && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 flex flex-col gap-1 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  {PRODUCT_FORMS.map((form) => (
                    <Link
                      key={form.id}
                      href={`/#products`}
                      onClick={() => setMegaMenuOpen(null)}
                      className="p-2.5 rounded-lg hover:bg-[#F4F9F4] text-sm font-medium text-slate-700 hover:text-[#1B4D3E] flex items-center justify-between transition-colors"
                    >
                      {form.title}
                      <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                        {form.count}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link 
              href="/track-order" 
              className="text-sm font-semibold text-slate-700 hover:text-[#1B4D3E] transition-colors"
            >
              Track Order
            </Link>
          </nav>

          {/* Search Box with Real-Time Suggestions */}
          <div className="hidden md:flex flex-1 max-w-md relative" ref={searchRef}>
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search herbal supplements, biotin, collagen, calcium..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                className="w-full bg-[#F4F9F4] border border-emerald-100/80 rounded-full pl-10 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#1B4D3E]/30 focus:border-[#1B4D3E] transition-all text-slate-800 placeholder:text-slate-400"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Live Search Popup */}
            {isSearchOpen && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 overflow-hidden">
                <div className="px-3 py-1.5 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                  Products ({searchResults.length})
                </div>
                <div className="divide-y divide-slate-100">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product.slug)}
                      className="p-2.5 hover:bg-[#F4F9F4] rounded-xl cursor-pointer flex items-center gap-3 transition-colors group"
                    >
                      <div className="relative w-11 h-11 bg-white border border-slate-100 rounded-lg overflow-hidden shrink-0">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-[#1B4D3E] truncate">
                          {product.title}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">
                          {product.subtitle}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs font-bold text-[#1B4D3E]">
                          Rs. {product.price.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-[#5BB318] font-semibold">
                          {product.discount}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Triggers (Cart & Mobile Menu) */}
          <div className="flex items-center gap-3">
            {/* Cart Trigger Button */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 bg-[#1B4D3E] hover:bg-[#13382D] text-white px-4 py-2 rounded-full font-semibold text-xs transition-all shadow-sm hover:shadow active:scale-95"
              aria-label="Open Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-300" />
              <span className="hidden sm:inline">Cart</span>
              {totalCount > 0 && (
                <span className="bg-[#5BB318] text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-100 space-y-3 animate-in fade-in slide-in-from-top duration-200">
            {/* Mobile Search */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F4F9F4] border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-[#1B4D3E]"
              />
            </div>

            {searchQuery && searchResults.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-2 divide-y divide-slate-100">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleSelectProduct(product.slug);
                    }}
                    className="p-2 flex items-center gap-2 cursor-pointer"
                  >
                    <div className="relative w-8 h-8 shrink-0">
                      <Image src={product.image} alt={product.title} fill className="object-contain" />
                    </div>
                    <div className="flex-1 min-w-0 text-xs truncate">
                      <div className="font-bold text-slate-800">{product.title}</div>
                      <div className="text-slate-500">Rs. {product.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col gap-1 text-sm font-medium text-slate-700">
              <Link 
                href="/" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-[#F4F9F4] text-[#1B4D3E] font-bold"
              >
                Home
              </Link>
              <Link 
                href="/#products" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-[#F4F9F4]"
              >
                Best Sellers &amp; All Products
              </Link>
              <Link 
                href="/track-order" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-[#F4F9F4]"
              >
                Track Order
              </Link>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#5BB318]" /> 100% Herbal &amp; Natural
              </span>
              <a href="tel:03001234567" className="text-[#1B4D3E] font-bold flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" /> 0300-1234567
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
