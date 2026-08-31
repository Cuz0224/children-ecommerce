'use server';

import prisma from '@/tools/prisma';
import {
  withResult,
  requireAuth,
  tryGetAuthContext,
  getAuthContext,
  UnauthorizedError,
} from '@/frontend/action_utils';
import type {
  ToyProductDto,
  ToyCategory,
  ToyAgeGroup,
  StorefrontStatus,
  CartStatus,
  DiscountType,
  SortOption,
  PromoCodeDto,
  CartItemDto,
  ShoppingCartStateDto,
  StorefrontCatalogResponse
} from '@/frontend/types/StorefrontHome';

// Helper: map database ToyCategory to human label
function getCategoryLabel(category: ToyCategory): string {
  switch (category) {
    case 'PLUSH':
    case 'INFANT_PLUSH':
      return 'Plush Buddies';
    case 'STEM_MAKER':
    case 'CREATIVE_BUILDING':
      return 'STEM & Building';
    case 'LEARNING':
    case 'WOODEN_TOYS':
      return 'Learning & Brain';
    case 'OUTDOOR':
      return 'Outdoor Active';
    case 'ART_CRAFT':
      return 'Art & Craft';
    case 'PRETEND_PLAY':
      return 'Pretend Play';
    default:
      return 'Toys';
  }
}

// Helper: map database ToyAgeGroup to human label
function getAgeGroupLabel(ageGroup: ToyAgeGroup): string {
  switch (ageGroup) {
    case 'AGE_0_2':
      return '0-2 yrs';
    case 'AGE_3_5':
      return '3-5 yrs';
    case 'AGE_6_8':
      return '6-8 yrs';
    case 'AGE_8_PLUS':
      return '8+ yrs';
    case 'AGE_9_PLUS':
      return '9+ yrs';
    default:
      return 'All Ages';
  }
}

// Helper: transform raw ToyProduct database model to ToyProductDto
function formatToyProduct(item: any): ToyProductDto {
  const stockCount = item.stockCount ?? 0;
  const reorderThreshold = item.reorderThreshold ?? 5;
  let stockStatus: "In Stock" | "Only 3 Left" | "Low Stock" | "Backorder" = "In Stock";
  if (stockCount <= 0) {
    stockStatus = "Backorder";
  } else if (stockCount <= 3) {
    stockStatus = "Only 3 Left";
  } else if (stockCount <= reorderThreshold) {
    stockStatus = "Low Stock";
  }

  const highlights = Array.isArray(item.highlights)
    ? (item.highlights as string[])
    : typeof item.highlights === 'string'
    ? JSON.parse(item.highlights || '[]')
    : [];

  const boxIncludes = Array.isArray(item.boxIncludes)
    ? (item.boxIncludes as string[])
    : typeof item.boxIncludes === 'string'
    ? JSON.parse(item.boxIncludes || '[]')
    : [];

  const category = item.category as ToyCategory;
  const ageGroup = item.ageGroup as ToyAgeGroup;

  return {
    id: item.id, // data-from: ToyProduct-id
    sku: item.sku, // data-from: ToyProduct-sku
    name: item.name ?? '', // data-from: ToyProduct-name
    subtitle: item.subtitle ?? '', // data-from: ToyProduct-subtitle
    category, // data-from: ToyProduct-category
    categoryLabel: getCategoryLabel(category),
    ageGroup, // data-from: ToyProduct-ageGroup
    ageLabel: getAgeGroupLabel(ageGroup),
    unitPrice: item.unitPrice ? item.unitPrice.toNumber() : 0, // data-from: ToyProduct-unitPrice
    originalPrice: item.originalPrice ? item.originalPrice.toNumber() : null, // data-from: ToyProduct-originalPrice
    ratingAverage: item.ratingAverage ? item.ratingAverage.toNumber() : 5.0, // data-from: ToyProduct-ratingAverage
    reviewsCount: item.reviewsCount ?? 0, // data-from: ToyProduct-reviewsCount
    badge: item.badge ?? null, // data-from: ToyProduct-badge
    storefrontStatus: item.storefrontStatus as StorefrontStatus, // data-from: ToyProduct-storefrontStatus
    productImage: item.productImage ?? null, // data-from: ToyProduct-productImage data-role: image_url
    description: item.description ?? '', // data-from: ToyProduct-description
    longDescription: item.longDescription ?? '', // data-from: ToyProduct-longDescription
    highlights, // data-from: ToyProduct-highlights
    materials: item.materials ?? null, // data-from: ToyProduct-materials
    safetyCertification: item.safetyCertification ?? null, // data-from: ToyProduct-safetyCertification
    dimensions: item.dimensions ?? null, // data-from: ToyProduct-dimensions
    boxIncludes, // data-from: ToyProduct-boxIncludes
    stockCount: item.stockCount ?? 0, // data-from: ToyProduct-stockCount
    reorderThreshold: item.reorderThreshold ?? 0, // data-from: ToyProduct-reorderThreshold
    specs: {
      materials: item.materials ?? 'Hypoallergenic Organic Materials',
      safetyCertification: item.safetyCertification ?? 'EU CE & ASTM F963 Certified',
      dimensions: item.dimensions ?? 'Standard Toy Dimensions',
      boxIncludes: boxIncludes.length > 0 ? boxIncludes : ['1x Toy Unit', '1x User Guide'],
      stockStatus,
      stockCount: item.stockCount ?? 0,
    },
  };
}

