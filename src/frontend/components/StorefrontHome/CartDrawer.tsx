"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import EditableImg from "@/@base/EditableImg";
import { Checkout } from "@/frontend/route-params";
import { X, ShoppingBag, Plus, Minus, Trash2, Tag, ArrowRight, Truck, Sparkles, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import type { ShoppingCartState } from "@/frontend/types/StorefrontHome";
interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartState: ShoppingCartState;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onApplyPromo: (code: string) => boolean;
  onRemovePromo: () => void;
}
export default function CartDrawer({
  isOpen,
  onClose,
  cartState,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onApplyPromo,
  onRemovePromo
}: CartDrawerProps) {
  const router = useRouter();
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");
  if (!isOpen) return null;
  const {
    items,
    subtotal,
    discountAmount,
    shippingFee,
    totalAmount,
    appliedPromo,
    isFreeShipping,
    remainingForFreeShipping
  } = cartState;
  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const handleApplyPromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError("");
    if (!promoInput.trim()) {
      setPromoError("Please enter a coupon code.");
      return;
    }
    const success = onApplyPromo(promoInput.trim());
    if (success) {
      setPromoInput("");
      setPromoError("");
    } else {
      setPromoError("Invalid code or minimum subtotal requirement not met.");
    }
  };
  const handleProceedToCheckout = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    // Check if any items are out of stock or not LIVE
    const invalidItems = items.filter(item => item.product.storefrontStatus !== "LIVE" || item.product.stockCount <= 0);
    if (invalidItems.length > 0) {
      toast.error("Some items in your cart are no longer available for checkout.");
      return;
    }
    // Route to F05 Checkout
    Checkout.navigateTo(router);
  };
  return <div className="fixed inset-0 z-50 flex justify-end" data-api-unique-id='cartdrawer-r51383de0ab7f3cc5-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>
      {/* Semi-transparent backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-foreground/30 backdrop-blur-sm transition-opacity" aria-hidden="true" data-api-unique-id='cartdrawer-r5a1b118a20772d52-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer' />

      {/* Sliding Dock / Drawer */}
      <div className="relative flex h-full w-full max-w-md flex-col border-l-2 border-border/50 bg-card text-card-foreground shadow-2xl" data-api-unique-id='cartdrawer-r7215c55e3ef0767f-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-border/50 bg-secondary px-6 py-4" data-api-unique-id='cartdrawer-r8de7da876d1d8c69-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>
          <div className="flex items-center gap-2.5" data-api-unique-id='cartdrawer-r37d14cf568befa1f-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border/50 bg-primary text-primary-foreground shadow-sm" data-api-unique-id='cartdrawer-r2cbaebea19006d8e-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>
              <ShoppingBag className="h-4 w-4" data-api-unique-id='cartdrawer-rce772e7d089cca13-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer' />
            </div>
            <div data-api-unique-id='cartdrawer-rcd155afc9085eb2d-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>
              <h2 className="font-display text-lg font-extrabold text-foreground" data-api-unique-id='cartdrawer-r3f7bd17ab2acaacb-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>
                Your Joyful Cart
              </h2>
              <p className="text-xs font-semibold text-muted-foreground" data-api-unique-id='cartdrawer-rba4d80fe886ae657-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>
                {totalItemCount} {totalItemCount === 1 ? "toy" : "toys"} selected
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2" data-api-unique-id='cartdrawer-r5e4c0a3e58b835e0-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>
            {items.length > 0 && <button type="button" onClick={onClearCart} className="rounded-full border border-border bg-card px-2.5 py-1 text-[11px] font-bold text-muted-foreground transition-colors hover:text-destructive" title="Clear all items" data-api-unique-id='cartdrawer-ree279239904a732a-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>
                Clear
              </button>}
            <button type="button" onClick={onClose} className="rounded-full border border-border/50 bg-card p-1.5 text-foreground shadow-sm hover:bg-muted active:translate-y-[1px]" aria-label="Close cart" data-api-unique-id='cartdrawer-r1fc47fc5d959d2fa-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>
              <X className="h-4 w-4" data-api-unique-id='cartdrawer-refb295afbcacde77-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer' />
            </button>
          </div>
        </div>

        {/* Free Shipping Milestone Progress */}
        <div className="border-b border-border bg-muted/70 px-6 py-3" data-api-unique-id='cartdrawer-r394eb28be4856211-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>
          <div className="flex items-center justify-between text-xs font-bold" data-api-unique-id='cartdrawer-r9df3c5a173d0780d-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>
            <span className="flex items-center gap-1.5 text-foreground" data-api-unique-id='cartdrawer-rb21f2710fdd9b28e-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>
              <Truck className="h-4 w-4 text-primary" data-api-unique-id='cartdrawer-r1ba3b58ea0658abb-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer' />
              {isFreeShipping ? <span className="text-success" data-api-unique-id='cartdrawer-re24c82d1dc0aede2-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>You unlocked Free Express Shipping!</span> : <span data-api-unique-id='cartdrawer-r9f83c3bb0a6fd13f-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>
                  Add <strong className="text-primary" data-api-unique-id='cartdrawer-r1aa592549aa470cd-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>${remainingForFreeShipping.toFixed(2)}</strong> more for Free Shipping
                </span>}
            </span>
            <span className="text-[11px] text-muted-foreground" data-api-unique-id='cartdrawer-r07d4ded6fd6af866-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>
              {Math.min(100, Math.round(subtotal / 45 * 100))}%
            </span>
          </div>

          <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full border border-border/50 bg-card" data-api-unique-id='cartdrawer-r550631ea85f8d57f-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>
            <div className="h-full bg-primary transition-all duration-300" style={{
            width: `${Math.min(100, subtotal / 45 * 100)}%`
          }} data-api-unique-id='cartdrawer-rde3b18148ee83581-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer' />
          </div>
        </div>

        {/* Cart Items List or Empty State */}
        {items.length === 0 ? <div className="flex flex-1 flex-col items-center justify-center p-8 text-center" data-api-unique-id='cartdrawer-rd248227a8b9b7966-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border/50 bg-secondary text-muted-foreground shadow-sm" data-api-unique-id='cartdrawer-r1ca53cade89d8003-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>
              <ShoppingBag className="h-8 w-8" data-api-unique-id='cartdrawer-r18467ab8c7999111-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer' />
            </div>
            <h3 className="mt-4 font-display text-lg font-bold text-foreground" data-api-unique-id='cartdrawer-r279d415a3b167002-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>
              Your cart is empty!
            </h3>
            <p className="mt-1 max-w-xs text-xs text-muted-foreground" data-api-unique-id='cartdrawer-rbf75389c942ae5db-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>
              Explore our curated shelves and find the perfect safe toy for playtime.
            </p>
            <button type="button" onClick={onClose} className="mt-6 rounded-full border border-border/50 bg-primary px-6 py-2.5 text-xs font-bold text-primary-foreground shadow-sm hover:translate-y-[-1px] active:translate-y-[1px]" data-api-unique-id='cartdrawer-r018b2aba9270782f-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>
              Browse Toys
            </button>
          </div> : <>
            {/* Cart Items Scroll Container */}
            <div className="flex-1 space-y-3 overflow-y-auto p-4" data-api-unique-id='cartdrawer-r31e19c026641c781-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>
              {items.map((item, index) => <div key={item.productId} className="flex min-w-0 items-start gap-3 rounded-xl border border-border/50 bg-card p-3 text-card-foreground shadow-sm" data-api-unique-id='cartdrawer-re6df220c8bacfd4d-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer' data-api-in-loop='1'>
                  {/* Thumbnail */}
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-border/50 bg-muted" data-api-unique-id='cartdrawer-rd3b281ee42a86007-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer' data-api-in-loop='1'>
                    <EditableImg propKey={`cart-item-${item.productId}`} src={item.product.productImage || undefined} alt={item.product.name} className="h-full w-full object-cover" data-api-unique-id='cartdrawer-rf9d5833c7105b0d1-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer' data-api-in-loop='1' />
                  </div>

                  {/* Info Column */}
                  <div className="min-w-0 flex-1 space-y-1" data-api-unique-id='cartdrawer-r75c575a762f24d00-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer' data-api-in-loop='1'>
                    <div className="flex items-start justify-between gap-1" data-api-unique-id='cartdrawer-rcf51c06ebf832c9f-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer' data-api-in-loop='1'>
                      <h4 className="line-clamp-1 font-display text-xs font-bold text-foreground" data-api-unique-id='cartdrawer-r1ea658502411be5a-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer' data-api-in-loop='1' data-api-bind-info={`items-${index}-product.name`} data-api-map-var-name='item'>
                        {item.product.name}
                      </h4>
                      <button type="button" onClick={() => onRemoveItem(item.productId)} className="text-muted-foreground hover:text-destructive" aria-label={`Remove ${item.product.name}`} data-api-unique-id='cartdrawer-rfe7d44d3d9692545-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer' data-api-in-loop='1'>
                        <Trash2 className="h-3.5 w-3.5" data-api-unique-id='cartdrawer-r6542da35983a8801-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer' data-api-in-loop='1' />
                      </button>
                    </div>

                    <p className="text-[11px] text-muted-foreground" data-api-unique-id='cartdrawer-ra2e5092c5b46fb82-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer' data-api-in-loop='1' data-api-bind-info={`items-${index}-product.ageLabel`} data-api-map-var-name='item'>
                      Age {item.product.ageLabel} · ${item.product.unitPrice.toFixed(2)} each
                    </p>

                    {/* Quantity Adjustment + Line Subtotal */}
                    <div className="flex items-center justify-between pt-1" data-api-unique-id='cartdrawer-rb8ef09621970038d-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer' data-api-in-loop='1'>
                      <div className="inline-flex items-center rounded-full border border-border/50 bg-secondary px-1 py-0.5" data-api-unique-id='cartdrawer-r91f93d9ebda75f96-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer' data-api-in-loop='1'>
                        <button type="button" onClick={() => onUpdateQuantity(item.productId, -1)} className="flex h-5 w-5 items-center justify-center rounded-full text-foreground hover:bg-card" aria-label="Decrease quantity" data-api-unique-id='cartdrawer-r242cf77603c1d88d-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer' data-api-in-loop='1'>
                          <Minus className="h-3 w-3" data-api-unique-id='cartdrawer-r6c5efbc2d6f4e1a1-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer' data-api-in-loop='1' />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-foreground" data-api-unique-id='cartdrawer-r079123ae18c86f53-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer' data-api-in-loop='1' data-api-bind-info={`items-${index}-quantity`} data-api-map-var-name='item'>
                          {item.quantity}
                        </span>
                        <button type="button" onClick={() => onUpdateQuantity(item.productId, 1)} disabled={item.quantity >= item.product.stockCount} className="flex h-5 w-5 items-center justify-center rounded-full text-foreground hover:bg-card disabled:opacity-40" aria-label="Increase quantity" data-api-unique-id='cartdrawer-r5777693c07000f5a-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer' data-api-in-loop='1'>
                          <Plus className="h-3 w-3" data-api-unique-id='cartdrawer-r78f3747381920f50-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer' data-api-in-loop='1' />
                        </button>
                      </div>

                      <span className="font-display text-xs font-extrabold text-primary" data-api-unique-id='cartdrawer-r702b72f0711a6785-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer' data-api-in-loop='1'>
                        ${(item.product.unitPrice * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>)}
            </div>

            {/* Promo Code Input Bar */}
            <div className="border-t border-border bg-card p-4" data-api-unique-id='cartdrawer-r83c07273b64b2cf6-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>
              {appliedPromo ? <div className="flex items-center justify-between rounded-xl border border-success bg-success/10 px-3 py-2 text-xs font-bold text-success" data-api-unique-id='cartdrawer-r5d7369b0c8200223-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>
                  <div className="flex items-center gap-1.5" data-api-unique-id='cartdrawer-re6ddac31f1333178-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>
                    <Sparkles className="h-3.5 w-3.5" data-api-unique-id='cartdrawer-rb87868c03f4af043-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer' />
                    <span data-api-unique-id='cartdrawer-r43b9fc287889982a-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>
                      Coupon <strong data-api-unique-id='cartdrawer-rc62c17eb6cf7936d-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>{appliedPromo.code}</strong> applied
                    </span>
                  </div>
                  <button type="button" onClick={onRemovePromo} className="text-xs font-semibold text-destructive hover:underline" data-api-unique-id='cartdrawer-ra69c730f272ed0d3-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>
                    Remove
                  </button>
                </div> : <div data-api-unique-id='cartdrawer-rc3860b22a6828644-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>
                  <form onSubmit={handleApplyPromoSubmit} className="flex gap-2" data-api-unique-id='cartdrawer-r15346642bcef0469-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>
                    <div className="relative flex-1" data-api-unique-id='cartdrawer-rf9dfec0207bb35df-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>
                      <Tag className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" data-api-unique-id='cartdrawer-r9e14e7031d0cb44a-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer' />
                      <input type="text" value={promoInput} onChange={e => {
                  setPromoInput(e.target.value);
                  if (promoError) setPromoError("");
                }} placeholder="Coupon (try JOY10 or SAVE15)" className="w-full rounded-full border border-border/50 bg-background py-1.5 pr-3 pl-8 text-xs font-bold text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" data-api-unique-id='cartdrawer-rb277a1e614abe482-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer' />
                    </div>
                    <button type="submit" className="rounded-full border border-border/50 bg-secondary px-3.5 py-1.5 text-xs font-bold text-secondary-foreground shadow-sm hover:bg-muted" data-api-unique-id='cartdrawer-rcb0b31de411615d8-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>
                      Apply
                    </button>
                  </form>
                  {promoError && <p className="mt-1.5 flex items-center gap-1 text-[11px] font-semibold text-destructive" data-api-unique-id='cartdrawer-r6e8544715e56664b-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>
                      <AlertCircle className="h-3 w-3" data-api-unique-id='cartdrawer-reb81f0152fbd0c1b-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer' />
                      <span data-api-unique-id='cartdrawer-r5f73e6a110e248bf-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>{promoError}</span>
                    </p>}
                </div>}
            </div>

            {/* Pricing Breakdown & Checkout Action */}
            <div className="border-t border-border/50 bg-secondary p-5 text-secondary-foreground" data-api-unique-id='cartdrawer-r551c1ff9dc6a3721-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>
              <div className="space-y-1.5 text-xs" data-api-unique-id='cartdrawer-r2f57aeb6ba888e4d-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>
                <div className="flex justify-between" data-api-unique-id='cartdrawer-r5671fd92e31601ca-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>
                  <span className="text-muted-foreground" data-api-unique-id='cartdrawer-r9d20757157658a13-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>Subtotal</span>
                  <span className="font-bold text-foreground" data-api-unique-id='cartdrawer-ra27e9757411ea43c-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && <div className="flex justify-between font-bold text-success" data-api-unique-id='cartdrawer-rcc348401cd46e4a6-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>
                    <span data-api-unique-id='cartdrawer-r297900bececf51e5-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>Discount ({appliedPromo?.code})</span>
                    <span data-api-unique-id='cartdrawer-r3b691cd3e7503fb5-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>-${discountAmount.toFixed(2)}</span>
                  </div>}
                <div className="flex justify-between" data-api-unique-id='cartdrawer-r37af11ddf56a80e0-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>
                  <span className="text-muted-foreground" data-api-unique-id='cartdrawer-rd3b1fc193c824b56-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>Shipping</span>
                  <span className="font-bold text-foreground" data-api-unique-id='cartdrawer-rfaa360e954c96210-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>
                    {shippingFee === 0 ? <span className="text-success" data-api-unique-id='cartdrawer-rb10c3adbd5ed0c70-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>FREE</span> : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between border-t border-border pt-2 text-sm font-extrabold text-foreground" data-api-unique-id='cartdrawer-r76a57a7047fef0a0-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>
                  <span data-api-unique-id='cartdrawer-r15bf06ac0075a926-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>Total Due</span>
                  <span className="font-display text-lg text-primary" data-api-unique-id='cartdrawer-r5f6d21144ebe8caf-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button type="button" onClick={handleProceedToCheckout} className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-border/50 bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-md transition-all hover:shadow-md" data-api-unique-id='cartdrawer-re5cff28f98edd920-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>
                <span data-api-unique-id='cartdrawer-rbe7e4d91c98a301f-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer'>Proceed to Checkout</span>
                <ArrowRight className="h-4 w-4" data-api-unique-id='cartdrawer-rf09ebf6e2e33e2bf-s1062613216' data-api-unique-page-name='src/frontend/components/StorefrontHome/CartDrawer' />
              </button>
            </div>
          </>}
      </div>
    </div>;
}