"use client";

import React, { useState, useMemo } from "react";
import { User, Lock, Eye, EyeOff, ArrowRight, CheckCircle2, AlertCircle, KeyRound, Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { registerAdmin } from "@/backend/actions/AdminRegister";
import { AdminRegisterFormData, PasswordRequirement, PasswordStrength } from "@/backend/types/AdminRegister";
import { useAdminSession } from "@/tools/BackendSession";
interface RegistrationFormProps {
  onSuccess?: (username: string) => void;
  onNavigateToLogin?: () => void;
}
export default function RegistrationForm({
  onSuccess,
  onNavigateToLogin
}: RegistrationFormProps) {
  const {
    set
  } = useAdminSession();
  const [formData, setFormData] = useState<AdminRegisterFormData>({
    username: "",
    password: "",
    confirmPassword: "",
    agreedToSecurityPolicy: true
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Password requirements calculation
  const requirements: PasswordRequirement[] = useMemo(() => {
    const pwd = formData.password;
    return [{
      id: "len",
      label: "At least 8 characters",
      met: pwd.length >= 8
    }, {
      id: "char",
      label: "Letters & numbers mixed",
      met: /[a-zA-Z]/.test(pwd) && /[0-9]/.test(pwd)
    }, {
      id: "special",
      label: "Special character or uppercase",
      met: /[^a-zA-Z0-9]/.test(pwd) || /[A-Z]/.test(pwd)
    }];
  }, [formData.password]);

  // Password strength computation
  const strength: PasswordStrength = useMemo(() => {
    const pwd = formData.password;
    if (!pwd) {
      return {
        score: 0,
        label: "Weak",
        colorClass: "bg-muted",
        progressPercent: 0
      };
    }
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (pwd.length >= 12) score += 1;
    if (/[0-9]/.test(pwd) && /[a-zA-Z]/.test(pwd)) score += 1;
    if (/[^a-zA-Z0-9]/.test(pwd) || /[A-Z]/.test(pwd)) score += 1;
    switch (score) {
      case 1:
        return {
          score: 1,
          label: "Weak",
          colorClass: "bg-destructive",
          progressPercent: 25
        };
      case 2:
        return {
          score: 2,
          label: "Fair",
          colorClass: "bg-warning",
          progressPercent: 50
        };
      case 3:
        return {
          score: 3,
          label: "Good",
          colorClass: "bg-info",
          progressPercent: 75
        };
      case 4:
        return {
          score: 4,
          label: "Strong",
          colorClass: "bg-success",
          progressPercent: 100
        };
      default:
        return {
          score: 0,
          label: "Weak",
          colorClass: "bg-destructive",
          progressPercent: 10
        };
    }
  }, [formData.password]);
  const passwordsMatch = useMemo(() => {
    if (!formData.confirmPassword) return null;
    return formData.password === formData.confirmPassword;
  }, [formData.password, formData.confirmPassword]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Basic Validation
    const cleanUsername = formData.username.trim();
    if (!cleanUsername) {
      setErrorMessage("Please enter an administrator username.");
      toast.error("Username is required");
      return;
    }
    if (cleanUsername.length < 3) {
      setErrorMessage("Administrator username must be at least 3 characters.");
      toast.error("Username too short");
      return;
    }
    if (cleanUsername.length > 255) {
      setErrorMessage("Username cannot exceed 255 characters.");
      toast.error("Username too long");
      return;
    }
    if (formData.password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      toast.error("Password does not meet minimum security requirements");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Password confirmation does not match.");
      toast.error("Passwords do not match");
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await registerAdmin({
        username: cleanUsername,
        password: formData.password
      });

      // Write session state with returned credentials
      set({
        token: result.token,
        user_id: result.userId,
        username: result.username,
        role: "ADMIN"
      });
      toast.success("Administrator account created successfully!", {
        description: `Welcome @${result.username}. Redirecting to Catalog Management...`
      });
      if (onSuccess) {
        onSuccess(result.username);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to register administrator account.";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };
  return <form onSubmit={handleSubmit} className="space-y-4" data-api-unique-id='registrationform-r44704c954e1ab753-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm'>
      {errorMessage && <div className="flex items-center gap-2 rounded-md bg-destructive/10 p-3 text-xs text-destructive border border-destructive/20 animate-in fade-in" data-api-unique-id='registrationform-r73ccdc40553323ad-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm'>
          <AlertCircle className="h-4 w-4 shrink-0" data-api-unique-id='registrationform-rfa8a0ef721652d96-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm' />
          <span className="font-medium" data-api-unique-id='registrationform-rf79af41eab7b2583-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm'>{errorMessage}</span>
        </div>}

      {/* Username Field */}
      <div className="space-y-1.5" data-api-unique-id='registrationform-r0cedcf5bf3c11ff6-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm'>
        <label htmlFor="admin-username" className="block text-xs font-semibold text-foreground" data-api-unique-id='registrationform-r69d55c1f62dea397-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm'>
          Administrator Username <span className="text-destructive" data-api-unique-id='registrationform-r7320fe442b06a2ac-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm'>*</span>
        </label>
        <div className="relative" data-api-unique-id='registrationform-rd07482fab2838eb8-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm'>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground" data-api-unique-id='registrationform-r8ca0b3423538d139-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm'>
            <User className="h-4 w-4" data-api-unique-id='registrationform-r533870ce53840478-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm' />
          </div>
          <input id="admin-username" type="text" required autoComplete="username" placeholder="e.g. toyjoy_lead_admin" maxLength={255} value={formData.username} onChange={e => {
          setFormData({
            ...formData,
            username: e.target.value
          });
          if (errorMessage) setErrorMessage(null);
        }} className="w-full rounded-md border border-input bg-card py-2 pl-9 pr-3 text-sm text-card-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-shadow" data-api-unique-id='registrationform-rcb36a8b991f75727-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm' />
        </div>
        <p className="text-[11px] text-muted-foreground" data-api-unique-id='registrationform-reabdd23115000deb-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm'>
          Unique login identifier for accessing backend inventory and catalog tools.
        </p>
      </div>

      {/* Password Field */}
      <div className="space-y-1.5" data-api-unique-id='registrationform-rb137a4557c9907bb-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm'>
        <label htmlFor="admin-password" className="block text-xs font-semibold text-foreground" data-api-unique-id='registrationform-radb0afee5044bdf4-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm'>
          Master Password <span className="text-destructive" data-api-unique-id='registrationform-rd45ec90cff548ddb-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm'>*</span>
        </label>
        <div className="relative" data-api-unique-id='registrationform-re1e3a70ac5fa0c33-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm'>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground" data-api-unique-id='registrationform-r9d42f702cb304d8f-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm'>
            <KeyRound className="h-4 w-4" data-api-unique-id='registrationform-r2ffe81f6a4187716-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm' />
          </div>
          <input id="admin-password" type={showPassword ? "text" : "password"} required autoComplete="new-password" placeholder="••••••••••••" value={formData.password} onChange={e => {
          setFormData({
            ...formData,
            password: e.target.value
          });
          if (errorMessage) setErrorMessage(null);
        }} className="w-full rounded-md border border-input bg-card py-2 pl-9 pr-10 text-sm text-card-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-shadow font-mono" data-api-unique-id='registrationform-r50c52c225f3f6de9-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm' />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground focus-visible:outline-none" aria-label={showPassword ? "Hide password" : "Show password"} data-api-unique-id='registrationform-rb1cea4a30c9db29c-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm'>
            {showPassword ? <EyeOff className="h-4 w-4" data-api-unique-id='registrationform-rfa501e7295667a6f-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm' /> : <Eye className="h-4 w-4" data-api-unique-id='registrationform-rf5d6380926f8eee4-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm' />}
          </button>
        </div>

        {/* Dynamic Strength Indicator */}
        {formData.password.length > 0 && <div className="space-y-1.5 pt-1 animate-in fade-in" data-api-unique-id='registrationform-r73c9e3d445515ecf-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm'>
            <div className="flex items-center justify-between text-[11px]" data-api-unique-id='registrationform-re2b46a42f30c8ae8-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm'>
              <span className="text-muted-foreground font-medium" data-api-unique-id='registrationform-r6075312730c6aa6f-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm'>Security Strength:</span>
              <span className={`font-semibold ${strength.label === "Strong" ? "text-success" : strength.label === "Good" ? "text-info" : strength.label === "Fair" ? "text-warning" : "text-destructive"}`} data-api-unique-id='registrationform-rdf633c201cdd228d-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm'>
                {strength.label}
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted" data-api-unique-id='registrationform-r1d71ef5e3cc43aba-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm'>
              <div className={`h-full transition-all duration-300 ${strength.colorClass}`} style={{
            width: `${strength.progressPercent}%`
          }} data-api-unique-id='registrationform-r7733be46ead3f94f-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm' />
            </div>
          </div>}

        {/* Requirements Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 pt-1" data-api-unique-id='registrationform-r30f250cbf571b6c0-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm'>
          {requirements.map((req, index) => <div key={req.id} className={`flex items-center gap-1 text-[11px] ${req.met ? "text-success font-medium" : "text-muted-foreground"}`} data-api-unique-id='registrationform-re7fc9bcecce6934c-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm' data-api-in-loop='1'>
              <CheckCircle2 className={`h-3 w-3 shrink-0 ${req.met ? "text-success" : "text-muted-foreground/50"}`} data-api-unique-id='registrationform-r302242209ccfe14e-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm' data-api-in-loop='1' />
              <span className="truncate" data-api-unique-id='registrationform-recdd90c4ceb21d47-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm' data-api-in-loop='1' data-api-bind-info={`requirements-${index}-label`} data-api-map-var-name='req'>{req.label}</span>
            </div>)}
        </div>
      </div>

      {/* Confirm Password Field */}
      <div className="space-y-1.5" data-api-unique-id='registrationform-r58fa264e51979968-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm'>
        <label htmlFor="admin-confirm-password" className="block text-xs font-semibold text-foreground" data-api-unique-id='registrationform-rcf58b6cdd9c50768-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm'>
          Confirm Master Password <span className="text-destructive" data-api-unique-id='registrationform-rab46bbb34a123fb3-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm'>*</span>
        </label>
        <div className="relative" data-api-unique-id='registrationform-rf60645ae51a5e504-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm'>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground" data-api-unique-id='registrationform-ra91daf9f47828b33-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm'>
            <Lock className="h-4 w-4" data-api-unique-id='registrationform-r5c8328e74b0323e3-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm' />
          </div>
          <input id="admin-confirm-password" type={showConfirmPassword ? "text" : "password"} required autoComplete="new-password" placeholder="••••••••••••" value={formData.confirmPassword} onChange={e => {
          setFormData({
            ...formData,
            confirmPassword: e.target.value
          });
          if (errorMessage) setErrorMessage(null);
        }} className={`w-full rounded-md border bg-card py-2 pl-9 pr-10 text-sm text-card-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-shadow font-mono ${passwordsMatch === false ? "border-destructive focus-visible:ring-destructive" : "border-input"}`} data-api-unique-id='registrationform-rc07cc1f7244a7b8d-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm' />
          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground focus-visible:outline-none" aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"} data-api-unique-id='registrationform-r35169b9d02880e5e-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm'>
            {showConfirmPassword ? <EyeOff className="h-4 w-4" data-api-unique-id='registrationform-ra47e5a23c4a757db-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm' /> : <Eye className="h-4 w-4" data-api-unique-id='registrationform-rcff2cb4255efcc81-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm' />}
          </button>
        </div>
        {passwordsMatch === false && <p className="text-[11px] text-destructive flex items-center gap-1 font-medium" data-api-unique-id='registrationform-r6c350222a86fe0d3-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm'>
            <AlertCircle className="h-3 w-3" data-api-unique-id='registrationform-r879d5076be2b9dce-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm' /> Passwords do not match
          </p>}
      </div>

      {/* Fixed Role & Scope Notice (No role selector allowed by contract) */}
      <div className="rounded-md bg-secondary/50 border border-border/80 px-3 py-2 flex items-center justify-between text-xs" data-api-unique-id='registrationform-r6411d84998b13a6e-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm'>
        <div className="flex items-center gap-2" data-api-unique-id='registrationform-r9af1b03a9e816dfa-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm'>
          <ShieldCheck className="h-4 w-4 text-primary shrink-0" data-api-unique-id='registrationform-r8fe14fcf37f75472-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm' />
          <span className="text-secondary-foreground font-medium" data-api-unique-id='registrationform-raecc0a80e95da5a1-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm'>Assigned Authority Level</span>
        </div>
        <span className="inline-flex items-center rounded-full bg-primary text-primary-foreground font-semibold px-2 py-0.5 text-[11px] tracking-wide" data-api-unique-id='registrationform-ra1a9d5fdcbe1f03f-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm'>
          ADMIN
        </span>
      </div>

      {/* Primary Submit Button */}
      <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 rounded-md bg-primary py-2.5 px-4 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transition-all active:translate-y-0.5" data-api-unique-id='registrationform-r337cad170e7bf661-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm'>
        {isSubmitting ? <>
            <Loader2 className="h-4 w-4 animate-spin" data-api-unique-id='registrationform-ra6cc40aee2daeb9a-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm' />
            <span data-api-unique-id='registrationform-r5b4151814e515796-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm'>Issuing Administrator Credentials...</span>
          </> : <>
            <span data-api-unique-id='registrationform-rb561ed2a969cd098-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm'>Create Administrator Account</span>
            <ArrowRight className="h-4 w-4" data-api-unique-id='registrationform-rc097b6ca848463df-s133386508' data-api-unique-page-name='src/backend/components/AdminRegister/RegistrationForm' />
          </>}
      </button>
    </form>;
}