// Helper: calculate derived cart financial state
function calculateCartState(
  cartId: string,
  rawItems: any[],
  appliedPromoRecord: any | null
): ShoppingCartStateDto {
  const items: CartItemDto[] = rawItems.map((ci) => {
    const productDto = formatToyProduct(ci.product);
    const unitPriceSnapshot = productDto.unitPrice;
    const lineSubtotal = unitPriceSnapshot * ci.quantity;
    return {
      id: ci.id, // data-from: CartItem-id
      cartId: ci.cartId, // data-from: CartItem-cartId
      productId: ci.productId, // data-from: CartItem-productId
      quantity: ci.quantity, // data-from: CartItem-quantity
      customerId: ci.customerId, // data-from: CartItem-customerId
      unitPriceSnapshot,
      lineSubtotal,
      product: productDto,
    };
  });

  const subtotal = items.reduce((sum, item) => sum + item.lineSubtotal, 0);

  let appliedPromo: PromoCodeDto | null = null;
  let discountAmount = 0;

  if (appliedPromoRecord && appliedPromoRecord.isActive) {
    const discountVal = appliedPromoRecord.discountValue ? appliedPromoRecord.discountValue.toNumber() : 0;
    const minSub = appliedPromoRecord.minSubtotal ? appliedPromoRecord.minSubtotal.toNumber() : null;
    const freeShipThresh = appliedPromoRecord.freeShippingThreshold ? appliedPromoRecord.freeShippingThreshold.toNumber() : null;

    appliedPromo = {
      id: appliedPromoRecord.id, // data-from: PromoCode-id
      code: appliedPromoRecord.code, // data-from: PromoCode-code
      discountType: appliedPromoRecord.discountType as DiscountType, // data-from: PromoCode-discountType
      discountValue: discountVal, // data-from: PromoCode-discountValue
      minSubtotal: minSub, // data-from: PromoCode-minSubtotal
      freeShippingThreshold: freeShipThresh, // data-from: PromoCode-freeShippingThreshold
      isActive: appliedPromoRecord.isActive, // data-from: PromoCode-isActive
    };

    if (minSub === null || subtotal >= minSub) {
      if (appliedPromoRecord.discountType === 'PERCENT') {
        discountAmount = (subtotal * discountVal) / 100;
      } else {
        discountAmount = discountVal;
      }
      // Discount is capped at subtotal
      discountAmount = Math.min(subtotal, discountAmount);
    }
  }

  const effectiveSubtotal = Math.max(0, subtotal - discountAmount);
  const freeShippingThreshold = appliedPromo?.freeShippingThreshold ?? 45;
  const isFreeShipping = items.length > 0 && effectiveSubtotal >= freeShippingThreshold;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - effectiveSubtotal);
  const shippingFee = items.length === 0 ? 0 : isFreeShipping ? 0 : 4.99;
  const totalAmount = Math.max(0, effectiveSubtotal + shippingFee);

  return {
    id: cartId, // data-from: ShoppingCart-id
    cartStatus: 'ACTIVE' as CartStatus, // data-from: ShoppingCart-cartStatus
    appliedPromo,
    items,
    subtotal,
    discountAmount,
    shippingFee,
    totalAmount,
    isFreeShipping,
    remainingForFreeShipping,
  };
}

