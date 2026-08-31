'use server';

import prisma from '@/tools/prisma';
import {
  withResult,
  tryGetAuthContext,
  requireAuth,
  getUserId,
} from '@/frontend/action_utils';
import {
  ToyProductDetailView,
  ShoppingCartDetailView,
  CartItemDetailView,
  PromoCodeDetailView,
  ToyCategory,
  ToyAgeGroup,
  StorefrontStatus,
  CartStatus,
  DiscountType,
} from '@/frontend/types/ProductDetail';

/**
 * Helper to map Prisma ToyProduct to ToyProductDetailView
 */
function mapToyProduct(product: any): ToyProductDetailView {
  return {
    id: product.id, // data-from: ToyProduct-id
    sku: product.sku, // data-from: ToyProduct-sku
    category: product.category as ToyCategory, // data-from: ToyProduct-category
    ageGroup: product.ageGroup as ToyAgeGroup, // data-from: ToyProduct-ageGroup
    unitPrice: typeof product.unitPrice?.toNumber === 'function' ? product.unitPrice.toNumber() : Number(product.unitPrice), // data-from: ToyProduct-unitPrice
    originalPrice: product.originalPrice ? (typeof product.originalPrice?.toNumber === 'function' ? product.originalPrice.toNumber() : Number(product.originalPrice)) : null, // data-from: ToyProduct-originalPrice
    stockCount: product.stockCount, // data-from: ToyProduct-stockCount
    reorderThreshold: product.reorderThreshold, // data-from: ToyProduct-reorderThreshold
    storefrontStatus: product.storefrontStatus as StorefrontStatus, // data-from: ToyProduct-storefrontStatus
    productImage: product.productImage, // data-from: ToyProduct-productImage data-role: image_url
    badge: product.badge, // data-from: ToyProduct-badge
    name: product.name || 'Untitled Toy', // data-from: ToyProduct-name
    subtitle: product.subtitle, // data-from: ToyProduct-subtitle
    description: product.description, // data-from: ToyProduct-description
    longDescription: product.longDescription, // data-from: ToyProduct-longDescription
    highlights: Array.isArray(product.highlights) ? (product.highlights as string[]) : [], // data-from: ToyProduct-highlights
    materials: product.materials, // data-from: ToyProduct-materials
    safetyCertification: product.safetyCertification, // data-from: ToyProduct-safetyCertification
    dimensions: product.dimensions, // data-from: ToyProduct-dimensions
    boxIncludes: Array.isArray(product.boxIncludes) ? (product.boxIncludes as string[]) : [], // data-from: ToyProduct-boxIncludes
    ratingAverage: product.ratingAverage ? (typeof product.ratingAverage?.toNumber === 'function' ? product.ratingAverage.toNumber() : Number(product.ratingAverage)) : null, // data-from: ToyProduct-ratingAverage
    reviewsCount: product.reviewsCount ?? null, // data-from: ToyProduct-reviewsCount
    createdAt: product.createdAt, // data-from: ToyProduct-createdAt
    updatedAt: product.updatedAt, // data-from: ToyProduct-updatedAt
  };
}

/**
 * Helper to compute ShoppingCart calculated totals and view
 */
function buildCartView(cart: any): ShoppingCartDetailView {
  const items: CartItemDetailView[] = (cart.cartItems || []).map((item: any) => {
    const productView = mapToyProduct(item.product);
    const lineSubtotal = productView.unitPrice * item.quantity;
    return {
      id: item.id, // data-from: CartItem-id
      cartId: item.cartId, // data-from: CartItem-cartId
      productId: item.productId, // data-from: CartItem-productId
      quantity: item.quantity, // data-from: CartItem-quantity
      customerId: item.customerId, // data-from: CartItem-customerId
      createdAt: item.createdAt, // data-from: CartItem-createdAt
      updatedAt: item.updatedAt, // data-from: CartItem-updatedAt
      product: productView,
      lineSubtotal,
    };
  });

  const subtotal = items.reduce((sum, item) => sum + item.lineSubtotal, 0);

  let appliedPromo: PromoCodeDetailView | null = null;
  let discountAmount = 0;
  let freeShippingThreshold = 50.0;

  if (cart.appliedPromo && cart.appliedPromo.isActive) {
    const promo = cart.appliedPromo;
    const discountVal = typeof promo.discountValue?.toNumber === 'function' ? promo.discountValue.toNumber() : Number(promo.discountValue);
    const minSub = promo.minSubtotal ? (typeof promo.minSubtotal?.toNumber === 'function' ? promo.minSubtotal.toNumber() : Number(promo.minSubtotal)) : null;
    const freeShip = promo.freeShippingThreshold ? (typeof promo.freeShippingThreshold?.toNumber === 'function' ? promo.freeShippingThreshold.toNumber() : Number(promo.freeShippingThreshold)) : null;

    if (!minSub || subtotal >= minSub) {
      if (promo.discountType === 'PERCENT') {
        discountAmount = (subtotal * discountVal) / 100;
      } else {
        discountAmount = discountVal;
      }
      discountAmount = Math.min(subtotal, Math.max(0, discountAmount));
    }

    if (freeShip !== null) {
      freeShippingThreshold = freeShip;
    }

    appliedPromo = {
      id: promo.id, // data-from: PromoCode-id
      code: promo.code, // data-from: PromoCode-code
      discountType: promo.discountType as DiscountType, // data-from: PromoCode-discountType
      discountValue: discountVal, // data-from: PromoCode-discountValue
      minSubtotal: minSub, // data-from: PromoCode-minSubtotal
      freeShippingThreshold: freeShip, // data-from: PromoCode-freeShippingThreshold
      isActive: promo.isActive, // data-from: PromoCode-isActive
    };
  }

  const subtotalAfterDiscount = Math.max(0, subtotal - discountAmount);
  const shippingFee = subtotal === 0 || subtotalAfterDiscount >= freeShippingThreshold ? 0 : 5.0;
  const totalAmount = Math.max(0, subtotal - discountAmount + shippingFee);

  return {
    id: cart.id, // data-from: ShoppingCart-id
    customerId: cart.customerId, // data-from: ShoppingCart-customerId
    cartStatus: cart.cartStatus as CartStatus, // data-from: ShoppingCart-cartStatus
    appliedPromoId: cart.appliedPromoId, // data-from: ShoppingCart-appliedPromoId
    appliedPromo,
    items,
    subtotal,
    discountAmount,
    shippingFee,
    totalAmount,
    createdAt: cart.createdAt, // data-from: ShoppingCart-createdAt
    updatedAt: cart.updatedAt, // data-from: ShoppingCart-updatedAt
  };
}

