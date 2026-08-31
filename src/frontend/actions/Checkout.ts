'use server';

import prisma from '@/tools/prisma';
import {
  withResult,
  requireAuth,
  getUserId,
  UnauthorizedError,
} from '@/frontend/action_utils';
import {
  CheckoutPageData,
  ShoppingCartDto,
  CartItemDto,
  ToyProductDto,
  PromoCodeDto,
  SalesOrderDto,
  SalesOrderItemDto,
  CheckoutCalculation,
  ToyCategory,
  ToyAgeGroup,
  StorefrontStatus,
  CartStatus,
  DiscountType,
  OrderStatus,
  ToyProductHighlights,
  ToyProductBoxIncludes,
} from '@/frontend/types/Checkout';

const FLAT_SHIPPING_FEE = 5.99;
const DEFAULT_FREE_SHIPPING_THRESHOLD = 50.0;

function formatPromoDescription(
  discountType: DiscountType,
  discountValue: number,
  minSubtotal: number | null
): string {
  const discountStr =
    discountType === 'PERCENT' ? `${discountValue}% off` : `$${discountValue.toFixed(2)} off`;
  if (minSubtotal && minSubtotal > 0) {
    return `${discountStr} on orders over $${minSubtotal.toFixed(2)}`;
  }
  return `${discountStr} on all toy orders`;
}

function mapProduct(product: any): ToyProductDto {
  return {
    id: product.id, // data-from: ToyProduct-id
    sku: product.sku, // data-from: ToyProduct-sku
    category: product.category as ToyCategory, // data-from: ToyProduct-category
    ageGroup: product.ageGroup as ToyAgeGroup, // data-from: ToyProduct-ageGroup
    unitPrice: typeof product.unitPrice === 'number' ? product.unitPrice : product.unitPrice.toNumber(), // data-from: ToyProduct-unitPrice
    originalPrice: product.originalPrice ? (typeof product.originalPrice === 'number' ? product.originalPrice : product.originalPrice.toNumber()) : null, // data-from: ToyProduct-originalPrice
    stockCount: product.stockCount, // data-from: ToyProduct-stockCount
    reorderThreshold: product.reorderThreshold, // data-from: ToyProduct-reorderThreshold
    storefrontStatus: product.storefrontStatus as StorefrontStatus, // data-from: ToyProduct-storefrontStatus
    productImage: product.productImage, // data-from: ToyProduct-productImage data-role: image_url
    badge: product.badge, // data-from: ToyProduct-badge
    name: product.name || 'Toy Product', // data-from: ToyProduct-name
    subtitle: product.subtitle, // data-from: ToyProduct-subtitle
    description: product.description, // data-from: ToyProduct-description
    longDescription: product.longDescription, // data-from: ToyProduct-longDescription
    highlights: Array.isArray(product.highlights) ? (product.highlights as ToyProductHighlights) : [], // data-from: ToyProduct-highlights
    materials: product.materials, // data-from: ToyProduct-materials
    safetyCertification: product.safetyCertification, // data-from: ToyProduct-safetyCertification
    dimensions: product.dimensions, // data-from: ToyProduct-dimensions
    boxIncludes: Array.isArray(product.boxIncludes) ? (product.boxIncludes as ToyProductBoxIncludes) : [], // data-from: ToyProduct-boxIncludes
    ratingAverage: product.ratingAverage ? (typeof product.ratingAverage === 'number' ? product.ratingAverage : product.ratingAverage.toNumber()) : null, // data-from: ToyProduct-ratingAverage
    reviewsCount: product.reviewsCount, // data-from: ToyProduct-reviewsCount
    createdAt: product.createdAt, // data-from: ToyProduct-createdAt
    updatedAt: product.updatedAt, // data-from: ToyProduct-updatedAt
  };
}

