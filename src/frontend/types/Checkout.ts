export type AccountRole = "CUSTOMER" | "ADMIN";

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

export type OrderStatus = "COMPLETED";

/// Canonical Prisma Json type for highlights
/// ![Array<string>]
export type ToyProductHighlights = string[];

/// Canonical Prisma Json type for boxIncludes
/// ![Array<string>]
export type ToyProductBoxIncludes = string[];

export interface ToyProductDto {
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
  highlights: ToyProductHighlights; // data-from: ToyProduct-highlights
  materials: string | null; // data-from: ToyProduct-materials
  safetyCertification: string | null; // data-from: ToyProduct-safetyCertification
  dimensions: string | null; // data-from: ToyProduct-dimensions
  boxIncludes: ToyProductBoxIncludes; // data-from: ToyProduct-boxIncludes
  ratingAverage: number | null; // data-from: ToyProduct-ratingAverage
  reviewsCount: number | null; // data-from: ToyProduct-reviewsCount
  createdAt: Date; // data-from: ToyProduct-createdAt
  updatedAt: Date; // data-from: ToyProduct-updatedAt
}

export interface CartItemDto {
  id: string; // data-from: CartItem-id
  cartId: string; // data-from: CartItem-cartId
  productId: string; // data-from: CartItem-productId
  quantity: number; // data-from: CartItem-quantity
  customerId: string; // data-from: CartItem-customerId
  createdAt: Date; // data-from: CartItem-createdAt
  updatedAt: Date; // data-from: CartItem-updatedAt
  product: ToyProductDto;
  lineSubtotal: number;
  isLive: boolean;
  hasSufficientStock: boolean;
}

export interface PromoCodeDto {
  id: string; // data-from: PromoCode-id
  code: string; // data-from: PromoCode-code
  discountType: DiscountType; // data-from: PromoCode-discountType
  discountValue: number; // data-from: PromoCode-discountValue
  minSubtotal: number | null; // data-from: PromoCode-minSubtotal
  freeShippingThreshold: number | null; // data-from: PromoCode-freeShippingThreshold
  isActive: boolean; // data-from: PromoCode-isActive
  createdAt: Date; // data-from: PromoCode-createdAt
  updatedAt: Date; // data-from: PromoCode-updatedAt
  description: string;
}

export interface ShoppingCartDto {
  id: string; // data-from: ShoppingCart-id
  customerId: string; // data-from: ShoppingCart-customerId
  cartStatus: CartStatus; // data-from: ShoppingCart-cartStatus
  appliedPromoId: string | null; // data-from: ShoppingCart-appliedPromoId
  createdAt: Date; // data-from: ShoppingCart-createdAt
  updatedAt: Date; // data-from: ShoppingCart-updatedAt
  items: CartItemDto[];
  appliedPromo: PromoCodeDto | null;
}

export interface SalesOrderItemDto {
  id: string; // data-from: SalesOrderItem-id
  orderId: string; // data-from: SalesOrderItem-orderId
  productId: string; // data-from: SalesOrderItem-productId
  quantity: number; // data-from: SalesOrderItem-quantity
  unitPriceSnapshot: number; // data-from: SalesOrderItem-unitPriceSnapshot
  lineSubtotal: number; // data-from: SalesOrderItem-lineSubtotal
  productName: string;
  productSku: string;
  productImage: string | null; // data-role: image_url
  category: ToyCategory;
  createdAt: Date; // data-from: SalesOrderItem-createdAt
  updatedAt: Date; // data-from: SalesOrderItem-updatedAt
}

export interface SalesOrderDto {
  id: string; // data-from: SalesOrder-id
  customerId: string; // data-from: SalesOrder-customerId
  sourceCartId: string; // data-from: SalesOrder-sourceCartId
  orderStatus: OrderStatus; // data-from: SalesOrder-orderStatus
  subtotal: number; // data-from: SalesOrder-subtotal
  discountAmount: number; // data-from: SalesOrder-discountAmount
  shippingFee: number; // data-from: SalesOrder-shippingFee
  totalAmount: number; // data-from: SalesOrder-totalAmount
  appliedPromoCode: string | null; // data-from: SalesOrder-appliedPromoCode
  createdAt: Date; // data-from: SalesOrder-createdAt
  updatedAt: Date; // data-from: SalesOrder-updatedAt
  items: SalesOrderItemDto[];
}

export interface CheckoutCalculation {
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  totalAmount: number;
  freeShippingThreshold: number;
  amountToFreeShipping: number;
  isFreeShipping: boolean;
  hasStockIssue: boolean;
  invalidItemsCount: number;
  appliedPromo: PromoCodeDto | null;
}

export interface CheckoutPageData {
  cart: ShoppingCartDto | null;
  calculation: CheckoutCalculation;
  availablePromos: PromoCodeDto[];
}

// UI Compatibility Aliases
export type ToyProduct = ToyProductDto;
export type CartItem = CartItemDto;
export type PromoCode = PromoCodeDto;
export type ShoppingCart = ShoppingCartDto;
export type SalesOrder = SalesOrderDto;
export type SalesOrderItem = SalesOrderItemDto;
export type AgeGroup = ToyAgeGroup;