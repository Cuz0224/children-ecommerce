"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowLeft, LogIn } from "lucide-react";
import { StorefrontHome, CustomerLogin } from "@/frontend/route-params";
export default function AuthHeader() {
  const router = useRouter();
  return <header className="w-full border-b border-border bg-card/90" data-api-unique-id='authheader-rf30fac0a255f35ea-s2744811924' data-api-unique-page-name='src/frontend/components/CustomerRegister/AuthHeader'>
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8" data-api-unique-id='authheader-r738ed37c0a57e447-s2744811924' data-api-unique-page-name='src/frontend/components/CustomerRegister/AuthHeader'>
        {/* Brand Logo & Back to Shop [F01] */}
        <button type="button" onClick={() => StorefrontHome.navigateTo(router)} className="group flex items-center gap-3 text-left transition-transform active:scale-[0.98]" data-api-unique-id='authheader-r5e595ecc6b1f2a0a-s2744811924' data-api-unique-page-name='src/frontend/components/CustomerRegister/AuthHeader'>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 bg-primary text-primary-foreground shadow-sm" data-api-unique-id='authheader-r60e0c60c0a1c509e-s2744811924' data-api-unique-page-name='src/frontend/components/CustomerRegister/AuthHeader'>
            <Sparkles className="h-5 w-5 animate-pulse" data-api-unique-id='authheader-ra97516894eec36a4-s2744811924' data-api-unique-page-name='src/frontend/components/CustomerRegister/AuthHeader' />
          </div>
          <div className="flex flex-col" data-api-unique-id='authheader-r4351097c7fd69126-s2744811924' data-api-unique-page-name='src/frontend/components/CustomerRegister/AuthHeader'>
            <span className="font-display text-xl font-black tracking-tight text-foreground sm:text-2xl" data-api-unique-id='authheader-r7edeae76afa01ebb-s2744811924' data-api-unique-page-name='src/frontend/components/CustomerRegister/AuthHeader'>
              Toy<span className="text-primary" data-api-unique-id='authheader-r01d4ac36560ea091-s2744811924' data-api-unique-page-name='src/frontend/components/CustomerRegister/AuthHeader'>Joy</span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground" data-api-unique-id='authheader-r50dcb85709c2a927-s2744811924' data-api-unique-page-name='src/frontend/components/CustomerRegister/AuthHeader'>
              Toy Explorer Club
            </span>
          </div>
        </button>

        {/* Existing Member Shortcut [F04] & Storefront [F01] */}
        <div className="flex items-center gap-3" data-api-unique-id='authheader-r2dfd5fefef0a7d08-s2744811924' data-api-unique-page-name='src/frontend/components/CustomerRegister/AuthHeader'>
          <button type="button" onClick={() => StorefrontHome.navigateTo(router)} className="hidden items-center gap-1.5 rounded-full border border-border/50 bg-secondary px-3.5 py-1.5 text-xs font-bold text-secondary-foreground transition-all hover:bg-muted active:scale-[0.98] sm:inline-flex" data-api-unique-id='authheader-rb7659eb3553032ed-s2744811924' data-api-unique-page-name='src/frontend/components/CustomerRegister/AuthHeader'>
            <ArrowLeft className="h-3.5 w-3.5" data-api-unique-id='authheader-r91d7064e0c31754b-s2744811924' data-api-unique-page-name='src/frontend/components/CustomerRegister/AuthHeader' />
            <span data-api-unique-id='authheader-r50c9be90a08f2a61-s2744811924' data-api-unique-page-name='src/frontend/components/CustomerRegister/AuthHeader'>Storefront</span>
          </button>
          <button type="button" onClick={() => CustomerLogin.navigateTo(router)} className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-card px-4 py-1.5 text-xs font-bold text-card-foreground shadow-sm transition-all hover:bg-muted active:opacity-90" data-api-unique-id='authheader-r35fd4bbbbec4a73e-s2744811924' data-api-unique-page-name='src/frontend/components/CustomerRegister/AuthHeader'>
            <LogIn className="h-3.5 w-3.5 text-primary" data-api-unique-id='authheader-raf2b6ef717181ffb-s2744811924' data-api-unique-page-name='src/frontend/components/CustomerRegister/AuthHeader' />
            <span data-api-unique-id='authheader-r2f8fb4f4bbf5fb26-s2744811924' data-api-unique-page-name='src/frontend/components/CustomerRegister/AuthHeader'>Sign In</span>
          </button>
        </div>
      </div>
    </header>;
}