/**
 * Action: getStorefrontCatalog
 * Fetches all LIVE toy products excluding HIDDEN and REMOVED.
 * Applies category, age group, search, and sorting.
 */
export async function getStorefrontCatalog(params?: {
  category?: ToyCategory | 'all';
  ageGroup?: ToyAgeGroup | 'all';
  search?: string;
  sort?: SortOption;
}): Promise<StorefrontCatalogResponse> {
  return withResult(async () => {
    const whereCondition: any = {
      storefrontStatus: 'LIVE',
    };

    if (params?.category && params.category !== 'all') {
      whereCondition.category = params.category;
    }

    if (params?.ageGroup && params.ageGroup !== 'all') {
      whereCondition.ageGroup = params.ageGroup;
    }

    if (params?.search && params.search.trim() !== '') {
      const q = params.search.trim();
      whereCondition.OR = [
        { name: { contains: q } },
        { description: { contains: q } },
        { subtitle: { contains: q } },
        { sku: { contains: q } },
      ];
    }

    let orderBy: any = { createdAt: 'desc' };
    if (params?.sort === 'price-asc') {
      orderBy = { unitPrice: 'asc' };
    } else if (params?.sort === 'price-desc') {
      orderBy = { unitPrice: 'desc' };
    } else if (params?.sort === 'rating') {
      orderBy = { ratingAverage: 'desc' };
    } else if (params?.sort === 'bestselling') {
      orderBy = { reviewsCount: 'desc' };
    }

    const rawProducts = await prisma.toyProduct.findMany({
      where: whereCondition,
      orderBy,
    });

    const products = rawProducts.map(formatToyProduct);

    // Pick top featured product (e.g. first bestseller or first item)
    const featuredProduct = products.length > 0 ? products[0] : null;

    return {
      products,
      totalCount: products.length,
      featuredProduct,
    };
  })();
}

/**
 * Action: getCartState
 * Retrieves active customer shopping cart with items and applied promotion.
 * If user is a Guest, returns an empty initial state.
 */
