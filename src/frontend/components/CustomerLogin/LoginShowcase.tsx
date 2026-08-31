"use client";

import React from "react";
import EditableImg from "@/@base/EditableImg";
import { ShieldCheck, Coins, Heart, Sparkles, Gift } from "lucide-react";
import type { ClubPerkItem } from "@/frontend/types/CustomerLogin";
const CLUB_PERKS: ClubPerkItem[] = [{
  id: "perk-safe",
  title: "100% Non-Toxic & Safety Certified",
  description: "Rigorous ASTM & EN71 child safety compliance on every toy.",
  iconName: "ShieldCheck",
  badgeText: "Child Safe"
}, {
  id: "perk-points",
  title: "ToyJoy Member Rewards",
  description: "Earn 5% back in ToyJoy Coins on every magical order.",
  iconName: "Coins",
  badgeText: "5% Back"
}, {
  id: "perk-wishlist",
  title: "Cloud Wishlist & Cart Sync",
  description: "Keep birthday gift lists saved across all your devices.",
  iconName: "Heart",
  badgeText: "Cloud Sync"
}];
export default function LoginShowcase() {
  return <div className="relative hidden flex-col justify-between overflow-hidden rounded-2xl border border-border/50 bg-muted p-6 lg:flex lg:p-8" data-api-unique-id='loginshowcase-rb5c16f38cfaeffb0-s485171033' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginShowcase'>
      {/* Playful background gradient & shape decoration */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-accent/10 blur-2xl" data-api-unique-id='loginshowcase-rbb129c97c11c2496-s485171033' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginShowcase' />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-52 w-52 rounded-full bg-primary/10 blur-2xl" data-api-unique-id='loginshowcase-r1cc33a69af88efd3-s485171033' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginShowcase' />

      {/* Top Tagline */}
      <div className="relative z-10 space-y-2" data-api-unique-id='loginshowcase-r96daad57341e9799-s485171033' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginShowcase'>
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1 text-xs font-bold text-card-foreground shadow-sm" data-api-unique-id='loginshowcase-r6427f78dfec93867-s485171033' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginShowcase'>
          <Sparkles className="h-3.5 w-3.5 text-accent" data-api-unique-id='loginshowcase-r84d321c622444fb5-s485171033' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginShowcase' />
          <span data-api-unique-id='loginshowcase-r8b3e320562597d93-s485171033' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginShowcase'>VIP Toy Workshop Member Entry</span>
        </div>
        <h2 className="font-display text-2xl font-black tracking-tight text-foreground sm:text-3xl" data-api-unique-id='loginshowcase-r155d927a3853253a-s485171033' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginShowcase'>
          Where Imagination Comes to Play
        </h2>
        <p className="text-sm font-medium text-muted-foreground" data-api-unique-id='loginshowcase-rb49ba456994f279e-s485171033' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginShowcase'>
          Step inside to explore curated STEM kits, plush friends, wooden building blocks, and joyful playrooms.
        </p>
      </div>

      {/* Toy Workshop Window Visual */}
      <div className="relative my-4 overflow-hidden rounded-xl border border-border/50 bg-card shadow-md" data-api-unique-id='loginshowcase-ra1ebf326ce8badde-s485171033' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginShowcase'>
        <div className="relative aspect-[16/10] w-full overflow-hidden" data-api-unique-id='loginshowcase-rd008c9d0abcfa2b9-s485171033' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginShowcase'>
          <EditableImg propKey="customer-login-showcase-toy" needLargeImage keywords="playful colorful wooden toy blocks and teddy bear studio shot" description="bright playful studio photograph of colorful wooden building blocks and cute plush teddy bear toy on warm cream background" className="h-full w-full object-cover" data-api-unique-id='loginshowcase-r673353a514f09d1a-s485171033' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginShowcase' />
          <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 rounded-full border border-border bg-card/95 px-3 py-1 text-xs font-bold text-card-foreground shadow-sm" data-api-unique-id='loginshowcase-rf180a18cc18eddec-s485171033' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginShowcase'>
            <Gift className="h-3.5 w-3.5 text-primary" data-api-unique-id='loginshowcase-rd83b08bbcbabc8d9-s485171033' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginShowcase' />
            <span data-api-unique-id='loginshowcase-r8eca5e7ea7b44c54-s485171033' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginShowcase'>Member Exclusive Toy Drops</span>
          </div>
        </div>
      </div>

      {/* 3 Member Perks */}
      <div className="relative z-10 space-y-3" data-api-unique-id='loginshowcase-r8b553ba5ab2ad776-s485171033' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginShowcase'>
        <p className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground" data-api-unique-id='loginshowcase-r8e2e8ce09f3c4e80-s485171033' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginShowcase'>
          Member Privileges Included
        </p>
        <div className="space-y-2.5" data-api-unique-id='loginshowcase-r03f04f2a50be1193-s485171033' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginShowcase'>
          {CLUB_PERKS.map((perk, index) => {
          const IconComponent = perk.iconName === "ShieldCheck" ? ShieldCheck : perk.iconName === "Coins" ? Coins : perk.iconName === "Heart" ? Heart : Gift;
          return <div key={perk.id} className="flex items-start gap-3 rounded-xl border border-border bg-card p-2.5 text-card-foreground shadow-sm" data-api-unique-id='loginshowcase-rada7b62f365163a1-s485171033' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginShowcase' data-api-in-loop='1'>
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary text-primary" data-api-unique-id='loginshowcase-r640332f5bd6d36e2-s485171033' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginShowcase' data-api-in-loop='1'>
                  <IconComponent className="h-4 w-4" data-api-unique-id='loginshowcase-r31802cbafc1a3e70-s485171033' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginShowcase' data-api-in-loop='1' />
                </div>
                <div className="min-w-0 flex-1" data-api-unique-id='loginshowcase-r84dad17f2447c8fc-s485171033' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginShowcase' data-api-in-loop='1'>
                  <div className="flex items-center justify-between gap-2" data-api-unique-id='loginshowcase-rc511c58162409b10-s485171033' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginShowcase' data-api-in-loop='1'>
                    <h4 className="truncate text-xs font-bold text-card-foreground" data-api-unique-id='loginshowcase-r793ddb4fab5fa9a3-s485171033' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginShowcase' data-api-in-loop='1' data-api-bind-info={`CLUB_PERKS-${index}-title`} data-api-map-var-name='perk'>
                      {perk.title}
                    </h4>
                    {perk.badgeText && <span className="shrink-0 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-extrabold text-accent" data-api-unique-id='loginshowcase-r2b1e42f7e7b112ed-s485171033' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginShowcase' data-api-in-loop='1' data-api-bind-info={`CLUB_PERKS-${index}-badgeText`} data-api-map-var-name='perk'>
                        {perk.badgeText}
                      </span>}
                  </div>
                  <p className="text-[11px] leading-tight text-muted-foreground" data-api-unique-id='loginshowcase-ra12755915b9bedda-s485171033' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginShowcase' data-api-in-loop='1' data-api-bind-info={`CLUB_PERKS-${index}-description`} data-api-map-var-name='perk'>
                    {perk.description}
                  </p>
                </div>
              </div>;
        })}
        </div>
      </div>
    </div>;
}