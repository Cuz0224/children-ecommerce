"use client";

import React, { useState, useEffect, useMemo } from "react";
import { SalesOrderSnapshot, OrderFilterState } from "@/frontend/types/OrderHistory";
import { getCustomerOrderHistory } from "@/frontend/actions/OrderHistory";
import { useUserSession } from "@/tools/FrontendSession";
import OrderHistoryHeader from "@/frontend/components/OrderHistory/OrderHistoryHeader";
import OrderStatsSummary from "@/frontend/components/OrderHistory/OrderStatsSummary";
import OrderCard from "@/frontend/components/OrderHistory/OrderCard";
import OrderEmptyState from "@/frontend/components/OrderHistory/OrderEmptyState";
export default function OrderHistoryPage() {
  const {
    user_id
  } = useUserSession();
  const [orders, setOrders] = useState<SalesOrderSnapshot[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterState, setFilterState] = useState<OrderFilterState>({
    searchQuery: "",
    yearFilter: "ALL",
    hasPromoOnly: false
  });
  useEffect(() => {
    let isMounted = true;
    async function loadOrders() {
      setLoading(true);
      try {
        const result = await getCustomerOrderHistory();
        if (isMounted) {
          if (Array.isArray(result)) {
            setOrders(result);
          } else {
            setOrders([]);
          }
        }
      } catch (err) {
        console.error("Failed to load order history:", err);
        if (isMounted) {
          setOrders([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    loadOrders();
    return () => {
      isMounted = false;
    };
  }, [user_id]);

  // Extract all unique years from orders
  const availableYears = useMemo(() => {
    const years = new Set<string>();
    orders.forEach(ord => {
      const dateObj = ord.createdAt instanceof Date ? ord.createdAt : new Date(ord.createdAt);
      if (!isNaN(dateObj.getTime())) {
        years.add(dateObj.getFullYear().toString());
      }
    });
    return Array.from(years).sort((a, b) => Number(b) - Number(a));
  }, [orders]);

  // Filtered orders list (newest first)
  const filteredOrders = useMemo(() => {
    return orders.filter(ord => {
      // Search query
      if (filterState.searchQuery.trim()) {
        const q = filterState.searchQuery.toLowerCase();
        const matchOrderNumber = ord.orderNumber.toLowerCase().includes(q);
        const matchPromo = ord.appliedPromoCode?.toLowerCase().includes(q) || false;
        const matchItems = ord.items.some(item => item.productName.toLowerCase().includes(q) || (item.productSubtitle ? item.productSubtitle.toLowerCase().includes(q) : false));
        if (!matchOrderNumber && !matchPromo && !matchItems) {
          return false;
        }
      }

      // Year filter
      if (filterState.yearFilter !== "ALL") {
        const dateObj = ord.createdAt instanceof Date ? ord.createdAt : new Date(ord.createdAt);
        const ordYear = dateObj.getFullYear().toString();
        if (ordYear !== filterState.yearFilter) {
          return false;
        }
      }

      // Promo only filter
      if (filterState.hasPromoOnly && !ord.appliedPromoCode) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();
      return timeB - timeA;
    });
  }, [orders, filterState]);
  const hasActiveFilters = filterState.searchQuery.trim() !== "" || filterState.yearFilter !== "ALL" || filterState.hasPromoOnly;
  return <div className="min-h-screen bg-background text-foreground py-10 sm:py-14">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Order History Main Area with stable data-controller-name */}
        <section data-controller-name="Order History Journal" className="space-y-8">
          {/* Header & Search / Filters */}
          <OrderHistoryHeader totalOrdersCount={orders.length} filteredCount={filteredOrders.length} filterState={filterState} onFilterChange={setFilterState} availableYears={availableYears} />

          {/* Quick Stats Summary */}
          {!loading && orders.length > 0 && <OrderStatsSummary orders={orders} />}

          {/* Orders Stream / Cards or Empty State */}
          {loading ? <div className="py-20 flex justify-center items-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b border-primary" />
            </div> : filteredOrders.length > 0 ? <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-extrabold font-display tracking-tight text-foreground">
                  Order Records
                </h2>
                <span className="text-xs font-semibold text-muted-foreground">
                  Sorted newest first
                </span>
              </div>

              <div className="space-y-6">
                {filteredOrders.map((order, index) => <OrderCard key={order.id} order={order} isLatest={index === 0 && !hasActiveFilters} />)}
              </div>
            </div> : <OrderEmptyState isFiltered={hasActiveFilters} onResetFilters={() => setFilterState({
          searchQuery: "",
          yearFilter: "ALL",
          hasPromoOnly: false
        })} />}
        </section>
      </div>
    </div>;
}
