"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Sparkles, Lock, CheckCircle2 } from "lucide-react";
interface GuestSignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSimulateLogin?: () => void;
}
export default function GuestSignInModal({
  isOpen,
  onClose,
  onSimulateLogin
}: GuestSignInModalProps) {
  return <Dialog open={isOpen} onOpenChange={onClose} data-api-unique-id='guestsigninmodal-rd34967470017f17d-s2318012089' data-api-unique-page-name='src/frontend/components/ProductDetail/GuestSignInModal'>
      <DialogContent className="max-h-[calc(100dvh-4rem)] overflow-y-auto sm:max-w-md border border-border/50 bg-card text-card-foreground p-6 sm:p-7 shadow-md rounded-3xl" data-api-unique-id='guestsigninmodal-r97528f4c23d235b5-s2318012089' data-api-unique-page-name='src/frontend/components/ProductDetail/GuestSignInModal'>
        <DialogHeader className="space-y-3 text-center sm:text-left" data-api-unique-id='guestsigninmodal-r867c175dde110b0a-s2318012089' data-api-unique-page-name='src/frontend/components/ProductDetail/GuestSignInModal'>
          <div className="mx-auto sm:mx-0 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground border border-border/50 shadow-sm" data-api-unique-id='guestsigninmodal-r00148267b94b8e2b-s2318012089' data-api-unique-page-name='src/frontend/components/ProductDetail/GuestSignInModal'>
            <Lock className="h-6 w-6" data-api-unique-id='guestsigninmodal-r46f64ba4f27a60f5-s2318012089' data-api-unique-page-name='src/frontend/components/ProductDetail/GuestSignInModal' />
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-extrabold text-foreground font-display" data-api-unique-id='guestsigninmodal-r02fa8c8a76be6b22-s2318012089' data-api-unique-page-name='src/frontend/components/ProductDetail/GuestSignInModal'>
            Sign In to Build Your Toy Chest
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed" data-api-unique-id='guestsigninmodal-r4523bddf757cda86-s2318012089' data-api-unique-page-name='src/frontend/components/ProductDetail/GuestSignInModal'>
            As a guest visitor, you can explore all product details and safety tests. To create a persistent active cart and save your toy selections across visits, please sign in to your ToyJoy account.
          </DialogDescription>
        </DialogHeader>

        {/* Benefits Checklist */}
        <div className="my-4 rounded-2xl border border-border bg-muted/60 p-4 space-y-2.5" data-api-unique-id='guestsigninmodal-r077f095447ffe62a-s2318012089' data-api-unique-page-name='src/frontend/components/ProductDetail/GuestSignInModal'>
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-foreground font-medium" data-api-unique-id='guestsigninmodal-r27084df5f06b978d-s2318012089' data-api-unique-page-name='src/frontend/components/ProductDetail/GuestSignInModal'>
            <CheckCircle2 className="h-4 w-4 text-success shrink-0" data-api-unique-id='guestsigninmodal-r571ebc6a2e6b11f0-s2318012089' data-api-unique-page-name='src/frontend/components/ProductDetail/GuestSignInModal' />
            <span data-api-unique-id='guestsigninmodal-rc669a009233409de-s2318012089' data-api-unique-page-name='src/frontend/components/ProductDetail/GuestSignInModal'>Persistent cloud toy box synced on phone & desktop</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-foreground font-medium" data-api-unique-id='guestsigninmodal-r8d8ce0c014db73e9-s2318012089' data-api-unique-page-name='src/frontend/components/ProductDetail/GuestSignInModal'>
            <CheckCircle2 className="h-4 w-4 text-success shrink-0" data-api-unique-id='guestsigninmodal-r7a9cc37e24690a64-s2318012089' data-api-unique-page-name='src/frontend/components/ProductDetail/GuestSignInModal' />
            <span data-api-unique-id='guestsigninmodal-rcc8261f5ad10ec08-s2318012089' data-api-unique-page-name='src/frontend/components/ProductDetail/GuestSignInModal'>Auto-applied 10% welcome coupon (TOYJOY10)</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-foreground font-medium" data-api-unique-id='guestsigninmodal-re4c2bba59d468adb-s2318012089' data-api-unique-page-name='src/frontend/components/ProductDetail/GuestSignInModal'>
            <CheckCircle2 className="h-4 w-4 text-success shrink-0" data-api-unique-id='guestsigninmodal-rc8ff1b9ba44c729c-s2318012089' data-api-unique-page-name='src/frontend/components/ProductDetail/GuestSignInModal' />
            <span data-api-unique-id='guestsigninmodal-r59f0456d544b5753-s2318012089' data-api-unique-page-name='src/frontend/components/ProductDetail/GuestSignInModal'>Instant order tracking and delivery progress</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2" data-api-unique-id='guestsigninmodal-ra951424089c2540b-s2318012089' data-api-unique-page-name='src/frontend/components/ProductDetail/GuestSignInModal'>
          {onSimulateLogin && <button type="button" onClick={() => {
          onSimulateLogin();
          onClose();
        }} className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground font-extrabold text-sm py-3.5 px-6 border border-border/50 shadow-md transition-all" data-api-unique-id='guestsigninmodal-r600b12e24a8adec4-s2318012089' data-api-unique-page-name='src/frontend/components/ProductDetail/GuestSignInModal'>
              <Sparkles className="h-4 w-4" data-api-unique-id='guestsigninmodal-r6cb4df01007c665d-s2318012089' data-api-unique-page-name='src/frontend/components/ProductDetail/GuestSignInModal' />
              <span data-api-unique-id='guestsigninmodal-rb2cb6bcced502ded-s2318012089' data-api-unique-page-name='src/frontend/components/ProductDetail/GuestSignInModal'>Sign In as Customer</span>
            </button>}

          <button type="button" onClick={onClose} className="w-full inline-flex items-center justify-center rounded-full bg-secondary text-secondary-foreground font-bold text-xs py-2.5 px-4 border border-border hover:bg-muted transition-all" data-api-unique-id='guestsigninmodal-r0fbce283ba64eac6-s2318012089' data-api-unique-page-name='src/frontend/components/ProductDetail/GuestSignInModal'>
            Continue Browsing as Guest
          </button>
        </div>
      </DialogContent>
    </Dialog>;
}