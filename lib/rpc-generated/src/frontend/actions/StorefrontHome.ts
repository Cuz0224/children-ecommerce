/* Auto-generated */
import { rpcCall } from '@/tools/rpc-client';
type Actions = typeof import('../../../../../src/frontend/actions/StorefrontHome');

export const getStorefrontCatalog = (...args: Parameters<Actions["getStorefrontCatalog"]>) => 
  rpcCall<Awaited<ReturnType<Actions["getStorefrontCatalog"]>>>("src.frontend.actions.StorefrontHome.getStorefrontCatalog", ...args);
export const getCartState = (...args: Parameters<Actions["getCartState"]>) => 
  rpcCall<Awaited<ReturnType<Actions["getCartState"]>>>("src.frontend.actions.StorefrontHome.getCartState", ...args);
export const addToCart = (...args: Parameters<Actions["addToCart"]>) => 
  rpcCall<Awaited<ReturnType<Actions["addToCart"]>>>("src.frontend.actions.StorefrontHome.addToCart", ...args);
export const updateCartItemQuantity = (...args: Parameters<Actions["updateCartItemQuantity"]>) => 
  rpcCall<Awaited<ReturnType<Actions["updateCartItemQuantity"]>>>("src.frontend.actions.StorefrontHome.updateCartItemQuantity", ...args);
export const removeCartItem = (...args: Parameters<Actions["removeCartItem"]>) => 
  rpcCall<Awaited<ReturnType<Actions["removeCartItem"]>>>("src.frontend.actions.StorefrontHome.removeCartItem", ...args);
export const clearCart = (...args: Parameters<Actions["clearCart"]>) => 
  rpcCall<Awaited<ReturnType<Actions["clearCart"]>>>("src.frontend.actions.StorefrontHome.clearCart", ...args);
export const applyPromoCode = (...args: Parameters<Actions["applyPromoCode"]>) => 
  rpcCall<Awaited<ReturnType<Actions["applyPromoCode"]>>>("src.frontend.actions.StorefrontHome.applyPromoCode", ...args);
export const removePromoCode = (...args: Parameters<Actions["removePromoCode"]>) => 
  rpcCall<Awaited<ReturnType<Actions["removePromoCode"]>>>("src.frontend.actions.StorefrontHome.removePromoCode", ...args);
