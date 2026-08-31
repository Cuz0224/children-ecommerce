"use client";

import React from "react";
import EditableImg from "@/@base/EditableImg";
import { Sparkles, ArrowDown, Award, Heart, ShoppingBag, Eye, Star } from "lucide-react";
import type { ToyProduct } from "@/frontend/types/StorefrontHome";
interface HeroProps {
  featuredProduct: ToyProduct | null;
  onExploreClick: () => void;
  onQuickAdd: (product: ToyProduct) => void;
  onViewProduct: (product: ToyProduct) => void;
}
export default function Hero({
  featuredProduct,
  onExploreClick,
  onQuickAdd,
  onViewProduct
}: HeroProps) {
  if (!featuredProduct) {
    return null;
  }
  return <section data-controller-name="Hero Showcase" className="relative w-full overflow-hidden bg-background pt-4 pb-12 sm:pt-6 sm:pb-16" data-api-unique-id='hero-r43d5e69e9433b7db-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" data-api-unique-id='hero-r847c3e7be17943f5-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero'>
        <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card text-card-foreground shadow-md sm:shadow-lg" data-api-unique-id='hero-r1214ce82df8111e9-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero'>
          {/* Subtle playful background dot pattern */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#E5DEC9_1.5px,transparent_1.5px)] bg-[size:20px_20px] opacity-60" data-api-unique-id='hero-rcc58499d141d59bf-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero' />

          {/* Decorative floating blurred accents */}
          <div className="pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full bg-accent/15 blur-2xl" data-api-unique-id='hero-r3f887a4d8250d6a6-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero' />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-primary/15 blur-2xl" data-api-unique-id='hero-rdd8260e802348945-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero' />

          <div className="relative grid grid-cols-1 items-center gap-8 p-6 sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-12" data-api-unique-id='hero-r203b5aedc865bb58-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero'>
            {/* Left Narrative Column */}
            <div className="flex min-w-0 flex-col items-start space-y-6 lg:col-span-7" data-api-unique-id='hero-r2630f1689ffe9b9e-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero'>
              {/* Season Highlight Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-secondary px-3.5 py-1.5 text-xs font-bold text-secondary-foreground shadow-sm" data-api-unique-id='hero-rc918c16788ba0f5d-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero'>
                <Sparkles className="h-4 w-4 text-primary" data-api-unique-id='hero-r3ecd2ef4dbb327f4-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero' />
                <span data-api-unique-id='hero-ra768df4ab2033f52-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero'>Spring 2025 Toybox Wonder Collection</span>
              </div>

              {/* H1 Main Value Proposition */}
              <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-5xl" data-api-unique-id='hero-r713c556aedc9a53b-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero'>
                Spark Every Wonder in Childhood Toybox
              </h1>

              {/* Supportive Subhead */}
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg" data-api-unique-id='hero-rb0d7242412876080-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero'>
                Curated non-toxic, brain-boosting toys igniting every creative spark.
                Engineered for joyful learning, certified safe, and packed with tactile fun.
              </p>

              {/* Key Trust Signals */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold sm:text-sm" data-api-unique-id='hero-r785467ae07001d67-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero'>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1 text-muted-foreground" data-api-unique-id='hero-ra791f8bfb3583087-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero'>
                  <Award className="h-4 w-4 text-success" data-api-unique-id='hero-r47345e33ea2d9b96-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero' />
                  <span data-api-unique-id='hero-r385fbf8d8729fd1b-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero'>EU CE & ASTM Certified</span>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1 text-muted-foreground" data-api-unique-id='hero-r7755d33eef2711a2-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero'>
                  <Heart className="h-4 w-4 text-primary" data-api-unique-id='hero-r9a0af7715daec09d-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero' />
                  <span data-api-unique-id='hero-ra8afa5ac90f12494-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero'>10,000+ Happy Playrooms</span>
                </div>
              </div>

              {/* Primary Call to Action Bar */}
              <div className="flex flex-wrap items-center gap-4 pt-2" data-api-unique-id='hero-rf608cfafa03ab46f-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero'>
                <button type="button" onClick={onExploreClick} className="group inline-flex items-center gap-2.5 rounded-full border border-border/50 bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground shadow-md transition-all hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" data-api-unique-id='hero-rc0330186010c7ae5-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero'>
                  <ShoppingBag className="h-4 w-4" data-api-unique-id='hero-r26f32030b4eb62bc-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero' />
                  <span data-api-unique-id='hero-rc4576091e120b7d3-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero'>Explore Toy House</span>
                  <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" data-api-unique-id='hero-rd3e9a1b6c53efce7-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero' />
                </button>

                <div className="text-xs text-muted-foreground" data-api-unique-id='hero-r43eb98baa741fa25-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero'>
                  <span data-api-unique-id='hero-r9e86f6e491a97e35-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero'>Free shipping on all orders over </span>
                  <strong className="font-bold text-foreground" data-api-unique-id='hero-r20769c2b97502fbb-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero'>$45</strong>
                </div>
              </div>
            </div>

            {/* Right Featured Visual Column */}
            <div className="relative min-w-0 lg:col-span-5" data-api-unique-id='hero-r52fab8559ca1e818-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero'>
              {/* Main Playroom Photography Card */}
              <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-muted shadow-md" data-api-unique-id='hero-r411428e764382fde-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero'>
                <EditableImg propKey="hero-playroom-main" needLargeImage src={featuredProduct.productImage} alt={featuredProduct.name || "Featured Toy Product"} className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" data-api-unique-id='hero-r49f8d7f1f3163cc5-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero' />

                {/* Floating Top Tag */}
                <div className="absolute top-3 left-3 rounded-full border border-border/50 bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-sm" data-api-unique-id='hero-r14e0197a887dbff1-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero'>
                  {featuredProduct.badge || "Editor's Pick"}
                </div>
              </div>

              {/* Floating Interactive Spotlight Card */}
              <div className="mt-4 flex min-w-0 flex-col gap-3 rounded-xl border border-border/50 bg-card p-4 text-card-foreground shadow-md sm:flex-row sm:items-center sm:justify-between" data-api-unique-id='hero-rd7e804e984df3136-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero'>
                <div className="min-w-0 flex-1" data-api-unique-id='hero-r095cf0091927f4e7-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero'>
                  <div className="flex items-center gap-2" data-api-unique-id='hero-r7b8a193c99a7c40e-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero'>
                    <span className="inline-flex shrink-0 items-center rounded-full bg-success px-2 py-0.5 text-[11px] font-bold text-success-foreground" data-api-unique-id='hero-r52bd422fdef24373-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero'>
                      {featuredProduct.badge || "HOT"}
                    </span>
                    <p className="truncate text-sm font-bold text-foreground" data-api-unique-id='hero-ra685abdba88ec1a0-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero'>
                      {featuredProduct.name}
                    </p>
                  </div>
                  <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground" data-api-unique-id='hero-rb88f22f856413863-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero'>
                    <span data-api-unique-id='hero-r268944ae3b0c62e0-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero'>Age {featuredProduct.ageLabel}</span>
                    <span data-api-unique-id='hero-r95f6f5b64585b965-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero'>·</span>
                    <span className="inline-flex items-center text-accent" data-api-unique-id='hero-rb79aabd92d57ce02-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero'>
                      <Star className="h-3 w-3 fill-current" data-api-unique-id='hero-rf798229bea492e4e-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero' />
                      <span className="ml-0.5 font-bold text-foreground" data-api-unique-id='hero-r0f1d604225a24909-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero'>
                        {featuredProduct.ratingAverage?.toFixed(1) ?? "5.0"}
                      </span>
                    </span>
                    <span data-api-unique-id='hero-rbddc931795b5e04d-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero'>({featuredProduct.reviewsCount ?? 0})</span>
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2" data-api-unique-id='hero-rde5adf4d2ff7efde-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero'>
                  <span className="font-display text-base font-extrabold text-primary" data-api-unique-id='hero-r65e693403980a1fc-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero'>
                    ${(featuredProduct.unitPrice ?? 0).toFixed(2)}
                  </span>
                  <button type="button" onClick={() => onViewProduct(featuredProduct)} className="inline-flex items-center gap-1 rounded-full border border-border/50 bg-secondary px-3 py-1.5 text-xs font-bold text-secondary-foreground shadow-sm transition-transform hover:translate-y-[-1px] active:translate-y-[1px]" data-api-unique-id='hero-r3eec0d095f3129de-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero'>
                    <Eye className="h-3.5 w-3.5" data-api-unique-id='hero-r411a4055e7b85a3c-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero' />
                    <span data-api-unique-id='hero-r46ae4fd04193da63-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero'>View</span>
                  </button>
                  <button type="button" onClick={() => onQuickAdd(featuredProduct)} className="inline-flex items-center gap-1 rounded-full border border-border/50 bg-primary px-3.5 py-1.5 text-xs font-bold text-primary-foreground shadow-sm transition-all hover:shadow-sm" data-api-unique-id='hero-r5d270996751edf7c-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero'>
                    <ShoppingBag className="h-3.5 w-3.5" data-api-unique-id='hero-rde54fc1679039428-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero' />
                    <span data-api-unique-id='hero-ra2ccd549a5c89fba-s967618289' data-api-unique-page-name='src/frontend/components/StorefrontHome/Hero'>Add</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
}