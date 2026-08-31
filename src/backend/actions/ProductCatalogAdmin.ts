'use server';

import prisma from '@/tools/prisma';
import { withResult, requireRole, UserRole } from '@/backend/action_utils';
import type {
  ToyCategory,
  ToyAgeGroup,
  StorefrontStatus,
  ToyProductItem,
  CatalogMetrics,
  GetCatalogOverviewOutput,
  CreateToyProductInput,
  UpdateToyProductInput,
  QuickRestockInput,
  SetProductStatusInput,
  BatchSetStatusInput,
  RemoveProductInput,
} from '@/backend/types/ProductCatalogAdmin';

/**
 * Helper to compute read-time monthly sales from completed sales orders within current calendar month
 */
async function getMonthlySalesMap(): Promise<Record<string, number>> {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const salesItems = await prisma.salesOrderItem.findMany({
    where: {
      order: {
        orderStatus: 'COMPLETED',
        createdAt: {
          gte: startOfMonth,
        },
      },
    },
    select: {
      productId: true,
      quantity: true,
    },
  });

  const map: Record<string, number> = {};
  for (const item of salesItems) {
    map[item.productId] = (map[item.productId] || 0) + item.quantity;
  }
  return map;
}

/**
 * Maps raw ToyProduct record to clean ToyProductItem Output
 */
function mapToyProductRecord(
  p: {
    id: string;
    sku: string;
    category: ToyCategory;
    ageGroup: ToyAgeGroup;
    unitPrice: any;
    originalPrice: any;
    stockCount: number;
    reorderThreshold: number;
    storefrontStatus: StorefrontStatus;
    productImage: string | null;
    badge: string | null;
    name: string | null;
    subtitle: string | null;
    description: string | null;
    longDescription: string | null;
    highlights: any;
    materials: string | null;
    safetyCertification: string | null;
    dimensions: string | null;
    boxIncludes: any;
    ratingAverage: any;
    reviewsCount: number | null;
    createdAt: Date;
    updatedAt: Date;
  },
  monthlySales = 0
): ToyProductItem {
  const stock = p.stockCount;
  const threshold = p.reorderThreshold;
  const status = p.storefrontStatus;
  const isLowStock = stock <= threshold && status !== 'REMOVED';

  const highlightsArray = Array.isArray(p.highlights)
    ? (p.highlights as string[])
    : typeof p.highlights === 'string'
    ? [p.highlights]
    : [];

  const boxIncludesArray = Array.isArray(p.boxIncludes)
    ? (p.boxIncludes as string[])
    : typeof p.boxIncludes === 'string'
    ? [p.boxIncludes]
    : [];

  return {
    id: p.id, // data-from: ToyProduct-id
    sku: p.sku, // data-from: ToyProduct-sku
    name: p.name || 'Untitled Toy', // data-from: ToyProduct-name
    subtitle: p.subtitle, // data-from: ToyProduct-subtitle
    category: p.category, // data-from: ToyProduct-category
    ageGroup: p.ageGroup, // data-from: ToyProduct-ageGroup
    price: p.unitPrice ? Number(p.unitPrice) : 0, // data-from: ToyProduct-unitPrice
    originalPrice: p.originalPrice ? Number(p.originalPrice) : null, // data-from: ToyProduct-originalPrice
    stock: p.stockCount, // data-from: ToyProduct-stockCount
    reorderThreshold: p.reorderThreshold, // data-from: ToyProduct-reorderThreshold
    storefrontStatus: status, // data-from: ToyProduct-storefrontStatus
    productImage: p.productImage, // data-from: ToyProduct-productImage data-role: image_url
    badge: p.badge, // data-from: ToyProduct-badge
    description: p.description, // data-from: ToyProduct-description
    longDescription: p.longDescription, // data-from: ToyProduct-longDescription
    highlights: highlightsArray, // data-from: ToyProduct-highlights
    materials: p.materials, // data-from: ToyProduct-materials
    safetyCertification: p.safetyCertification, // data-from: ToyProduct-safetyCertification
    dimensions: p.dimensions, // data-from: ToyProduct-dimensions
    boxIncludes: boxIncludesArray, // data-from: ToyProduct-boxIncludes
    ratingAverage: p.ratingAverage ? Number(p.ratingAverage) : null, // data-from: ToyProduct-ratingAverage
    reviewsCount: p.reviewsCount, // data-from: ToyProduct-reviewsCount
    monthlySales,
    lowStockAlert: isLowStock,
    createdAt: p.createdAt, // data-from: ToyProduct-createdAt
    updatedAt: p.updatedAt, // data-from: ToyProduct-updatedAt
  };
}

/**
 * 1. Get Catalog Overview:
 * Fetch full toy product list, read-time monthly sales aggregations, and compute catalog metrics.
 * Domain rules:
 * - total products excludes REMOVED
 * - active storefront counts LIVE
 * - hidden drafts counts HIDDEN
 * - low stock alerts: stockCount <= reorderThreshold && storefrontStatus != REMOVED
 * - total inventory sums stockCount for non-REMOVED
 * - live rate: active / total non-REMOVED
 */
