import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  Truck, 
  CreditCard, 
  Heart, 
  Leaf,
  Clock
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#10375C] text-slate-200 text-xs">
      {/* Top Value Banner */}
      <div className="border-b border-white/10 py-8 bg-[#0D2D4B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-[#5BB318] flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-xs">Free Nationwide Delivery</div>
              <div className="text-[11px] text-slate-400">On orders above Rs. 2,000</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-[#5BB318] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-xs">100% DRAP Enlisted</div>
              <div className="text-[11px] text-slate-400">cGMP Certified Formulations</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-[#5BB318] flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-xs">Cash on Delivery (COD)</div>
              <div className="text-[11px] text-slate-400">Pay cash upon parcel arrival</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-[#5BB318] flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-xs">Express Courier Dispatch</div>
              <div className="text-[11px] text-slate-400">Via Trax, PostEx &amp; Leopards</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative w-48 h-12 bg-white/95 rounded-xl p-2 shadow-xs">
              <Image
                src="/images/logo.png"
                alt="Nutriherbs Logo"
                fill
                className="object-contain p-1"
              />
            </div>
            <p className="text-slate-300 leading-relaxed max-w-sm">
              Nutriherbs (&ldquo;All Pure - All Natural&rdquo;) is Pakistan&apos;s premier herbal nutraceutical brand. We formulate science-backed botanical dietary supplements to elevate everyday vitality, bone strength, and natural radiance.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                DRAP Enlisted Facility
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-900/60 text-blue-300 border border-blue-500/30 text-[10px] font-bold">
                ISO 9001 &amp; GMP
              </span>
            </div>
          </div>

          {/* Health Goals */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide uppercase">
              Health Goals
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li><Link href="/#products" className="hover:text-emerald-300 transition-colors">Hair &amp; Skin Radiance</Link></li>
              <li><Link href="/#products" className="hover:text-emerald-300 transition-colors">Bone &amp; Joint Support</Link></li>
              <li><Link href="/#products" className="hover:text-emerald-300 transition-colors">Men&apos;s Stamina &amp; Vitality</Link></li>
              <li><Link href="/#products" className="hover:text-emerald-300 transition-colors">Weight Management &amp; Detox</Link></li>
              <li><Link href="/#products" className="hover:text-emerald-300 transition-colors">General Health &amp; Multi</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide uppercase">
              Customer Care
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li><Link href="/track-order" className="hover:text-emerald-300 transition-colors">Track Your Order</Link></li>
              <li><Link href="/#products" className="hover:text-emerald-300 transition-colors">Shop All Products</Link></li>
              <li><Link href="/checkout" className="hover:text-emerald-300 transition-colors">Express Checkout</Link></li>
              <li><Link href="/admin" className="hover:text-emerald-300 transition-colors">Staff / Admin Login</Link></li>
              <li><a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-300 transition-colors">Pharmacist WhatsApp</a></li>
            </ul>
          </div>

          {/* Direct Helpline */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide uppercase">
              Pakistani Hotline
            </h4>
            <div className="space-y-2 text-slate-300">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#5BB318]" />
                <a href="tel:03001234567" className="hover:text-white font-bold text-sm">0300-1234567</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#5BB318]" />
                <span>support@nutriherbs.pk</span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#5BB318] shrink-0 mt-0.5" />
                <span>Industrial Botanical Zone, Lahore / Karachi, Pakistan</span>
              </p>
            </div>

            {/* Courier Badges */}
            <div className="pt-3 border-t border-white/10">
              <div className="text-[11px] font-bold text-slate-400 mb-1.5 uppercase">Courier Partners</div>
              <div className="flex items-center gap-2">
                <span className="bg-white/10 px-2 py-1 rounded text-[10px] font-bold text-white">Trax Logistics</span>
                <span className="bg-white/10 px-2 py-1 rounded text-[10px] font-bold text-white">PostEx</span>
                <span className="bg-white/10 px-2 py-1 rounded text-[10px] font-bold text-white">Leopards</span>
              </div>
            </div>
          </div>

        </div>

        {/* Regulatory Disclaimer */}
        <div className="mt-12 pt-8 border-t border-white/10 text-[11px] text-slate-400 space-y-2 leading-relaxed">
          <p>
            <strong>DRAP Statutory Compliance:</strong> Nutriherbs products are manufactured in facilities enlisted with the Drug Regulatory Authority of Pakistan (DRAP) in compliance with the Alternative Medicines &amp; Health Products Enlistment Rules 2014. Dietary supplements are intended to support overall physiological health and are not intended to diagnose, treat, cure, or prevent any medical condition. Please consult a licensed medical physician prior to use if you are pregnant, nursing, or taking prescription pharmaceuticals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-4 text-slate-500 text-[10px]">
            <div>
              &copy; {new Date().getFullYear()} Nutriherbs Pakistan. &ldquo;All Pure - All Natural&rdquo;. All rights reserved.
            </div>
            <div className="flex gap-4">
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
              <span>•</span>
              <span>Refund &amp; COD Policy</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
