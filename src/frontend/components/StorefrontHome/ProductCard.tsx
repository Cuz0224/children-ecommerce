"use client";

import React from "react";
import EditableImg from "@/@base/EditableImg";
import { Star, ShoppingBag, Eye } from "lucide-react";
import type { ToyProduct } from "@/frontend/types/StorefrontHome";
interface ProductCardProps {
  product: ToyProduct;
  onAddToCart: (product: ToyProduct) => void;
  onViewDetails: (product: ToyProduct) => void;
}
export default function ProductCard({
  product,
  onAddToCart,
  onViewDetails
}: ProductCardProps) {
  const discountPercent = product.originalPrice && product.originalPrice > product.unitPrice ? Math.round((product.originalPrice - product.unitPrice) / product.originalPrice * 100) : null;
  return <article className="group relative flex min-w-0 flex-col rounded-2xl border border-border/50 bg-card p-3 text-card-foreground shadow-sm transition-all duration-200 hover:shadow-md sm:p-4" data-api-unique-id='productcard-r7ec7f89c6c9910ae-s25228967' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductCard'>
      {/* Top Image Frame with Age Badge */}
      <div className="relative overflow-hidden rounded-xl border border-border/50 bg-muted" data-api-unique-id='productcard-rbf88e560ddeb8141-s25228967' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductCard'>
        <EditableImg propKey={`toy-cover-${product.id}`} src={product.productImage ?? undefined} alt={product.name} className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105" data-api-unique-id='productcard-rdc9e31b73b1dfc81-s25228967' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductCard' />

        {/* Top-Right Age Recommendation Badge */}
        <div className="absolute top-2.5 right-2.5 rounded-full border border-border/50 bg-accent px-2.5 py-0.5 text-[11px] font-extrabold text-accent-foreground shadow-sm" data-api-unique-id='productcard-r131352a7e16fc333-s25228967' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductCard'>
          {product.ageLabel}
        </div>

        {/* Optional Top-Left Bestseller or Feature Badge */}
        {product.badge && <div className="absolute top-2.5 left-2.5 rounded-full border border-border/50 bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground shadow-sm" data-api-unique-id='productcard-r446c8ac64e0f8d07-s25228967' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductCard'>
            {product.badge}
          </div>}

        {/* Quick View Hover Action Overlay */}
        <button type="button" onClick={() => onViewDetails(product)} className="absolute inset-0 flex items-center justify-center bg-foreground/10 opacity-0 backdrop-blur-[1px] transition-opacity group-hover:opacity-100 focus-visible:opacity-100" aria-label={`View details for ${product.name}`} data-api-unique-id='productcard-r386e168f291eeaf7-s25228967' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductCard'>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-card px-3.5 py-1.5 text-xs font-bold text-card-foreground shadow-sm hover:bg-secondary" data-api-unique-id='productcard-r8ecae5cd117a143c-s25228967' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductCard'>
            <Eye className="h-3.5 w-3.5" data-api-unique-id='productcard-rfba5db98a4d126b5-s25228967' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductCard' />
            <span data-api-unique-id='productcard-r6bffa81f2760511b-s25228967' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductCard'>Quick Specs</span>
          </span>
        </button>
      </div>

      {/* Content Section: What -> So-what */}
      <div className="mt-3 flex min-w-0 flex-1 flex-col space-y-1.5" data-api-unique-id='productcard-r213e1d05204d655b-s25228967' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductCard'>
        {/* Rating and Reviews */}
        <div className="flex items-center gap-1.5 text-xs" data-api-unique-id='productcard-r12050665e4720aca-s25228967' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductCard'>
          <div className="flex items-center text-accent" data-api-unique-id='productcard-r10975baf66a90887-s25228967' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductCard'>
            <Star className="h-3.5 w-3.5 fill-current" data-api-unique-id='productcard-rba58a3fda64453fb-s25228967' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductCard' />
          </div>
          <span className="font-bold text-foreground" data-api-unique-id='productcard-r31cf8b890dbd8ed5-s25228967' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductCard'>
            {product.ratingAverage.toFixed(1)}
          </span>
          <span className="text-muted-foreground" data-api-unique-id='productcard-rf3c0a3c3643c3e61-s25228967' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductCard'>({product.reviewsCount})</span>
          <span className="ml-auto text-[11px] font-medium text-muted-foreground" data-api-unique-id='productcard-r2e800dba02a3796a-s25228967' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductCard'>
            {product.categoryLabel}
          </span>
        </div>

        {/* Product Title */}
        <h3 onClick={() => onViewDetails(product)} className="cursor-pointer font-display text-sm font-bold text-foreground transition-colors hover:text-primary sm:text-base line-clamp-2" data-api-unique-id='productcard-re3fdd94e96fa274d-s25228967' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductCard'>
          {product.name}
        </h3>

        {/* Short Feature / Description */}
        <p className="text-xs text-muted-foreground line-clamp-2" data-api-unique-id='productcard-rc7f53ce94d1c7e45-s25228967' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductCard'>
          {product.description}
        </p>
      </div>

      {/* Bottom Section: Price & Add to Cart (Now-what) */}
      <div className="mt-4 flex min-w-0 flex-col gap-2.5 border-t border-border pt-3" data-api-unique-id='productcard-rda40cd3970e96483-s25228967' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductCard'>
        {/* Price Row */}
        <div className="flex min-w-0 flex-wrap items-baseline gap-2" data-api-unique-id='productcard-r8669df7e8e5bf5bd-s25228967' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductCard'>
          <span className="font-display text-lg font-extrabold text-primary" data-api-unique-id='productcard-rc77b8a4f98d029d4-s25228967' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductCard'>
            ${product.unitPrice.toFixed(2)}
          </span>
          {product.originalPrice && product.originalPrice > product.unitPrice && <span className="text-xs font-medium text-muted-foreground line-through" data-api-unique-id='productcard-ra0a9904b562e4004-s25228967' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductCard'>
              ${product.originalPrice.toFixed(2)}
            </span>}
          {discountPercent !== null && discountPercent > 0 && <span className="inline-flex shrink-0 items-center rounded-full bg-success px-1.5 py-0.5 text-[10px] font-bold text-success-foreground" data-api-unique-id='productcard-rcd9ea12720f56810-s25228967' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductCard'>
              Save {discountPercent}%
            </span>}
        </div>

        {/* Action Row */}
        <div className="flex min-w-0 items-center gap-2" data-api-unique-id='productcard-r6bcc3451d3cf5e85-s25228967' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductCard'>
          <button type="button" onClick={() => onAddToCart(product)} className="inline-flex min-w-0 flex-1 items-center justify-center gap-2 rounded-full border border-border/50 bg-primary py-2 text-xs font-bold text-primary-foreground shadow-sm transition-all hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" data-api-unique-id='productcard-r28754063756c1fcd-s25228967' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductCard'>
            <ShoppingBag className="h-3.5 w-3.5" data-api-unique-id='productcard-rbe543d79e5925c64-s25228967' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductCard' />
            <span data-api-unique-id='productcard-r72bb59df8609a082-s25228967' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductCard'>Add to Cart</span>
          </button>
        </div>
      </div>
    </article>;
}