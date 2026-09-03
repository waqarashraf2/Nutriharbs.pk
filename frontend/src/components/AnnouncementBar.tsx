'use client';

import React from 'react';
import Link from 'next/link';
import { Truck, ShieldCheck, MapPin, PhoneCall } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <aside aria-label="Store Announcement" className="bg-[#10375C] text-white text-xs font-medium py-2 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-center md:text-left justify-center flex-wrap">
          <span className="inline-flex items-center gap-1 bg-[#1B4965] px-2 py-0.5 rounded-full text-[11px] font-semibold text-emerald-300">
            <Truck className="w-3.5 h-3.5" /> FREE DELIVERY
          </span>
          <span>
            Nationwide on Orders Above <strong className="text-emerald-300 font-bold">Rs. 2,000</strong>
          </span>
          <span className="hidden lg:inline text-slate-400">•</span>
          <span className="hidden lg:inline-flex items-center gap-1 text-slate-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Pure Herbal &amp; DRAP / GMP Certified
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-slate-300">
          <Link 
            href="/track-order" 
            className="hover:text-emerald-300 transition-colors flex items-center gap-1"
          >
            <MapPin className="w-3 h-3" /> Track Order
          </Link>
          <span>|</span>
          <a 
            href="https://wa.me/923001234567?text=Hello%20Nutriherbs%20team,%20I%20have%20an%20inquiry%20about%20your%20herbal%20supplements." 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-emerald-300 transition-colors flex items-center gap-1"
          >
            <PhoneCall className="w-3 h-3" /> WhatsApp: 0300-1234567
          </a>
        </div>
      </div>
    </aside>
  );
}
