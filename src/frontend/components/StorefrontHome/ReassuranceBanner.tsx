"use client";

import React from "react";
import { ShieldCheck, Truck, RotateCcw, Sparkles } from "lucide-react";
export default function ReassuranceBanner() {
  const REASSURANCE_CARDS = [{
    id: "safe",
    icon: ShieldCheck,
    badge: "100% Non-Toxic",
    title: "EU & ASTM Certified Safe",
    description: "Every single toy undergoes rigorous lab testing. BPA-free, food-grade silicone, smooth pinch-free wooden edges, and lead-free natural paints."
  }, {
    id: "shipping",
    icon: Truck,
    badge: "Free Over $45",
    title: "Express 2-Day Delivery",
    description: "Packed with care in our reinforced gift boxes. Free express shipping on orders over $45 with instant real-time dispatch tracking."
  }, {
    id: "guarantee",
    icon: RotateCcw,
    badge: "Joyful Promise",
    title: "30-Day Happiness Guarantee",
    description: "If your little explorer isn't thoroughly captivated, exchange or return hassle-free within 30 days. Zero restocking fees."
  }];
  return <section data-controller-name="Reassurance Features" className="w-full bg-secondary/50 py-12 sm:py-16" data-api-unique-id='reassurancebanner-r499c6c4fc843384a-s2832883805' data-api-unique-page-name='src/frontend/components/StorefrontHome/ReassuranceBanner'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8" data-api-unique-id='reassurancebanner-r5d2b712918ad2dcd-s2832883805' data-api-unique-page-name='src/frontend/components/StorefrontHome/ReassuranceBanner'>
        {/* Header Title */}
        <div className="mx-auto max-w-2xl text-center space-y-2" data-api-unique-id='reassurancebanner-rce701a420d7d3892-s2832883805' data-api-unique-page-name='src/frontend/components/StorefrontHome/ReassuranceBanner'>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-sm" data-api-unique-id='reassurancebanner-r5d7f4886638779a3-s2832883805' data-api-unique-page-name='src/frontend/components/StorefrontHome/ReassuranceBanner'>
            <Sparkles className="h-3.5 w-3.5" data-api-unique-id='reassurancebanner-r2f23c7fc054e345a-s2832883805' data-api-unique-page-name='src/frontend/components/StorefrontHome/ReassuranceBanner' />
            <span data-api-unique-id='reassurancebanner-r48bf964df44b3561-s2832883805' data-api-unique-page-name='src/frontend/components/StorefrontHome/ReassuranceBanner'>The ToyJoy Standard</span>
          </div>
          <h2 className="font-display text-2xl font-extrabold text-foreground sm:text-3xl" data-api-unique-id='reassurancebanner-rf55889bf4fb9c5e2-s2832883805' data-api-unique-page-name='src/frontend/components/StorefrontHome/ReassuranceBanner'>
            Playtime Parents Can Trust
          </h2>
          <p className="text-xs text-muted-foreground sm:text-sm" data-api-unique-id='reassurancebanner-r6db16a3c91e2c59b-s2832883805' data-api-unique-page-name='src/frontend/components/StorefrontHome/ReassuranceBanner'>
            We hold every toy to the world&apos;s strictest safety and developmental standards.
          </p>
        </div>

        {/* 3 Reassurance Cards */}
        <div className="grid min-w-0 grid-cols-1 gap-6 md:grid-cols-3" data-api-unique-id='reassurancebanner-r13b0cd2b022778b8-s2832883805' data-api-unique-page-name='src/frontend/components/StorefrontHome/ReassuranceBanner'>
          {REASSURANCE_CARDS.map((card, index) => {
          const Icon = card.icon;
          return <div key={card.id} className="flex flex-col rounded-2xl border border-border/50 bg-card p-6 text-card-foreground shadow-md transition-all hover:translate-y-[-2px] hover:shadow-md" data-api-unique-id='reassurancebanner-r6d475577c8da7695-s2832883805' data-api-unique-page-name='src/frontend/components/StorefrontHome/ReassuranceBanner' data-api-in-loop='1'>
                <div className="flex items-center justify-between" data-api-unique-id='reassurancebanner-r0c108ada6f71e63d-s2832883805' data-api-unique-page-name='src/frontend/components/StorefrontHome/ReassuranceBanner' data-api-in-loop='1'>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border/50 bg-secondary text-primary shadow-sm" data-api-unique-id='reassurancebanner-r671363290d126e38-s2832883805' data-api-unique-page-name='src/frontend/components/StorefrontHome/ReassuranceBanner' data-api-in-loop='1'>
                    <Icon className="h-6 w-6" data-api-bind-info={`REASSURANCE_CARDS-${index}-icon`} data-api-map-var-name='card' data-api-unique-id='reassurancebanner-re1e65f2ff46b00b2-s2832883805' data-api-unique-page-name='src/frontend/components/StorefrontHome/ReassuranceBanner' data-api-in-loop='1' />
                  </div>
                  <span className="rounded-full border border-border/50 bg-accent px-2.5 py-0.5 text-[11px] font-bold text-accent-foreground shadow-sm" data-api-unique-id='reassurancebanner-r83579b58e70d9f0e-s2832883805' data-api-unique-page-name='src/frontend/components/StorefrontHome/ReassuranceBanner' data-api-in-loop='1' data-api-bind-info={`REASSURANCE_CARDS-${index}-badge`} data-api-map-var-name='card'>
                    {card.badge}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-base font-bold text-foreground sm:text-lg" data-api-unique-id='reassurancebanner-r6d9a916cf548d309-s2832883805' data-api-unique-page-name='src/frontend/components/StorefrontHome/ReassuranceBanner' data-api-in-loop='1' data-api-bind-info={`REASSURANCE_CARDS-${index}-title`} data-api-map-var-name='card'>
                  {card.title}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm" data-api-unique-id='reassurancebanner-r988b9dd48db38368-s2832883805' data-api-unique-page-name='src/frontend/components/StorefrontHome/ReassuranceBanner' data-api-in-loop='1' data-api-bind-info={`REASSURANCE_CARDS-${index}-description`} data-api-map-var-name='card'>
                  {card.description}
                </p>
              </div>;
        })}
        </div>
      </div>
    </section>;
}