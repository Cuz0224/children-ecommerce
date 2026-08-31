"use client";

import React, { useState } from "react";
import { ToyProduct, UserRole, CATEGORY_LABELS } from "@/frontend/types/ProductDetail";
import { ShoppingBag, Plus, Minus, Truck, ShieldCheck, RotateCcw, Sparkles, Lock, Heart } from "lucide-react";
import { toast } from "sonner";
interface TradeConsoleProps {
  product: ToyProduct;
  currentUserRole: UserRole;
  onAddToCart: (product: ToyProduct, quantity: number) => void;
  onGuestPrompt: () => void;
}
export default function TradeConsole({
  product,
  currentUserRole,
  onAddToCart,
  onGuestPrompt
}: TradeConsoleProps) {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const isLive = product.storefrontStatus === "LIVE";
  const hasStock = product.stockCount > 0;
  const isLowStock = hasStock && product.stockCount <= product.reorderThreshold;
  const originalPrice = product.originalPrice;
  const savings = originalPrice && originalPrice > product.unitPrice ? originalPrice - product.unitPrice : 0;
  const savingsPercent = originalPrice && originalPrice > product.unitPrice ? Math.round((originalPrice - product.unitPrice) / originalPrice * 100) : 0;
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  const handleIncrease = () => {
    if (quantity < product.stockCount) {
      setQuantity(prev => prev + 1);
    } else {
      toast.info(`Only ${product.stockCount} units available in stock.`);
    }
  };
  const handleAddToCart = () => {
    if (!isLive || !hasStock) {
      toast.error("This product is currently unavailable for purchase.");
      return;
    }
    if (currentUserRole === "GUEST") {
      onGuestPrompt();
      return;
    }
    setIsAdding(true);
    try {
      onAddToCart(product, quantity);
      toast.success(`Added ${quantity}x "${product.name}" to your Toy Chest!`, {
        description: "Your active cart snapshot has been updated below.",
        icon: <Sparkles className="h-4 w-4 text-primary" data-api-unique-id='tradeconsole-re31760486788d36b-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole' />
      });
    } catch {
      toast.error("Failed to add product to Toy Chest.");
    } finally {
      setIsAdding(false);
    }
  };
  return <div className="flex flex-col gap-6 w-full" data-api-unique-id='tradeconsole-rbdc4538744d3ed0a-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole'>
      {/* Product Header & Main Headline */}
      <div className="space-y-3" data-api-unique-id='tradeconsole-r87726f3b75382c6d-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole'>
        {/* Category breadcrumb pill & SKU */}
        <div className="flex flex-wrap items-center justify-between gap-2" data-api-unique-id='tradeconsole-rad6c548e3173a73b-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole'>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary text-secondary-foreground px-3 py-1 text-xs font-bold border border-border" data-api-unique-id='tradeconsole-r76c79c21df70dea3-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole'>
            {CATEGORY_LABELS[product.category] || product.category}
          </span>
          <span className="text-xs font-mono font-medium text-muted-foreground" data-api-unique-id='tradeconsole-r32c062fea454929c-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole'>
            SKU: {product.sku}
          </span>
        </div>

        {/* Catchy H1 Hero Title from Brief */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground font-display leading-tight" data-api-unique-id='tradeconsole-r4db1f2f29479e0d7-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole'>
          {product.name}
        </h1>

        {/* Product Subtitle */}
        {product.subtitle && <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-body" data-api-unique-id='tradeconsole-r6085e590c0c16688-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole'>
            {product.subtitle}
          </p>}
      </div>

      {/* Pricing & Stock Card */}
      <div className="rounded-2xl border border-border/50 bg-card text-card-foreground p-5 sm:p-6 shadow-md space-y-4" data-api-unique-id='tradeconsole-rc2096fd741f6ff0e-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole'>
        {/* Price Row */}
        <div className="flex flex-wrap items-baseline gap-3" data-api-unique-id='tradeconsole-re5386c59c16ebff6-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole'>
          <span className="text-3xl sm:text-4xl font-black text-foreground font-display tracking-tight" data-api-unique-id='tradeconsole-rb4933216282ba0da-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole'>
            ${product.unitPrice.toFixed(2)}
          </span>
          {originalPrice && originalPrice > product.unitPrice && <>
              <span className="text-lg sm:text-xl font-medium text-muted-foreground line-through" data-api-unique-id='tradeconsole-rf5f85b02de3d0b41-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole'>
                ${originalPrice.toFixed(2)}
              </span>
              <span className="inline-flex items-center rounded-full bg-primary text-primary-foreground text-xs font-extrabold px-2.5 py-0.5 shadow-sm" data-api-unique-id='tradeconsole-r36f6a15dc250d3ba-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole'>
                Save ${savings.toFixed(2)} ({savingsPercent}% OFF)
              </span>
            </>}
        </div>

        {/* Live Inventory Status Bar */}
        <div className="space-y-1.5 pt-1 border-t border-border/60" data-api-unique-id='tradeconsole-rba18fabdcf9a7e4b-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole'>
          <div className="flex items-center justify-between text-xs font-bold" data-api-unique-id='tradeconsole-r8e637f1d84354c34-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole'>
            <span className="flex items-center gap-1.5" data-api-unique-id='tradeconsole-r21e6ee0d90a5032b-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole'>
              {hasStock ? <>
                  <span className={`h-2.5 w-2.5 rounded-full ${isLowStock ? "bg-warning animate-pulse" : "bg-success"}`} data-api-unique-id='tradeconsole-ra043d1fe1d0e2e81-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole' />
                  <span className={isLowStock ? "text-warning" : "text-success"} data-api-unique-id='tradeconsole-r3949e22aaabcf231-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole'>
                    {isLowStock ? `Only ${product.stockCount} Left - High Demand!` : `In Stock (${product.stockCount} Ready to Ship)`}
                  </span>
                </> : <>
                  <span className="h-2.5 w-2.5 rounded-full bg-destructive" data-api-unique-id='tradeconsole-redd5562bb83a7276-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole' />
                  <span className="text-destructive" data-api-unique-id='tradeconsole-r4cec45685da6ce22-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole'>Currently Sold Out</span>
                </>}
            </span>
            <span className="text-muted-foreground font-medium" data-api-unique-id='tradeconsole-r421932b066c0ea59-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole'>
              Ships next business day
            </span>
          </div>

          {/* Micro Progress Bar for Stock visual */}
          {hasStock && <div className="h-2 w-full rounded-full bg-muted overflow-hidden border border-border/50" data-api-unique-id='tradeconsole-r85104feac6b7cb25-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole'>
              <div className={`h-full rounded-full transition-all duration-500 ${isLowStock ? "bg-warning" : "bg-success"}`} style={{
            width: `${Math.min(100, Math.max(12, product.stockCount / 30 * 100))}%`
          }} data-api-unique-id='tradeconsole-r5b79c2ee59184fba-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole' />
            </div>}
        </div>

        {/* Interactive Quantity & Primary Add to Toy Chest Action */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3" data-api-unique-id='tradeconsole-r541f21110a0e8d9c-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole'>
          {/* Wooden Block Style Stepper */}
          <div className="flex items-center justify-between sm:justify-center rounded-full border border-border/50 bg-muted p-1 shadow-sm" data-api-unique-id='tradeconsole-r0fa4957260650b42-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole'>
            <button type="button" onClick={handleDecrease} disabled={quantity <= 1 || !hasStock} className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-card-foreground border border-border/50 font-bold text-lg shadow-sm hover:bg-secondary disabled:opacity-40 disabled:pointer-events-none transition-all" aria-label="Decrease quantity" data-api-unique-id='tradeconsole-r5b2b75b8a3b3718c-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole'>
              <Minus className="h-4 w-4" data-api-unique-id='tradeconsole-r37c5a7f1f0a4f2d3-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole' />
            </button>
            <span className="w-12 text-center text-base font-extrabold text-foreground font-mono" data-api-unique-id='tradeconsole-r896052f281090488-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole'>
              {quantity}
            </span>
            <button type="button" onClick={handleIncrease} disabled={quantity >= product.stockCount || !hasStock} className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-card-foreground border border-border/50 font-bold text-lg shadow-sm hover:bg-secondary disabled:opacity-40 disabled:pointer-events-none transition-all" aria-label="Increase quantity" data-api-unique-id='tradeconsole-r072cf2a22a7a60d1-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole'>
              <Plus className="h-4 w-4" data-api-unique-id='tradeconsole-r50020eedab193073-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole' />
            </button>
          </div>

          {/* Primary Action Button */}
          <button type="button" onClick={handleAddToCart} disabled={!hasStock || isAdding || !isLive} className="flex-1 inline-flex items-center justify-center gap-2.5 rounded-full bg-primary text-primary-foreground font-extrabold text-base px-6 py-3.5 border border-border/50 shadow-md hover:shadow-md disabled:opacity-50 disabled:pointer-events-none transition-all" data-api-unique-id='tradeconsole-r1f0673f8910dbb65-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole'>
            <ShoppingBag className="h-5 w-5" data-api-unique-id='tradeconsole-ree6ef523f180db9e-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole' />
            <span data-api-unique-id='tradeconsole-r323a4e77c23a1545-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole'>
              {isAdding ? "Placing in Toy Chest..." : !hasStock ? "Sold Out" : `Add ${quantity} to Toy Chest`}
            </span>
          </button>

          {/* Wishlist Button */}
          <button type="button" onClick={() => {
          setIsFavorite(!isFavorite);
          toast(isFavorite ? "Removed from Wishlist" : "Saved to Wishlist!");
        }} className={`hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border/50 bg-card shadow-sm hover:bg-secondary transition-all ${isFavorite ? "text-primary fill-primary border-primary" : "text-muted-foreground"}`} aria-label="Save to wishlist" data-api-unique-id='tradeconsole-r65d585962f394c01-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole'>
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-primary text-primary" : ""}`} data-api-unique-id='tradeconsole-r5f1fc5db84164381-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole' />
          </button>
        </div>

        {/* Guest Warning / Notice Hint */}
        {currentUserRole === "GUEST" && <div className="rounded-xl border border-border bg-muted/80 p-3 text-xs text-muted-foreground flex items-start gap-2" data-api-unique-id='tradeconsole-rd49d2c1425c8dda8-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole'>
            <Lock className="h-4 w-4 text-accent shrink-0 mt-0.5" data-api-unique-id='tradeconsole-r12853de5cec0ec7c-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole' />
            <div data-api-unique-id='tradeconsole-rd82e15a5500129f8-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole'>
              <span className="font-bold text-foreground" data-api-unique-id='tradeconsole-ra05981290e2a932a-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole'>Guest Browsing Mode: </span>
              Clicking &ldquo;Add to Toy Chest&rdquo; will prompt you to sign in so your selections sync across all devices.
            </div>
          </div>}
      </div>

      {/* Confidence & Delivery Guarantees */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" data-api-unique-id='tradeconsole-r9d5cc4c8a9adad9a-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole'>
        <div className="flex items-center gap-2.5 rounded-xl border border-border bg-card p-3 text-card-foreground shadow-sm" data-api-unique-id='tradeconsole-r7fdf6bd3af94e6ef-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole'>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground" data-api-unique-id='tradeconsole-rc6bdb5060f3aa330-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole'>
            <Truck className="h-4 w-4" data-api-unique-id='tradeconsole-r16b3e466ec169fd5-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole' />
          </div>
          <div className="min-w-0" data-api-unique-id='tradeconsole-r2b8e00d73b206395-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole'>
            <p className="text-xs font-bold text-foreground" data-api-unique-id='tradeconsole-rfd23ead3437c8dd1-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole'>Free Shipping</p>
            <p className="text-[11px] text-muted-foreground truncate" data-api-unique-id='tradeconsole-ree682b6433837c1d-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole'>Orders over $50</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 rounded-xl border border-border bg-card p-3 text-card-foreground shadow-sm" data-api-unique-id='tradeconsole-rb66ae52e2fbd8125-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole'>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-success text-success-foreground" data-api-unique-id='tradeconsole-r36ad546ce2a08588-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole'>
            <ShieldCheck className="h-4 w-4" data-api-unique-id='tradeconsole-rbf85e66fd3a0875b-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole' />
          </div>
          <div className="min-w-0" data-api-unique-id='tradeconsole-r134a924edc2fa777-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole'>
            <p className="text-xs font-bold text-foreground" data-api-unique-id='tradeconsole-ra7197499f95bb4f4-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole'>Safety Verified</p>
            <p className="text-[11px] text-muted-foreground truncate" data-api-unique-id='tradeconsole-rb56791af3ad6a53e-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole'>CE & ASTM F963</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 rounded-xl border border-border bg-card p-3 text-card-foreground shadow-sm" data-api-unique-id='tradeconsole-r840c9cc59006f34a-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole'>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground" data-api-unique-id='tradeconsole-ra5df40e69eea0897-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole'>
            <RotateCcw className="h-4 w-4" data-api-unique-id='tradeconsole-r519d0fa87dc2d0d1-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole' />
          </div>
          <div className="min-w-0" data-api-unique-id='tradeconsole-rc42bb7b0f8344546-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole'>
            <p className="text-xs font-bold text-foreground" data-api-unique-id='tradeconsole-rbbf8d95119abe3d7-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole'>30-Day Returns</p>
            <p className="text-[11px] text-muted-foreground truncate" data-api-unique-id='tradeconsole-re7b0bf641791ffe0-s1837612379' data-api-unique-page-name='src/frontend/components/ProductDetail/TradeConsole'>Play & Smile Guarantee</p>
          </div>
        </div>
      </div>
    </div>;
}