export interface SupplementFactItem {
  ingredient: string;
  amountPerServing: string;
  dailyValue: string;
}

export interface SupplementFacts {
  servingSize: string;
  servingsPerContainer: number;
  facts: SupplementFactItem[];
}

export interface WeeklyMilestone {
  week: string;
  title: string;
  description: string;
}

export interface ProductFaq {
  q: string;
  a: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  discount: string;
  rating: number;
  reviewsCount: number;
  form: string;
  healthGoal: string;
  badges: string[];
  image: string;
  description: string;
  longDescription?: string;
  scientificMechanism?: string;
  weeklyTimeline?: WeeklyMilestone[];
  faqs?: ProductFaq[];
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  keyBenefits: string[];
  supplementFacts: SupplementFacts;
  usageInstructions: string;
  drapRegNo: string;
  stock: number;
  inStock: boolean;
  isBestSeller?: boolean;
  isTrending?: boolean;
}

export interface HealthGoalCategory {
  id: string;
  title: string;
  icon: string;
  count: number;
  desc: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedPack: 1 | 2 | 3;
  packPrice: number;
}

export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  helpfulCount: number;
}

export interface OrderItem {
  productId: string;
  productTitle: string;
  quantity: number;
  price: number;
  total: number;
  packCount: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  province: string;
  postalCode?: string;
  orderNotes?: string;
  paymentMethod: 'cod' | 'bank_transfer';
  subtotal: number;
  shippingFee: number;
  discount: number;
  couponCode?: string;
  total: number;
  status: 'pending_verification' | 'confirmed' | 'packed' | 'dispatched' | 'delivered' | 'returned';
  courier: 'trax' | 'postex' | 'leopards';
  trackingNumber: string;
  createdAt: string;
  items: OrderItem[];
}
