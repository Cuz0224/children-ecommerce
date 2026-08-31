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

// common-redirect:@/backend/action_utils
var require_action_utils = __commonJS({
  "common-redirect:@/backend/action_utils"(exports2, module2) {
    module2.exports = require("./_common").backendAuth;
  }
});

// src/backend/actions/ProductCatalogAdmin.ts
var ProductCatalogAdmin_exports = {};
__export(ProductCatalogAdmin_exports, {
  batchSetProductStorefrontStatus: () => batchSetProductStorefrontStatus,
  createToyProduct: () => createToyProduct,
  getCatalogOverview: () => getCatalogOverview,
  quickRestockProduct: () => quickRestockProduct,
  removeToyProduct: () => removeToyProduct,
  setProductStorefrontStatus: () => setProductStorefrontStatus,
  updateToyProduct: () => updateToyProduct
});
module.exports = __toCommonJS(ProductCatalogAdmin_exports);
var import_prisma = __toESM(require_prisma());
var import_action_utils = __toESM(require_action_utils());
async function getMonthlySalesMap() {
  const now = /* @__PURE__ */ new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const salesItems = await import_prisma.default.salesOrderItem.findMany({
    where: {
      order: {
        orderStatus: "COMPLETED",
        createdAt: {
          gte: startOfMonth
        }
      }
    },
    select: {
      productId: true,
      quantity: true
    }
  });
  const map = {};
  for (const item of salesItems) {
    map[item.productId] = (map[item.productId] || 0) + item.quantity;
  }
  return map;
}
function mapToyProductRecord(p, monthlySales = 0) {
  const stock = p.stockCount;
  const threshold = p.reorderThreshold;
  const status = p.storefrontStatus;
  const isLowStock = stock <= threshold && status !== "REMOVED";
  const highlightsArray = Array.isArray(p.highlights) ? p.highlights : typeof p.highlights === "string" ? [p.highlights] : [];
  const boxIncludesArray = Array.isArray(p.boxIncludes) ? p.boxIncludes : typeof p.boxIncludes === "string" ? [p.boxIncludes] : [];
  return {
    id: p.id,
    // data-from: ToyProduct-id
    sku: p.sku,
    // data-from: ToyProduct-sku
    name: p.name || "Untitled Toy",
    // data-from: ToyProduct-name
    subtitle: p.subtitle,
    // data-from: ToyProduct-subtitle
    category: p.category,
    // data-from: ToyProduct-category
    ageGroup: p.ageGroup,
    // data-from: ToyProduct-ageGroup
    price: p.unitPrice ? Number(p.unitPrice) : 0,
    // data-from: ToyProduct-unitPrice
    originalPrice: p.originalPrice ? Number(p.originalPrice) : null,
    // data-from: ToyProduct-originalPrice
    stock: p.stockCount,
    // data-from: ToyProduct-stockCount
    reorderThreshold: p.reorderThreshold,
    // data-from: ToyProduct-reorderThreshold
    storefrontStatus: status,
    // data-from: ToyProduct-storefrontStatus
    productImage: p.productImage,
    // data-from: ToyProduct-productImage data-role: image_url
    badge: p.badge,
    // data-from: ToyProduct-badge
    description: p.description,
    // data-from: ToyProduct-description
    longDescription: p.longDescription,
    // data-from: ToyProduct-longDescription
    highlights: highlightsArray,
    // data-from: ToyProduct-highlights
    materials: p.materials,
    // data-from: ToyProduct-materials
    safetyCertification: p.safetyCertification,
    // data-from: ToyProduct-safetyCertification
    dimensions: p.dimensions,
    // data-from: ToyProduct-dimensions
    boxIncludes: boxIncludesArray,
    // data-from: ToyProduct-boxIncludes
    ratingAverage: p.ratingAverage ? Number(p.ratingAverage) : null,
    // data-from: ToyProduct-ratingAverage
    reviewsCount: p.reviewsCount,
    // data-from: ToyProduct-reviewsCount
    monthlySales,
    lowStockAlert: isLowStock,
    createdAt: p.createdAt,
    // data-from: ToyProduct-createdAt
    updatedAt: p.updatedAt
    // data-from: ToyProduct-updatedAt
  };
}
var getCatalogOverview = (0, import_action_utils.withResult)(
  (0, import_action_utils.requireRole)(import_action_utils.UserRole.Admin)(async () => {
    const [rawProducts, salesMap] = await Promise.all([
      import_prisma.default.toyProduct.findMany({
        orderBy: { createdAt: "desc" }
      }),
      getMonthlySalesMap()
    ]);
    const mappedProducts = rawProducts.map(
      (p) => mapToyProductRecord(p, salesMap[p.id] || 0)
    );
    const nonRemoved = mappedProducts.filter((p) => p.storefrontStatus !== "REMOVED");
    const total = nonRemoved.length;
    const active = nonRemoved.filter((p) => p.storefrontStatus === "LIVE").length;
    const hidden = nonRemoved.filter((p) => p.storefrontStatus === "HIDDEN").length;
    const lowStock = nonRemoved.filter((p) => p.lowStockAlert).length;
    const totalUnits = nonRemoved.reduce((sum, p) => sum + p.stock, 0);
    const liveRate = total > 0 ? Math.round(active / total * 100) : 0;
    const metrics = {
      totalProducts: total,
      activeStorefront: active,
      hiddenDrafts: hidden,
      lowStockAlerts: lowStock,
      totalInventoryUnits: totalUnits,
      storefrontLiveRate: liveRate
    };
    return {
      products: mappedProducts,
      metrics
    };
  })
);
var createToyProduct = (0, import_action_utils.withResult)(
  (0, import_action_utils.requireRole)(import_action_utils.UserRole.Admin)(async (input) => {
    const created = await import_prisma.default.toyProduct.create({
      data: {
        sku: input.sku.trim(),
        name: input.name.trim(),
        subtitle: input.subtitle?.trim() || null,
        category: input.category,
        ageGroup: input.ageGroup,
        unitPrice: input.unitPrice,
        originalPrice: input.originalPrice ?? null,
        stockCount: input.stockCount,
        reorderThreshold: input.reorderThreshold,
        storefrontStatus: input.storefrontStatus || "HIDDEN",
        productImage: input.productImage || null,
        badge: input.badge?.trim() || null,
        description: input.description?.trim() || null,
        longDescription: input.longDescription?.trim() || null,
        highlights: input.highlights,
        materials: input.materials?.trim() || null,
        safetyCertification: input.safetyCertification?.trim() || null,
        dimensions: input.dimensions?.trim() || null,
        boxIncludes: input.boxIncludes,
        ratingAverage: input.ratingAverage ?? null,
        reviewsCount: input.reviewsCount ?? null
      }
    });
    return mapToyProductRecord(created, 0);
  })
);
var updateToyProduct = (0, import_action_utils.withResult)(
  (0, import_action_utils.requireRole)(import_action_utils.UserRole.Admin)(async (input) => {
    const updated = await import_prisma.default.toyProduct.update({
      where: { id: input.id },
      data: {
        sku: input.sku.trim(),
        name: input.name.trim(),
        subtitle: input.subtitle?.trim() || null,
        category: input.category,
        ageGroup: input.ageGroup,
        unitPrice: input.unitPrice,
        originalPrice: input.originalPrice ?? null,
        stockCount: input.stockCount,
        reorderThreshold: input.reorderThreshold,
        storefrontStatus: input.storefrontStatus,
        productImage: input.productImage || null,
        badge: input.badge?.trim() || null,
        description: input.description?.trim() || null,
        longDescription: input.longDescription?.trim() || null,
        highlights: input.highlights,
        materials: input.materials?.trim() || null,
        safetyCertification: input.safetyCertification?.trim() || null,
        dimensions: input.dimensions?.trim() || null,
        boxIncludes: input.boxIncludes,
        ratingAverage: input.ratingAverage ?? null,
        reviewsCount: input.reviewsCount ?? null
      }
    });
    return mapToyProductRecord(updated, 0);
  })
);
var quickRestockProduct = (0, import_action_utils.withResult)(
  (0, import_action_utils.requireRole)(import_action_utils.UserRole.Admin)(async (input) => {
    const updated = await import_prisma.default.toyProduct.update({
      where: { id: input.productId },
      data: {
        stockCount: {
          increment: input.quantity
        }
      }
    });
    return mapToyProductRecord(updated, 0);
  })
);
var setProductStorefrontStatus = (0, import_action_utils.withResult)(
  (0, import_action_utils.requireRole)(import_action_utils.UserRole.Admin)(async (input) => {
    const updated = await import_prisma.default.toyProduct.update({
      where: { id: input.productId },
      data: {
        storefrontStatus: input.status
      }
    });
    return mapToyProductRecord(updated, 0);
  })
);
var batchSetProductStorefrontStatus = (0, import_action_utils.withResult)((0, import_action_utils.requireRole)(import_action_utils.UserRole.Admin)(async (input) => {
  const res = await import_prisma.default.toyProduct.updateMany({
    where: {
      id: {
        in: input.productIds
      }
    },
    data: {
      storefrontStatus: input.status
    }
  });
  return {
    success: true,
    count: res.count
  };
}));
var removeToyProduct = (0, import_action_utils.withResult)(
  (0, import_action_utils.requireRole)(import_action_utils.UserRole.Admin)(async (input) => {
    const updated = await import_prisma.default.toyProduct.update({
      where: { id: input.productId },
      data: {
        storefrontStatus: "REMOVED"
      }
    });
    return mapToyProductRecord(updated, 0);
  })
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  batchSetProductStorefrontStatus,
  createToyProduct,
  getCatalogOverview,
  quickRestockProduct,
  removeToyProduct,
  setProductStorefrontStatus,
  updateToyProduct
});
