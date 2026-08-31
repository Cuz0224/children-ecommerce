"use client";

import React from "react";
import { ShieldCheck, Sparkles } from "lucide-react";
export default function AdminBrandHeader() {
  return <div className="flex flex-col items-center text-center space-y-3" data-api-unique-id='adminbrandheader-rebd190c3f6b60a8e-s574107130' data-api-unique-page-name='src/backend/components/AdminLogin/AdminBrandHeader'>
      {/* Brand Icon Shield */}
      <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-primary text-primary-foreground shadow-sm ring-4 ring-primary/10 transition-transform" data-api-unique-id='adminbrandheader-r9596165962700703-s574107130' data-api-unique-page-name='src/backend/components/AdminLogin/AdminBrandHeader'>
        <ShieldCheck className="w-7 h-7 stroke-[2.2]" data-api-unique-id='adminbrandheader-r84e545770f42a56e-s574107130' data-api-unique-page-name='src/backend/components/AdminLogin/AdminBrandHeader' />
        <div className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full bg-accent text-accent-foreground border border-card shadow-xs" data-api-unique-id='adminbrandheader-r0bb69639fa2f7706-s574107130' data-api-unique-page-name='src/backend/components/AdminLogin/AdminBrandHeader'>
          <Sparkles className="w-2.5 h-2.5" data-api-unique-id='adminbrandheader-rff21bc5a113eac05-s574107130' data-api-unique-page-name='src/backend/components/AdminLogin/AdminBrandHeader' />
        </div>
      </div>

      {/* Title & Badge */}
      <div className="space-y-1.5" data-api-unique-id='adminbrandheader-r5a9ff06251d4f4cc-s574107130' data-api-unique-page-name='src/backend/components/AdminLogin/AdminBrandHeader'>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide" data-api-unique-id='adminbrandheader-rf5cacd81a184f8ec-s574107130' data-api-unique-page-name='src/backend/components/AdminLogin/AdminBrandHeader'>
          <span data-api-unique-id='adminbrandheader-re4f170a0d1df58df-s574107130' data-api-unique-page-name='src/backend/components/AdminLogin/AdminBrandHeader'>Administrator Access</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-card-foreground" data-api-unique-id='adminbrandheader-r60d8805c6f000588-s574107130' data-api-unique-page-name='src/backend/components/AdminLogin/AdminBrandHeader'>
          ToyJoy Admin Console
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-xs mx-auto" data-api-unique-id='adminbrandheader-r6cef6d2d8e036016-s574107130' data-api-unique-page-name='src/backend/components/AdminLogin/AdminBrandHeader'>
          Sign in to manage catalog items, inventory levels, and order operations.
        </p>
      </div>
    </div>;
}