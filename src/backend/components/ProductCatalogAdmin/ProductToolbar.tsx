"use client";

import React from "react";
import { Search, Plus, RotateCcw, Filter, ArrowUpDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { FilterState, SortField, SortOrder } from "@/backend/types/ProductCatalogAdmin";
interface ProductToolbarProps {
  filterState: FilterState;
  onFilterChange: (updates: Partial<FilterState>) => void;
  onResetFilters: () => void;
  onOpenAddModal: () => void;
  totalCount: number;
  filteredCount: number;
  categoryCounts: Record<string, number>;
  visibilityCounts: {
    all: number;
    live: number;
    hidden: number;
    removed: number;
  };
}
const CATEGORIES: {
  label: string;
  value: string;
}[] = [{
  label: "All Categories",
  value: "ALL"
}, {
  label: "Wooden Toys",
  value: "WOODEN_TOYS"
}, {
  label: "STEM & Maker",
  value: "STEM_MAKER"
}, {
  label: "Infant & Plush",
  value: "INFANT_PLUSH"
}, {
  label: "Creative Building",
  value: "CREATIVE_BUILDING"
}, {
  label: "Pretend Play",
  value: "PRETEND_PLAY"
}, {
  label: "Art & Craft",
  value: "ART_CRAFT"
}, {
  label: "Learning & Brain",
  value: "LEARNING"
}, {
  label: "Outdoor Active",
  value: "OUTDOOR"
}, {
  label: "Plush Buddies",
  value: "PLUSH"
}];
const AGE_GROUPS: {
  label: string;
  value: string;
}[] = [{
  label: "All Age Groups",
  value: "ALL"
}, {
  label: "0-2Y (Infant)",
  value: "AGE_0_2"
}, {
  label: "3-5Y (Discovery)",
  value: "AGE_3_5"
}, {
  label: "6-8Y (Builder)",
  value: "AGE_6_8"
}, {
  label: "8Y+ (Maker)",
  value: "AGE_8_PLUS"
}, {
  label: "9+ (Advanced)",
  value: "AGE_9_PLUS"
}];
const SORT_OPTIONS: {
  label: string;
  field: SortField;
  order: SortOrder;
}[] = [{
  label: "Stock: Low to High (Restock)",
  field: "stock",
  order: "asc"
}, {
  label: "Stock: High to Low",
  field: "stock",
  order: "desc"
}, {
  label: "Price: Low to High",
  field: "price",
  order: "asc"
}, {
  label: "Price: High to Low",
  field: "price",
  order: "desc"
}, {
  label: "Product Name: A to Z",
  field: "name",
  order: "asc"
}, {
  label: "Monthly Sales: Highest",
  field: "sales",
  order: "desc"
}, {
  label: "Rating: Highest",
  field: "rating",
  order: "desc"
}];
export default function ProductToolbar({
  filterState,
  onFilterChange,
  onResetFilters,
  onOpenAddModal,
  totalCount,
  filteredCount,
  categoryCounts,
  visibilityCounts
}: ProductToolbarProps) {
  const isFiltered = Boolean(filterState.searchQuery) || filterState.category !== "ALL" || filterState.ageGroup !== "ALL" || filterState.visibility !== "ALL";
  const currentSortKey = `${filterState.sortField}-${filterState.sortOrder}`;
  const handleSortChange = (value: string) => {
    const selected = SORT_OPTIONS.find(s => `${s.field}-${s.order}` === value);
    if (selected) {
      onFilterChange({
        sortField: selected.field,
        sortOrder: selected.order
      });
    }
  };
  return <section data-controller-name="Product Management Toolbar" className="w-full min-w-0 rounded-2xl border border-border/50 bg-card text-card-foreground p-5 shadow-md flex flex-col gap-4" data-api-unique-id='producttoolbar-r2970c15e46d90dcc-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar'>
      {/* Top row: Search and Primary Action Button */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 min-w-0" data-api-unique-id='producttoolbar-rfca6913079659d79-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar'>
        {/* Search Bar */}
        <div className="relative flex-1 min-w-0" data-api-unique-id='producttoolbar-r4edfa96b97e31eb1-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar'>
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" data-api-unique-id='producttoolbar-r9ee9b74583b292aa-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar' />
          <input type="text" placeholder="Search toy name, SKU (e.g. TY-WOD-001), description..." value={filterState.searchQuery} onChange={e => onFilterChange({
          searchQuery: e.target.value
        })} className="w-full h-11 pl-10 pr-16 text-sm rounded-full border border-border/50 bg-background text-foreground placeholder:text-muted-foreground focus:border-border/50 focus:outline-none focus:ring-2 focus:ring-ring transition-all" data-api-unique-id='producttoolbar-r4369f1d03ceefcbe-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar' />
          {filterState.searchQuery && <button type="button" onClick={() => onFilterChange({
          searchQuery: ""
        })} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground font-semibold" data-api-unique-id='producttoolbar-r7ab7e0aaa1625df4-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar'>
              Clear
            </button>}
        </div>

        {/* Primary Action Button */}
        <button type="button" onClick={onOpenAddModal} className="inline-flex shrink-0 whitespace-nowrap items-center justify-center gap-2 h-11 px-6 rounded-full bg-primary text-primary-foreground font-display font-bold text-sm border border-border/50 shadow-sm hover:shadow-md transition-all" data-api-unique-id='producttoolbar-rb460b7e50bd50107-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar'>
          <Plus className="w-4 h-4 stroke-[3]" data-api-unique-id='producttoolbar-r1eb1dfa43a82b927-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar' />
          <span data-api-unique-id='producttoolbar-rd226deb3c0ba23b8-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar'>+ Add New Toy</span>
        </button>
      </div>

      {/* Second row: Multi-dimensional Filters & Visibility Pills */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pt-3 border-t border-border/60 min-w-0" data-api-unique-id='producttoolbar-r791169f848a34fd2-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar'>
        {/* Left Filter Selects */}
        <div className="flex flex-wrap items-center gap-2.5 min-w-0" data-api-unique-id='producttoolbar-rc1e41a8054b7933b-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar'>
          <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground uppercase tracking-wider shrink-0 mr-1" data-api-unique-id='producttoolbar-r085dbdc91ca2d5db-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar'>
            <Filter className="w-3.5 h-3.5" data-api-unique-id='producttoolbar-rc45cc3f4a7b641a7-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar' />
            <span data-api-unique-id='producttoolbar-r9c3dbd4f62318e51-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar'>Filters</span>
          </div>

          {/* Category Dropdown */}
          <div className="w-[165px] shrink-0" data-api-unique-id='producttoolbar-r84ae42169bdc688a-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar'>
            <Select value={filterState.category} onValueChange={val => onFilterChange({
            category: val
          })} data-api-unique-id='producttoolbar-r2342334f6dc60a43-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar'>
              <SelectTrigger size="sm" className="w-full h-9 rounded-full border border-border/50 bg-background text-xs font-semibold" data-api-unique-id='producttoolbar-r1b5094b40c57760f-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar'>
                <SelectValue placeholder="Category" data-api-unique-id='producttoolbar-rfe573309611fb9c8-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar'>
                  {CATEGORIES.find(c => c.value === filterState.category)?.label || "Category"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent data-api-unique-id='producttoolbar-rc421a7e9efa4265d-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar'>
                {CATEGORIES.map((cat, index) => <SelectItem key={cat.value} value={cat.value} className="text-xs" data-api-unique-id='producttoolbar-r538eb8194d7d0d18-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar' data-api-in-loop='1' data-api-bind-info={`CATEGORIES-${index}-label`} data-api-map-var-name='cat'>
                    {cat.label}
                  </SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {/* Age Group Dropdown */}
          <div className="w-[155px] shrink-0" data-api-unique-id='producttoolbar-r9ab72c18d81e0b8a-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar'>
            <Select value={filterState.ageGroup} onValueChange={val => onFilterChange({
            ageGroup: val
          })} data-api-unique-id='producttoolbar-r6d0b8a8b62d5bb5d-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar'>
              <SelectTrigger size="sm" className="w-full h-9 rounded-full border border-border/50 bg-background text-xs font-semibold" data-api-unique-id='producttoolbar-r62186e8ad8b8acec-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar'>
                <SelectValue placeholder="Age Group" data-api-unique-id='producttoolbar-re55284d85e57dbaa-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar'>
                  {AGE_GROUPS.find(a => a.value === filterState.ageGroup)?.label || "Age Group"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent data-api-unique-id='producttoolbar-r20bb265d2e8cee46-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar'>
                {AGE_GROUPS.map((age, index) => <SelectItem key={age.value} value={age.value} className="text-xs" data-api-unique-id='producttoolbar-r0e272b99cdcd3335-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar' data-api-in-loop='1' data-api-bind-info={`AGE_GROUPS-${index}-label`} data-api-map-var-name='age'>
                    {age.label}
                  </SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {/* Sort By Dropdown */}
          <div className="w-[195px] shrink-0" data-api-unique-id='producttoolbar-ra13bebac55603423-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar'>
            <Select value={currentSortKey} onValueChange={handleSortChange} data-api-unique-id='producttoolbar-r4783c03f36c84ba6-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar'>
              <SelectTrigger size="sm" className="w-full h-9 rounded-full border border-border/50 bg-background text-xs font-semibold" data-api-unique-id='producttoolbar-r0e28913b15b3a2ba-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar'>
                <div className="flex items-center gap-1 truncate" data-api-unique-id='producttoolbar-r2fbfcc07a494b7a2-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar'>
                  <ArrowUpDown className="w-3 h-3 shrink-0 text-muted-foreground" data-api-unique-id='producttoolbar-r4a3e017f60f84b76-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar' />
                  <SelectValue placeholder="Sort Order" data-api-unique-id='producttoolbar-r79abf1b5c6f2701b-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar'>
                    {SORT_OPTIONS.find(s => `${s.field}-${s.order}` === currentSortKey)?.label || "Sort Order"}
                  </SelectValue>
                </div>
              </SelectTrigger>
              <SelectContent data-api-unique-id='producttoolbar-rb62c9de6efc2ec4b-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar'>
                {SORT_OPTIONS.map((opt, index) => <SelectItem key={`${opt.field}-${opt.order}`} value={`${opt.field}-${opt.order}`} className="text-xs" data-api-unique-id='producttoolbar-ra146a9c97f7b76ce-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar' data-api-in-loop='1' data-api-bind-info={`SORT_OPTIONS-${index}-label`} data-api-map-var-name='opt'>
                    {opt.label}
                  </SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {/* Reset Filters Trigger */}
          {isFiltered && <button type="button" onClick={onResetFilters} className="inline-flex shrink-0 whitespace-nowrap items-center gap-1.5 h-9 px-3 rounded-full text-xs font-bold text-muted-foreground bg-muted hover:bg-secondary hover:text-secondary-foreground border border-border transition-all" data-api-unique-id='producttoolbar-r1a8b424e68dfcbd2-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar'>
              <RotateCcw className="w-3 h-3" data-api-unique-id='producttoolbar-rfeee727b9c63d403-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar' />
              <span data-api-unique-id='producttoolbar-r87fe84787366241e-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar'>Reset</span>
            </button>}
        </div>

        {/* Right Storefront Status Filter Pills */}
        <div className="flex items-center gap-1.5 shrink-0 overflow-x-auto pb-1 lg:pb-0" data-api-unique-id='producttoolbar-r010c6d81388c3f3d-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar'>
          <span className="text-xs font-bold text-muted-foreground mr-1 hidden sm:inline" data-api-unique-id='producttoolbar-rd35fb1d2eb24b63a-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar'>
            Status:
          </span>
          <button type="button" onClick={() => onFilterChange({
          visibility: "ALL"
        })} className={`inline-flex shrink-0 whitespace-nowrap items-center gap-1.5 h-8 px-3 rounded-full text-xs font-bold transition-all ${filterState.visibility === "ALL" ? "bg-foreground text-background border border-border/50 shadow-sm" : "bg-background text-foreground border border-border hover:bg-muted"}`} data-api-unique-id='producttoolbar-r1c943e2fc1989f23-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar'>
            <span data-api-unique-id='producttoolbar-r0625b0e387566759-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar'>All Toys</span>
            <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-muted/40 font-mono" data-api-unique-id='producttoolbar-r9a7ad07f38008d85-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar'>
              {visibilityCounts.all}
            </span>
          </button>

          <button type="button" onClick={() => onFilterChange({
          visibility: "LIVE"
        })} className={`inline-flex shrink-0 whitespace-nowrap items-center gap-1.5 h-8 px-3 rounded-full text-xs font-bold transition-all ${filterState.visibility === "LIVE" ? "bg-success text-success-foreground border border-border/50 shadow-sm" : "bg-background text-foreground border border-border hover:bg-muted"}`} data-api-unique-id='producttoolbar-r886752f2c19576e3-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar'>
            <span className="w-2 h-2 rounded-full bg-success inline-block" data-api-unique-id='producttoolbar-rbde84bce426729d3-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar'></span>
            <span data-api-unique-id='producttoolbar-r514bf18148e60cb2-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar'>Live Only</span>
            <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-secondary/40 font-mono" data-api-unique-id='producttoolbar-rae1be63a2fc30608-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar'>
              {visibilityCounts.live}
            </span>
          </button>

          <button type="button" onClick={() => onFilterChange({
          visibility: "HIDDEN"
        })} className={`inline-flex shrink-0 whitespace-nowrap items-center gap-1.5 h-8 px-3 rounded-full text-xs font-bold transition-all ${filterState.visibility === "HIDDEN" ? "bg-accent text-accent-foreground border border-border/50 shadow-sm" : "bg-background text-foreground border border-border hover:bg-muted"}`} data-api-unique-id='producttoolbar-rccceb930dfc21266-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar'>
            <span className="w-2 h-2 rounded-full bg-accent inline-block" data-api-unique-id='producttoolbar-r3002bef7c9c7eeb2-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar'></span>
            <span data-api-unique-id='producttoolbar-r18adcc065d4ce01b-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar'>Drafts / Hidden</span>
            <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-secondary/40 font-mono" data-api-unique-id='producttoolbar-r203053160c4ef809-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar'>
              {visibilityCounts.hidden}
            </span>
          </button>

          <button type="button" onClick={() => onFilterChange({
          visibility: "REMOVED"
        })} className={`inline-flex shrink-0 whitespace-nowrap items-center gap-1.5 h-8 px-3 rounded-full text-xs font-bold transition-all ${filterState.visibility === "REMOVED" ? "bg-destructive text-destructive-foreground border border-border/50 shadow-sm" : "bg-background text-foreground border border-border hover:bg-muted"}`} data-api-unique-id='producttoolbar-rece77e414494e0f9-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar'>
            <span className="w-2 h-2 rounded-full bg-destructive inline-block" data-api-unique-id='producttoolbar-r2ee3f242f592065e-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar'></span>
            <span data-api-unique-id='producttoolbar-r7e3c2f2610f200f1-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar'>Removed</span>
            <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-secondary/40 font-mono" data-api-unique-id='producttoolbar-rd7e6777a140e304a-s848957945' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/ProductToolbar'>
              {visibilityCounts.removed}
            </span>
          </button>
        </div>
      </div>
    </section>;
}