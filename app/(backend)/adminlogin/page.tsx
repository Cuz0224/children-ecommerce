"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AdminBrandHeader from "@/backend/components/AdminLogin/AdminBrandHeader";
import AdminLoginForm from "@/backend/components/AdminLogin/AdminLoginForm";
import AdminFooterInfo from "@/backend/components/AdminLogin/AdminFooterInfo";
import { ProductCatalogAdmin } from "@/backend/route-params";
export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleSuccessfulLogin = () => {
    const redirect = searchParams.get("redirect");
    if (redirect && redirect.startsWith("/") && !redirect.startsWith("//")) {
      router.push(redirect);
    } else {
      ProductCatalogAdmin.navigateTo(router);
    }
  };
  return <div className="w-full max-w-full min-w-0 min-h-[85vh] p-4 lg:p-6 flex flex-col items-center justify-center bg-background text-foreground">
      {/* Centered Ivory Authentication Portal Card */}
      <div data-controller-name="Admin Login Portal" className="w-full max-w-[440px] bg-card text-card-foreground rounded-2xl border border-border shadow-sm p-6 sm:p-8 space-y-6">
        {/* Brand Header */}
        <AdminBrandHeader />

        {/* Divider */}
        <div className="w-full border-t border-border" />

        {/* Authentication Form */}
        <AdminLoginForm onSuccessRedirect={handleSuccessfulLogin} />
      </div>

      {/* Auxiliary Security & Console Info */}
      <AdminFooterInfo />
    </div>;
}
