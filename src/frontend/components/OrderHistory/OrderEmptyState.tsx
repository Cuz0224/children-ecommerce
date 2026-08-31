"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { PackageOpen, ShoppingBag, Sparkles, RefreshCw } from "lucide-react";
import { StorefrontHome } from "@/frontend/route-params";
interface OrderEmptyStateProps {
  isFiltered: boolean;
  onResetFilters?: () => void;
}
export default function OrderEmptyState({
  isFiltered,
  onResetFilters
}: OrderEmptyStateProps) {
  const router = useRouter();
  if (isFiltered) {
    return <div className="bg-card text-card-foreground rounded-2xl border border-border/50 p-8 sm:p-12 text-center shadow-md space-y-5 max-w-xl mx-auto" data-api-unique-id='orderemptystate-rcc5cba259f2c4c2a-s1169316052' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderEmptyState'>
        <div className="h-16 w-16 bg-muted text-muted-foreground rounded-2xl border border-border/50 mx-auto flex items-center justify-center shadow-sm" data-api-unique-id='orderemptystate-r53cec4536e215e08-s1169316052' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderEmptyState'>
          <PackageOpen className="h-8 w-8" data-api-unique-id='orderemptystate-rd94536366950c2ec-s1169316052' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderEmptyState' />
        </div>
        <div className="space-y-2" data-api-unique-id='orderemptystate-r72b910cd584f278f-s1169316052' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderEmptyState'>
          <h3 className="font-display font-extrabold text-xl sm:text-2xl text-card-foreground" data-api-unique-id='orderemptystate-r0a368083eed5a571-s1169316052' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderEmptyState'>
            No Matching Orders Found
          </h3>
          <p className="text-sm text-muted-foreground font-body max-w-md mx-auto" data-api-unique-id='orderemptystate-r01ff057d978b4f3c-s1169316052' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderEmptyState'>
            We couldn't find any completed toy orders matching your current search or filter criteria.
          </p>
        </div>
        {onResetFilters && <button type="button" onClick={onResetFilters} className="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground font-bold text-xs px-5 py-2.5 rounded-full border border-border/50 hover:bg-muted transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='orderemptystate-r12ede93d0cff89d6-s1169316052' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderEmptyState'>
            <RefreshCw className="h-3.5 w-3.5" data-api-unique-id='orderemptystate-r17b118398f2fd41e-s1169316052' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderEmptyState' />
            <span data-api-unique-id='orderemptystate-r7c3f685b4677e8d7-s1169316052' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderEmptyState'>Reset Search & Filters</span>
          </button>}
      </div>;
  }
  return <div className="bg-card text-card-foreground rounded-2xl border border-border/50 p-8 sm:p-12 text-center shadow-md space-y-6 max-w-2xl mx-auto" data-api-unique-id='orderemptystate-r0e63e853dd8fd771-s1169316052' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderEmptyState'>
      {/* Decorative Toy Box Graphic */}
      <div className="relative inline-block" data-api-unique-id='orderemptystate-r18415dd116676af0-s1169316052' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderEmptyState'>
        <div className="h-20 w-20 sm:h-24 sm:w-24 bg-primary/10 text-primary rounded-3xl border border-border/50 mx-auto flex items-center justify-center shadow-md" data-api-unique-id='orderemptystate-r3dbe582d0a76dcf7-s1169316052' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderEmptyState'>
          <PackageOpen className="h-10 w-10 sm:h-12 sm:w-12 text-primary" data-api-unique-id='orderemptystate-rd2f6b8b9177a33c2-s1169316052' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderEmptyState' />
        </div>
        <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground p-1.5 rounded-full border border-border/50 shadow-sm" data-api-unique-id='orderemptystate-r85252a768a7c765e-s1169316052' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderEmptyState'>
          <Sparkles className="h-4 w-4" data-api-unique-id='orderemptystate-rb11a1b2dadc2a824-s1169316052' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderEmptyState' />
        </span>
      </div>

      {/* Main Text */}
      <div className="space-y-3" data-api-unique-id='orderemptystate-ra00c20180dca7ce6-s1169316052' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderEmptyState'>
        <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-card-foreground tracking-tight" data-api-unique-id='orderemptystate-r34903332535d3fab-s1169316052' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderEmptyState'>
          Your Toy Chest Is Waiting!
        </h3>
        <p className="text-sm sm:text-base text-muted-foreground font-body max-w-md mx-auto leading-relaxed" data-api-unique-id='orderemptystate-rad7865e63c4062c1-s1169316052' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderEmptyState'>
          Purchased toys and completed orders will appear here automatically after simulated checkout. Explore our collection of wooden blocks, STEM kits, and plush friends!
        </p>
      </div>

      {/* Primary CTA: Shop Again / Storefront [F01] */}
      <div className="pt-2" data-api-unique-id='orderemptystate-r583f5a98b0c951c8-s1169316052' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderEmptyState'>
        <button type="button" onClick={() => StorefrontHome.navigateTo(router)} className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold px-8 py-3.5 rounded-full border border-border/50 shadow-md hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-sm" data-api-unique-id='orderemptystate-rea289f58c03c3123-s1169316052' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderEmptyState'>
          <ShoppingBag className="h-4 w-4" data-api-unique-id='orderemptystate-re54d1cd7043eb396-s1169316052' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderEmptyState' />
          <span data-api-unique-id='orderemptystate-r7755d1816ef1eeb7-s1169316052' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderEmptyState'>Shop Toys & Fill Your Box</span>
        </button>
      </div>
    </div>;
}