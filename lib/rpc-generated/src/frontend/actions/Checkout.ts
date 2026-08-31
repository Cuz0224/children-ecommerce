/* Auto-generated */
import { rpcCall } from '@/tools/rpc-client';
type Actions = typeof import('../../../../../src/frontend/actions/Checkout');

export const getCheckoutPageData = (...args: Parameters<Actions["getCheckoutPageData"]>) => 
  rpcCall<Awaited<ReturnType<Actions["getCheckoutPageData"]>>>("src.frontend.actions.Checkout.getCheckoutPageData", ...args);
export const updateCartItemQuantity = (...args: Parameters<Actions["updateCartItemQuantity"]>) => 
  rpcCall<Awaited<ReturnType<Actions["updateCartItemQuantity"]>>>("src.frontend.actions.Checkout.updateCartItemQuantity", ...args);
export const removeCartItem = (...args: Parameters<Actions["removeCartItem"]>) => 
  rpcCall<Awaited<ReturnType<Actions["removeCartItem"]>>>("src.frontend.actions.Checkout.removeCartItem", ...args);
export const clearUnavailableCartItems = (...args: Parameters<Actions["clearUnavailableCartItems"]>) => 
  rpcCall<Awaited<ReturnType<Actions["clearUnavailableCartItems"]>>>("src.frontend.actions.Checkout.clearUnavailableCartItems", ...args);
export const applyPromoCode = (...args: Parameters<Actions["applyPromoCode"]>) => 
  rpcCall<Awaited<ReturnType<Actions["applyPromoCode"]>>>("src.frontend.actions.Checkout.applyPromoCode", ...args);
export const removePromoCode = (...args: Parameters<Actions["removePromoCode"]>) => 
  rpcCall<Awaited<ReturnType<Actions["removePromoCode"]>>>("src.frontend.actions.Checkout.removePromoCode", ...args);
export const completeCheckout = (...args: Parameters<Actions["completeCheckout"]>) => 
  rpcCall<Awaited<ReturnType<Actions["completeCheckout"]>>>("src.frontend.actions.Checkout.completeCheckout", ...args);
