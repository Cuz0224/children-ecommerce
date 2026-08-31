"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ToyBrick, ArrowLeft } from "lucide-react";
import { StorefrontHome } from "@/frontend/route-params";
export default function LoginHeader() {
  const router = useRouter();
  const handleNavigateHome = () => {
    StorefrontHome.navigateTo(router);
  };
  return <header className="w-full" data-api-unique-id='loginheader-r40a8b3acded98355-s568370357' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginHeader'>
      <div className="flex items-center justify-between" data-api-unique-id='loginheader-re1480ba43f7f9caf-s568370357' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginHeader'>
        {/* Brand Logo linking back to Storefront Home [F01] */}
        <button type="button" onClick={handleNavigateHome} className="group inline-flex items-center gap-2.5 rounded-full border border-border/50 bg-card px-4 py-2 text-card-foreground shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='loginheader-r17ceba9e3b91d743-s568370357' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginHeader'>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground" data-api-unique-id='loginheader-r28e31bcafcb5d220-s568370357' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginHeader'>
            <ToyBrick className="h-4 w-4" data-api-unique-id='loginheader-r47e29221401931fd-s568370357' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginHeader' />
          </div>
          <span className="font-display text-lg font-black tracking-tight text-foreground" data-api-unique-id='loginheader-r53284a06a5b7d3df-s568370357' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginHeader'>
            Toy<span className="text-primary" data-api-unique-id='loginheader-r0c226073447472b8-s568370357' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginHeader'>Joy</span>
          </span>
        </button>

        {/* Return to storefront navigation prompt [F01] */}
        <button type="button" onClick={handleNavigateHome} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3.5 py-1.5 text-xs font-bold text-secondary-foreground shadow-sm transition-all hover:bg-muted active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='loginheader-r461b01e40f15198b-s568370357' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginHeader'>
          <ArrowLeft className="h-3.5 w-3.5" data-api-unique-id='loginheader-rd38cf65d6ddf41ce-s568370357' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginHeader' />
          <span data-api-unique-id='loginheader-rbeee3211372afbc7-s568370357' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginHeader'>Back to Store</span>
        </button>
      </div>
    </header>;
}