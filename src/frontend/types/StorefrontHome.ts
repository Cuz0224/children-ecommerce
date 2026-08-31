export type ToyCategory =
  | "WOODEN_TOYS"
  | "STEM_MAKER"
  | "INFANT_PLUSH"
  | "CREATIVE_BUILDING"
  | "PRETEND_PLAY"
  | "ART_CRAFT"
  | "LEARNING"
  | "OUTDOOR"
  | "PLUSH";

export type CategoryKey = "all" | ToyCategory;

export type ToyAgeGroup =
  | "AGE_0_2"
  | "AGE_3_5"
  | "AGE_6_8"
  | "AGE_8_PLUS"
  | "AGE_9_PLUS";

export type AgeGroupKey = "all" | ToyAgeGroup;

export type StorefrontStatus = "HIDDEN" | "LIVE" | "REMOVED";

export type CartStatus = "ACTIVE" | "CHECKED_OUT";

export type DiscountType = "PERCENT" | "FIXED_AMOUNT";

export type SortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "bestselling";

export interface ToyDetailedSpecs {
  materials: string;
  safetyCertification: string;
  dimensions: string;
  boxIncludes: string[];
  stockStatus: "In Stock" | "Only 3 Left" | "Low Stock" | "Backorder";
  stockCount: number;
}

export interface ToyProductDto {
  id: string; // data-from: ToyProduct-id
  sku: string; // data-from: ToyProduct-sku
  name: string; // data-from: ToyProduct-name
  subtitle: string; // data-from: ToyProduct-subtitle
  category: ToyCategory; // data-from: ToyProduct-category
  categoryLabel: string;
  ageGroup: ToyAgeGroup; // data-from: ToyProduct-ageGroup
  ageLabel: string;
  unitPrice: number; // data-from: ToyProduct-unitPrice
  originalPrice: number | null; // data-from: ToyProduct-originalPrice
  ratingAverage: number; // data-from: ToyProduct-ratingAverage
  reviewsCount: number; // data-from: ToyProduct-reviewsCount
  badge: string | null; // data-from: ToyProduct-badge
  storefrontStatus: StorefrontStatus; // data-from: ToyProduct-storefrontStatus
  productImage: string | null; // data-from: ToyProduct-productImage data-role: image_url
  description: string; // data-from: ToyProduct-description
  longDescription: string; // data-from: ToyProduct-longDescription
  highlights: string[]; // data-from: ToyProduct-highlights
  materials: string | null; // data-from: ToyProduct-materials
  safetyCertification: string | null; // data-from: ToyProduct-safetyCertification
  dimensions: string | null; // data-from: ToyProduct-dimensions
  boxIncludes: string[]; // data-from: ToyProduct-boxIncludes
  stockCount: number; // data-from: ToyProduct-stockCount
  reorderThreshold: number; // data-from: ToyProduct-reorderThreshold
  specs: ToyDetailedSpecs;
}

export type ToyProduct = ToyProductDto;

export interface PromoCodeDto {
  id: string; // data-from: PromoCode-id
  code: string; // data-from: PromoCode-code
  discountType: DiscountType; // data-from: PromoCode-discountType
  discountValue: number; // data-from: PromoCode-discountValue
  minSubtotal: number | null; // data-from: PromoCode-minSubtotal
  freeShippingThreshold: number | null; // data-from: PromoCode-freeShippingThreshold
  isActive: boolean; // data-from: PromoCode-isActive
}

export type PromoCode = PromoCodeDto;

export interface CartItemDto {
  id: string; // data-from: CartItem-id
  cartId: string; // data-from: CartItem-cartId
  productId: string; // data-from: CartItem-productId
  quantity: number; // data-from: CartItem-quantity
  customerId: string; // data-from: CartItem-customerId
  unitPriceSnapshot: number;
  lineSubtotal: number;
  product: ToyProductDto;
}

export type CartItem = CartItemDto;

export interface ShoppingCartStateDto {
  id: string; // data-from: ShoppingCart-id
  cartStatus: CartStatus; // data-from: ShoppingCart-cartStatus
  appliedPromo: PromoCodeDto | null;
  items: CartItemDto[];
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  totalAmount: number;
  isFreeShipping: boolean;
  remainingForFreeShipping: number;
}

export type ShoppingCartState = ShoppingCartStateDto;

export interface StorefrontCatalogResponse {
  products: ToyProductDto[];
  totalCount: number;
  featuredProduct: ToyProductDto | null;
}