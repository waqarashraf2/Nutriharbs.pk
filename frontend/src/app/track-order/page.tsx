'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Search, 
  Truck, 
  Package, 
  CheckCircle2, 
  MapPin, 
  PhoneCall, 
  Clock, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('q') || '';

  const [query, setQuery] = useState(queryParam);
  const [searched, setSearched] = useState(false);
  const [matchedOrder, setMatchedOrder] = useState<any>(null);

  useEffect(() => {
    if (queryParam) {
      handleSearch(queryParam);
    }
  }, [queryParam]);

  const handleSearch = (searchVal: string) => {
    const term = searchVal.trim().toLowerCase();
    if (!term) return;

    setSearched(true);
    const savedOrders = JSON.parse(localStorage.getItem('nutriherbs_orders') || '[]');
    
    // Match by orderNumber or phone
    const found = savedOrders.find(
      (o: any) =>
        o.orderNumber.toLowerCase().includes(term) ||
        o.phone.replace(/[^0-9]/g, '').includes(term.replace(/[^0-9]/g, '')) ||
        (o.trackingNumber && o.trackingNumber.toLowerCase().includes(term))
    );

    if (found) {
      setMatchedOrder(found);
    } else {
      // Default demo mock if search has "NH" or sample
      if (term.includes('nh') || term.includes('03')) {
        setMatchedOrder({
          orderNumber: term.toUpperCase(),
          customerName: 'Valued Customer',
          phone: '0300-1234567',
          city: 'Lahore',
          address: 'DHA Phase 6, Lahore',
          trackingNumber: 'TRX74829104PK',
          courier: 'trax',
          status: 'dispatched',
          createdAt: new Date().toISOString(),
          total: 3900,
          items: [
            {
              productTitle: 'KalFit Bone & Joint Support',
              quantity: 2,
              packCount: 2,
              price: 1950,
              total: 3900,
              image: '/images/products/kalfit-bone-joint.webp'
            }
          ]
        });
      } else {
        setMatchedOrder(null);
      }
    }
  };

  return (
    <div className="bg-[#F4F9F4]/40 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#1B4D3E] text-xs font-bold">
            <Truck className="w-3.5 h-3.5 text-[#5BB318]" />
            NATIONWIDE COURIER TRACKING
          </div>
          <h1 className="text-3xl font-black text-slate-900">
            Track Your Nutriherbs Order
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Enter your Order ID (e.g. NH-123456) or the Mobile Number used during checkout to check real-time courier status.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-md max-w-2xl mx-auto">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(query);
            }} 
            className="flex flex-col sm:flex-row gap-2"
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                placeholder="Enter Order ID (e.g. NH-847291) or Phone (0300...)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-[#F4F9F4] border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-[#1B4D3E] text-slate-800 font-medium"
              />
            </div>
            <button
              type="submit"
              className="bg-[#1B4D3E] hover:bg-[#13382D] text-white px-7 py-3 rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 shrink-0"
            >
              Track Parcel
            </button>
          </form>
        </div>

        {/* Search Results */}
        {searched && matchedOrder && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xl space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            
            {/* Header Status */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-6 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-[#5BB318] bg-emerald-50 px-2.5 py-1 rounded-full uppercase">
                  Active Consignment
                </span>
                <h2 className="text-xl font-black text-slate-900 mt-1">
                  Order #{matchedOrder.orderNumber}
                </h2>
                <div className="text-xs text-slate-500 mt-0.5">
                  Placed on {new Date(matchedOrder.createdAt).toLocaleDateString('en-GB')} • Cash on Delivery: Rs. {matchedOrder.total.toLocaleString()}
                </div>
              </div>

              <div className="sm:text-right">
                <div className="text-xs font-bold text-slate-500">Trax Tracking CN:</div>
                <div className="text-sm font-black text-[#10375C] font-mono">{matchedOrder.trackingNumber}</div>
                <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                  Courier: Trax Express Logistics
                </div>
              </div>
            </div>

            {/* Visual Milestones Journey */}
            <div className="space-y-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Parcel Journey
              </h3>

              <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-200">
                
                {/* Step 1 */}
                <div className="relative flex items-start gap-4">
                  <div className="absolute -left-6 sm:-left-8 mt-0.5 w-5 h-5 rounded-full bg-[#1B4D3E] text-white flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Order Verified &amp; Confirmed</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Order details confirmed with customer. Botanical formula reserved in warehouse.
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative flex items-start gap-4">
                  <div className="absolute -left-6 sm:-left-8 mt-0.5 w-5 h-5 rounded-full bg-[#1B4D3E] text-white flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Tamper-Proof Quality Packaging</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Sealed with official Nutriherbs holographic security seal and packaged for courier transit.
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative flex items-start gap-4">
                  <div className="absolute -left-6 sm:-left-8 mt-0.5 w-5 h-5 rounded-full bg-[#5BB318] text-white flex items-center justify-center ring-4 ring-emerald-100">
                    <Truck className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1B4D3E]">Dispatched via Trax Courier</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Consignment picked up by courier rider. In transit to destination hub ({matchedOrder.city}).
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="relative flex items-start gap-4 opacity-50">
                  <div className="absolute -left-6 sm:-left-8 mt-0.5 w-5 h-5 rounded-full bg-slate-300 text-white flex items-center justify-center">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-700">Out for Delivery</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Courier delivery associate will contact you on {matchedOrder.phone} before arrival.
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Destination summary */}
            <div className="p-4 bg-[#F4F9F4] rounded-2xl border border-emerald-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
              <div>
                <div className="font-bold text-slate-900">Destination: {matchedOrder.address}, {matchedOrder.city}</div>
                <div className="text-slate-500">Recipient: {matchedOrder.customerName} ({matchedOrder.phone})</div>
              </div>
              <a
                href={`https://wa.me/923001234567?text=Hello%20Nutriherbs,%20I%20have%20an%20inquiry%20regarding%20my%20order%20${matchedOrder.orderNumber}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl font-bold flex items-center gap-1.5 hover:bg-slate-50 shadow-xs"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#5BB318]" />
                <span>Contact Helpline</span>
              </a>
            </div>

          </div>
        )}

        {searched && !matchedOrder && (
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm text-center space-y-3 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Order Not Found</h3>
            <p className="text-xs text-slate-500">
              We couldn&apos;t find an active order matching &ldquo;{query}&rdquo;. Please verify your Order ID or contact customer support via WhatsApp.
            </p>
            <a
              href={`https://wa.me/923001234567?text=Hello%20Nutriherbs,%20I%20am%20trying%20to%20track%20my%20order%20with%20query:%20${query}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#1B4D3E] text-white px-5 py-2.5 rounded-full font-bold text-xs hover:bg-[#13382D]"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Ask Support on WhatsApp</span>
            </a>
          </div>
        )}

      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-slate-400">Loading Order Tracking...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
