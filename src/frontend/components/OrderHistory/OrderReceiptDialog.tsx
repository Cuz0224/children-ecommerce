"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ShieldCheck, CheckCircle2, Tag, Printer, Sparkles } from "lucide-react";
import { SalesOrderSnapshot } from "@/frontend/types/OrderHistory";
interface OrderReceiptDialogProps {
  order: SalesOrderSnapshot | null;
  isOpen: boolean;
  onClose: () => void;
}
export default function OrderReceiptDialog({
  order,
  isOpen,
  onClose
}: OrderReceiptDialogProps) {
  if (!order) return null;
  const createdAtDate = order.createdAt instanceof Date ? order.createdAt : typeof order.createdAt === "string" ? new Date(order.createdAt) : null;
  const formattedDate = createdAtDate ? createdAtDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }) : "";
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };
  return <Dialog open={isOpen} onOpenChange={open => !open && onClose()} data-api-unique-id='orderreceiptdialog-rb302210f127e5f38-s3171165371' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderReceiptDialog'>
      <DialogContent className="max-h-[calc(100dvh-4rem)] overflow-y-auto sm:max-w-xl bg-card text-card-foreground border border-border/50 p-6 rounded-2xl shadow-md" data-api-unique-id='orderreceiptdialog-r8901fca854e955ce-s3171165371' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderReceiptDialog'>
        <DialogHeader className="space-y-2 border-b border-border pb-4 text-left" data-api-unique-id='orderreceiptdialog-r1fa7602bbe670358-s3171165371' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderReceiptDialog'>
          <div className="flex items-center justify-between gap-2" data-api-unique-id='orderreceiptdialog-r9b6a2f45fff34f13-s3171165371' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderReceiptDialog'>
            <div className="flex items-center gap-2" data-api-unique-id='orderreceiptdialog-rcf8b119af3ff10cb-s3171165371' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderReceiptDialog'>
              <span className="h-8 w-8 rounded-lg bg-primary text-primary-foreground font-display font-extrabold flex items-center justify-center text-sm shadow-sm" data-api-unique-id='orderreceiptdialog-ra40e010935130164-s3171165371' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderReceiptDialog'>
                TJ
              </span>
              <DialogTitle className="font-display font-extrabold text-xl sm:text-2xl text-card-foreground" data-api-unique-id='orderreceiptdialog-r53ec85ce921e5df6-s3171165371' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderReceiptDialog'>
                Toy Joy Parcel Receipt
              </DialogTitle>
            </div>
            <span className="bg-success text-success-foreground font-bold text-xs px-3 py-1 rounded-full shadow-sm inline-flex items-center gap-1 shrink-0" data-api-unique-id='orderreceiptdialog-r2dc2af6d2fff6305-s3171165371' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderReceiptDialog'>
              <CheckCircle2 className="h-3.5 w-3.5" data-api-unique-id='orderreceiptdialog-r69df4a33e1ed03dd-s3171165371' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderReceiptDialog' />
              <span data-api-unique-id='orderreceiptdialog-r2eed4a70b35138c4-s3171165371' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderReceiptDialog'>COMPLETED</span>
            </span>
          </div>
          <DialogDescription className="text-xs text-muted-foreground font-body" data-api-unique-id='orderreceiptdialog-r70c8cc5bc10ae579-s3171165371' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderReceiptDialog'>
            Order Reference: <strong className="text-card-foreground font-bold" data-api-unique-id='orderreceiptdialog-r27e0e3067ce41d6d-s3171165371' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderReceiptDialog'>{order.orderNumber}</strong> • Recorded {formattedDate}
          </DialogDescription>
        </DialogHeader>

        {/* Snapshot Security Note */}
        <div className="bg-muted text-muted-foreground p-3.5 rounded-xl border border-border text-xs flex items-start gap-2.5 my-2" data-api-unique-id='orderreceiptdialog-r711ab8b21243dd2b-s3171165371' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderReceiptDialog'>
          <ShieldCheck className="h-4 w-4 text-accent shrink-0 mt-0.5" data-api-unique-id='orderreceiptdialog-r9da13fd2186d714b-s3171165371' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderReceiptDialog' />
          <p className="leading-relaxed" data-api-unique-id='orderreceiptdialog-r6b0552c29d13cb30-s3171165371' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderReceiptDialog'>
            <strong className="text-foreground" data-api-unique-id='orderreceiptdialog-rc725f86549966d8e-s3171165371' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderReceiptDialog'>Snapshot Locked:</strong> This receipt reflects exact immutable product prices and applied discounts at the time of checkout.
          </p>
        </div>

        {/* Itemized Snapshot Table */}
        <div className="space-y-3 my-2" data-api-unique-id='orderreceiptdialog-re6eef515d4d9a4e2-s3171165371' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderReceiptDialog'>
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground" data-api-unique-id='orderreceiptdialog-r96076057f4dabbeb-s3171165371' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderReceiptDialog'>
            Toy Items ({order.itemCount})
          </p>
          <div className="divide-y divide-border border-y border-border" data-api-unique-id='orderreceiptdialog-r676bc83da1ba5886-s3171165371' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderReceiptDialog'>
            {order.items.map((item, index) => <div key={item.id} className="py-2.5 flex items-center justify-between gap-3 text-xs" data-api-unique-id='orderreceiptdialog-r48e19e7ef8822db3-s3171165371' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderReceiptDialog' data-api-in-loop='1'>
                <div className="min-w-0 flex-1" data-api-unique-id='orderreceiptdialog-r2a3f482cc7023479-s3171165371' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderReceiptDialog' data-api-in-loop='1'>
                  <p className="font-bold text-card-foreground line-clamp-1" data-api-unique-id='orderreceiptdialog-r77b10e128cd7f1f6-s3171165371' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderReceiptDialog' data-api-in-loop='1' data-api-bind-info={`order.items-${index}-productName`} data-api-map-var-name='item'>{item.productName}</p>
                  <p className="text-muted-foreground text-[11px]" data-api-unique-id='orderreceiptdialog-r735f01f46aad621d-s3171165371' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderReceiptDialog' data-api-in-loop='1' data-api-bind-info={`order.items-${index}-quantity`} data-api-map-var-name='item'>
                    ${item.unitPriceSnapshot.toFixed(2)} × {item.quantity}
                  </p>
                </div>
                <div className="font-extrabold text-card-foreground font-display text-sm shrink-0" data-api-unique-id='orderreceiptdialog-r28767a18761a6502-s3171165371' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderReceiptDialog' data-api-in-loop='1'>
                  ${item.lineSubtotal.toFixed(2)}
                </div>
              </div>)}
          </div>
        </div>

        {/* Totals Summary */}
        <div className="bg-muted/50 p-4 rounded-xl border border-border/50 space-y-2 text-xs" data-api-unique-id='orderreceiptdialog-r94c07a5f863a2709-s3171165371' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderReceiptDialog'>
          <div className="flex justify-between text-muted-foreground" data-api-unique-id='orderreceiptdialog-r90ac061cf67d5046-s3171165371' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderReceiptDialog'>
            <span data-api-unique-id='orderreceiptdialog-r1d8971c2bcf55168-s3171165371' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderReceiptDialog'>Subtotal</span>
            <span className="font-semibold text-card-foreground" data-api-unique-id='orderreceiptdialog-r9e5ae3865387e928-s3171165371' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderReceiptDialog'>${order.subtotal.toFixed(2)}</span>
          </div>

          {order.discountAmount > 0 && <div className="flex items-center justify-between text-success" data-api-unique-id='orderreceiptdialog-rfe9e38f6d646ad12-s3171165371' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderReceiptDialog'>
              <span className="inline-flex items-center gap-1" data-api-unique-id='orderreceiptdialog-rc8e9f8e4b33cb5c9-s3171165371' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderReceiptDialog'>
                <Tag className="h-3 w-3" data-api-unique-id='orderreceiptdialog-ref478890098cb34a-s3171165371' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderReceiptDialog' />
                <span data-api-unique-id='orderreceiptdialog-r7f50fe64590997fc-s3171165371' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderReceiptDialog'>Promo Discount ({order.appliedPromoCode || "PROMO"})</span>
              </span>
              <span className="font-bold" data-api-unique-id='orderreceiptdialog-r4ba926849b29c661-s3171165371' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderReceiptDialog'>-${order.discountAmount.toFixed(2)}</span>
            </div>}

          <div className="flex justify-between text-muted-foreground" data-api-unique-id='orderreceiptdialog-r256efa8ebc2c02d8-s3171165371' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderReceiptDialog'>
            <span data-api-unique-id='orderreceiptdialog-rc488912da7f48f79-s3171165371' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderReceiptDialog'>Shipping & Handling</span>
            <span className="font-semibold text-card-foreground" data-api-unique-id='orderreceiptdialog-r8d7b32c67fc0ecf9-s3171165371' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderReceiptDialog'>
              {order.shippingFee === 0 ? "FREE" : `$${order.shippingFee.toFixed(2)}`}
            </span>
          </div>

          <div className="border-t border-border pt-2 flex items-baseline justify-between text-sm" data-api-unique-id='orderreceiptdialog-r6a714f39f6e2edd6-s3171165371' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderReceiptDialog'>
            <span className="font-bold text-card-foreground" data-api-unique-id='orderreceiptdialog-r800a5e0216f04b26-s3171165371' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderReceiptDialog'>Total Paid Amount</span>
            <span className="font-extrabold font-display text-xl text-primary" data-api-unique-id='orderreceiptdialog-r47eae916b72b385f-s3171165371' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderReceiptDialog'>
              ${order.totalAmount.toFixed(2)}
            </span>
          </div>
        </div>

        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between items-center gap-3 pt-2" data-api-unique-id='orderreceiptdialog-r0510b5dde1649595-s3171165371' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderReceiptDialog'>
          <div className="text-[11px] text-muted-foreground flex items-center gap-1.5" data-api-unique-id='orderreceiptdialog-r29d7ae50d114f944-s3171165371' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderReceiptDialog'>
            <Sparkles className="h-3.5 w-3.5 text-accent" data-api-unique-id='orderreceiptdialog-r3f3ea2dddf61efc2-s3171165371' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderReceiptDialog' />
            <span data-api-unique-id='orderreceiptdialog-rb0f554c829109aa9-s3171165371' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderReceiptDialog'>ToyJoy Children&apos;s Toy Store</span>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto" data-api-unique-id='orderreceiptdialog-r9e705905b4bd98c9-s3171165371' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderReceiptDialog'>
            <button type="button" onClick={handlePrint} className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full border border-border/50 bg-secondary text-secondary-foreground font-bold text-xs hover:bg-muted transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='orderreceiptdialog-r727d6a8f5bc78eda-s3171165371' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderReceiptDialog'>
              <Printer className="h-3.5 w-3.5" data-api-unique-id='orderreceiptdialog-r76fa904b93b09d3a-s3171165371' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderReceiptDialog' />
              <span data-api-unique-id='orderreceiptdialog-rf0c6026b7634a10a-s3171165371' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderReceiptDialog'>Print Slip</span>
            </button>
            <button type="button" onClick={onClose} className="inline-flex items-center justify-center px-5 py-2 rounded-full border border-border/50 bg-primary text-primary-foreground font-bold text-xs shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" data-api-unique-id='orderreceiptdialog-rd9fda3040e7baf6b-s3171165371' data-api-unique-page-name='src/frontend/components/OrderHistory/OrderReceiptDialog'>
              Close
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>;
}