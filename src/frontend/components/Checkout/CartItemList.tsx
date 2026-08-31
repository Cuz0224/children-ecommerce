"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Trash2, Plus, Minus, AlertTriangle, CheckCircle2, XCircle, Package, Sparkles } from "lucide-react";
import EditableImg from "@/@base/EditableImg";
import { CartItem, ToyCategory } from "@/frontend/types/Checkout";
import { StorefrontHome } from "@/frontend/route-params";
interface CartItemListProps {
  items: CartItem[];
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearUnavailable: () => void;
}
const CATEGORY_LABELS: Record<ToyCategory, string> = {
  WOODEN_TOYS: "Wooden Toy",
  STEM_MAKER: "STEM Maker",
  INFANT_PLUSH: "Infant Plush",
  CREATIVE_BUILDING: "Building Set",
  PRETEND_PLAY: "Pretend Play",
  ART_CRAFT: "Art & Craft",
  LEARNING: "Learning Kit",
  OUTDOOR: "Outdoor Play",
  PLUSH: "Plush Friend"
};
export default function CartItemList({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearUnavailable
}: CartItemListProps) {
  const router = useRouter();
  const hasUnavailableItems = items.some(item => item.product.storefrontStatus !== "LIVE" || item.product.stockCount < item.quantity);
  return <div data-controller-name="Cart Items Review" className="space-y-6 min-w-0" data-api-unique-id='cartitemlist-rdf58aaf54883446d-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList'>
      {/* Header bar with total item count and batch fix alert */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-card text-card-foreground p-4 sm:p-5 rounded-2xl border border-border/50 shadow-sm" data-api-unique-id='cartitemlist-r18bad4b821c4a1d3-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList'>
        <div className="flex items-center gap-3 min-w-0" data-api-unique-id='cartitemlist-r28a8b886ceed692f-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList'>
          <div className="p-2.5 rounded-xl bg-muted border border-border shrink-0" data-api-unique-id='cartitemlist-rde68fca4141d85de-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList'>
            <Package className="w-5 h-5 text-primary" data-api-unique-id='cartitemlist-r0880adbcc5eac9e9-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' />
          </div>
          <div className="min-w-0" data-api-unique-id='cartitemlist-r9afd12d34f64fc9c-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList'>
            <h2 className="font-header text-lg sm:text-xl font-bold text-foreground" data-api-unique-id='cartitemlist-r8727c8cd7f729b32-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList'>
              Toy Package Review
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground" data-api-unique-id='cartitemlist-r848425d79496935b-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList'>
              {items.length} {items.length === 1 ? "toy" : "toys"} ready in your active cart
            </p>
          </div>
        </div>

        {hasUnavailableItems && <button type="button" onClick={onClearUnavailable} className="inline-flex items-center justify-center gap-1.5 bg-destructive/10 text-destructive text-xs sm:text-sm font-bold px-4 py-2 rounded-full border border-destructive/30 hover:bg-destructive hover:text-destructive-foreground active:scale-[0.98] transition-all shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='cartitemlist-re5d34e2bb670c390-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList'>
            <AlertTriangle className="w-4 h-4" data-api-unique-id='cartitemlist-r9fa8605b56a55d73-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' />
            <span data-api-unique-id='cartitemlist-r2935b70f1b28b34c-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList'>Fix Ineligible Items</span>
          </button>}
      </div>

      {/* Global Ineligibility Warning Banner if applicable */}
      {hasUnavailableItems && <div className="bg-destructive/10 text-card-foreground border border-destructive rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 shadow-sm" data-api-unique-id='cartitemlist-r0bcb64e9926d8c11-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList'>
          <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" data-api-unique-id='cartitemlist-r5e0ba53ab0b2b8fd-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' />
          <div className="min-w-0 flex-1 space-y-1" data-api-unique-id='cartitemlist-r1ff235416c71c96f-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList'>
            <h3 className="font-bold text-sm sm:text-base text-destructive" data-api-unique-id='cartitemlist-rcabb7876af0911e1-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList'>
              Checkout Action Needed
            </h3>
            <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed" data-api-unique-id='cartitemlist-ra96e592afbf788b2-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList'>
              Every toy must be currently <strong className="text-foreground font-semibold" data-api-unique-id='cartitemlist-r32258b3024610ce0-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList'>LIVE</strong> on the storefront and have adequate stock count before checkout can complete. Please adjust quantities or remove unavailable items below.
            </p>
          </div>
        </div>}

      {/* List of Cart Items */}
      <div className="space-y-4 min-w-0" data-api-unique-id='cartitemlist-rb495013fc753c9a5-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList'>
        {items.map((item, index) => {
        const product = item.product;
        const isLive = product.storefrontStatus === "LIVE";
        const hasSufficientStock = isLive && product.stockCount >= item.quantity;
        const isStockShortage = isLive && product.stockCount < item.quantity && product.stockCount > 0;
        const isOutOfStock = isLive && product.stockCount <= 0;
        const isArchived = !isLive;
        const lineSubtotal = item.quantity * product.unitPrice;
        return <article key={item.id} className={`bg-card text-card-foreground rounded-2xl border p-4 sm:p-6 transition-all min-w-0 ${!hasSufficientStock ? "border-destructive bg-card/95 shadow-md" : "border-border shadow-md hover:border-border"}`} data-api-unique-id='cartitemlist-r3afc008fb7b34f2c-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1'>
              <div className="flex flex-col md:flex-row gap-4 sm:gap-6 min-w-0" data-api-unique-id='cartitemlist-r06f54ea8e867042d-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1'>
                {/* Product Image */}
                <div className="relative w-full md:w-36 h-36 sm:h-40 md:h-36 rounded-xl border border-border/50 overflow-hidden bg-muted shrink-0" data-api-unique-id='cartitemlist-r8612e35c3c0f497e-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1'>
                  <EditableImg propKey={`toy-checkout-${product.id}`} src={product.productImage || undefined} alt={product.name} className="w-full h-full object-cover" data-api-unique-id='cartitemlist-r2b629acb0138162f-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1' />

                  {/* Top Badge: Sale / Exclusive / Featured */}
                  {product.badge && <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm tracking-wider uppercase" data-api-unique-id='cartitemlist-refbee74be55b1195-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1'>
                      {product.badge}
                    </div>}

                  {/* Eligibility Corner Indicator */}
                  <div className="absolute bottom-2 right-2" data-api-unique-id='cartitemlist-rcde0923d7ba980c9-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1'>
                    {hasSufficientStock ? <span className="inline-flex items-center gap-1 bg-success text-success-foreground text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm" data-api-unique-id='cartitemlist-rdc625863e7ee65c9-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1'>
                        <CheckCircle2 className="w-3 h-3" data-api-unique-id='cartitemlist-re14200295cb77f8f-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1' />
                        <span data-api-unique-id='cartitemlist-raec650d6b926d196-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1'>Ready</span>
                      </span> : <span className="inline-flex items-center gap-1 bg-destructive text-destructive-foreground text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm" data-api-unique-id='cartitemlist-re0d1132fc609973e-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1'>
                        <XCircle className="w-3 h-3" data-api-unique-id='cartitemlist-rbce81a34b43e55fa-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1' />
                        <span data-api-unique-id='cartitemlist-r910da18601798901-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1'>Fix Item</span>
                      </span>}
                  </div>
                </div>

                {/* Main Product Info & Controls */}
                <div className="flex-1 min-w-0 flex flex-col justify-between gap-4" data-api-unique-id='cartitemlist-r8086d57367ad5c6a-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1'>
                  {/* Title & Metadata */}
                  <div className="space-y-1.5 min-w-0" data-api-unique-id='cartitemlist-r9c8c6bff84818998-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1'>
                    <div className="flex flex-wrap items-center gap-2" data-api-unique-id='cartitemlist-r64c40ea1d52c0ae2-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1'>
                      <span className="bg-secondary text-secondary-foreground text-xs font-bold px-2.5 py-0.5 rounded-full border border-border" data-api-unique-id='cartitemlist-r0da6ca62cea3cc25-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1'>
                        {CATEGORY_LABELS[product.category] || product.category}
                      </span>
                      <span className="text-xs text-muted-foreground font-mono" data-api-unique-id='cartitemlist-rcc5b4c968621b32c-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1'>
                        SKU: {product.sku}
                      </span>
                    </div>

                    <h3 className="font-header text-base sm:text-lg font-bold text-foreground min-w-0 break-words line-clamp-2" data-api-unique-id='cartitemlist-rce6753322521188f-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1'>
                      {product.name}
                    </h3>

                    {product.subtitle && <p className="text-xs sm:text-sm text-muted-foreground min-w-0 break-words line-clamp-1" data-api-unique-id='cartitemlist-rdb7a205603d97ab8-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1'>
                        {product.subtitle}
                      </p>}
                  </div>

                  {/* Stock Status Badge & Guidance */}
                  <div className="min-w-0" data-api-unique-id='cartitemlist-r1fa039c8b574e827-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1'>
                    {hasSufficientStock ? <div className="inline-flex items-center gap-1.5 text-xs text-success font-semibold" data-api-unique-id='cartitemlist-r03cbbfcf2b3b9fef-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1'>
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" data-api-unique-id='cartitemlist-r196bbb0bcb0ff1fb-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1' />
                        <span data-api-unique-id='cartitemlist-r97d59e44949f38c8-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1'>In Stock ({product.stockCount} units available for dispatch)</span>
                      </div> : isStockShortage ? <div className="bg-destructive/10 text-card-foreground border border-destructive/30 rounded-xl p-2.5 flex flex-wrap items-center justify-between gap-2" data-api-unique-id='cartitemlist-rc41973dfc0875f38-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1'>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-destructive" data-api-unique-id='cartitemlist-r77344ce1b0f01c42-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1'>
                          <AlertTriangle className="w-4 h-4 shrink-0" data-api-unique-id='cartitemlist-rcd4dec2b9933a68d-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1' />
                          <span data-api-unique-id='cartitemlist-r82bba6d43108a9d1-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1' data-api-bind-info={`items-${index}-quantity`} data-api-map-var-name='item'>Short on stock: only {product.stockCount} available (requested {item.quantity})</span>
                        </div>
                        <button type="button" onClick={() => onUpdateQuantity(item.id, product.stockCount)} className="text-xs font-bold bg-destructive text-destructive-foreground px-2.5 py-1 rounded-full hover:brightness-110 active:scale-95 transition-all shadow-sm" data-api-unique-id='cartitemlist-r177e65c701a9e3f3-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1'>
                          Adjust to {product.stockCount}
                        </button>
                      </div> : isOutOfStock ? <div className="bg-destructive/10 text-card-foreground border border-destructive/30 rounded-xl p-2.5 flex flex-wrap items-center justify-between gap-2" data-api-unique-id='cartitemlist-r22ada5899eb8e950-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1'>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-destructive" data-api-unique-id='cartitemlist-r36b7f4d08673244b-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1'>
                          <XCircle className="w-4 h-4 shrink-0" data-api-unique-id='cartitemlist-r4cfd33511bd5590d-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1' />
                          <span data-api-unique-id='cartitemlist-r3530dcb91784387f-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1'>Sold out ({product.stockCount} in warehouse). Cannot checkout.</span>
                        </div>
                        <button type="button" onClick={() => onRemoveItem(item.id)} className="text-xs font-bold bg-destructive text-destructive-foreground px-2.5 py-1 rounded-full hover:brightness-110 active:scale-95 transition-all shadow-sm" data-api-unique-id='cartitemlist-ra81653c23a58622b-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1'>
                          Remove from Cart
                        </button>
                      </div> : isArchived ? <div className="bg-destructive/10 text-card-foreground border border-destructive/30 rounded-xl p-2.5 flex flex-wrap items-center justify-between gap-2" data-api-unique-id='cartitemlist-rd893adbaf5f119c7-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1'>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-destructive" data-api-unique-id='cartitemlist-rd6da8f2322251531-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1'>
                          <AlertTriangle className="w-4 h-4 shrink-0" data-api-unique-id='cartitemlist-r467013bb2a041cac-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1' />
                          <span data-api-unique-id='cartitemlist-r66d25db92dbe84dd-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1'>Product status: {product.storefrontStatus} (Archived/Hidden from shop)</span>
                        </div>
                        <button type="button" onClick={() => onRemoveItem(item.id)} className="text-xs font-bold bg-destructive text-destructive-foreground px-2.5 py-1 rounded-full hover:brightness-110 active:scale-95 transition-all shadow-sm" data-api-unique-id='cartitemlist-r892351f1656b940f-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1'>
                          Remove Item
                        </button>
                      </div> : null}
                  </div>

                  {/* Pricing, Quantity Stepper, and Subtotal Row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border/80" data-api-unique-id='cartitemlist-r8f8bfb80b08c6d91-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1'>
                    {/* Unit Price */}
                    <div className="flex items-baseline gap-2 min-w-0" data-api-unique-id='cartitemlist-r8860f585d5e67b38-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1'>
                      <span className="font-header text-lg sm:text-xl font-extrabold text-foreground" data-api-unique-id='cartitemlist-rb0ffd73900588abd-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1'>
                        ${product.unitPrice.toFixed(2)}
                      </span>
                      {product.originalPrice && product.originalPrice > product.unitPrice && <span className="text-xs sm:text-sm text-muted-foreground line-through" data-api-unique-id='cartitemlist-r083ee806985937a0-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1'>
                          ${product.originalPrice.toFixed(2)}
                        </span>}
                      <span className="text-xs text-muted-foreground" data-api-unique-id='cartitemlist-rc0fc43f9c7502aa5-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1'>/ item</span>
                    </div>

                    {/* Quantity Stepper & Remove */}
                    <div className="flex items-center gap-3" data-api-unique-id='cartitemlist-r54f9bb4a5c6f0836-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1'>
                      <div className="flex items-center bg-secondary text-secondary-foreground rounded-full border border-border/50 p-1 shadow-sm" data-api-unique-id='cartitemlist-rc85641ceac843d4c-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1'>
                        <button type="button" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1} className="w-8 h-8 rounded-full bg-card flex items-center justify-center text-foreground hover:bg-muted active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Decrease quantity" data-api-unique-id='cartitemlist-r33a45070312b485f-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1'>
                          <Minus className="w-3.5 h-3.5" data-api-unique-id='cartitemlist-rd4293ac724cb035e-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1' />
                        </button>

                        <span className="w-9 text-center font-header font-bold text-sm sm:text-base text-foreground" data-api-unique-id='cartitemlist-r2c3b9b793a73190e-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1' data-api-bind-info={`items-${index}-quantity`} data-api-map-var-name='item'>
                          {item.quantity}
                        </span>

                        <button type="button" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} disabled={!isLive || item.quantity >= product.stockCount} className="w-8 h-8 rounded-full bg-card flex items-center justify-center text-foreground hover:bg-muted active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Increase quantity" data-api-unique-id='cartitemlist-rc2c2dd9636ad19c0-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1'>
                          <Plus className="w-3.5 h-3.5" data-api-unique-id='cartitemlist-rf3949df364b5bafc-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1' />
                        </button>
                      </div>

                      <button type="button" onClick={() => onRemoveItem(item.id)} className="p-2.5 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label={`Remove ${product.name} from cart`} title="Remove item" data-api-unique-id='cartitemlist-re781fca7ad41e408-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1'>
                        <Trash2 className="w-4 h-4" data-api-unique-id='cartitemlist-rf4c892874ba7ddea-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1' />
                      </button>
                    </div>

                    {/* Line Subtotal */}
                    <div className="w-full sm:w-auto text-right sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0" data-api-unique-id='cartitemlist-r25c403d68253a602-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1'>
                      <span className="text-xs text-muted-foreground block" data-api-unique-id='cartitemlist-r9feb3c5ab308e2be-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1'>Line Total</span>
                      <span className="font-header text-lg sm:text-xl font-extrabold text-primary" data-api-unique-id='cartitemlist-rfd8e6dfa0ad6ad56-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' data-api-in-loop='1'>
                        ${lineSubtotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </article>;
      })}
      </div>

      {/* Continue shopping link */}
      <div className="pt-2" data-api-unique-id='cartitemlist-r708842c50b1a4bca-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList'>
        <button type="button" onClick={() => StorefrontHome.navigateTo(router)} className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline hover:translate-x-1 transition-all" data-api-unique-id='cartitemlist-r98ed7262dfb1b143-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList'>
          <Sparkles className="w-4 h-4" data-api-unique-id='cartitemlist-r5556951b4cf1b70f-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList' />
          <span data-api-unique-id='cartitemlist-rd024bd9351bf8092-s3084834931' data-api-unique-page-name='src/frontend/components/Checkout/CartItemList'>Need more toys? Continue browsing catalog &rarr;</span>
        </button>
      </div>
    </div>;
}