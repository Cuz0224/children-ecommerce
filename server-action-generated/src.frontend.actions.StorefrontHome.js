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

// src/frontend/actions/StorefrontHome.ts
var StorefrontHome_exports = {};
__export(StorefrontHome_exports, {
  addToCart: () => addToCart,
  applyPromoCode: () => applyPromoCode,
  clearCart: () => clearCart,
  getCartState: () => getCartState,
  getStorefrontCatalog: () => getStorefrontCatalog,
  removeCartItem: () => removeCartItem,
  removePromoCode: () => removePromoCode,
  updateCartItemQuantity: () => updateCartItemQuantity
});
module.exports = __toCommonJS(StorefrontHome_exports);
var import_prisma = __toESM(require_prisma());
var import_action_utils = __toESM(require_action_utils());
function getCategoryLabel(category) {
  switch (category) {
    case "PLUSH":
    case "INFANT_PLUSH":
      return "Plush Buddies";
    case "STEM_MAKER":
    case "CREATIVE_BUILDING":
      return "STEM & Building";
    case "LEARNING":
    case "WOODEN_TOYS":
      return "Learning & Brain";
    case "OUTDOOR":
      return "Outdoor Active";
    case "ART_CRAFT":
      return "Art & Craft";
    case "PRETEND_PLAY":
      return "Pretend Play";
    default:
      return "Toys";
  }
}
function getAgeGroupLabel(ageGroup) {
  switch (ageGroup) {
    case "AGE_0_2":
      return "0-2 yrs";
    case "AGE_3_5":
      return "3-5 yrs";
    case "AGE_6_8":
      return "6-8 yrs";
    case "AGE_8_PLUS":
      return "8+ yrs";
    case "AGE_9_PLUS":
      return "9+ yrs";
    default:
      return "All Ages";
  }
}
function formatToyProduct(item) {
  const stockCount = item.stockCount ?? 0;
  const reorderThreshold = item.reorderThreshold ?? 5;
  let stockStatus = "In Stock";
  if (stockCount <= 0) {
    stockStatus = "Backorder";
  } else if (stockCount <= 3) {
    stockStatus = "Only 3 Left";
  } else if (stockCount <= reorderThreshold) {
    stockStatus = "Low Stock";
  }
  const highlights = Array.isArray(item.highlights) ? item.highlights : typeof item.highlights === "string" ? JSON.parse(item.highlights || "[]") : [];
  const boxIncludes = Array.isArray(item.boxIncludes) ? item.boxIncludes : typeof item.boxIncludes === "string" ? JSON.parse(item.boxIncludes || "[]") : [];
  const category = item.category;
  const ageGroup = item.ageGroup;
  return {
    id: item.id,
    // data-from: ToyProduct-id
    sku: item.sku,
    // data-from: ToyProduct-sku
    name: item.name ?? "",
    // data-from: ToyProduct-name
    subtitle: item.subtitle ?? "",
    // data-from: ToyProduct-subtitle
    category,
    // data-from: ToyProduct-category
    categoryLabel: getCategoryLabel(category),
    ageGroup,
    // data-from: ToyProduct-ageGroup
    ageLabel: getAgeGroupLabel(ageGroup),
    unitPrice: item.unitPrice ? item.unitPrice.toNumber() : 0,
    // data-from: ToyProduct-unitPrice
    originalPrice: item.originalPrice ? item.originalPrice.toNumber() : null,
    // data-from: ToyProduct-originalPrice
    ratingAverage: item.ratingAverage ? item.ratingAverage.toNumber() : 5,
    // data-from: ToyProduct-ratingAverage
    reviewsCount: item.reviewsCount ?? 0,
    // data-from: ToyProduct-reviewsCount
    badge: item.badge ?? null,
    // data-from: ToyProduct-badge
    storefrontStatus: item.storefrontStatus,
    // data-from: ToyProduct-storefrontStatus
    productImage: item.productImage ?? null,
    // data-from: ToyProduct-productImage data-role: image_url
    description: item.description ?? "",
    // data-from: ToyProduct-description
    longDescription: item.longDescription ?? "",
    // data-from: ToyProduct-longDescription
    highlights,
    // data-from: ToyProduct-highlights
    materials: item.materials ?? null,
    // data-from: ToyProduct-materials
    safetyCertification: item.safetyCertification ?? null,
    // data-from: ToyProduct-safetyCertification
    dimensions: item.dimensions ?? null,
    // data-from: ToyProduct-dimensions
    boxIncludes,
    // data-from: ToyProduct-boxIncludes
    stockCount: item.stockCount ?? 0,
    // data-from: ToyProduct-stockCount
    reorderThreshold: item.reorderThreshold ?? 0,
    // data-from: ToyProduct-reorderThreshold
    specs: {
      materials: item.materials ?? "Hypoallergenic Organic Materials",
      safetyCertification: item.safetyCertification ?? "EU CE & ASTM F963 Certified",
      dimensions: item.dimensions ?? "Standard Toy Dimensions",
      boxIncludes: boxIncludes.length > 0 ? boxIncludes : ["1x Toy Unit", "1x User Guide"],
      stockStatus,
      stockCount: item.stockCount ?? 0
    }
  };
}
function calculateCartState(cartId, rawItems, appliedPromoRecord) {
  const items = rawItems.map((ci) => {
    const productDto = formatToyProduct(ci.product);
    const unitPriceSnapshot = productDto.unitPrice;
    const lineSubtotal = unitPriceSnapshot * ci.quantity;
    return {
      id: ci.id,
      // data-from: CartItem-id
      cartId: ci.cartId,
      // data-from: CartItem-cartId
      productId: ci.productId,
      // data-from: CartItem-productId
      quantity: ci.quantity,
      // data-from: CartItem-quantity
      customerId: ci.customerId,
      // data-from: CartItem-customerId
      unitPriceSnapshot,
      lineSubtotal,
      product: productDto
    };
  });
  const subtotal = items.reduce((sum, item) => sum + item.lineSubtotal, 0);
  let appliedPromo = null;
  let discountAmount = 0;
  if (appliedPromoRecord && appliedPromoRecord.isActive) {
    const discountVal = appliedPromoRecord.discountValue ? appliedPromoRecord.discountValue.toNumber() : 0;
    const minSub = appliedPromoRecord.minSubtotal ? appliedPromoRecord.minSubtotal.toNumber() : null;
    const freeShipThresh = appliedPromoRecord.freeShippingThreshold ? appliedPromoRecord.freeShippingThreshold.toNumber() : null;
    appliedPromo = {
      id: appliedPromoRecord.id,
      // data-from: PromoCode-id
      code: appliedPromoRecord.code,
      // data-from: PromoCode-code
      discountType: appliedPromoRecord.discountType,
      // data-from: PromoCode-discountType
      discountValue: discountVal,
      // data-from: PromoCode-discountValue
      minSubtotal: minSub,
      // data-from: PromoCode-minSubtotal
      freeShippingThreshold: freeShipThresh,
      // data-from: PromoCode-freeShippingThreshold
      isActive: appliedPromoRecord.isActive
      // data-from: PromoCode-isActive
    };
    if (minSub === null || subtotal >= minSub) {
      if (appliedPromoRecord.discountType === "PERCENT") {
        discountAmount = subtotal * discountVal / 100;
      } else {
        discountAmount = discountVal;
      }
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
    id: cartId,
    // data-from: ShoppingCart-id
    cartStatus: "ACTIVE",
    // data-from: ShoppingCart-cartStatus
    appliedPromo,
    items,
    subtotal,
    discountAmount,
    shippingFee,
    totalAmount,
    isFreeShipping,
    remainingForFreeShipping
  };
}
async function getStorefrontCatalog(params) {
  return (0, import_action_utils.withResult)(async () => {
    const whereCondition = {
      storefrontStatus: "LIVE"
    };
    if (params?.category && params.category !== "all") {
      whereCondition.category = params.category;
    }
    if (params?.ageGroup && params.ageGroup !== "all") {
      whereCondition.ageGroup = params.ageGroup;
    }
    if (params?.search && params.search.trim() !== "") {
      const q = params.search.trim();
      whereCondition.OR = [
        { name: { contains: q } },
        { description: { contains: q } },
        { subtitle: { contains: q } },
        { sku: { contains: q } }
      ];
    }
    let orderBy = { createdAt: "desc" };
    if (params?.sort === "price-asc") {
      orderBy = { unitPrice: "asc" };
    } else if (params?.sort === "price-desc") {
      orderBy = { unitPrice: "desc" };
    } else if (params?.sort === "rating") {
      orderBy = { ratingAverage: "desc" };
    } else if (params?.sort === "bestselling") {
      orderBy = { reviewsCount: "desc" };
    }
    const rawProducts = await import_prisma.default.toyProduct.findMany({
      where: whereCondition,
      orderBy
    });
    const products = rawProducts.map(formatToyProduct);
    const featuredProduct = products.length > 0 ? products[0] : null;
    return {
      products,
      totalCount: products.length,
      featuredProduct
    };
  })();
}
async function getCartState() {
  return (0, import_action_utils.withResult)(async () => {
    const authContext = (0, import_action_utils.tryGetAuthContext)();
    if (!authContext || !authContext.userId) {
      return {
        id: "guest-cart",
        cartStatus: "ACTIVE",
        appliedPromo: null,
        items: [],
        subtotal: 0,
        discountAmount: 0,
        shippingFee: 0,
        totalAmount: 0,
        isFreeShipping: false,
        remainingForFreeShipping: 45
      };
    }
    let cart = await import_prisma.default.shoppingCart.findFirst({
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
      cart = await import_prisma.default.shoppingCart.create({
        data: {
          customerId: authContext.userId,
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
    return calculateCartState(cart.id, cart.cartItems, cart.appliedPromo);
  })();
}
async function addToCart(input) {
  return (0, import_action_utils.withResult)(async () => {
    const auth = (0, import_action_utils.getAuthContext)();
    if (!auth || !auth.userId) {
      throw new import_action_utils.UnauthorizedError("Please log in as a customer to add items to your cart.");
    }
    const product = await import_prisma.default.toyProduct.findUnique({
      where: { id: input.productId }
    });
    if (!product || product.storefrontStatus === "REMOVED") {
      throw new Error("This toy product is no longer available for purchase.");
    }
    const qtyToAdd = Math.max(1, input.quantity);
    let cart = await import_prisma.default.shoppingCart.findFirst({
      where: {
        customerId: auth.userId,
        cartStatus: "ACTIVE"
      }
    });
    if (!cart) {
      cart = await import_prisma.default.shoppingCart.create({
        data: {
          customerId: auth.userId,
          cartStatus: "ACTIVE"
        }
      });
    }
    const existingItem = await import_prisma.default.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: input.productId
      }
    });
    if (existingItem) {
      const newQty = Math.min(product.stockCount, existingItem.quantity + qtyToAdd);
      await import_prisma.default.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: newQty }
      });
    } else {
      const initialQty = Math.min(product.stockCount, qtyToAdd);
      await import_prisma.default.cartItem.create({
        data: {
          cartId: cart.id,
          productId: input.productId,
          quantity: initialQty,
          customerId: auth.userId
        }
      });
    }
    const refreshedCart = await import_prisma.default.shoppingCart.findUniqueOrThrow({
      where: { id: cart.id },
      include: {
        appliedPromo: true,
        cartItems: {
          include: { product: true },
          orderBy: { createdAt: "asc" }
        }
      }
    });
    return calculateCartState(refreshedCart.id, refreshedCart.cartItems, refreshedCart.appliedPromo);
  })();
}
async function updateCartItemQuantity(input) {
  return (0, import_action_utils.withResult)(async () => {
    const auth = (0, import_action_utils.getAuthContext)();
    if (!auth || !auth.userId) {
      throw new import_action_utils.UnauthorizedError("Please log in first.");
    }
    const cart = await import_prisma.default.shoppingCart.findFirst({
      where: {
        customerId: auth.userId,
        cartStatus: "ACTIVE"
      }
    });
    if (!cart) {
      throw new Error("Active shopping cart not found.");
    }
    const existingItem = await import_prisma.default.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: input.productId
      },
      include: { product: true }
    });
    if (existingItem) {
      if (input.quantity <= 0) {
        await import_prisma.default.cartItem.delete({
          where: { id: existingItem.id }
        });
      } else {
        const cappedQty = Math.min(existingItem.product.stockCount, input.quantity);
        await import_prisma.default.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: cappedQty }
        });
      }
    }
    const refreshedCart = await import_prisma.default.shoppingCart.findUniqueOrThrow({
      where: { id: cart.id },
      include: {
        appliedPromo: true,
        cartItems: {
          include: { product: true },
          orderBy: { createdAt: "asc" }
        }
      }
    });
    return calculateCartState(refreshedCart.id, refreshedCart.cartItems, refreshedCart.appliedPromo);
  })();
}
async function removeCartItem(input) {
  return (0, import_action_utils.withResult)(async () => {
    const auth = (0, import_action_utils.getAuthContext)();
    if (!auth || !auth.userId) {
      throw new import_action_utils.UnauthorizedError("Please log in first.");
    }
    const cart = await import_prisma.default.shoppingCart.findFirst({
      where: {
        customerId: auth.userId,
        cartStatus: "ACTIVE"
      }
    });
    if (!cart) {
      throw new Error("Active shopping cart not found.");
    }
    const existingItem = await import_prisma.default.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: input.productId
      }
    });
    if (existingItem) {
      await import_prisma.default.cartItem.delete({
        where: { id: existingItem.id }
      });
    }
    const refreshedCart = await import_prisma.default.shoppingCart.findUniqueOrThrow({
      where: { id: cart.id },
      include: {
        appliedPromo: true,
        cartItems: {
          include: { product: true },
          orderBy: { createdAt: "asc" }
        }
      }
    });
    return calculateCartState(refreshedCart.id, refreshedCart.cartItems, refreshedCart.appliedPromo);
  })();
}
async function clearCart() {
  return (0, import_action_utils.withResult)(async () => {
    const auth = (0, import_action_utils.getAuthContext)();
    if (!auth || !auth.userId) {
      throw new import_action_utils.UnauthorizedError("Please log in first.");
    }
    const cart = await import_prisma.default.shoppingCart.findFirst({
      where: {
        customerId: auth.userId,
        cartStatus: "ACTIVE"
      }
    });
    if (cart) {
      await import_prisma.default.cartItem.deleteMany({
        where: { cartId: cart.id }
      });
      await import_prisma.default.shoppingCart.update({
        where: { id: cart.id },
        data: { appliedPromoId: null }
      });
    }
    return {
      id: cart?.id ?? "cart-active",
      cartStatus: "ACTIVE",
      appliedPromo: null,
      items: [],
      subtotal: 0,
      discountAmount: 0,
      shippingFee: 0,
      totalAmount: 0,
      isFreeShipping: false,
      remainingForFreeShipping: 45
    };
  })();
}
async function applyPromoCode(input) {
  return (0, import_action_utils.withResult)(async () => {
    const auth = (0, import_action_utils.getAuthContext)();
    if (!auth || !auth.userId) {
      throw new import_action_utils.UnauthorizedError("Please log in first.");
    }
    const cleanCode = input.code.trim().toUpperCase();
    const allPromos = await import_prisma.default.promoCode.findMany({
      where: {
        isActive: true
      }
    });
    const promo = allPromos.find((p) => p.code.toUpperCase() === cleanCode);
    if (!promo) {
      throw new Error(`Promo code "${input.code}" is invalid or expired.`);
    }
    const cart = await import_prisma.default.shoppingCart.findFirst({
      where: {
        customerId: auth.userId,
        cartStatus: "ACTIVE"
      },
      include: {
        cartItems: {
          include: { product: true }
        }
      }
    });
    if (!cart) {
      throw new Error("Active shopping cart not found.");
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
    await import_prisma.default.shoppingCart.update({
      where: { id: cart.id },
      data: { appliedPromoId: promo.id }
    });
    const refreshedCart = await import_prisma.default.shoppingCart.findUniqueOrThrow({
      where: { id: cart.id },
      include: {
        appliedPromo: true,
        cartItems: {
          include: { product: true },
          orderBy: { createdAt: "asc" }
        }
      }
    });
    return calculateCartState(refreshedCart.id, refreshedCart.cartItems, refreshedCart.appliedPromo);
  })();
}
async function removePromoCode() {
  return (0, import_action_utils.withResult)(async () => {
    const auth = (0, import_action_utils.getAuthContext)();
    if (!auth || !auth.userId) {
      throw new import_action_utils.UnauthorizedError("Please log in first.");
    }
    const cart = await import_prisma.default.shoppingCart.findFirst({
      where: {
        customerId: auth.userId,
        cartStatus: "ACTIVE"
      }
    });
    if (!cart) {
      throw new Error("Active shopping cart not found.");
    }
    await import_prisma.default.shoppingCart.update({
      where: { id: cart.id },
      data: { appliedPromoId: null }
    });
    const refreshedCart = await import_prisma.default.shoppingCart.findUniqueOrThrow({
      where: { id: cart.id },
      include: {
        appliedPromo: true,
        cartItems: {
          include: { product: true },
          orderBy: { createdAt: "asc" }
        }
      }
    });
    return calculateCartState(refreshedCart.id, refreshedCart.cartItems, refreshedCart.appliedPromo);
  })();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addToCart,
  applyPromoCode,
  clearCart,
  getCartState,
  getStorefrontCatalog,
  removeCartItem,
  removePromoCode,
  updateCartItemQuantity
});
