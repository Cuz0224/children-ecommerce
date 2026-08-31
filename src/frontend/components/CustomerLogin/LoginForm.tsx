"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Lock, Eye, EyeOff, Sparkles, ArrowRight, ToyBrick } from "lucide-react";
import type { LoginFormValues, FormErrorState } from "@/frontend/types/CustomerLogin";
import { CustomerRegister } from "@/frontend/route-params";
interface LoginFormProps {
  values: LoginFormValues;
  errors: FormErrorState;
  isSubmitting: boolean;
  onChangeField: (field: keyof LoginFormValues, value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
export default function LoginForm({
  values,
  errors,
  isSubmitting,
  onChangeField,
  onSubmit
}: LoginFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  return <div className="flex flex-col justify-between rounded-2xl border border-border/50 bg-card p-6 sm:p-8" data-api-unique-id='loginform-r8457a82805e7efb3-s3244191092' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginForm'>
      <div data-api-unique-id='loginform-rd9bfd7996b807fe2-s3244191092' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginForm'>
        {/* Header Branding */}
        <div className="mb-6 space-y-2 text-center sm:text-left" data-api-unique-id='loginform-r7bd850e25e3a3e8c-s3244191092' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginForm'>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground shadow-sm" data-api-unique-id='loginform-r7860e27f806870af-s3244191092' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginForm'>
            <ToyBrick className="h-3.5 w-3.5 text-primary" data-api-unique-id='loginform-r8824c7124cb285cb-s3244191092' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginForm' />
            <span data-api-unique-id='loginform-rf258f29ce5a4c1c7-s3244191092' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginForm'>ToyJoy Customer Pass</span>
          </div>
          <h1 className="font-display text-2xl font-black tracking-tight text-card-foreground sm:text-3xl" data-api-unique-id='loginform-r4423b82f2d9a59af-s3244191092' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginForm'>
            Welcome back to ToyJoy
          </h1>
          <p className="text-sm text-muted-foreground" data-api-unique-id='loginform-rd22b449e6b7cde5c-s3244191092' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginForm'>
            Sign in to unlock your toy chest and saved wishlists
          </p>
        </div>

        {/* Global form error banner */}
        {errors.form && <div className="mb-5 rounded-xl border border-destructive bg-destructive/10 p-3.5 text-xs font-bold text-destructive" data-api-unique-id='loginform-r9508e74648df10ec-s3244191092' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginForm'>
            {errors.form}
          </div>}

        {/* Form Fields */}
        <form onSubmit={onSubmit} className="space-y-4" noValidate data-api-unique-id='loginform-rf66d6482ec883ebd-s3244191092' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginForm'>
          {/* Account/Username Field */}
          <div className="space-y-1.5" data-api-unique-id='loginform-r4e1577e5749d05bd-s3244191092' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginForm'>
            <label htmlFor="customer-username" className="flex items-center justify-between text-xs font-extrabold tracking-wide text-card-foreground" data-api-unique-id='loginform-r2e507b34a2630532-s3244191092' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginForm'>
              <span data-api-unique-id='loginform-rd202ae89695e4aaa-s3244191092' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginForm'>Username</span>
              <span className="text-[11px] font-semibold text-muted-foreground" data-api-unique-id='loginform-rb4b55f04100f3656-s3244191092' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginForm'>
                Customer Account
              </span>
            </label>
            <div className="relative" data-api-unique-id='loginform-r9e71c821f61b7c24-s3244191092' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginForm'>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground" data-api-unique-id='loginform-r5ca4aef78b1f3e4c-s3244191092' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginForm'>
                <User className="h-4 w-4" data-api-unique-id='loginform-r59312f8154dfd0ae-s3244191092' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginForm' />
              </div>
              <input id="customer-username" type="text" data-auto="account" autoComplete="username" required disabled={isSubmitting} placeholder="Enter your username" value={values.username} onChange={e => onChangeField("username", e.target.value)} className={`w-full rounded-xl border bg-card py-3 pl-10 pr-4 text-sm font-semibold text-card-foreground placeholder:text-muted-foreground transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary disabled:opacity-50 ${errors.username ? "border-destructive" : "border-border"}`} data-api-unique-id='loginform-rb0b83d61263cd2e0-s3244191092' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginForm' />
            </div>
            {errors.username && <p className="text-[11px] font-bold text-destructive" data-api-unique-id='loginform-r5a52c37004327e4e-s3244191092' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginForm'>
                {errors.username}
              </p>}
          </div>

          {/* Password Field */}
          <div className="space-y-1.5" data-api-unique-id='loginform-r40fb1b05346e619c-s3244191092' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginForm'>
            <div className="flex items-center justify-between" data-api-unique-id='loginform-r554f5a5ce8e7db82-s3244191092' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginForm'>
              <label htmlFor="customer-password" className="text-xs font-extrabold tracking-wide text-card-foreground" data-api-unique-id='loginform-rf9ea7c86fb44fee0-s3244191092' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginForm'>
                Password
              </label>
            </div>
            <div className="relative" data-api-unique-id='loginform-ra2c52e9401f3f4f7-s3244191092' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginForm'>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground" data-api-unique-id='loginform-re5ec4f0efd1ffa45-s3244191092' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginForm'>
                <Lock className="h-4 w-4" data-api-unique-id='loginform-r977474980df6e528-s3244191092' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginForm' />
              </div>
              <input id="customer-password" type={showPassword ? "text" : "password"} data-auto="password" autoComplete="current-password" required disabled={isSubmitting} placeholder="Enter your password" value={values.password} onChange={e => onChangeField("password", e.target.value)} className={`w-full rounded-xl border bg-card py-3 pl-10 pr-11 text-sm font-semibold text-card-foreground placeholder:text-muted-foreground transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary disabled:opacity-50 ${errors.password ? "border-destructive" : "border-border"}`} data-api-unique-id='loginform-r11fcbf14914f72f8-s3244191092' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginForm' />
              <button type="button" onClick={() => setShowPassword(!showPassword)} disabled={isSubmitting} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none" data-api-unique-id='loginform-r56eab28facc8d796-s3244191092' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginForm'>
                {showPassword ? <EyeOff className="h-4 w-4" data-api-unique-id='loginform-rfdde9db0ac0d4b6a-s3244191092' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginForm' /> : <Eye className="h-4 w-4" data-api-unique-id='loginform-r895a9e772a54b73d-s3244191092' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginForm' />}
              </button>
            </div>
            {errors.password && <p className="text-[11px] font-bold text-destructive" data-api-unique-id='loginform-r7a90f432f6369e57-s3244191092' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginForm'>
                {errors.password}
              </p>}
          </div>

          {/* Submit Button */}
          <div className="pt-2" data-api-unique-id='loginform-rf14c27d229836337-s3244191092' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginForm'>
            <button type="submit" data-auto="submit" disabled={isSubmitting} className="flex w-full items-center justify-center gap-2 rounded-full border border-border/50 bg-primary py-3.5 text-sm font-black tracking-wide text-primary-foreground shadow-md transition-all hover:-translate-x-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" data-api-unique-id='loginform-r885d2e71bfacbf8e-s3244191092' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginForm'>
              {isSubmitting ? <div className="flex items-center gap-2" data-api-unique-id='loginform-rff27b85a3ab1ab49-s3244191092' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginForm'>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" data-api-unique-id='loginform-r46cb8d95ce97c794-s3244191092' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginForm' />
                  <span data-api-unique-id='loginform-rc5a6b6f0698c8142-s3244191092' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginForm'>Unlocking Toy Chest...</span>
                </div> : <>
                  <Sparkles className="h-4 w-4" data-api-unique-id='loginform-r39ccb1ca1a97e4f9-s3244191092' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginForm' />
                  <span data-api-unique-id='loginform-rc3f03b28c0882199-s3244191092' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginForm'>Open My Toy Chest</span>
                  <ArrowRight className="h-4 w-4" data-api-unique-id='loginform-rd770d358eceab970-s3244191092' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginForm' />
                </>}
            </button>
          </div>
        </form>
      </div>

      {/* Footer Registration Prompt */}
      <div className="mt-6 rounded-xl border border-border bg-muted p-4 text-center" data-api-unique-id='loginform-r1bb690e7ccfe14c4-s3244191092' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginForm'>
        <p className="text-xs font-semibold text-muted-foreground" data-api-unique-id='loginform-r7b5b9af0d26c024a-s3244191092' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginForm'>
          First time shopping at ToyJoy?
        </p>
        <div className="mt-1 flex items-center justify-center gap-1.5" data-api-unique-id='loginform-r13cc39640864de18-s3244191092' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginForm'>
          <span className="text-xs text-foreground" data-api-unique-id='loginform-r42d8bf894cfeb9b3-s3244191092' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginForm'>
            Create a <span className="font-bold text-primary" data-api-unique-id='loginform-r3a4c7f8a535223c0-s3244191092' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginForm'>CUSTOMER</span> account
          </span>
          <span className="text-muted-foreground" data-api-unique-id='loginform-r143290a95b82ca25-s3244191092' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginForm'>·</span>
          {/* Authorized customer registration link [F03] */}
          <button type="button" onClick={() => CustomerRegister.navigateTo(router)} className="inline-flex items-center gap-0.5 text-xs font-black text-primary underline underline-offset-2 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='loginform-r1739ede3357ae4e7-s3244191092' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginForm'>
            <span data-api-unique-id='loginform-r554d7981e58a5af4-s3244191092' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginForm'>Register Now</span>
            <ArrowRight className="h-3 w-3" data-api-unique-id='loginform-r74f8fbcfc1b71325-s3244191092' data-api-unique-page-name='src/frontend/components/CustomerLogin/LoginForm' />
          </button>
        </div>
      </div>
    </div>;
}