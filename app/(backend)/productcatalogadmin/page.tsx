"use client";

import React, { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { Boxes, ShieldCheck, Loader2 } from "lucide-react";
import { getCatalogOverview, createToyProduct, updateToyProduct, quickRestockProduct, setProductStorefrontStatus, batchSetProductStorefrontStatus, removeToyProduct } from "@/backend/actions/ProductCatalogAdmin";
import type { ToyProductItem, FilterState, CatalogMetrics, SortField, StorefrontStatus, ToyCategory, ToyAgeGroup } from "@/backend/types/ProductCatalogAdmin";
import { useAdminSession } from "@/tools/BackendSession";
import MetricsOverview from "@/backend/components/ProductCatalogAdmin/MetricsOverview";
import ProductToolbar from "@/backend/components/ProductCatalogAdmin/ProductToolbar";
import ProductTable from "@/backend/components/ProductCatalogAdmin/ProductTable";
import LowStockPanel from "@/backend/components/ProductCatalogAdmin/LowStockPanel";
import ProductModalDrawer, { type ProductFormData } from "@/backend/components/ProductCatalogAdmin/ProductModalDrawer";
import DeleteConfirmDialog from "@/backend/components/ProductCatalogAdmin/DeleteConfirmDialog";
export default function AdminHomePage() {
  const adminSession = useAdminSession();
  const [products, setProducts] = useState<ToyProductItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Filter & Search state
  const [filterState, setFilterState] = useState<FilterState>({
    searchQuery: "",
    category: "ALL",
    visibility: "ALL",
    ageGroup: "ALL",
    sortField: "stock",
    sortOrder: "asc"
  });

  // Modal drawer state
  const [isAddEditOpen, setIsAddEditOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<ToyProductItem | null>(null);

  // Delete dialog state
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [deletingProduct, setDeletingProduct] = useState<ToyProductItem | null>(null);

  // Fetch catalog overview on mount
  useEffect(() => {
    let isMounted = true;
    const fetchCatalog = async () => {
      try {
        setLoading(true);
        const data = await getCatalogOverview();
        if (isMounted) {
          setProducts(data.products || []);
        }
      } catch (err) {
        if (isMounted) {
          toast.error("Failed to load catalog data");
          setProducts([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    fetchCatalog();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter & Sort updates
  const handleFilterChange = (updates: Partial<FilterState>) => {
    setFilterState(prev => ({
      ...prev,
      ...updates
    }));
  };
  const handleResetFilters = () => {
    setFilterState({
      searchQuery: "",
      category: "ALL",
      visibility: "ALL",
      ageGroup: "ALL",
      sortField: "stock",
      sortOrder: "asc"
    });
    toast.info("Search and filters reset");
  };

  // Sort toggle handler
  const handleSort = (field: SortField) => {
    setFilterState(prev => {
      if (prev.sortField === field) {
        return {
          ...prev,
          sortOrder: prev.sortOrder === "asc" ? "desc" : "asc"
        };
      }
      return {
        ...prev,
        sortField: field,
        sortOrder: "asc"
      };
    });
  };

  // Visibility toggle
  const handleToggleVisibility = async (id: string, currentStatus: StorefrontStatus, name: string) => {
    const nextStatus: StorefrontStatus = currentStatus === "LIVE" ? "HIDDEN" : "LIVE";
    try {
      const updated = await setProductStorefrontStatus({
        productId: id,
        status: nextStatus
      });
      setProducts(prev => prev.map((item, index) => item.id === id ? updated : item));
      if (nextStatus === "LIVE") {
        toast.success(`Published "${name}" to live storefront`);
      } else {
        toast.info(`Moved "${name}" to hidden drafts`);
      }
    } catch (err) {
      toast.error(`Failed to update status for "${name}"`);
    }
  };

  // Batch toggle visibility
  const handleBatchToggleVisibility = async (ids: string[], targetStatus: "LIVE" | "HIDDEN") => {
    try {
      await batchSetProductStorefrontStatus({
        productIds: ids,
        status: targetStatus
      });
      setProducts(prev => prev.map((item, index) => ids.includes(item.id) ? {
        ...item,
        storefrontStatus: targetStatus
      } : item));
      toast.success(targetStatus === "LIVE" ? `Published ${ids.length} selected toys to live storefront` : `Moved ${ids.length} selected toys to hidden drafts`);
    } catch (err) {
      toast.error("Failed to update status for selected toys");
    }
  };

  // Quick Restock
  const handleQuickRestock = async (id: string, amount: number, name: string) => {
    try {
      const updated = await quickRestockProduct({
        productId: id,
        quantity: amount
      });
      setProducts(prev => prev.map((item, index) => item.id === id ? updated : item));
      toast.success(`Restocked +${amount} units for "${name}"`);
    } catch (err) {
      toast.error(`Failed to restock "${name}"`);
    }
  };

  // Save product (Add or Edit)
  const handleSaveProduct = async (formData: ProductFormData) => {
    try {
      if (editingProduct) {
        const updated = await updateToyProduct({
          id: editingProduct.id,
          sku: formData.sku,
          name: formData.name,
          subtitle: formData.subtitle || null,
          category: formData.category,
          ageGroup: formData.ageGroup,
          unitPrice: Number(formData.price ?? 0),
          originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
          stockCount: Number(formData.stock ?? 0),
          reorderThreshold: Number(formData.reorderThreshold ?? 10),
          storefrontStatus: formData.storefrontStatus || editingProduct.storefrontStatus || "HIDDEN",
          productImage: formData.productImage || null,
          badge: formData.badge || null,
          description: formData.description || null,
          longDescription: formData.longDescription || null,
          highlights: Array.isArray(formData.highlights) ? formData.highlights : [],
          materials: formData.materials || null,
          safetyCertification: formData.safetyCertification || null,
          dimensions: formData.dimensions || null,
          boxIncludes: Array.isArray(formData.boxIncludes) ? formData.boxIncludes : [],
          ratingAverage: formData.ratingAverage != null ? Number(formData.ratingAverage) : null,
          reviewsCount: formData.reviewsCount != null ? Number(formData.reviewsCount) : null
        });
        setProducts(prev => prev.map((item, index) => item.id === editingProduct.id ? updated : item));
        toast.success(`Updated catalog specifications for "${formData.name}"`);
      } else {
        const created = await createToyProduct({
          sku: formData.sku,
          name: formData.name,
          subtitle: formData.subtitle || null,
          category: formData.category,
          ageGroup: formData.ageGroup,
          unitPrice: Number(formData.price ?? 0),
          originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
          stockCount: Number(formData.stock ?? 0),
          reorderThreshold: Number(formData.reorderThreshold ?? 10),
          storefrontStatus: formData.storefrontStatus || "HIDDEN",
          productImage: formData.productImage || null,
          badge: formData.badge || null,
          description: formData.description || null,
          longDescription: formData.longDescription || null,
          highlights: Array.isArray(formData.highlights) ? formData.highlights : [],
          materials: formData.materials || null,
          safetyCertification: formData.safetyCertification || null,
          dimensions: formData.dimensions || null,
          boxIncludes: Array.isArray(formData.boxIncludes) ? formData.boxIncludes : [],
          ratingAverage: formData.ratingAverage != null ? Number(formData.ratingAverage) : null,
          reviewsCount: formData.reviewsCount != null ? Number(formData.reviewsCount) : null
        });
        setProducts(prev => [created, ...prev]);
        toast.success(`Successfully added "${formData.name}" to catalog`);
      }
      setIsAddEditOpen(false);
      setEditingProduct(null);
    } catch (err) {
      toast.error(editingProduct ? "Failed to update toy product" : "Failed to create toy product");
    }
  };

  // Delete product (Set to REMOVED)
  const handleConfirmDelete = async () => {
    if (!deletingProduct) return;
    try {
      const updated = await removeToyProduct({
        productId: deletingProduct.id
      });
      setProducts(prev => prev.map((item, index) => item.id === deletingProduct.id ? updated : item));
      toast.success(`Delisted "${deletingProduct.name}" from storefront catalog`);
      setIsDeleteOpen(false);
      setDeletingProduct(null);
    } catch (err) {
      toast.error("Failed to remove toy product");
    }
  };

  // Open Edit modal
  const handleOpenEdit = (product: ToyProductItem) => {
    setEditingProduct(product);
    setIsAddEditOpen(true);
  };

  // Open Add modal
  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsAddEditOpen(true);
  };

  // Open Delete confirmation
  const handleOpenDelete = (product: ToyProductItem) => {
    setDeletingProduct(product);
    setIsDeleteOpen(true);
  };

  // Filtered & Sorted items computation
  const filteredProducts = useMemo(() => {
    return products.filter(item => {
      // Keyword Search
      if (filterState.searchQuery.trim()) {
        const q = filterState.searchQuery.toLowerCase();
        const matchName = (item.name || "").toLowerCase().includes(q);
        const matchSku = (item.sku || "").toLowerCase().includes(q);
        const matchDesc = (item.description || "").toLowerCase().includes(q);
        if (!matchName && !matchSku && !matchDesc) return false;
      }

      // Category Filter
      if (filterState.category !== "ALL" && item.category !== filterState.category) {
        return false;
      }

      // Age Group Filter
      if (filterState.ageGroup !== "ALL" && item.ageGroup !== filterState.ageGroup) {
        return false;
      }

      // Visibility Filter: exclude REMOVED by default unless explicitly filtering for REMOVED
      if (filterState.visibility === "ALL") {
        return item.storefrontStatus !== "REMOVED";
      }
      if (filterState.visibility === "LIVE") {
        return item.storefrontStatus === "LIVE";
      }
      if (filterState.visibility === "HIDDEN") {
        return item.storefrontStatus === "HIDDEN";
      }
      if (filterState.visibility === "REMOVED") {
        return item.storefrontStatus === "REMOVED";
      }
      return true;
    }).sort((a, b) => {
      const orderMultiplier = filterState.sortOrder === "asc" ? 1 : -1;
      if (filterState.sortField === "price") {
        return ((a.price || 0) - (b.price || 0)) * orderMultiplier;
      }
      if (filterState.sortField === "stock") {
        return ((a.stock || 0) - (b.stock || 0)) * orderMultiplier;
      }
      if (filterState.sortField === "sales") {
        return ((a.monthlySales || 0) - (b.monthlySales || 0)) * orderMultiplier;
      }
      if (filterState.sortField === "rating") {
        return ((a.ratingAverage || 0) - (b.ratingAverage || 0)) * orderMultiplier;
      }
      return (a.name || "").localeCompare(b.name || "") * orderMultiplier;
    });
  }, [products, filterState]);

  // Dynamic Catalog Metrics calculation (Excluding REMOVED)
  const metrics: CatalogMetrics = useMemo(() => {
    const nonRemoved = products.filter(p => p.storefrontStatus !== "REMOVED");
    const total = nonRemoved.length;
    const active = nonRemoved.filter(p => p.storefrontStatus === "LIVE").length;
    const hidden = nonRemoved.filter(p => p.storefrontStatus === "HIDDEN").length;
    const lowStock = nonRemoved.filter(p => p.lowStockAlert || p.stock <= p.reorderThreshold && p.storefrontStatus !== "REMOVED").length;
    const totalUnits = nonRemoved.reduce((sum, p) => sum + (p.stock || 0), 0);
    const liveRate = total > 0 ? Math.round(active / total * 100) : 0;
    return {
      totalProducts: total,
      activeStorefront: active,
      hiddenDrafts: hidden,
      lowStockAlerts: lowStock,
      totalInventoryUnits: totalUnits,
      storefrontLiveRate: liveRate
    };
  }, [products]);

  // Counts for filters
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    products.filter(p => p.storefrontStatus !== "REMOVED").forEach(p => {
      if (p.category) {
        counts[p.category] = (counts[p.category] || 0) + 1;
      }
    });
    return counts;
  }, [products]);
  const visibilityCounts = useMemo(() => {
    return {
      all: products.filter(p => p.storefrontStatus !== "REMOVED").length,
      live: products.filter(p => p.storefrontStatus === "LIVE").length,
      hidden: products.filter(p => p.storefrontStatus === "HIDDEN").length,
      removed: products.filter(p => p.storefrontStatus === "REMOVED").length
    };
  }, [products]);
  return <div className="w-full max-w-full min-w-0 p-4 lg:p-6 flex flex-col gap-6 bg-background text-foreground">
      {/* 1. Clean Operational Page Header */}
      <header data-controller-name="Product Operations Header" className="w-full min-w-0 flex flex-col gap-3 rounded-2xl border border-border/50 bg-card text-card-foreground p-5 sm:p-6 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-w-0">
          <div className="min-w-0">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm border border-border/50 shadow-sm">
                <Boxes className="w-4 h-4" />
              </span>
              <h1 className="font-display font-black text-2xl sm:text-3xl text-card-foreground tracking-tight">
                Product Operations Overview
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">
              Toy Workshop Dispatch Desk · Live inventory oversight, storefront catalog publishing, and stock replenishment.
            </p>
          </div>

          {/* Operational Status Chips */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {loading && <div className="inline-flex shrink-0 items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-muted text-muted-foreground border border-border">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Syncing catalog...</span>
              </div>}
            <div className="inline-flex shrink-0 whitespace-nowrap items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-success text-success-foreground border border-border/50 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Storefront Catalog Active</span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Top Metrics Overview Cards (4 Key Gauges) */}
      <MetricsOverview metrics={metrics} />

      {/* 3. Product Management Toolbar (Search, Multi-Filters, Actions) */}
      <ProductToolbar filterState={filterState} onFilterChange={handleFilterChange} onResetFilters={handleResetFilters} onOpenAddModal={handleOpenAdd} totalCount={products.length} filteredCount={filteredProducts.length} categoryCounts={categoryCounts} visibilityCounts={visibilityCounts} />

      {/* 4. Main Workspace Layout (8:4 ratio in xl:grid-cols-12) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 min-w-0 items-start">
        {/* Left Column: Product Operations Table (~67% width on desktop) */}
        <section className="min-w-0 xl:col-span-8 flex flex-col gap-4">
          <ProductTable products={filteredProducts} sortField={filterState.sortField} sortOrder={filterState.sortOrder} onSort={handleSort} onToggleVisibility={handleToggleVisibility} onQuickRestock={handleQuickRestock} onEditProduct={handleOpenEdit} onDeleteProduct={handleOpenDelete} onBatchToggleVisibility={handleBatchToggleVisibility} onResetFilters={handleResetFilters} />
        </section>

        {/* Right Column: Low-Stock Attention Panel & Category Gauges (~33% width) */}
        <aside className="min-w-0 xl:col-span-4 flex flex-col gap-4">
          <LowStockPanel products={products} onQuickRestock={handleQuickRestock} onEditProduct={handleOpenEdit} />
        </aside>
      </div>

      {/* 5. In-Place Modal Drawer for Add/Edit Toy Record */}
      <ProductModalDrawer isOpen={isAddEditOpen} onClose={() => {
      setIsAddEditOpen(false);
      setEditingProduct(null);
    }} onSave={handleSaveProduct} editingProduct={editingProduct} />

      {/* 6. Delete Confirmation Dialog */}
      <DeleteConfirmDialog isOpen={isDeleteOpen} onClose={() => {
      setIsDeleteOpen(false);
      setDeletingProduct(null);
    }} onConfirm={handleConfirmDelete} product={deletingProduct} />
    </div>;
}
