"use client";

import React from "react";
import Link from "next/link";
import { Heart, Sparkles } from "lucide-react";
import { StorefrontHome, CustomerLogin } from "@/frontend/route-params";
export default function AuthFooter() {
  return <footer className="w-full border-t border-border bg-card/60 py-8" data-api-unique-id='authfooter-r567703b007f11105-s2228545333' data-api-unique-page-name='src/frontend/components/CustomerRegister/AuthFooter'>
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 text-center sm:px-6 sm:text-left md:flex-row lg:px-8" data-api-unique-id='authfooter-r0185243b33bec8b2-s2228545333' data-api-unique-page-name='src/frontend/components/CustomerRegister/AuthFooter'>
        {/* Brand Copyright & Description */}
        <div className="flex flex-col items-center gap-1 sm:items-start" data-api-unique-id='authfooter-rce716c35c087fb68-s2228545333' data-api-unique-page-name='src/frontend/components/CustomerRegister/AuthFooter'>
          <div className="flex items-center gap-1.5 text-xs font-bold text-foreground" data-api-unique-id='authfooter-rda571d53f7b8bfbd-s2228545333' data-api-unique-page-name='src/frontend/components/CustomerRegister/AuthFooter'>
            <Sparkles className="h-3.5 w-3.5 text-primary" data-api-unique-id='authfooter-r49a18c7ad4898fb5-s2228545333' data-api-unique-page-name='src/frontend/components/CustomerRegister/AuthFooter' />
            <span data-api-unique-id='authfooter-r2f68d0a4fe406a8e-s2228545333' data-api-unique-page-name='src/frontend/components/CustomerRegister/AuthFooter'>ToyJoy Children&apos;s Toy Store</span>
          </div>
          <p className="text-[11px] font-medium text-muted-foreground" data-api-unique-id='authfooter-r9fa728348844b116-s2228545333' data-api-unique-page-name='src/frontend/components/CustomerRegister/AuthFooter'>
            Inspiring imagination, playful engineering, and warm childhood memories.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-muted-foreground" data-api-unique-id='authfooter-rfca3ef40265e4363-s2228545333' data-api-unique-page-name='src/frontend/components/CustomerRegister/AuthFooter'>
          <Link href={StorefrontHome.path} className="transition-colors hover:text-foreground hover:underline" data-api-unique-id='authfooter-r1232d4605dedc86f-s2228545333' data-api-unique-page-name='src/frontend/components/CustomerRegister/AuthFooter'>
            Toy Storefront
          </Link>
          <Link href={CustomerLogin.path} className="transition-colors hover:text-foreground hover:underline" data-api-unique-id='authfooter-r1f2ba909b86d7440-s2228545333' data-api-unique-page-name='src/frontend/components/CustomerRegister/AuthFooter'>
            Customer Sign In
          </Link>
          <span className="inline-flex items-center gap-1 text-muted-foreground/80" data-api-unique-id='authfooter-r5fbedaf4765f88a7-s2228545333' data-api-unique-page-name='src/frontend/components/CustomerRegister/AuthFooter'>
            <span data-api-unique-id='authfooter-r3f260721f72ac2f1-s2228545333' data-api-unique-page-name='src/frontend/components/CustomerRegister/AuthFooter'>Made with</span>
            <Heart className="h-3 w-3 fill-primary text-primary" data-api-unique-id='authfooter-r891a2403a4e839d7-s2228545333' data-api-unique-page-name='src/frontend/components/CustomerRegister/AuthFooter' />
            <span data-api-unique-id='authfooter-ra446c1b0d18b6825-s2228545333' data-api-unique-page-name='src/frontend/components/CustomerRegister/AuthFooter'>for Young Explorers</span>
          </span>
        </div>
      </div>
    </footer>;
}