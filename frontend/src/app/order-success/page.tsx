'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  CheckCircle2, 
  Printer, 
  Truck, 
  ShieldCheck, 
  ArrowRight
} from 'lucide-react';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '';
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    // Look up order in localStorage
    const savedOrders = JSON.parse(localStorage.getItem('nutriherbs_orders') || '[]');
    const matched = id ? savedOrders.find((o: any) => o.orderNumber === id) : savedOrders[0];
    if (matched) {
      setOrder(matched);
    } else if (savedOrders.length > 0) {
      setOrder(savedOrders[0]);
    } else {
      // Fallback preview
      setOrder({
        orderNumber: id || 'NH-PREVIEW',
        customerName: 'Valued Customer',
        phone: '0300-1234567',
        city: 'Lahore',
        address: 'Delivery Address, Pakistan',
        paymentMethod: 'cod',
        subtotal: 3900,
        shippingFee: 0,
        total: 3900,
        trackingNumber: 'TRX8932145PK',
        status: 'pending_verification',
        createdAt: new Date().toISOString(),
        items: [
          {
            productTitle: 'KalFit Bone & Joint Support',
            quantity: 2,
            price: 1950,
            total: 3900,
            packCount: 2,
            image: '/images/products/kalfit-bone-joint.webp'
          }
        ]
      });
    }
  }, [id]);

  const handlePrintInvoice = () => {
    window.print();
  };

  if (!order) return null;

  return (
    <div className="bg-[#F4F9F4]/40 min-h-screen py-10 print:bg-white print:py-0">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Success Banner (Hidden on Print) */}
        <div className="bg-white rounded-3xl p-8 border border-emerald-100 shadow-sm text-center space-y-3 print:hidden">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#5BB318] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <span className="text-xs font-bold text-[#5BB318] uppercase tracking-wider">
            Order Successfully Placed
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Thank you for choosing Nutriherbs!
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            Your order <strong>#{order.orderNumber}</strong> has been received. Our order verification team will confirm your order details via SMS/WhatsApp shortly.
          </p>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handlePrintInvoice}
              className="bg-[#1B4D3E] hover:bg-[#13382D] text-white px-5 py-2.5 rounded-full font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>Print Tax Invoice</span>
            </button>
            <Link
              href={`/track-order?q=${order.orderNumber}`}
              className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-5 py-2.5 rounded-full font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Truck className="w-4 h-4 text-[#5BB318]" />
              <span>Track Courier Parcel</span>
            </Link>
          </div>
        </div>

        {/* Order Status Pipeline */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs print:hidden space-y-4">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Live Order Pipeline
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
              <div className="text-[10px] font-bold text-[#5BB318] uppercase mb-1">Step 1 (Active)</div>
              <div className="text-xs font-black text-[#1B4D3E]">Pending Verification</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Automated SMS/Call</div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 opacity-60">
              <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Step 2</div>
              <div className="text-xs font-bold text-slate-700">Order Confirmed</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Inventory Assigned</div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 opacity-60">
              <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Step 3</div>
              <div className="text-xs font-bold text-slate-700">Dispatched via Trax</div>
              <div className="text-[10px] text-slate-400 mt-0.5">CN: {order.trackingNumber}</div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 opacity-60">
              <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Step 4</div>
              <div className="text-xs font-bold text-slate-700">Out for Delivery</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Doorstep COD Collection</div>
            </div>
          </div>
        </div>

        {/* Formal Printable Invoice */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg space-y-6 print:border-none print:shadow-none print:p-0">
          
          {/* Invoice Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-6">
            <div className="space-y-1">
              <div className="relative w-44 h-12">
                <Image
                  src="/images/logo.png"
                  alt="Nutriherbs"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-[11px] text-slate-500">
                DRAP Enlistment: Enl-00892/2023 • NTN: 8294719-4
              </div>
            </div>

            <div className="text-left sm:text-right space-y-1 text-xs">
              <div className="text-base font-black text-[#1B4D3E]">
                INVOICE #{order.orderNumber}
              </div>
              <div className="text-slate-500">Date: {new Date(order.createdAt).toLocaleDateString('en-GB')}</div>
              <div className="font-bold text-slate-800">
                Tracking CN: <span className="text-[#10375C]">{order.trackingNumber}</span>
              </div>
            </div>
          </div>

          {/* Customer & Shipping Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs border-b border-slate-100 pb-6">
            <div>
              <h3 className="font-bold text-slate-400 uppercase text-[10px] tracking-wider mb-2">
                Billed / Shipped To:
              </h3>
              <div className="font-bold text-slate-900 text-sm">{order.customerName}</div>
              <div className="text-slate-600 mt-1">{order.address}</div>
              <div className="text-slate-600 font-semibold">{order.city}, Pakistan</div>
              <div className="text-slate-700 mt-1">Phone: <strong>{order.phone}</strong></div>
            </div>

            <div className="sm:text-right">
              <h3 className="font-bold text-slate-400 uppercase text-[10px] tracking-wider mb-2">
                Shipping &amp; Payment Details:
              </h3>
              <div>Payment Mode: <strong className="uppercase">{order.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Bank Transfer'}</strong></div>
              <div>Courier: <strong>Trax Logistics Express</strong></div>
              <div className="text-emerald-700 font-bold mt-1">Status: Pending Verification</div>
            </div>
          </div>

          {/* Items Table */}
          <div>
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b-2 border-slate-800 text-slate-900">
                  <th className="py-2.5 font-bold">Item Description</th>
                  <th className="py-2.5 font-bold text-center">Pack</th>
                  <th className="py-2.5 font-bold text-center">Qty</th>
                  <th className="py-2.5 font-bold text-right">Unit Price</th>
                  <th className="py-2.5 font-bold text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {order.items.map((item: any, idx: number) => (
                  <tr key={idx}>
                    <td className="py-3 font-semibold text-slate-800">
                      {item.productTitle}
                    </td>
                    <td className="py-3 text-center text-slate-600 font-medium">
                      {item.packCount} Pack
                    </td>
                    <td className="py-3 text-center text-slate-600 font-medium">
                      {item.quantity}
                    </td>
                    <td className="py-3 text-right text-slate-600">
                      Rs. {item.price.toLocaleString()}
                    </td>
                    <td className="py-3 text-right font-bold text-[#1B4D3E]">
                      Rs. {item.total.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total Breakdown */}
          <div className="flex justify-end pt-4 border-t border-slate-100">
            <div className="w-64 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900">Rs. {order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Courier Delivery</span>
                <span className="font-bold text-slate-900">
                  {order.shippingFee === 0 ? 'FREE' : `Rs. ${order.shippingFee}`}
                </span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Discount</span>
                  <span>- Rs. {order.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-black text-[#1B4D3E] pt-2 border-t border-slate-200">
                <span>Total Payable (COD)</span>
                <span>Rs. {order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Invoice Footer Seal */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-500">
            <div className="flex items-center gap-1.5 text-slate-700">
              <ShieldCheck className="w-4 h-4 text-[#5BB318]" />
              <span>Genuine DRAP Enlisted Nutraceutical • Customer Hotline: 0300-1234567</span>
            </div>
            <div>
              Thank you for trusting Nutriherbs &mdash; All Pure, All Natural.
            </div>
          </div>

        </div>

        {/* Back to Catalog button */}
        <div className="text-center print:hidden">
          <Link
            href="/#products"
            className="inline-flex items-center gap-2 bg-[#1B4D3E] hover:bg-[#13382D] text-white px-7 py-3 rounded-full font-bold text-xs transition-colors"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-sm font-semibold text-[#1B4D3E]">Loading order details...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
