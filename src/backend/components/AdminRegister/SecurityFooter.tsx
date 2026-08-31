"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { AdminLogin } from "@/backend/route-params";
interface SecurityFooterProps {
  onNavigateToLogin?: () => void;
}
export default function SecurityFooter({
  onNavigateToLogin
}: SecurityFooterProps) {
  const router = useRouter();
  const handleSignInClick = () => {
    if (onNavigateToLogin) {
      onNavigateToLogin();
    } else {
      AdminLogin.navigateTo(router);
    }
  };
  return <div className="space-y-4 pt-2 text-center border-t border-border/80" data-api-unique-id='securityfooter-rb92cda4eb35ba091-s3923255' data-api-unique-page-name='src/backend/components/AdminRegister/SecurityFooter'>
      {/* Existing account entry point */}
      <div className="text-xs text-muted-foreground" data-api-unique-id='securityfooter-r8e0993cf2f07a12a-s3923255' data-api-unique-page-name='src/backend/components/AdminRegister/SecurityFooter'>
        Already have an active administrator account?{" "}
        <button type="button" onClick={handleSignInClick} className="inline-flex items-center gap-1 font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm px-1" data-api-unique-id='securityfooter-r0a878224d8f679d7-s3923255' data-api-unique-page-name='src/backend/components/AdminRegister/SecurityFooter'>
          <span data-api-unique-id='securityfooter-r6f533903dedfc6b6-s3923255' data-api-unique-page-name='src/backend/components/AdminRegister/SecurityFooter'>Sign In to Console</span>
        </button>
      </div>

      {/* Security statement */}
      <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground/80" data-api-unique-id='securityfooter-r0eeaa093bb4cec8d-s3923255' data-api-unique-page-name='src/backend/components/AdminRegister/SecurityFooter'>
        <Lock className="h-3 w-3 text-muted-foreground shrink-0" data-api-unique-id='securityfooter-r67d932b187cf458c-s3923255' data-api-unique-page-name='src/backend/components/AdminRegister/SecurityFooter' />
        <span data-api-unique-id='securityfooter-r47094e79c282983c-s3923255' data-api-unique-page-name='src/backend/components/AdminRegister/SecurityFooter'>TLS Encrypted Session & Platform-managed Credentials</span>
      </div>
    </div>;
}