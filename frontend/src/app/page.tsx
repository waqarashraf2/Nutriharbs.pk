'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  ChevronRight, 
  HelpCircle, 
  Check, 
  BookOpen, 
  Truck, 
  Clock, 
  ThumbsUp,
  ArrowRight
} from 'lucide-react';
import HeroBanner from '@/components/HeroBanner';
import HealthGoalsGrid from '@/components/HealthGoalsGrid';
import ProductCard from '@/components/ProductCard';
import PurityGuarantee from '@/components/PurityGuarantee';
import ReviewsSection from '@/components/ReviewsSection';
import { PRODUCTS, getStoreProducts } from '@/lib/products-data';
import { Product } from '@/lib/types';

export default function HomePage() {
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'bestsellers' | 'hair-skin' | 'bone-joint' | 'men' | 'weight'>('all');

  React.useEffect(() => {
    setProductsList(getStoreProducts());
    const handleUpdate = () => setProductsList(getStoreProducts());
    window.addEventListener('nutriherbs_products_updated', handleUpdate);
    return () => window.removeEventListener('nutriherbs_products_updated', handleUpdate);
  }, []);

  // Filter products based on selectedGoal or activeTab
  const filteredProducts = productsList.filter((product) => {
    if (selectedGoal) {
      return product.healthGoal.toLowerCase().includes(selectedGoal.toLowerCase());
    }

    if (activeTab === 'bestsellers') return product.isBestSeller;
    if (activeTab === 'hair-skin') return product.healthGoal.toLowerCase().includes('hair') || product.healthGoal.toLowerCase().includes('skin');
    if (activeTab === 'bone-joint') return product.healthGoal.toLowerCase().includes('bone') || product.healthGoal.toLowerCase().includes('joint');
    if (activeTab === 'men') return product.healthGoal.toLowerCase().includes('men');
    if (activeTab === 'weight') return product.healthGoal.toLowerCase().includes('weight') || product.healthGoal.toLowerCase().includes('detox');
    return true;
  });

  const bestSellers = productsList.filter(p => p.isBestSeller).slice(0, 4);

  const faqs = [
    {
      q: 'Are Nutriherbs products certified by DRAP (Drug Regulatory Authority of Pakistan)?',
      a: 'Yes, 100%. Every single formulation manufactured by Nutriherbs is enlisted under the Drug Regulatory Authority of Pakistan (DRAP) Alternative Medicine & Health Products regulations in cGMP compliant manufacturing plants.'
    },
    {
      q: 'How does Cash on Delivery (COD) work?',
      a: 'We offer hassle-free Cash on Delivery across 100+ cities in Pakistan (via Trax, PostEx, and Leopards Courier). You do not pay anything online; simply hand the cash to the courier rider upon parcel arrival at your doorstep.'
    },
    {
      q: 'How long does nationwide delivery take?',
      a: 'Orders in major metropolitan areas (Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad) are delivered within 24 to 48 business hours. Other regional cities take 2 to 3 days.'
    },
    {
      q: 'How do bundle discounts work?',
      a: 'When you select 2 Packs on any product page, you automatically save 10%. When you select 3 Packs, you save 15% AND unlock 100% Free Nationwide Express Delivery.'
    }
  ];

  return (
    <div className="space-y-0">
      
      {/* 1. Hero Section with GSAP */}
      <HeroBanner />

      {/* 2. Shop by Health Goal Category Grid */}
      <HealthGoalsGrid 
        selectedGoal={selectedGoal}
        onSelectGoal={(goal) => {
          setSelectedGoal(goal);
          const el = document.getElementById('products');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 3. Products Catalog Grid Section */}
      <section id="products" className="py-16 bg-[#F4F9F4]/50 border-t border-slate-100 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header with Filter Tabs */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B4D3E] uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#5BB318]" />
                All Pure • All Natural Formulations
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                {selectedGoal ? `${selectedGoal} Formulas` : 'Best Sellers & Trending Products'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Showing {filteredProducts.length} certified herbal nutraceuticals with clinically verified potency.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {[
                { id: 'all', label: 'All Products' },
                { id: 'bestsellers', label: 'Best Sellers' },
                { id: 'hair-skin', label: 'Hair & Skin' },
                { id: 'bone-joint', label: 'Bone & Joint' },
                { id: 'men', label: "Men's Health" },
                { id: 'weight', label: 'Weight Loss' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setSelectedGoal(null);
                    setActiveTab(tab.id as any);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    !selectedGoal && activeTab === tab.id
                      ? 'bg-[#1B4D3E] text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </section>

      {/* 4. High-Impact Clinical Spotlight Banner (KalFit Feature) */}
      <section className="py-16 bg-gradient-to-r from-[#1B4D3E] to-[#10375C] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                FLAGSHIP FORMULATION
              </div>
              <h2 className="text-3xl sm:text-4xl font-black leading-tight">
                Why Icelandic Red Algae Calcium Outperforms Ordinary Calcium
              </h2>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-xl">
                Ordinary synthetic calcium carbonate causes bloating and arterial calcification. <strong>KalFit</strong> utilizes organic marine red algae featuring 72 natural trace minerals, paired with active Vitamin K2 (MK-7) to direct calcium straight into bone matrix.
              </p>
              
              <div className="grid grid-cols-2 gap-3 pt-2 max-w-md">
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <Check className="w-4 h-4 text-[#5BB318] shrink-0" />
                  <span>38% Higher Bio-Absorption</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <Check className="w-4 h-4 text-[#5BB318] shrink-0" />
                  <span>Non-Constipating Plant Formula</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <Check className="w-4 h-4 text-[#5BB318] shrink-0" />
                  <span>Vitamin K2 (MK-7) Arterial Shield</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <Check className="w-4 h-4 text-[#5BB318] shrink-0" />
                  <span>DRAP Certified Enlistment</span>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap gap-4 items-center">
                <Link
                  href="/product/kalfit-bone-joint-support"
                  className="bg-[#5BB318] hover:bg-[#4E9F3D] text-white px-6 py-3 rounded-full font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-900/30 transition-all hover:scale-102"
                >
                  <span>Shop KalFit at Rs. 1,950</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <span className="text-xs text-emerald-200 font-semibold">
                  🚚 Free Shipping with 2+ Packs
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-72 h-88 bg-white/10 rounded-3xl p-4 backdrop-blur-md border border-white/20 shadow-2xl flex items-center justify-center group">
                <div className="relative w-64 h-72">
                  <Image
                    src="/images/products/kalfit-bone-joint.webp"
                    alt="KalFit Formula"
                    fill
                    className="object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute bottom-4 inset-x-4 bg-white text-slate-900 p-2.5 rounded-xl text-center shadow-lg">
                  <div className="text-xs font-bold text-[#1B4D3E]">KalFit Bone &amp; Joint</div>
                  <div className="text-[10px] text-slate-500">30 Herbal Capsules • Rs. 1,950</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. The Nutriherbs Purity Guarantee */}
      <PurityGuarantee />

      {/* 6. Customer Transformation Reviews */}
      <ReviewsSection />

      {/* 7. Health & Wellness SEO Blog Articles */}
      <section className="py-16 bg-[#F4F9F4]/40 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#5BB318] uppercase tracking-wider">
              Health &amp; Wellness Knowledge Hub
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Science-Backed Botanical Insights
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Learn how organic dietary supplements can safely transform your energy, skin resilience, and joint longevity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between">
              <div className="p-6">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full uppercase">
                  Skin &amp; Collagen
                </span>
                <h3 className="font-bold text-base text-slate-900 mt-3 hover:text-[#1B4D3E] cursor-pointer">
                  Why Hydrolyzed Marine Collagen Absorbs 1.5x Faster Than Bovine Collagen
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Discover the scientific molecular weight difference of marine peptides and why they promote natural dermal hydration without causing digestive discomfort.
                </p>
              </div>
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>5 min read</span>
                <span className="text-[#1B4D3E] font-bold">Read Article →</span>
              </div>
            </article>

            <article className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between">
              <div className="p-6">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full uppercase">
                  Hair Growth
                </span>
                <h3 className="font-bold text-base text-slate-900 mt-3 hover:text-[#1B4D3E] cursor-pointer">
                  Halting Severe Hair Fall in Pakistan: The Biotin &amp; Keratin Protocol
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Hard tap water, extreme heat, and dietary nutrient gaps in Pakistan lead to excessive follicle shedding. Here is how 2500 MCG pure Biotin strengthens roots.
                </p>
              </div>
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>4 min read</span>
                <span className="text-[#1B4D3E] font-bold">Read Article →</span>
              </div>
            </article>

            <article className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between">
              <div className="p-6">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full uppercase">
                  Bone Density
                </span>
                <h3 className="font-bold text-base text-slate-900 mt-3 hover:text-[#1B4D3E] cursor-pointer">
                  The Critical Role of Vitamin K2 in Preventing Calcium Kidney Stones
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Taking calcium without Vitamin K2 and D3 can lead to dangerous vascular calcification. Learn why KalFit combines all three essential co-factors.
                </p>
              </div>
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>6 min read</span>
                <span className="text-[#1B4D3E] font-bold">Read Article →</span>
              </div>
            </article>
          </div>

        </div>
      </section>

      {/* 8. Pakistani Buyer FAQs Accordion */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-[#5BB318] uppercase tracking-wider">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Common Questions About Orders &amp; Formulations
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-[#F4F9F4]/70 border border-slate-100 space-y-2"
              >
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#1B4D3E] shrink-0" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
