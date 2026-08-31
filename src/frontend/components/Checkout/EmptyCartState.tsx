"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, ArrowRight, Sparkles, Blocks, Gift } from "lucide-react";
import { StorefrontHome, OrderHistory } from "@/frontend/route-params";
interface EmptyCartStateProps {
  onContinueShopping?: () => void;
}
export default function EmptyCartState({
  onContinueShopping
}: EmptyCartStateProps) {
  const router = useRouter();
  const handleContinueShopping = () => {
    if (onContinueShopping) {
      onContinueShopping();
    }
    StorefrontHome.navigateTo(router);
  };
  const handleViewOrders = () => {
    OrderHistory.navigateTo(router);
  };
  return <div data-controller-name="Empty Cart Notice" className="bg-card text-card-foreground rounded-2xl border border-border/50 p-8 sm:p-12 shadow-md text-center flex flex-col items-center justify-center min-w-0" data-api-unique-id='emptycartstate-r0367e7f63203a8d2-s2896274014' data-api-unique-page-name='src/frontend/components/Checkout/EmptyCartState'>
      {/* Decorative toy block badge */}
      <div className="relative mb-6" data-api-unique-id='emptycartstate-r07f4e16a25a3db5c-s2896274014' data-api-unique-page-name='src/frontend/components/Checkout/EmptyCartState'>
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-muted border border-border/50 flex items-center justify-center shadow-md" data-api-unique-id='emptycartstate-r23c11472e74a7568-s2896274014' data-api-unique-page-name='src/frontend/components/Checkout/EmptyCartState'>
          <ShoppingBag className="w-12 h-12 sm:w-14 sm:h-14 text-primary animate-bounce" data-api-unique-id='emptycartstate-rac94bee9282e34e1-s2896274014' data-api-unique-page-name='src/frontend/components/Checkout/EmptyCartState' />
        </div>
        <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground p-2 rounded-full border border-border/50 shadow-sm" data-api-unique-id='emptycartstate-race43d7f16d1da5a-s2896274014' data-api-unique-page-name='src/frontend/components/Checkout/EmptyCartState'>
          <Sparkles className="w-4 h-4" data-api-unique-id='emptycartstate-rd17bf33d0f07a3f1-s2896274014' data-api-unique-page-name='src/frontend/components/Checkout/EmptyCartState' />
        </div>
        <div className="absolute -bottom-2 -left-2 bg-secondary text-secondary-foreground p-2 rounded-full border border-border/50 shadow-sm" data-api-unique-id='emptycartstate-r6918a1db47c5f283-s2896274014' data-api-unique-page-name='src/frontend/components/Checkout/EmptyCartState'>
          <Blocks className="w-4 h-4 text-accent" data-api-unique-id='emptycartstate-rcf362995f2fe0bba-s2896274014' data-api-unique-page-name='src/frontend/components/Checkout/EmptyCartState' />
        </div>
      </div>

      <h2 className="font-header text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3" data-api-unique-id='emptycartstate-rfb22e6e5ed52ebe5-s2896274014' data-api-unique-page-name='src/frontend/components/Checkout/EmptyCartState'>
        Your Toy Chest is Empty!
      </h2>
      <p className="text-muted-foreground max-w-md text-base sm:text-lg mb-8 leading-relaxed" data-api-unique-id='emptycartstate-r2fd839406ddbfc24-s2896274014' data-api-unique-page-name='src/frontend/components/Checkout/EmptyCartState'>
        Looks like you haven&apos;t added any joyful toys yet. Browse our handcrafted wooden sets, STEM maker kits, and cozy plushies to start your adventure.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto" data-api-unique-id='emptycartstate-raaec3fc08db400ed-s2896274014' data-api-unique-page-name='src/frontend/components/Checkout/EmptyCartState'>
        {/* Navigation back to Storefront [F01] */}
        <button type="button" onClick={handleContinueShopping} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold px-8 py-3.5 rounded-full border border-border/50 shadow-md hover:shadow-md transition-all text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" data-api-unique-id='emptycartstate-ra7b80977c8ae1551-s2896274014' data-api-unique-page-name='src/frontend/components/Checkout/EmptyCartState'>
          <Gift className="w-5 h-5" data-api-unique-id='emptycartstate-rd59fd2fa071b8d9f-s2896274014' data-api-unique-page-name='src/frontend/components/Checkout/EmptyCartState' />
          <span data-api-unique-id='emptycartstate-r9570a05b3fe28535-s2896274014' data-api-unique-page-name='src/frontend/components/Checkout/EmptyCartState'>Explore Toy Catalog</span>
          <ArrowRight className="w-5 h-5 ml-1" data-api-unique-id='emptycartstate-r85e7155712358f02-s2896274014' data-api-unique-page-name='src/frontend/components/Checkout/EmptyCartState' />
        </button>

        {/* Link to Orders [F06] if returning customer wants to see past purchases */}
        <button type="button" onClick={handleViewOrders} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground font-semibold px-6 py-3.5 rounded-full border border-border/50 hover:bg-muted active:scale-[0.98] transition-all text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" data-api-unique-id='emptycartstate-r10455a0052096675-s2896274014' data-api-unique-page-name='src/frontend/components/Checkout/EmptyCartState'>
          <span data-api-unique-id='emptycartstate-r1f062a7b396f0efe-s2896274014' data-api-unique-page-name='src/frontend/components/Checkout/EmptyCartState'>View Past Orders</span>
        </button>
      </div>
    </div>;
}