export async function getCartState(): Promise<ShoppingCartStateDto> {
  return withResult(async () => {
    const authContext = tryGetAuthContext();
    if (!authContext || !authContext.userId) {
      return {
        id: 'guest-cart',
        cartStatus: 'ACTIVE' as CartStatus,
        appliedPromo: null,
        items: [],
        subtotal: 0,
        discountAmount: 0,
        shippingFee: 0,
        totalAmount: 0,
        isFreeShipping: false,
        remainingForFreeShipping: 45,
      };
    }

    // Find or create active cart for authenticated customer
    let cart = await prisma.shoppingCart.findFirst({
      where: {
        customerId: authContext.userId,
        cartStatus: 'ACTIVE',
      },
      include: {
        appliedPromo: true,
        cartItems: {
          include: {
            product: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });

    if (!cart) {
      cart = await prisma.shoppingCart.create({
        data: {
          customerId: authContext.userId,
          cartStatus: 'ACTIVE',
        },
        include: {
          appliedPromo: true,
          cartItems: {
            include: {
              product: true,
            },
          },
        },
      });
    }

    return calculateCartState(cart.id, cart.cartItems, cart.appliedPromo);
  })();
}

/**
 * Action: addToCart
 * Adds a LIVE toy product to the customer's ACTIVE shopping cart.
 * Unauthenticated guests will encounter UnauthorizedError to trigger login flow.
 */
export async function addToCart(input: {
  productId: string;
  quantity: number;
}): Promise<ShoppingCartStateDto> {
  return withResult(async () => {
    const auth = getAuthContext();
    if (!auth || !auth.userId) {
      throw new UnauthorizedError('Please log in as a customer to add items to your cart.');
    }

    const product = await prisma.toyProduct.findUnique({
      where: { id: input.productId },
    });

    if (!product || product.storefrontStatus === 'REMOVED') {
      throw new Error('This toy product is no longer available for purchase.');
    }

    const qtyToAdd = Math.max(1, input.quantity);

    // Find or create customer ACTIVE cart
    let cart = await prisma.shoppingCart.findFirst({
      where: {
        customerId: auth.userId,
        cartStatus: 'ACTIVE',
      },
    });

    if (!cart) {
      cart = await prisma.shoppingCart.create({
        data: {
          customerId: auth.userId,
          cartStatus: 'ACTIVE',
        },
      });
    }

    // Check if item already exists in cart
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: input.productId,
      },
    });

    if (existingItem) {
      const newQty = Math.min(product.stockCount, existingItem.quantity + qtyToAdd);
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: newQty },
      });
    } else {
      const initialQty = Math.min(product.stockCount, qtyToAdd);
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: input.productId,
          quantity: initialQty,
          customerId: auth.userId,
        },
      });
    }

    // Return refreshed cart
    const refreshedCart = await prisma.shoppingCart.findUniqueOrThrow({
      where: { id: cart.id },
      include: {
        appliedPromo: true,
        cartItems: {
          include: { product: true },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    return calculateCartState(refreshedCart.id, refreshedCart.cartItems, refreshedCart.appliedPromo);
  })();
}

/**
 * Action: updateCartItemQuantity
 * Updates requested quantity for an item in the customer's ACTIVE cart.
 */
export async function updateCartItemQuantity(input: {
  productId: string;
  quantity: number;
}): Promise<ShoppingCartStateDto> {
  return withResult(async () => {
    const auth = getAuthContext();
    if (!auth || !auth.userId) {
      throw new UnauthorizedError('Please log in first.');
    }

    const cart = await prisma.shoppingCart.findFirst({
      where: {
        customerId: auth.userId,
        cartStatus: 'ACTIVE',
      },
    });

    if (!cart) {
      throw new Error('Active shopping cart not found.');
    }

    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: input.productId,
      },
      include: { product: true },
    });

    if (existingItem) {
      if (input.quantity <= 0) {
        await prisma.cartItem.delete({
          where: { id: existingItem.id },
        });
      } else {
        const cappedQty = Math.min(existingItem.product.stockCount, input.quantity);
        await prisma.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: cappedQty },
        });
      }
    }

    const refreshedCart = await prisma.shoppingCart.findUniqueOrThrow({
      where: { id: cart.id },
      include: {
        appliedPromo: true,
        cartItems: {
          include: { product: true },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    return calculateCartState(refreshedCart.id, refreshedCart.cartItems, refreshedCart.appliedPromo);
  })();
}

/**
 * Action: removeCartItem
 * Removes a single item from the customer's ACTIVE cart.
 */
export async function removeCartItem(input: {
  productId: string;
}): Promise<ShoppingCartStateDto> {
  return withResult(async () => {
    const auth = getAuthContext();
    if (!auth || !auth.userId) {
      throw new UnauthorizedError('Please log in first.');
    }

    const cart = await prisma.shoppingCart.findFirst({
      where: {
        customerId: auth.userId,
        cartStatus: 'ACTIVE',
      },
    });

    if (!cart) {
      throw new Error('Active shopping cart not found.');
    }

    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: input.productId,
      },
    });

    if (existingItem) {
      await prisma.cartItem.delete({
        where: { id: existingItem.id },
      });
    }

    const refreshedCart = await prisma.shoppingCart.findUniqueOrThrow({
      where: { id: cart.id },
      include: {
        appliedPromo: true,
        cartItems: {
          include: { product: true },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    return calculateCartState(refreshedCart.id, refreshedCart.cartItems, refreshedCart.appliedPromo);
  })();
}

/**
 * Action: clearCart
 * Clears all cart items from the customer's ACTIVE cart and resets applied promo.
 */
export async function clearCart(): Promise<ShoppingCartStateDto> {
  return withResult(async () => {
    const auth = getAuthContext();
    if (!auth || !auth.userId) {
      throw new UnauthorizedError('Please log in first.');
    }

    const cart = await prisma.shoppingCart.findFirst({
      where: {
        customerId: auth.userId,
        cartStatus: 'ACTIVE',
      },
    });

    if (cart) {
      await prisma.cartItem.deleteMany({
        where: { cartId: cart.id },
      });

      await prisma.shoppingCart.update({
        where: { id: cart.id },
        data: { appliedPromoId: null },
      });
    }

    return {
      id: cart?.id ?? 'cart-active',
      cartStatus: 'ACTIVE' as CartStatus,
      appliedPromo: null,
      items: [],
      subtotal: 0,
      discountAmount: 0,
      shippingFee: 0,
      totalAmount: 0,
      isFreeShipping: false,
      remainingForFreeShipping: 45,
    };
  })();
}

/**
 * Action: applyPromoCode
 * Applies a valid active promo code case-insensitively to the customer's ACTIVE cart.
 */
export async function applyPromoCode(input: {
  code: string;
}): Promise<ShoppingCartStateDto> {
  return withResult(async () => {
    const auth = getAuthContext();
    if (!auth || !auth.userId) {
      throw new UnauthorizedError('Please log in first.');
    }

    const cleanCode = input.code.trim().toUpperCase();
    const allPromos = await prisma.promoCode.findMany({
      where: {
        isActive: true,
      },
    });

    const promo = allPromos.find((p) => p.code.toUpperCase() === cleanCode);

    if (!promo) {
      throw new Error(`Promo code "${input.code}" is invalid or expired.`);
    }

    const cart = await prisma.shoppingCart.findFirst({
      where: {
        customerId: auth.userId,
        cartStatus: 'ACTIVE',
      },
      include: {
        cartItems: {
          include: { product: true },
        },
      },
    });

    if (!cart) {
      throw new Error('Active shopping cart not found.');
    }

    const subtotal = cart.cartItems.reduce(
      (sum, item) => sum + (item.product.unitPrice ? item.product.unitPrice.toNumber() : 0) * item.quantity,
      0
    );

    if (promo.minSubtotal) {
      const minSub = promo.minSubtotal.toNumber();
      if (subtotal < minSub) {
        throw new Error(`Coupon "${promo.code}" requires a minimum subtotal of $${minSub.toFixed(2)}.`);
      }
    }

    await prisma.shoppingCart.update({
      where: { id: cart.id },
      data: { appliedPromoId: promo.id },
    });

    const refreshedCart = await prisma.shoppingCart.findUniqueOrThrow({
      where: { id: cart.id },
      include: {
        appliedPromo: true,
        cartItems: {
          include: { product: true },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    return calculateCartState(refreshedCart.id, refreshedCart.cartItems, refreshedCart.appliedPromo);
  })();
}

/**
 * Action: removePromoCode
 * Removes the currently applied promo code from the customer's ACTIVE cart.
 */
export async function removePromoCode(): Promise<ShoppingCartStateDto> {
  return withResult(async () => {
    const auth = getAuthContext();
    if (!auth || !auth.userId) {
      throw new UnauthorizedError('Please log in first.');
    }

    const cart = await prisma.shoppingCart.findFirst({
      where: {
        customerId: auth.userId,
        cartStatus: 'ACTIVE',
      },
    });

    if (!cart) {
      throw new Error('Active shopping cart not found.');
    }

    await prisma.shoppingCart.update({
      where: { id: cart.id },
      data: { appliedPromoId: null },
    });

    const refreshedCart = await prisma.shoppingCart.findUniqueOrThrow({
      where: { id: cart.id },
      include: {
        appliedPromo: true,
        cartItems: {
          include: { product: true },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    return calculateCartState(refreshedCart.id, refreshedCart.cartItems, refreshedCart.appliedPromo);
  })();
}