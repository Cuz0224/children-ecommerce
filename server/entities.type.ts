export type AccountRole = 'CUSTOMER' | 'ADMIN';

export type ToyCategory = 'WOODEN_TOYS' | 'STEM_MAKER' | 'INFANT_PLUSH' | 'CREATIVE_BUILDING' | 'PRETEND_PLAY' | 'ART_CRAFT' | 'LEARNING' | 'OUTDOOR' | 'PLUSH';

export type ToyAgeGroup = 'AGE_0_2' | 'AGE_3_5' | 'AGE_6_8' | 'AGE_8_PLUS' | 'AGE_9_PLUS';

export type StorefrontStatus = 'HIDDEN' | 'LIVE' | 'REMOVED';

export type CartStatus = 'ACTIVE' | 'CHECKED_OUT';

export type DiscountType = 'PERCENT' | 'FIXED_AMOUNT';

export type OrderStatus = 'COMPLETED';

export type AccountUser_uniqueKey = {
  id: string; // Unique Key
};

export type AccountUser_without_PKs = {
  username: string;
  passwordHash: string;
  role: AccountRole;
  createdAt: Date;
  updatedAt: Date;
};

export type AccountUser = AccountUser_uniqueKey & AccountUser_without_PKs;



export type ToyProduct_uniqueKey = {
  id: string; // Unique Key
};

export type ToyProduct_without_PKs = {
  sku: string;
  category: ToyCategory;
  ageGroup: ToyAgeGroup;
  unitPrice: number;
  originalPrice?: number | null;
  stockCount: number;
  reorderThreshold: number;
  storefrontStatus: StorefrontStatus;
  productImage?: string | null;
  badge?: string | null;
  name?: string | null;
  subtitle?: string | null;
  description?: string | null;
  longDescription?: string | null;
  highlights: any; /// Product highlights shown as separate storefront bullets. /// ![Array<string>]
  materials?: string | null;
  safetyCertification?: string | null;
  dimensions?: string | null;
  boxIncludes: any; /// Items included in the product box. /// ![Array<string>]
  ratingAverage?: number | null;
  reviewsCount?: number | null;
  createdAt: Date;
  updatedAt: Date;
};

export type ToyProduct = ToyProduct_uniqueKey & ToyProduct_without_PKs;



export type ShoppingCart_uniqueKey = {
  id: string; // Unique Key
};

export type ShoppingCart_without_PKs = {
  customerId: string; // Foreign Key to AccountUser.id
  cartStatus: CartStatus;
  appliedPromoId?: string | null; // Foreign Key to PromoCode.id
  createdAt: Date;
  updatedAt: Date;
};

export type ShoppingCart = ShoppingCart_uniqueKey & ShoppingCart_without_PKs;



export type CartItem_uniqueKey = {
  id: string; // Unique Key
};

export type CartItem_without_PKs = {
  cartId: string; // Foreign Key to ShoppingCart.id
  productId: string; // Foreign Key to ToyProduct.id
  quantity: number;
  customerId: string; // Foreign Key to AccountUser.id
  createdAt: Date;
  updatedAt: Date;
};

export type CartItem = CartItem_uniqueKey & CartItem_without_PKs;



export type PromoCode_uniqueKey = {
  id: string; // Unique Key
};