function mapPromo(promo: any): PromoCodeDto {
  const discountType = promo.discountType as DiscountType;
  const discountValue = typeof promo.discountValue === 'number' ? promo.discountValue : promo.discountValue.toNumber();
  const minSubtotal = promo.minSubtotal ? (typeof promo.minSubtotal === 'number' ? promo.minSubtotal : promo.minSubtotal.toNumber()) : null;
  const freeShippingThreshold = promo.freeShippingThreshold ? (typeof promo.freeShippingThreshold === 'number' ? promo.freeShippingThreshold : promo.freeShippingThreshold.toNumber()) : null;

  return {
    id: promo.id, // data-from: PromoCode-id
    code: promo.code, // data-from: PromoCode-code
    discountType, // data-from: PromoCode-discountType
    discountValue, // data-from: PromoCode-discountValue
    minSubtotal, // data-from: PromoCode-minSubtotal
    freeShippingThreshold, // data-from: PromoCode-freeShippingThreshold
    isActive: promo.isActive, // data-from: PromoCode-isActive
    createdAt: promo.createdAt, // data-from: PromoCode-createdAt
    updatedAt: promo.updatedAt, // data-from: PromoCode-updatedAt
    description: formatPromoDescription(discountType, discountValue, minSubtotal),
  };
}

function mapCartItem(item: any): CartItemDto {
  const productDto = mapProduct(item.product);
  const isLive = productDto.storefrontStatus === 'LIVE';
  const hasSufficientStock = isLive && productDto.stockCount >= item.quantity;
  const lineSubtotal = item.quantity * productDto.unitPrice;

  return {
    id: item.id, // data-from: CartItem-id
    cartId: item.cartId, // data-from: CartItem-cartId
    productId: item.productId, // data-from: CartItem-productId
    quantity: item.quantity, // data-from: CartItem-quantity
    customerId: item.customerId, // data-from: CartItem-customerId
    createdAt: item.createdAt, // data-from: CartItem-createdAt
    updatedAt: item.updatedAt, // data-from: CartItem-updatedAt
    product: productDto,
    lineSubtotal,
    isLive,
    hasSufficientStock,
  };
}

function computeCalculation(
  items: CartItemDto[],
  appliedPromo: PromoCodeDto | null
): CheckoutCalculation {
  // Domain rule: subtotal is sum of item.quantity * product.unitPrice for ACTIVE cart
  const subtotal = items.reduce((sum, item) => sum + item.lineSubtotal, 0);

  // Domain rule: discount_amount calculation
  let discountAmount = 0;
  if (appliedPromo && appliedPromo.isActive) {
    const minRequired = appliedPromo.minSubtotal ?? 0;
    if (subtotal >= minRequired) {
      if (appliedPromo.discountType === 'PERCENT') {
        discountAmount = (subtotal * appliedPromo.discountValue) / 100;
      } else {
        discountAmount = appliedPromo.discountValue;
      }
      discountAmount = Math.min(subtotal, Math.round(discountAmount * 100) / 100);
    }
  }

  const postDiscountSubtotal = Math.max(0, subtotal - discountAmount);
  const freeShippingThreshold =
    appliedPromo?.freeShippingThreshold ?? DEFAULT_FREE_SHIPPING_THRESHOLD;
  const isFreeShipping = postDiscountSubtotal >= freeShippingThreshold || subtotal === 0;
  const shippingFee = isFreeShipping ? 0 : FLAT_SHIPPING_FEE;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - postDiscountSubtotal);

  // Domain rule: total_amount = subtotal - discount_amount + shipping_fee
  const totalAmount = Math.max(0, subtotal - discountAmount + shippingFee);

  let invalidItemsCount = 0;
  let hasStockIssue = false;

  items.forEach((item) => {
    if (!item.isLive || !item.hasSufficientStock) {
      hasStockIssue = true;
      invalidItemsCount += 1;
    }
  });

  return {
    subtotal,
    discountAmount,
    shippingFee,
    totalAmount,
    freeShippingThreshold,
    amountToFreeShipping,
    isFreeShipping,
    hasStockIssue,
    invalidItemsCount,
    appliedPromo,
  };
}

