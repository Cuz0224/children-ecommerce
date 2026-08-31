/* Auto-generated */
import { rpcCall } from '@/tools/rpc-client';
type Actions = typeof import('../../../../../src/frontend/actions/ProductDetail');

export const getProductDetail = (...args: Parameters<Actions["getProductDetail"]>) => 
  rpcCall<Awaited<ReturnType<Actions["getProductDetail"]>>>("src.frontend.actions.ProductDetail.getProductDetail", ...args);
export const getActiveCart = (...args: Parameters<Actions["getActiveCart"]>) => 
  rpcCall<Awaited<ReturnType<Actions["getActiveCart"]>>>("src.frontend.actions.ProductDetail.getActiveCart", ...args);
export const addToCart = (...args: Parameters<Actions["addToCart"]>) => 
  rpcCall<Awaited<ReturnType<Actions["addToCart"]>>>("src.frontend.actions.ProductDetail.addToCart", ...args);
export const updateCartItemQuantity = (...args: Parameters<Actions["updateCartItemQuantity"]>) => 
  rpcCall<Awaited<ReturnType<Actions["updateCartItemQuantity"]>>>("src.frontend.actions.ProductDetail.updateCartItemQuantity", ...args);
export const removeCartItem = (...args: Parameters<Actions["removeCartItem"]>) => 
  rpcCall<Awaited<ReturnType<Actions["removeCartItem"]>>>("src.frontend.actions.ProductDetail.removeCartItem", ...args);
