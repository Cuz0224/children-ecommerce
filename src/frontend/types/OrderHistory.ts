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

export type OrderStatus = "COMPLETED";

export interface ToyOrderItemSnapshot {
  id: string; // data-from: SalesOrderItem-id
  orderId: string; // data-from: SalesOrderItem-orderId
  productId: string; // data-from: SalesOrderItem-productId
  productName: string; // data-from: ToyProduct-name
  productSubtitle: string | null; // data-from: ToyProduct-subtitle
  productImage: string | null; // data-from: ToyProduct-productImage data-role: image_url
  category: ToyCategory; // data-from: ToyProduct-category
  quantity: number; // data-from: SalesOrderItem-quantity
  unitPriceSnapshot: number; // data-from: SalesOrderItem-unitPriceSnapshot
  lineSubtotal: number; // data-from: SalesOrderItem-lineSubtotal
  createdAt: Date; // data-from: SalesOrderItem-createdAt
  updatedAt: Date; // data-from: SalesOrderItem-updatedAt
}

export interface SalesOrderSnapshot {
  id: string; // data-from: SalesOrder-id
  orderNumber: string;
  customerId: string; // data-from: SalesOrder-customerId
  sourceCartId: string; // data-from: SalesOrder-sourceCartId
  orderStatus: OrderStatus; // data-from: SalesOrder-orderStatus
  subtotal: number; // data-from: SalesOrder-subtotal
  discountAmount: number; // data-from: SalesOrder-discountAmount
  shippingFee: number; // data-from: SalesOrder-shippingFee
  totalAmount: number; // data-from: SalesOrder-totalAmount
  appliedPromoCode: string | null; // data-from: SalesOrder-appliedPromoCode
  itemCount: number;
  items: ToyOrderItemSnapshot[];
  createdAt: Date; // data-from: SalesOrder-createdAt
  updatedAt: Date; // data-from: SalesOrder-updatedAt
}

export interface OrderFilterState {
  searchQuery: string;
  yearFilter: string;
  hasPromoOnly: boolean;
}