/**
 * Fetch product detail by ID (or SKU).
 * Products with storefrontStatus=REMOVED are not shown.
 */
export const getProductDetail = withResult(
  async (productId: string): Promise<ToyProductDetailView | null> => {
    if (!productId) return null;

    // Search by ID first, then by SKU, excluding REMOVED products
    let product = await prisma.toyProduct.findFirst({
      where: {
        id: productId,
        storefrontStatus: {
          not: 'REMOVED',
        },
      },
    });

    if (!product) {
      product = await prisma.toyProduct.findFirst({
        where: {
          sku: productId,
          storefrontStatus: {
            not: 'REMOVED',
          },
        },
      });
    }

    if (!product) return null;
    return mapToyProduct(product);
  }
);

/**
 * Fetch current authenticated customer's ACTIVE shopping cart with calculated totals.
 * Guest visitors return null.
 */
export const getActiveCart = withResult(
  async (): Promise<ShoppingCartDetailView | null> => {
    const authContext = tryGetAuthContext();
    if (!authContext?.userId) {
      return null;
    }

    const cart = await prisma.shoppingCart.findFirst({
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
      return null;
    }

    return buildCartView(cart);
  }
);

/**
 * Add product to customer's active shopping cart.
 * - Requires authenticated Customer
 * - Product must be LIVE and stockCount >= requested quantity
 * - Auto-creates ACTIVE cart if none exists
 * - If product already in cart, increments quantity (capped at product stockCount)
 */
export const addToCart = withResult(
  requireAuth(async (productId: string, quantity: number): Promise<ShoppingCartDetailView> => {
    const userId = getUserId();
    if (!productId || quantity <= 0) {
      throw new Error('Invalid product or quantity.');
    }

    // Verify product availability and live status
    const product = await prisma.toyProduct.findUnique({
      where: { id: productId },
    });

    if (!product || product.storefrontStatus !== 'LIVE') {
      throw new Error('This toy is currently unavailable for purchase.');
    }

    if (product.stockCount < quantity) {
      throw new Error(`Insufficient stock. Only ${product.stockCount} units available.`);
    }

    // Find or create active shopping cart for the customer
    let cart = await prisma.shoppingCart.findFirst({
      where: {
        customerId: userId,
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

    if (!cart) {
      // Find default active welcome promo if available
      const defaultPromo = await prisma.promoCode.findFirst({
        where: { isActive: true },
        orderBy: { createdAt: 'asc' },
      });

      cart = await prisma.shoppingCart.create({
        data: {
          customerId: userId,
          cartStatus: 'ACTIVE',
          appliedPromoId: defaultPromo?.id ?? null,
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

    // Check if unique cart_item for this product already exists in the cart
    const existingItem = cart.cartItems.find((item: any) => item.productId === productId);

    if (existingItem) {
      const updatedQuantity = Math.min(product.stockCount, existingItem.quantity + quantity);
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: updatedQuantity },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: product.id,
          quantity: Math.min(product.stockCount, quantity),
          customerId: userId,
        },
      });
    }

    // Fetch refreshed cart
    const updatedCart = await prisma.shoppingCart.findUniqueOrThrow({
      where: { id: cart.id },
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

    return buildCartView(updatedCart);
  })
);

/**
 * Update quantity of a cart item in customer's active cart.
 * If quantity <= 0, deletes the cart item.
 */
export const updateCartItemQuantity = withResult(
  requireAuth(async (cartItemId: string, quantity: number): Promise<ShoppingCartDetailView> => {
    const userId = getUserId();
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: cartItemId,
        customerId: userId,
      },
      include: {
        product: true,
        cart: true,
      },
    });

    if (!cartItem) {
      throw new Error('Cart item not found.');
    }

    if (quantity <= 0) {
      await prisma.cartItem.delete({
        where: { id: cartItemId },
      });
    } else {
      const safeQuantity = Math.min(cartItem.product.stockCount, quantity);
      await prisma.cartItem.update({
        where: { id: cartItemId },
        data: { quantity: safeQuantity },
      });
    }

    const updatedCart = await prisma.shoppingCart.findUniqueOrThrow({
      where: { id: cartItem.cartId },
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

    return buildCartView(updatedCart);
  })
);

/**
 * Remove a cart item from customer's active cart.
 */
export const removeCartItem = withResult(
  requireAuth(async (cartItemId: string): Promise<ShoppingCartDetailView> => {
    const userId = getUserId();
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: cartItemId,
        customerId: userId,
      },
    });

    if (!cartItem) {
      throw new Error('Cart item not found.');
    }

    await prisma.cartItem.delete({
      where: { id: cartItemId },
    });

    const updatedCart = await prisma.shoppingCart.findUniqueOrThrow({
      where: { id: cartItem.cartId },
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

    return buildCartView(updatedCart);
  })
);