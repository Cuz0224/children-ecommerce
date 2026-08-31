"use server";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// common-redirect:@/tools/prisma
var require_prisma = __commonJS({
  "common-redirect:@/tools/prisma"(exports2, module2) {
    var prisma2 = require("./_common").prisma;
    module2.exports = {
      __esModule: true,
      default: prisma2,
      prisma: prisma2
    };
  }
});

// common-redirect:@/frontend/action_utils
var require_action_utils = __commonJS({
  "common-redirect:@/frontend/action_utils"(exports2, module2) {
    module2.exports = require("./_common").frontendAuth;
  }
});

// src/frontend/actions/Checkout.ts
var Checkout_exports = {};
__export(Checkout_exports, {
  applyPromoCode: () => applyPromoCode,
  clearUnavailableCartItems: () => clearUnavailableCartItems,
  completeCheckout: () => completeCheckout,
  getCheckoutPageData: () => getCheckoutPageData,
  removeCartItem: () => removeCartItem,
  removePromoCode: () => removePromoCode,
  updateCartItemQuantity: () => updateCartItemQuantity
});
module.exports = __toCommonJS(Checkout_exports);
var import_prisma = __toESM(require_prisma());
var import_action_utils = __toESM(require_action_utils());
var FLAT_SHIPPING_FEE = 5.99;
var DEFAULT_FREE_SHIPPING_THRESHOLD = 50;
function formatPromoDescription(discountType, discountValue, minSubtotal) {
  const discountStr = discountType === "PERCENT" ? `${discountValue}% off` : `$${discountValue.toFixed(2)} off`;
  if (minSubtotal && minSubtotal > 0) {
    return `${discountStr} on orders over $${minSubtotal.toFixed(2)}`;
  }
  return `${discountStr} on all toy orders`;
}
function mapProduct(product) {
  return {
    id: product.id,
    // data-from: ToyProduct-id
    sku: product.sku,
    // data-from: ToyProduct-sku
    category: product.category,
    // data-from: ToyProduct-category
    ageGroup: product.ageGroup,
    // data-from: ToyProduct-ageGroup
    unitPrice: typeof product.unitPrice === "number" ? product.unitPrice : product.unitPrice.toNumber(),
    // data-from: ToyProduct-unitPrice
    originalPrice: product.originalPrice ? typeof product.originalPrice === "number" ? product.originalPrice : product.originalPrice.toNumber() : null,
    // data-from: ToyProduct-originalPrice
    stockCount: product.stockCount,
    // data-from: ToyProduct-stockCount
    reorderThreshold: product.reorderThreshold,
    // data-from: ToyProduct-reorderThreshold
    storefrontStatus: product.storefrontStatus,
    // data-from: ToyProduct-storefrontStatus
    productImage: product.productImage,
    // data-from: ToyProduct-productImage data-role: image_url
    badge: product.badge,
    // data-from: ToyProduct-badge
    name: product.name || "Toy Product",
    // data-from: ToyProduct-name
    subtitle: product.subtitle,
    // data-from: ToyProduct-subtitle
    description: product.description,
    // data-from: ToyProduct-description
    longDescription: product.longDescription,
    // data-from: ToyProduct-longDescription
    highlights: Array.isArray(product.highlights) ? product.highlights : [],
    // data-from: ToyProduct-highlights
    materials: product.materials,
    // data-from: ToyProduct-materials
    safetyCertification: product.safetyCertification,
    // data-from: ToyProduct-safetyCertification
    dimensions: product.dimensions,
    // data-from: ToyProduct-dimensions
    boxIncludes: Array.isArray(product.boxIncludes) ? product.boxIncludes : [],
    // data-from: ToyProduct-boxIncludes
    ratingAverage: product.ratingAverage ? typeof product.ratingAverage === "number" ? product.ratingAverage : product.ratingAverage.toNumber() : null,
    // data-from: ToyProduct-ratingAverage
    reviewsCount: product.reviewsCount,
    // data-from: ToyProduct-reviewsCount
    createdAt: product.createdAt,
    // data-from: ToyProduct-createdAt
    updatedAt: product.updatedAt
    // data-from: ToyProduct-updatedAt
  };
}
function mapPromo(promo) {
  const discountType = promo.discountType;
  const discountValue = typeof promo.discountValue === "number" ? promo.discountValue : promo.discountValue.toNumber();
  const minSubtotal = promo.minSubtotal ? typeof promo.minSubtotal === "number" ? promo.minSubtotal : promo.minSubtotal.toNumber() : null;
  const freeShippingThreshold = promo.freeShippingThreshold ? typeof promo.freeShippingThreshold === "number" ? promo.freeShippingThreshold : promo.freeShippingThreshold.toNumber() : null;
  return {
    id: promo.id,
    // data-from: PromoCode-id
    code: promo.code,
    // data-from: PromoCode-code
    discountType,
    // data-from: PromoCode-discountType
    discountValue,
    // data-from: PromoCode-discountValue
    minSubtotal,
    // data-from: PromoCode-minSubtotal
    freeShippingThreshold,
    // data-from: PromoCode-freeShippingThreshold
    isActive: promo.isActive,
    // data-from: PromoCode-isActive
    createdAt: promo.createdAt,
    // data-from: PromoCode-createdAt
    updatedAt: promo.updatedAt,
    // data-from: PromoCode-updatedAt
    description: formatPromoDescription(discountType, discountValue, minSubtotal)
  };
}
function mapCartItem(item) {
  const productDto = mapProduct(item.product);
  const isLive = productDto.storefrontStatus === "LIVE";
  const hasSufficientStock = isLive && productDto.stockCount >= item.quantity;
  const lineSubtotal = item.quantity * productDto.unitPrice;
  return {
    id: item.id,
    // data-from: CartItem-id
    cartId: item.cartId,
    // data-from: CartItem-cartId
    productId: item.productId,
    // data-from: CartItem-productId
    quantity: item.quantity,
    // data-from: CartItem-quantity
    customerId: item.customerId,
    // data-from: CartItem-customerId
    createdAt: item.createdAt,
    // data-from: CartItem-createdAt
    updatedAt: item.updatedAt,
    // data-from: CartItem-updatedAt
    product: productDto,
    lineSubtotal,
    isLive,
    hasSufficientStock
  };
}
function computeCalculation(items, appliedPromo) {
  const subtotal = items.reduce((sum, item) => sum + item.lineSubtotal, 0);
  let discountAmount = 0;
  if (appliedPromo && appliedPromo.isActive) {
    const minRequired = appliedPromo.minSubtotal ?? 0;
    if (subtotal >= minRequired) {
      if (appliedPromo.discountType === "PERCENT") {
        discountAmount = subtotal * appliedPromo.discountValue / 100;
      } else {
        discountAmount = appliedPromo.discountValue;
      }
      discountAmount = Math.min(subtotal, Math.round(discountAmount * 100) / 100);
    }
  }
  const postDiscountSubtotal = Math.max(0, subtotal - discountAmount);
  const freeShippingThreshold = appliedPromo?.freeShippingThreshold ?? DEFAULT_FREE_SHIPPING_THRESHOLD;
  const isFreeShipping = postDiscountSubtotal >= freeShippingThreshold || subtotal === 0;
  const shippingFee = isFreeShipping ? 0 : FLAT_SHIPPING_FEE;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - postDiscountSubtotal);
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
    appliedPromo
  };
}
async function fetchActiveCartData(customerId) {
  let cart = await import_prisma.default.shoppingCart.findFirst({
    where: {
      customerId,
      cartStatus: "ACTIVE"
    },
    include: {
      appliedPromo: true,
      cartItems: {
        include: {
          product: true
        },
        orderBy: {
          createdAt: "asc"
        }
      }
    }
  });
  if (!cart) {
    cart = await import_prisma.default.shoppingCart.create({
      data: {
        customerId,
        cartStatus: "ACTIVE"
      },
      include: {
        appliedPromo: true,
        cartItems: {
          include: {
            product: true
          }
        }
      }
    });
  }
  const promoRecords = await import_prisma.default.promoCode.findMany({
    where: {
      isActive: true
    },
    orderBy: {
      discountValue: "desc"
    }
  });
  const availablePromos = promoRecords.map(mapPromo);
  const appliedPromo = cart.appliedPromo ? mapPromo(cart.appliedPromo) : null;
  const items = cart.cartItems.map(mapCartItem);
  const calculation = computeCalculation(items, appliedPromo);
  const cartDto = {
    id: cart.id,
    // data-from: ShoppingCart-id
    customerId: cart.customerId,
    // data-from: ShoppingCart-customerId
    cartStatus: cart.cartStatus,
    // data-from: ShoppingCart-cartStatus
    appliedPromoId: cart.appliedPromoId,
    // data-from: ShoppingCart-appliedPromoId
    createdAt: cart.createdAt,
    // data-from: ShoppingCart-createdAt
    updatedAt: cart.updatedAt,
    // data-from: ShoppingCart-updatedAt
    items,
    appliedPromo
  };
  return {
    cart: cartDto,
    calculation,
    availablePromos
  };
}
var getCheckoutPageData = (0, import_action_utils.withResult)(
  (0, import_action_utils.requireAuth)(async () => {
    const customerId = (0, import_action_utils.getUserId)();
    return fetchActiveCartData(customerId);
  })
);
var updateCartItemQuantity = (0, import_action_utils.withResult)(
  (0, import_action_utils.requireAuth)(async (cartItemId, newQuantity) => {
    const customerId = (0, import_action_utils.getUserId)();
    const existingItem = await import_prisma.default.cartItem.findFirst({
      where: {
        id: cartItemId,
        customerId,
        cart: {
          cartStatus: "ACTIVE"
        }
      },
      include: {
        product: true
      }
    });
    if (!existingItem) {
      return fetchActiveCartData(customerId);
    }
    if (newQuantity <= 0) {
      await import_prisma.default.cartItem.delete({
        where: { id: cartItemId }
      });
    } else {
      const clampedQty = Math.min(newQuantity, existingItem.product.stockCount || newQuantity);
      await import_prisma.default.cartItem.update({
        where: { id: cartItemId },
        data: { quantity: clampedQty }
      });
    }
    return fetchActiveCartData(customerId);
  })
);
var removeCartItem = (0, import_action_utils.withResult)(
  (0, import_action_utils.requireAuth)(async (cartItemId) => {
    const customerId = (0, import_action_utils.getUserId)();
    await import_prisma.default.cartItem.deleteMany({
      where: {
        id: cartItemId,
        customerId,
        cart: {
          cartStatus: "ACTIVE"
        }
      }
    });
    return fetchActiveCartData(customerId);
  })
);
var clearUnavailableCartItems = (0, import_action_utils.withResult)(
  (0, import_action_utils.requireAuth)(async () => {
    const customerId = (0, import_action_utils.getUserId)();
    const activeCart = await import_prisma.default.shoppingCart.findFirst({
      where: {
        customerId,
        cartStatus: "ACTIVE"
      },
      include: {
        cartItems: {
          include: {
            product: true
          }
        }
      }
    });
    if (!activeCart) {
      return fetchActiveCartData(customerId);
    }
    for (const item of activeCart.cartItems) {
      const isLive = item.product.storefrontStatus === "LIVE";
      if (!isLive || item.product.stockCount <= 0) {
        await import_prisma.default.cartItem.delete({
          where: { id: item.id }
        });
      } else if (item.quantity > item.product.stockCount) {
        await import_prisma.default.cartItem.update({
          where: { id: item.id },
          data: { quantity: item.product.stockCount }
        });
      }
    }
    return fetchActiveCartData(customerId);
  })
);
var applyPromoCode = (0, import_action_utils.withResult)(
  (0, import_action_utils.requireAuth)(async (code) => {
    const customerId = (0, import_action_utils.getUserId)();
    const normalizedCode = code.trim().toUpperCase();
    const activePromos = await import_prisma.default.promoCode.findMany({
      where: {
        isActive: true
      }
    });
    const promo = activePromos.find(
      (p) => p.code.toUpperCase() === normalizedCode
    );
    if (!promo) {
      throw new Error(`Promo code "${code}" is invalid or inactive.`);
    }
    const activeCart = await import_prisma.default.shoppingCart.findFirst({
      where: {
        customerId,
        cartStatus: "ACTIVE"
      },
      include: {
        cartItems: {
          include: {
            product: true
          }
        }
      }
    });
    if (!activeCart || activeCart.cartItems.length === 0) {
      throw new Error("Cannot apply promo code to an empty cart.");
    }
    const subtotal = activeCart.cartItems.reduce(
      (sum, item) => sum + item.quantity * (typeof item.product.unitPrice === "number" ? item.product.unitPrice : item.product.unitPrice.toNumber()),
      0
    );
    const minSubtotal = promo.minSubtotal ? typeof promo.minSubtotal === "number" ? promo.minSubtotal : promo.minSubtotal.toNumber() : 0;
    if (subtotal < minSubtotal) {
      throw new Error(
        `Promo code "${promo.code}" requires a minimum subtotal of $${minSubtotal.toFixed(2)}.`
      );
    }
    await import_prisma.default.shoppingCart.update({
      where: { id: activeCart.id },
      data: { appliedPromoId: promo.id }
    });
    return fetchActiveCartData(customerId);
  })
);
var removePromoCode = (0, import_action_utils.withResult)(
  (0, import_action_utils.requireAuth)(async () => {
    const customerId = (0, import_action_utils.getUserId)();
    const activeCart = await import_prisma.default.shoppingCart.findFirst({
      where: {
        customerId,
        cartStatus: "ACTIVE"
      }
    });
    if (activeCart) {
      await import_prisma.default.shoppingCart.update({
        where: { id: activeCart.id },
        data: { appliedPromoId: null }
      });
    }
    return fetchActiveCartData(customerId);
  })
);
var completeCheckout = (0, import_action_utils.withResult)(
  (0, import_action_utils.requireAuth)(async () => {
    const customerId = (0, import_action_utils.getUserId)();
    return await import_prisma.default.$transaction(async (tx) => {
      const activeCart = await tx.shoppingCart.findFirst({
        where: {
          customerId,
          cartStatus: "ACTIVE"
        },
        include: {
          appliedPromo: true,
          cartItems: {
            include: {
              product: true
            }
          }
        }
      });
      if (!activeCart || activeCart.cartItems.length === 0) {
        throw new Error("Your active shopping cart is empty.");
      }
      for (const item of activeCart.cartItems) {
        if (item.product.storefrontStatus !== "LIVE") {
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
      const subtotal = activeCart.cartItems.reduce(
        (sum, item) => sum + item.quantity * (typeof item.product.unitPrice === "number" ? item.product.unitPrice : item.product.unitPrice.toNumber()),
        0
      );
      let discountAmount = 0;
      let appliedPromoCodeStr = null;
      if (activeCart.appliedPromo && activeCart.appliedPromo.isActive) {
        const promo = activeCart.appliedPromo;
        const minReq = promo.minSubtotal ? typeof promo.minSubtotal === "number" ? promo.minSubtotal : promo.minSubtotal.toNumber() : 0;
        if (subtotal >= minReq) {
          appliedPromoCodeStr = promo.code;
          const discVal = typeof promo.discountValue === "number" ? promo.discountValue : promo.discountValue.toNumber();
          if (promo.discountType === "PERCENT") {
            discountAmount = subtotal * discVal / 100;
          } else {
            discountAmount = discVal;
          }
          discountAmount = Math.min(subtotal, Math.round(discountAmount * 100) / 100);
        }
      }
      const postDiscount = Math.max(0, subtotal - discountAmount);
      const freeThreshold = activeCart.appliedPromo?.freeShippingThreshold ? typeof activeCart.appliedPromo.freeShippingThreshold === "number" ? activeCart.appliedPromo.freeShippingThreshold : activeCart.appliedPromo.freeShippingThreshold.toNumber() : DEFAULT_FREE_SHIPPING_THRESHOLD;
      const isFreeShipping = postDiscount >= freeThreshold || subtotal === 0;
      const shippingFee = isFreeShipping ? 0 : FLAT_SHIPPING_FEE;
      const totalAmount = Math.max(0, subtotal - discountAmount + shippingFee);
      const salesOrder = await tx.salesOrder.create({
        data: {
          customerId,
          sourceCartId: activeCart.id,
          orderStatus: "COMPLETED",
          subtotal,
          discountAmount,
          shippingFee,
          totalAmount,
          appliedPromoCode: appliedPromoCodeStr
        }
      });
      const createdItems = [];
      for (const item of activeCart.cartItems) {
        const unitPriceNum = typeof item.product.unitPrice === "number" ? item.product.unitPrice : item.product.unitPrice.toNumber();
        const lineSubtotal = item.quantity * unitPriceNum;
        const orderItem = await tx.salesOrderItem.create({
          data: {
            orderId: salesOrder.id,
            productId: item.productId,
            quantity: item.quantity,
            unitPriceSnapshot: unitPriceNum,
            lineSubtotal
          }
        });
        await tx.toyProduct.update({
          where: { id: item.productId },
          data: {
            stockCount: {
              decrement: item.quantity
            }
          }
        });
        createdItems.push({
          id: orderItem.id,
          // data-from: SalesOrderItem-id
          orderId: orderItem.orderId,
          // data-from: SalesOrderItem-orderId
          productId: orderItem.productId,
          // data-from: SalesOrderItem-productId
          quantity: orderItem.quantity,
          // data-from: SalesOrderItem-quantity
          unitPriceSnapshot: unitPriceNum,
          // data-from: SalesOrderItem-unitPriceSnapshot
          lineSubtotal,
          // data-from: SalesOrderItem-lineSubtotal
          productName: item.product.name || "Toy Product",
          productSku: item.product.sku,
          productImage: item.product.productImage,
          // data-role: image_url
          category: item.product.category,
          createdAt: orderItem.createdAt,
          // data-from: SalesOrderItem-createdAt
          updatedAt: orderItem.updatedAt
          // data-from: SalesOrderItem-updatedAt
        });
      }
      await tx.shoppingCart.update({
        where: { id: activeCart.id },
        data: {
          cartStatus: "CHECKED_OUT"
        }
      });
      return {
        id: salesOrder.id,
        // data-from: SalesOrder-id
        customerId: salesOrder.customerId,
        // data-from: SalesOrder-customerId
        sourceCartId: salesOrder.sourceCartId,
        // data-from: SalesOrder-sourceCartId
        orderStatus: salesOrder.orderStatus,
        // data-from: SalesOrder-orderStatus
        subtotal,
        // data-from: SalesOrder-subtotal
        discountAmount,
        // data-from: SalesOrder-discountAmount
        shippingFee,
        // data-from: SalesOrder-shippingFee
        totalAmount,
        // data-from: SalesOrder-totalAmount
        appliedPromoCode: salesOrder.appliedPromoCode,
        // data-from: SalesOrder-appliedPromoCode
        createdAt: salesOrder.createdAt,
        // data-from: SalesOrder-createdAt
        updatedAt: salesOrder.updatedAt,
        // data-from: SalesOrder-updatedAt
        items: createdItems
      };
    });
  })
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  applyPromoCode,
  clearUnavailableCartItems,
  completeCheckout,
  getCheckoutPageData,
  removeCartItem,
  removePromoCode,
  updateCartItemQuantity
});
