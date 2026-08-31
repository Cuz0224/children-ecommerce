"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Lock, Copy, Check, Tag, Receipt, ShoppingBag, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import { SalesOrderSnapshot } from "@/frontend/types/OrderHistory";
import OrderItemRow from "@/frontend/components/OrderHistory/OrderItemRow";
import OrderReceiptDialog from "@/frontend/components/OrderHistory/OrderReceiptDialog";
import { StorefrontHome } from "@/frontend/route-params";
interface OrderCardProps {
  order: SalesOrderSnapshot;
  isLatest?: boolean;
}
export default function OrderCard({
  order,
  isLatest = false
}: OrderCardProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const createdDate = order.createdAt instanceof Date ? order.createdAt : new Date(order.createdAt);
  const formattedDate = !isNaN(createdDate.getTime()) ? createdDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }) : "";
  const isoDate = !isNaN(createdDate.getTime()) ? createdDate.toISOString() : "";
  const handleCopyOrderId = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(order.orderNumber);
        setCopied(true);
        toast.success(`Copied order ${order.orderNumber} to clipboard!`);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      toast.info(`Order: ${order.orderNumber}`);
    }
  };
  const handleShopAgain = () => {
    StorefrontHome.navigateTo(router);
  };
  const visibleItems = isExpanded ? order.items : order.items.slice(0, 2);
  const hasMoreItems = order.items.length > 2;
  return <>
      <article className={`bg-card text-card-foreground rounded-2xl border border-border/50 p-5 sm:p-6 shadow-md transition-all space-y-6 ${isLatest ? "ring-2 ring-primary/40" : ""}`} data-api-unique-id='ordercard-r9fc8ab019d024199-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard'>
        {/* Card Top Strip: Order Identity, Date & Status Badges */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border" data-api-unique-id='ordercard-rc1c6a138dc6844a2-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard'>
          {/* Left: Order # & Date */}
          <div className="space-y-1.5 min-w-0" data-api-unique-id='ordercard-re48730800ff8ad4c-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard'>
            <div className="flex flex-wrap items-center gap-2.5" data-api-unique-id='ordercard-r8e38bbb30fe4c9b4-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard'>
              {isLatest && <span className="bg-primary text-primary-foreground font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm shrink-0" data-api-unique-id='ordercard-r464f79a456ec513a-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard'>
                  Latest Order
                </span>}
              <h3 className="font-display font-extrabold text-lg sm:text-xl text-card-foreground tracking-tight break-all" data-api-unique-id='ordercard-re6c30e0f13e1e2f8-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard'>
                {order.orderNumber}
              </h3>
              <button type="button" onClick={handleCopyOrderId} className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Copy order ID" title="Copy Order ID" data-api-unique-id='ordercard-rb89c8e468b99a0eb-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard'>
                {copied ? <Check className="h-3.5 w-3.5 text-success" data-api-unique-id='ordercard-r2b3587fa896c07aa-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard' /> : <Copy className="h-3.5 w-3.5" data-api-unique-id='ordercard-rc395c293e70b5bfe-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard' />}
              </button>
            </div>
            <p className="text-xs text-muted-foreground font-body" data-api-unique-id='ordercard-r52a556dc5d462a15-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard'>
              Purchased on <time dateTime={isoDate} data-api-unique-id='ordercard-r97091a278e402326-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard'>{formattedDate}</time>
            </p>
          </div>

          {/* Right: Completed Status & Snapshot Lock Badges */}
          <div className="flex flex-wrap items-center gap-2 shrink-0" data-api-unique-id='ordercard-r2da487ce0a3e0db4-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard'>
            {/* Snapshot Locked Pill */}
            <span className="bg-muted text-muted-foreground border border-border text-xs px-2.5 py-1 rounded-full inline-flex items-center gap-1.5 font-medium" title="Immutable snapshot: Values are locked at time of checkout." data-api-unique-id='ordercard-r6ad1154ce18b339e-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard'>
              <Lock className="h-3 w-3 text-accent" data-api-unique-id='ordercard-rc12ecc52fc279314-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard' />
              <span data-api-unique-id='ordercard-r69956d24a603a79e-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard'>Snapshot Locked</span>
            </span>

            {/* Completed Badge */}
            <span className="bg-success text-success-foreground font-bold text-xs px-3 py-1 rounded-full shadow-sm inline-flex items-center gap-1.5" data-api-unique-id='ordercard-r3ff00fac80400294-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard'>
              <CheckCircle2 className="h-3.5 w-3.5" data-api-unique-id='ordercard-r64c6c16023f0f0f5-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard' />
              <span data-api-unique-id='ordercard-r94b9360b860e28fe-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard'>COMPLETED</span>
            </span>
          </div>
        </div>

        {/* Order Items List */}
        <div className="space-y-1" data-api-unique-id='ordercard-re98a8c91dfdb64cc-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard'>
          <div className="flex items-center justify-between pb-1" data-api-unique-id='ordercard-r287cc2c007fbfbf6-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard'>
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground" data-api-unique-id='ordercard-r302be9dbdf81f1cf-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard'>
              Toy Package Contents ({order.itemCount} {order.itemCount === 1 ? "item" : "items"})
            </span>
            {hasMoreItems && <button type="button" onClick={() => setIsExpanded(!isExpanded)} className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded px-1" data-api-unique-id='ordercard-r1ff737d7abede784-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard'>
                <span data-api-unique-id='ordercard-r66e480beb9986cca-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard'>{isExpanded ? "Show Fewer" : `View All ${order.items.length} Items`}</span>
                {isExpanded ? <ChevronUp className="h-3.5 w-3.5" data-api-unique-id='ordercard-r9671eb4812ad81d0-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard' /> : <ChevronDown className="h-3.5 w-3.5" data-api-unique-id='ordercard-ra09bf7cb09449391-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard' />}
              </button>}
          </div>

          <div className="divide-y divide-border" data-api-unique-id='ordercard-r4cc079e9f5a10e57-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard'>
            {visibleItems.map((item, index) => <OrderItemRow key={item.id} item={item} isFirst={index === 0} data-api-unique-id='ordercard-r05ea9506243cad9d-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard' data-api-in-loop='1' />)}
          </div>
        </div>

        {/* Immutable Checkout Snapshot Summary Box */}
        <div className="bg-muted/40 rounded-xl border border-border/50 p-4 sm:p-5 space-y-4" data-api-unique-id='ordercard-r9e890c8dd405dbba-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard'>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4" data-api-unique-id='ordercard-r56648eeae954f843-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard'>
            {/* Left: Applied Promo Candy Badge & Microcopy */}
            <div className="space-y-2 min-w-0 flex-1" data-api-unique-id='ordercard-r702e743edc50080f-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard'>
              <div className="flex flex-wrap items-center gap-2" data-api-unique-id='ordercard-r792f58a63d3f8ceb-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard'>
                {order.appliedPromoCode ? <span className="bg-primary text-primary-foreground font-extrabold text-xs px-3 py-1 rounded-full shadow-sm inline-flex items-center gap-1.5" data-api-unique-id='ordercard-r8bff20d3a5e38481-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard'>
                    <Tag className="h-3 w-3" data-api-unique-id='ordercard-r4c595c278591523c-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard' />
                    <span data-api-unique-id='ordercard-r0afe15c1b3db3a60-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard'>Promo: {order.appliedPromoCode}</span>
                  </span> : <span className="text-xs text-muted-foreground italic" data-api-unique-id='ordercard-rf5c01cff45a744ff-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard'>
                    Standard checkout (no promo code applied)
                  </span>}
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed max-w-xl" data-api-unique-id='ordercard-r64c2e985f423f7bc-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard'>
                Snapshot values reflect checkout snapshot exactly; subsequent price updates or toy catalog changes do not alter these historical totals.
              </p>
            </div>

            {/* Right: Snapshot Financial Breakdown Grid */}
            <div className="w-full lg:w-72 bg-card text-card-foreground rounded-xl border border-border p-3.5 space-y-2 text-xs shrink-0" data-api-unique-id='ordercard-r9b8aff758956ba5d-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard'>
              <div className="flex justify-between text-muted-foreground" data-api-unique-id='ordercard-r61aa011500ede917-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard'>
                <span data-api-unique-id='ordercard-rc125007debaaa77f-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard'>Subtotal:</span>
                <span className="font-semibold text-card-foreground" data-api-unique-id='ordercard-r2cffd8bcc7c84c38-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard'>${order.subtotal.toFixed(2)}</span>
              </div>

              {order.discountAmount > 0 && <div className="flex justify-between text-success font-semibold" data-api-unique-id='ordercard-r2a4a8780a721a495-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard'>
                  <span data-api-unique-id='ordercard-rd0c0b9022cf472a0-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard'>Discount:</span>
                  <span data-api-unique-id='ordercard-rb903760ea6d6a170-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard'>-${order.discountAmount.toFixed(2)}</span>
                </div>}

              <div className="flex justify-between text-muted-foreground" data-api-unique-id='ordercard-rc0833fcfe1c0e114-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard'>
                <span data-api-unique-id='ordercard-r536e915ed2bee539-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard'>Shipping:</span>
                <span className="font-semibold text-card-foreground" data-api-unique-id='ordercard-r7afa465761b3ba6c-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard'>
                  {order.shippingFee === 0 ? "FREE" : `$${order.shippingFee.toFixed(2)}`}
                </span>
              </div>

              <div className="border-t border-border pt-2 flex items-baseline justify-between text-sm" data-api-unique-id='ordercard-rcaa1f7b0cd8eae78-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard'>
                <span className="font-bold text-card-foreground" data-api-unique-id='ordercard-r233f6be2beed5b11-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard'>Total Paid:</span>
                <span className="font-extrabold font-display text-xl text-primary" data-api-unique-id='ordercard-r567d88fe75c96076-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard'>
                  ${order.totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Card Actions Bottom Strip: Shop Again CTA & View Receipt */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2" data-api-unique-id='ordercard-r920d097e2a84a682-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard'>
          {/* Secondary Action: View Receipt Modal */}
          <button type="button" onClick={() => setIsReceiptOpen(true)} className="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground font-bold text-xs px-5 py-2.5 rounded-full border border-border/50 hover:bg-muted active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='ordercard-rcfdeabb2f6566bfe-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard'>
            <Receipt className="h-3.5 w-3.5" data-api-unique-id='ordercard-r4cf71603c20fc902-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard' />
            <span data-api-unique-id='ordercard-rae1c71b240b01686-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard'>View Receipt Slip</span>
          </button>

          {/* Primary Action: Shop Again [F01] */}
          <button type="button" onClick={handleShopAgain} className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold text-xs px-6 py-2.5 rounded-full border border-border/50 shadow-sm hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='ordercard-r048569dad1333c4e-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard'>
            <ShoppingBag className="h-3.5 w-3.5" data-api-unique-id='ordercard-r07c2197392210bd2-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard' />
            <span data-api-unique-id='ordercard-r95b96e3b23c75524-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard'>Shop Again</span>
          </button>
        </div>
      </article>

      {/* Printable / Viewable Receipt Dialog */}
      <OrderReceiptDialog order={order} isOpen={isReceiptOpen} onClose={() => setIsReceiptOpen(false)} data-api-unique-id='ordercard-r437ae2efef8f2410-s943216300' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderCard' />
    </>;
}