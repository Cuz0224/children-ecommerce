"use client";

import React from "react";
import EditableImg from "@/@base/EditableImg";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { AlertTriangle, Trash2 } from "lucide-react";
import type { ToyProductItem } from "@/backend/types/ProductCatalogAdmin";
interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  product: ToyProductItem | null;
}
export default function DeleteConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  product
}: DeleteConfirmDialogProps) {
  if (!product) return null;
  return <Dialog open={isOpen} onOpenChange={open => !open && onClose()} data-api-unique-id='deleteconfirmdialog-r11c920cd6b7cf9bc-s3703800611' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/DeleteConfirmDialog'>
      <DialogContent className="max-h-[calc(100dvh-4rem)] overflow-y-auto sm:max-w-md rounded-2xl border border-border/50 shadow-md bg-card text-card-foreground p-6" data-api-unique-id='deleteconfirmdialog-r0a4858d9aed90db7-s3703800611' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/DeleteConfirmDialog'>
        <DialogHeader className="border-b border-border/70 pb-4" data-api-unique-id='deleteconfirmdialog-r5bfd78bf641d678a-s3703800611' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/DeleteConfirmDialog'>
          <div className="flex items-center gap-2.5" data-api-unique-id='deleteconfirmdialog-rad7c3686710cbc4d-s3703800611' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/DeleteConfirmDialog'>
            <span className="w-9 h-9 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center border border-destructive/30 shrink-0" data-api-unique-id='deleteconfirmdialog-r24b09260c3e9965f-s3703800611' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/DeleteConfirmDialog'>
              <AlertTriangle className="w-5 h-5" data-api-unique-id='deleteconfirmdialog-ra68f7e8f6ad81906-s3703800611' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/DeleteConfirmDialog' />
            </span>
            <div data-api-unique-id='deleteconfirmdialog-r1dba2060255f5223-s3703800611' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/DeleteConfirmDialog'>
              <DialogTitle className="font-display font-bold text-lg text-card-foreground" data-api-unique-id='deleteconfirmdialog-r23e1ed3c7a6ae46a-s3703800611' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/DeleteConfirmDialog'>
                Delist Toy From Catalog?
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground mt-0.5" data-api-unique-id='deleteconfirmdialog-rb0fcd06f53a4aa60-s3703800611' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/DeleteConfirmDialog'>
                This action will mark the status as REMOVED and delist it from the live storefront catalog.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Product Details Snapshot */}
        <div className="flex items-center gap-3.5 p-3.5 my-2 rounded-xl border border-border/50 bg-muted/40" data-api-unique-id='deleteconfirmdialog-reb8e9a99b9c86eaf-s3703800611' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/DeleteConfirmDialog'>
          <div className="w-14 h-14 rounded-lg border border-border overflow-hidden shrink-0 bg-background" data-api-unique-id='deleteconfirmdialog-r4bc4ffe274a8c204-s3703800611' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/DeleteConfirmDialog'>
            <EditableImg propKey={`toy-del-${product.id}`} src={product.productImage ?? undefined} alt={product.name} className="w-full h-full object-cover" data-api-unique-id='deleteconfirmdialog-re4afe58db81b7ef2-s3703800611' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/DeleteConfirmDialog' />
          </div>
          <div className="min-w-0 flex-1" data-api-unique-id='deleteconfirmdialog-r7ebc46bc25735d5f-s3703800611' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/DeleteConfirmDialog'>
            <div className="flex items-center gap-2" data-api-unique-id='deleteconfirmdialog-rd8ffa9a222637691-s3703800611' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/DeleteConfirmDialog'>
              <h4 className="font-display font-bold text-sm text-card-foreground truncate" data-api-unique-id='deleteconfirmdialog-rcea060280f839c89-s3703800611' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/DeleteConfirmDialog'>
                {product.name}
              </h4>
              <span className={`inline-flex shrink-0 whitespace-nowrap items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${product.storefrontStatus === "LIVE" ? "bg-success/15 text-success border-success/40" : "bg-accent/15 text-accent-foreground border-border"}`} data-api-unique-id='deleteconfirmdialog-r6fcea58388d4759d-s3703800611' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/DeleteConfirmDialog'>
                Status: {product.storefrontStatus}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1" data-api-unique-id='deleteconfirmdialog-rf7fdb29d8a9862d9-s3703800611' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/DeleteConfirmDialog'>
              <span className="text-[11px] font-mono font-bold text-muted-foreground bg-secondary px-2 py-0.5 rounded border border-border" data-api-unique-id='deleteconfirmdialog-r12bf303c93388576-s3703800611' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/DeleteConfirmDialog'>
                {product.sku}
              </span>
              <span className="text-xs font-bold text-card-foreground" data-api-unique-id='deleteconfirmdialog-r397629e83c08f84a-s3703800611' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/DeleteConfirmDialog'>
                ${product.price.toFixed(2)}
              </span>
              <span className="text-[11px] text-muted-foreground" data-api-unique-id='deleteconfirmdialog-rb29f39e3246d0457-s3703800611' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/DeleteConfirmDialog'>
                ({product.stock} in stock)
              </span>
            </div>
          </div>
        </div>

        <DialogFooter className="pt-3 border-t border-border/70 flex flex-row items-center justify-end gap-2" data-api-unique-id='deleteconfirmdialog-r15aa229f4bf72389-s3703800611' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/DeleteConfirmDialog'>
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-full text-xs font-bold text-muted-foreground hover:bg-muted hover:text-foreground border border-border transition-all" data-api-unique-id='deleteconfirmdialog-ra65b10ceab750df9-s3703800611' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/DeleteConfirmDialog'>
            Cancel Keep
          </button>
          <button type="button" onClick={onConfirm} className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold bg-destructive text-destructive-foreground border border-border/50 shadow-sm transition-all" data-api-unique-id='deleteconfirmdialog-r0bb41957e3ed5f3c-s3703800611' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/DeleteConfirmDialog'>
            <Trash2 className="w-3.5 h-3.5" data-api-unique-id='deleteconfirmdialog-rdc126f886771cc1e-s3703800611' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/DeleteConfirmDialog' />
            <span data-api-unique-id='deleteconfirmdialog-rb01ec1ff011dfc8f-s3703800611' data-api-unique-page-name='src/backend/components/ProductCatalogAdmin/DeleteConfirmDialog'>Confirm Delist</span>
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>;
}