export const getCatalogOverview = withResult<[], GetCatalogOverviewOutput>(
  requireRole(UserRole.Admin)(async (): Promise<GetCatalogOverviewOutput> => {
    const [rawProducts, salesMap] = await Promise.all([
      prisma.toyProduct.findMany({
        orderBy: { createdAt: 'desc' },
      }),
      getMonthlySalesMap(),
    ]);

    const mappedProducts = rawProducts.map((p) =>
      mapToyProductRecord(p, salesMap[p.id] || 0)
    );

    const nonRemoved = mappedProducts.filter((p) => p.storefrontStatus !== 'REMOVED');
    const total = nonRemoved.length;
    const active = nonRemoved.filter((p) => p.storefrontStatus === 'LIVE').length;
    const hidden = nonRemoved.filter((p) => p.storefrontStatus === 'HIDDEN').length;
    const lowStock = nonRemoved.filter((p) => p.lowStockAlert).length;
    const totalUnits = nonRemoved.reduce((sum, p) => sum + p.stock, 0);
    const liveRate = total > 0 ? Math.round((active / total) * 100) : 0;

    const metrics: CatalogMetrics = {
      totalProducts: total,
      activeStorefront: active,
      hiddenDrafts: hidden,
      lowStockAlerts: lowStock,
      totalInventoryUnits: totalUnits,
      storefrontLiveRate: liveRate,
    };

    return {
      products: mappedProducts,
      metrics,
    };
  })
);

/**
 * 2. Create Toy Product:
 * Staged new products with storefrontStatus=HIDDEN by default.
 */
export const createToyProduct = withResult<[CreateToyProductInput], ToyProductItem>(
  requireRole(UserRole.Admin)(async (input: CreateToyProductInput): Promise<ToyProductItem> => {
    const created = await prisma.toyProduct.create({
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
        storefrontStatus: input.storefrontStatus || 'HIDDEN',
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
        reviewsCount: input.reviewsCount ?? null,
      },
    });

    return mapToyProductRecord(created, 0);
  })
);

/**
 * 3. Update Toy Product:
 * Updates catalog fields without changing storefrontStatus unless explicitly provided.
 */
export const updateToyProduct = withResult<[UpdateToyProductInput], ToyProductItem>(
  requireRole(UserRole.Admin)(async (input: UpdateToyProductInput): Promise<ToyProductItem> => {
    const updated = await prisma.toyProduct.update({
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
        reviewsCount: input.reviewsCount ?? null,
      },
    });

    return mapToyProductRecord(updated, 0);
  })
);

/**
 * 4. Quick Restock:
 * Increases stockCount by selected quantity without altering storefrontStatus.
 */
export const quickRestockProduct = withResult<[QuickRestockInput], ToyProductItem>(
  requireRole(UserRole.Admin)(async (input: QuickRestockInput): Promise<ToyProductItem> => {
    const updated = await prisma.toyProduct.update({
      where: { id: input.productId },
      data: {
        stockCount: {
          increment: input.quantity,
        },
      },
    });

    return mapToyProductRecord(updated, 0);
  })
);

/**
 * 5. Set Product Storefront Status:
 * Toggle or set product status between LIVE and HIDDEN.
 */
export const setProductStorefrontStatus = withResult<[SetProductStatusInput], ToyProductItem>(
  requireRole(UserRole.Admin)(async (input: SetProductStatusInput): Promise<ToyProductItem> => {
    const updated = await prisma.toyProduct.update({
      where: { id: input.productId },
      data: {
        storefrontStatus: input.status,
      },
    });

    return mapToyProductRecord(updated, 0);
  })
);

/**
 * 6. Batch Set Product Storefront Status:
 * Sets multiple selected products to LIVE or HIDDEN.
 */
export const batchSetProductStorefrontStatus = withResult<
  [BatchSetStatusInput],
  { success: boolean; count: number }
>(requireRole(UserRole.Admin)(async (input: BatchSetStatusInput): Promise<{ success: boolean; count: number }> => {
  const res = await prisma.toyProduct.updateMany({
    where: {
      id: {
        in: input.productIds,
      },
    },
    data: {
      storefrontStatus: input.status,
    },
  });

  return {
    success: true,
    count: res.count,
  };
}));

/**
 * 7. Remove Toy Product:
 * Delists product by setting storefrontStatus=REMOVED.
 */
export const removeToyProduct = withResult<[RemoveProductInput], ToyProductItem>(
  requireRole(UserRole.Admin)(async (input: RemoveProductInput): Promise<ToyProductItem> => {
    const updated = await prisma.toyProduct.update({
      where: { id: input.productId },
      data: {
        storefrontStatus: 'REMOVED',
      },
    });

    return mapToyProductRecord(updated, 0);
  })
);