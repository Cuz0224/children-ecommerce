"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Search, ShoppingBag, X, Tag } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { OrderFilterState } from "@/frontend/types/OrderHistory";
import { StorefrontHome } from "@/frontend/route-params";
interface OrderHistoryHeaderProps {
  totalOrdersCount: number;
  filteredCount: number;
  filterState: OrderFilterState;
  onFilterChange: (newFilter: OrderFilterState) => void;
  availableYears: string[];
}
export default function OrderHistoryHeader({
  totalOrdersCount,
  filteredCount,
  filterState,
  onFilterChange,
  availableYears
}: OrderHistoryHeaderProps) {
  const router = useRouter();
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filterState,
      searchQuery: e.target.value
    });
  };
  const handleYearChange = (year: string) => {
    onFilterChange({
      ...filterState,
      yearFilter: year
    });
  };
  const togglePromoFilter = () => {
    onFilterChange({
      ...filterState,
      hasPromoOnly: !filterState.hasPromoOnly
    });
  };
  const clearFilters = () => {
    onFilterChange({
      searchQuery: "",
      yearFilter: "ALL",
      hasPromoOnly: false
    });
  };
  const hasActiveFilters = filterState.searchQuery.trim() !== "" || filterState.yearFilter !== "ALL" || filterState.hasPromoOnly;
  return <header className="w-full space-y-6" data-api-unique-id='orderhistoryheader-rcf11a4d2faea0c84-s2648423287' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderHistoryHeader'>
      {/* Top Title & CTA Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6" data-api-unique-id='orderhistoryheader-r382c688e9883f4d6-s2648423287' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderHistoryHeader'>
        <div className="space-y-2 min-w-0" data-api-unique-id='orderhistoryheader-r6d4999c30f36a80d-s2648423287' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderHistoryHeader'>
          <div className="flex flex-wrap items-center gap-3" data-api-unique-id='orderhistoryheader-rc83b279bab142ed0-s2648423287' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderHistoryHeader'>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-foreground" data-api-unique-id='orderhistoryheader-r5495376e8826f365-s2648423287' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderHistoryHeader'>
              Toy Joy Journal
            </h1>
            <span className="bg-accent text-accent-foreground font-bold text-xs px-3.5 py-1.5 rounded-full shadow-sm inline-flex items-center gap-1.5 shrink-0" data-api-unique-id='orderhistoryheader-r05e7c5800dc5982c-s2648423287' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderHistoryHeader'>
              {totalOrdersCount} {totalOrdersCount === 1 ? "Order Recorded" : "Orders Recorded"}
            </span>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl font-body" data-api-unique-id='orderhistoryheader-r892f222bf6bb22b1-s2648423287' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderHistoryHeader'>
            Your collection of delivered toy treasures, joy-filled receipts, and immutable checkout snapshots.
          </p>
        </div>

        {/* Shop Again / Storefront CTA Button [F01] */}
        <div className="shrink-0" data-api-unique-id='orderhistoryheader-rac2db4677d90664f-s2648423287' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderHistoryHeader'>
          <button type="button" onClick={() => StorefrontHome.navigateTo(router)} className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-3 rounded-full border border-border/50 shadow-md hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" data-api-unique-id='orderhistoryheader-ra4b5987d24517669-s2648423287' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderHistoryHeader'>
            <ShoppingBag className="h-4 w-4" data-api-unique-id='orderhistoryheader-r7419cbdb22300ac9-s2648423287' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderHistoryHeader' />
            <span data-api-unique-id='orderhistoryheader-r0040a9544d4ea89c-s2648423287' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderHistoryHeader'>Shop Storefront</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar Row */}
      {totalOrdersCount > 0 && <div className="bg-card text-card-foreground rounded-2xl border border-border/50 p-4 shadow-md flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4" data-api-unique-id='orderhistoryheader-r2638365ece70df42-s2648423287' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderHistoryHeader'>
          {/* Search Input */}
          <div className="relative flex-1 min-w-0" data-api-unique-id='orderhistoryheader-rfee8faaa7b66291a-s2648423287' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderHistoryHeader'>
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" data-api-unique-id='orderhistoryheader-r89259538ab3df494-s2648423287' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderHistoryHeader' />
            <input type="text" value={filterState.searchQuery} onChange={handleSearchChange} placeholder="Search by toy name or order #..." className="w-full bg-muted text-foreground placeholder:text-muted-foreground border border-border/50 rounded-full pl-10 pr-10 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-all" data-api-unique-id='orderhistoryheader-r613966232042fb0d-s2648423287' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderHistoryHeader' />
            {filterState.searchQuery && <button type="button" onClick={() => onFilterChange({
          ...filterState,
          searchQuery: ""
        })} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5 rounded-full" aria-label="Clear search" data-api-unique-id='orderhistoryheader-reb3a9d2c0db51155-s2648423287' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderHistoryHeader'>
                <X className="h-3.5 w-3.5" data-api-unique-id='orderhistoryheader-rfd8c07de9078791a-s2648423287' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderHistoryHeader' />
              </button>}
          </div>

          {/* Filter Controls: Year & Promo Toggle */}
          <div className="flex flex-wrap items-center gap-3 shrink-0" data-api-unique-id='orderhistoryheader-r5f3abd06172678b2-s2648423287' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderHistoryHeader'>
            {/* Year Selector */}
            <div className="w-36" data-api-unique-id='orderhistoryheader-r000f7f89211266a9-s2648423287' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderHistoryHeader'>
              <Select value={filterState.yearFilter} onValueChange={handleYearChange} data-api-unique-id='orderhistoryheader-r565b2540981e400b-s2648423287' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderHistoryHeader'>
                <SelectTrigger className="w-full bg-muted text-foreground border border-border/50 rounded-full text-xs font-semibold h-10 px-4 focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='orderhistoryheader-r723c9b3108f3a144-s2648423287' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderHistoryHeader'>
                  <SelectValue placeholder="All Years" data-api-unique-id='orderhistoryheader-rd8c456bc5879951b-s2648423287' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderHistoryHeader' />
                </SelectTrigger>
                <SelectContent className="bg-popover text-popover-foreground border border-border/50 rounded-xl shadow-md" data-api-unique-id='orderhistoryheader-r0f2702729fbb88c4-s2648423287' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderHistoryHeader'>
                  <SelectItem value="ALL" data-api-unique-id='orderhistoryheader-r42b5059d461363ea-s2648423287' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderHistoryHeader'>All Time</SelectItem>
                  {availableYears.map((yr, index) => <SelectItem key={yr} value={yr} data-api-unique-id='orderhistoryheader-r907ea297d7ef0462-s2648423287' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderHistoryHeader' data-api-in-loop='1' data-api-bind-info={`availableYears-${index}-$item`} data-api-map-var-name='yr'>
                      Year {yr}
                    </SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            {/* Promo Code Only Toggle */}
            <button type="button" onClick={togglePromoFilter} className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${filterState.hasPromoOnly ? "bg-primary text-primary-foreground border-border/50 shadow-sm" : "bg-muted text-muted-foreground border-border hover:bg-secondary hover:text-secondary-foreground"}`} data-api-unique-id='orderhistoryheader-re933788eac654587-s2648423287' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderHistoryHeader'>
              <Tag className="h-3.5 w-3.5" data-api-unique-id='orderhistoryheader-r008b6274ba2c00f2-s2648423287' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderHistoryHeader' />
              <span data-api-unique-id='orderhistoryheader-re47ed662fa6993f8-s2648423287' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderHistoryHeader'>With Promo</span>
            </button>

            {/* Clear All Filters Button */}
            {hasActiveFilters && <button type="button" onClick={clearFilters} className="text-xs font-semibold text-muted-foreground hover:text-primary underline px-2 py-1 transition-colors" data-api-unique-id='orderhistoryheader-r62564adf4b12064b-s2648423287' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderHistoryHeader'>
                Reset filters
              </button>}
          </div>
        </div>}

      {/* Filter Results Indicator */}
      {hasActiveFilters && totalOrdersCount > 0 && <div className="text-xs text-muted-foreground flex items-center justify-between px-1" data-api-unique-id='orderhistoryheader-r0ca7799966c96586-s2648423287' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderHistoryHeader'>
          <span data-api-unique-id='orderhistoryheader-r13576991a639f9a8-s2648423287' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderHistoryHeader'>
            Showing <strong className="text-foreground" data-api-unique-id='orderhistoryheader-r7d12d2d018f1fd47-s2648423287' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderHistoryHeader'>{filteredCount}</strong> of{" "}
            <strong className="text-foreground" data-api-unique-id='orderhistoryheader-rcaf50a68f86ff766-s2648423287' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderHistoryHeader'>{totalOrdersCount}</strong> orders
          </span>
        </div>}
    </header>;
}