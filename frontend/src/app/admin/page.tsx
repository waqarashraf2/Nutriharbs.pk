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
  BookOpen,
  Plus,
  Trash2,
  X,
  Check,
  FolderPlus,
  Activity,
  HeartPulse,
  Flame,
  Scale,
  Zap,
  Image as ImageIcon
} from 'lucide-react';
import { 
  PRODUCTS, 
  HEALTH_GOALS, 
  PRODUCT_FORMS, 
  getStoreProducts, 
  getStoreCategories, 
  saveStoreProduct, 
  deleteStoreProduct, 
  saveStoreCategory, 
  deleteStoreCategory 
} from '@/lib/products-data';
import { Product, HealthGoalCategory, SupplementFactItem } from '@/lib/types';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'categories' | 'seo'>('orders');
  const [orders, setOrders] = useState<any[]>([]);
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [categoriesList, setCategoriesList] = useState<HealthGoalCategory[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [productSearchQuery, setProductSearchQuery] = useState('');
  
  // Courier Modal State
  const [selectedOrderForCourier, setSelectedOrderForCourier] = useState<any | null>(null);
  const [courierProvider, setCourierProvider] = useState<'trax' | 'postex' | 'leopards'>('trax');
  const [generatedPayload, setGeneratedPayload] = useState<string>('');

  // SEO Editing State
  const [selectedSeoProduct, setSelectedSeoProduct] = useState<Product | null>(null);
  const [seoFormData, setSeoFormData] = useState({
    metaTitle: '',
    metaDescription: '',
    keywords: '',
    longDescription: '',
    scientificMechanism: '',
  });
  const [seoSavedNotice, setSeoSavedNotice] = useState(false);

  // New/Edit Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productFormData, setProductFormData] = useState<Partial<Product>>({
    title: '',
    slug: '',
    subtitle: '',
    price: 1950,
    originalPrice: 2450,
    discount: '20% OFF',
    rating: 5.0,
    reviewsCount: 1,
    form: 'Herbal Capsules',
    healthGoal: 'General Vitality',
    badges: ['DRAP Certified', '100% Herbal'],
    image: '/images/products/kalfit-bone-joint.webp',
    description: '',
    longDescription: '',
    scientificMechanism: '',
    metaTitle: '',
    metaDescription: '',
    keywords: ['herbal supplements Pakistan', 'DRAP certified'],
    keyBenefits: ['100% Natural botanical extract', 'Fast absorption formula', 'Gentle on stomach'],
    supplementFacts: {
      servingSize: '1 Capsule',
      servingsPerContainer: 30,
      facts: [
        { ingredient: 'Active Botanical Extract', amountPerServing: '500 mg', dailyValue: '**' },
        { ingredient: 'Vitamin C (Ascorbic Acid)', amountPerServing: '60 mg', dailyValue: '67%' }
      ]
    },
    usageInstructions: 'Take 1 capsule daily after a meal with a glass of water.',
    drapRegNo: 'DRAP Enl-00995/2026',
    stock: 50,
    inStock: true,
    isBestSeller: false,
    isTrending: true
  });

  // New/Edit Category Modal State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [categoryFormData, setCategoryFormData] = useState<HealthGoalCategory>({
    id: '',
    title: '',
    icon: 'Sparkles',
    count: 1,
    desc: 'Botanical Wellness & Vitality'
  });

  // Available image presets from WhatsApp assets
  const availableImagePresets = [
    { label: 'KalFit Bone & Joint', url: '/images/products/kalfit-bone-joint.webp' },
    { label: 'Vivomit Glow Collagen', url: '/images/products/vivomit-collagen.webp' },
    { label: 'Niston Biotin 2500', url: '/images/products/niston-biotin.webp' },
    { label: 'Glowing Glutathione', url: '/images/products/glowing-glutathione.webp' },
    { label: 'Biodetox Weight Lose', url: '/images/products/biodetox.webp' },
    { label: 'Ainfer-X Male Health', url: '/images/products/ainfer-x-male.webp' },
    { label: 'Vita-S Daily Beauty', url: '/images/products/vita-s.webp' },
    { label: 'Elevit Women Multi', url: '/images/products/elevit-multivitamin.webp' },
    { label: 'Ginrex Men Multi', url: '/images/products/ginrex-multivitamin.webp' }
  ];

  useEffect(() => {
    loadData();
    const handleProductsUpdated = () => setProductsList(getStoreProducts());
    const handleCategoriesUpdated = () => setCategoriesList(getStoreCategories());
    window.addEventListener('nutriherbs_products_updated', handleProductsUpdated);
    window.addEventListener('nutriherbs_categories_updated', handleCategoriesUpdated);
    return () => {
      window.removeEventListener('nutriherbs_products_updated', handleProductsUpdated);
      window.removeEventListener('nutriherbs_categories_updated', handleCategoriesUpdated);
    };
  }, []);

  const loadData = () => {
    loadOrders();
    const products = getStoreProducts();
    setProductsList(products);
    const categories = getStoreCategories();
    setCategoriesList(categories);
    if (products.length > 0) {
      setSelectedSeoProduct(products[0]);
      setSeoFormData({
        metaTitle: products[0].metaTitle || `${products[0].title} | Nutriherbs Pakistan`,
        metaDescription: products[0].metaDescription || products[0].description,
        keywords: (products[0].keywords || []).join(', '),
        longDescription: products[0].longDescription || '',
        scientificMechanism: products[0].scientificMechanism || '',
      });
    }
  };

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
    if (!selectedSeoProduct) return;
    const updatedProduct: Product = {
      ...selectedSeoProduct,
      metaTitle: seoFormData.metaTitle,
      metaDescription: seoFormData.metaDescription,
      keywords: seoFormData.keywords.split(',').map((s) => s.trim()).filter(Boolean),
      longDescription: seoFormData.longDescription,
      scientificMechanism: seoFormData.scientificMechanism,
    };

    const updated = saveStoreProduct(updatedProduct);
    setProductsList(updated);
    setSelectedSeoProduct(updatedProduct);
    setSeoSavedNotice(true);
    setTimeout(() => setSeoSavedNotice(false), 3000);
  };

  const handleOpenProductModal = (product?: Product) => {
    if (product) {
      setEditingProductId(product.id);
      setProductFormData({ ...product });
    } else {
      setEditingProductId(null);
      setProductFormData({
        id: `nh-custom-${Date.now()}`,
        title: '',
        slug: '',
        subtitle: '',
        price: 1950,
        originalPrice: 2450,
        discount: '20% OFF',
        rating: 5.0,
        reviewsCount: 1,
        form: 'Herbal Capsules',
        healthGoal: categoriesList[0]?.title || 'General Vitality',
        badges: ['DRAP Certified', '100% Herbal', 'New Formulation'],
        image: '/images/products/kalfit-bone-joint.webp',
        description: '',
        longDescription: `## Clinical & Botanical Analysis\n\nNutriherbs advanced formula crafted specifically for peak bioavailability. Packed with high-potency standardized botanical actives.\n\n### Mechanism of Action\n\nDirectly nourishes cellular receptors to support natural vitality and organ health.\n\n- **100% Pure Botanical**: Free from fillers, artificial binders, and synthetic hormones.\n- **DRAP Certified**: Lab tested and compliant with Pakistan pharmacopeial standards.\n\n> **Directions**: Take 1 to 2 capsules daily after meals with water.`,
        scientificMechanism: 'Enhances cellular nutrient transport and supports systemic metabolic balance.',
        metaTitle: '',
        metaDescription: '',
        keywords: ['herbal supplements Pakistan', 'DRAP certified'],
        keyBenefits: ['100% Pure Herbal Actives', 'Accelerates natural vitality', 'Gentle on digestion'],
        supplementFacts: {
          servingSize: '1 Capsule',
          servingsPerContainer: 30,
          facts: [
            { ingredient: 'Active Herbal Extract', amountPerServing: '500 mg', dailyValue: '**' },
            { ingredient: 'Vitamin D3 & Zinc', amountPerServing: '400 IU', dailyValue: '50%' }
          ]
        },
        usageInstructions: 'Take 1 capsule daily after breakfast or lunch with plenty of water.',
        drapRegNo: 'DRAP Enl-00995/2026',
        stock: 60,
        inStock: true,
        isBestSeller: false,
        isTrending: true
      });
    }
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productFormData.title) {
      alert('Please provide a product title');
      return;
    }

    const slug = productFormData.slug || productFormData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const id = editingProductId || productFormData.id || `nh-${slug}`;

    const newProduct: Product = {
      id,
      title: productFormData.title,
      slug,
      subtitle: productFormData.subtitle || '100% Pure Herbal Dietary Supplement',
      price: Number(productFormData.price) || 1950,
      originalPrice: Number(productFormData.originalPrice) || (Number(productFormData.price) * 1.2),
      discount: productFormData.discount || '20% OFF',
      rating: Number(productFormData.rating) || 5.0,
      reviewsCount: Number(productFormData.reviewsCount) || 1,
      form: productFormData.form || 'Herbal Capsules',
      healthGoal: productFormData.healthGoal || 'General Vitality',
      badges: productFormData.badges || ['DRAP Certified', '100% Pure'],
      image: productFormData.image || '/images/products/kalfit-bone-joint.webp',
      description: productFormData.description || `${productFormData.title} is a premium herbal formulation by Nutriherbs, engineered with standardized botanical actives for optimal vitality.`,
      longDescription: productFormData.longDescription,
      scientificMechanism: productFormData.scientificMechanism,
      metaTitle: productFormData.metaTitle || `${productFormData.title} Pakistan | Nutriherbs`,
      metaDescription: productFormData.metaDescription || `Buy ${productFormData.title} in Pakistan. 100% pure herbal formulation with DRAP enlistment & Cash on Delivery.`,
      keywords: Array.isArray(productFormData.keywords) ? productFormData.keywords : String(productFormData.keywords).split(',').map(s => s.trim()),
      keyBenefits: productFormData.keyBenefits || ['100% Botanical formulation', 'DRAP Certified', 'Non-constipating'],
      supplementFacts: productFormData.supplementFacts || {
        servingSize: '1 Capsule',
        servingsPerContainer: 30,
        facts: [{ ingredient: 'Active Botanical Complex', amountPerServing: '500 mg', dailyValue: '**' }]
      },
      usageInstructions: productFormData.usageInstructions || 'Take 1 capsule daily after a meal.',
      drapRegNo: productFormData.drapRegNo || 'DRAP Enl-00995/2026',
      stock: Number(productFormData.stock) || 50,
      inStock: productFormData.stock ? Number(productFormData.stock) > 0 : true,
      isBestSeller: productFormData.isBestSeller,
      isTrending: productFormData.isTrending
    };

    const updated = saveStoreProduct(newProduct);
    setProductsList(updated);
    setIsProductModalOpen(false);
    alert(`✓ Product "${newProduct.title}" saved and live on storefront!`);
  };

  const handleDeleteProduct = (productId: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      const updated = deleteStoreProduct(productId);
      setProductsList(updated);
    }
  };

  const handleOpenCategoryModal = (cat?: HealthGoalCategory) => {
    if (cat) {
      setEditingCategoryId(cat.id);
      setCategoryFormData({ ...cat });
    } else {
      setEditingCategoryId(null);
      setCategoryFormData({
        id: `cat-${Date.now()}`,
        title: '',
        icon: 'Sparkles',
        count: 1,
        desc: 'Herbal Wellness & Targeted Health'
      });
    }
    setIsCategoryModalOpen(true);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryFormData.title) {
      alert('Please provide a category title');
      return;
    }

    const id = editingCategoryId || categoryFormData.id || categoryFormData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newCategory: HealthGoalCategory = {
      id,
      title: categoryFormData.title,
      icon: categoryFormData.icon || 'Sparkles',
      count: Number(categoryFormData.count) || 1,
      desc: categoryFormData.desc || 'Botanical extracts and herbal support.'
    };

    const updated = saveStoreCategory(newCategory);
    setCategoriesList(updated);
    setIsCategoryModalOpen(false);
    alert(`✓ Category "${newCategory.title}" saved successfully!`);
  };

  const handleDeleteCategory = (categoryId: string, title: string) => {
    if (confirm(`Are you sure you want to delete category "${title}"?`)) {
      const updated = deleteStoreCategory(categoryId);
      setCategoriesList(updated);
    }
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

  const filteredProducts = productsList.filter((p) =>
    p.title.toLowerCase().includes(productSearchQuery.toLowerCase()) ||
    p.healthGoal.toLowerCase().includes(productSearchQuery.toLowerCase()) ||
    p.drapRegNo.toLowerCase().includes(productSearchQuery.toLowerCase())
  );

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
                Nutriherbs Catalog, SEO &amp; Operations
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-slate-50 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#5BB318]" />
              <span>Live Storefront</span>
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap bg-white p-1.5 rounded-2xl border border-slate-200 gap-1.5 max-w-2xl">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-2 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
              activeTab === 'orders'
                ? 'bg-[#1B4D3E] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`py-2 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
              activeTab === 'products'
                ? 'bg-[#1B4D3E] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products ({productsList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`py-2 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
              activeTab === 'categories'
                ? 'bg-[#1B4D3E] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <FolderPlus className="w-4 h-4" />
            <span>Categories ({categoriesList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('seo')}
            className={`py-2 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
              activeTab === 'seo'
                ? 'bg-[#10375C] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Globe className="w-4 h-4 text-emerald-300" />
            <span>SEO Manager</span>
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

        {/* TAB 2: PRODUCTS & STOCK INVENTORY WITH ADD NEW PRODUCT BUTTON */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">Product Management &amp; Inventory</h2>
                <p className="text-xs text-slate-500">Create new products, edit pricing, update DRAP numbers, and manage stock.</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={productSearchQuery}
                    onChange={(e) => setProductSearchQuery(e.target.value)}
                    className="pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#1B4D3E]"
                  />
                </div>

                <button
                  onClick={() => handleOpenProductModal()}
                  className="bg-[#1B4D3E] hover:bg-[#13382D] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <Plus className="w-4 h-4 text-emerald-300" />
                  <span>+ Add New Product</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id}
                  className="bg-[#F4F9F4]/60 p-4 rounded-2xl border border-slate-200 flex gap-3.5 items-center hover:border-emerald-300 transition-all hover:shadow-xs relative group"
                >
                  <div className="relative w-16 h-16 bg-white rounded-xl border border-slate-100 overflow-hidden shrink-0">
                    <Image src={product.image} alt={product.title} fill className="object-contain p-1" />
                  </div>

                  <div className="flex-1 min-w-0 text-xs">
                    <div className="font-bold text-slate-900 truncate">{product.title}</div>
                    <div className="text-[11px] text-slate-500">{product.healthGoal} • {product.form}</div>
                    <div className="font-black text-[#1B4D3E] mt-0.5">Rs. {product.price.toLocaleString()}</div>
                    <div className="text-[10px] text-emerald-700 font-semibold">{product.drapRegNo}</div>
                    <div className="text-[10px] text-slate-400">Stock: <strong>{product.stock} units</strong></div>
                  </div>

                  <div className="flex flex-col gap-1.5 shrink-0">
                    <button
                      onClick={() => handleOpenProductModal(product)}
                      className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-[#1B4D3E] hover:border-[#1B4D3E] text-xs font-bold"
                      title="Edit Product Details"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id, product.title)}
                      className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-red-600 hover:border-red-200 text-xs font-bold"
                      title="Delete Product"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CATEGORIES & HEALTH GOALS MANAGER */}
        {activeTab === 'categories' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">Health Goals &amp; Product Categories</h2>
                <p className="text-xs text-slate-500">Manage categories displayed on the Homepage category cards and navigation mega-menus.</p>
              </div>

              <button
                onClick={() => handleOpenCategoryModal()}
                className="bg-[#1B4D3E] hover:bg-[#13382D] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Plus className="w-4 h-4 text-emerald-300" />
                <span>+ Add New Category</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoriesList.map((cat) => (
                <div 
                  key={cat.id}
                  className="bg-[#F4F9F4]/70 p-5 rounded-2xl border border-slate-200 flex justify-between items-start hover:border-emerald-300 transition-all hover:shadow-xs"
                >
                  <div className="space-y-1">
                    <div className="w-8 h-8 rounded-xl bg-white border border-emerald-100 flex items-center justify-center text-[#1B4D3E] mb-2 shadow-2xs">
                      <Sparkles className="w-4 h-4 text-[#5BB318]" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900">{cat.title}</h3>
                    <p className="text-xs text-slate-500">{cat.desc}</p>
                    <div className="text-[11px] font-bold text-emerald-700 pt-1">
                      Slug: <code className="text-[#10375C]">{cat.id}</code>
                    </div>
                  </div>

                  <div className="flex gap-1.5">
                    <button
                      onClick={() => handleOpenCategoryModal(cat)}
                      className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-[#1B4D3E] text-xs"
                      title="Edit Category"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(cat.id, cat.title)}
                      className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-red-600 text-xs"
                      title="Delete Category"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: DEDICATED SEO & METADATA CMS */}
        {activeTab === 'seo' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Product Selector for SEO */}
            <div className="lg:col-span-4 bg-white p-5 rounded-3xl border border-slate-100 shadow-xs space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Select Product to Optimize ({productsList.length})
              </h3>
              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                {productsList.map((p) => {
                  const isSelected = selectedSeoProduct?.id === p.id;
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
              
              {selectedSeoProduct && (
                <>
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

                    {/* Long-Form In-Depth Description */}
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
                        Supports Markdown formatting (<code>## Heading</code>, <code>### Subheading</code>, <code>**bold**</code>, <code>- bullet point</code>, <code>&gt; callout box</code>).
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
                </>
              )}

            </div>

          </div>
        )}

        {/* MODAL: ADD / EDIT PRODUCT WIZARD */}
        {isProductModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#1B4D3E]/10 flex items-center justify-center text-[#1B4D3E]">
                    <Package className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {editingProductId ? 'Edit Product' : 'Add New Herbal Product Formulation'}
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Complete product profile with DRAP compliance, pricing, and SEO parameters.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsProductModalOpen(false)}
                  className="text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-6 text-xs">
                
                {/* Basic Details */}
                <div className="space-y-4">
                  <h4 className="font-bold text-sm text-[#1B4D3E] border-b border-emerald-100 pb-1">
                    1. Basic Product Information
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Product Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Organic Ashwagandha Max 1000mg"
                        value={productFormData.title || ''}
                        onChange={(e) => setProductFormData({ ...productFormData, title: e.target.value })}
                        className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-[#1B4D3E]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">URL Slug (Auto or custom)</label>
                      <input
                        type="text"
                        placeholder="e.g. ashwagandha-max-1000mg"
                        value={productFormData.slug || ''}
                        onChange={(e) => setProductFormData({ ...productFormData, slug: e.target.value })}
                        className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-[#1B4D3E]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Subtitle / Key Active Formula</label>
                    <input
                      type="text"
                      placeholder="e.g. KSM-66 Standardized Withanolides + Black Pepper Extract"
                      value={productFormData.subtitle || ''}
                      onChange={(e) => setProductFormData({ ...productFormData, subtitle: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-[#1B4D3E]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Health Goal / Category</label>
                      <select
                        value={productFormData.healthGoal || ''}
                        onChange={(e) => setProductFormData({ ...productFormData, healthGoal: e.target.value })}
                        className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-[#1B4D3E] font-medium"
                      >
                        {categoriesList.map((c) => (
                          <option key={c.id} value={c.title}>{c.title}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Product Form</label>
                      <select
                        value={productFormData.form || ''}
                        onChange={(e) => setProductFormData({ ...productFormData, form: e.target.value })}
                        className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-[#1B4D3E] font-medium"
                      >
                        {PRODUCT_FORMS.map((f) => (
                          <option key={f.id} value={f.title}>{f.title}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">DRAP Enlistment No. *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. DRAP Enl-00995/2026"
                        value={productFormData.drapRegNo || ''}
                        onChange={(e) => setProductFormData({ ...productFormData, drapRegNo: e.target.value })}
                        className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-[#1B4D3E] font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Pricing & Stock */}
                <div className="space-y-4">
                  <h4 className="font-bold text-sm text-[#1B4D3E] border-b border-emerald-100 pb-1">
                    2. Commercial Pricing &amp; Stock Inventory
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Selling Price (Rs.) *</label>
                      <input
                        type="number"
                        required
                        value={productFormData.price || ''}
                        onChange={(e) => setProductFormData({ ...productFormData, price: Number(e.target.value) })}
                        className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-[#1B4D3E] font-bold text-[#1B4D3E]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Original Cut Price (Rs.)</label>
                      <input
                        type="number"
                        value={productFormData.originalPrice || ''}
                        onChange={(e) => setProductFormData({ ...productFormData, originalPrice: Number(e.target.value) })}
                        className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-[#1B4D3E]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Discount Badge Tag</label>
                      <input
                        type="text"
                        value={productFormData.discount || ''}
                        onChange={(e) => setProductFormData({ ...productFormData, discount: e.target.value })}
                        placeholder="20% OFF"
                        className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-[#1B4D3E]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Stock (Units Available)</label>
                      <input
                        type="number"
                        value={productFormData.stock || 50}
                        onChange={(e) => setProductFormData({ ...productFormData, stock: Number(e.target.value) })}
                        className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-[#1B4D3E]"
                      />
                    </div>
                  </div>

                  {/* Image Selector */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Product Image (Choose Preset or URL)</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {availableImagePresets.map((preset) => (
                        <button
                          key={preset.url}
                          type="button"
                          onClick={() => setProductFormData({ ...productFormData, image: preset.url })}
                          className={`px-2.5 py-1 rounded-lg border text-[11px] transition-all ${
                            productFormData.image === preset.url
                              ? 'bg-[#1B4D3E] text-white border-[#1B4D3E]'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      value={productFormData.image || ''}
                      onChange={(e) => setProductFormData({ ...productFormData, image: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-[#1B4D3E]"
                      placeholder="/images/products/my-product.webp"
                    />
                  </div>
                </div>

                {/* Long Description & SEO */}
                <div className="space-y-4">
                  <h4 className="font-bold text-sm text-[#1B4D3E] border-b border-emerald-100 pb-1">
                    3. Long Botanical Description &amp; SEO Monograph
                  </h4>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Short Description</label>
                    <textarea
                      rows={2}
                      value={productFormData.description || ''}
                      onChange={(e) => setProductFormData({ ...productFormData, description: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-[#1B4D3E]"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between font-bold text-slate-700 mb-1">
                      <label>1,500 - 2,000+ Words Botanical Guide (Markdown Supported)</label>
                      <span className="text-emerald-700">
                        Words: {productFormData.longDescription?.trim() ? productFormData.longDescription.trim().split(/\s+/).length : 0}
                      </span>
                    </div>
                    <textarea
                      rows={8}
                      value={productFormData.longDescription || ''}
                      onChange={(e) => setProductFormData({ ...productFormData, longDescription: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl p-3 font-mono text-xs focus:outline-none focus:border-[#1B4D3E]"
                      placeholder="Write in-depth scientific article, active principles, clinical references, and results timeline..."
                    />
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsProductModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#1B4D3E] hover:bg-[#13382D] text-white rounded-xl font-bold flex items-center gap-2 shadow-md"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save &amp; Publish Product</span>
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

        {/* MODAL: ADD / EDIT CATEGORY */}
        {isCategoryModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#1B4D3E]/10 flex items-center justify-center text-[#1B4D3E]">
                    <FolderPlus className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {editingCategoryId ? 'Edit Category' : 'Create New Health Goal Category'}
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Add a custom category to organize herbal supplements.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveCategory} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Immunity & Detox Shield"
                    value={categoryFormData.title}
                    onChange={(e) => setCategoryFormData({ ...categoryFormData, title: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-[#1B4D3E]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Short Description / Subtitle</label>
                  <input
                    type="text"
                    placeholder="e.g. Antioxidants, Zinc & Respiratory Defense"
                    value={categoryFormData.desc}
                    onChange={(e) => setCategoryFormData({ ...categoryFormData, desc: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-[#1B4D3E]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category Icon Type</label>
                  <select
                    value={categoryFormData.icon}
                    onChange={(e) => setCategoryFormData({ ...categoryFormData, icon: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-[#1B4D3E] font-medium"
                  >
                    <option value="Sparkles">Sparkles (Beauty / Skin)</option>
                    <option value="Activity">Activity (Joint / Bones)</option>
                    <option value="ShieldCheck">ShieldCheck (Immunity / Defense)</option>
                    <option value="Flame">Flame (Vitality / Stamina)</option>
                    <option value="Scale">Scale (Weight / Metabolism)</option>
                    <option value="HeartPulse">HeartPulse (General Wellness)</option>
                  </select>
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsCategoryModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#1B4D3E] hover:bg-[#13382D] text-white rounded-xl font-bold flex items-center gap-2 shadow-md"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Category</span>
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
