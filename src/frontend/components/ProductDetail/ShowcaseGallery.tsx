"use client";

import React, { useState } from "react";
import EditableImg from "@/@base/EditableImg";
import { ToyProduct, CATEGORY_LABELS, AGE_GROUP_LABELS } from "@/frontend/types/ProductDetail";
import { Star, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";
interface ShowcaseGalleryProps {
  product: ToyProduct;
}
export default function ShowcaseGallery({
  product
}: ShowcaseGalleryProps) {
  const views = product.galleryViews && product.galleryViews.length > 0 ? product.galleryViews : [{
    id: "view-default",
    label: "Product Overview"
  }];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeView = views[activeImageIndex] || views[0];
  return <div className="flex flex-col gap-4 w-full" data-api-unique-id='showcasegallery-r71c5cdedafce028d-s3752846263' data-api-unique-page-name='src/frontend/components/ProductDetail/ShowcaseGallery'>
      {/* Main Showcase Stage Card with Pop Shadow */}
      <div className="relative w-full rounded-2xl border border-border/50 bg-card text-card-foreground shadow-md overflow-hidden p-3 sm:p-5 transition-all" data-api-unique-id='showcasegallery-r47afe7cb55214506-s3752846263' data-api-unique-page-name='src/frontend/components/ProductDetail/ShowcaseGallery'>
        {/* Top Floating Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2 max-w-[85%] pointer-events-none" data-api-unique-id='showcasegallery-r5870a827c70434f0-s3752846263' data-api-unique-page-name='src/frontend/components/ProductDetail/ShowcaseGallery'>
          {product.badge && <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-black uppercase tracking-wider text-primary-foreground shadow-sm" data-api-unique-id='showcasegallery-rebf27564730317db-s3752846263' data-api-unique-page-name='src/frontend/components/ProductDetail/ShowcaseGallery'>
              <Sparkles className="h-3.5 w-3.5" data-api-unique-id='showcasegallery-r45cf50e91aae0002-s3752846263' data-api-unique-page-name='src/frontend/components/ProductDetail/ShowcaseGallery' />
              {product.badge}
            </span>}
          <span className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground shadow-sm" data-api-unique-id='showcasegallery-r7953fd0d658f920c-s3752846263' data-api-unique-page-name='src/frontend/components/ProductDetail/ShowcaseGallery'>
            {AGE_GROUP_LABELS[product.ageGroup] || product.ageGroup}
          </span>
        </div>

        {/* Stock Pill Floating Top Right */}
        <div className="absolute top-4 right-4 z-10 hidden sm:flex items-center gap-1.5 rounded-full bg-card border border-border/50 px-3 py-1 text-xs font-bold text-card-foreground shadow-sm pointer-events-none" data-api-unique-id='showcasegallery-rb3c6e3735771d8ab-s3752846263' data-api-unique-page-name='src/frontend/components/ProductDetail/ShowcaseGallery'>
          <span className="h-2 w-2 rounded-full bg-success animate-pulse" data-api-unique-id='showcasegallery-r55225edc0e965962-s3752846263' data-api-unique-page-name='src/frontend/components/ProductDetail/ShowcaseGallery' />
          <span data-api-unique-id='showcasegallery-rb5ead1666dc1894b-s3752846263' data-api-unique-page-name='src/frontend/components/ProductDetail/ShowcaseGallery'>{product.stockCount > 0 ? `${product.stockCount} In Stock` : "Sold Out"}</span>
        </div>

        {/* Main Product Image Container */}
        <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-xl overflow-hidden bg-muted border border-border/60 flex items-center justify-center group" data-api-unique-id='showcasegallery-r5948621173a67037-s3752846263' data-api-unique-page-name='src/frontend/components/ProductDetail/ShowcaseGallery'>
          <EditableImg propKey={`product-main-${product.id}-${activeView.id}`} src={product.productImage || undefined} alt={`${product.name} - ${activeView.label}`} needLargeImage className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-api-unique-id='showcasegallery-r4498998c536afcc8-s3752846263' data-api-unique-page-name='src/frontend/components/ProductDetail/ShowcaseGallery' />

          {/* Bottom Overlay Pill: Official Rating & Quality Guarantee */}
          <div className="absolute bottom-3 left-3 right-3 sm:left-4 sm:right-auto flex flex-wrap items-center gap-2 pointer-events-none" data-api-unique-id='showcasegallery-r52e5b3e6749d863b-s3752846263' data-api-unique-page-name='src/frontend/components/ProductDetail/ShowcaseGallery'>
            {product.ratingAverage !== null && product.ratingAverage !== undefined && <div className="inline-flex items-center gap-1.5 rounded-full bg-card border border-border/50 px-3 py-1 text-xs font-bold text-card-foreground shadow-sm" data-api-unique-id='showcasegallery-r1c349e8502c03573-s3752846263' data-api-unique-page-name='src/frontend/components/ProductDetail/ShowcaseGallery'>
                <div className="flex items-center text-accent" data-api-unique-id='showcasegallery-r394e04d5fd5d0e50-s3752846263' data-api-unique-page-name='src/frontend/components/ProductDetail/ShowcaseGallery'>
                  <Star className="h-3.5 w-3.5 fill-accent" data-api-unique-id='showcasegallery-r980aab3456b39a0c-s3752846263' data-api-unique-page-name='src/frontend/components/ProductDetail/ShowcaseGallery' />
                </div>
                <span data-api-unique-id='showcasegallery-racc2795e95a63b24-s3752846263' data-api-unique-page-name='src/frontend/components/ProductDetail/ShowcaseGallery'>{product.ratingAverage.toFixed(1)}</span>
                <span className="text-muted-foreground font-normal" data-api-unique-id='showcasegallery-r426d416769067150-s3752846263' data-api-unique-page-name='src/frontend/components/ProductDetail/ShowcaseGallery'>
                  ({product.reviewsCount || 0} reviews)
                </span>
              </div>}
            <div className="hidden sm:inline-flex items-center gap-1 rounded-full bg-card border border-border/50 px-2.5 py-1 text-xs font-medium text-muted-foreground shadow-sm" data-api-unique-id='showcasegallery-r3923b47c68a0ddb2-s3752846263' data-api-unique-page-name='src/frontend/components/ProductDetail/ShowcaseGallery'>
              <ShieldCheck className="h-3.5 w-3.5 text-success" data-api-unique-id='showcasegallery-r5adaade498577982-s3752846263' data-api-unique-page-name='src/frontend/components/ProductDetail/ShowcaseGallery' />
              <span data-api-unique-id='showcasegallery-ra8a8f1c172c021f6-s3752846263' data-api-unique-page-name='src/frontend/components/ProductDetail/ShowcaseGallery'>Certified Safe</span>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-view Thumbnail Strip */}
      {views.length > 1 && <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 px-1" data-api-unique-id='showcasegallery-ra45c721852f7d71d-s3752846263' data-api-unique-page-name='src/frontend/components/ProductDetail/ShowcaseGallery'>
          {views.map((viewItem, index) => {
        const isSelected = index === activeImageIndex;
        return <button key={viewItem.id} type="button" onClick={() => setActiveImageIndex(index)} className={`relative shrink-0 h-18 w-22 sm:h-20 sm:w-24 rounded-xl border transition-all overflow-hidden bg-card ${isSelected ? "border-primary shadow-[3px_3px_0px_#BE185D] -translate-y-0.5" : "border-border shadow-sm opacity-75 hover:opacity-100 hover:border-border"}`} aria-label={`View angle ${index + 1}: ${viewItem.label}`} data-api-unique-id='showcasegallery-ra9fb42149f1b8094-s3752846263' data-api-unique-page-name='src/frontend/components/ProductDetail/ShowcaseGallery' data-api-in-loop='1'>
                <EditableImg propKey={`thumb-${product.id}-${viewItem.id}`} src={product.productImage || undefined} alt={`${product.name} angle ${index + 1}`} className="w-full h-full object-cover" data-api-unique-id='showcasegallery-rf1be41a9175109bf-s3752846263' data-api-unique-page-name='src/frontend/components/ProductDetail/ShowcaseGallery' data-api-in-loop='1' />
                {isSelected && <span className="absolute bottom-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground" data-api-unique-id='showcasegallery-r4ddfedcc33bd44ea-s3752846263' data-api-unique-page-name='src/frontend/components/ProductDetail/ShowcaseGallery' data-api-in-loop='1'>
                    <CheckCircle2 className="h-3 w-3" data-api-unique-id='showcasegallery-r9769f6541ff7979d-s3752846263' data-api-unique-page-name='src/frontend/components/ProductDetail/ShowcaseGallery' data-api-in-loop='1' />
                  </span>}
              </button>;
      })}
        </div>}

      {/* Tactile Snapshot Features */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center" data-api-unique-id='showcasegallery-r723c8e3a0147243d-s3752846263' data-api-unique-page-name='src/frontend/components/ProductDetail/ShowcaseGallery'>
        <div className="rounded-xl border border-border/50 bg-card p-2.5 text-card-foreground shadow-sm" data-api-unique-id='showcasegallery-ra8bfa849438f9c24-s3752846263' data-api-unique-page-name='src/frontend/components/ProductDetail/ShowcaseGallery'>
          <span className="block text-[11px] font-bold text-muted-foreground uppercase tracking-wider" data-api-unique-id='showcasegallery-rd7d3de83c76af3f2-s3752846263' data-api-unique-page-name='src/frontend/components/ProductDetail/ShowcaseGallery'>
            Category
          </span>
          <span className="text-xs sm:text-sm font-bold text-card-foreground truncate block" data-api-unique-id='showcasegallery-rfbf7acf3ec3167c3-s3752846263' data-api-unique-page-name='src/frontend/components/ProductDetail/ShowcaseGallery'>
            {CATEGORY_LABELS[product.category] || product.category}
          </span>
        </div>
        <div className="rounded-xl border border-border/50 bg-card p-2.5 text-card-foreground shadow-sm" data-api-unique-id='showcasegallery-ra818e05d430a3c1b-s3752846263' data-api-unique-page-name='src/frontend/components/ProductDetail/ShowcaseGallery'>
          <span className="block text-[11px] font-bold text-muted-foreground uppercase tracking-wider" data-api-unique-id='showcasegallery-r542fc454a2ed0725-s3752846263' data-api-unique-page-name='src/frontend/components/ProductDetail/ShowcaseGallery'>
            Play Scale
          </span>
          <span className="text-xs sm:text-sm font-bold text-card-foreground truncate block" data-api-unique-id='showcasegallery-rf0541edf91ec4a64-s3752846263' data-api-unique-page-name='src/frontend/components/ProductDetail/ShowcaseGallery'>
            {product.boxIncludes?.length || 4}+ Components
          </span>
        </div>
        <div className="rounded-xl border border-border/50 bg-card p-2.5 text-card-foreground shadow-sm" data-api-unique-id='showcasegallery-r67db5ed60203fb56-s3752846263' data-api-unique-page-name='src/frontend/components/ProductDetail/ShowcaseGallery'>
          <span className="block text-[11px] font-bold text-muted-foreground uppercase tracking-wider" data-api-unique-id='showcasegallery-re6766958a30c6abd-s3752846263' data-api-unique-page-name='src/frontend/components/ProductDetail/ShowcaseGallery'>
            Safety Stamp
          </span>
          <span className="text-xs sm:text-sm font-bold text-success truncate block" data-api-unique-id='showcasegallery-r81a6490684aaa4c0-s3752846263' data-api-unique-page-name='src/frontend/components/ProductDetail/ShowcaseGallery'>
            100% Non-Toxic
          </span>
        </div>
      </div>
    </div>;
}