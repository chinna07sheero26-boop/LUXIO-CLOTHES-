export type Category =
  | 'Plain T-shirts'
  | 'Printed T-shirts'
  | 'Gym T-shirts'
  | 'Shirts'
  | 'Jeans'
  | 'Trousers'
  | 'Shorts'
  | 'Joggers'
  | 'Hoodies & Sweatshirts';

export const ALL_CATEGORIES: Category[] = [
  'Plain T-shirts',
  'Printed T-shirts',
  'Gym T-shirts',
  'Shirts',
  'Jeans',
  'Trousers',
  'Shorts',
  'Joggers',
  'Hoodies & Sweatshirts',
];

export interface Product {
  sku: string;
  name: string;
  category: Category | string;
  price: number;
  sizes: string[];
  color: string;
  description: string;
  stock: number;
  imageUrl: string;
  badge?: string;
  material?: string;
  fit?: string;
}

export interface CartItem {
  id: string; // sku-size composite key
  product: Product;
  size: string;
  quantity: number;
}

export interface FilterState {
  search: string;
  category: string;
  sizes: string[];
  colors: string[];
  maxPrice: number;
  minPrice: number;
  inStockOnly: boolean;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'name-asc' | 'stock';
}

export interface OrderDetails {
  orderId: string;
  date: string;
  customer: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  paymentMethod: string;
  status: 'Confirmed' | 'Processing' | 'Shipped';
}

export interface ProductReview {
  id: string;
  sku: string;
  author: string;
  rating: number; // 1 to 5
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  fitFeedback?: 'Runs Small' | 'True to Size' | 'Runs Large';
}

