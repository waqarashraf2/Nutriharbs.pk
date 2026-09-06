'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Search, 
  ShoppingBag, 
  Menu, 
  X, 
  ChevronDown, 
  ShieldCheck, 
  Sparkles,
  Phone,
  ArrowRight,
  Truck,
  MapPin,
  Award,
  PhoneCall
} from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { PRODUCTS, HEALTH_GOALS, PRODUCT_FORMS, getStoreProducts, getStoreCategories } from '@/lib/products-data';
import { Product, HealthGoalCategory } from '@/lib/types';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);
  const [categoriesList, setCategoriesList] = useState<HealthGoalCategory[]>(HEALTH_GOALS);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState<'goals' | 'forms' | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Scroll visibility state (Hide on scroll down, show on scroll up)
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  const { openCart, getTotalItemsCount } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setProductsList(getStoreProducts());
    setCategoriesList(getStoreCategories());

    const handleProdUpdate = () => setProductsList(getStoreProducts());
    const handleCatUpdate = () => setCategoriesList(getStoreCategories());
    window.addEventListener('nutriherbs_products_updated', handleProdUpdate);
    window.addEventListener('nutriherbs_categories_updated', handleCatUpdate);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Check if scrolled past threshold
      if (currentScrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY.current && currentScrollY > 90) {
        setIsVisible(false); // Scroll down -> slide up / hide
      } else {
        setIsVisible(true);  // Scroll up / top -> show
      }

      lastScrollY.current = currentScrollY;
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('nutriherbs_products_updated', handleProdUpdate);
      window.removeEventListener('nutriherbs_categories_updated', handleCatUpdate);
    };
  }, []);

  const totalCount = mounted ? getTotalItemsCount() : 0;

  // Live product search
  const searchResults = searchQuery.trim().length > 1
    ? productsList.filter((p) =>
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
    <>
      {/* Floating Pill Header Wrapper with Scroll Slide Up/Down Animation */}
      <header 
        className={`fixed top-3 sm:top-4 inset-x-0 z-50 px-3 sm:px-6 pointer-events-none transition-all duration-300 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-36 opacity-0'
        }`}
      >
        <div className="max-w-6xl mx-auto pointer-events-auto">
          
          {/* Main Glassmorphic Capsule */}
          <div className="bg-white/92 backdrop-blur-md rounded-3xl shadow-xl shadow-slate-900/8 border border-white/80 ring-1 ring-slate-900/10 overflow-hidden transition-all duration-200 hover:shadow-2xl">
            
            {/* Top Navigation Row */}
            <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 sm:gap-6">
              
              {/* Left: Brand Logo */}
              <Link href="/" className="flex items-center gap-2 shrink-0 group">
                <div className="relative w-36 sm:w-44 h-9 sm:h-10 transition-transform duration-300 group-hover:scale-103">
                  <Image
                    src="/images/logo.png"
                    alt="Nutriherbs Pakistan"
                    fill
                    sizes="180px"
                    priority
                    className="object-contain"
                  />
                </div>
              </Link>

              {/* Center: Desktop Navigation Links */}
              <nav className="hidden lg:flex items-center gap-6 text-[13px] font-bold text-slate-700">
                <Link 
                  href="/" 
                  className={`transition-colors hover:text-[#1B4D3E] ${pathname === '/' ? 'text-[#1B4D3E]' : ''}`}
                >
                  Home
                </Link>

                {/* Health Goals Mega Dropdown */}
                <div 
                  className="relative group py-1"
                  onMouseEnter={() => setMegaMenuOpen('goals')}
                  onMouseLeave={() => setMegaMenuOpen(null)}
                >
                  <button 
                    className="flex items-center gap-1 hover:text-[#1B4D3E] transition-colors"
                    onClick={() => setMegaMenuOpen(megaMenuOpen === 'goals' ? null : 'goals')}
                  >
                    <span>Health Goals</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${megaMenuOpen === 'goals' ? 'rotate-180 text-[#1B4D3E]' : ''}`} />
                  </button>

                  {megaMenuOpen === 'goals' && (
                    <div className="absolute top-full -left-12 w-80 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-100 p-3 grid grid-cols-1 gap-1 z-50 animate-in fade-in slide-in-from-top-2">
                      <div className="text-[10px] font-black uppercase text-slate-400 px-3 py-1">
                        Browse by Targeted Health Goal
                      </div>
                      {categoriesList.map((goal) => (
                        <Link
                          key={goal.id}
                          href={`/#products`}
                          onClick={() => setMegaMenuOpen(null)}
                          className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-emerald-50/70 text-slate-700 hover:text-[#1B4D3E] transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#5BB318]" />
                            <span className="font-semibold text-xs">{goal.title}</span>
                          </div>
                          <span className="text-[10px] text-slate-400">{goal.desc}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Product Forms Dropdown */}
                <div 
                  className="relative group py-1"
                  onMouseEnter={() => setMegaMenuOpen('forms')}
                  onMouseLeave={() => setMegaMenuOpen(null)}
                >
                  <button 
                    className="flex items-center gap-1 hover:text-[#1B4D3E] transition-colors"
                    onClick={() => setMegaMenuOpen(megaMenuOpen === 'forms' ? null : 'forms')}
                  >
                    <span>Formulations</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${megaMenuOpen === 'forms' ? 'rotate-180 text-[#1B4D3E]' : ''}`} />
                  </button>

                  {megaMenuOpen === 'forms' && (
                    <div className="absolute top-full left-0 w-52 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                      {PRODUCT_FORMS.map((form) => (
                        <Link
                          key={form.id}
                          href="/#products"
                          onClick={() => setMegaMenuOpen(null)}
                          className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-emerald-50/70 text-slate-700 hover:text-[#1B4D3E] text-xs font-semibold"
                        >
                          <span>{form.title}</span>
                          <span className="text-[10px] text-emerald-700 bg-emerald-100/60 px-1.5 py-0.5 rounded">
                            {form.count}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link 
                  href="/track-order" 
                  className="hover:text-[#1B4D3E] transition-colors"
                >
                  Track Order
                </Link>

                <Link 
                  href="/#purity" 
                  className="hover:text-[#1B4D3E] transition-colors"
                >
                  Purity Guarantee
                </Link>
              </nav>

              {/* Right: Search & Actions */}
              <div className="flex items-center gap-2 sm:gap-3">
                
                {/* Search Box with Real-Time Suggestions */}
                <div ref={searchRef} className="relative hidden md:block">
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setIsSearchOpen(true);
                      }}
                      onFocus={() => setIsSearchOpen(true)}
                      placeholder="Search collagen, biotin, calcium..."
                      className="w-48 lg:w-64 pl-8 pr-3 py-1.5 text-xs bg-slate-100/90 hover:bg-slate-100 focus:bg-white border border-transparent focus:border-[#1B4D3E] rounded-full transition-all focus:outline-none focus:w-72"
                    />
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
                  </div>

                  {/* Instant Search Dropdown */}
                  {isSearchOpen && searchResults.length > 0 && (
                    <div className="absolute right-0 top-full mt-2 w-80 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 animate-in fade-in">
                      <div className="text-[10px] font-bold text-slate-400 px-3 py-1 uppercase">
                        Matching Herbal Formulas
                      </div>
                      <div className="divide-y divide-slate-100">
                        {searchResults.map((product) => (
                          <button
                            key={product.id}
                            onClick={() => handleSelectProduct(product.slug)}
                            className="w-full p-2 rounded-xl hover:bg-emerald-50/70 text-left flex items-center gap-2.5 transition-colors"
                          >
                            <div className="relative w-10 h-10 bg-[#F4F9F4] rounded-lg overflow-hidden shrink-0 border border-slate-100">
                              <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className="object-contain p-0.5"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-bold text-slate-900 truncate">{product.title}</div>
                              <div className="text-[10px] text-slate-500 truncate">{product.subtitle}</div>
                              <div className="text-xs font-black text-[#1B4D3E]">Rs. {product.price.toLocaleString()}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Cart Drawer Trigger Button */}
                <button
                  onClick={openCart}
                  className="bg-[#1B4D3E] hover:bg-[#13382D] text-white px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full font-extrabold text-xs flex items-center gap-2 shadow-md shadow-emerald-900/10 transition-all hover:scale-103 active:scale-95 shrink-0"
                  aria-label="Open Shopping Cart"
                >
                  <ShoppingBag className="w-4 h-4 text-emerald-300" />
                  <span className="hidden sm:inline">Cart</span>
                  <span className="bg-[#5BB318] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center -mr-1">
                    {totalCount}
                  </span>
                </button>

                {/* Mobile Menu Toggle Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2 rounded-full text-slate-700 hover:bg-slate-100"
                  aria-label="Toggle navigation menu"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>

              </div>

            </div>

            {/* Bottom Integrated Announcement Sub-Strip (Matching User Reference Pill Design) */}
            <div className="border-t border-slate-200/60 bg-[#F8FAF8] px-4 sm:px-6 py-1 text-[11px] text-slate-600 flex items-center justify-between gap-2 overflow-hidden">
              <div className="flex items-center gap-1.5 truncate text-center w-full justify-center sm:justify-start">
                <span className="text-[#5BB318] font-black shrink-0">🌿</span>
                <span className="font-semibold text-slate-800 truncate">
                  100% Pure Botanical Science • DRAP &amp; GMP Certified
                </span>
                <span className="hidden md:inline text-slate-400">•</span>
                <span className="hidden md:inline text-[#1B4D3E] font-bold">
                  Free Nationwide Delivery on Orders &gt; Rs. 2,000
                </span>
              </div>

              <div className="hidden sm:flex items-center gap-3 shrink-0 text-[10px] text-slate-500 font-medium">
                <Link href="/track-order" className="hover:text-[#1B4D3E] flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#5BB318]" />
                  <span>Track Courier</span>
                </Link>
                <span>|</span>
                <a 
                  href="https://wa.me/923001234567?text=Hello%20Nutriherbs%20team,%20I%20have%20an%20inquiry%20about%20your%20herbal%20supplements."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 font-bold hover:underline flex items-center gap-1"
                >
                  <PhoneCall className="w-3 h-3 text-[#25D366]" />
                  <span>0300-1234567</span>
                </a>
              </div>
            </div>

          </div>

          {/* Mobile Navigation Drawer */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-2 bg-white/95 backdrop-blur-md rounded-3xl border border-slate-100 shadow-2xl p-4 space-y-3 animate-in fade-in slide-in-from-top-2">
              
              {/* Mobile Search */}
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search herbal supplements..."
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#1B4D3E]"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

              <div className="flex flex-col space-y-1 text-xs font-bold text-slate-700 pt-1">
                <Link 
                  href="/" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl hover:bg-[#F4F9F4]"
                >
                  Home
                </Link>
                
                <div className="px-3 py-2 text-[11px] font-black uppercase text-slate-400">
                  Shop Health Goals:
                </div>
                {categoriesList.map((g) => (
                  <Link
                    key={g.id}
                    href="/#products"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-1.5 rounded-lg hover:bg-[#F4F9F4] text-slate-600 pl-6"
                  >
                    • {g.title}
                  </Link>
                ))}

                <Link 
                  href="/track-order" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl hover:bg-[#F4F9F4] text-[#1B4D3E]"
                >
                  Track Your Order
                </Link>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 font-bold text-[#1B4D3E]">
                  <ShieldCheck className="w-4 h-4 text-[#5BB318]" /> DRAP Certified
                </span>
                <a 
                  href="https://wa.me/923001234567" 
                  className="bg-[#25D366] text-white px-3 py-1 rounded-full font-bold text-[11px] flex items-center gap-1"
                >
                  <Phone className="w-3 h-3" /> WhatsApp
                </a>
              </div>
            </div>
          )}

        </div>
      </header>

      {/* Spacing compensation so content doesn't get clipped under the floating header */}
      <div className="h-20 sm:h-24" />
    </>
  );
}
