"use client";

import React, { useState, useEffect } from "react";
import Hero from "@/frontend/components/StorefrontHome/Hero";
import ProductGrid from "@/frontend/components/StorefrontHome/ProductGrid";
import ProductDetailModal from "@/frontend/components/StorefrontHome/ProductDetailModal";
import CartDrawer from "@/frontend/components/StorefrontHome/CartDrawer";
import ReassuranceBanner from "@/frontend/components/StorefrontHome/ReassuranceBanner";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { getStorefrontCatalog, getCartState, addToCart, updateCartItemQuantity, removeCartItem, clearCart, applyPromoCode, removePromoCode } from "@/frontend/actions/StorefrontHome";
import type { ToyProduct, CategoryKey, AgeGroupKey, SortOption, ShoppingCartState } from "@/frontend/types/StorefrontHome";
const INITIAL_CART_STATE: ShoppingCartState = {
  id: "guest-cart",
  cartStatus: "ACTIVE",
  appliedPromo: null,
  items: [],
  subtotal: 0,
  discountAmount: 0,
  shippingFee: 0,
  totalAmount: 0,
  isFreeShipping: false,
  remainingForFreeShipping: 45
};
export default function StorefrontHomePage() {
  // Catalog Filter & Search States
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>("all");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroupKey>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("featured");

  // Catalog Data States
  const [products, setProducts] = useState<ToyProduct[]>([]);
  const [featuredProduct, setFeaturedProduct] = useState<ToyProduct | null>(null);

  // Cart & Modal Transient UI States
  const [cartState, setCartState] = useState<ShoppingCartState>(INITIAL_CART_STATE);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<ToyProduct | null>(null);

  // Fetch Storefront Catalog based on active filters
  useEffect(() => {
    let isCancelled = false;
    const fetchCatalog = async () => {
      try {
        const res = await getStorefrontCatalog({
          category: selectedCategory,
          ageGroup: selectedAgeGroup,
          search: searchQuery,
          sort: sortOption
        });
        if (!isCancelled && res) {
          setProducts(res.products || []);
          setFeaturedProduct(res.featuredProduct || null);
        }
      } catch (err) {
        console.error("Failed to load storefront catalog:", err);
        if (!isCancelled) {
          setProducts([]);
          setFeaturedProduct(null);
        }
      }
    };
    fetchCatalog();
    return () => {
      isCancelled = true;
    };
  }, [selectedCategory, selectedAgeGroup, searchQuery, sortOption]);

  // Initial fetch for Cart State
  useEffect(() => {
    let isCancelled = false;
    const fetchCart = async () => {
      try {
        const activeCart = await getCartState();
        if (!isCancelled && activeCart) {
          setCartState(activeCart);
        }
      } catch (err) {
        console.error("Failed to load cart state:", err);
      }
    };
    fetchCart();
    return () => {
      isCancelled = true;
    };
  }, []);

  // Cart Operations & Mutations
  const handleAddToCart = async (product: ToyProduct, quantity = 1) => {
    try {
      const updatedCart = await addToCart({
        productId: product.id,
        quantity
      });
      setCartState(updatedCart);
      toast.success(`Added ${product.name.slice(0, 24)}... to Joy Cart!`);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      if ((err as {
        name?: string;
      })?.name === "UnauthorizedError" || errorMsg.toLowerCase().includes("log in") || errorMsg.toLowerCase().includes("unauthorized")) {
        toast.error("Please log in as a customer to add items to your cart.");
      } else {
        toast.error(errorMsg || "Failed to add product to cart");
      }
    }
  };
  const handleUpdateQuantity = async (productId: string, delta: number) => {
    const existingItem = cartState.items.find(item => item.productId === productId);
    if (!existingItem) return;
    const nextQty = existingItem.quantity + delta;
    try {
      const updatedCart = await updateCartItemQuantity({
        productId,
        quantity: nextQty
      });
      setCartState(updatedCart);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      if ((err as {
        name?: string;
      })?.name === "UnauthorizedError" || errorMsg.toLowerCase().includes("log in")) {
        toast.error("Please log in to manage your cart.");
      } else {
        toast.error(errorMsg || "Failed to update item quantity");
      }
    }
  };
  const handleRemoveItem = async (productId: string) => {
    try {
      const updatedCart = await removeCartItem({
        productId
      });
      setCartState(updatedCart);
      toast.info("Removed toy from cart");
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      if ((err as {
        name?: string;
      })?.name === "UnauthorizedError" || errorMsg.toLowerCase().includes("log in")) {
        toast.error("Please log in to manage your cart.");
      } else {
        toast.error(errorMsg || "Failed to remove item");
      }
    }
  };
  const handleClearCart = async () => {
    try {
      const updatedCart = await clearCart();
      setCartState(updatedCart);
      toast.info("Cleared all toys from cart");
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      if ((err as {
        name?: string;
      })?.name === "UnauthorizedError" || errorMsg.toLowerCase().includes("log in")) {
        toast.error("Please log in to manage your cart.");
      } else {
        toast.error(errorMsg || "Failed to clear cart");
      }
    }
  };
  const handleApplyPromo = (code: string): boolean => {
    const cleanCode = code.trim();
    if (!cleanCode) return false;
    applyPromoCode({
      code: cleanCode
    }).then(updatedCart => {
      setCartState(updatedCart);
      toast.success(`Coupon code ${cleanCode.toUpperCase()} applied!`);
    }).catch((err: unknown) => {
      const errorMsg = err instanceof Error ? err.message : String(err);
      if ((err as {
        name?: string;
      })?.name === "UnauthorizedError" || errorMsg.toLowerCase().includes("log in")) {
        toast.error("Please log in to apply coupons.");
      } else {
        toast.error(errorMsg || "Failed to apply coupon code");
      }
    });
    return true;
  };
  const handleRemovePromo = async () => {
    try {
      const updatedCart = await removePromoCode();
      setCartState(updatedCart);
      toast.info("Coupon removed");
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      if ((err as {
        name?: string;
      })?.name === "UnauthorizedError" || errorMsg.toLowerCase().includes("log in")) {
        toast.error("Please log in to manage coupons.");
      } else {
        toast.error(errorMsg || "Failed to remove coupon");
      }
    }
  };
  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSelectedAgeGroup("all");
    setSearchQuery("");
    setSortOption("featured");
  };
  const scrollToCatalog = () => {
    const catalogEl = document.getElementById("toy-catalog");
    if (catalogEl) {
      catalogEl.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  const totalCartCount = cartState.items.reduce((sum, item) => sum + item.quantity, 0);
  return <div className="min-h-screen bg-background text-foreground">
      {/* 1. Hero Showcase Section */}
      <Hero featuredProduct={featuredProduct} onExploreClick={scrollToCatalog} onQuickAdd={(p: ToyProduct) => handleAddToCart(p, 1)} onViewProduct={(p: ToyProduct) => setSelectedProductForModal(p)} />

      {/* 2. Interactive Product Catalog Shelf & Quick Filters */}
      <ProductGrid products={products} selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} selectedAgeGroup={selectedAgeGroup} onSelectAgeGroup={setSelectedAgeGroup} searchQuery={searchQuery} onSearchChange={setSearchQuery} sortOption={sortOption} onSortChange={setSortOption} onAddToCart={(p: ToyProduct) => handleAddToCart(p, 1)} onViewDetails={(p: ToyProduct) => setSelectedProductForModal(p)} onResetFilters={handleResetFilters} />

      {/* 3. Reassurance & Safety Commitments */}
      <ReassuranceBanner />

      {/* Floating Sticky Cart Trigger Button */}
      <div className="fixed right-6 bottom-6 z-40">
        <button type="button" onClick={() => setIsCartOpen(true)} className="group relative flex items-center gap-2.5 rounded-full border border-border/50 bg-primary px-5 py-3.5 text-sm font-extrabold text-primary-foreground shadow-md transition-all hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" aria-label="Open Shopping Cart">
          <ShoppingBag className="h-5 w-5 transition-transform group-hover:scale-110" />
          <span className="hidden sm:inline">Joy Cart</span>
          {totalCartCount > 0 && <span className="flex h-6 min-w-[1.5rem] items-center justify-center rounded-full border border-border/50 bg-accent px-1.5 text-xs font-black text-accent-foreground shadow-sm">
              {totalCartCount}
            </span>}
        </button>
      </div>

      {/* In-Place Product Details Modal */}
      <ProductDetailModal product={selectedProductForModal} isOpen={Boolean(selectedProductForModal)} onClose={() => setSelectedProductForModal(null)} onAddToCart={(p: ToyProduct, qty?: number) => handleAddToCart(p, qty || 1)} />

      {/* In-Place Sliding Shopping Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartState={cartState} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveItem} onClearCart={handleClearCart} onApplyPromo={handleApplyPromo} onRemovePromo={handleRemovePromo} />
    </div>;
}
