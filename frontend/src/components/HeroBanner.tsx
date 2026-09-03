'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Sparkles, 
  Leaf, 
  Award, 
  Truck, 
  Star, 
  ArrowRight,
  HeartHandshake
} from 'lucide-react';
import gsap from 'gsap';

export default function HeroBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(badgeRef.current, 
        { y: -20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6 }
      )
      .fromTo(headlineRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.3'
      )
      .fromTo(descRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.4'
      )
      .fromTo(buttonsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.3'
      )
      .fromTo(statsRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.6 },
        '-=0.3'
      )
      .fromTo(visualRef.current,
        { opacity: 0, x: 40, scale: 0.96 },
        { opacity: 1, x: 0, scale: 1, duration: 1 },
        '-=0.8'
      );

      // Gentle floating animation on hero product cards
      gsap.to('.hero-floating-card-1', {
        y: '-=12',
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      gsap.to('.hero-floating-card-2', {
        y: '+=10',
        duration: 3.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.5
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative bg-gradient-to-b from-[#F4F9F4] via-white to-[#F4F9F4]/40 overflow-hidden pt-8 pb-16 lg:py-20 border-b border-slate-100"
    >
      {/* Subtle organic background foliage glow */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Messaging & Authority */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* DRAP Certification pill */}
            <div 
              ref={badgeRef}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-emerald-200/80 shadow-xs"
            >
              <div className="w-2 h-2 rounded-full bg-[#5BB318] animate-ping" />
              <Leaf className="w-3.5 h-3.5 text-[#1B4D3E]" />
              <span className="text-xs font-bold text-[#1B4D3E] tracking-tight">
                DRAP &amp; GMP Certified • 100% Pure Botanical Extracts
              </span>
            </div>

            {/* Headline */}
            <h1 
              ref={headlineRef}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#1E293B] tracking-tight leading-[1.12]"
            >
              Pure Botanical Science for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B4D3E] via-[#2D7A61] to-[#5BB318]">
                Radiant Wellness
              </span>
            </h1>

            {/* Subtitle */}
            <p 
              ref={descRef}
              className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Clinically dosed herbal nutraceuticals crafted specifically for Pakistani lifestyles. From Icelandic red algae calcium to bio-fermented collagen and pure biotin — naturally free from fillers.
            </p>

            {/* CTAs */}
            <div 
              ref={buttonsRef}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <Link
                href="/#products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1B4D3E] hover:bg-[#13382D] text-white px-7 py-3.5 rounded-full font-bold text-sm shadow-lg shadow-[#1B4D3E]/20 hover:shadow-xl hover:shadow-[#1B4D3E]/30 transition-all group"
              >
                <span>Explore Natural Solutions</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="https://wa.me/923001234567?text=Hello%20Nutriherbs,%20I%20would%20like%20a%20free%20consultation%20on%20which%20herbal%20supplement%20is%20right%20for%20me."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-[#10375C] border border-slate-200 px-6 py-3.5 rounded-full font-bold text-sm shadow-xs hover:shadow transition-all"
              >
                <HeartHandshake className="w-4 h-4 text-[#5BB318]" />
                <span>Free Pharmacist Consultation</span>
              </a>
            </div>

            {/* Micro Trust Stats */}
            <div 
              ref={statsRef}
              className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0"
            >
              <div>
                <div className="flex items-center justify-center lg:justify-start gap-1 text-[#1B4D3E] font-black text-xl">
                  <span>4.9</span>
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
                <div className="text-[11px] text-slate-500 font-medium">10,000+ Reviews</div>
              </div>

              <div>
                <div className="text-[#1B4D3E] font-black text-xl text-center lg:text-left">
                  100%
                </div>
                <div className="text-[11px] text-slate-500 font-medium">DRAP &amp; GMP Verified</div>
              </div>

              <div>
                <div className="text-[#1B4D3E] font-black text-xl text-center lg:text-left">
                  Cash on Delivery
                </div>
                <div className="text-[11px] text-slate-500 font-medium">All Major Cities</div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Product Display */}
          <div ref={visualRef} className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Circular decorative backdrop */}
            <div className="relative w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-gradient-to-tr from-emerald-100 to-teal-50 border border-emerald-200/50 flex items-center justify-center shadow-inner">
              
              {/* Primary Featured Product: KalFit */}
              <div className="relative w-64 sm:w-72 h-80 sm:h-92 z-20 drop-shadow-2xl transition-transform duration-500 hover:scale-105">
                <Image
                  src="/images/products/kalfit-bone-joint.webp"
                  alt="KalFit Bone & Joint Support"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Floating Pill Card 1: Vivomit Collagen */}
              <div className="hero-floating-card-1 absolute -left-6 top-8 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 z-30 max-w-[210px]">
                <div className="relative w-11 h-11 rounded-xl bg-[#F4F9F4] p-1 overflow-hidden shrink-0 border border-emerald-100">
                  <Image
                    src="/images/products/vivomit-collagen.webp"
                    alt="Vivomit Collagen"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-900 leading-tight">
                    Vivomit Glow
                  </div>
                  <div className="text-[10px] text-emerald-700 font-semibold">
                    Collagen Peptides
                  </div>
                  <div className="text-[10px] text-slate-500 font-bold">
                    Rs. 2,650
                  </div>
                </div>
              </div>

              {/* Floating Pill Card 2: Biotin */}
              <div className="hero-floating-card-2 absolute -right-6 bottom-8 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 z-30 max-w-[210px]">
                <div className="relative w-11 h-11 rounded-xl bg-[#F4F9F4] p-1 overflow-hidden shrink-0 border border-emerald-100">
                  <Image
                    src="/images/products/niston-biotin.webp"
                    alt="Niston Biotin"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-900 leading-tight">
                    Niston Biotin
                  </div>
                  <div className="text-[10px] text-emerald-700 font-semibold">
                    2500 MCG Keratin
                  </div>
                  <div className="text-[10px] text-slate-500 font-bold">
                    Rs. 1,450
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
