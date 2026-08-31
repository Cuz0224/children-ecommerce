"use client";

import React from "react";
import EditableImg from "@/@base/EditableImg";
import { AlertTriangle, Plus, PackageCheck, PieChart, Truck } from "lucide-react";
import type { ToyProductItem, ToyCategory } from "@/backend/types/ProductCatalogAdmin";
import { CATEGORY_LABEL_MAP } from "@/backend/types/ProductCatalogAdmin";
interface LowStockPanelProps {
  products: ToyProductItem[];
  onQuickRestock: (id: string, amount: number, name: string) => void;
  onEditProduct: (product: ToyProductItem) => void;
}
const CATEGORY_COLORS: Record<ToyCategory, {
  bg: string;
  fill: string;
  barColor: string;
}> = {
  WOODEN_TOYS: {
    bg: "bg-amber-100",
    fill: "text-amber-900",
    barColor: "bg-amber-500"
  },
  STEM_MAKER: {
    bg: "bg-blue-100",
    fill: "text-blue-900",
    barColor: "bg-blue-500"
  },
  INFANT_PLUSH: {
    bg: "bg-pink-100",
    fill: "text-pink-900",
    barColor: "bg-pink-500"
  },
  CREATIVE_BUILDING: {
    bg: "bg-emerald-100",
    fill: "text-emerald-900",
    barColor: "bg-emerald-500"
  },
  PRETEND_PLAY: {
    bg: "bg-orange-100",
    fill: "text-orange-900",
    barColor: "bg-orange-500"
  },
  ART_CRAFT: {
    bg: "bg-purple-100",
    fill: "text-purple-900",
    barColor: "bg-purple-500"
  },
  LEARNING: {
    bg: "bg-teal-100",
    fill: "text-teal-900",
    barColor: "bg-teal-500"
  },
  OUTDOOR: {
    bg: "bg-lime-100",
    fill: "text-lime-900",
    barColor: "bg-lime-500"
  },
  PLUSH: {
    bg: "bg-rose-100",
    fill: "text-rose-900",
    barColor: "bg-rose-500"
  }
};
export default function LowStockPanel({
  products,
  onQuickRestock,
  onEditProduct
}: LowStockPanelProps) {
  // Find products that are at or below reorder threshold and not REMOVED
  const lowStockItems = products.filter(p => (p.lowStockAlert || p.stock <= p.reorderThreshold) && p.storefrontStatus !== "REMOVED").sort((a, b) => a.stock - b.stock);

  // Compute category distributions for active inventory
  const activeProducts = products.filter(p => p.storefrontStatus !== "REMOVED");
  const categoriesList: ToyCategory[] = ["WOODEN_TOYS", "STEM_MAKER", "INFANT_PLUSH", "CREATIVE_BUILDING", "PRETEND_PLAY", "ART_CRAFT", "LEARNING", "OUTDOOR", "PLUSH"];
  const totalActiveUnits = activeProducts.reduce((sum, item) => sum + (item.stock || 0), 0);
  const totalAllUnits = totalActiveUnits || 1;
  const categoryStats = categoriesList.map((catKey, index) => {
    const label = CATEGORY_LABEL_MAP[catKey] || catKey;
    const matching = activeProducts.filter(p => p.category === catKey);
    const totalUnits = matching.reduce((sum, item) => sum + (item.stock || 0), 0);
    const percentage = Math.round(totalUnits / totalAllUnits * 100);
    return {
      categoryKey: catKey,
      label,
      count: matching.length,
      totalUnits,
      percentage
    };
  }).filter((c, idx) => c.count > 0 || idx < 6);
  return <aside data-controller-name="Low-Stock Attention Panel" className="w-full min-w-0 flex flex-col gap-4" data-api-unique-id='lowstockpanel-r9d263af10ddbec85-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel'>
      {/* 1. Low-Stock Attention Alert Box */}
      <div className="w-full min-w-0 rounded-2xl border border-border/50 bg-card text-card-foreground p-5 shadow-md flex flex-col gap-4" data-api-unique-id='lowstockpanel-rc796041d4d130abb-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel'>
        <div className="flex items-start justify-between gap-3 min-w-0" data-api-unique-id='lowstockpanel-raf347c4cc4f80299-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel'>
          <div className="min-w-0" data-api-unique-id='lowstockpanel-r4d56b760423a084f-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel'>
            <div className="flex items-center gap-2" data-api-unique-id='lowstockpanel-ra250d81c37c7eb82-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel'>
              <span className="w-7 h-7 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center shrink-0 border border-destructive/20" data-api-unique-id='lowstockpanel-re93829cac511aeda-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel'>
                <AlertTriangle className="w-4 h-4" data-api-unique-id='lowstockpanel-r31d380236a105074-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel' />
              </span>
              <h3 className="font-display font-bold text-base text-card-foreground" data-api-unique-id='lowstockpanel-r23117c00f6c413a8-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel'>
                Low Inventory Alerts
              </h3>
            </div>
            <p className="text-xs text-muted-foreground mt-1" data-api-unique-id='lowstockpanel-r4b3c26b9608ef9b4-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel'>
              Items requiring immediate warehouse restocking
            </p>
          </div>
          <span className="inline-flex shrink-0 whitespace-nowrap items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-destructive text-destructive-foreground" data-api-unique-id='lowstockpanel-r68cc5a68d350962e-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel'>
            {lowStockItems.length} Urgent
          </span>
        </div>

        {/* Low Stock Toy Cards */}
        <div className="flex flex-col gap-3 min-w-0" data-api-unique-id='lowstockpanel-rf390b1bdab10e43a-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel'>
          {lowStockItems.length === 0 ? <div className="flex flex-col items-center justify-center p-6 text-center rounded-xl border border-dashed border-border bg-muted/30" data-api-unique-id='lowstockpanel-rb171da8cf7322081-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel'>
              <PackageCheck className="w-8 h-8 text-success mb-2" data-api-unique-id='lowstockpanel-r5bd2ee9b0eb4f445-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel' />
              <span className="text-xs font-bold text-card-foreground" data-api-unique-id='lowstockpanel-rf972f0296ad9d429-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel'>
                All inventory levels optimal
              </span>
              <span className="text-[11px] text-muted-foreground mt-0.5" data-api-unique-id='lowstockpanel-r077133429bef44dd-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel'>
                No products are currently under critical reorder threshold.
              </span>
            </div> : lowStockItems.slice(0, 4).map((item, index) => <div key={item.id} className="w-full min-w-0 rounded-xl border border-border/50 bg-muted/30 p-3 flex flex-col gap-2.5 hover:border-border transition-all" data-api-unique-id='lowstockpanel-r22c8e28d6e12d30d-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel' data-api-in-loop='1'>
                <div className="flex items-center gap-3 min-w-0" data-api-unique-id='lowstockpanel-r8241f988bddf91d6-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel' data-api-in-loop='1'>
                  <div className="w-12 h-12 rounded-lg border border-border overflow-hidden shrink-0 bg-background" data-api-unique-id='lowstockpanel-r13617c592c509758-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel' data-api-in-loop='1'>
                    <EditableImg propKey={`toy-lowstock-${item.id}`} src={item.productImage || undefined} alt={item.name} className="w-full h-full object-cover" data-api-unique-id='lowstockpanel-rad9c086fbc11f6de-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel' data-api-in-loop='1' />
                  </div>

                  <div className="min-w-0 flex-1" data-api-unique-id='lowstockpanel-r7716315a77c5cf97-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel' data-api-in-loop='1'>
                    <h4 className="font-display font-bold text-xs text-card-foreground truncate" data-api-unique-id='lowstockpanel-r3b95cc61fa2d1cda-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel' data-api-in-loop='1' data-api-bind-info={`lowStockItems-${index}-name`} data-api-map-var-name='item'>
                      {item.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1" data-api-unique-id='lowstockpanel-rc4973e0e5cb88ed5-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel' data-api-in-loop='1'>
                      <span className="text-[11px] font-mono font-bold text-destructive bg-destructive/10 px-1.5 py-0.2 rounded border border-destructive/20" data-api-unique-id='lowstockpanel-r822f8cc99f8139ff-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel' data-api-in-loop='1' data-api-bind-info={`lowStockItems-${index}-stock`} data-api-map-var-name='item'>
                        {item.stock} left
                      </span>
                      <span className="text-[10px] text-muted-foreground" data-api-unique-id='lowstockpanel-r1e9622dedf2412ef-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel' data-api-in-loop='1' data-api-bind-info={`lowStockItems-${index}-reorderThreshold`} data-api-map-var-name='item'>
                        Threshold: {item.reorderThreshold}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-border/50 min-w-0" data-api-unique-id='lowstockpanel-r12bbade143da42fe-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel' data-api-in-loop='1'>
                  <span className="text-[11px] font-semibold text-muted-foreground truncate" data-api-unique-id='lowstockpanel-rfce09c9ebc78c473-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel' data-api-in-loop='1' data-api-bind-info={`lowStockItems-${index}-sku`} data-api-map-var-name='item'>
                    SKU: {item.sku}
                  </span>
                  <div className="flex items-center gap-1.5 shrink-0" data-api-unique-id='lowstockpanel-ra9e4b7ded10220b9-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel' data-api-in-loop='1'>
                    <button type="button" onClick={() => onQuickRestock(item.id, 10, item.name)} className="inline-flex items-center gap-1 h-7 px-2.5 rounded-full text-[11px] font-bold bg-primary text-primary-foreground border border-border/50 shadow-sm transition-all" title="Quick restock +10 units" data-api-unique-id='lowstockpanel-r33019816ff5be822-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel' data-api-in-loop='1'>
                      <Plus className="w-3 h-3 stroke-[3]" data-api-unique-id='lowstockpanel-rf298a36a506dc910-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel' data-api-in-loop='1' />
                      <span data-api-unique-id='lowstockpanel-r44dd9f4b752de072-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel' data-api-in-loop='1'>+10</span>
                    </button>
                    <button type="button" onClick={() => onQuickRestock(item.id, 25, item.name)} className="inline-flex items-center gap-1 h-7 px-2.5 rounded-full text-[11px] font-bold bg-secondary text-secondary-foreground hover:bg-background border border-border transition-all" title="Restock +25 units" data-api-unique-id='lowstockpanel-rbdb3d3301f915641-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel' data-api-in-loop='1'>
                      <span data-api-unique-id='lowstockpanel-ra67ca132e5ca036f-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel' data-api-in-loop='1'>+25</span>
                    </button>
                    <button type="button" onClick={() => onEditProduct(item)} className="text-[11px] font-bold text-muted-foreground hover:text-foreground px-1" data-api-unique-id='lowstockpanel-r5525ee0d98944ae5-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel' data-api-in-loop='1'>
                      Edit
                    </button>
                  </div>
                </div>
              </div>)}
        </div>
      </div>

      {/* 2. Category Distribution Mini Gauge */}
      <div className="w-full min-w-0 rounded-2xl border border-border/50 bg-card text-card-foreground p-5 shadow-md flex flex-col gap-4" data-api-unique-id='lowstockpanel-rdd450912157a25c5-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel'>
        <div className="flex items-start justify-between gap-2 min-w-0" data-api-unique-id='lowstockpanel-r5ef494836ecf885c-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel'>
          <div className="min-w-0" data-api-unique-id='lowstockpanel-r0e8d3f151d5d5dab-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel'>
            <div className="flex items-center gap-2" data-api-unique-id='lowstockpanel-r571303028587ae12-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel'>
              <span className="w-7 h-7 rounded-lg bg-info/10 text-info flex items-center justify-center shrink-0 border border-info/20" data-api-unique-id='lowstockpanel-r56389e6db1839ef6-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel'>
                <PieChart className="w-4 h-4" data-api-unique-id='lowstockpanel-r5207b4fc61f3f7b7-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel' />
              </span>
              <h3 className="font-display font-bold text-base text-card-foreground" data-api-unique-id='lowstockpanel-rb4a0d092048838d4-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel'>
                Category Stock Gauge
              </h3>
            </div>
            <p className="text-xs text-muted-foreground mt-1" data-api-unique-id='lowstockpanel-r31e0a77e1cdec957-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel'>
              Active warehouse inventory volume by toy genre
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-muted-foreground shrink-0" data-api-unique-id='lowstockpanel-r298eddac69203656-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel'>
            {totalActiveUnits} Units
          </span>
        </div>

        {/* Category breakdown rows */}
        <div className="flex flex-col gap-3 min-w-0" data-api-unique-id='lowstockpanel-rcf679c337665e0d0-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel'>
          {categoryStats.map((cat, index) => {
          const colors = CATEGORY_COLORS[cat.categoryKey] || {
            bg: "bg-muted",
            fill: "text-card-foreground",
            barColor: "bg-primary"
          };
          return <div key={cat.categoryKey} className="flex flex-col gap-1 min-w-0" data-api-unique-id='lowstockpanel-r2576b7aead33ea9f-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel' data-api-in-loop='1'>
                <div className="flex items-center justify-between text-xs min-w-0" data-api-unique-id='lowstockpanel-r34a0097fd5100f3e-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel' data-api-in-loop='1'>
                  <span className="font-semibold text-card-foreground truncate min-w-0" data-api-unique-id='lowstockpanel-r285c491399514597-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel' data-api-in-loop='1' data-api-bind-info={`categoryStats-${index}-label`} data-api-map-var-name='cat'>
                    {cat.label} ({cat.count} SKUs)
                  </span>
                  <span className="font-mono font-bold text-muted-foreground shrink-0 ml-2" data-api-unique-id='lowstockpanel-r304c6a86f0eb4f4a-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel' data-api-in-loop='1' data-api-bind-info={`categoryStats-${index}-totalUnits`} data-api-map-var-name='cat'>
                    {cat.totalUnits} pcs ({cat.percentage}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden border border-border/40" data-api-unique-id='lowstockpanel-reff8df261ba00716-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel' data-api-in-loop='1'>
                  <div className={`h-full ${colors.barColor} rounded-full transition-all`} style={{
                width: `${Math.max(4, cat.percentage)}%`
              }} data-api-unique-id='lowstockpanel-rd8470b84b0e43152-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel' data-api-in-loop='1' />
                </div>
              </div>;
        })}
        </div>
      </div>

      {/* 3. Dispatch Desk Operations Tip Box */}
      <div className="w-full min-w-0 rounded-2xl border border-border/50 bg-secondary/70 text-secondary-foreground p-4 shadow-sm flex items-start gap-3" data-api-unique-id='lowstockpanel-r4a2f31c138f0f67f-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel'>
        <div className="w-8 h-8 rounded-xl bg-card text-primary flex items-center justify-center shrink-0 border border-border shadow-sm" data-api-unique-id='lowstockpanel-rcc0273deb163e998-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel'>
          <Truck className="w-4 h-4" data-api-unique-id='lowstockpanel-ra40df8119f0997e2-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel' />
        </div>
        <div className="min-w-0 flex-1" data-api-unique-id='lowstockpanel-r987770e56505db87-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel'>
          <h4 className="font-display font-bold text-xs text-secondary-foreground" data-api-unique-id='lowstockpanel-r4c975404ed6b41d2-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel'>
            Workshop Restock Schedule
          </h4>
          <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5" data-api-unique-id='lowstockpanel-r34006a1038fbc7a7-s2335686458' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/LowStockPanel'>
            Wooden &amp; STEM batches arrive every Tuesday &amp; Friday. Toggle item visibility to hidden if stock falls below safety floor.
          </p>
        </div>
      </div>
    </aside>;
}