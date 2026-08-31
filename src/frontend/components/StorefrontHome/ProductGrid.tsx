"use client";

import React from "react";
import ProductCard from "@/frontend/components/StorefrontHome/ProductCard";
import CategoryFilterBar from "@/frontend/components/StorefrontHome/CategoryFilterBar";
import { PackageOpen, RotateCcw } from "lucide-react";
import type { ToyProduct, CategoryKey, AgeGroupKey, SortOption } from "@/frontend/types/StorefrontHome";
interface ProductGridProps {
  products: ToyProduct[];
  selectedCategory: CategoryKey;
  onSelectCategory: (category: CategoryKey) => void;
  selectedAgeGroup: AgeGroupKey;
  onSelectAgeGroup: (ageGroup: AgeGroupKey) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  onAddToCart: (product: ToyProduct) => void;
  onViewDetails: (product: ToyProduct) => void;
  onResetFilters: () => void;
}
export default function ProductGrid({
  products,
  selectedCategory,
  onSelectCategory,
  selectedAgeGroup,
  onSelectAgeGroup,
  searchQuery,
  onSearchChange,
  sortOption,
  onSortChange,
  onAddToCart,
  onViewDetails,
  onResetFilters
}: ProductGridProps) {
  return <section id="toy-catalog" data-controller-name="Product Catalog" className="w-full bg-background py-10 sm:py-14" data-api-unique-id='productgrid-r7dc8514e786fa831-s560714571' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductGrid'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8" data-api-unique-id='productgrid-rf8bff5e49543c952-s560714571' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductGrid'>
        {/* Section Headline */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between" data-api-unique-id='productgrid-r85ed170beeee8e32-s560714571' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductGrid'>
          <div data-api-unique-id='productgrid-r3b66fd6337bdb326-s560714571' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductGrid'>
            <h2 className="font-display text-2xl font-extrabold text-foreground sm:text-3xl" data-api-unique-id='productgrid-r8a6625699e4a88b5-s560714571' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductGrid'>
              Curated Toy Shelves
            </h2>
            <p className="text-sm text-muted-foreground" data-api-unique-id='productgrid-r79c951c4abbb1c7f-s560714571' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductGrid'>
              Handcrafted, safety-certified, and designed for boundless imagination.
            </p>
          </div>
        </div>

        {/* Filter Toolbar Component */}
        <CategoryFilterBar selectedCategory={selectedCategory} onSelectCategory={onSelectCategory} selectedAgeGroup={selectedAgeGroup} onSelectAgeGroup={onSelectAgeGroup} searchQuery={searchQuery} onSearchChange={onSearchChange} sortOption={sortOption} onSortChange={onSortChange} totalResults={products.length} onResetFilters={onResetFilters} data-api-unique-id='productgrid-rc6353fb2a5b44aee-s560714571' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductGrid' />

        {/* Product Cards Grid or Empty State */}
        {products.length > 0 ? <div className="grid min-w-0 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" data-api-unique-id='productgrid-rd6a472212d6c0a73-s560714571' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductGrid'>
            {products.map((product, index) => <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} onViewDetails={onViewDetails} data-api-unique-id='productgrid-r75f01db0a241e150-s560714571' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductGrid' data-api-in-loop='1' />)}
          </div> : <div className="flex flex-col items-center justify-center rounded-3xl border border-border/50 bg-card p-12 text-center text-card-foreground shadow-md" data-api-unique-id='productgrid-r3c9ce49a275b804d-s560714571' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductGrid'>
            <div className="rounded-full border border-border/50 bg-secondary p-4 text-primary shadow-sm" data-api-unique-id='productgrid-rd1881355e538bed6-s560714571' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductGrid'>
              <PackageOpen className="h-8 w-8" data-api-unique-id='productgrid-r79744d03c6757dab-s560714571' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductGrid' />
            </div>
            <h3 className="mt-4 font-display text-lg font-bold text-foreground" data-api-unique-id='productgrid-rf53e0aab0e5518b4-s560714571' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductGrid'>
              No matching toys in this shelf
            </h3>
            <p className="mt-1 max-w-sm text-xs text-muted-foreground sm:text-sm" data-api-unique-id='productgrid-rf59582b632d28b0c-s560714571' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductGrid'>
              We couldn&apos;t find any toys matching your current filters or search terms.
              Try adjusting your age or category selection.
            </p>
            <button type="button" onClick={onResetFilters} className="mt-5 inline-flex items-center gap-2 rounded-full border border-border/50 bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-sm transition-all hover:translate-y-[-1px] active:translate-y-[1px]" data-api-unique-id='productgrid-rd9712ac9480d7552-s560714571' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductGrid'>
              <RotateCcw className="h-3.5 w-3.5" data-api-unique-id='productgrid-r4288b370e3d669d0-s560714571' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductGrid' />
              <span data-api-unique-id='productgrid-rd6983e620b5576eb-s560714571' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductGrid'>Reset All Filters</span>
            </button>
          </div>}
      </div>
    </section>;
}