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

// src/frontend/actions/ProductDetail.ts
var ProductDetail_exports = {};
__export(ProductDetail_exports, {
  addToCart: () => addToCart,
  getActiveCart: () => getActiveCart,
  getProductDetail: () => getProductDetail,
  removeCartItem: () => removeCartItem,
  updateCartItemQuantity: () => updateCartItemQuantity
});
module.exports = __toCommonJS(ProductDetail_exports);
var import_prisma = __toESM(require_prisma());
var import_action_utils = __toESM(require_action_utils());
function mapToyProduct(product) {
  return {
    id: product.id,
    // data-from: ToyProduct-id
    sku: product.sku,
    // data-from: ToyProduct-sku
    category: product.category,
    // data-from: ToyProduct-category
    ageGroup: product.ageGroup,
    // data-from: ToyProduct-ageGroup
    unitPrice: typeof product.unitPrice?.toNumber === "function" ? product.unitPrice.toNumber() : Number(product.unitPrice),
    // data-from: ToyProduct-unitPrice
    originalPrice: product.originalPrice ? typeof product.originalPrice?.toNumber === "function" ? product.originalPrice.toNumber() : Number(product.originalPrice) : null,
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
    name: product.name || "Untitled Toy",
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
    ratingAverage: product.ratingAverage ? typeof product.ratingAverage?.toNumber === "function" ? product.ratingAverage.toNumber() : Number(product.ratingAverage) : null,
    // data-from: ToyProduct-ratingAverage
    reviewsCount: product.reviewsCount ?? null,
    // data-from: ToyProduct-reviewsCount
    createdAt: product.createdAt,
    // data-from: ToyProduct-createdAt
    updatedAt: product.updatedAt
    // data-from: ToyProduct-updatedAt
  };
}
function buildCartView(cart) {
  const items = (cart.cartItems || []).map((item) => {
    const productView = mapToyProduct(item.product);
    const lineSubtotal = productView.unitPrice * item.quantity;
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
      product: productView,
      lineSubtotal
    };
  });
  const subtotal = items.reduce((sum, item) => sum + item.lineSubtotal, 0);
  let appliedPromo = null;
  let discountAmount = 0;
  let freeShippingThreshold = 50;
  if (cart.appliedPromo && cart.appliedPromo.isActive) {
    const promo = cart.appliedPromo;
    const discountVal = typeof promo.discountValue?.toNumber === "function" ? promo.discountValue.toNumber() : Number(promo.discountValue);
    const minSub = promo.minSubtotal ? typeof promo.minSubtotal?.toNumber === "function" ? promo.minSubtotal.toNumber() : Number(promo.minSubtotal) : null;
    const freeShip = promo.freeShippingThreshold ? typeof promo.freeShippingThreshold?.toNumber === "function" ? promo.freeShippingThreshold.toNumber() : Number(promo.freeShippingThreshold) : null;
    if (!minSub || subtotal >= minSub) {
      if (promo.discountType === "PERCENT") {
        discountAmount = subtotal * discountVal / 100;
      } else {
        discountAmount = discountVal;
      }
      discountAmount = Math.min(subtotal, Math.max(0, discountAmount));
    }
    if (freeShip !== null) {
      freeShippingThreshold = freeShip;
    }
    appliedPromo = {
      id: promo.id,
      // data-from: PromoCode-id
      code: promo.code,
      // data-from: PromoCode-code
      discountType: promo.discountType,
      // data-from: PromoCode-discountType
      discountValue: discountVal,
      // data-from: PromoCode-discountValue
      minSubtotal: minSub,
      // data-from: PromoCode-minSubtotal
      freeShippingThreshold: freeShip,
      // data-from: PromoCode-freeShippingThreshold
      isActive: promo.isActive
      // data-from: PromoCode-isActive
    };
  }
  const subtotalAfterDiscount = Math.max(0, subtotal - discountAmount);
  const shippingFee = subtotal === 0 || subtotalAfterDiscount >= freeShippingThreshold ? 0 : 5;
  const totalAmount = Math.max(0, subtotal - discountAmount + shippingFee);
  return {
    id: cart.id,
    // data-from: ShoppingCart-id
    customerId: cart.customerId,
    // data-from: ShoppingCart-customerId
    cartStatus: cart.cartStatus,
    // data-from: ShoppingCart-cartStatus
    appliedPromoId: cart.appliedPromoId,
    // data-from: ShoppingCart-appliedPromoId
    appliedPromo,
    items,
    subtotal,
    discountAmount,
    shippingFee,
    totalAmount,
    createdAt: cart.createdAt,
    // data-from: ShoppingCart-createdAt
    updatedAt: cart.updatedAt
    // data-from: ShoppingCart-updatedAt
  };
}
var getProductDetail = (0, import_action_utils.withResult)(
  async (productId) => {
    if (!productId) return null;
    let product = await import_prisma.default.toyProduct.findFirst({
      where: {
        id: productId,
        storefrontStatus: {
          not: "REMOVED"
        }
      }
    });
    if (!product) {
      product = await import_prisma.default.toyProduct.findFirst({
        where: {
          sku: productId,
          storefrontStatus: {
            not: "REMOVED"
          }
        }
      });
    }
    if (!product) return null;
    return mapToyProduct(product);
  }
);
var getActiveCart = (0, import_action_utils.withResult)(
  async () => {
    const authContext = (0, import_action_utils.tryGetAuthContext)();
    if (!authContext?.userId) {
      return null;
    }
    const cart = await import_prisma.default.shoppingCart.findFirst({
      where: {
        customerId: authContext.userId,
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
      return null;
    }
    return buildCartView(cart);
  }
);
var addToCart = (0, import_action_utils.withResult)(
  (0, import_action_utils.requireAuth)(async (productId, quantity) => {
    const userId = (0, import_action_utils.getUserId)();
    if (!productId || quantity <= 0) {
      throw new Error("Invalid product or quantity.");
    }
    const product = await import_prisma.default.toyProduct.findUnique({
      where: { id: productId }
    });
    if (!product || product.storefrontStatus !== "LIVE") {
      throw new Error("This toy is currently unavailable for purchase.");
    }
    if (product.stockCount < quantity) {
      throw new Error(`Insufficient stock. Only ${product.stockCount} units available.`);
    }
    let cart = await import_prisma.default.shoppingCart.findFirst({
      where: {
        customerId: userId,
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
    if (!cart) {
      const defaultPromo = await import_prisma.default.promoCode.findFirst({
        where: { isActive: true },
        orderBy: { createdAt: "asc" }
      });
      cart = await import_prisma.default.shoppingCart.create({
        data: {
          customerId: userId,
          cartStatus: "ACTIVE",
          appliedPromoId: defaultPromo?.id ?? null
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
    const existingItem = cart.cartItems.find((item) => item.productId === productId);
    if (existingItem) {
      const updatedQuantity = Math.min(product.stockCount, existingItem.quantity + quantity);
      await import_prisma.default.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: updatedQuantity }
      });
    } else {
      await import_prisma.default.cartItem.create({
        data: {
          cartId: cart.id,
          productId: product.id,
          quantity: Math.min(product.stockCount, quantity),
          customerId: userId
        }
      });
    }
    const updatedCart = await import_prisma.default.shoppingCart.findUniqueOrThrow({
      where: { id: cart.id },
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
    return buildCartView(updatedCart);
  })
);
var updateCartItemQuantity = (0, import_action_utils.withResult)(
  (0, import_action_utils.requireAuth)(async (cartItemId, quantity) => {
    const userId = (0, import_action_utils.getUserId)();
    const cartItem = await import_prisma.default.cartItem.findFirst({
      where: {
        id: cartItemId,
        customerId: userId
      },
      include: {
        product: true,
        cart: true
      }
    });
    if (!cartItem) {
      throw new Error("Cart item not found.");
    }
    if (quantity <= 0) {
      await import_prisma.default.cartItem.delete({
        where: { id: cartItemId }
      });
    } else {
      const safeQuantity = Math.min(cartItem.product.stockCount, quantity);
      await import_prisma.default.cartItem.update({
        where: { id: cartItemId },
        data: { quantity: safeQuantity }
      });
    }
    const updatedCart = await import_prisma.default.shoppingCart.findUniqueOrThrow({
      where: { id: cartItem.cartId },
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
    return buildCartView(updatedCart);
  })
);
var removeCartItem = (0, import_action_utils.withResult)(
  (0, import_action_utils.requireAuth)(async (cartItemId) => {
    const userId = (0, import_action_utils.getUserId)();
    const cartItem = await import_prisma.default.cartItem.findFirst({
      where: {
        id: cartItemId,
        customerId: userId
      }
    });
    if (!cartItem) {
      throw new Error("Cart item not found.");
    }
    await import_prisma.default.cartItem.delete({
      where: { id: cartItemId }
    });
    const updatedCart = await import_prisma.default.shoppingCart.findUniqueOrThrow({
      where: { id: cartItem.cartId },
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
    return buildCartView(updatedCart);
  })
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addToCart,
  getActiveCart,
  getProductDetail,
  removeCartItem,
  updateCartItemQuantity
});
