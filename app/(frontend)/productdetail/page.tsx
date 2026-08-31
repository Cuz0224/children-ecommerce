"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertTriangle, ArrowLeft, ChevronRight, Home } from "lucide-react";
import ShowcaseGallery from "@/frontend/components/ProductDetail/ShowcaseGallery";
import TradeConsole from "@/frontend/components/ProductDetail/TradeConsole";
import LearningBenefits from "@/frontend/components/ProductDetail/LearningBenefits";
import SafetySpecs from "@/frontend/components/ProductDetail/SafetySpecs";
import CartSpringboard from "@/frontend/components/ProductDetail/CartSpringboard";
import GuestSignInModal from "@/frontend/components/ProductDetail/GuestSignInModal";
import { useUserSession } from "@/tools/FrontendSession";
import { ProductDetail, StorefrontHome } from "@/frontend/route-params";
import { ToyProduct, ShoppingCart, UserRole, CATEGORY_LABELS } from "@/frontend/types/ProductDetail";
import { getProductDetail, getActiveCart, addToCart, updateCartItemQuantity, removeCartItem } from "@/frontend/actions/ProductDetail";
export default function ProductDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    productId
  } = ProductDetail.getParams(searchParams);
  const {
    token,
    user_id
  } = useUserSession();
  const userRole: UserRole = token && user_id ? "CUSTOMER" : "GUEST";
  const [product, setProduct] = useState<ToyProduct | null>(null);
  const [cart, setCart] = useState<ShoppingCart | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState<boolean>(false);
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    Promise.all([getProductDetail(productId), getActiveCart()]).then(([productRes, cartRes]) => {
      if (!isMounted) return;
      setProduct(productRes);
      setCart(cartRes);
    }).catch(err => {
      console.error("Failed to load product details or cart:", err);
      if (!isMounted) return;
      setProduct(null);
      setCart(null);
    }).finally(() => {
      if (isMounted) {
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [productId]);
  const handleAddToCart = async (selectedProduct: ToyProduct | number, qty?: number) => {
    try {
      let targetProductId = product?.id;
      let quantityToPass = 1;
      if (typeof selectedProduct === "object" && selectedProduct !== null) {
        targetProductId = selectedProduct.id;
        quantityToPass = typeof qty === "number" ? qty : 1;
      } else if (typeof selectedProduct === "number") {
        quantityToPass = selectedProduct;
      }
      if (!targetProductId) return;
      const updatedCart = await addToCart(targetProductId, quantityToPass);
      if (updatedCart) {
        setCart(updatedCart);
      }
    } catch (err) {
      console.error("Failed to add product to cart:", err);
    }
  };
  const handleUpdateQuantity = async (cartItemId: string, newQuantity: number) => {
    try {
      const updatedCart = await updateCartItemQuantity(cartItemId, newQuantity);
      if (updatedCart) {
        setCart(updatedCart);
      }
    } catch (err) {
      console.error("Failed to update cart item quantity:", err);
    }
  };
  const handleRemoveItem = async (cartItemId: string) => {
    try {
      const updatedCart = await removeCartItem(cartItemId);
      if (updatedCart) {
        setCart(updatedCart);
      }
    } catch (err) {
      console.error("Failed to remove cart item:", err);
    }
  };
  if (loading) {
    return <main className="w-full bg-background text-foreground min-h-[70vh] flex items-center justify-center py-20">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm font-medium text-muted-foreground">Loading toy details...</p>
        </div>
      </main>;
  }

  // If the product is explicitly REMOVED, not found, or not LIVE
  if (!product || product.storefrontStatus === "REMOVED") {
    return <main className="w-full bg-background text-foreground min-h-[70vh] flex items-center justify-center py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-xl text-center space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive border border-destructive/30 shadow-md">
            <AlertTriangle className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-black font-display text-foreground">
              Product Unavailable
            </h1>
            <p className="text-sm text-muted-foreground">
              The toy you are looking for has been retired from our active catalog or is currently not available.
            </p>
          </div>
          <button type="button" onClick={() => StorefrontHome.navigateTo(router)} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground font-bold px-6 py-3.5 border border-border/50 shadow-md transition-all cursor-pointer">
            <ArrowLeft className="h-4 w-4" />
            <span>Return to ToyJoy Home</span>
          </button>
        </div>
      </main>;
  }
  const effectiveCart: ShoppingCart = cart || {
    id: "",
    customerId: user_id || "",
    cartStatus: "ACTIVE",
    appliedPromoId: null,
    appliedPromo: null,
    items: [],
    subtotal: 0,
    discountAmount: 0,
    shippingFee: 0,
    totalAmount: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  return <main className="w-full bg-background text-foreground">
      {/* Breadcrumbs & Navigation Toolbar */}
      <div className="w-full border-b border-border/80 bg-muted/40 py-3.5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-muted-foreground flex-wrap min-w-0">
            <span className="inline-flex items-center gap-1 font-medium text-muted-foreground">
              <Home className="h-3.5 w-3.5 text-primary" />
              <span>ToyJoy Store</span>
            </span>
            <ChevronRight className="h-3.5 w-3.5 text-border shrink-0" />
            <span className="font-medium text-muted-foreground truncate max-w-[150px] sm:max-w-[200px]">
              {CATEGORY_LABELS[product.category] || product.category}
            </span>
            <ChevronRight className="h-3.5 w-3.5 text-border shrink-0" />
            <span className="font-bold text-foreground truncate max-w-[180px] sm:max-w-[280px]">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Content Sections Stack */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 sm:space-y-20">
        {/* SECTION 1: Product Showcase Stage & Commerce Console */}
        <section data-controller-name="Product Showcase Stage" className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Product Visual Showcase Gallery */}
          <div className="lg:col-span-7 min-w-0">
            <ShowcaseGallery product={product} />
          </div>

          {/* Right Column: Interactive Trade & Quantity Console */}
          <div className="lg:col-span-5 min-w-0 lg:sticky lg:top-24">
            <TradeConsole product={product} currentUserRole={userRole} onAddToCart={handleAddToCart} onGuestPrompt={() => setIsGuestModalOpen(true)} />
          </div>
        </section>

        {/* SECTION 2: Play & Learning Benefits Archive */}
        <LearningBenefits product={product} />

        {/* SECTION 3: Materials, Rigorous Safety & Box Contents */}
        <SafetySpecs product={product} />

        {/* SECTION 4: Active Shopping Cart Preview & Checkout Springboard */}
        <CartSpringboard cart={effectiveCart} currentUserRole={userRole} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveItem} onGuestPrompt={() => setIsGuestModalOpen(true)} />
      </div>

      {/* Inline Guest Sign-In Invitation Modal */}
      <GuestSignInModal isOpen={isGuestModalOpen} onClose={() => setIsGuestModalOpen(false)} />
    </main>;
}
