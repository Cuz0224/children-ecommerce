"use client";

import React from "react";
import { Boxes, Layers, ShieldCheck, Lock } from "lucide-react";
export default function AccessScopeBanner() {
  return <div className="rounded-lg border border-border bg-muted/40 p-3.5 space-y-2.5" data-api-unique-id='accessscopebanner-r67f701d9be20f6ab-s2502081243' data-api-unique-page-name='src/backend/components/AdminRegister/AccessScopeBanner'>
      <div className="flex items-start gap-2.5" data-api-unique-id='accessscopebanner-rfd5ad73b4dc6ad2f-s2502081243' data-api-unique-page-name='src/backend/components/AdminRegister/AccessScopeBanner'>
        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground" data-api-unique-id='accessscopebanner-r19b93036213b0b63-s2502081243' data-api-unique-page-name='src/backend/components/AdminRegister/AccessScopeBanner'>
          <Lock className="h-3 w-3" data-api-unique-id='accessscopebanner-r350b4853d3f28fcf-s2502081243' data-api-unique-page-name='src/backend/components/AdminRegister/AccessScopeBanner' />
        </div>
        <div className="min-w-0 flex-1" data-api-unique-id='accessscopebanner-r4875f82a61582b04-s2502081243' data-api-unique-page-name='src/backend/components/AdminRegister/AccessScopeBanner'>
          <p className="text-xs font-semibold text-foreground" data-api-unique-id='accessscopebanner-r8d93df888ff713d8-s2502081243' data-api-unique-page-name='src/backend/components/AdminRegister/AccessScopeBanner'>
            Role: <span className="text-primary uppercase tracking-wide" data-api-unique-id='accessscopebanner-r910fffaf392e3ee6-s2502081243' data-api-unique-page-name='src/backend/components/AdminRegister/AccessScopeBanner'>ADMIN</span> (Pre-assigned)
          </p>
          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed" data-api-unique-id='accessscopebanner-r369c7caf62b5e2b4-s2502081243' data-api-unique-page-name='src/backend/components/AdminRegister/AccessScopeBanner'>
            Registration creates an administrator credential. An active admin account is required before entering the catalog management workspace.
          </p>
        </div>
      </div>

      {/* 3 micro privilege badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 pt-1 border-t border-border/70 text-[11px]" data-api-unique-id='accessscopebanner-r98d59188cbc537d1-s2502081243' data-api-unique-page-name='src/backend/components/AdminRegister/AccessScopeBanner'>
        <div className="flex items-center gap-1.5 rounded bg-card px-2 py-1 border border-border/60 text-card-foreground" data-api-unique-id='accessscopebanner-r7bb9ee66bcedd684-s2502081243' data-api-unique-page-name='src/backend/components/AdminRegister/AccessScopeBanner'>
          <Boxes className="h-3.5 w-3.5 text-primary shrink-0" data-api-unique-id='accessscopebanner-rc03044aee4c0737a-s2502081243' data-api-unique-page-name='src/backend/components/AdminRegister/AccessScopeBanner' />
          <span className="truncate font-medium" data-api-unique-id='accessscopebanner-rad1391c0ac9976b4-s2502081243' data-api-unique-page-name='src/backend/components/AdminRegister/AccessScopeBanner'>Catalog Control</span>
        </div>
        <div className="flex items-center gap-1.5 rounded bg-card px-2 py-1 border border-border/60 text-card-foreground" data-api-unique-id='accessscopebanner-r123ad504ec5dea8f-s2502081243' data-api-unique-page-name='src/backend/components/AdminRegister/AccessScopeBanner'>
          <Layers className="h-3.5 w-3.5 text-primary shrink-0" data-api-unique-id='accessscopebanner-r3ab59ee0fdd45b25-s2502081243' data-api-unique-page-name='src/backend/components/AdminRegister/AccessScopeBanner' />
          <span className="truncate font-medium" data-api-unique-id='accessscopebanner-r141e69b5586d2d9f-s2502081243' data-api-unique-page-name='src/backend/components/AdminRegister/AccessScopeBanner'>Inventory & Stock</span>
        </div>
        <div className="flex items-center gap-1.5 rounded bg-card px-2 py-1 border border-border/60 text-card-foreground" data-api-unique-id='accessscopebanner-r823f3e73519a9d59-s2502081243' data-api-unique-page-name='src/backend/components/AdminRegister/AccessScopeBanner'>
          <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0" data-api-unique-id='accessscopebanner-r8a1a1ad77ea52c63-s2502081243' data-api-unique-page-name='src/backend/components/AdminRegister/AccessScopeBanner' />
          <span className="truncate font-medium" data-api-unique-id='accessscopebanner-rc26d83302df2e3b0-s2502081243' data-api-unique-page-name='src/backend/components/AdminRegister/AccessScopeBanner'>Storefront Flags</span>
        </div>
      </div>
    </div>;
}