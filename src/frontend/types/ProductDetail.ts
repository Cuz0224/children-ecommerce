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

export type ToyAgeGroup =
  | "AGE_0_2"
  | "AGE_3_5"
  | "AGE_6_8"
  | "AGE_8_PLUS"
  | "AGE_9_PLUS";

export type StorefrontStatus = "HIDDEN" | "LIVE" | "REMOVED";

export type CartStatus = "ACTIVE" | "CHECKED_OUT";

export type DiscountType = "PERCENT" | "FIXED_AMOUNT";

export type AccountRole = "CUSTOMER" | "ADMIN";

// UI aliases
export type CategoryType = ToyCategory;
export type AgeGroupType = ToyAgeGroup;
export type StorefrontStatusType = StorefrontStatus;
export type UserRole = "GUEST" | "CUSTOMER" | "ADMIN";

export interface ToyProductDetailView {
  id: string; // data-from: ToyProduct-id
  sku: string; // data-from: ToyProduct-sku
  category: ToyCategory; // data-from: ToyProduct-category
  ageGroup: ToyAgeGroup; // data-from: ToyProduct-ageGroup
  unitPrice: number; // data-from: ToyProduct-unitPrice
  originalPrice: number | null; // data-from: ToyProduct-originalPrice
  stockCount: number; // data-from: ToyProduct-stockCount
  reorderThreshold: number; // data-from: ToyProduct-reorderThreshold
  storefrontStatus: StorefrontStatus; // data-from: ToyProduct-storefrontStatus
  productImage: string | null; // data-from: ToyProduct-productImage data-role: image_url
  badge: string | null; // data-from: ToyProduct-badge
  name: string; // data-from: ToyProduct-name
  subtitle: string | null; // data-from: ToyProduct-subtitle
  description: string | null; // data-from: ToyProduct-description
  longDescription: string | null; // data-from: ToyProduct-longDescription
  highlights: string[]; // data-from: ToyProduct-highlights
  materials: string | null; // data-from: ToyProduct-materials
  safetyCertification: string | null; // data-from: ToyProduct-safetyCertification
  dimensions: string | null; // data-from: ToyProduct-dimensions
  boxIncludes: string[]; // data-from: ToyProduct-boxIncludes
  ratingAverage: number | null; // data-from: ToyProduct-ratingAverage
  reviewsCount: number | null; // data-from: ToyProduct-reviewsCount
  galleryViews?: {
    id: string;
    label: string;
    keywords: string;
    description: string;
  }[];
  developmentalSkills?: {
    title: string;
    description: string;
    iconType: "brain" | "blocks" | "palette" | "sparkles" | "shield" | "heart";
    tag: string;
  }[];
  createdAt: Date; // data-from: ToyProduct-createdAt
  updatedAt: Date; // data-from: ToyProduct-updatedAt
}

export type ToyProduct = ToyProductDetailView;

export interface PromoCodeDetailView {
  id: string; // data-from: PromoCode-id
  code: string; // data-from: PromoCode-code
  discountType: DiscountType; // data-from: PromoCode-discountType
  discountValue: number; // data-from: PromoCode-discountValue
  minSubtotal: number | null; // data-from: PromoCode-minSubtotal
  freeShippingThreshold: number | null; // data-from: PromoCode-freeShippingThreshold
  isActive: boolean; // data-from: PromoCode-isActive
  description?: string;
}

export type PromoCode = PromoCodeDetailView;

export interface CartItemDetailView {
  id: string; // data-from: CartItem-id
  cartId: string; // data-from: CartItem-cartId
  productId: string; // data-from: CartItem-productId
  quantity: number; // data-from: CartItem-quantity
  customerId: string; // data-from: CartItem-customerId
  createdAt: Date; // data-from: CartItem-createdAt
  updatedAt: Date; // data-from: CartItem-updatedAt
  product: ToyProductDetailView;
  lineSubtotal: number;
}

export type CartItem = CartItemDetailView;

export interface ShoppingCartDetailView {
  id: string; // data-from: ShoppingCart-id
  customerId: string; // data-from: ShoppingCart-customerId
  cartStatus: CartStatus; // data-from: ShoppingCart-cartStatus
  appliedPromoId: string | null; // data-from: ShoppingCart-appliedPromoId
  appliedPromo: PromoCodeDetailView | null;
  items: CartItemDetailView[];
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  totalAmount: number;
  createdAt: Date; // data-from: ShoppingCart-createdAt
  updatedAt: Date; // data-from: ShoppingCart-updatedAt
}

export type ShoppingCart = ShoppingCartDetailView;

export const CATEGORY_LABELS: Record<ToyCategory, string> = {
  WOODEN_TOYS: "Wooden Toys & Puzzles",
  STEM_MAKER: "STEM & Science Explorer",
  INFANT_PLUSH: "Infant & Soft Plush",
  CREATIVE_BUILDING: "Creative Building Bricks",
  PRETEND_PLAY: "Pretend Play & Kitchen",
  ART_CRAFT: "Art & DIY Crafts",
  LEARNING: "Early Learning & Books",
  OUTDOOR: "Outdoor & Active Play",
  PLUSH: "Stuffed Animals & Cuddles",
};

export const AGE_GROUP_LABELS: Record<ToyAgeGroup, string> = {
  AGE_0_2: "Ages 0-2 (Baby & Toddler)",
  AGE_3_5: "Ages 3-5 (Preschool Explorer)",
  AGE_6_8: "Ages 6-8 (Early Builder)",
  AGE_8_PLUS: "Ages 8+ (Master Builder)",
  AGE_9_PLUS: "Ages 9+ (Advanced STEM)",
};