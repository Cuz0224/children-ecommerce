"use client";

import React from "react";
import { Rocket, Gift, Star, ShieldCheck, Sparkles } from "lucide-react";
import type { PrivilegeItem } from "@/frontend/types/CustomerRegister";
const PRIVILEGES: PrivilegeItem[] = [{
  id: "rocket-shipping",
  iconName: "rocket",
  title: "Rocket-Speed Toy Delivery",
  description: "Priority doorstep shipping with protective bubble wrap for every playset and building block.",
  badgeText: "Fast Dispatch",
  accentColor: "bg-primary text-primary-foreground"
}, {
  id: "wishlist-chest",
  iconName: "box",
  title: "Wishlist Toy Chest",
  description: "Save dream sets, receive restock alerts, and build custom holiday gift boxes for kids.",
  badgeText: "Personal Box",
  accentColor: "bg-accent text-accent-foreground"
}, {
  id: "star-rewards",
  iconName: "sparkles",
  title: "Play Star Reward Points",
  description: "Earn stellar stars on every order to unlock exclusive discounts and secret collector drops.",
  badgeText: "VIP Points",
  accentColor: "bg-warning text-warning-foreground"
}];
export default function BrandShowcase() {
  return <div data-controller-name="Member Benefits Showcase" className="flex min-w-0 flex-1 flex-col justify-between rounded-3xl border border-border/50 bg-card p-6 shadow-md sm:p-8 lg:p-10" data-api-unique-id='brandshowcase-rd6fdd12d6ba0d190-s2746032467' data-api-unique-page-name='src/frontend/components/CustomerRegister/BrandShowcase'>
      <div className="space-y-6" data-api-unique-id='brandshowcase-rdaf41db65f4a9600-s2746032467' data-api-unique-page-name='src/frontend/components/CustomerRegister/BrandShowcase'>
        {/* Pass Banner Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-accent px-3.5 py-1.5 text-xs font-black tracking-wide text-accent-foreground shadow-sm" data-api-unique-id='brandshowcase-rab31dce516f6da1a-s2746032467' data-api-unique-page-name='src/frontend/components/CustomerRegister/BrandShowcase'>
          <Sparkles className="h-3.5 w-3.5" data-api-unique-id='brandshowcase-r70e945602b7a9565-s2746032467' data-api-unique-page-name='src/frontend/components/CustomerRegister/BrandShowcase' />
          <span data-api-unique-id='brandshowcase-r1c3aca857ff615d7-s2746032467' data-api-unique-page-name='src/frontend/components/CustomerRegister/BrandShowcase'>ToyJoy Play Pass • VIP Explorer Access</span>
        </div>

        {/* Headline & Supporting Copy */}
        <div className="space-y-3" data-api-unique-id='brandshowcase-r715d1523a95c94b5-s2746032467' data-api-unique-page-name='src/frontend/components/CustomerRegister/BrandShowcase'>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl" data-api-unique-id='brandshowcase-r35b5331520213ea4-s2746032467' data-api-unique-page-name='src/frontend/components/CustomerRegister/BrandShowcase'>
            Unlock Your Toy Adventure
          </h1>
          <p className="max-w-xl text-base font-medium leading-relaxed text-muted-foreground sm:text-lg" data-api-unique-id='brandshowcase-r6db2f48cb603cb4b-s2746032467' data-api-unique-page-name='src/frontend/components/CustomerRegister/BrandShowcase'>
            Create your personal explorer account to track playtime orders, collect starry rewards, and unbox new surprises.
          </p>
        </div>

        {/* 3 Play Privileges */}
        <div className="space-y-4 pt-2" data-api-unique-id='brandshowcase-reedc7c096772f812-s2746032467' data-api-unique-page-name='src/frontend/components/CustomerRegister/BrandShowcase'>
          {PRIVILEGES.map((privilege, index) => {
          const Icon = privilege.iconName === "rocket" ? Rocket : privilege.iconName === "box" ? Gift : Star;
          return <div key={privilege.id} className="group flex min-w-0 items-start gap-4 rounded-2xl border border-border/50 bg-muted/40 p-4 transition-all hover:border-border hover:bg-muted hover:shadow-sm" data-api-unique-id='brandshowcase-r6a969b1d56779d41-s2746032467' data-api-unique-page-name='src/frontend/components/CustomerRegister/BrandShowcase' data-api-in-loop='1'>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border/50 bg-card text-foreground shadow-sm transition-transform group-hover:scale-105" data-api-unique-id='brandshowcase-r118a8f929ea9c8d3-s2746032467' data-api-unique-page-name='src/frontend/components/CustomerRegister/BrandShowcase' data-api-in-loop='1'>
                  <Icon className="h-6 w-6 text-primary" data-api-unique-id='brandshowcase-r725c055a2289f8a5-s2746032467' data-api-unique-page-name='src/frontend/components/CustomerRegister/BrandShowcase' data-api-in-loop='1' />
                </div>
                <div className="min-w-0 flex-1 space-y-1" data-api-unique-id='brandshowcase-rce2667bd4b88e277-s2746032467' data-api-unique-page-name='src/frontend/components/CustomerRegister/BrandShowcase' data-api-in-loop='1'>
                  <div className="flex flex-wrap items-center gap-2" data-api-unique-id='brandshowcase-r6bf3aebd0f0c7e22-s2746032467' data-api-unique-page-name='src/frontend/components/CustomerRegister/BrandShowcase' data-api-in-loop='1'>
                    <h2 className="text-base font-bold text-foreground sm:text-lg" data-api-unique-id='brandshowcase-r7f14cad7e51fa0da-s2746032467' data-api-unique-page-name='src/frontend/components/CustomerRegister/BrandShowcase' data-api-in-loop='1' data-api-bind-info={`PRIVILEGES-${index}-title`} data-api-map-var-name='privilege'>
                      {privilege.title}
                    </h2>
                    <span className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-[11px] font-extrabold uppercase shadow-sm ${privilege.accentColor}`} data-api-unique-id='brandshowcase-r598842e8c13df3a1-s2746032467' data-api-unique-page-name='src/frontend/components/CustomerRegister/BrandShowcase' data-api-in-loop='1' data-api-bind-info={`PRIVILEGES-${index}-badgeText`} data-api-map-var-name='privilege'>
                      {privilege.badgeText}
                    </span>
                  </div>
                  <p className="text-xs font-medium leading-relaxed text-muted-foreground sm:text-sm" data-api-unique-id='brandshowcase-r98233e4be6f8f76f-s2746032467' data-api-unique-page-name='src/frontend/components/CustomerRegister/BrandShowcase' data-api-in-loop='1' data-api-bind-info={`PRIVILEGES-${index}-description`} data-api-map-var-name='privilege'>
                    {privilege.description}
                  </p>
                </div>
              </div>;
        })}
        </div>
      </div>

      {/* Safety & Trust Promise Strip */}
      <div className="mt-8 flex min-w-0 items-center gap-3 rounded-2xl border border-border/50 bg-secondary/80 px-4 py-3 text-secondary-foreground" data-api-unique-id='brandshowcase-r3405e5c90be2a66e-s2746032467' data-api-unique-page-name='src/frontend/components/CustomerRegister/BrandShowcase'>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/50 bg-card text-foreground shadow-sm" data-api-unique-id='brandshowcase-r3d284ba25eecde74-s2746032467' data-api-unique-page-name='src/frontend/components/CustomerRegister/BrandShowcase'>
          <ShieldCheck className="h-5 w-5 text-success" data-api-unique-id='brandshowcase-r532abfcb03a69adf-s2746032467' data-api-unique-page-name='src/frontend/components/CustomerRegister/BrandShowcase' />
        </div>
        <div className="min-w-0 flex-1 text-xs" data-api-unique-id='brandshowcase-ra1b06fe73438b6a6-s2746032467' data-api-unique-page-name='src/frontend/components/CustomerRegister/BrandShowcase'>
          <p className="font-bold text-foreground" data-api-unique-id='brandshowcase-rb0d23c802953496b-s2746032467' data-api-unique-page-name='src/frontend/components/CustomerRegister/BrandShowcase'>100% Certified Toy Safety & Privacy</p>
          <p className="text-muted-foreground" data-api-unique-id='brandshowcase-r12697ce5ff362cd7-s2746032467' data-api-unique-page-name='src/frontend/components/CustomerRegister/BrandShowcase'>
            Strict child-friendly standards, encrypted account credentials, and zero spam guarantee.
          </p>
        </div>
      </div>
    </div>;
}