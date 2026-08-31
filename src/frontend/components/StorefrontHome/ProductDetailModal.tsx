"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import EditableImg from "@/@base/EditableImg";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Star, ShieldCheck, Package, Layers, Sparkles, ShoppingBag, Plus, Minus, CheckCircle2, ExternalLink } from "lucide-react";
import type { ToyProduct } from "@/frontend/types/StorefrontHome";
import { ProductDetail } from "@/frontend/route-params";
interface ProductDetailModalProps {
  product: ToyProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: ToyProduct, quantity: number) => void;
}
export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
  onAddToCart
}: ProductDetailModalProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  // Reset quantity when new product is opened
  useEffect(() => {
    if (product) {
      setQuantity(1);
    }
  }, [product]);
  if (!product) return null;
  const handleAdd = () => {
    onAddToCart(product, quantity);
    onClose();
  };
  const handleGoToDetailPage = () => {
    ProductDetail.navigateToDetail(router, {
      productId: product.id
    });
  };
  return <Dialog open={isOpen} onOpenChange={open => !open && onClose()} data-api-unique-id='productdetailmodal-rf3f75b0a3784ef86-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal'>
      <DialogContent className="max-h-[calc(100dvh-4rem)] w-full max-w-2xl overflow-y-auto rounded-3xl border border-border/50 bg-card p-6 text-card-foreground shadow-lg sm:p-8" data-api-unique-id='productdetailmodal-rc89beba22c7c73b9-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal'>
        <DialogHeader className="text-left" data-api-unique-id='productdetailmodal-r9236c43e7355a322-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal'>
          <div className="flex flex-wrap items-center gap-2" data-api-unique-id='productdetailmodal-r52569a0e7c25afcf-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal'>
            <span className="rounded-full border border-border/50 bg-accent px-3 py-0.5 text-xs font-bold text-accent-foreground shadow-sm" data-api-unique-id='productdetailmodal-rc7205df438ea0403-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal'>
              Ages {product.ageLabel}
            </span>
            <span className="rounded-full border border-border bg-secondary px-3 py-0.5 text-xs font-bold text-secondary-foreground" data-api-unique-id='productdetailmodal-r46ee0a1fdfdd31a9-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal'>
              {product.categoryLabel}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-success" data-api-unique-id='productdetailmodal-r97f67cb85a4c8a58-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal'>
              <CheckCircle2 className="h-3.5 w-3.5" data-api-unique-id='productdetailmodal-rce8619637ba34481-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal' />
              <span data-api-unique-id='productdetailmodal-r7c71dfbd83a2cdc6-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal'>
                {product.specs.stockStatus} ({product.stockCount} available)
              </span>
            </span>
          </div>

          <DialogTitle className="mt-2 font-display text-2xl font-extrabold text-foreground sm:text-3xl" data-api-unique-id='productdetailmodal-rdc9660f2b75efadf-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal'>
            {product.name}
          </DialogTitle>

          <div className="flex items-center gap-2 pt-1 text-sm" data-api-unique-id='productdetailmodal-r01621a19b82c7ac2-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal'>
            <div className="flex items-center text-accent" data-api-unique-id='productdetailmodal-r129db03909f08e5a-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal'>
              <Star className="h-4 w-4 fill-current" data-api-unique-id='productdetailmodal-re9b1a80b6b1f45f0-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal' />
            </div>
            <span className="font-bold text-foreground" data-api-unique-id='productdetailmodal-r30010615aab26bea-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal'>
              {product.ratingAverage.toFixed(1)}
            </span>
            <span className="text-muted-foreground" data-api-unique-id='productdetailmodal-rc95348aa4c199091-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal'>
              ({product.reviewsCount} customer reviews)
            </span>
            <span className="ml-auto text-xs font-mono text-muted-foreground" data-api-unique-id='productdetailmodal-rbb202fc5659e3dd3-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal'>
              SKU: {product.sku}
            </span>
          </div>
        </DialogHeader>

        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-12" data-api-unique-id='productdetailmodal-r7dd344285aed87ec-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal'>
          {/* Product Image Frame */}
          <div className="sm:col-span-6" data-api-unique-id='productdetailmodal-rcb05e091b899aac8-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal'>
            <div className="overflow-hidden rounded-2xl border border-border/50 bg-muted shadow-md" data-api-unique-id='productdetailmodal-r697f7a32f2fe0fca-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal'>
              <EditableImg propKey={`modal-cover-${product.id}`} src={product.productImage} alt={product.name} className="aspect-square w-full object-cover" data-api-unique-id='productdetailmodal-r7dcdba664ec2be5f-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal' />
            </div>

            {/* Quick Safety Badge Card */}
            <div className="mt-3 flex items-center gap-2.5 rounded-xl border border-border/50 bg-secondary p-3 text-xs text-secondary-foreground" data-api-unique-id='productdetailmodal-rfe7a9a9163563170-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal'>
              <ShieldCheck className="h-5 w-5 shrink-0 text-success" data-api-unique-id='productdetailmodal-r22452341794ddac4-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal' />
              <div data-api-unique-id='productdetailmodal-r67bd5cdcd3454b29-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal'>
                <strong className="block font-bold text-foreground" data-api-unique-id='productdetailmodal-raccec11d5b9b336f-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal'>Safety Certified</strong>
                <span className="text-muted-foreground" data-api-unique-id='productdetailmodal-rbf3cd653f14c2432-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal'>{product.specs.safetyCertification}</span>
              </div>
            </div>

            {/* Direct Detail Link Button */}
            <button type="button" onClick={handleGoToDetailPage} className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-border/50 bg-card py-2 text-xs font-bold text-foreground shadow-sm transition-all hover:bg-secondary" data-api-unique-id='productdetailmodal-rf0ed037c0c5714dc-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal'>
              <span data-api-unique-id='productdetailmodal-rb6e847818ba6c84c-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal'>View Full Page Details</span>
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" data-api-unique-id='productdetailmodal-r104742eb600b2cc0-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal' />
            </button>
          </div>

          {/* Product Specs & Purchase Column */}
          <div className="flex flex-col space-y-4 sm:col-span-6" data-api-unique-id='productdetailmodal-rb2d7d094532f9132-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal'>
            {/* Extended Description */}
            <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm" data-api-unique-id='productdetailmodal-r89a0c8e9e8a05294-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal'>
              {product.longDescription || product.description}
            </p>

            {/* Key Highlights List */}
            {product.highlights && product.highlights.length > 0 && <div className="space-y-1.5 rounded-xl border border-border bg-muted p-3" data-api-unique-id='productdetailmodal-r7959700e0d7540ec-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal'>
                <div className="flex items-center gap-1.5 text-xs font-bold text-foreground" data-api-unique-id='productdetailmodal-r574835f6eda2786c-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal'>
                  <Sparkles className="h-3.5 w-3.5 text-primary" data-api-unique-id='productdetailmodal-ra39fcfbe5ca3c782-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal' />
                  <span data-api-unique-id='productdetailmodal-r61de6e06c341c464-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal'>Play & Learning Benefits:</span>
                </div>
                <ul className="space-y-1 text-xs text-muted-foreground" data-api-unique-id='productdetailmodal-r75979778f161e118-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal'>
                  {product.highlights.map((highlight, index) => <li key={index} className="flex items-start gap-1.5" data-api-unique-id='productdetailmodal-rce5b29caf799a7f8-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal' data-api-in-loop='1'>
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" data-api-unique-id='productdetailmodal-ra36fd26036253eb0-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal' data-api-in-loop='1' />
                      <span data-api-unique-id='productdetailmodal-re495beb724f3bfa1-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal' data-api-in-loop='1' data-api-bind-info={`product.highlights-${index}-$item`} data-api-map-var-name='highlight'>{highlight}</span>
                    </li>)}
                </ul>
              </div>}

            {/* Material & Inclusions Specs */}
            <div className="space-y-2 text-xs" data-api-unique-id='productdetailmodal-ra371f52a44dd50df-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal'>
              <div className="flex items-center gap-2 text-muted-foreground" data-api-unique-id='productdetailmodal-rb73adc0d1d6d944c-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal'>
                <Layers className="h-4 w-4 text-foreground" data-api-unique-id='productdetailmodal-rb477eb098c347c4a-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal' />
                <span data-api-unique-id='productdetailmodal-r414fe5a8a3e2b65d-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal'>
                  Materials: <strong className="font-semibold text-foreground" data-api-unique-id='productdetailmodal-rd7671a0d560da1fe-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal'>{product.specs.materials}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground" data-api-unique-id='productdetailmodal-r426bf5c27c852a52-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal'>
                <Package className="h-4 w-4 text-foreground" data-api-unique-id='productdetailmodal-rf9efc35fe30ab759-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal' />
                <span data-api-unique-id='productdetailmodal-r9d9f13658b1d06c6-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal'>
                  Dimensions: <strong className="font-semibold text-foreground" data-api-unique-id='productdetailmodal-r45dea5d314c52e31-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal'>{product.specs.dimensions}</strong>
                </span>
              </div>
            </div>

            {/* Price Row and Quantity Stepper */}
            <div className="mt-auto border-t border-border pt-4" data-api-unique-id='productdetailmodal-rc424fb656edd4704-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal'>
              <div className="flex items-baseline justify-between" data-api-unique-id='productdetailmodal-r979fb769892014a9-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal'>
                <div data-api-unique-id='productdetailmodal-r193f0cf5c0fc4cfd-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal'>
                  <span className="font-display text-2xl font-extrabold text-primary" data-api-unique-id='productdetailmodal-ra8e34a8615c4fd54-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal'>
                    ${(product.unitPrice * quantity).toFixed(2)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.unitPrice && <span className="ml-2 text-xs text-muted-foreground line-through" data-api-unique-id='productdetailmodal-rad782997edb740da-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal'>
                      ${(product.originalPrice * quantity).toFixed(2)}
                    </span>}
                </div>

                {/* Stepper */}
                <div className="inline-flex items-center rounded-full border border-border/50 bg-card p-1 shadow-sm" data-api-unique-id='productdetailmodal-r1d03280f8db797d5-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal'>
                  <button type="button" onClick={() => setQuantity(q => Math.max(1, q - 1))} disabled={quantity <= 1} className="flex h-7 w-7 items-center justify-center rounded-full text-foreground hover:bg-muted disabled:opacity-40" aria-label="Decrease quantity" data-api-unique-id='productdetailmodal-r959c58d2103d3b68-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal'>
                    <Minus className="h-3.5 w-3.5" data-api-unique-id='productdetailmodal-rfaee2f97f3b91cb4-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal' />
                  </button>
                  <span className="w-8 text-center text-xs font-extrabold text-foreground" data-api-unique-id='productdetailmodal-rc5b05a0a592d36ce-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal'>
                    {quantity}
                  </span>
                  <button type="button" onClick={() => setQuantity(q => Math.min(Math.max(1, product.stockCount), q + 1))} disabled={quantity >= product.stockCount} className="flex h-7 w-7 items-center justify-center rounded-full text-foreground hover:bg-muted disabled:opacity-40" aria-label="Increase quantity" data-api-unique-id='productdetailmodal-r4a29cee65f0705c8-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal'>
                    <Plus className="h-3.5 w-3.5" data-api-unique-id='productdetailmodal-r78e7544fcc9bb796-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal' />
                  </button>
                </div>
              </div>

              {/* Add to Cart CTA */}
              <button type="button" onClick={handleAdd} className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-border/50 bg-primary py-3 text-sm font-bold text-primary-foreground shadow-md transition-all hover:shadow-md" data-api-unique-id='productdetailmodal-r7aeba0803bcbfd3c-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal'>
                <ShoppingBag className="h-4 w-4" data-api-unique-id='productdetailmodal-r3e0856a70764e40d-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal' />
                <span data-api-unique-id='productdetailmodal-r157260956e621b5d-s1269704705' data-api-unique-page-name='src/frontend/components/StorefrontHome/ProductDetailModal'>Add {quantity} to Joy Cart</span>
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>;
}