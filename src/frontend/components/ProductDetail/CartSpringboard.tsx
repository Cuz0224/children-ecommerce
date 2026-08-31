"use client";

import React from "react";
import EditableImg from "@/@base/EditableImg";
import { ShoppingCart, UserRole, CATEGORY_LABELS } from "@/frontend/types/ProductDetail";
import { ShoppingBag, ArrowRight, Tag, Truck, Trash2, Plus, Minus, CheckCircle2, Lock, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { StorefrontHome, Checkout } from "@/frontend/route-params";
import { toast } from "sonner";
interface CartSpringboardProps {
  cart: ShoppingCart;
  currentUserRole: UserRole;
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onGuestPrompt: () => void;
}
export default function CartSpringboard({
  cart,
  currentUserRole,
  onUpdateQuantity,
  onRemoveItem,
  onGuestPrompt
}: CartSpringboardProps) {
  const router = useRouter();
  const items = cart.items || [];
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const freeShippingThreshold = 50;
  const isFreeShipping = cart.subtotal >= freeShippingThreshold;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cart.subtotal);
  return <section data-controller-name="Shopping Cart Springboard" className="w-full rounded-3xl border border-border/50 bg-card text-card-foreground p-6 sm:p-10 shadow-md space-y-8" data-api-unique-id='cartspringboard-r0d47068d75bab1df-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>
      {/* Header & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5" data-api-unique-id='cartspringboard-r36af284ba9b9a81b-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>
        <div className="flex items-center gap-3" data-api-unique-id='cartspringboard-r8fb2271fb2d413c8-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground border border-border/50 shadow-sm" data-api-unique-id='cartspringboard-r42dbcbb3f8382663-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>
            <ShoppingBag className="h-6 w-6" data-api-unique-id='cartspringboard-rfbc98095088288b2-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard' />
          </div>
          <div data-api-unique-id='cartspringboard-ra13f579e98f61acd-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground font-display" data-api-unique-id='cartspringboard-r6c39785489226991-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>
              Your Active Toy Chest
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground" data-api-unique-id='cartspringboard-raaf252df80e4957d-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>
              {itemCount > 0 ? `${itemCount} item${itemCount > 1 ? "s" : ""} selected and ready for assembly & shipping` : "Your toy chest is currently waiting for new adventures"}
            </p>
          </div>
        </div>

        {/* Free Shipping Progress Pill */}
        <div className="rounded-xl border border-border/50 bg-muted p-3 min-w-[240px] space-y-1.5 shadow-sm" data-api-unique-id='cartspringboard-rfbc6b87b806a7d0a-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>
          <div className="flex items-center justify-between text-xs font-bold" data-api-unique-id='cartspringboard-r1d4029174d9781f7-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>
            <span className="flex items-center gap-1.5 text-foreground" data-api-unique-id='cartspringboard-r5b1fd678ff9cc1cc-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>
              <Truck className="h-4 w-4 text-primary" data-api-unique-id='cartspringboard-r3a25a0844b46ad09-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard' />
              {isFreeShipping ? "Free Delivery Unlocked!" : "Free Delivery Meter"}
            </span>
            <span className="text-primary font-mono" data-api-unique-id='cartspringboard-re98ec34e414db96b-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>
              {isFreeShipping ? "$0 Shipping" : `$${amountNeededForFreeShipping.toFixed(2)} to go`}
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-secondary overflow-hidden border border-border/40" data-api-unique-id='cartspringboard-r6f65e409222174d7-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>
            <div className="h-full rounded-full bg-success transition-all duration-500" style={{
            width: `${Math.min(100, cart.subtotal / freeShippingThreshold * 100)}%`
          }} data-api-unique-id='cartspringboard-rcd925c0aab9bfa82-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard' />
          </div>
        </div>
      </div>

      {/* Cart Content Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" data-api-unique-id='cartspringboard-rff79410f7a73df90-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-7 space-y-4" data-api-unique-id='cartspringboard-r8ee3ba108f785b21-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>
          {items.length === 0 ? <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-8 text-center space-y-3" data-api-unique-id='cartspringboard-rb399c3d8cfd9df3e-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground" data-api-unique-id='cartspringboard-r2161bf45975ca1bb-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>
                <ShoppingBag className="h-7 w-7" data-api-unique-id='cartspringboard-r53860e06f4438a97-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard' />
              </div>
              <h3 className="text-base font-bold text-foreground" data-api-unique-id='cartspringboard-r8843fe5f9a04bd37-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>
                Your toy chest is empty
              </h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto" data-api-unique-id='cartspringboard-r14f385ded3e86db6-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>
                Add products above to see real-time subtotal calculations, applied promo savings, and instant checkout reviews.
              </p>
            </div> : <div className="space-y-3" data-api-unique-id='cartspringboard-rc04997fe2fae90ce-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>
              {items.map((item, index) => <div key={item.id} className="rounded-2xl border border-border/50 bg-card text-card-foreground p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:border-border" data-api-unique-id='cartspringboard-r78616b2da70ea6f3-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard' data-api-in-loop='1'>
                  {/* Thumbnail & Title */}
                  <div className="flex items-center gap-3.5 min-w-0 flex-1" data-api-unique-id='cartspringboard-r1654db0ed40ff657-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard' data-api-in-loop='1'>
                    <div className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-xl border border-border/50 overflow-hidden bg-muted" data-api-unique-id='cartspringboard-r03ef7f77c4ad6913-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard' data-api-in-loop='1'>
                      <EditableImg propKey={`cart-thumb-${item.product.id}`} alt={item.product.name} src={item.product.productImage || undefined} className="w-full h-full object-cover" data-api-unique-id='cartspringboard-r3d2867a3df16b9d7-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard' data-api-in-loop='1' />
                    </div>
                    <div className="min-w-0 space-y-1" data-api-unique-id='cartspringboard-rff1f6ee36dad561b-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard' data-api-in-loop='1'>
                      <div className="flex items-center gap-2" data-api-unique-id='cartspringboard-rabbd5fa82de63137-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard' data-api-in-loop='1'>
                        <span className="inline-block rounded-full bg-secondary text-secondary-foreground text-[10px] font-bold px-2 py-0.5 border border-border truncate" data-api-unique-id='cartspringboard-r7e5e5267942c24a9-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard' data-api-in-loop='1'>
                          {CATEGORY_LABELS[item.product.category] || item.product.category}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-mono" data-api-unique-id='cartspringboard-r92977815021f2141-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard' data-api-in-loop='1' data-api-bind-info={`items-${index}-product.sku`} data-api-map-var-name='item'>
                          {item.product.sku}
                        </span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-foreground font-display truncate" data-api-unique-id='cartspringboard-r5b04fe97065987d1-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard' data-api-in-loop='1' data-api-bind-info={`items-${index}-product.name`} data-api-map-var-name='item'>
                        {item.product.name}
                      </h4>
                      <p className="text-xs font-bold text-primary font-mono" data-api-unique-id='cartspringboard-r53db06aa31ec3a9a-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard' data-api-in-loop='1'>
                        ${item.product.unitPrice.toFixed(2)} each
                      </p>
                    </div>
                  </div>

                  {/* Quantity Stepper & Price Total */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-border/40" data-api-unique-id='cartspringboard-ra14d0dd2b95841bd-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard' data-api-in-loop='1'>
                    {/* Stepper */}
                    <div className="flex items-center rounded-full border border-border/50 bg-muted p-1 shadow-sm" data-api-unique-id='cartspringboard-rc4d0c8f9c49a3969-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard' data-api-in-loop='1'>
                      <button type="button" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="flex h-7 w-7 items-center justify-center rounded-full bg-card text-card-foreground border border-border hover:bg-secondary text-xs active:scale-95 transition-all" aria-label="Decrease quantity" data-api-unique-id='cartspringboard-rdcc20cf065d6e6be-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard' data-api-in-loop='1'>
                        <Minus className="h-3 w-3" data-api-unique-id='cartspringboard-r26bb30788a18300e-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard' data-api-in-loop='1' />
                      </button>
                      <span className="w-8 text-center text-xs font-bold font-mono" data-api-unique-id='cartspringboard-r9a72d43f1ee2b836-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard' data-api-in-loop='1' data-api-bind-info={`items-${index}-quantity`} data-api-map-var-name='item'>
                        {item.quantity}
                      </span>
                      <button type="button" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="flex h-7 w-7 items-center justify-center rounded-full bg-card text-card-foreground border border-border hover:bg-secondary text-xs active:scale-95 transition-all" aria-label="Increase quantity" data-api-unique-id='cartspringboard-rf8bf8eb9baa4d0e2-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard' data-api-in-loop='1'>
                        <Plus className="h-3 w-3" data-api-unique-id='cartspringboard-r51fdd2bf1169187c-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard' data-api-in-loop='1' />
                      </button>
                    </div>

                    {/* Total for item line */}
                    <div className="text-right min-w-[70px]" data-api-unique-id='cartspringboard-r3be1a448bf0d7f17-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard' data-api-in-loop='1'>
                      <span className="text-base font-black text-foreground font-display" data-api-unique-id='cartspringboard-rc8f15927b022c148-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard' data-api-in-loop='1'>
                        ${(item.product.unitPrice * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    {/* Delete button */}
                    <button type="button" onClick={() => {
                onRemoveItem(item.id);
                toast("Item removed from your Toy Chest.");
              }} className="p-1.5 rounded-full text-muted-foreground hover:text-destructive hover:bg-muted transition-colors" aria-label="Remove item" data-api-unique-id='cartspringboard-rd540a4f1d08a413d-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard' data-api-in-loop='1'>
                      <Trash2 className="h-4 w-4" data-api-unique-id='cartspringboard-r06ea0605735b7d6a-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard' data-api-in-loop='1' />
                    </button>
                  </div>
                </div>)}
            </div>}
        </div>

        {/* Right Column: Order Summary Card & Checkout Trigger */}
        <div className="lg:col-span-5 flex flex-col gap-4" data-api-unique-id='cartspringboard-r417bee89cf7aecc2-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>
          <div className="rounded-2xl border border-border/50 bg-muted/40 p-6 shadow-md space-y-5" data-api-unique-id='cartspringboard-r509265031e512943-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>
            <h3 className="text-lg font-extrabold text-foreground font-display pb-2 border-b border-border/80 flex items-center justify-between" data-api-unique-id='cartspringboard-rc57d1cc2b466b118-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>
              <span data-api-unique-id='cartspringboard-r84ac6c0f1503ba01-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>Toy Chest Summary</span>
              <span className="text-xs font-bold text-muted-foreground" data-api-unique-id='cartspringboard-r4cb77b016b841b91-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>
                {items.length} Distinct Toy{items.length !== 1 ? "s" : ""}
              </span>
            </h3>

            {/* Price Calculations */}
            <div className="space-y-3 text-sm" data-api-unique-id='cartspringboard-r241171a811eb34d5-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>
              <div className="flex justify-between text-muted-foreground" data-api-unique-id='cartspringboard-r63d93204e58723a4-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>
                <span data-api-unique-id='cartspringboard-r17bf412abe0553ba-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>Items Subtotal</span>
                <span className="font-bold text-foreground font-mono" data-api-unique-id='cartspringboard-rc596d1fcd37ac14e-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>
                  ${cart.subtotal.toFixed(2)}
                </span>
              </div>

              {cart.discountAmount > 0 && <div className="flex justify-between text-success font-medium" data-api-unique-id='cartspringboard-r92b637b46eb9c783-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>
                  <span className="flex items-center gap-1.5" data-api-unique-id='cartspringboard-r1603bef496b324cc-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>
                    <Tag className="h-4 w-4" data-api-unique-id='cartspringboard-rdd36cbf80877602a-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard' />
                    {cart.appliedPromo?.description || "Applied Promo Savings"}
                  </span>
                  <span className="font-bold font-mono" data-api-unique-id='cartspringboard-rf93aa7fac146cf22-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>
                    -${cart.discountAmount.toFixed(2)}
                  </span>
                </div>}

              <div className="flex justify-between text-muted-foreground" data-api-unique-id='cartspringboard-r1dc337de4fdcba55-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>
                <span data-api-unique-id='cartspringboard-rf856a773e323b22a-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>Standard Delivery</span>
                <span className="font-bold text-foreground font-mono" data-api-unique-id='cartspringboard-ra2a096c34225c779-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>
                  {cart.shippingFee === 0 ? <span className="text-success font-bold" data-api-unique-id='cartspringboard-r963861e3580a1ab2-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>FREE</span> : `$${cart.shippingFee.toFixed(2)}`}
                </span>
              </div>

              <div className="border-t border-border pt-3 flex justify-between items-baseline" data-api-unique-id='cartspringboard-r30732025f5c06e38-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>
                <span className="text-base font-extrabold text-foreground font-display" data-api-unique-id='cartspringboard-rc0c5bdc838cd7f07-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>
                  Total Investment
                </span>
                <span className="text-2xl font-black text-primary font-display" data-api-unique-id='cartspringboard-r0b31217a08591ff4-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>
                  ${cart.totalAmount.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Promo Code Applied Tag */}
            {cart.appliedPromo && <div className="rounded-xl border border-success/40 bg-success/10 p-3 flex items-center justify-between text-xs" data-api-unique-id='cartspringboard-rdb9b956f4d3f28db-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>
                <div className="flex items-center gap-2 text-success font-bold" data-api-unique-id='cartspringboard-r8948ce0bcf0b0847-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>
                  <CheckCircle2 className="h-4 w-4 shrink-0" data-api-unique-id='cartspringboard-r459125365c310b93-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard' />
                  <span data-api-unique-id='cartspringboard-r2db89d06e383fab8-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>
                    Promo <strong data-api-unique-id='cartspringboard-r1323a97c04718a6f-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>{cart.appliedPromo.code}</strong> Applied (-{cart.appliedPromo.discountValue}{cart.appliedPromo.discountType === "PERCENT" ? "%" : ""})
                  </span>
                </div>
                <span className="text-success font-bold font-mono" data-api-unique-id='cartspringboard-r789f93143eae055d-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>
                  Saved ${cart.discountAmount.toFixed(2)}
                </span>
              </div>}

            {/* Interactive Action Buttons */}
            <div className="space-y-3 pt-2" data-api-unique-id='cartspringboard-r55913946f94cb4b7-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>
              {currentUserRole === "GUEST" ? <button type="button" onClick={onGuestPrompt} className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground font-extrabold text-base py-3.5 px-6 border border-border/50 shadow-md transition-all" data-api-unique-id='cartspringboard-rbefa96385c6d2a12-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>
                  <Lock className="h-5 w-5" data-api-unique-id='cartspringboard-r766c38d884cc1876-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard' />
                  <span data-api-unique-id='cartspringboard-r28e618982983791e-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>Sign In to Checkout</span>
                </button> : <button type="button" onClick={() => Checkout.navigateTo(router)} className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground font-extrabold text-base py-3.5 px-6 border border-border/50 shadow-md transition-all" data-api-unique-id='cartspringboard-r18d1d46e1629c76d-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>
                  <span data-api-unique-id='cartspringboard-r5fe5f38d1cba57ca-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>Proceed to Checkout</span>
                  <ArrowRight className="h-5 w-5" data-api-unique-id='cartspringboard-r6923dc9de3352a03-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard' />
                </button>}

              <button type="button" onClick={() => StorefrontHome.navigateTo(router)} className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-secondary text-secondary-foreground font-bold text-sm py-3 px-5 border border-border/50 shadow-sm hover:bg-muted active:scale-[0.98] transition-all" data-api-unique-id='cartspringboard-rdf1fab737a8c0acc-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>
                <ArrowLeft className="h-4 w-4" data-api-unique-id='cartspringboard-ref1c08bb0ca08745-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard' />
                <span data-api-unique-id='cartspringboard-rb11a6f5a39494938-s46311948' data-api-unique-page-name='src/frontend/components/ProductDetail/CartSpringboard'>Continue Toy Shopping</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>;
}