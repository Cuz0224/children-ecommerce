"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Layers, RefreshCw, FileText, History, PackageCheck } from "lucide-react";
import { OrderHistory } from "@/frontend/route-params";
export default function CheckoutGuarantee() {
  const router = useRouter();
  return <div data-controller-name="Checkout Guarantee" className="bg-card text-card-foreground rounded-2xl border border-border/50 p-6 sm:p-8 shadow-md space-y-6 min-w-0" data-api-unique-id='checkoutguarantee-re6afa87d5c68b374-s595547490' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutGuarantee'>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4" data-api-unique-id='checkoutguarantee-rb24e369c590bebaf-s595547490' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutGuarantee'>
        <div className="flex items-center gap-3" data-api-unique-id='checkoutguarantee-r6592ca34e4d98cb9-s595547490' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutGuarantee'>
          <div className="p-2.5 rounded-xl bg-success/10 border border-success/30 shrink-0" data-api-unique-id='checkoutguarantee-r26c8cd32e9e28f43-s595547490' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutGuarantee'>
            <ShieldCheck className="w-6 h-6 text-success" data-api-unique-id='checkoutguarantee-r6eafc84fd0548405-s595547490' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutGuarantee' />
          </div>
          <div data-api-unique-id='checkoutguarantee-ra6168921c4686eb0-s595547490' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutGuarantee'>
            <h3 className="font-header text-lg sm:text-xl font-bold text-foreground" data-api-unique-id='checkoutguarantee-r51fe85e5caf39942-s595547490' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutGuarantee'>
              ToyJoy Order Commitment &amp; Instant Snapshot
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground" data-api-unique-id='checkoutguarantee-r52b3cff0d16c3903-s595547490' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutGuarantee'>
              Clear, transparent simulated checkout mechanism and immutable records
            </p>
          </div>
        </div>

        {/* Link to Orders */}
        <button type="button" onClick={() => OrderHistory.navigateTo(router)} className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-primary hover:underline hover:translate-x-0.5 transition-all shrink-0 cursor-pointer text-left" data-api-unique-id='checkoutguarantee-rd066e0e6d8f99e85-s595547490' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutGuarantee'>
          <History className="w-4 h-4" data-api-unique-id='checkoutguarantee-r05d418e8e8d18e83-s595547490' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutGuarantee' />
          <span data-api-unique-id='checkoutguarantee-rfe23db5a9d5cd174-s595547490' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutGuarantee'>View Order History &rarr;</span>
        </button>
      </div>

      {/* 4 Pillars of the Checkout Snapshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-api-unique-id='checkoutguarantee-r02674e6db442ead9-s595547490' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutGuarantee'>
        {/* Pillar 1 */}
        <div className="bg-muted text-card-foreground rounded-xl border border-border p-4 space-y-2" data-api-unique-id='checkoutguarantee-r130648d3008bd0fd-s595547490' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutGuarantee'>
          <div className="flex items-center gap-2 text-primary font-bold text-sm" data-api-unique-id='checkoutguarantee-rc5d629bc3b5aedd9-s595547490' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutGuarantee'>
            <FileText className="w-4 h-4 shrink-0" data-api-unique-id='checkoutguarantee-r94b332aff0c2aad2-s595547490' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutGuarantee' />
            <span data-api-unique-id='checkoutguarantee-r045a10f7af0491c8-s595547490' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutGuarantee'>1. Immutable Order</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed" data-api-unique-id='checkoutguarantee-r9998108aa8cf7ab6-s595547490' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutGuarantee'>
            Instantly creates a permanent <strong className="text-foreground" data-api-unique-id='checkoutguarantee-r32afba96f947c7d7-s595547490' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutGuarantee'>COMPLETED</strong> sales order with locked subtotal, discounts, and applied promo code.
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="bg-muted text-card-foreground rounded-xl border border-border p-4 space-y-2" data-api-unique-id='checkoutguarantee-r5b485461c63c21e3-s595547490' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutGuarantee'>
          <div className="flex items-center gap-2 text-accent font-bold text-sm" data-api-unique-id='checkoutguarantee-rb5b4f5135547a60e-s595547490' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutGuarantee'>
            <Layers className="w-4 h-4 shrink-0" data-api-unique-id='checkoutguarantee-r77eb6fbd6d7395be-s595547490' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutGuarantee' />
            <span data-api-unique-id='checkoutguarantee-r13ba834d4ee2c456-s595547490' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutGuarantee'>2. Item Snapshots</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed" data-api-unique-id='checkoutguarantee-r93b44aec96bd2eb6-s595547490' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutGuarantee'>
            Preserves purchase unit price, SKU, line subtotal, and quantity in immutable order item records.
          </p>
        </div>

        {/* Pillar 3 */}
        <div className="bg-muted text-card-foreground rounded-xl border border-border p-4 space-y-2" data-api-unique-id='checkoutguarantee-rb18202dbc77ecd39-s595547490' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutGuarantee'>
          <div className="flex items-center gap-2 text-success font-bold text-sm" data-api-unique-id='checkoutguarantee-r86a56a3ee9d98826-s595547490' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutGuarantee'>
            <RefreshCw className="w-4 h-4 shrink-0" data-api-unique-id='checkoutguarantee-r6784a524daaf21a7-s595547490' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutGuarantee' />
            <span data-api-unique-id='checkoutguarantee-rd104ac8e66488aa5-s595547490' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutGuarantee'>3. Real-time Inventory</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed" data-api-unique-id='checkoutguarantee-r70f86be43fa016dd-s595547490' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutGuarantee'>
            Deducts the purchased quantities directly from warehouse stock count upon checkout validation.
          </p>
        </div>

        {/* Pillar 4 */}
        <div className="bg-muted text-card-foreground rounded-xl border border-border p-4 space-y-2" data-api-unique-id='checkoutguarantee-r1f31de6420f0da70-s595547490' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutGuarantee'>
          <div className="flex items-center gap-2 text-info font-bold text-sm" data-api-unique-id='checkoutguarantee-r4b20b35b652f00d6-s595547490' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutGuarantee'>
            <PackageCheck className="w-4 h-4 shrink-0" data-api-unique-id='checkoutguarantee-re618ee2befd4acae-s595547490' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutGuarantee' />
            <span data-api-unique-id='checkoutguarantee-r293ca5c85b76a819-s595547490' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutGuarantee'>4. Cart Lifecycle</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed" data-api-unique-id='checkoutguarantee-r2383c94599890cfd-s595547490' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutGuarantee'>
            Transitions active shopping cart status from <strong className="text-foreground" data-api-unique-id='checkoutguarantee-rbfd41570a8ea2f7e-s595547490' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutGuarantee'>ACTIVE</strong> to <strong className="text-foreground" data-api-unique-id='checkoutguarantee-r34ba2a28333d406c-s595547490' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutGuarantee'>CHECKED_OUT</strong> seamlessly.
          </p>
        </div>
      </div>
    </div>;
}