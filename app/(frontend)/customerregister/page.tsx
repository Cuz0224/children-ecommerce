"use client";

import React from "react";
import { useRouter } from "next/navigation";
import AuthHeader from "@/frontend/components/CustomerRegister/AuthHeader";
import AuthFooter from "@/frontend/components/CustomerRegister/AuthFooter";
import BrandShowcase from "@/frontend/components/CustomerRegister/BrandShowcase";
import RegisterCard from "@/frontend/components/CustomerRegister/RegisterCard";
import { StorefrontHome } from "@/frontend/route-params";
export default function CustomerRegisterPage() {
  const router = useRouter();
  const handleRegisterSuccess = (_user: {
    username: string;
  }) => {
    StorefrontHome.navigateTo(router);
  };
  return <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Background Toy Dot Matrix Pattern (subtle 5% pitch) */}
      <div className="pointer-events-none fixed inset-0 opacity-40 bg-[radial-gradient(#E5DEC9_1.5px,transparent_1.5px)] [background-size:20px_20px]" aria-hidden="true" />

      {/* Top Header */}
      <AuthHeader />

      {/* Main Registration Showcase Stage */}
      <main className="relative flex min-h-0 flex-1 items-center justify-center py-10 sm:py-14 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Left Wing: Brand Story & Member Privileges */}
            <div className="order-2 w-full lg:order-1 lg:col-span-7">
              <BrandShowcase />
            </div>

            {/* Right Wing: Focused Play Pass Registration Card */}
            <div className="order-1 flex w-full justify-center lg:order-2 lg:col-span-5 lg:justify-end">
              <RegisterCard onRegisterSuccess={handleRegisterSuccess} />
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Trust & Navigation Strip */}
      <AuthFooter />
    </div>;
}
