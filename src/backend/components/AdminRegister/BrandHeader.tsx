"use client";

import React from "react";
import { ShieldCheck, Sparkles } from "lucide-react";
interface BrandHeaderProps {
  systemVersion?: string;
}
export default function BrandHeader({
  systemVersion = "v2.4 Console"
}: BrandHeaderProps) {
  return <div className="flex flex-col items-center text-center space-y-3" data-api-unique-id='brandheader-rfd251dd7db373cd1-s3715560114' data-api-unique-page-name='src/backend/components/AdminRegister/BrandHeader'>
      {/* Brand Badge Icon & System Pill */}
      <div className="flex items-center gap-2" data-api-unique-id='brandheader-r25dbe482d7a81d39-s3715560114' data-api-unique-page-name='src/backend/components/AdminRegister/BrandHeader'>
        <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm" data-api-unique-id='brandheader-r0738d2dfa14d5fad-s3715560114' data-api-unique-page-name='src/backend/components/AdminRegister/BrandHeader'>
          <Sparkles className="h-6 w-6" aria-hidden="true" data-api-unique-id='brandheader-r9e50a5c7d564277e-s3715560114' data-api-unique-page-name='src/backend/components/AdminRegister/BrandHeader' />
          <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-success text-success-foreground ring-2 ring-card" data-api-unique-id='brandheader-r3c97080da82154c1-s3715560114' data-api-unique-page-name='src/backend/components/AdminRegister/BrandHeader'>
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" data-api-unique-id='brandheader-r3d2f90a371eb109c-s3715560114' data-api-unique-page-name='src/backend/components/AdminRegister/BrandHeader' />
          </span>
        </div>
      </div>

      <div className="space-y-1" data-api-unique-id='brandheader-rfdbb54f7e79842f5-s3715560114' data-api-unique-page-name='src/backend/components/AdminRegister/BrandHeader'>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary" data-api-unique-id='brandheader-ra2db33ac0b74478a-s3715560114' data-api-unique-page-name='src/backend/components/AdminRegister/BrandHeader'>
          <ShieldCheck className="h-3.5 w-3.5" data-api-unique-id='brandheader-rf43d95c77094ed5a-s3715560114' data-api-unique-page-name='src/backend/components/AdminRegister/BrandHeader' />
          <span data-api-unique-id='brandheader-r219f425b44d2a43d-s3715560114' data-api-unique-page-name='src/backend/components/AdminRegister/BrandHeader'>ADMIN ACCESS PROVISIONING</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl font-display" data-api-unique-id='brandheader-rab1581dcf841f7ea-s3715560114' data-api-unique-page-name='src/backend/components/AdminRegister/BrandHeader'>
          ToyJoy Admin Console
        </h1>
        <p className="text-xs text-muted-foreground sm:text-sm max-w-sm mx-auto" data-api-unique-id='brandheader-r212b27f8c4728dec-s3715560114' data-api-unique-page-name='src/backend/components/AdminRegister/BrandHeader'>
          Create an administrator identity to manage the toy product catalog, inventory dispatches, and catalog storefront controls.
        </p>
      </div>
    </div>;
}