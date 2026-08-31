"use client";

import React from "react";
import { Search, X, SlidersHorizontal, Sparkles, Shapes, Bot, Brain, Compass, Palette } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { CategoryKey, AgeGroupKey, SortOption } from "@/frontend/types/StorefrontHome";
interface CategoryFilterBarProps {
  selectedCategory: CategoryKey;
  onSelectCategory: (category: CategoryKey) => void;
  selectedAgeGroup: AgeGroupKey;
  onSelectAgeGroup: (ageGroup: AgeGroupKey) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  totalResults: number;
  onResetFilters: () => void;
}
const CATEGORY_ITEMS: Array<{
  key: CategoryKey;
  label: string;
  icon: React.ElementType;
}> = [{
  key: "all",
  label: "All Toys",
  icon: Sparkles
}, {
  key: "PLUSH",
  label: "Plush Buddies",
  icon: Shapes
}, {
  key: "STEM_MAKER",
  label: "STEM & Building",
  icon: Bot
}, {
  key: "LEARNING",
  label: "Learning & Brain",
  icon: Brain
}, {
  key: "OUTDOOR",
  label: "Outdoor Active",
  icon: Compass
}, {
  key: "ART_CRAFT",
  label: "Art & Craft",
  icon: Palette
}];
const AGE_ITEMS: Array<{
  key: AgeGroupKey;
  label: string;
}> = [{
  key: "all",
  label: "All Ages"
}, {
  key: "AGE_0_2",
  label: "0-2 yrs"
}, {
  key: "AGE_3_5",
  label: "3-5 yrs"
}, {
  key: "AGE_6_8",
  label: "6-8 yrs"
}, {
  key: "AGE_8_PLUS",
  label: "8+ yrs"
}, {
  key: "AGE_9_PLUS",
  label: "9+ yrs"
}];
const SORT_LABELS: Record<SortOption, string> = {
  featured: "Featured Picks",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  rating: "Highest Rating",
  bestselling: "Best Selling"
};
export default function CategoryFilterBar({
  selectedCategory,
  onSelectCategory,
  selectedAgeGroup,
  onSelectAgeGroup,
  searchQuery,
  onSearchChange,
  sortOption,
  onSortChange,
  totalResults,
  onResetFilters
}: CategoryFilterBarProps) {
  const isFiltered = searchQuery.trim() !== "" || selectedCategory !== "all" || selectedAgeGroup !== "all" || sortOption !== "featured";
  return <div className="space-y-4" data-api-unique-id='categoryfilterbar-r957e952e464b080a-s2343693249' data-api-unique-page-name='src/frontend/components/StorefrontHome/CategoryFilterBar'>
      {/* Category Pills Strip */}
      <div className="flex flex-wrap items-center gap-2.5" data-api-unique-id='categoryfilterbar-r7069dbfe5fc33e56-s2343693249' data-api-unique-page-name='src/frontend/components/StorefrontHome/CategoryFilterBar'>
        {CATEGORY_ITEMS.map((item, index) => {
        const Icon = item.icon;
        const isActive = selectedCategory === item.key;
        return <button key={item.key} type="button" onClick={() => onSelectCategory(item.key)} className={`group inline-flex items-center gap-2 rounded-full border border-border/50 px-4 py-2 text-xs font-bold transition-all sm:text-sm ${isActive ? "bg-primary text-primary-foreground shadow-sm translate-x-[-1px] translate-y-[-1px]" : "bg-card text-card-foreground shadow-sm hover:bg-secondary hover:translate-y-[-1px] active:translate-y-[1px]"}`} data-api-unique-id='categoryfilterbar-r237c16c0a409ae86-s2343693249' data-api-unique-page-name='src/frontend/components/StorefrontHome/CategoryFilterBar' data-api-in-loop='1'>
              <Icon className={`h-4 w-4 transition-transform group-hover:scale-110 ${isActive ? "text-primary-foreground" : "text-primary"}`} data-api-bind-info={`CATEGORY_ITEMS-${index}-icon`} data-api-map-var-name='item' data-api-unique-id='categoryfilterbar-rd8b0de39b9a1ef16-s2343693249' data-api-unique-page-name='src/frontend/components/StorefrontHome/CategoryFilterBar' data-api-in-loop='1' />
              <span data-api-unique-id='categoryfilterbar-r03fe51b1a118e091-s2343693249' data-api-unique-page-name='src/frontend/components/StorefrontHome/CategoryFilterBar' data-api-in-loop='1' data-api-bind-info={`CATEGORY_ITEMS-${index}-label`} data-api-map-var-name='item'>{item.label}</span>
            </button>;
      })}
      </div>

      {/* Secondary Controls Bar: Search, Age Pills, and Sort */}
      <div className="flex flex-col gap-3 rounded-2xl border border-border/50 bg-card p-3 text-card-foreground shadow-md lg:flex-row lg:items-center lg:justify-between" data-api-unique-id='categoryfilterbar-rf5a19e816cd4cb4a-s2343693249' data-api-unique-page-name='src/frontend/components/StorefrontHome/CategoryFilterBar'>
        {/* Search Input */}
        <div className="relative min-w-0 flex-1 sm:max-w-xs" data-api-unique-id='categoryfilterbar-rec52b4bed054d608-s2343693249' data-api-unique-page-name='src/frontend/components/StorefrontHome/CategoryFilterBar'>
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" data-api-unique-id='categoryfilterbar-r4a8b4db9bff6b442-s2343693249' data-api-unique-page-name='src/frontend/components/StorefrontHome/CategoryFilterBar' />
          <input type="text" value={searchQuery} onChange={e => onSearchChange(e.target.value)} placeholder="Search plush, STEM, blocks..." className="w-full rounded-full border border-border/50 bg-background py-2 pr-9 pl-9 text-xs font-medium text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:text-sm" data-api-unique-id='categoryfilterbar-rf5b44b7d65e61f02-s2343693249' data-api-unique-page-name='src/frontend/components/StorefrontHome/CategoryFilterBar' />
          {searchQuery && <button type="button" onClick={() => onSearchChange("")} className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Clear search" data-api-unique-id='categoryfilterbar-re9097ece8323906c-s2343693249' data-api-unique-page-name='src/frontend/components/StorefrontHome/CategoryFilterBar'>
              <X className="h-3.5 w-3.5" data-api-unique-id='categoryfilterbar-r9c55c1f8028018f8-s2343693249' data-api-unique-page-name='src/frontend/components/StorefrontHome/CategoryFilterBar' />
            </button>}
        </div>

        {/* Age Selector Pills */}
        <div className="flex min-w-0 flex-wrap items-center gap-1.5 border-t border-border pt-2 lg:border-t-0 lg:pt-0" data-api-unique-id='categoryfilterbar-r6ca11a1c9bde3ee3-s2343693249' data-api-unique-page-name='src/frontend/components/StorefrontHome/CategoryFilterBar'>
          <span className="mr-1 text-xs font-bold text-muted-foreground" data-api-unique-id='categoryfilterbar-r4bdda0c2926e4a45-s2343693249' data-api-unique-page-name='src/frontend/components/StorefrontHome/CategoryFilterBar'>Age:</span>
          {AGE_ITEMS.map((age, index) => {
          const isAgeActive = selectedAgeGroup === age.key;
          return <button key={age.key} type="button" onClick={() => onSelectAgeGroup(age.key)} className={`rounded-full border border-border/50 px-2.5 py-1 text-xs font-bold transition-all ${isAgeActive ? "bg-accent text-accent-foreground shadow-sm" : "bg-secondary text-secondary-foreground hover:bg-muted"}`} data-api-unique-id='categoryfilterbar-r01fa001f5a0e847f-s2343693249' data-api-unique-page-name='src/frontend/components/StorefrontHome/CategoryFilterBar' data-api-in-loop='1' data-api-bind-info={`AGE_ITEMS-${index}-label`} data-api-map-var-name='age'>
                {age.label}
              </button>;
        })}
        </div>

        {/* Sort Dropdown */}
        <div className="flex shrink-0 items-center gap-2 border-t border-border pt-2 sm:justify-end lg:border-t-0 lg:pt-0" data-api-unique-id='categoryfilterbar-r568bfc933d23acd1-s2343693249' data-api-unique-page-name='src/frontend/components/StorefrontHome/CategoryFilterBar'>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground" data-api-unique-id='categoryfilterbar-rc5c8c9e44dd1487b-s2343693249' data-api-unique-page-name='src/frontend/components/StorefrontHome/CategoryFilterBar'>
            <SlidersHorizontal className="h-3.5 w-3.5" data-api-unique-id='categoryfilterbar-rab644357f0c4e519-s2343693249' data-api-unique-page-name='src/frontend/components/StorefrontHome/CategoryFilterBar' />
            <span className="hidden sm:inline" data-api-unique-id='categoryfilterbar-reba208ebeee40674-s2343693249' data-api-unique-page-name='src/frontend/components/StorefrontHome/CategoryFilterBar'>Sort:</span>
          </div>
          <div className="w-[170px]" data-api-unique-id='categoryfilterbar-r9a7787695ae2afe7-s2343693249' data-api-unique-page-name='src/frontend/components/StorefrontHome/CategoryFilterBar'>
            <Select value={sortOption} onValueChange={val => onSortChange(val as SortOption)} data-api-unique-id='categoryfilterbar-r38f07862fb301658-s2343693249' data-api-unique-page-name='src/frontend/components/StorefrontHome/CategoryFilterBar'>
              <SelectTrigger className="h-9 w-full rounded-full border border-border/50 bg-card text-xs font-bold text-card-foreground shadow-sm" data-api-unique-id='categoryfilterbar-r162e5589a7783f54-s2343693249' data-api-unique-page-name='src/frontend/components/StorefrontHome/CategoryFilterBar'>
                <SelectValue placeholder="Sort toys" data-api-unique-id='categoryfilterbar-r48791e0c0ea54ef2-s2343693249' data-api-unique-page-name='src/frontend/components/StorefrontHome/CategoryFilterBar'>
                  {SORT_LABELS[sortOption] || "Sort toys"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="rounded-xl border border-border/50 bg-card text-card-foreground shadow-md" data-api-unique-id='categoryfilterbar-re14559a285c3a3b4-s2343693249' data-api-unique-page-name='src/frontend/components/StorefrontHome/CategoryFilterBar'>
                <SelectItem value="featured" className="text-xs font-semibold" data-api-unique-id='categoryfilterbar-rb00e978fa1c663c0-s2343693249' data-api-unique-page-name='src/frontend/components/StorefrontHome/CategoryFilterBar'>Featured Picks</SelectItem>
                <SelectItem value="price-asc" className="text-xs font-semibold" data-api-unique-id='categoryfilterbar-r2f1cc32395a46456-s2343693249' data-api-unique-page-name='src/frontend/components/StorefrontHome/CategoryFilterBar'>Price: Low to High</SelectItem>
                <SelectItem value="price-desc" className="text-xs font-semibold" data-api-unique-id='categoryfilterbar-r52954cb43ae7e29c-s2343693249' data-api-unique-page-name='src/frontend/components/StorefrontHome/CategoryFilterBar'>Price: High to Low</SelectItem>
                <SelectItem value="rating" className="text-xs font-semibold" data-api-unique-id='categoryfilterbar-ra793a3c718eb93ae-s2343693249' data-api-unique-page-name='src/frontend/components/StorefrontHome/CategoryFilterBar'>Highest Rating</SelectItem>
                <SelectItem value="bestselling" className="text-xs font-semibold" data-api-unique-id='categoryfilterbar-ra02f46551046c921-s2343693249' data-api-unique-page-name='src/frontend/components/StorefrontHome/CategoryFilterBar'>Best Selling</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground" data-api-unique-id='categoryfilterbar-ra01f74a84b78d05d-s2343693249' data-api-unique-page-name='src/frontend/components/StorefrontHome/CategoryFilterBar'>
        <span data-api-unique-id='categoryfilterbar-r030f17a6b7ec70e2-s2343693249' data-api-unique-page-name='src/frontend/components/StorefrontHome/CategoryFilterBar'>
          Showing <strong className="font-bold text-foreground" data-api-unique-id='categoryfilterbar-r31459a5e6a0caadf-s2343693249' data-api-unique-page-name='src/frontend/components/StorefrontHome/CategoryFilterBar'>{totalResults}</strong> delightful toys
        </span>
        {isFiltered && <button type="button" onClick={onResetFilters} className="font-bold text-primary hover:underline" data-api-unique-id='categoryfilterbar-r9f6a8bb202d06703-s2343693249' data-api-unique-page-name='src/frontend/components/StorefrontHome/CategoryFilterBar'>
            Reset all filters
          </button>}
      </div>
    </div>;
}