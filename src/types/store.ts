export interface GroceryCategory {
  id: string;
  name: string;
  icon: string;
  image?: string;
}

export interface GroceryProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  subcategory?: string;
  description?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  unit: string; // e.g., "1kg", "12pcs"
  image: string;
  inStock: boolean;
  stockCount: number;
  deliveryEta: string;
  isFlashSale?: boolean;
  flashSaleEnds?: number; // timestamp
  rating?: number;
  reviewsCount?: number;
  isBestseller?: boolean;
  isFeatured?: boolean;
  isOrganic?: boolean;
  sku?: string;
  ingredients?: string;
  nutritionalInfo?: string;
  tags?: string[];
  createdAt?: number;
}

export interface ExclusiveDeal {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  discount: number;
  rating: number;
  reviews: number;
  limitedStock: boolean;
  endsAt: number; // timestamp
  isVipOnly: boolean;
  badge?: string;
}
