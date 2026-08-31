"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, History, Loader2 } from "lucide-react";
import { toast } from "sonner";
import CartItemList from "@/frontend/components/Checkout/CartItemList";
import OrderSummary from "@/frontend/components/Checkout/OrderSummary";
import CheckoutGuarantee from "@/frontend/components/Checkout/CheckoutGuarantee";
import CheckoutSuccessModal from "@/frontend/components/Checkout/CheckoutSuccessModal";
import EmptyCartState from "@/frontend/components/Checkout/EmptyCartState";
import { getCheckoutPageData, updateCartItemQuantity, removeCartItem, clearUnavailableCartItems, applyPromoCode, removePromoCode, completeCheckout } from "@/frontend/actions/Checkout";
import { CartItemDto, PromoCodeDto, SalesOrderDto, CheckoutCalculation } from "@/frontend/types/Checkout";
import { StorefrontHome, OrderHistory } from "@/frontend/route-params";
export default function CheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItemDto[]>([]);
  const [calculation, setCalculation] = useState<CheckoutCalculation | null>(null);
  const [availablePromos, setAvailablePromos] = useState<PromoCodeDto[]>([]);
  const [completedOrder, setCompletedOrder] = useState<SalesOrderDto | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        setLoading(true);
        const data = await getCheckoutPageData();
        if (!isMounted) return;
        if (data?.cart) {
          setCartItems(data.cart.items || []);
        } else {
          setCartItems([]);
        }
        setCalculation(data?.calculation || null);
        setAvailablePromos(data?.availablePromos || []);
      } catch (err: unknown) {
        if (!isMounted) return;
        const msg = err instanceof Error ? err.message : "Failed to load checkout cart";
        toast.error(msg);
        setCartItems([]);
        setCalculation(null);
        setAvailablePromos([]);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);
  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    try {
      const data = await updateCartItemQuantity(itemId, newQuantity);
      if (data?.cart) {
        setCartItems(data.cart.items || []);
      } else {
        setCartItems([]);
      }
      setCalculation(data?.calculation || null);
      setAvailablePromos(data?.availablePromos || []);
      toast.success("Cart item quantity updated.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update quantity";
      toast.error(msg);
    }
  };
  const handleRemoveItem = async (itemId: string) => {
    try {
      const data = await removeCartItem(itemId);
      if (data?.cart) {
        setCartItems(data.cart.items || []);
      } else {
        setCartItems([]);
      }
      setCalculation(data?.calculation || null);
      setAvailablePromos(data?.availablePromos || []);
      toast.info("Item removed from your cart.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to remove item";
      toast.error(msg);
    }
  };
  const handleClearUnavailable = async () => {
    try {
      const data = await clearUnavailableCartItems();
      if (data?.cart) {
        setCartItems(data.cart.items || []);
      } else {
        setCartItems([]);
      }
      setCalculation(data?.calculation || null);
      setAvailablePromos(data?.availablePromos || []);
      toast.success("Cart items adjusted to available live stock.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to adjust cart items";
      toast.error(msg);
    }
  };
  const handleApplyPromo = async (inputCode: string): Promise<boolean> => {
    try {
      const data = await applyPromoCode(inputCode);
      if (data?.cart) {
        setCartItems(data.cart.items || []);
      } else {
        setCartItems([]);
      }
      setCalculation(data?.calculation || null);
      setAvailablePromos(data?.availablePromos || []);
      toast.success("Promo code applied successfully!");
      return true;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : `Invalid promo code "${inputCode}".`;
      toast.error(msg);
      return false;
    }
  };
  const handleRemovePromo = async () => {
    try {
      const data = await removePromoCode();
      if (data?.cart) {
        setCartItems(data.cart.items || []);
      } else {
        setCartItems([]);
      }
      setCalculation(data?.calculation || null);
      setAvailablePromos(data?.availablePromos || []);
      toast.info("Promo code removed.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to remove promo code";
      toast.error(msg);
    }
  };
  const handleCompleteCheckout = async () => {
    if (calculation?.hasStockIssue) {
      toast.error("Please resolve stock or product availability issues before checkout.");
      return;
    }
    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    setIsSubmitting(true);
    try {
      const order = await completeCheckout();
      setCompletedOrder(order);
      setCartItems([]);
      setCalculation(null);
      setIsSuccessModalOpen(true);
      toast.success("Toy order placed successfully!", {
        description: `Order #${order.id.slice(-8).toUpperCase()} has been created and inventory updated.`
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to place order";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };
  const effectiveCalculation: CheckoutCalculation = calculation || {
    subtotal: 0,
    discountAmount: 0,
    shippingFee: 5.99,
    totalAmount: 0,
    freeShippingThreshold: 50.0,
    amountToFreeShipping: 50.0,
    isFreeShipping: false,
    hasStockIssue: false,
    invalidItemsCount: 0,
    appliedPromo: null
  };
  const totalItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  return <div className="w-full bg-background text-foreground min-h-screen">
      {/* Segment 1: Top Compact Breadcrumb & Title Bar */}
      <section className="w-full border-b border-border bg-card/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
                {/* Return link to Storefront */}
                <button type="button" onClick={() => StorefrontHome.navigateTo(router)} className="hover:text-primary transition-colors inline-flex items-center gap-1 cursor-pointer bg-transparent border-0 p-0 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Toy Storefront</span>
                </button>
                <span>/</span>
                <span className="text-foreground">Checkout Desk</span>
              </div>

              <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight">
                Review Toy Cart &amp; Checkout
              </h1>
            </div>

            {/* Quick Orders Link */}
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => OrderHistory.navigateTo(router)} className="inline-flex items-center gap-1.5 bg-secondary text-secondary-foreground text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-full border border-border/50 hover:bg-muted active:scale-[0.98] transition-all shadow-sm cursor-pointer">
                <History className="w-4 h-4 text-primary" />
                <span>My Past Orders</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dual-Column Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
        {loading ? <div className="flex flex-col items-center justify-center min-h-[360px] space-y-4">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <p className="text-sm font-medium text-muted-foreground">Loading checkout items...</p>
          </div> : cartItems.length === 0 && !completedOrder ? <EmptyCartState onContinueShopping={() => StorefrontHome.navigateTo(router)} /> : <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start min-w-0">
            {/* Left Column: Cart Item List */}
            <div className="xl:col-span-8 min-w-0 space-y-8">
              {cartItems.length > 0 ? <CartItemList items={cartItems} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveItem} onClearUnavailable={handleClearUnavailable} /> : <div className="bg-card text-card-foreground p-8 rounded-2xl border border-border/50 text-center shadow-md space-y-4">
                  <div className="w-16 h-16 rounded-full bg-success/10 border border-success/30 flex items-center justify-center mx-auto text-success">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-header text-xl font-bold text-foreground">
                    All items in this session have been checked out!
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Your previous order was recorded. You can start a new toy cart or review past orders.
                  </p>
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <button type="button" onClick={() => StorefrontHome.navigateTo(router)} className="bg-primary text-primary-foreground font-bold px-6 py-2.5 rounded-full border border-border/50 shadow-sm text-sm cursor-pointer">
                      Browse More Toys
                    </button>
                    <button type="button" onClick={() => OrderHistory.navigateTo(router)} className="bg-secondary text-secondary-foreground font-semibold px-5 py-2.5 rounded-full border border-border/50 text-sm cursor-pointer">
                      View Order History
                    </button>
                  </div>
                </div>}
            </div>

            {/* Right Column: Sticky Order Summary */}
            <aside className="xl:col-span-4 min-w-0 xl:sticky xl:top-24">
              <OrderSummary calculation={effectiveCalculation} availablePromos={availablePromos} onApplyPromo={handleApplyPromo} onRemovePromo={handleRemovePromo} onCompleteCheckout={handleCompleteCheckout} isSubmitting={isSubmitting} itemCount={totalItemCount} />
            </aside>
          </div>}

        {/* Bottom Assurance & Order Lifecycle Snapshot Commitment */}
        <section className="pt-4">
          <CheckoutGuarantee />
        </section>
      </main>

      {/* Simulated Checkout Success Dialog */}
      <CheckoutSuccessModal order={completedOrder} isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} />
    </div>;
}
