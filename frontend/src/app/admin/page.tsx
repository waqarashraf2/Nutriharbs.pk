'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  Eye, 
  Printer, 
  RefreshCw,
  Search,
  Filter,
  Layers,
  ShieldCheck,
  Send,
  Globe,
  Tag,
  Save,
  Sliders,
  FileText,
  ExternalLink,
  Sparkles,
  Edit3,
  BookOpen
} from 'lucide-react';
import { PRODUCTS } from '@/lib/products-data';
import { Product } from '@/lib/types';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'seo'>('orders');
  const [orders, setOrders] = useState<any[]>([]);
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Courier Modal State
  const [selectedOrderForCourier, setSelectedOrderForCourier] = useState<any | null>(null);
  const [courierProvider, setCourierProvider] = useState<'trax' | 'postex' | 'leopards'>('trax');
  const [generatedPayload, setGeneratedPayload] = useState<string>('');

  // SEO Editing State
  const [selectedSeoProduct, setSelectedSeoProduct] = useState<Product>(PRODUCTS[0]);
  const [seoFormData, setSeoFormData] = useState({
    metaTitle: PRODUCTS[0].metaTitle || '',
    metaDescription: PRODUCTS[0].metaDescription || '',
    keywords: (PRODUCTS[0].keywords || []).join(', '),
    longDescription: PRODUCTS[0].longDescription || '',
    scientificMechanism: PRODUCTS[0].scientificMechanism || '',
  });
  const [seoSavedNotice, setSeoSavedNotice] = useState(false);

  useEffect(() => {
    loadOrders();
    loadCustomSeo();
  }, []);

  const loadOrders = () => {
    const saved = JSON.parse(localStorage.getItem('nutriherbs_orders') || '[]');
    if (saved.length === 0) {
      const sampleOrders = [
        {
          orderNumber: 'NH-849201',
          customerName: 'Ayesha Siddiqui',
          phone: '0301-9876543',
          email: 'ayesha.s@example.com',
          city: 'Lahore',
          province: 'Punjab',
          address: 'House 42, Street 8, Phase 5 DHA',
          paymentMethod: 'cod',
          subtotal: 5300,
          shippingFee: 0,
          discount: 0,
          total: 5300,
          status: 'pending_verification',
          courier: 'trax',
          trackingNumber: 'TRX74829104PK',
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          items: [
            { productTitle: 'Vivomit Glow Collagen Complex', quantity: 2, price: 2650, total: 5300, packCount: 2 }
          ]
        },
        {
          orderNumber: 'NH-729184',
          customerName: 'Farhan Zaidi',
          phone: '0333-5432109',
          email: 'farhan.z@example.com',
          city: 'Karachi',
          province: 'Sindh',
          address: 'Apartment 4B, Clifton Block 2',
          paymentMethod: 'cod',
          subtotal: 1950,
          shippingFee: 0,
          discount: 0,
          total: 1950,
          status: 'dispatched',
          courier: 'postex',
          trackingNumber: 'PEX9923841PK',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          items: [
            { productTitle: 'KalFit Bone & Joint Support', quantity: 1, price: 1950, total: 1950, packCount: 1 }
          ]
        },
        {
          orderNumber: 'NH-618492',
          customerName: 'Dr. Tariq Mehmood',
          phone: '0321-1234876',
          city: 'Islamabad',
          province: 'Islamabad Capital Territory',
          address: 'House 18, Sector F-8/2',
          paymentMethod: 'bank_transfer',
          subtotal: 2450,
          shippingFee: 0,
          discount: 245,
          total: 2205,
          status: 'confirmed',
          courier: 'trax',
          trackingNumber: 'TRX8829410PK',
          createdAt: new Date(Date.now() - 172800000).toISOString(),
          items: [
            { productTitle: 'Ainfer-X Male Health Vitality', quantity: 1, price: 2450, total: 2450, packCount: 1 }
          ]
        }
      ];
      localStorage.setItem('nutriherbs_orders', JSON.stringify(sampleOrders));
      setOrders(sampleOrders);
    } else {
      setOrders(saved);
    }
  };

  const loadCustomSeo = () => {
    const savedSeo = JSON.parse(localStorage.getItem('nutriherbs_custom_seo') || '{}');
    if (Object.keys(savedSeo).length > 0) {
      setProductsList((prev) =>
        prev.map((p) => (savedSeo[p.id] ? { ...p, ...savedSeo[p.id] } : p))
      );
    }
  };

  const handleSelectSeoProduct = (product: Product) => {
    setSelectedSeoProduct(product);
    setSeoFormData({
      metaTitle: product.metaTitle || `${product.title} | Nutriherbs Pakistan`,
      metaDescription: product.metaDescription || product.description,
      keywords: (product.keywords || []).join(', '),
      longDescription: product.longDescription || '',
      scientificMechanism: product.scientificMechanism || '',
    });
    setSeoSavedNotice(false);
  };

  const handleSaveSeo = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProduct = {
      ...selectedSeoProduct,
      metaTitle: seoFormData.metaTitle,
      metaDescription: seoFormData.metaDescription,
      keywords: seoFormData.keywords.split(',').map((s) => s.trim()).filter(Boolean),
      longDescription: seoFormData.longDescription,
      scientificMechanism: seoFormData.scientificMechanism,
    };

    const updatedList = productsList.map((p) =>
      p.id === selectedSeoProduct.id ? updatedProduct : p
    );
    setProductsList(updatedList);
    setSelectedSeoProduct(updatedProduct);

    // Save to local storage
    const savedSeo = JSON.parse(localStorage.getItem('nutriherbs_custom_seo') || '{}');
    savedSeo[selectedSeoProduct.id] = {
      metaTitle: updatedProduct.metaTitle,
      metaDescription: updatedProduct.metaDescription,
      keywords: updatedProduct.keywords,
      longDescription: updatedProduct.longDescription,
      scientificMechanism: updatedProduct.scientificMechanism,
    };
    localStorage.setItem('nutriherbs_custom_seo', JSON.stringify(savedSeo));

    setSeoSavedNotice(true);
    setTimeout(() => setSeoSavedNotice(false), 3000);
  };

  const handleUpdateStatus = (orderNumber: string, newStatus: string) => {
    const updated = orders.map((o) =>
      o.orderNumber === orderNumber ? { ...o, status: newStatus } : o
    );
    setOrders(updated);
    localStorage.setItem('nutriherbs_orders', JSON.stringify(updated));
  };

  const handleGenerateCourierSlip = (order: any) => {
    setSelectedOrderForCourier(order);
    
    const payload = {
      service_provider: courierProvider.toUpperCase(),
      booking_reference: order.orderNumber,
      consignee_name: order.customerName,
      consignee_phone: order.phone,
      consignee_address: `${order.address}, ${order.city}, ${order.province}`,
      destination_city: order.city,
      order_type: order.paymentMethod === 'cod' ? 'COD' : 'Prepaid',
      cod_amount: order.paymentMethod === 'cod' ? order.total : 0,
      item_description: order.items.map((i: any) => `${i.productTitle} x${i.quantity}`).join('; '),
      package_weight_kg: 0.5 * order.items.length,
      pieces: order.items.length,
      special_instructions: 'Handle with Care. Herbal Dietary Supplements. Call recipient before delivery.',
      pickup_address: 'Nutriherbs Fulfillment Center, Industrial Estate, Lahore'
    };

    setGeneratedPayload(JSON.stringify(payload, null, 2));
  };

  const filteredOrders = orders.filter((o) => {
    const matchesFilter = filterStatus === 'all' || o.status === filterStatus;
    const matchesSearch = 
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.phone.includes(searchQuery) ||
      o.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const pendingOrders = orders.filter((o) => o.status === 'pending_verification').length;
  const dispatchedOrders = orders.filter((o) => o.status === 'dispatched').length;

  return (
    <div className="bg-[#F4F9F4]/50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Header with Brand Logo */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative w-40 h-10 shrink-0">
              <Image
                src="/images/logo.png"
                alt="Nutriherbs Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="h-8 w-px bg-slate-200 hidden sm:block" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#5BB318] animate-pulse" />
                <span className="text-xs font-bold text-[#1B4D3E] uppercase tracking-wider">
                  Merchant Control Suite
                </span>
              </div>
              <h1 className="text-xl font-black text-slate-900">
                Nutriherbs Operations &amp; SEO Engine
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-slate-50"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#5BB318]" />
              <span>Live Storefront</span>
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 gap-2 max-w-xl">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
              activeTab === 'orders'
                ? 'bg-[#1B4D3E] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Orders &amp; Couriers ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
              activeTab === 'products'
                ? 'bg-[#1B4D3E] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products &amp; Stock</span>
          </button>

          <button
            onClick={() => setActiveTab('seo')}
            className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
              activeTab === 'seo'
                ? 'bg-[#10375C] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Globe className="w-4 h-4 text-emerald-300" />
            <span>SEO &amp; Ranking Engine</span>
          </button>
        </div>

        {/* TAB 1: ORDERS & COURIER DISPATCH */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {/* Operational KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
                <div className="text-slate-400 text-xs font-semibold">Total Revenue</div>
                <div className="text-2xl font-black text-[#1B4D3E] mt-1">
                  Rs. {totalRevenue.toLocaleString()}
                </div>
                <div className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> COD + Bank Transfer
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
                <div className="text-slate-400 text-xs font-semibold">Pending Verification</div>
                <div className="text-2xl font-black text-amber-500 mt-1">
                  {pendingOrders}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">Requires customer call/SMS</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
                <div className="text-slate-400 text-xs font-semibold">In Transit / Dispatched</div>
                <div className="text-2xl font-black text-[#10375C] mt-1">
                  {dispatchedOrders}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">With Trax / PostEx</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
                <div className="text-slate-400 text-xs font-semibold">Active Formulations</div>
                <div className="text-2xl font-black text-slate-900 mt-1">
                  {productsList.length} SKUs
                </div>
                <div className="text-[11px] text-emerald-700 font-bold mt-1">100% DRAP Enlisted</div>
              </div>
            </div>

            {/* Orders Pipeline Table */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden space-y-4 p-6">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Live Customer Order Pipeline</h2>
                  <p className="text-xs text-slate-500">Update fulfillment milestones and generate 1-click booking payloads for Pakistani couriers.</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search order #, customer..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#1B4D3E]"
                    />
                  </div>

                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border border-slate-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-[#1B4D3E] font-semibold text-slate-700"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending_verification">Pending Verification</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="packed">Packed</option>
                    <option value="dispatched">Dispatched</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-slate-200 bg-[#F4F9F4] text-slate-700">
                      <th className="p-3 font-bold">Order ID</th>
                      <th className="p-3 font-bold">Customer</th>
                      <th className="p-3 font-bold">City &amp; Address</th>
                      <th className="p-3 font-bold">Items Ordered</th>
                      <th className="p-3 font-bold">COD Amount</th>
                      <th className="p-3 font-bold">Status Pipeline</th>
                      <th className="p-3 font-bold text-right">Courier Slip</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-slate-400">
                          No customer orders matching the filter.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((order) => (
                        <tr key={order.orderNumber} className="hover:bg-slate-50">
                          <td className="p-3 font-bold text-[#1B4D3E]">
                            {order.orderNumber}
                            <div className="text-[10px] text-slate-400 font-normal">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </div>
                          </td>

                          <td className="p-3">
                            <div className="font-bold text-slate-900">{order.customerName}</div>
                            <div className="text-slate-500 font-mono text-[11px]">{order.phone}</div>
                          </td>

                          <td className="p-3 max-w-[200px]">
                            <div className="font-semibold text-slate-800">{order.city}</div>
                            <div className="text-[10px] text-slate-500 truncate">{order.address}</div>
                          </td>

                          <td className="p-3 max-w-[220px]">
                            {order.items.map((item: any, idx: number) => (
                              <div key={idx} className="truncate text-slate-700">
                                <strong>{item.quantity}x</strong> {item.productTitle}
                              </div>
                            ))}
                          </td>

                          <td className="p-3 font-black text-slate-900">
                            Rs. {order.total.toLocaleString()}
                            <div className="text-[10px] uppercase font-bold text-emerald-700">
                              {order.paymentMethod}
                            </div>
                          </td>

                          <td className="p-3">
                            <select
                              value={order.status}
                              onChange={(e) => handleUpdateStatus(order.orderNumber, e.target.value)}
                              className={`text-[11px] font-bold px-2 py-1 rounded-lg border focus:outline-none ${
                                order.status === 'pending_verification'
                                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                                  : order.status === 'confirmed'
                                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                                  : order.status === 'dispatched'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  : 'bg-slate-100 text-slate-700 border-slate-200'
                              }`}
                            >
                              <option value="pending_verification">Pending Verification</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="packed">Packed</option>
                              <option value="dispatched">Dispatched</option>
                              <option value="delivered">Delivered</option>
                              <option value="returned">Returned</option>
                            </select>
                          </td>

                          <td className="p-3 text-right">
                            <button
                              onClick={() => handleGenerateCourierSlip(order)}
                              className="px-2.5 py-1.5 rounded-lg bg-[#10375C] text-white text-[11px] font-bold hover:bg-[#0D2D4B] inline-flex items-center gap-1"
                            >
                              <Send className="w-3 h-3" />
                              <span>Booking Slip</span>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS & STOCK INVENTORY */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-900">Nutriherbs Product Catalog &amp; Inventory</h2>
              <p className="text-xs text-slate-500">Live active SKUs, unit retail pricing, DRAP enlistment numbers, and stock status.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productsList.map((product) => (
                <div 
                  key={product.id}
                  className="bg-[#F4F9F4]/60 p-4 rounded-2xl border border-slate-100 flex gap-3 items-center hover:border-emerald-200 transition-colors"
                >
                  <div className="relative w-16 h-16 bg-white rounded-xl border border-slate-100 overflow-hidden shrink-0">
                    <Image src={product.image} alt={product.title} fill className="object-contain p-1" />
                  </div>

                  <div className="flex-1 min-w-0 text-xs">
                    <div className="font-bold text-slate-900 truncate">{product.title}</div>
                    <div className="text-[11px] text-slate-500">{product.healthGoal} • {product.form}</div>
                    <div className="font-black text-[#1B4D3E] mt-1">Rs. {product.price.toLocaleString()}</div>
                    <div className="text-[10px] text-emerald-700 font-semibold">{product.drapRegNo}</div>
                  </div>

                  <button
                    onClick={() => {
                      handleSelectSeoProduct(product);
                      setActiveTab('seo');
                    }}
                    className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-[#1B4D3E] hover:border-[#1B4D3E] text-xs font-bold shrink-0"
                    title="Edit SEO Metadata"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: DEDICATED SEO & METADATA CMS */}
        {activeTab === 'seo' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Product Selector for SEO */}
            <div className="lg:col-span-4 bg-white p-5 rounded-3xl border border-slate-100 shadow-xs space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Select Product to Optimize
              </h3>
              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                {productsList.map((p) => {
                  const isSelected = selectedSeoProduct.id === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => handleSelectSeoProduct(p)}
                      className={`w-full p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                        isSelected
                          ? 'bg-[#10375C] text-white border-[#10375C] shadow-md'
                          : 'bg-[#F4F9F4] text-slate-800 border-slate-100 hover:border-emerald-200'
                      }`}
                    >
                      <div className="relative w-10 h-10 bg-white rounded-lg overflow-hidden shrink-0 border border-slate-100">
                        <Image src={p.image} alt={p.title} fill className="object-contain p-0.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold truncate">{p.title}</div>
                        <div className={`text-[10px] truncate ${isSelected ? 'text-emerald-300' : 'text-slate-500'}`}>
                          /product/{p.slug}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: SEO Metadata Editor & Live Google SERP Preview */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Google SERP Snippet Preview */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#10375C]" />
                    <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Google Search (SERP) Live Snippet Preview
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    Desktop &amp; Mobile Preview
                  </span>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-1 font-sans">
                  <div className="text-[11px] text-slate-500 flex items-center gap-1">
                    <span>https://nutriherbs.pk</span>
                    <span>›</span>
                    <span>product</span>
                    <span>›</span>
                    <span className="font-semibold text-slate-700">{selectedSeoProduct.slug}</span>
                  </div>
                  <div className="text-base sm:text-lg font-medium text-[#1a0dab] hover:underline cursor-pointer line-clamp-1">
                    {seoFormData.metaTitle || selectedSeoProduct.title}
                  </div>
                  <div className="text-xs text-[#4d5156] line-clamp-2 leading-relaxed">
                    {seoFormData.metaDescription || selectedSeoProduct.description}
                  </div>
                </div>
              </div>

              {/* SEO Form */}
              <form onSubmit={handleSaveSeo} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-5 text-xs">
                
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">
                      SEO Metadata &amp; Description Editor: {selectedSeoProduct.title}
                    </h2>
                    <p className="text-[11px] text-slate-500">
                      Canonical URL: <code className="text-[#1B4D3E]">https://nutriherbs.pk/product/{selectedSeoProduct.slug}</code>
                    </p>
                  </div>

                  {seoSavedNotice && (
                    <div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 animate-in fade-in">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#5BB318]" />
                      <span>SEO Saved!</span>
                    </div>
                  )}
                </div>

                {/* Meta Title */}
                <div>
                  <div className="flex justify-between font-bold text-slate-700 mb-1">
                    <label>Page SEO Meta Title</label>
                    <span className={`text-[10px] ${seoFormData.metaTitle.length > 60 ? 'text-amber-600' : 'text-slate-400'}`}>
                      {seoFormData.metaTitle.length} / 60 characters
                    </span>
                  </div>
                  <input
                    type="text"
                    required
                    value={seoFormData.metaTitle}
                    onChange={(e) => setSeoFormData({ ...seoFormData, metaTitle: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-[#1B4D3E] text-slate-900 font-medium"
                  />
                </div>

                {/* Meta Description */}
                <div>
                  <div className="flex justify-between font-bold text-slate-700 mb-1">
                    <label>Page Meta Description (Snippet for Google Rankings)</label>
                    <span className={`text-[10px] ${seoFormData.metaDescription.length > 160 ? 'text-amber-600' : 'text-slate-400'}`}>
                      {seoFormData.metaDescription.length} / 160 characters
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    required
                    value={seoFormData.metaDescription}
                    onChange={(e) => setSeoFormData({ ...seoFormData, metaDescription: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-[#1B4D3E] text-slate-900"
                  />
                </div>

                {/* Focus Keywords */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Target Focus &amp; Secondary Keywords (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={seoFormData.keywords}
                    onChange={(e) => setSeoFormData({ ...seoFormData, keywords: e.target.value })}
                    placeholder="e.g. marine collagen Pakistan, skin whitening capsules, DRAP approved"
                    className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-[#1B4D3E] text-slate-900 font-medium"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    These keywords are automatically injected into HTML meta keywords, OpenGraph schema, and breadcrumb tags.
                  </p>
                </div>

                {/* Mechanism of Action */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Biochemical Mechanism of Action (For Medical Trust &amp; E-E-A-T)
                  </label>
                  <input
                    type="text"
                    value={seoFormData.scientificMechanism}
                    onChange={(e) => setSeoFormData({ ...seoFormData, scientificMechanism: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-[#1B4D3E] text-slate-900"
                  />
                </div>

                {/* Long-Form In-Depth Description with 1,500 - 2,000 Word Counter & Quick Formatting Toolbar */}
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 font-bold text-slate-700">
                    <label className="flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-[#1B4D3E]" />
                      <span>In-Depth Scientific Article &amp; Long Description (1,500 - 2,000+ Words Recommended)</span>
                    </label>
                    <div className="flex items-center gap-2 text-[11px]">
                      <span className="bg-emerald-50 text-[#1B4D3E] px-2.5 py-0.5 rounded-full font-bold border border-emerald-200">
                        Words: {seoFormData.longDescription.trim() ? seoFormData.longDescription.trim().split(/\s+/).length : 0} / 2,000
                      </span>
                      <span className="text-slate-400">
                        {seoFormData.longDescription.length} chars
                      </span>
                    </div>
                  </div>

                  {/* Formatting Toolbar */}
                  <div className="flex flex-wrap gap-1.5 bg-slate-100 p-2 rounded-xl border border-slate-200 text-[11px]">
                    <button
                      type="button"
                      onClick={() => setSeoFormData({ ...seoFormData, longDescription: seoFormData.longDescription + '\n\n## Scientific Overview & Clinical Background\n' })}
                      className="px-2.5 py-1 bg-white hover:bg-slate-50 rounded-lg border text-slate-700 font-semibold"
                    >
                      + H2 Section
                    </button>
                    <button
                      type="button"
                      onClick={() => setSeoFormData({ ...seoFormData, longDescription: seoFormData.longDescription + '\n\n### Cellular Bio-Absorption Dynamics\n' })}
                      className="px-2.5 py-1 bg-white hover:bg-slate-50 rounded-lg border text-slate-700 font-semibold"
                    >
                      + H3 Subtitle
                    </button>
                    <button
                      type="button"
                      onClick={() => setSeoFormData({ ...seoFormData, longDescription: seoFormData.longDescription + '\n\n- **Key Bioactive Principle**: Standardized extract.\n- **Clinical Efficacy**: 94% absorption rate.\n' })}
                      className="px-2.5 py-1 bg-white hover:bg-slate-50 rounded-lg border text-slate-700 font-semibold"
                    >
                      + Bullet Points
                    </button>
                    <button
                      type="button"
                      onClick={() => setSeoFormData({ ...seoFormData, longDescription: seoFormData.longDescription + '\n\n> **DRAP Clinical Note**: This botanical formulation meets all pharmacopeial purity monographs.\n' })}
                      className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 text-emerald-900 font-bold"
                    >
                      + Callout Box
                    </button>
                  </div>

                  <textarea
                    rows={12}
                    value={seoFormData.longDescription}
                    onChange={(e) => setSeoFormData({ ...seoFormData, longDescription: e.target.value })}
                    className="w-full border border-slate-200 rounded-2xl p-4 focus:outline-none focus:border-[#1B4D3E] text-slate-900 font-mono text-xs leading-relaxed"
                    placeholder="Write or paste your comprehensive 1,500 - 2,000 words botanical monograph and SEO article here..."
                  />
                  <p className="text-[10px] text-slate-400">
                    Supports Markdown formatting (<code>## Heading</code>, <code>### Subheading</code>, <code>**bold**</code>, <code>- bullet point</code>, <code>&gt; callout box</code>). This content is rendered directly on the Product Detail Page and indexed by search engines.
                  </p>
                </div>

                {/* Save Button */}
                <div className="pt-2 flex justify-end gap-3">
                  <Link
                    href={`/product/${selectedSeoProduct.slug}`}
                    target="_blank"
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View Live PDP</span>
                  </Link>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#1B4D3E] hover:bg-[#13382D] text-white rounded-xl font-bold flex items-center gap-2 shadow-md transition-all active:scale-95"
                  >
                    <Save className="w-4 h-4 text-emerald-300" />
                    <span>Save &amp; Update SEO Metadata</span>
                  </button>
                </div>

              </form>

            </div>

          </div>
        )}

        {/* Courier Booking Payload Generator Modal */}
        {selectedOrderForCourier && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Courier API Dispatch Payload ({selectedOrderForCourier.orderNumber})
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Ready-to-send JSON payload for PostEx, Trax Logistics, or Leopards Courier API webhook.
                  </p>
                </div>
                <button
                  onClick={() => setSelectedOrderForCourier(null)}
                  className="text-slate-400 hover:text-slate-700 text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="flex gap-2">
                {(['trax', 'postex', 'leopards'] as const).map((provider) => (
                  <button
                    key={provider}
                    onClick={() => {
                      setCourierProvider(provider);
                      handleGenerateCourierSlip(selectedOrderForCourier);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all ${
                      courierProvider === provider
                        ? 'bg-[#1B4D3E] text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {provider}
                  </button>
                ))}
              </div>

              <div className="bg-slate-900 text-emerald-400 p-4 rounded-2xl font-mono text-xs overflow-x-auto max-h-72">
                <pre>{generatedPayload}</pre>
              </div>

              <div className="flex justify-between items-center pt-2">
                <div className="text-[11px] text-slate-500">
                  Consignment will be booked for <strong>{selectedOrderForCourier.customerName}</strong> in <strong>{selectedOrderForCourier.city}</strong>.
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedPayload);
                      alert('Courier payload JSON copied to clipboard!');
                    }}
                    className="px-4 py-2 border rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50"
                  >
                    Copy JSON Payload
                  </button>
                  <button
                    onClick={() => {
                      handleUpdateStatus(selectedOrderForCourier.orderNumber, 'dispatched');
                      alert(`Order marked as Dispatched via ${courierProvider.toUpperCase()}!`);
                      setSelectedOrderForCourier(null);
                    }}
                    className="px-4 py-2 bg-[#5BB318] text-white rounded-xl text-xs font-bold hover:bg-[#4E9F3D]"
                  >
                    Confirm Dispatch Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
