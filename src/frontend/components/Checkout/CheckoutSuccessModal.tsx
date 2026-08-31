"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Package, ArrowRight, ShoppingBag, Receipt, FileCheck } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { SalesOrder } from "@/frontend/types/Checkout";
import { OrderHistory, StorefrontHome } from "@/frontend/route-params";
interface CheckoutSuccessModalProps {
  order: SalesOrder | null;
  isOpen: boolean;
  onClose: () => void;
}
export default function CheckoutSuccessModal({
  order,
  isOpen,
  onClose
}: CheckoutSuccessModalProps) {
  const router = useRouter();
  if (!order) return null;
  const handleNavigateOrders = () => {
    onClose();
    OrderHistory.navigateTo(router);
  };
  const handleNavigateShopping = () => {
    onClose();
    StorefrontHome.navigateTo(router);
  };
  return <Dialog open={isOpen} onOpenChange={open => !open && onClose()} data-api-unique-id='checkoutsuccessmodal-r2edcb65c17ab1722-s1117784253' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutSuccessModal'>
      <DialogContent className="max-h-[calc(100dvh-4rem)] overflow-y-auto sm:max-w-xl p-6 sm:p-8 bg-card text-card-foreground border border-border/50 shadow-md rounded-3xl min-w-0" data-api-unique-id='checkoutsuccessmodal-r9ff2e029dd034e27-s1117784253' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutSuccessModal'>
        <DialogHeader className="text-center sm:text-center space-y-3" data-api-unique-id='checkoutsuccessmodal-rcd4439cbeb1b9a0d-s1117784253' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutSuccessModal'>
          {/* Joyful Block celebration icon */}
          <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-success/10 border border-success/30 flex items-center justify-center shadow-sm" data-api-unique-id='checkoutsuccessmodal-re72011ab3b308bb5-s1117784253' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutSuccessModal'>
            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-success animate-bounce" data-api-unique-id='checkoutsuccessmodal-r76a42c8e43299016-s1117784253' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutSuccessModal' />
          </div>

          <DialogTitle className="font-header text-2xl sm:text-3xl font-extrabold text-foreground" data-api-unique-id='checkoutsuccessmodal-r212c0c7b94f98cea-s1117784253' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutSuccessModal'>
            Toy Order Confirmed!
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto" data-api-unique-id='checkoutsuccessmodal-rd4b2de8b0d004c65-s1117784253' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutSuccessModal'>
            Your simulated checkout completed successfully. We&apos;ve packaged your toy receipt and updated the live inventory.
          </DialogDescription>
        </DialogHeader>

        {/* Order Snapshot Card */}
        <div className="bg-muted text-card-foreground rounded-2xl border border-border/50 p-4 sm:p-5 space-y-4 my-2" data-api-unique-id='checkoutsuccessmodal-r5a62639d6eddc50a-s1117784253' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutSuccessModal'>
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3" data-api-unique-id='checkoutsuccessmodal-r14e670cbbbec43b8-s1117784253' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutSuccessModal'>
            <div className="flex items-center gap-2" data-api-unique-id='checkoutsuccessmodal-r2c9450d4fa8594cb-s1117784253' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutSuccessModal'>
              <Receipt className="w-4 h-4 text-primary" data-api-unique-id='checkoutsuccessmodal-r877479080af95bfa-s1117784253' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutSuccessModal' />
              <span className="text-xs font-bold text-muted-foreground" data-api-unique-id='checkoutsuccessmodal-rbddb0c16e4777d98-s1117784253' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutSuccessModal'>Order Reference</span>
            </div>
            <span className="font-mono text-xs sm:text-sm font-extrabold text-foreground bg-card px-2.5 py-1 rounded-md border border-border" data-api-unique-id='checkoutsuccessmodal-r7db3cb1440603c63-s1117784253' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutSuccessModal'>
              #{order.id.slice(-8).toUpperCase()}
            </span>
          </div>

          {/* Items Summary */}
          <div className="space-y-2.5 max-h-40 overflow-y-auto pr-1" data-api-unique-id='checkoutsuccessmodal-r3555c0423b6eae70-s1117784253' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutSuccessModal'>
            {order.items.map((item, index) => <div key={item.id} className="flex items-center justify-between text-xs sm:text-sm bg-card p-2.5 rounded-xl border border-border" data-api-unique-id='checkoutsuccessmodal-r2295b38c873a5980-s1117784253' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutSuccessModal' data-api-in-loop='1'>
                <div className="min-w-0 flex-1 pr-2" data-api-unique-id='checkoutsuccessmodal-rb0111065c334e477-s1117784253' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutSuccessModal' data-api-in-loop='1'>
                  <span className="font-bold text-foreground block truncate" data-api-unique-id='checkoutsuccessmodal-r5318defc941de232-s1117784253' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutSuccessModal' data-api-in-loop='1' data-api-bind-info={`order.items-${index}-productName`} data-api-map-var-name='item'>
                    {item.productName}
                  </span>
                  <span className="text-muted-foreground text-xs" data-api-unique-id='checkoutsuccessmodal-r87bbe7751b800229-s1117784253' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutSuccessModal' data-api-in-loop='1' data-api-bind-info={`order.items-${index}-quantity`} data-api-map-var-name='item'>
                    Qty: {item.quantity} &times; ${item.unitPriceSnapshot.toFixed(2)}
                  </span>
                </div>
                <span className="font-header font-bold text-primary shrink-0" data-api-unique-id='checkoutsuccessmodal-rd4c2e673ab434f01-s1117784253' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutSuccessModal' data-api-in-loop='1'>
                  ${item.lineSubtotal.toFixed(2)}
                </span>
              </div>)}
          </div>

          {/* Totals Breakdown */}
          <div className="pt-3 border-t border-border space-y-1.5 text-xs sm:text-sm" data-api-unique-id='checkoutsuccessmodal-r23a4f315913147e3-s1117784253' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutSuccessModal'>
            <div className="flex justify-between text-muted-foreground" data-api-unique-id='checkoutsuccessmodal-rb9d700538932b8ab-s1117784253' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutSuccessModal'>
              <span data-api-unique-id='checkoutsuccessmodal-rd588c7c42cb1b9d2-s1117784253' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutSuccessModal'>Items Subtotal</span>
              <span className="font-bold text-foreground" data-api-unique-id='checkoutsuccessmodal-r5cd960b4671b9fcf-s1117784253' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutSuccessModal'>${order.subtotal.toFixed(2)}</span>
            </div>
            {order.discountAmount > 0 && <div className="flex justify-between text-success font-semibold" data-api-unique-id='checkoutsuccessmodal-rf36e0c05f22f5173-s1117784253' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutSuccessModal'>
                <span data-api-unique-id='checkoutsuccessmodal-re4cf62ec67df4734-s1117784253' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutSuccessModal'>Promo Discount ({order.appliedPromoCode || "Applied"})</span>
                <span data-api-unique-id='checkoutsuccessmodal-ra4c3966ab9f59a05-s1117784253' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutSuccessModal'>-${order.discountAmount.toFixed(2)}</span>
              </div>}
            <div className="flex justify-between text-muted-foreground" data-api-unique-id='checkoutsuccessmodal-r4d42e83c4f572710-s1117784253' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutSuccessModal'>
              <span data-api-unique-id='checkoutsuccessmodal-rdb1e5cfc3944a946-s1117784253' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutSuccessModal'>Shipping Fee</span>
              <span className="font-bold text-foreground" data-api-unique-id='checkoutsuccessmodal-rad18d6c3398cf6a3-s1117784253' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutSuccessModal'>
                {order.shippingFee === 0 ? "FREE" : `$${order.shippingFee.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-base sm:text-lg font-extrabold text-foreground pt-2 border-t border-border/60" data-api-unique-id='checkoutsuccessmodal-r65a7cfcade810e71-s1117784253' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutSuccessModal'>
              <span data-api-unique-id='checkoutsuccessmodal-re5bd92ae42f261bd-s1117784253' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutSuccessModal'>Total Paid</span>
              <span className="font-header text-primary font-black" data-api-unique-id='checkoutsuccessmodal-r6c0fa25170dc7026-s1117784253' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutSuccessModal'>
                ${order.totalAmount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Lifecycle Snapshot Explanation */}
        <div className="bg-secondary/60 text-secondary-foreground rounded-xl p-3.5 text-xs space-y-1 border border-border" data-api-unique-id='checkoutsuccessmodal-r86ecff1893de40ab-s1117784253' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutSuccessModal'>
          <div className="flex items-center gap-1.5 font-bold text-foreground" data-api-unique-id='checkoutsuccessmodal-r0a888aa892fcfacb-s1117784253' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutSuccessModal'>
            <FileCheck className="w-4 h-4 text-success" data-api-unique-id='checkoutsuccessmodal-r7fec498ba728b381-s1117784253' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutSuccessModal' />
            <span data-api-unique-id='checkoutsuccessmodal-rf7c7ebb07d2afdab-s1117784253' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutSuccessModal'>State Changes Completed</span>
          </div>
          <p className="text-muted-foreground" data-api-unique-id='checkoutsuccessmodal-rd28e5734725b5c60-s1117784253' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutSuccessModal'>
            &bull; Shopping cart marked <strong className="text-foreground" data-api-unique-id='checkoutsuccessmodal-rec564c1d92164465-s1117784253' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutSuccessModal'>CHECKED_OUT</strong>
            <br data-api-unique-id='checkoutsuccessmodal-rbf0aa6555d16375d-s1117784253' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutSuccessModal' />
            &bull; Warehouse stock count decremented for each purchased toy
            <br data-api-unique-id='checkoutsuccessmodal-re040fbaf3f1d5e1f-s1117784253' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutSuccessModal' />
            &bull; Permanent sales order recorded in customer history
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2" data-api-unique-id='checkoutsuccessmodal-rad0f69b5bbc04dc3-s1117784253' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutSuccessModal'>
          {/* Link to Orders [F06] */}
          <button type="button" onClick={handleNavigateOrders} className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold px-5 py-3.5 rounded-full border border-border/50 shadow-sm hover:shadow-md transition-all text-sm sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer" data-api-unique-id='checkoutsuccessmodal-r47bf94c3c30f0c5f-s1117784253' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutSuccessModal'>
            <Package className="w-4 h-4" data-api-unique-id='checkoutsuccessmodal-re6b023adf9be2600-s1117784253' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutSuccessModal' />
            <span data-api-unique-id='checkoutsuccessmodal-r56a7fe2bad257b74-s1117784253' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutSuccessModal'>View in Order History</span>
            <ArrowRight className="w-4 h-4" data-api-unique-id='checkoutsuccessmodal-r84d4acb48bd6ea73-s1117784253' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutSuccessModal' />
          </button>

          {/* Link to Storefront [F01] */}
          <button type="button" onClick={handleNavigateShopping} className="sm:w-auto inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground font-semibold px-5 py-3.5 rounded-full border border-border/50 hover:bg-muted active:scale-[0.98] transition-all text-sm sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer" data-api-unique-id='checkoutsuccessmodal-r1b61e31f1162f844-s1117784253' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutSuccessModal'>
            <ShoppingBag className="w-4 h-4" data-api-unique-id='checkoutsuccessmodal-r87f45119143807f1-s1117784253' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutSuccessModal' />
            <span data-api-unique-id='checkoutsuccessmodal-r723304a74406b27d-s1117784253' data-api-unique-page-name='src/frontend/components/Checkout/CheckoutSuccessModal'>Continue Shopping</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>;
}