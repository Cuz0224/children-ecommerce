"use client";

import React, { useState } from "react";
import EditableImg from "@/@base/EditableImg";
import { ArrowUpDown, ArrowUp, ArrowDown, Edit2, Trash2, PlusCircle, Eye, EyeOff, AlertCircle, Layers, Sparkles, Star, ArchiveRestore } from "lucide-react";
import type { ToyProductItem, SortField, SortOrder, ToyAgeGroup, StorefrontStatus } from "@/backend/types/ProductCatalogAdmin";
import { CATEGORY_LABEL_MAP, AGE_GROUP_LABEL_MAP } from "@/backend/types/ProductCatalogAdmin";
interface ProductTableProps {
  products: ToyProductItem[];
  sortField: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
  onToggleVisibility: (id: string, currentStatus: StorefrontStatus, name: string) => void;
  onQuickRestock: (id: string, amount: number, name: string) => void;
  onEditProduct: (product: ToyProductItem) => void;
  onDeleteProduct: (product: ToyProductItem) => void;
  onBatchToggleVisibility: (ids: string[], targetStatus: "LIVE" | "HIDDEN") => void;
  onResetFilters: () => void;
}
const AGE_BADGE_STYLE: Record<ToyAgeGroup, {
  bg: string;
  text: string;
  label: string;
}> = {
  AGE_0_2: {
    bg: "bg-pink-100",
    text: "text-pink-900",
    label: "0-2Y Infant"
  },
  AGE_3_5: {
    bg: "bg-amber-100",
    text: "text-amber-900",
    label: "3-5Y Discovery"
  },
  AGE_6_8: {
    bg: "bg-blue-100",
    text: "text-blue-900",
    label: "6-8Y Builder"
  },
  AGE_8_PLUS: {
    bg: "bg-purple-100",
    text: "text-purple-900",
    label: "8Y+ Maker"
  },
  AGE_9_PLUS: {
    bg: "bg-emerald-100",
    text: "text-emerald-900",
    label: "9+ Advanced"
  }
};
export default function ProductTable({
  products,
  sortField,
  sortOrder,
  onSort,
  onToggleVisibility,
  onQuickRestock,
  onEditProduct,
  onDeleteProduct,
  onBatchToggleVisibility,
  onResetFilters
}: ProductTableProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(products.map((p, index) => p.id));
    } else {
      setSelectedIds([]);
    }
  };
  const handleSelectOne = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };
  const isAllSelected = products.length > 0 && selectedIds.length === products.length;
  const isIndeterminate = selectedIds.length > 0 && selectedIds.length < products.length;
  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground ml-1 inline-block" data-api-unique-id='producttable-r3a83f3e98abf0ca2-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' />;
    }
    return sortOrder === "asc" ? <ArrowUp className="w-3.5 h-3.5 text-primary ml-1 inline-block" data-api-unique-id='producttable-r6ddf6522b63c1a22-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' /> : <ArrowDown className="w-3.5 h-3.5 text-primary ml-1 inline-block" data-api-unique-id='producttable-r9d6ed7a38eb118a6-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' />;
  };
  return <section data-controller-name="Product Operations Table" className="w-full min-w-0 flex flex-col gap-3" data-api-unique-id='producttable-r0aca5dea934a2e39-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable'>
      {/* Bulk actions banner when rows are selected */}
      {selectedIds.length > 0 && <div className="w-full rounded-xl border border-border/50 bg-primary text-primary-foreground p-3.5 shadow-sm flex flex-wrap items-center justify-between gap-3 animate-[fade-in_0.2s_ease_both]" data-api-unique-id='producttable-r36bfdfc9cde98f5c-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable'>
          <div className="flex items-center gap-2 text-sm font-bold" data-api-unique-id='producttable-rae9f28f915841dea-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable'>
            <span className="w-6 h-6 rounded-full bg-background text-foreground flex items-center justify-center text-xs font-mono font-bold" data-api-unique-id='producttable-r6b5396b18232d850-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable'>
              {selectedIds.length}
            </span>
            <span data-api-unique-id='producttable-r63de91aae9505f26-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable'>Toys selected for batch operation</span>
          </div>

          <div className="flex items-center gap-2 shrink-0" data-api-unique-id='producttable-re449cf980dc3f7dc-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable'>
            <button type="button" onClick={() => {
          onBatchToggleVisibility(selectedIds, "LIVE");
          setSelectedIds([]);
        }} className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-xs font-bold bg-background text-foreground hover:bg-secondary border border-border shadow-sm transition-all" data-api-unique-id='producttable-rbaac10669a2d6944-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable'>
              <Eye className="w-3.5 h-3.5 text-success" data-api-unique-id='producttable-re7b8aeed2500af33-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' />
              <span data-api-unique-id='producttable-rf687043033d7612e-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable'>Publish Selected</span>
            </button>
            <button type="button" onClick={() => {
          onBatchToggleVisibility(selectedIds, "HIDDEN");
          setSelectedIds([]);
        }} className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-xs font-bold bg-background text-foreground hover:bg-secondary border border-border shadow-sm transition-all" data-api-unique-id='producttable-r7dd7e2f7254cd8a6-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable'>
              <EyeOff className="w-3.5 h-3.5 text-muted-foreground" data-api-unique-id='producttable-r79746edb57db9f70-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' />
              <span data-api-unique-id='producttable-r009b1856f9d18047-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable'>Hide Selected</span>
            </button>
            <button type="button" onClick={() => setSelectedIds([])} className="text-xs font-bold text-primary-foreground/90 hover:text-primary-foreground underline ml-2" data-api-unique-id='producttable-r4a9ef75715148ef0-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable'>
              Deselect All
            </button>
          </div>
        </div>}

      {/* Main Table Container */}
      <div className="w-full max-w-full min-w-0 overflow-x-auto rounded-2xl border border-border/50 bg-card shadow-md" data-api-unique-id='producttable-r8c68b5c61dd37118-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable'>
        <table className="w-full min-w-[1040px] text-left border-collapse" data-api-unique-id='producttable-rdef7e443a26266fc-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable'>
          <thead data-api-unique-id='producttable-ra9dd337607e921c4-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable'>
            <tr className="border-b border-border bg-muted/70 text-card-foreground text-xs font-header font-bold uppercase tracking-wider" data-api-unique-id='producttable-r78c715e73d9c18af-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable'>
              <th className="w-12 px-4 py-3.5 text-center" data-api-unique-id='producttable-r76a99b7b31c1affb-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable'>
                <input type="checkbox" checked={isAllSelected} ref={el => {
                if (el) el.indeterminate = isIndeterminate;
              }} onChange={handleSelectAll} aria-label="Select all products" className="w-4 h-4 rounded border border-border/50 accent-primary cursor-pointer" data-api-unique-id='producttable-rd4a4eb1eb539359f-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' />
              </th>
              <th onClick={() => onSort("name")} className="px-4 py-3.5 min-w-[280px] cursor-pointer hover:bg-muted/90 transition-colors select-none" data-api-unique-id='producttable-r4e23f66c3c9d0280-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable'>
                <div className="flex items-center" data-api-unique-id='producttable-rb5e45b3d581fe22a-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable'>
                  <span data-api-unique-id='producttable-rbfef0075242e0b8b-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable'>Product SKU & Toy Details</span>
                  {renderSortIcon("name")}
                </div>
              </th>
              <th className="px-4 py-3.5 min-w-[160px] whitespace-nowrap" data-api-unique-id='producttable-red99a624ced3b0c9-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable'>Category & Age</th>
              <th onClick={() => onSort("price")} className="px-4 py-3.5 min-w-[120px] whitespace-nowrap cursor-pointer hover:bg-muted/90 transition-colors select-none text-right" data-api-unique-id='producttable-rcf673938656bd38f-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable'>
                <div className="flex items-center justify-end" data-api-unique-id='producttable-r88e83c284a67aa81-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable'>
                  <span data-api-unique-id='producttable-r708873b16ed09e6a-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable'>Unit Price</span>
                  {renderSortIcon("price")}
                </div>
              </th>
              <th onClick={() => onSort("stock")} className="px-4 py-3.5 min-w-[200px] whitespace-nowrap cursor-pointer hover:bg-muted/90 transition-colors select-none" data-api-unique-id='producttable-r63969194077303bf-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable'>
                <div className="flex items-center" data-api-unique-id='producttable-r3fede37dc1a40fba-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable'>
                  <span data-api-unique-id='producttable-rde0c7b8a042d9f4a-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable'>Stock & Block Level</span>
                  {renderSortIcon("stock")}
                </div>
              </th>
              <th className="px-4 py-3.5 min-w-[150px] whitespace-nowrap text-center" data-api-unique-id='producttable-r77923c88d038ec43-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable'>
                Storefront Live
              </th>
              <th className="px-4 py-3.5 min-w-[140px] whitespace-nowrap text-right pr-6" data-api-unique-id='producttable-r049fe608551ebabd-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable'>
                Operations
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60 text-sm" data-api-unique-id='producttable-rbee150ef82bb5139-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable'>
            {products.length === 0 ? <tr data-api-unique-id='producttable-r92798fc2ce8ef7b9-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable'>
                <td colSpan={7} className="py-16 text-center" data-api-unique-id='producttable-r0e34f5e636592b46-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable'>
                  <div className="flex flex-col items-center justify-center gap-3 max-w-sm mx-auto p-6" data-api-unique-id='producttable-r176263053491dc3e-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable'>
                    <div className="w-14 h-14 rounded-2xl bg-muted text-muted-foreground flex items-center justify-center border border-border/50" data-api-unique-id='producttable-rf385cb6d6fac4174-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable'>
                      <Layers className="w-7 h-7" data-api-unique-id='producttable-rd68cf2b50f345745-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' />
                    </div>
                    <h4 className="font-display font-bold text-lg text-card-foreground" data-api-unique-id='producttable-rcefa9fd80be0d5a5-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable'>
                      No toy products found
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed" data-api-unique-id='producttable-r8901a1ea25bca4cf-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable'>
                      No catalog items match your search keyword or selected category filter criteria.
                    </p>
                    <button type="button" onClick={onResetFilters} className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-primary text-primary-foreground border border-border/50 shadow-sm transition-all" data-api-unique-id='producttable-rfd067f480fb6ddc7-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable'>
                      Clear Search & Filters
                    </button>
                  </div>
                </td>
              </tr> : products.map((item, index) => {
            const isSelected = selectedIds.includes(item.id);
            const isLowStock = item.lowStockAlert || item.stock <= item.reorderThreshold && item.storefrontStatus !== "REMOVED";
            const isRemoved = item.storefrontStatus === "REMOVED";
            const ageBadge = item.ageGroup && AGE_BADGE_STYLE[item.ageGroup] || {
              bg: "bg-muted",
              text: "text-muted-foreground",
              label: item.ageGroup && AGE_GROUP_LABEL_MAP[item.ageGroup] || item.ageGroup || ""
            };
            const categoryLabel = item.category && CATEGORY_LABEL_MAP[item.category] || item.category;

            // Block level calculations (5 blocks maximum)
            const maxStockGauge = 50;
            const blockCount = Math.min(5, Math.max(1, Math.ceil(item.stock / maxStockGauge * 5)));
            /* Extracted array: _items */
            const _items = [1, 2, 3, 4, 5];
            return <tr key={item.id} className={`group transition-colors ${isSelected ? "bg-secondary/40" : isRemoved ? "bg-muted/20 opacity-70" : "hover:bg-muted/40"}`} data-api-unique-id='producttable-ra089e9603691af02-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1'>
                    {/* Checkbox Column */}
                    <td className="px-4 py-3.5 text-center" data-api-unique-id='producttable-r2b8115aa6b796f56-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1'>
                      <input type="checkbox" checked={isSelected} onChange={() => handleSelectOne(item.id)} aria-label={`Select ${item.name}`} className="w-4 h-4 rounded border border-border/50 accent-primary cursor-pointer" data-api-unique-id='producttable-r2565835d2bec305f-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1' />
                    </td>

                    {/* Product & SKU Column */}
                    <td className="px-4 py-3.5 min-w-[280px]" data-api-unique-id='producttable-r936bf13ca13affd2-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1'>
                      <div className="flex items-center gap-3 min-w-0" data-api-unique-id='producttable-r47488e75c324e183-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1'>
                        {/* Thumbnail Viewport */}
                        <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl border border-border/50 overflow-hidden shrink-0 bg-muted/60 relative group-hover:border-border transition-colors shadow-sm" data-api-unique-id='producttable-r8cfd5ce69ce627e2-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1'>
                          <EditableImg propKey={`toy-table-${item.id}`} src={item.productImage} alt={item.name} className="w-full h-full object-cover" data-api-unique-id='producttable-r902a8b7263bb7200-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1' />
                          {isLowStock && <div className="absolute top-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-destructive border border-background shadow-sm" data-api-unique-id='producttable-rd22f4ac670b0f883-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1' />}
                        </div>

                        {/* Title, SKU, Badge */}
                        <div className="min-w-0 flex-1" data-api-unique-id='producttable-r01d9bc55e7185d98-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1'>
                          <div className="flex items-center gap-1.5 flex-wrap" data-api-unique-id='producttable-r02db65029951a0a3-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1'>
                            <span className="font-display font-bold text-sm text-card-foreground group-hover:text-primary transition-colors line-clamp-1" data-api-unique-id='producttable-r00a51766b3d9834a-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1' data-api-bind-info={`products-${index}-name`} data-api-map-var-name='item'>
                              {item.name}
                            </span>
                            {item.badge && <span className="inline-flex shrink-0 items-center px-1.5 py-0.2 rounded text-[10px] font-bold bg-primary/10 text-primary border border-primary/20" data-api-unique-id='producttable-r90df36c57cb62ac0-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1' data-api-bind-info={`products-${index}-badge`} data-api-map-var-name='item'>
                                {item.badge}
                              </span>}
                          </div>
                          <div className="flex items-center gap-2 mt-1 flex-wrap" data-api-unique-id='producttable-ra231cafb28979a0a-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1'>
                            <span className="inline-flex shrink-0 whitespace-nowrap items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-muted text-muted-foreground border border-border" data-api-unique-id='producttable-re8cc39aa18b91e2c-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1' data-api-bind-info={`products-${index}-sku`} data-api-map-var-name='item'>
                              {item.sku}
                            </span>
                            {item.ratingAverage ? <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-amber-900 bg-amber-100 px-1.5 py-0.2 rounded" data-api-unique-id='producttable-r5a5cb146f23137dc-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1'>
                                <Star className="w-3 h-3 fill-amber-500 text-amber-500" data-api-unique-id='producttable-rb920b30027b6dbb7-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1' />
                                {item.ratingAverage.toFixed(1)}
                              </span> : null}
                            {item.monthlySales ? <span className="text-[11px] text-muted-foreground truncate hidden sm:inline" data-api-unique-id='producttable-r98a8c5f5f1782c35-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1' data-api-bind-info={`products-${index}-monthlySales`} data-api-map-var-name='item'>
                                {item.monthlySales} sold/mo
                              </span> : null}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category & Age Column */}
                    <td className="px-4 py-3.5 min-w-[160px] whitespace-nowrap" data-api-unique-id='producttable-reefb1a0e0e3881e7-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1'>
                      <div className="flex flex-col gap-1 items-start" data-api-unique-id='producttable-r1a16d9aa25795b0b-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1'>
                        <span className="inline-flex shrink-0 whitespace-nowrap items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-secondary text-secondary-foreground border border-border" data-api-unique-id='producttable-rc2de5a2a25a508f7-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1'>
                          {categoryLabel}
                        </span>
                        <span className={`inline-flex shrink-0 whitespace-nowrap items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${ageBadge.bg} ${ageBadge.text} border border-border/50`} data-api-unique-id='producttable-r068c11aa8620b518-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1'>
                          {ageBadge.label}
                        </span>
                      </div>
                    </td>

                    {/* Unit Price Column */}
                    <td className="px-4 py-3.5 min-w-[120px] whitespace-nowrap text-right" data-api-unique-id='producttable-rfb3833dba9bf081d-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1'>
                      <div className="flex flex-col items-end" data-api-unique-id='producttable-r13b5ed884e5f10a5-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1'>
                        <span className="font-display font-extrabold text-base text-card-foreground" data-api-unique-id='producttable-r0c2029e1f367f606-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1'>
                          ${item.price.toFixed(2)}
                        </span>
                        {item.originalPrice && item.originalPrice > item.price ? <span className="text-[11px] text-muted-foreground line-through" data-api-unique-id='producttable-rf4da14c4ec26742f-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1'>
                            ${item.originalPrice.toFixed(2)}
                          </span> : <span className="text-[10px] font-semibold text-muted-foreground uppercase" data-api-unique-id='producttable-r27a2ff7667a70706-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1'>
                            USD
                          </span>}
                      </div>
                    </td>

                    {/* Stock & Block Level Column */}
                    <td className="px-4 py-3.5 min-w-[200px] whitespace-nowrap" data-api-unique-id='producttable-rce8405492b838228-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1'>
                      <div className="flex flex-col gap-1.5 min-w-0" data-api-unique-id='producttable-rd735023bdf80aa65-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1'>
                        <div className="flex items-center justify-between gap-2 text-xs" data-api-unique-id='producttable-ra1b99982aebff605-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1'>
                          <span className="font-mono font-bold text-card-foreground" data-api-unique-id='producttable-r9833e7c0d149343a-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1' data-api-bind-info={`products-${index}-stock`} data-api-map-var-name='item'>
                            {item.stock} in stock
                          </span>
                          {isRemoved ? <span className="inline-flex shrink-0 whitespace-nowrap items-center px-1.5 py-0.2 rounded text-[10px] font-bold bg-muted text-muted-foreground" data-api-unique-id='producttable-reb79bcba5f6a57a4-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1'>
                              Archived
                            </span> : isLowStock ? <span className="inline-flex shrink-0 whitespace-nowrap items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-destructive text-destructive-foreground" data-api-unique-id='producttable-r26827d8a4f2f259c-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1'>
                              <AlertCircle className="w-3 h-3" data-api-unique-id='producttable-ra9e1e4375c8086b8-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1' />
                              <span data-api-unique-id='producttable-r5f253b1e228a8000-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1'>Low Stock</span>
                            </span> : <span className="inline-flex shrink-0 whitespace-nowrap items-center px-1.5 py-0.2 rounded text-[10px] font-semibold text-muted-foreground" data-api-unique-id='producttable-r78d753caccbb8aff-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1' data-api-bind-info={`products-${index}-reorderThreshold`} data-api-map-var-name='item'>
                              Safe &gt; {item.reorderThreshold}
                            </span>}
                        </div>

                        {/* Playful Toy Building Block Stock Meter */}
                        <div className="flex items-center gap-1 h-3" data-api-unique-id='producttable-r1fff7b4e172b2078-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1'>
                          {_items.map((blockIdx, index1) => {
                      const isFilled = blockIdx <= blockCount;
                      let blockColor = "bg-muted border-border";
                      if (isFilled) {
                        if (isRemoved) {
                          blockColor = "bg-muted-foreground/40 border-border";
                        } else if (isLowStock) {
                          blockColor = "bg-destructive border-border/50 shadow-sm";
                        } else if (blockIdx <= 2) {
                          blockColor = "bg-warning border-border/50 shadow-sm";
                        } else {
                          blockColor = "bg-success border-border/50 shadow-sm";
                        }
                      }
                      return <div key={blockIdx} className={`flex-1 h-full rounded-[3px] border ${blockColor} transition-all`} title={`Block ${blockIdx}/5`} data-api-unique-id='producttable-r87412f0f7fbb6d06-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1' />;
                    })}
                        </div>
                      </div>
                    </td>

                    {/* Storefront Live Toggle Column */}
                    <td className="px-4 py-3.5 min-w-[150px] whitespace-nowrap text-center" data-api-unique-id='producttable-re46900da3e9037bf-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1'>
                      {isRemoved ? <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-muted text-muted-foreground border border-border" data-api-unique-id='producttable-r8bbb965eefda01a4-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1'>
                          <ArchiveRestore className="w-3.5 h-3.5" data-api-unique-id='producttable-rbc1c295e4e39abc2-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1' />
                          <span data-api-unique-id='producttable-rba6efcceb9f01740-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1'>Removed</span>
                        </span> : <button type="button" onClick={() => onToggleVisibility(item.id, item.storefrontStatus, item.name)} className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${item.storefrontStatus === "LIVE" ? "bg-success/15 text-success border-success/60 hover:bg-success hover:text-success-foreground" : "bg-muted text-muted-foreground border-border hover:bg-secondary hover:text-secondary-foreground"}`} title={item.storefrontStatus === "LIVE" ? "Click to unpublish/hide" : "Click to publish live"} data-api-unique-id='producttable-r2ee72acda5a1a7a6-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1'>
                          {item.storefrontStatus === "LIVE" ? <>
                              <span className="w-2 h-2 rounded-full bg-success animate-pulse shrink-0" data-api-unique-id='producttable-r371dc0875eda7bfd-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1' />
                              <span data-api-unique-id='producttable-r966544c87f4b615f-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1'>Live Store</span>
                            </> : <>
                              <span className="w-2 h-2 rounded-full bg-muted-foreground shrink-0" data-api-unique-id='producttable-r08280dec37c32006-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1' />
                              <span data-api-unique-id='producttable-r8076baf0d2fcce21-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1'>Hidden Draft</span>
                            </>}
                        </button>}
                    </td>

                    {/* Row Operations Column */}
                    <td className="px-4 py-3.5 min-w-[140px] whitespace-nowrap text-right pr-6" data-api-unique-id='producttable-rc67b19c64db50559-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1'>
                      <div className="flex items-center justify-end gap-1.5" data-api-unique-id='producttable-r1692d312f04d92e4-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1'>
                        {/* Quick Restock (+10) Button */}
                        {!isRemoved && <button type="button" onClick={() => onQuickRestock(item.id, 10, item.name)} className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground border border-border flex items-center justify-center transition-all shadow-sm" title="Quick restock +10 units" data-api-unique-id='producttable-rb66b9bd7609e8859-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1'>
                            <PlusCircle className="w-4 h-4" data-api-unique-id='producttable-r1440ecdb68e82493-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1' />
                          </button>}

                        {/* Edit Button */}
                        <button type="button" onClick={() => onEditProduct(item)} className="w-8 h-8 rounded-full bg-muted text-card-foreground hover:bg-foreground hover:text-background border border-border flex items-center justify-center transition-all shadow-sm" title="Edit product details" data-api-unique-id='producttable-rdb20690ec03c27e3-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1'>
                          <Edit2 className="w-3.5 h-3.5" data-api-unique-id='producttable-rc9e250b95588aaae-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1' />
                        </button>

                        {/* Delete / Remove Button */}
                        {!isRemoved && <button type="button" onClick={() => onDeleteProduct(item)} className="w-8 h-8 rounded-full bg-muted text-muted-foreground hover:bg-destructive hover:text-destructive-foreground border border-border flex items-center justify-center transition-all shadow-sm" title="Delist from storefront" data-api-unique-id='producttable-r0cbf49fcef3206ea-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1'>
                            <Trash2 className="w-3.5 h-3.5" data-api-unique-id='producttable-r4b3390dd55d96b39-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' data-api-in-loop='1' />
                          </button>}
                      </div>
                    </td>
                  </tr>;
          })}
          </tbody>
        </table>

        {/* Table Footer with Summary Stats */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-border bg-muted/40 text-xs font-semibold text-muted-foreground" data-api-unique-id='producttable-r14151862c373cc74-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable'>
          <div className="flex items-center gap-2" data-api-unique-id='producttable-r1d9187eba36d9003-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable'>
            <Sparkles className="w-4 h-4 text-primary" data-api-unique-id='producttable-r8b4a91b30d2977d8-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable' />
            <span data-api-unique-id='producttable-r895bb649cb61614c-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable'>
              Showing <strong className="text-foreground" data-api-unique-id='producttable-r3632c04a6be6eba5-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable'>{products.length}</strong> catalog items
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs" data-api-unique-id='producttable-r47965cc7a2591060-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable'>
            <span data-api-unique-id='producttable-r58aff3d3fec83d49-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable'>Click any column header to sort</span>
            <div className="flex items-center gap-2" data-api-unique-id='producttable-r550dd873f5248229-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable'>
              <span className="w-2.5 h-2.5 rounded-full bg-success inline-block" data-api-unique-id='producttable-r13bb9bda1d6d5529-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable'></span>
              <span data-api-unique-id='producttable-r50cb4d281f9df225-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable'>Healthy</span>
              <span className="w-2.5 h-2.5 rounded-full bg-destructive inline-block ml-1" data-api-unique-id='producttable-r9ef390e400be77d2-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable'></span>
              <span data-api-unique-id='producttable-rde74b9286d8c82f7-s771801357' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductTable'>Needs Restock</span>
            </div>
          </div>
        </div>
      </div>
    </section>;
}