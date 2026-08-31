"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Lock, Sparkles, Rocket, CheckCircle2, AlertCircle, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { registerCustomer } from "@/frontend/actions/CustomerRegister";
import { useUserSession } from "@/tools/FrontendSession";
import { StorefrontHome, CustomerLogin } from "@/frontend/route-params";
import type { RegisterFormData, FormValidationErrors } from "@/frontend/types/CustomerRegister";
interface RegisterCardProps {
  onRegisterSuccess?: (user: {
    username: string;
  }) => void;
}
export default function RegisterCard({
  onRegisterSuccess
}: RegisterCardProps) {
  const router = useRouter();
  const {
    set
  } = useUserSession();
  const [formData, setFormData] = useState<RegisterFormData>({
    username: "",
    password: ""
  });
  const [errors, setErrors] = useState<FormValidationErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Field change handler
  const handleInputChange = (field: keyof RegisterFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  // Client-side validation
  const validate = (): boolean => {
    const newErrors: FormValidationErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    } else if (formData.username.trim().length > 255) {
      newErrors.username = "Username must be under 255 characters";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (formData.password.length > 255) {
      newErrors.password = "Password must be under 255 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit action
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please complete all required fields correctly.");
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await registerCustomer({
        username: formData.username.trim(),
        password: formData.password
      });

      // Write token, user_id, username, role into session
      set({
        token: result.token,
        user_id: result.userId,
        username: result.username,
        role: result.role as "CUSTOMER"
      });
      setIsSuccess(true);
      toast.success("Welcome to ToyJoy! Your explorer pass is ready.");
      if (onRegisterSuccess) {
        onRegisterSuccess({
          username: result.username
        });
      }

      // Registration is complete, redirect to storefront home
      setTimeout(() => {
        StorefrontHome.navigateTo(router);
      }, 1200);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Registration failed. Please try a different username.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
  return <div data-controller-name="Customer Registration Area" className="relative w-full max-w-[480px] rounded-3xl border border-border/50 bg-card p-6 shadow-md sm:p-8" data-api-unique-id='registercard-r176314aee637fe66-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard'>
      {/* Official Explorer Badge Stamp */}
      <div className="absolute -top-3.5 right-6 z-10 flex items-center gap-1.5 rounded-full border border-border/50 bg-accent px-3.5 py-1 text-[11px] font-black uppercase tracking-wider text-accent-foreground shadow-sm" data-api-unique-id='registercard-r5e1c19cc15d3ebf7-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard'>
        <Sparkles className="h-3.5 w-3.5" data-api-unique-id='registercard-r485891cd92fc2082-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard' />
        <span data-api-unique-id='registercard-r2ad58ea6df7dbe44-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard'>Official Toy Explorer</span>
      </div>

      {/* Card Header */}
      <div className="mb-6 space-y-1.5 pt-1" data-api-unique-id='registercard-rab8a9e42ab09751f-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard'>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-extrabold text-primary" data-api-unique-id='registercard-r7f665d90d17d5812-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard'>
          <span data-api-unique-id='registercard-r558da4de0e655479-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard'>ToyJoy Play Pass</span>
        </div>
        <h2 className="font-display text-2xl font-black tracking-tight text-foreground sm:text-3xl" data-api-unique-id='registercard-r9a0046296c98fbb7-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard'>
          Claim Your Play Pass
        </h2>
        <p className="text-xs font-medium text-muted-foreground sm:text-sm" data-api-unique-id='registercard-r389a97c3bb2d49a3-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard'>
          Join our toy family for instant checkout, wishlist saves, and order tracking.
        </p>
      </div>

      {/* Success Banner */}
      {isSuccess && <div className="mb-6 flex items-start gap-3 rounded-2xl border border-success bg-success/10 p-4 text-foreground" data-api-unique-id='registercard-r8b7b16ad64ab3642-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard'>
          <CheckCircle2 className="h-5 w-5 shrink-0 text-success" data-api-unique-id='registercard-r265f9adf65706baa-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard' />
          <div className="text-xs sm:text-sm" data-api-unique-id='registercard-re920a38fe1d8a825-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard'>
            <p className="font-bold text-foreground" data-api-unique-id='registercard-r63c18eb5afffbac8-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard'>Account Created Successfully!</p>
            <p className="text-muted-foreground" data-api-unique-id='registercard-re3be79dc82a02d28-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard'>
              Redirecting you to the ToyJoy storefront...
            </p>
          </div>
        </div>}

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-5" data-api-unique-id='registercard-r4b0c338e692a4000-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard'>
        {/* Username Field */}
        <div className="space-y-1.5" data-api-unique-id='registercard-re3b94f10e3e160cb-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard'>
          <div className="flex items-center justify-between" data-api-unique-id='registercard-rc7cd6a4073053d99-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard'>
            <label htmlFor="register-username" className="text-xs font-bold uppercase tracking-wider text-foreground sm:text-sm" data-api-unique-id='registercard-r49f36fa48a0e87ad-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard'>
              Username <span className="text-primary" data-api-unique-id='registercard-r46614faa36319362-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard'>*</span>
            </label>
            <span className="text-[11px] font-medium text-muted-foreground" data-api-unique-id='registercard-r4c8b8b73eab0e22c-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard'>
              Must be unique
            </span>
          </div>

          <div className="relative" data-api-unique-id='registercard-ra490339dc092c22c-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard'>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground" data-api-unique-id='registercard-r68d88276ef9f4455-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard'>
              <User className="h-4 w-4" data-api-unique-id='registercard-re16ea3f1a3d40ed9-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard' />
            </div>
            <input id="register-username" type="text" name="username" autoComplete="username" value={formData.username} onChange={e => handleInputChange("username", e.target.value)} placeholder="e.g. ToyMasterLeo" disabled={isSubmitting || isSuccess} className={`w-full rounded-2xl border bg-card py-3 pl-10 pr-10 text-sm font-semibold text-foreground placeholder:font-normal placeholder:text-muted-foreground/70 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary/40 disabled:opacity-60 ${errors.username ? "border-destructive ring-2 ring-destructive" : "border-border hover:border-border"}`} data-api-unique-id='registercard-r5191864dc25e91e8-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard' />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5" data-api-unique-id='registercard-rc99e240f63b07b5b-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard'>
              {formData.username.trim().length >= 3 ? <Rocket className="h-4 w-4 text-primary animate-pulse" data-api-unique-id='registercard-r4f3e41962020b15f-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard' /> : <span className="h-2 w-2 rounded-full bg-border" data-api-unique-id='registercard-r69070dc288c66ca6-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard' />}
            </div>
          </div>

          {/* Validation / Helper note */}
          {errors.username ? <p className="flex items-center gap-1 text-xs font-bold text-destructive" data-api-unique-id='registercard-rd86c979b739b4852-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard'>
              <AlertCircle className="h-3.5 w-3.5 shrink-0" data-api-unique-id='registercard-r498ddc9c70e91782-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard' />
              <span data-api-unique-id='registercard-r2c246092fd879c7b-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard'>{errors.username}</span>
            </p> : <p className="text-[11px] font-medium text-muted-foreground" data-api-unique-id='registercard-re8da18462d011258-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard'>
              Choose a distinct handle for your kid&apos;s toy orders and gift registry.
            </p>}
        </div>

        {/* Password Field */}
        <div className="space-y-1.5" data-api-unique-id='registercard-rc63d09924d92cf5c-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard'>
          <div className="flex items-center justify-between" data-api-unique-id='registercard-rbdc22326ba74aa6a-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard'>
            <label htmlFor="register-password" className="text-xs font-bold uppercase tracking-wider text-foreground sm:text-sm" data-api-unique-id='registercard-r7d6d824502b09f98-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard'>
              Password <span className="text-primary" data-api-unique-id='registercard-r4c58d283cc43b10a-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard'>*</span>
            </label>
            <span className="text-[11px] font-medium text-muted-foreground" data-api-unique-id='registercard-r47d4d424bd859d2c-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard'>
              At least 6 chars
            </span>
          </div>

          <div className="relative" data-api-unique-id='registercard-r36a7696b8f296e61-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard'>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground" data-api-unique-id='registercard-rc96a3057fdaea1a7-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard'>
              <Lock className="h-4 w-4" data-api-unique-id='registercard-r6694e21911249579-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard' />
            </div>
            <input id="register-password" type={showPassword ? "text" : "password"} name="password" autoComplete="new-password" value={formData.password} onChange={e => handleInputChange("password", e.target.value)} placeholder="••••••••" disabled={isSubmitting || isSuccess} className={`w-full rounded-2xl border bg-card py-3 pl-10 pr-11 text-sm font-semibold text-foreground placeholder:font-normal placeholder:text-muted-foreground/70 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary/40 disabled:opacity-60 ${errors.password ? "border-destructive ring-2 ring-destructive" : "border-border hover:border-border"}`} data-api-unique-id='registercard-reb9171059a3dad2a-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard' />
            <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none" data-api-unique-id='registercard-rcada1d0e631602d3-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard'>
              {showPassword ? <EyeOff className="h-4 w-4" data-api-unique-id='registercard-r13a19f243be99d5b-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard' /> : <Eye className="h-4 w-4" data-api-unique-id='registercard-radd096290c3e80b8-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard' />}
            </button>
          </div>

          {errors.password && <p className="flex items-center gap-1 text-xs font-bold text-destructive" data-api-unique-id='registercard-r3011be539d5a7273-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard'>
              <AlertCircle className="h-3.5 w-3.5 shrink-0" data-api-unique-id='registercard-rcc8a2161d3d6ec98-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard' />
              <span data-api-unique-id='registercard-r263016cae77760f0-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard'>{errors.password}</span>
            </p>}
        </div>

        {/* Role Guarantee Pill (Customer Account) */}
        <div className="flex items-center justify-between rounded-xl border border-border bg-muted/60 px-3.5 py-2 text-xs" data-api-unique-id='registercard-r49459a7dc2d23de9-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard'>
          <span className="font-bold text-foreground" data-api-unique-id='registercard-r7191024a1b8902c4-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard'>Membership Tier</span>
          <span className="inline-flex items-center gap-1 font-bold text-primary" data-api-unique-id='registercard-r846343da18cd8f22-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard'>
            <ShieldCheck className="h-3.5 w-3.5" data-api-unique-id='registercard-r9b2993a56703fd9c-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard' />
            <span data-api-unique-id='registercard-rcea4bcbf99af0228-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard'>Customer Pass (Role: CUSTOMER)</span>
          </span>
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={isSubmitting || isSuccess} className="group flex w-full items-center justify-center gap-2 rounded-full border border-border/50 bg-primary py-3.5 text-sm font-black tracking-wide text-primary-foreground shadow-md transition-all hover:shadow-md disabled:pointer-events-none disabled:opacity-60" data-api-unique-id='registercard-r9e1d2d1466ef7b0c-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard'>
          {isSubmitting ? <span className="inline-flex items-center gap-2" data-api-unique-id='registercard-rf992a0a4f2ef3dc8-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard'>
              <Sparkles className="h-4 w-4 animate-spin" data-api-unique-id='registercard-r093696e487bb14ee-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard' />
              <span data-api-unique-id='registercard-rb43a3286aff30ef0-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard'>Forging Play Pass...</span>
            </span> : <span className="inline-flex items-center gap-2" data-api-unique-id='registercard-r776d913383f74cc9-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard'>
              <span data-api-unique-id='registercard-r1bda016618887b96-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard'>Create Customer Account</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" data-api-unique-id='registercard-r18c459cd2f6d9ef9-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard' />
            </span>}
        </button>
      </form>

      {/* Existing Customer Link [F04] */}
      <div className="mt-6 border-t border-dashed border-border pt-5 text-center" data-api-unique-id='registercard-re81e0c57cebc5100-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard'>
        <p className="text-xs font-semibold text-muted-foreground sm:text-sm" data-api-unique-id='registercard-r8e920601587ddb70-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard'>
          Already have a ToyJoy Pass?{" "}
          <button type="button" onClick={() => CustomerLogin.navigateTo(router)} className="font-bold text-primary underline underline-offset-4 transition-colors hover:text-foreground" data-api-unique-id='registercard-r2274588b8db773df-s1776469946' data-api-unique-page-name='src/frontend/components/CustomerRegister/RegisterCard'>
            Sign In Here
          </button>
        </p>
      </div>
    </div>;
}