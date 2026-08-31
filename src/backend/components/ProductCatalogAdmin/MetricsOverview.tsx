"use client";

import React from "react";
import { Package, Sparkles, EyeOff, AlertTriangle } from "lucide-react";
import type { CatalogMetrics } from "@/backend/types/ProductCatalogAdmin";
interface MetricsOverviewProps {
  metrics: CatalogMetrics;
}
export default function MetricsOverview({
  metrics
}: MetricsOverviewProps) {
  const totalProducts = metrics?.totalProducts ?? 0;
  const totalInventoryUnits = metrics?.totalInventoryUnits ?? 0;
  const activeStorefront = metrics?.activeStorefront ?? 0;
  const storefrontLiveRate = metrics?.storefrontLiveRate ?? 0;
  const hiddenDrafts = metrics?.hiddenDrafts ?? 0;
  const lowStockAlerts = metrics?.lowStockAlerts ?? 0;
  const cards = [{
    label: "Total Catalog Toys",
    value: totalProducts,
    unit: "SKUs",
    subtext: `${totalInventoryUnits} total units in warehouse`,
    icon: Package,
    badgeText: "All Categories",
    iconBg: "bg-info/10",
    iconColor: "text-info",
    borderColor: "border-border"
  }, {
    label: "Active Storefront Items",
    value: activeStorefront,
    unit: "Live",
    subtext: `${storefrontLiveRate}% published live to shop`,
    icon: Sparkles,
    badgeText: "Publicly Visible",
    iconBg: "bg-success/10",
    iconColor: "text-success",
    borderColor: "border-border"
  }, {
    label: "Hidden / Draft Products",
    value: hiddenDrafts,
    unit: "Drafts",
    subtext: "Staged or undergoing restock review",
    icon: EyeOff,
    badgeText: "Unpublished",
    iconBg: "bg-muted",
    iconColor: "text-muted-foreground",
    borderColor: "border-border"
  }, {
    label: "Low Inventory Alerts",
    value: lowStockAlerts,
    unit: "Items",
    subtext: "Units at or below safety threshold",
    icon: AlertTriangle,
    badgeText: lowStockAlerts > 0 ? "Action Required" : "Optimal",
    iconBg: lowStockAlerts > 0 ? "bg-destructive/10" : "bg-success/10",
    iconColor: lowStockAlerts > 0 ? "text-destructive" : "text-success",
    borderColor: lowStockAlerts > 0 ? "border-destructive/40" : "border-border"
  }];
  return <section data-controller-name="Catalog Metrics Overview" className="w-full min-w-0" data-api-unique-id='metricsoverview-r9c0ce45fb9a66540-s1112733146' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/MetricsOverview'>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4" data-api-unique-id='metricsoverview-r2089697a26d5a32b-s1112733146' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/MetricsOverview'>
        {cards.map((card, index) => {
        const Icon = card.icon;
        return <div key={index} className={`min-w-0 rounded-2xl border ${card.borderColor} bg-card text-card-foreground p-5 shadow-md flex flex-col justify-between gap-4 transition-all hover:shadow-md`} data-api-unique-id='metricsoverview-r7e7f0fe22384ebb0-s1112733146' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/MetricsOverview' data-api-in-loop='1'>
              <div className="flex items-start justify-between gap-3 min-w-0" data-api-unique-id='metricsoverview-rdfb303695ebca6df-s1112733146' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/MetricsOverview' data-api-in-loop='1'>
                <div className="min-w-0 flex-1" data-api-unique-id='metricsoverview-r6edc2942e646073e-s1112733146' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/MetricsOverview' data-api-in-loop='1'>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block truncate" data-api-unique-id='metricsoverview-rfc08df0d0dedd7b4-s1112733146' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/MetricsOverview' data-api-in-loop='1' data-api-bind-info={`cards-${index}-label`} data-api-map-var-name='card'>
                    {card.label}
                  </span>
                  <div className="flex items-baseline gap-2 mt-1.5 min-w-0" data-api-unique-id='metricsoverview-rff523f8a89f8011e-s1112733146' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/MetricsOverview' data-api-in-loop='1'>
                    <span className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-card-foreground" data-api-unique-id='metricsoverview-r7860eb15122a0a9a-s1112733146' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/MetricsOverview' data-api-in-loop='1' data-api-bind-info={`cards-${index}-value`} data-api-map-var-name='card'>
                      {card.value}
                    </span>
                    <span className="text-xs font-bold text-muted-foreground uppercase" data-api-unique-id='metricsoverview-r336211ce00844186-s1112733146' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/MetricsOverview' data-api-in-loop='1' data-api-bind-info={`cards-${index}-unit`} data-api-map-var-name='card'>
                      {card.unit}
                    </span>
                  </div>
                </div>

                <div className={`w-11 h-11 rounded-xl ${card.iconBg} ${card.iconColor} flex items-center justify-center shrink-0 border border-border/50`} data-api-unique-id='metricsoverview-r9390282783c31be7-s1112733146' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/MetricsOverview' data-api-in-loop='1'>
                  <Icon className="w-5 h-5" data-api-bind-info={`cards-${index}-icon`} data-api-map-var-name='card' data-api-unique-id='metricsoverview-r9c6ee2425ff3a5db-s1112733146' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/MetricsOverview' data-api-in-loop='1' />
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 pt-3 border-t border-border/60 min-w-0 text-xs" data-api-unique-id='metricsoverview-r2cf249d74a82b59e-s1112733146' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/MetricsOverview' data-api-in-loop='1'>
                <span className="text-muted-foreground truncate min-w-0" data-api-unique-id='metricsoverview-rcde7285da448624e-s1112733146' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/MetricsOverview' data-api-in-loop='1' data-api-bind-info={`cards-${index}-subtext`} data-api-map-var-name='card'>
                  {card.subtext}
                </span>
                <span className="inline-flex shrink-0 whitespace-nowrap items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-secondary text-secondary-foreground border border-border" data-api-unique-id='metricsoverview-rf6569584f297d062-s1112733146' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/MetricsOverview' data-api-in-loop='1' data-api-bind-info={`cards-${index}-badgeText`} data-api-map-var-name='card'>
                  {card.badgeText}
                </span>
              </div>
            </div>;
      })}
      </div>
    </section>;
}