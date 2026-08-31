"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import LoginHeader from "@/frontend/components/CustomerLogin/LoginHeader";
import LoginShowcase from "@/frontend/components/CustomerLogin/LoginShowcase";
import LoginForm from "@/frontend/components/CustomerLogin/LoginForm";
import TrustBadges from "@/frontend/components/CustomerLogin/TrustBadges";
import type { LoginFormValues, FormErrorState } from "@/frontend/types/CustomerLogin";
import { loginCustomer } from "@/frontend/actions/CustomerLogin";
import { useUserSession } from "@/tools/FrontendSession";
import { StorefrontHome } from "@/frontend/route-params";
export default function CustomerLoginPage() {
  const router = useRouter();
  const {
    set: setSession
  } = useUserSession();
  const [formValues, setFormValues] = useState<LoginFormValues>({
    username: "",
    password: ""
  });
  const [formErrors, setFormErrors] = useState<FormErrorState>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleFieldChange = (field: keyof LoginFormValues, value: string) => {
    setFormValues(prev => ({
      ...prev,
      [field]: value
    }));
    if (formErrors[field] || formErrors.form) {
      setFormErrors(prev => ({
        ...prev,
        [field]: undefined,
        form: undefined
      }));
    }
  };
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Client validation
    const errors: FormErrorState = {};
    if (!formValues.username.trim()) {
      errors.username = "Please enter your username";
    }
    if (!formValues.password) {
      errors.password = "Please enter your password";
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast.error("Please fill in both username and password.");
      return;
    }
    setIsSubmitting(true);
    setFormErrors({});
    try {
      const result = await loginCustomer({
        username: formValues.username.trim(),
        password: formValues.password
      });
      setSession({
        token: result.token,
        user_id: result.userId,
        username: result.username,
        role: result.role
      });
      toast.success("Welcome back! Unlocking your ToyJoy chest...");
      StorefrontHome.navigateTo(router);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Invalid username or password. Please check your credentials and try again.";
      setFormErrors({
        form: errorMessage
      });
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
  return <div className="relative min-h-screen w-full bg-background text-foreground">
      {/* Soft playful cream dot matrix background texture */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#E5DEC9_1.5px,transparent_1.5px)] [background-size:20px_20px] opacity-70" />

      <div className="relative z-10 flex min-h-screen flex-col justify-between px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* Top Minimal Brand Navigation Bar */}
        <div className="mx-auto w-full max-w-5xl">
          <LoginHeader />
        </div>

        {/* Central Dual-Wing Toy Hatch Card */}
        <main className="my-auto py-6 sm:py-8">
          <div className="mx-auto w-full max-w-5xl">
            {/* Stable business content area controller anchor */}
            <div data-controller-name="Customer Sign In Portal" className="rounded-3xl border border-border/50 bg-card p-3 shadow-md sm:p-4 lg:p-6">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
                {/* Left Wing: Showcase & Club Perks */}
                <div className="lg:col-span-6 min-w-0">
                  <LoginShowcase />
                </div>

                {/* Right Wing: Sign In Form & Register Gateway */}
                <div className="lg:col-span-6 min-w-0">
                  <LoginForm values={formValues} errors={formErrors} isSubmitting={isSubmitting} onChangeField={handleFieldChange} onSubmit={handleFormSubmit} />
                </div>
              </div>
            </div>

            {/* Bottom Toy Trust Anchors */}
            <div className="mt-6">
              <TrustBadges />
            </div>
          </div>
        </main>

        {/* Footnote / Legal Notice */}
        <footer className="mx-auto w-full max-w-5xl text-center">
          <p className="text-[11px] font-medium text-muted-foreground">
            © ToyJoy Children&apos;s Toy Workshop · Safe &amp; Joyful Play for Every Child
          </p>
        </footer>
      </div>
    </div>;
}
