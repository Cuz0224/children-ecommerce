"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, Lock, Eye, EyeOff, Loader2, ArrowRight, AlertCircle } from "lucide-react";
import { adminLogin } from "@/backend/actions/AdminLogin";
import type { AdminLoginCredentials, AdminLoginState } from "@/backend/types/AdminLogin";
import { useAdminSession } from "@/tools/BackendSession";
import { AdminRegister } from "@/backend/route-params";
interface AdminLoginFormProps {
  onSuccessRedirect?: () => void;
}
export default function AdminLoginForm({
  onSuccessRedirect
}: AdminLoginFormProps) {
  const {
    set
  } = useAdminSession();
  const [credentials, setCredentials] = useState<AdminLoginCredentials>({
    username: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [state, setState] = useState<AdminLoginState>({
    isLoading: false,
    errorMessage: null,
    successMessage: null
  });
  const handleChange = (field: keyof AdminLoginCredentials, value: string) => {
    setCredentials(prev => ({
      ...prev,
      [field]: value
    }));
    if (state.errorMessage) {
      setState(prev => ({
        ...prev,
        errorMessage: null
      }));
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedUsername = credentials.username.trim();
    if (!trimmedUsername) {
      setState({
        isLoading: false,
        errorMessage: "Please enter your administrator username.",
        successMessage: null
      });
      return;
    }
    if (!credentials.password) {
      setState({
        isLoading: false,
        errorMessage: "Please enter your account password.",
        successMessage: null
      });
      return;
    }
    setState({
      isLoading: true,
      errorMessage: null,
      successMessage: null
    });
    try {
      const result = await adminLogin({
        username: trimmedUsername,
        password: credentials.password
      });
      set({
        token: result.token,
        user_id: result.userId,
        username: result.username,
        role: result.role === "ADMIN" ? "ADMIN" : "ADMIN"
      });
      setState({
        isLoading: false,
        errorMessage: null,
        successMessage: "Authentication successful. Entering ToyJoy Admin..."
      });
      if (onSuccessRedirect) {
        onSuccessRedirect();
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Authentication failed. Please verify your credentials.";
      setState({
        isLoading: false,
        errorMessage,
        successMessage: null
      });
    }
  };
  return <form onSubmit={handleSubmit} className="space-y-4 w-full" data-api-unique-id='adminloginform-re22f69c5ef7c12d9-s145427608' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm'>
      {/* Error Alert */}
      {state.errorMessage && <div role="alert" className="flex items-start gap-2.5 p-3 rounded-lg bg-destructive/10 text-destructive text-xs leading-relaxed border border-destructive/20 animate-in fade-in" data-api-unique-id='adminloginform-r4e200dbfe0e344c7-s145427608' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm'>
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" data-api-unique-id='adminloginform-rb4ee8f622444d3f3-s145427608' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm' />
          <span className="font-medium" data-api-unique-id='adminloginform-r3a27d276999cc039-s145427608' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm'>{state.errorMessage}</span>
        </div>}

      {/* Success Alert */}
      {state.successMessage && <div role="status" className="flex items-start gap-2.5 p-3 rounded-lg bg-success/10 text-success text-xs leading-relaxed border border-success/20 animate-in fade-in" data-api-unique-id='adminloginform-r294b3be16c38db41-s145427608' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm'>
          <span className="font-medium" data-api-unique-id='adminloginform-r984c42bb69734d84-s145427608' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm'>{state.successMessage}</span>
        </div>}

      {/* Username Field */}
      <div className="space-y-1.5" data-api-unique-id='adminloginform-rda993c681b03e401-s145427608' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm'>
        <label htmlFor="admin-username" className="block text-xs font-semibold text-card-foreground tracking-wide" data-api-unique-id='adminloginform-r9c80170413f5d3a5-s145427608' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm'>
          Username
        </label>
        <div className="relative" data-api-unique-id='adminloginform-rd89fc44d4f5dbbb7-s145427608' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm'>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground" data-api-unique-id='adminloginform-r2aa0e659afc778af-s145427608' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm'>
            <User className="w-4 h-4" data-api-unique-id='adminloginform-r411a311fa9b98476-s145427608' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm' />
          </div>
          <input id="admin-username" name="username" type="text" autoComplete="username" data-auto="account" value={credentials.username} onChange={e => handleChange("username", e.target.value)} disabled={state.isLoading} placeholder="Enter administrator username" className="w-full pl-9 pr-3.5 py-2 text-sm bg-card text-card-foreground border border-input rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent transition-all placeholder:text-muted-foreground/60 disabled:opacity-50" data-api-unique-id='adminloginform-r8d05d45fcd44c0e8-s145427608' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm' />
        </div>
      </div>

      {/* Password Field */}
      <div className="space-y-1.5" data-api-unique-id='adminloginform-reeef41a5b79d1fd6-s145427608' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm'>
        <div className="flex items-center justify-between" data-api-unique-id='adminloginform-rb6c7166c9df085d5-s145427608' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm'>
          <label htmlFor="admin-password" className="block text-xs font-semibold text-card-foreground tracking-wide" data-api-unique-id='adminloginform-rfdbe924a41cf86f5-s145427608' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm'>
            Password
          </label>
        </div>
        <div className="relative" data-api-unique-id='adminloginform-r979ed1bbc3163b8c-s145427608' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm'>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground" data-api-unique-id='adminloginform-r80921c17a432361f-s145427608' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm'>
            <Lock className="w-4 h-4" data-api-unique-id='adminloginform-r1704d3008f124599-s145427608' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm' />
          </div>
          <input id="admin-password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" data-auto="password" value={credentials.password} onChange={e => handleChange("password", e.target.value)} disabled={state.isLoading} placeholder="Enter administrator password" className="w-full pl-9 pr-10 py-2 text-sm bg-card text-card-foreground border border-input rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent transition-all placeholder:text-muted-foreground/60 disabled:opacity-50" data-api-unique-id='adminloginform-r065f3c482f9b785f-s145427608' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm' />
          <button type="button" onClick={() => setShowPassword(!showPassword)} disabled={state.isLoading} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-card-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-r-lg" data-api-unique-id='adminloginform-r7fe7af64de2785bc-s145427608' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm'>
            {showPassword ? <EyeOff className="w-4 h-4" data-api-unique-id='adminloginform-r9cd91cf820ffb348-s145427608' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm' /> : <Eye className="w-4 h-4" data-api-unique-id='adminloginform-rfd0e5eada70a6bc9-s145427608' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm' />}
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <button type="submit" data-auto="submit" disabled={state.isLoading} className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold tracking-wide shadow-sm hover:opacity-95 active:translate-y-0.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer" data-api-unique-id='adminloginform-ra6d77f86c972e5fa-s145427608' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm'>
        {state.isLoading ? <>
            <Loader2 className="w-4 h-4 animate-spin" data-api-unique-id='adminloginform-r8c76a627abc01e85-s145427608' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm' />
            <span data-api-unique-id='adminloginform-r51fa2dcf7537b19b-s145427608' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm'>Authenticating...</span>
          </> : <>
            <span data-api-unique-id='adminloginform-rfbdd5b9b602bdbe0-s145427608' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm'>Sign In to Console</span>
            <ArrowRight className="w-4 h-4" data-api-unique-id='adminloginform-r9a83f2210e3f506f-s145427608' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm' />
          </>}
      </button>

      {/* Registration Link Prompt */}
      <div className="pt-2 text-center" data-api-unique-id='adminloginform-r7e30709415de153f-s145427608' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm'>
        <p className="text-xs text-muted-foreground" data-api-unique-id='adminloginform-r0d9f31726b7a481c-s145427608' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm'>
          Need authorized operator credentials?{" "}
          <Link href={AdminRegister.path} className="font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded px-1 transition-colors" data-api-unique-id='adminloginform-r5debb684b28b5d06-s145427608' data-api-unique-page-name='src/backend/components/AdminLogin/AdminLoginForm'>
            Register Administrator
          </Link>
        </p>
      </div>
    </form>;
}