async function fetchActiveCartData(customerId: string): Promise<CheckoutPageData> {
  // Domain rule: customer has at most one ACTIVE shopping_cart
  let cart = await prisma.shoppingCart.findFirst({
    where: {
      customerId,
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

  // If customer doesn't have an active cart record yet, create one
  if (!cart) {
    cart = await prisma.shoppingCart.create({
      data: {
        customerId,
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

  // Load available active promos for quick suggestions
  const promoRecords = await prisma.promoCode.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      discountValue: 'desc',
    },
  });

  const availablePromos = promoRecords.map(mapPromo);
  const appliedPromo = cart.appliedPromo ? mapPromo(cart.appliedPromo) : null;
  const items = cart.cartItems.map(mapCartItem);
  const calculation = computeCalculation(items, appliedPromo);

  const cartDto: ShoppingCartDto = {
    id: cart.id, // data-from: ShoppingCart-id
    customerId: cart.customerId, // data-from: ShoppingCart-customerId
    cartStatus: cart.cartStatus as CartStatus, // data-from: ShoppingCart-cartStatus
    appliedPromoId: cart.appliedPromoId, // data-from: ShoppingCart-appliedPromoId
    createdAt: cart.createdAt, // data-from: ShoppingCart-createdAt
    updatedAt: cart.updatedAt, // data-from: ShoppingCart-updatedAt
    items,
    appliedPromo,
  };

  return {
    cart: cartDto,
    calculation,
    availablePromos,
  };
}

/**
 * Get active checkout cart data, financial calculation, and available promo vouchers.
 */
export const getCheckoutPageData = withResult(
  requireAuth(async (): Promise<CheckoutPageData> => {
    const customerId = getUserId();
    return fetchActiveCartData(customerId);
  })
);

/**
 * Update quantity for a cart item in active cart.
 * If new quantity <= 0, the item is removed.
 */
export const updateCartItemQuantity = withResult(
  requireAuth(async (cartItemId: string, newQuantity: number): Promise<CheckoutPageData> => {
    const customerId = getUserId();

    const existingItem = await prisma.cartItem.findFirst({
      where: {
        id: cartItemId,
        customerId,
        cart: {
          cartStatus: 'ACTIVE',
        },
      },
      include: {
        product: true,
      },
    });

    if (!existingItem) {
      return fetchActiveCartData(customerId);
    }

    if (newQuantity <= 0) {
      await prisma.cartItem.delete({
        where: { id: cartItemId },
      });
    } else {
      const clampedQty = Math.min(newQuantity, existingItem.product.stockCount || newQuantity);
      await prisma.cartItem.update({
        where: { id: cartItemId },
        data: { quantity: clampedQty },
      });
    }

    return fetchActiveCartData(customerId);
  })
);

/**
 * Remove a single cart item from active cart.
 */
export const removeCartItem = withResult(
  requireAuth(async (cartItemId: string): Promise<CheckoutPageData> => {
    const customerId = getUserId();

    await prisma.cartItem.deleteMany({
      where: {
        id: cartItemId,
        customerId,
        cart: {
          cartStatus: 'ACTIVE',
        },
      },
    });

    return fetchActiveCartData(customerId);
  })
);

/**
 * Auto-correct ineligible items: adjust quantity to live stock or remove zero-stock / non-LIVE items.
 */
export const clearUnavailableCartItems = withResult(
  requireAuth(async (): Promise<CheckoutPageData> => {
    const customerId = getUserId();

    const activeCart = await prisma.shoppingCart.findFirst({
      where: {
        customerId,
        cartStatus: 'ACTIVE',
      },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!activeCart) {
      return fetchActiveCartData(customerId);
    }

    for (const item of activeCart.cartItems) {
      const isLive = item.product.storefrontStatus === 'LIVE';
      if (!isLive || item.product.stockCount <= 0) {
        await prisma.cartItem.delete({
          where: { id: item.id },
        });
      } else if (item.quantity > item.product.stockCount) {
        await prisma.cartItem.update({
          where: { id: item.id },
          data: { quantity: item.product.stockCount },
        });
      }
    }

    return fetchActiveCartData(customerId);
  })
);

/**
 * Apply or replace promo code on active cart with case-insensitive validation.
 */
export const applyPromoCode = withResult(
  requireAuth(async (code: string): Promise<CheckoutPageData> => {
    const customerId = getUserId();
    const normalizedCode = code.trim().toUpperCase();

    const activePromos = await prisma.promoCode.findMany({
      where: {
        isActive: true,
      },
    });

    const promo = activePromos.find(
      (p) => p.code.toUpperCase() === normalizedCode
    );

    if (!promo) {
      throw new Error(`Promo code "${code}" is invalid or inactive.`);
    }

    const activeCart = await prisma.shoppingCart.findFirst({
      where: {
        customerId,
        cartStatus: 'ACTIVE',
      },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!activeCart || activeCart.cartItems.length === 0) {
      throw new Error('Cannot apply promo code to an empty cart.');
    }

    const subtotal = activeCart.cartItems.reduce(
      (sum, item) =>
        sum +
        item.quantity *
          (typeof item.product.unitPrice === 'number'
            ? item.product.unitPrice
            : item.product.unitPrice.toNumber()),
      0
    );

    const minSubtotal = promo.minSubtotal
      ? typeof promo.minSubtotal === 'number'
        ? promo.minSubtotal
        : promo.minSubtotal.toNumber()
      : 0;

    if (subtotal < minSubtotal) {
      throw new Error(
        `Promo code "${promo.code}" requires a minimum subtotal of $${minSubtotal.toFixed(2)}.`
      );
    }

    await prisma.shoppingCart.update({
      where: { id: activeCart.id },
      data: { appliedPromoId: promo.id },
    });

    return fetchActiveCartData(customerId);
  })
);

/**
 * Remove applied promo code from active cart.
 */
export const removePromoCode = withResult(
  requireAuth(async (): Promise<CheckoutPageData> => {
    const customerId = getUserId();

    const activeCart = await prisma.shoppingCart.findFirst({
      where: {
        customerId,
        cartStatus: 'ACTIVE',
      },
    });

    if (activeCart) {
      await prisma.shoppingCart.update({
        where: { id: activeCart.id },
        data: { appliedPromoId: null },
      });
    }

    return fetchActiveCartData(customerId);
  })
);

/**
 * Complete simulated checkout:
 * 1. Validate every product is LIVE and stockCount >= requested quantity.
 * 2. Create immutable SalesOrder and SalesOrderItem records.
 * 3. Mark ShoppingCart as CHECKED_OUT.
 * 4. Decrement ToyProduct stockCount.
 */
export const completeCheckout = withResult(
  requireAuth(async (): Promise<SalesOrderDto> => {
    const customerId = getUserId();

    return await prisma.$transaction(async (tx) => {
      const activeCart = await tx.shoppingCart.findFirst({
        where: {
          customerId,
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

      if (!activeCart || activeCart.cartItems.length === 0) {
        throw new Error('Your active shopping cart is empty.');
      }

      // Domain Rule: A cart can be checked out only when every cart_item product is LIVE and stock_count >= quantity
      for (const item of activeCart.cartItems) {
        if (item.product.storefrontStatus !== 'LIVE') {
          throw new Error(
            `Toy "${item.product.name || item.product.sku}" is unavailable (${item.product.storefrontStatus}). Please remove it before checkout.`
          );
        }
        if (item.product.stockCount < item.quantity) {
          throw new Error(
            `Insufficient stock for "${item.product.name || item.product.sku}". Only ${item.product.stockCount} available (requested ${item.quantity}).`
          );
        }
      }

      // Compute immutable order totals
      const subtotal = activeCart.cartItems.reduce(
        (sum, item) =>
          sum +
          item.quantity *
            (typeof item.product.unitPrice === 'number'
              ? item.product.unitPrice
              : item.product.unitPrice.toNumber()),
        0
      );

      let discountAmount = 0;
      let appliedPromoCodeStr: string | null = null;

      if (activeCart.appliedPromo && activeCart.appliedPromo.isActive) {
        const promo = activeCart.appliedPromo;
        const minReq = promo.minSubtotal
          ? typeof promo.minSubtotal === 'number'
            ? promo.minSubtotal
            : promo.minSubtotal.toNumber()
          : 0;

        if (subtotal >= minReq) {
          appliedPromoCodeStr = promo.code;
          const discVal =
            typeof promo.discountValue === 'number'
              ? promo.discountValue
              : promo.discountValue.toNumber();

          if (promo.discountType === 'PERCENT') {
            discountAmount = (subtotal * discVal) / 100;
          } else {
            discountAmount = discVal;
          }
          discountAmount = Math.min(subtotal, Math.round(discountAmount * 100) / 100);
        }
      }

      const postDiscount = Math.max(0, subtotal - discountAmount);
      const freeThreshold = activeCart.appliedPromo?.freeShippingThreshold
        ? typeof activeCart.appliedPromo.freeShippingThreshold === 'number'
          ? activeCart.appliedPromo.freeShippingThreshold
          : activeCart.appliedPromo.freeShippingThreshold.toNumber()
        : DEFAULT_FREE_SHIPPING_THRESHOLD;

      const isFreeShipping = postDiscount >= freeThreshold || subtotal === 0;
      const shippingFee = isFreeShipping ? 0 : FLAT_SHIPPING_FEE;
      const totalAmount = Math.max(0, subtotal - discountAmount + shippingFee);

      // Create SalesOrder
      const salesOrder = await tx.salesOrder.create({
        data: {
          customerId,
          sourceCartId: activeCart.id,
          orderStatus: 'COMPLETED',
          subtotal,
          discountAmount,
          shippingFee,
          totalAmount,
          appliedPromoCode: appliedPromoCodeStr,
        },
      });

      // Create SalesOrderItems & Decrement Inventory
      const createdItems: SalesOrderItemDto[] = [];

      for (const item of activeCart.cartItems) {
        const unitPriceNum =
          typeof item.product.unitPrice === 'number'
            ? item.product.unitPrice
            : item.product.unitPrice.toNumber();
        const lineSubtotal = item.quantity * unitPriceNum;

        const orderItem = await tx.salesOrderItem.create({
          data: {
            orderId: salesOrder.id,
            productId: item.productId,
            quantity: item.quantity,
            unitPriceSnapshot: unitPriceNum,
            lineSubtotal,
          },
        });

        // Decrement product inventory
        await tx.toyProduct.update({
          where: { id: item.productId },
          data: {
            stockCount: {
              decrement: item.quantity,
            },
          },
        });

        createdItems.push({
          id: orderItem.id, // data-from: SalesOrderItem-id
          orderId: orderItem.orderId, // data-from: SalesOrderItem-orderId
          productId: orderItem.productId, // data-from: SalesOrderItem-productId
          quantity: orderItem.quantity, // data-from: SalesOrderItem-quantity
          unitPriceSnapshot: unitPriceNum, // data-from: SalesOrderItem-unitPriceSnapshot
          lineSubtotal, // data-from: SalesOrderItem-lineSubtotal
          productName: item.product.name || 'Toy Product',
          productSku: item.product.sku,
          productImage: item.product.productImage, // data-role: image_url
          category: item.product.category as ToyCategory,
          createdAt: orderItem.createdAt, // data-from: SalesOrderItem-createdAt
          updatedAt: orderItem.updatedAt, // data-from: SalesOrderItem-updatedAt
        });
      }

      // Mark ShoppingCart as CHECKED_OUT
      await tx.shoppingCart.update({
        where: { id: activeCart.id },
        data: {
          cartStatus: 'CHECKED_OUT',
        },
      });

      return {
        id: salesOrder.id, // data-from: SalesOrder-id
        customerId: salesOrder.customerId, // data-from: SalesOrder-customerId
        sourceCartId: salesOrder.sourceCartId, // data-from: SalesOrder-sourceCartId
        orderStatus: salesOrder.orderStatus as OrderStatus, // data-from: SalesOrder-orderStatus
        subtotal, // data-from: SalesOrder-subtotal
        discountAmount, // data-from: SalesOrder-discountAmount
        shippingFee, // data-from: SalesOrder-shippingFee
        totalAmount, // data-from: SalesOrder-totalAmount
        appliedPromoCode: salesOrder.appliedPromoCode, // data-from: SalesOrder-appliedPromoCode
        createdAt: salesOrder.createdAt, // data-from: SalesOrder-createdAt
        updatedAt: salesOrder.updatedAt, // data-from: SalesOrder-updatedAt
        items: createdItems,
      };
    });
  })
);