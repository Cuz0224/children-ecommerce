"use client";

import React from "react";
import { useRouter } from "next/navigation";
import BrandHeader from "@/backend/components/AdminRegister/BrandHeader";
import AccessScopeBanner from "@/backend/components/AdminRegister/AccessScopeBanner";
import RegistrationForm from "@/backend/components/AdminRegister/RegistrationForm";
import SecurityFooter from "@/backend/components/AdminRegister/SecurityFooter";
import { AdminLogin, ProductCatalogAdmin } from "@/backend/route-params";
export default function AdminRegisterPage() {
  const router = useRouter();
  const handleRegistrationSuccess = (_username: string) => {
    ProductCatalogAdmin.navigateTo(router);
  };
  const handleNavigateToLogin = () => {
    AdminLogin.navigateTo(router);
  };
  return <main className="w-full min-h-screen min-w-0 p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center bg-background text-foreground">
      {/* Standalone Admin Registration Container */}
      <div data-controller-name="Administrator Registration Portal" className="w-full max-w-[520px] rounded-xl border border-border bg-card p-5 sm:p-7 shadow-sm text-card-foreground space-y-6 animate-in fade-in duration-300">
        {/* Brand & Authority Header */}
        <BrandHeader />

        {/* Access Scope & Role Clarification */}
        <AccessScopeBanner />

        {/* Core Administrator Registration Form */}
        <RegistrationForm onSuccess={handleRegistrationSuccess} onNavigateToLogin={handleNavigateToLogin} />

        {/* Existing Account & Security Info */}
        <SecurityFooter onNavigateToLogin={handleNavigateToLogin} />
      </div>

      {/* Subtle bottom console environment indicator */}
      <div className="mt-4 text-center text-[11px] text-muted-foreground/70">
        ToyJoy Ops Center • Protected Admin Console Gateway
      </div>
    </main>;
}
