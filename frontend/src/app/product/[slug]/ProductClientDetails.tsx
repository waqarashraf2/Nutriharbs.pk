'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Star, 
  Check, 
  ShieldCheck, 
  Truck, 
  ShoppingBag, 
  PhoneCall, 
  Award, 
  Clock, 
  RotateCcw, 
  HelpCircle,
  Sparkles,
  Calendar,
  Activity,
  Layers,
  BookOpen,
  Tag,
  ArrowRight,
  Share2
} from 'lucide-react';
import { Product } from '@/lib/types';
import { useCartStore } from '@/lib/cart-store';
import ProductCard from '@/components/ProductCard';
import RichArticleRenderer from '@/components/RichArticleRenderer';
import ShareProductModal from '@/components/ShareProductModal';

interface ProductClientDetailsProps {
  product: Product;
  crossSell: Product[];
}

export default function ProductClientDetails({ product, crossSell }: ProductClientDetailsProps) {
  const [selectedPack, setSelectedPack] = useState<1 | 2 | 3>(1);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'facts' | 'science' | 'timeline' | 'faqs'>('facts');
  const [added, setAdded] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const { addItem } = useCartStore();

  let discountRate = 0;
  if (selectedPack === 2) discountRate = 0.10;
  if (selectedPack === 3) discountRate = 0.15;

  const singleBottlePrice = Math.round(product.price * (1 - discountRate));
  const bundleTotalPrice = singleBottlePrice * selectedPack;
  const originalBundlePrice = product.price * selectedPack;
  const savings = originalBundlePrice - bundleTotalPrice;

  const handleAddToCart = () => {
    addItem(product, selectedPack, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-white min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-[#1B4D3E]">Home</Link>
          <span>/</span>
          <Link href="/#products" className="hover:text-[#1B4D3E]">{product.healthGoal}</Link>
          <span>/</span>
          <span className="text-slate-900 font-bold truncate">{product.title}</span>
        </nav>

        {/* Main PDP Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Multi-view Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square w-full bg-[#F4F9F4] rounded-3xl p-8 border border-emerald-100 flex items-center justify-center overflow-hidden shadow-inner group">
              <div className="relative w-full h-full">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-110"
                  priority
                />
              </div>
              
              {/* Floating Cert Badge */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full border border-emerald-100 shadow-xs flex items-center gap-1 text-[11px] font-bold text-[#1B4D3E]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#5BB318]" />
                <span>{product.drapRegNo}</span>
              </div>

              {product.discount && (
                <div className="absolute top-4 right-4 bg-[#5BB318] text-white px-3 py-1 rounded-full shadow-xs text-xs font-black uppercase">
                  {product.discount}
                </div>
              )}
            </div>

            {/* Trust Features Strip */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#F4F9F4] p-3 rounded-xl text-center border border-emerald-100">
                <Award className="w-5 h-5 text-[#5BB318] mx-auto mb-1" />
                <div className="text-[11px] font-bold text-slate-800">100% Botanical</div>
                <div className="text-[10px] text-slate-500">Zero Fillers</div>
              </div>
              <div className="bg-[#F4F9F4] p-3 rounded-xl text-center border border-emerald-100">
                <Truck className="w-5 h-5 text-[#5BB318] mx-auto mb-1" />
                <div className="text-[11px] font-bold text-slate-800">Express COD</div>
                <div className="text-[10px] text-slate-500">All Pakistan</div>
              </div>
              <div className="bg-[#F4F9F4] p-3 rounded-xl text-center border border-emerald-100">
                <RotateCcw className="w-5 h-5 text-[#5BB318] mx-auto mb-1" />
                <div className="text-[11px] font-bold text-slate-800">7-Day Guarantee</div>
                <div className="text-[10px] text-slate-500">Purity Assured</div>
              </div>
            </div>

            {/* SEO Ranking Keywords Tags */}
            {product.keywords && product.keywords.length > 0 && (
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <Tag className="w-3 h-3 text-[#1B4D3E]" />
                  <span>Target Health Topics &amp; Formulas</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {product.keywords.map((kw, i) => (
                    <span key={i} className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded-md text-slate-600 font-medium">
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Buying Details & Bundle Selector */}
          <div className="lg:col-span-6 space-y-6">
            
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-[#1B4D3E] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                    {product.healthGoal}
                  </span>
                  <span className="text-xs text-slate-500">•</span>
                  <span className="text-xs text-slate-600 font-medium">{product.form}</span>
                </div>
                
                {/* Share Button Top */}
                <button
                  onClick={() => setShareOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#1B4D3E] bg-slate-50 hover:bg-emerald-50/70 border border-slate-200 hover:border-emerald-200 px-3 py-1 rounded-full transition-all duration-200 shadow-2xs"
                  aria-label="Share product"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#1B4D3E]" />
                  <span>Share</span>
                </button>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                {product.title}
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                {product.subtitle}
              </p>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-800">{product.rating}</span>
                <span className="text-xs text-slate-400">({product.reviewsCount} verified Pakistani reviews)</span>
              </div>
            </div>

            {/* Bundle Discount Selector */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-800 uppercase tracking-wider">
                  Select Bundle &amp; Save:
                </span>
                <span className="text-[#5BB318]">
                  {selectedPack === 3 ? '🎉 15% OFF + FREE Shipping' : selectedPack === 2 ? '10% OFF' : 'Standard Pack'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                
                {/* 1 Pack */}
                <button
                  type="button"
                  onClick={() => setSelectedPack(1)}
                  className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                    selectedPack === 1
                      ? 'border-[#1B4D3E] bg-emerald-50/40 ring-2 ring-[#1B4D3E]/20 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="text-xs font-extrabold text-slate-900">1 Pack</div>
                  <div className="text-xs text-slate-500 mt-0.5">30-Day Supply</div>
                  <div className="text-xs font-black text-[#1B4D3E] mt-2">
                    Rs. {product.price.toLocaleString()}
                  </div>
                </button>

                {/* 2 Packs */}
                <button
                  type="button"
                  onClick={() => setSelectedPack(2)}
                  className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                    selectedPack === 2
                      ? 'border-[#1B4D3E] bg-emerald-50/40 ring-2 ring-[#1B4D3E]/20 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <span className="absolute -top-2.5 right-2 bg-[#5BB318] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full uppercase">
                    Save 10%
                  </span>
                  <div className="text-xs font-extrabold text-slate-900">2 Packs</div>
                  <div className="text-xs text-slate-500 mt-0.5">60-Day Supply</div>
                  <div className="text-xs font-black text-[#1B4D3E] mt-2">
                    Rs. {Math.round(product.price * 2 * 0.9).toLocaleString()}
                  </div>
                </button>

                {/* 3 Packs */}
                <button
                  type="button"
                  onClick={() => setSelectedPack(3)}
                  className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                    selectedPack === 3
                      ? 'border-[#1B4D3E] bg-emerald-50/40 ring-2 ring-[#1B4D3E]/20 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <span className="absolute -top-2.5 right-2 bg-[#10375C] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full uppercase">
                    Best Value
                  </span>
                  <div className="text-xs font-extrabold text-slate-900">3 Packs</div>
                  <div className="text-xs text-slate-500 mt-0.5">90-Day Supply</div>
                  <div className="text-xs font-black text-[#1B4D3E] mt-2">
                    Rs. {Math.round(product.price * 3 * 0.85).toLocaleString()}
                  </div>
                </button>

              </div>

              {savings > 0 && (
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-2.5 text-xs text-emerald-800 font-bold flex items-center justify-between">
                  <span>You are saving Rs. {savings.toLocaleString()} with this bundle!</span>
                  {selectedPack >= 2 && (
                    <span className="text-[#5BB318] uppercase text-[10px]">Free Delivery</span>
                  )}
                </div>
              )}
            </div>

            {/* Pricing & Add To Cart Bar */}
            <div className="pt-4 border-t border-slate-100 space-y-4">
              <div className="flex items-baseline gap-3">
                <div className="text-2xl font-black text-[#1B4D3E]">
                  Rs. {bundleTotalPrice.toLocaleString()}
                </div>
                {savings > 0 && (
                  <div className="text-sm text-slate-400 line-through">
                    Rs. {originalBundlePrice.toLocaleString()}
                  </div>
                )}
                <span className="text-xs text-slate-500 font-medium">
                  (Tax included • Cash on Delivery)
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={added}
                  className={`flex-1 py-3.5 px-6 rounded-2xl font-extrabold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg ${
                    added
                      ? 'bg-[#5BB318] text-white shadow-emerald-500/30'
                      : 'bg-[#1B4D3E] hover:bg-[#13382D] text-white shadow-[#1B4D3E]/30 hover:scale-[1.01]'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5 text-emerald-300" />
                      <span>Add {selectedPack > 1 ? `${selectedPack}-Pack Bundle` : 'to Cart'}</span>
                    </>
                  )}
                </button>

                <a
                  href={`https://wa.me/923001234567?text=Hello%20Nutriherbs,%20I%20would%20like%20to%20order%20${encodeURIComponent(product.title)}%20(${selectedPack}%20Pack)%20for%20Rs.%20${bundleTotalPrice}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20ba59] text-white px-5 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all shrink-0"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span className="hidden sm:inline">Order via WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => setShareOpen(true)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 p-3.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-200 transition-all shrink-0"
                  title="Share with image"
                  aria-label="Share product"
                >
                  <Share2 className="w-5 h-5 text-[#1B4D3E]" />
                </button>
              </div>

              {/* Instant Nationwide Delivery info */}
              <div className="bg-[#F4F9F4] p-3 rounded-xl border border-emerald-100 flex items-center gap-3 text-xs text-slate-700">
                <Truck className="w-4 h-4 text-[#5BB318] shrink-0" />
                <div>
                  <strong>Fast Nationwide Dispatch:</strong> Karachi, Lahore, Islamabad in 24-48 hours. Cash on Delivery available at your door.
                </div>
              </div>
            </div>

            {/* Key Benefits Herbal Checkmarks */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                Key Formulation Benefits
              </h4>
              <div className="space-y-2">
                {product.keyBenefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-[#5BB318] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Tabbed Info: Supplement Facts, Science & Bioactive, Weekly Timeline, Product FAQs */}
        <div className="pt-10 border-t border-slate-100">
          <div className="flex border-b border-slate-200 gap-6 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setActiveTab('facts')}
              className={`pb-3 text-sm font-bold whitespace-nowrap transition-all border-b-2 flex items-center gap-1.5 ${
                activeTab === 'facts'
                  ? 'border-[#1B4D3E] text-[#1B4D3E]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Supplement Facts &amp; Actives</span>
            </button>

            <button
              onClick={() => setActiveTab('science')}
              className={`pb-3 text-sm font-bold whitespace-nowrap transition-all border-b-2 flex items-center gap-1.5 ${
                activeTab === 'science'
                  ? 'border-[#1B4D3E] text-[#1B4D3E]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Botanical Science &amp; Long Description</span>
            </button>

            <button
              onClick={() => setActiveTab('timeline')}
              className={`pb-3 text-sm font-bold whitespace-nowrap transition-all border-b-2 flex items-center gap-1.5 ${
                activeTab === 'timeline'
                  ? 'border-[#1B4D3E] text-[#1B4D3E]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Results Timeline (Week 1-8)</span>
            </button>

            <button
              onClick={() => setActiveTab('faqs')}
              className={`pb-3 text-sm font-bold whitespace-nowrap transition-all border-b-2 flex items-center gap-1.5 ${
                activeTab === 'faqs'
                  ? 'border-[#1B4D3E] text-[#1B4D3E]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Scientific FAQs</span>
            </button>
          </div>

          <div className="py-6">
            {/* Supplement Facts */}
            {activeTab === 'facts' && (
              <div className="bg-[#F4F9F4] p-6 rounded-2xl border border-emerald-100 max-w-3xl space-y-4">
                <div className="border-b-4 border-slate-900 pb-2">
                  <h3 className="text-xl font-black text-slate-900">Supplement Facts</h3>
                  <div className="text-xs text-slate-600">
                    Serving Size: {product.supplementFacts.servingSize} | Servings Per Bottle: {product.supplementFacts.servingsPerContainer}
                  </div>
                </div>

                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b-2 border-slate-800 text-slate-900">
                      <th className="py-2 font-bold">Active Botanical Ingredient</th>
                      <th className="py-2 font-bold">Amount Per Serving</th>
                      <th className="py-2 font-bold text-right">% Daily Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {product.supplementFacts.facts.map((fact, idx) => (
                      <tr key={idx} className="hover:bg-white/50">
                        <td className="py-2.5 font-semibold text-slate-800">{fact.ingredient}</td>
                        <td className="py-2.5 text-slate-600">{fact.amountPerServing}</td>
                        <td className="py-2.5 text-right font-bold text-[#1B4D3E]">{fact.dailyValue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="text-[10px] text-slate-500 pt-2 border-t border-slate-200">
                  * Percent Daily Values are based on a 2,000 calorie diet. ** Daily Value not established.
                </div>
              </div>
            )}

            {/* Botanical Science & Long Description */}
            {activeTab === 'science' && (
              <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 max-w-4xl space-y-6 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#5BB318]" />
                      <span>Comprehensive Botanical &amp; Clinical Guide</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      DRAP Verified Botanical Analysis &bull; Evidence-Based Natural Health Monograph
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 self-start sm:self-auto">
                    <BookOpen className="w-3.5 h-3.5 text-[#5BB318]" />
                    <span>~1,500+ Words Clinical Monograph</span>
                  </div>
                </div>

                {/* Main Rendered Long-Form Description */}
                <div className="py-2">
                  <RichArticleRenderer 
                    content={product.longDescription || product.description} 
                  />
                </div>

                {product.scientificMechanism && (
                  <div className="bg-[#10375C] text-white p-5 rounded-2xl space-y-1 shadow-md">
                    <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Activity className="w-4 h-4" />
                      <span>Cellular Mechanism of Action</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {product.scientificMechanism}
                    </p>
                  </div>
                )}

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                    <ShieldCheck className="w-4 h-4 text-[#5BB318]" />
                    <span>Official DRAP Enlistment: <strong className="text-[#1B4D3E]">{product.drapRegNo}</strong></span>
                  </div>
                  <span className="text-[11px] bg-slate-100 px-3 py-1 rounded-full text-slate-600 font-bold">
                    100% Third-Party Lab Certified
                  </span>
                </div>
              </div>
            )}

            {/* Weekly Transformation Timeline */}
            {activeTab === 'timeline' && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 max-w-3xl space-y-6">
                <div>
                  <h3 className="text-lg font-black text-slate-900 mb-1">
                    Expected Clinical Progression &amp; Timeline
                  </h3>
                  <p className="text-xs text-slate-500">
                    Observed milestones from customer compliance trials over an 8-week period.
                  </p>
                </div>

                <div className="space-y-4">
                  {(product.weeklyTimeline || [
                    { week: 'Week 1-2', title: 'Systemic Cellular Absorption', description: 'Bioactive nutrients enter circulation and nourish cells.' },
                    { week: 'Week 3-4', title: 'Targeted Physiological Relief', description: 'Noticeable reduction in primary health concerns and improved energy.' },
                    { week: 'Week 6-8', title: 'Sustained Long-Term Transformation', description: 'Deep tissue fortification and optimal wellness maintenance.' }
                  ]).map((mile, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-2xl bg-[#F4F9F4] border border-emerald-100">
                      <div className="w-20 shrink-0 text-xs font-black text-[#1B4D3E] bg-white px-2 py-1 rounded-lg text-center h-fit border border-emerald-200">
                        {mile.week}
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-slate-900">{mile.title}</div>
                        <div className="text-xs text-slate-600 leading-relaxed">{mile.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Scientific FAQs */}
            {activeTab === 'faqs' && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 max-w-3xl space-y-4">
                <h3 className="text-lg font-black text-slate-900 mb-2">
                  Frequently Asked Questions for {product.title}
                </h3>

                <div className="space-y-3">
                  {(product.faqs || [
                    { q: `How should I take ${product.title}?`, a: product.usageInstructions },
                    { q: 'Is this product safe for daily use?', a: 'Yes, this product is formulated with standardized botanical extracts and is safe for daily consumption according to directions.' }
                  ]).map((faq, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-[#F4F9F4] border border-slate-100 space-y-1.5">
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-[#1B4D3E] shrink-0" />
                        <span>{faq.q}</span>
                      </div>
                      <div className="text-xs text-slate-600 pl-6 leading-relaxed">
                        {faq.a}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Cross-Sell: Frequently Bought Together */}
        <div className="pt-10 border-t border-slate-100">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold text-[#5BB318] uppercase tracking-wider">
              Complementary Formulas
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              Frequently Bought Together
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {crossSell.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>

        {/* Share Modal */}
        <ShareProductModal
          product={product}
          isOpen={shareOpen}
          onClose={() => setShareOpen(false)}
        />

      </div>
    </div>
  );
}
