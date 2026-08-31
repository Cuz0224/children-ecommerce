"use client";

import React, { useState } from "react";
import { Tag, Truck, Check, X, ArrowRight, Sparkles, ShieldCheck, AlertCircle, Gift, Lock, Loader2 } from "lucide-react";
import { PromoCode, CheckoutCalculation } from "@/frontend/types/Checkout";
interface OrderSummaryProps {
  calculation: CheckoutCalculation;
  availablePromos: PromoCode[];
  onApplyPromo: (code: string) => Promise<boolean> | boolean;
  onRemovePromo: () => void;
  onCompleteCheckout: () => void;
  isSubmitting: boolean;
  itemCount: number;
}
export default function OrderSummary({
  calculation,
  availablePromos,
  onApplyPromo,
  onRemovePromo,
  onCompleteCheckout,
  isSubmitting,
  itemCount
}: OrderSummaryProps) {
  const [promoInput, setPromoInput] = useState("");
  const [promoFeedback, setPromoFeedback] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: ""
  });
  const {
    subtotal,
    discountAmount,
    shippingFee,
    totalAmount,
    freeShippingThreshold,
    amountToFreeShipping,
    isFreeShipping,
    hasStockIssue,
    invalidItemsCount,
    appliedPromo
  } = calculation;
  const progressPercent = freeShippingThreshold > 0 ? Math.min(100, Math.max(0, Math.round((subtotal - discountAmount) / freeShippingThreshold * 100))) : 100;
  const handleApply = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!promoInput.trim()) {
      setPromoFeedback({
        type: "error",
        message: "Please enter a valid toy promo voucher code."
      });
      return;
    }
    const success = await onApplyPromo(promoInput.trim());
    if (success) {
      setPromoFeedback({
        type: "success",
        message: "Promo code successfully applied to your active cart!"
      });
      setPromoInput("");
    } else {
      setPromoFeedback({
        type: "error",
        message: "Invalid, inactive, or cart does not meet minimum subtotal."
      });
    }
  };
  const handleQuickApply = async (code: string) => {
    setPromoInput(code);
    const success = await onApplyPromo(code);
    if (success) {
      setPromoFeedback({
        type: "success",
        message: `Promo code "${code}" applied!`
      });
      setPromoInput("");
    } else {
      setPromoFeedback({
        type: "error",
        message: `Promo "${code}" requires minimum subtotal or is invalid.`
      });
    }
  };
  const canCheckout = itemCount > 0 && !hasStockIssue && !isSubmitting;
  return <div data-controller-name="Order Summary & Promo" className="bg-card text-card-foreground rounded-2xl border border-border/50 p-5 sm:p-6 shadow-md space-y-6 min-w-0" data-api-unique-id='ordersummary-rc919ed11dfddc7b4-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>
      <div className="flex items-center justify-between border-b border-border pb-4" data-api-unique-id='ordersummary-r3777f3c796a94fd9-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>
        <h2 className="font-header text-xl sm:text-2xl font-bold text-foreground" data-api-unique-id='ordersummary-r5e6687e405f7840a-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>
          Order Summary
        </h2>
        <span className="bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1 rounded-full border border-border" data-api-unique-id='ordersummary-r60218e8779d993c9-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>
          {itemCount} {itemCount === 1 ? "Toy" : "Toys"}
        </span>
      </div>

      {/* Block-Style Free Shipping Progress Meter */}
      <div className="bg-muted text-card-foreground rounded-xl border border-border/50 p-4 space-y-2.5" data-api-unique-id='ordersummary-r3f743b06747ce855-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>
        <div className="flex items-center justify-between text-xs sm:text-sm font-bold" data-api-unique-id='ordersummary-r41c462685976ec54-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>
          <div className="flex items-center gap-1.5 text-foreground" data-api-unique-id='ordersummary-re67d25d249de40d7-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>
            <Truck className="w-4 h-4 text-primary shrink-0" data-api-unique-id='ordersummary-rcb9de6135265bda4-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary' />
            <span data-api-unique-id='ordersummary-r224a43aec24586ac-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>Toy Delivery Perks</span>
          </div>
          {isFreeShipping ? <span className="text-success font-extrabold flex items-center gap-1" data-api-unique-id='ordersummary-r0d1f7215900102cc-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>
              <Check className="w-3.5 h-3.5" data-api-unique-id='ordersummary-r6ea1f43ddb2640f9-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary' /> FREE Shipping!
            </span> : <span className="text-accent font-extrabold" data-api-unique-id='ordersummary-rc8cc84beaaf5729b-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>
              ${amountToFreeShipping.toFixed(2)} to FREE Shipping
            </span>}
        </div>

        {/* Playful block meter */}
        <div className="w-full h-3 bg-secondary rounded-full overflow-hidden border border-border relative" data-api-unique-id='ordersummary-r41c02794ce77eff6-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>
          <div className={`h-full transition-all duration-500 rounded-full ${isFreeShipping ? "bg-success" : "bg-primary"}`} style={{
          width: `${progressPercent}%`
        }} data-api-unique-id='ordersummary-r2eb17b2ca49da10f-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary' />
        </div>

        <p className="text-[11px] sm:text-xs text-muted-foreground" data-api-unique-id='ordersummary-r77a441860fb4bfa6-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>
          {isFreeShipping ? "Your toy parcel qualifies for zero shipping cost!" : `Orders of $${freeShippingThreshold.toFixed(2)}+ get automated free express shipping.`}
        </p>
      </div>

      {/* Promo Code Entry & Voucher Showcase */}
      <div className="space-y-3" data-api-unique-id='ordersummary-rba7343c12d4e6502-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>
        <label htmlFor="promo-input" className="block text-xs font-bold text-foreground uppercase tracking-wider" data-api-unique-id='ordersummary-r855ce4a65cf3bf84-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>
          Toy Voucher / Promo Code
        </label>

        {appliedPromo ? <div className="flex items-center justify-between bg-success/10 text-card-foreground border border-success/30 rounded-xl px-3.5 py-2.5" data-api-unique-id='ordersummary-rb12a2ce5fc15f668-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>
            <div className="flex items-center gap-2 min-w-0" data-api-unique-id='ordersummary-r4eee36bb83235601-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>
              <Tag className="w-4 h-4 text-success shrink-0" data-api-unique-id='ordersummary-re897b98f9cd1e2f7-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary' />
              <div className="min-w-0" data-api-unique-id='ordersummary-r8a19798333efbd33-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>
                <span className="font-mono font-bold text-sm text-success block truncate" data-api-unique-id='ordersummary-rcc759dc1e91d03bf-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>
                  {appliedPromo.code}
                </span>
                <span className="text-xs text-muted-foreground block truncate" data-api-unique-id='ordersummary-r35018c1d1609bb32-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>
                  {appliedPromo.description}
                </span>
              </div>
            </div>
            <button type="button" onClick={() => {
          onRemovePromo();
          setPromoFeedback({
            type: null,
            message: ""
          });
        }} className="p-1 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors shrink-0" title="Remove promo" aria-label="Remove promo code" data-api-unique-id='ordersummary-rce210c4d1c4c5efc-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>
              <X className="w-4 h-4" data-api-unique-id='ordersummary-rc703a7c3acaa039a-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary' />
            </button>
          </div> : <form onSubmit={handleApply} className="flex gap-2" data-api-unique-id='ordersummary-r02ba810295ce306e-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>
            <div className="relative flex-1 min-w-0" data-api-unique-id='ordersummary-r660bf8dd3c5627f6-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>
              <input id="promo-input" type="text" value={promoInput} onChange={e => {
            setPromoInput(e.target.value.toUpperCase());
            setPromoFeedback({
              type: null,
              message: ""
            });
          }} placeholder="e.g. TOYJOY15" className="w-full bg-card text-foreground placeholder:text-muted-foreground border border-border/50 rounded-xl px-3.5 py-2.5 text-sm uppercase tracking-wider font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-all" data-api-unique-id='ordersummary-r88bf33816542d979-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary' />
            </div>
            <button type="submit" className="bg-secondary text-secondary-foreground font-bold px-4 py-2.5 rounded-xl border border-border/50 hover:bg-muted active:scale-95 transition-all text-sm shrink-0 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='ordersummary-rca96e7dc02a9f38d-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>
              Apply
            </button>
          </form>}

        {/* Promo Feedback */}
        {promoFeedback.type && <div className={`text-xs p-2.5 rounded-xl flex items-start gap-1.5 ${promoFeedback.type === "success" ? "bg-success/10 text-success font-semibold" : "bg-destructive/10 text-destructive font-semibold"}`} data-api-unique-id='ordersummary-rb307084faf51d8f3-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>
            {promoFeedback.type === "success" ? <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" data-api-unique-id='ordersummary-r2dc3df79b26c9514-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary' /> : <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" data-api-unique-id='ordersummary-r60b21370c6b294ff-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary' />}
            <span className="min-w-0 break-words" data-api-unique-id='ordersummary-r75510742ce38bdca-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>{promoFeedback.message}</span>
          </div>}

        {/* Preset quick voucher tags */}
        {!appliedPromo && availablePromos.length > 0 && <div className="pt-1" data-api-unique-id='ordersummary-r351832e512692f87-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>
            <span className="text-[11px] font-bold text-muted-foreground block mb-1.5" data-api-unique-id='ordersummary-rb7bd3f73a461d57a-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>
              Available Toy Rewards:
            </span>
            <div className="flex flex-wrap gap-1.5" data-api-unique-id='ordersummary-r5f746d2324b61b19-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>
              {availablePromos.map((p, index) => <button key={p.id} type="button" onClick={() => handleQuickApply(p.code)} className="inline-flex items-center gap-1 bg-secondary text-secondary-foreground text-xs font-mono font-bold px-2.5 py-1 rounded-lg border border-border hover:border-primary hover:bg-card active:scale-95 transition-all" data-api-unique-id='ordersummary-ra03b5a2a2d815088-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary' data-api-in-loop='1'>
                  <Sparkles className="w-3 h-3 text-accent" data-api-unique-id='ordersummary-r1390124e1f7f32b5-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary' data-api-in-loop='1' />
                  <span data-api-unique-id='ordersummary-rb86eed17762bc013-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary' data-api-in-loop='1' data-api-bind-info={`availablePromos-${index}-code`} data-api-map-var-name='p'>{p.code}</span>
                  <span className="text-[10px] text-muted-foreground" data-api-unique-id='ordersummary-r01484bb8622852fc-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary' data-api-in-loop='1'>
                    ({p.discountType === "PERCENT" ? `${p.discountValue}%` : `$${p.discountValue}`})
                  </span>
                </button>)}
            </div>
          </div>}
      </div>

      {/* Cost Breakdown Rows */}
      <div className="space-y-3 pt-3 border-t border-border text-sm" data-api-unique-id='ordersummary-r0ef605cdc1c491a3-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>
        <div className="flex items-center justify-between text-muted-foreground" data-api-unique-id='ordersummary-r57164008de047f3e-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>
          <span data-api-unique-id='ordersummary-rdccd8f43ef89118f-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>Items Subtotal</span>
          <span className="font-header font-bold text-foreground" data-api-unique-id='ordersummary-re7c4829570036c96-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>
            ${subtotal.toFixed(2)}
          </span>
        </div>

        {discountAmount > 0 && <div className="flex items-center justify-between text-success font-semibold" data-api-unique-id='ordersummary-r3e1bf6e3ff8d635a-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>
            <span className="flex items-center gap-1" data-api-unique-id='ordersummary-r47dc6dc5a0bab441-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>
              <Gift className="w-4 h-4" data-api-unique-id='ordersummary-r2dcf7afc12f5b954-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary' />
              <span data-api-unique-id='ordersummary-ree99a62bece0f624-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>Promo Discount {appliedPromo ? `(${appliedPromo.code})` : ""}</span>
            </span>
            <span className="font-header font-bold" data-api-unique-id='ordersummary-r525be21da6fe317e-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>
              -${discountAmount.toFixed(2)}
            </span>
          </div>}

        <div className="flex items-center justify-between text-muted-foreground" data-api-unique-id='ordersummary-r75e038aecd951f96-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>
          <span data-api-unique-id='ordersummary-rceac88bcd4580439-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>Estimated Shipping</span>
          {shippingFee === 0 ? <span className="font-header font-bold text-success uppercase text-xs tracking-wider bg-success/10 px-2 py-0.5 rounded-full" data-api-unique-id='ordersummary-r92e34970d18cb112-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>
              FREE
            </span> : <span className="font-header font-bold text-foreground" data-api-unique-id='ordersummary-rab9ea0011cc979dd-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>
              ${shippingFee.toFixed(2)}
            </span>}
        </div>

        {/* Total Row */}
        <div className="flex items-baseline justify-between pt-3 border-t border-border/50/10" data-api-unique-id='ordersummary-re26f51be6a3f01bb-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>
          <div data-api-unique-id='ordersummary-r38af4d3a25281950-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>
            <span className="font-header text-lg font-bold text-foreground block" data-api-unique-id='ordersummary-r2592bd73855d052a-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>
              Total Amount
            </span>
            <span className="text-[11px] text-muted-foreground" data-api-unique-id='ordersummary-r7e6487a097d00450-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>
              No hidden fees or extra surcharges
            </span>
          </div>
          <div className="text-right" data-api-unique-id='ordersummary-re8932c2e46c6b817-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>
            <span className="font-header text-3xl font-black text-primary tracking-tight" data-api-unique-id='ordersummary-r14cbee1cfbd15552-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>
              ${totalAmount.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Stock warning notice before CTA */}
      {hasStockIssue && <div className="bg-destructive/10 text-destructive text-xs font-bold p-3 rounded-xl border border-destructive/30 flex items-start gap-2" data-api-unique-id='ordersummary-re956590163eaf24a-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" data-api-unique-id='ordersummary-r22a7fa4f2f0c5611-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary' />
          <span data-api-unique-id='ordersummary-r5c6b8b0e1d452148-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>
            {invalidItemsCount} {invalidItemsCount === 1 ? "item has" : "items have"} stock or availability issues. Correct them in the list to enable checkout.
          </span>
        </div>}

      {/* Primary Checkout CTA Button */}
      <button type="button" onClick={onCompleteCheckout} disabled={!canCheckout} className="w-full bg-primary text-primary-foreground font-display font-extrabold text-lg sm:text-xl py-4 rounded-full border border-border/50 shadow-md hover:shadow-md disabled:opacity-50 disabled:pointer-events-none disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0 transition-all flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" data-api-unique-id='ordersummary-rce83260f2a596976-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>
        {isSubmitting ? <>
            <Loader2 className="w-6 h-6 animate-spin" data-api-unique-id='ordersummary-r0f744d3a2ccbd722-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary' />
            <span data-api-unique-id='ordersummary-r46fc792e2f3196bf-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>Processing Order...</span>
          </> : <>
            <Lock className="w-5 h-5" data-api-unique-id='ordersummary-rfb887e76498d63d7-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary' />
            <span data-api-unique-id='ordersummary-r43624d7b28efae91-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>Complete Toy Order</span>
            <ArrowRight className="w-5 h-5" data-api-unique-id='ordersummary-r4ed984329c9eed83-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary' />
          </>}
      </button>

      {/* Security & Snapshot Policy Guarantee */}
      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-1" data-api-unique-id='ordersummary-r79c2602e75245efe-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>
        <ShieldCheck className="w-4 h-4 text-success shrink-0" data-api-unique-id='ordersummary-r76246783e31acf95-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary' />
        <span data-api-unique-id='ordersummary-r42fa50eaab8de56b-s1121684325' data-api-unique-page-name='src/frontend/components/Checkout/OrderSummary'>Atomic immutable order snapshot guarantee</span>
      </div>
    </div>;
}