export type PromoCode_without_PKs = {
  code: string;
  discountType: DiscountType;
  discountValue: number;
  minSubtotal?: number | null;
  freeShippingThreshold?: number | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type PromoCode = PromoCode_uniqueKey & PromoCode_without_PKs;



export type SalesOrder_uniqueKey = {
  id: string; // Unique Key
};

export type SalesOrder_without_PKs = {
  customerId: string; // Foreign Key to AccountUser.id
  sourceCartId: string; // Foreign Key to ShoppingCart.id
  orderStatus: OrderStatus;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  totalAmount: number;
  appliedPromoCode?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type SalesOrder = SalesOrder_uniqueKey & SalesOrder_without_PKs;



export type SalesOrderItem_uniqueKey = {
  id: string; // Unique Key
};

export type SalesOrderItem_without_PKs = {
  orderId: string; // Foreign Key to SalesOrder.id
  productId: string; // Foreign Key to ToyProduct.id
  quantity: number;
  unitPriceSnapshot: number;
  lineSubtotal: number;
  createdAt: Date;
  updatedAt: Date;
};

export type SalesOrderItem = SalesOrderItem_uniqueKey & SalesOrderItem_without_PKs;




export type StringFilter = {
  contains?: string;
  startsWith?: string;
  endsWith?: string;
  equals?: string;
  in?: string[];
  notIn?: string[];
  not?: string | StringFilter;
};

export type NumberFilter = {
  equals?: number;
  in?: number[];
  notIn?: number[];
  not?: number | NumberFilter;
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
};

export type DateFilter = {
  equals?: Date;
  in?: Date[];
  notIn?: Date[];
  not?: Date | DateFilter;
  lt?: Date;
  lte?: Date;
  gt?: Date;
  gte?: Date;
};

export type AccountRoleFilter = {
  equals?: AccountRole;
  in?: AccountRole[];
  notIn?: AccountRole[];
  not?: AccountRole | AccountRoleFilter;
};

export type ToyCategoryFilter = {
  equals?: ToyCategory;
  in?: ToyCategory[];
  notIn?: ToyCategory[];
  not?: ToyCategory | ToyCategoryFilter;
};

export type ToyAgeGroupFilter = {
  equals?: ToyAgeGroup;
  in?: ToyAgeGroup[];
  notIn?: ToyAgeGroup[];
  not?: ToyAgeGroup | ToyAgeGroupFilter;
};

export type StorefrontStatusFilter = {
  equals?: StorefrontStatus;
  in?: StorefrontStatus[];
  notIn?: StorefrontStatus[];
  not?: StorefrontStatus | StorefrontStatusFilter;
};

export type CartStatusFilter = {
  equals?: CartStatus;
  in?: CartStatus[];
  notIn?: CartStatus[];
  not?: CartStatus | CartStatusFilter;
};

export type DiscountTypeFilter = {
  equals?: DiscountType;
  in?: DiscountType[];
  notIn?: DiscountType[];
  not?: DiscountType | DiscountTypeFilter;
};

export type OrderStatusFilter = {
  equals?: OrderStatus;
  in?: OrderStatus[];
  notIn?: OrderStatus[];
  not?: OrderStatus | OrderStatusFilter;
};

export type filtered_AccountUser = {
  id?: string | StringFilter | null;
  username?: string | StringFilter | null;
  passwordHash?: string | StringFilter | null;
  role?: AccountRole | AccountRoleFilter | null;
  createdAt?: Date | DateFilter | null;
  updatedAt?: Date | DateFilter | null;
};

export type filtered_ToyProduct = {
  id?: string | StringFilter | null;
  sku?: string | StringFilter | null;
  category?: ToyCategory | ToyCategoryFilter | null;
  ageGroup?: ToyAgeGroup | ToyAgeGroupFilter | null;
  unitPrice?: number | NumberFilter | null;
  originalPrice?: number | NumberFilter | null;
  stockCount?: number | NumberFilter | null;
  reorderThreshold?: number | NumberFilter | null;
  storefrontStatus?: StorefrontStatus | StorefrontStatusFilter | null;
  productImage?: string | StringFilter | null;
  badge?: string | StringFilter | null;
  name?: string | StringFilter | null;
  subtitle?: string | StringFilter | null;
  description?: string | StringFilter | null;
  longDescription?: string | StringFilter | null;
  highlights?: any | null; /// Product highlights shown as separate storefront bullets. /// ![Array<string>]
  materials?: string | StringFilter | null;
  safetyCertification?: string | StringFilter | null;
  dimensions?: string | StringFilter | null;
  boxIncludes?: any | null; /// Items included in the product box. /// ![Array<string>]
  ratingAverage?: number | NumberFilter | null;
  reviewsCount?: number | NumberFilter | null;
  createdAt?: Date | DateFilter | null;
  updatedAt?: Date | DateFilter | null;
};

export type filtered_ShoppingCart = {
  id?: string | StringFilter | null;
  customerId?: string | StringFilter | null; // Foreign Key to AccountUser.id
  cartStatus?: CartStatus | CartStatusFilter | null;
  appliedPromoId?: string | StringFilter | null; // Foreign Key to PromoCode.id
  createdAt?: Date | DateFilter | null;
  updatedAt?: Date | DateFilter | null;
};

export type filtered_CartItem = {
  id?: string | StringFilter | null;
  cartId?: string | StringFilter | null; // Foreign Key to ShoppingCart.id
  productId?: string | StringFilter | null; // Foreign Key to ToyProduct.id
  quantity?: number | NumberFilter | null;
  customerId?: string | StringFilter | null; // Foreign Key to AccountUser.id
  createdAt?: Date | DateFilter | null;
  updatedAt?: Date | DateFilter | null;
};

export type filtered_PromoCode = {
  id?: string | StringFilter | null;
  code?: string | StringFilter | null;
  discountType?: DiscountType | DiscountTypeFilter | null;
  discountValue?: number | NumberFilter | null;
  minSubtotal?: number | NumberFilter | null;
  freeShippingThreshold?: number | NumberFilter | null;
  isActive?: boolean | null;
  createdAt?: Date | DateFilter | null;
  updatedAt?: Date | DateFilter | null;
};

export type filtered_SalesOrder = {
  id?: string | StringFilter | null;
  customerId?: string | StringFilter | null; // Foreign Key to AccountUser.id
  sourceCartId?: string | StringFilter | null; // Foreign Key to ShoppingCart.id
  orderStatus?: OrderStatus | OrderStatusFilter | null;
  subtotal?: number | NumberFilter | null;
  discountAmount?: number | NumberFilter | null;
  shippingFee?: number | NumberFilter | null;
  totalAmount?: number | NumberFilter | null;
  appliedPromoCode?: string | StringFilter | null;
  createdAt?: Date | DateFilter | null;
  updatedAt?: Date | DateFilter | null;
};

export type filtered_SalesOrderItem = {
  id?: string | StringFilter | null;
  orderId?: string | StringFilter | null; // Foreign Key to SalesOrder.id
  productId?: string | StringFilter | null; // Foreign Key to ToyProduct.id
  quantity?: number | NumberFilter | null;
  unitPriceSnapshot?: number | NumberFilter | null;
  lineSubtotal?: number | NumberFilter | null;
  createdAt?: Date | DateFilter | null;
  updatedAt?: Date | DateFilter | null;
};

export type Entities = {
  accountuser: {
    Create(data: AccountUser): Promise<AccountUser | null>;
    Get(args: AccountUser_uniqueKey): Promise<AccountUser | null>;
    GetAll(args?: filtered_AccountUser): Promise<AccountUser[]>;
    GetPage(pageNumber?: number, pageSize?: number, args?: filtered_AccountUser): Promise<AccountUser[]>;
    Count(args?: filtered_AccountUser): Promise<number>;
    Update(args: { where: AccountUser_uniqueKey; data: AccountUser_without_PKs }): Promise<AccountUser | null>;
    Delete(args: AccountUser_uniqueKey): Promise<AccountUser | null>;
  };
  toyproduct: {
    Create(data: ToyProduct): Promise<ToyProduct | null>;
    Get(args: ToyProduct_uniqueKey): Promise<ToyProduct | null>;
    GetAll(args?: filtered_ToyProduct): Promise<ToyProduct[]>;
    GetPage(pageNumber?: number, pageSize?: number, args?: filtered_ToyProduct): Promise<ToyProduct[]>;
    Count(args?: filtered_ToyProduct): Promise<number>;
    Update(args: { where: ToyProduct_uniqueKey; data: ToyProduct_without_PKs }): Promise<ToyProduct | null>;
    Delete(args: ToyProduct_uniqueKey): Promise<ToyProduct | null>;
  };
  shoppingcart: {
    Create(data: ShoppingCart): Promise<ShoppingCart | null>;
    Get(args: ShoppingCart_uniqueKey): Promise<ShoppingCart | null>;
    GetAll(args?: filtered_ShoppingCart): Promise<ShoppingCart[]>;
    GetPage(pageNumber?: number, pageSize?: number, args?: filtered_ShoppingCart): Promise<ShoppingCart[]>;
    Count(args?: filtered_ShoppingCart): Promise<number>;
    Update(args: { where: ShoppingCart_uniqueKey; data: ShoppingCart_without_PKs }): Promise<ShoppingCart | null>;
    Delete(args: ShoppingCart_uniqueKey): Promise<ShoppingCart | null>;
  };
  cartitem: {
    Create(data: CartItem): Promise<CartItem | null>;
    Get(args: CartItem_uniqueKey): Promise<CartItem | null>;
    GetAll(args?: filtered_CartItem): Promise<CartItem[]>;
    GetPage(pageNumber?: number, pageSize?: number, args?: filtered_CartItem): Promise<CartItem[]>;
    Count(args?: filtered_CartItem): Promise<number>;
    Update(args: { where: CartItem_uniqueKey; data: CartItem_without_PKs }): Promise<CartItem | null>;
    Delete(args: CartItem_uniqueKey): Promise<CartItem | null>;
  };
  promocode: {
    Create(data: PromoCode): Promise<PromoCode | null>;
    Get(args: PromoCode_uniqueKey): Promise<PromoCode | null>;
    GetAll(args?: filtered_PromoCode): Promise<PromoCode[]>;
    GetPage(pageNumber?: number, pageSize?: number, args?: filtered_PromoCode): Promise<PromoCode[]>;
    Count(args?: filtered_PromoCode): Promise<number>;
    Update(args: { where: PromoCode_uniqueKey; data: PromoCode_without_PKs }): Promise<PromoCode | null>;
    Delete(args: PromoCode_uniqueKey): Promise<PromoCode | null>;
  };
  salesorder: {
    Create(data: SalesOrder): Promise<SalesOrder | null>;
    Get(args: SalesOrder_uniqueKey): Promise<SalesOrder | null>;
    GetAll(args?: filtered_SalesOrder): Promise<SalesOrder[]>;
    GetPage(pageNumber?: number, pageSize?: number, args?: filtered_SalesOrder): Promise<SalesOrder[]>;
    Count(args?: filtered_SalesOrder): Promise<number>;
    Update(args: { where: SalesOrder_uniqueKey; data: SalesOrder_without_PKs }): Promise<SalesOrder | null>;
    Delete(args: SalesOrder_uniqueKey): Promise<SalesOrder | null>;
  };
  salesorderitem: {
    Create(data: SalesOrderItem): Promise<SalesOrderItem | null>;
    Get(args: SalesOrderItem_uniqueKey): Promise<SalesOrderItem | null>;
    GetAll(args?: filtered_SalesOrderItem): Promise<SalesOrderItem[]>;
    GetPage(pageNumber?: number, pageSize?: number, args?: filtered_SalesOrderItem): Promise<SalesOrderItem[]>;
    Count(args?: filtered_SalesOrderItem): Promise<number>;
    Update(args: { where: SalesOrderItem_uniqueKey; data: SalesOrderItem_without_PKs }): Promise<SalesOrderItem | null>;
    Delete(args: SalesOrderItem_uniqueKey): Promise<SalesOrderItem | null>;
  };
};

