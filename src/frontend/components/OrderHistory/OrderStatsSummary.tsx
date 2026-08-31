"use client";

import React from "react";
import { Package, Sparkles, Tag } from "lucide-react";
import { SalesOrderSnapshot } from "@/frontend/types/OrderHistory";
interface OrderStatsSummaryProps {
  orders: SalesOrderSnapshot[];
}
export default function OrderStatsSummary({
  orders
}: OrderStatsSummaryProps) {
  const totalOrders = orders.length;
  const totalToysDelivered = orders.reduce((sum, ord) => sum + ord.itemCount, 0);
  const totalSavings = orders.reduce((sum, ord) => sum + ord.discountAmount, 0);
  if (totalOrders === 0) return null;
  return <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" data-api-unique-id='orderstatssummary-r96f28d1d99519740-s2195262627' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderStatsSummary'>
      {/* Stat 1 */}
      <div className="bg-card text-card-foreground rounded-2xl border border-border/50 p-4 sm:p-5 shadow-md flex items-center gap-4 transition-all" data-api-unique-id='orderstatssummary-r3ab3d17c0e55562c-s2195262627' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderStatsSummary'>
        <div className="h-12 w-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0 border border-border" data-api-unique-id='orderstatssummary-r74843d10c98410dc-s2195262627' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderStatsSummary'>
          <Package className="h-6 w-6" data-api-unique-id='orderstatssummary-rd2b4d07a0f570cd0-s2195262627' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderStatsSummary' />
        </div>
        <div className="min-w-0" data-api-unique-id='orderstatssummary-redace8ca6578e4da-s2195262627' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderStatsSummary'>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" data-api-unique-id='orderstatssummary-r488af5a8d04a0c31-s2195262627' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderStatsSummary'>
            Completed Parcels
          </p>
          <p className="text-2xl font-extrabold font-display tracking-tight mt-0.5" data-api-unique-id='orderstatssummary-r60576abf3316f087-s2195262627' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderStatsSummary'>
            {totalOrders} {totalOrders === 1 ? "Order" : "Orders"}
          </p>
        </div>
      </div>

      {/* Stat 2 */}
      <div className="bg-card text-card-foreground rounded-2xl border border-border/50 p-4 sm:p-5 shadow-md flex items-center gap-4 transition-all" data-api-unique-id='orderstatssummary-rb8c84dd0b3e63447-s2195262627' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderStatsSummary'>
        <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-border" data-api-unique-id='orderstatssummary-r398676267bf3fc01-s2195262627' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderStatsSummary'>
          <Sparkles className="h-6 w-6" data-api-unique-id='orderstatssummary-r75c949179b8d3a39-s2195262627' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderStatsSummary' />
        </div>
        <div className="min-w-0" data-api-unique-id='orderstatssummary-rd626aaa502b5946f-s2195262627' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderStatsSummary'>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" data-api-unique-id='orderstatssummary-r5ee6a2891c8d0cb2-s2195262627' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderStatsSummary'>
            Toy Treasures Delivered
          </p>
          <p className="text-2xl font-extrabold font-display tracking-tight mt-0.5" data-api-unique-id='orderstatssummary-r5ea699f5e603f682-s2195262627' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderStatsSummary'>
            {totalToysDelivered} {totalToysDelivered === 1 ? "Toy" : "Toys"}
          </p>
        </div>
      </div>

      {/* Stat 3 */}
      <div className="bg-card text-card-foreground rounded-2xl border border-border/50 p-4 sm:p-5 shadow-md flex items-center gap-4 transition-all" data-api-unique-id='orderstatssummary-r1b16546c219333c6-s2195262627' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderStatsSummary'>
        <div className="h-12 w-12 rounded-xl bg-success/10 text-success flex items-center justify-center shrink-0 border border-border" data-api-unique-id='orderstatssummary-rabee6783a2f90a89-s2195262627' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderStatsSummary'>
          <Tag className="h-6 w-6" data-api-unique-id='orderstatssummary-r15373229c610cb6f-s2195262627' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderStatsSummary' />
        </div>
        <div className="min-w-0" data-api-unique-id='orderstatssummary-r7f15837f4f301020-s2195262627' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderStatsSummary'>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" data-api-unique-id='orderstatssummary-r18d400457980a89b-s2195262627' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderStatsSummary'>
            Promotional Savings
          </p>
          <p className="text-2xl font-extrabold font-display tracking-tight mt-0.5" data-api-unique-id='orderstatssummary-r06d23e60a9006978-s2195262627' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderStatsSummary'>
            ${totalSavings.toFixed(2)}
          </p>
        </div>
      </div>
    </div>;
}