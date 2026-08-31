/* Auto-generated */
import { rpcCall } from '@/tools/rpc-client';
type Actions = typeof import('../../../../../src/backend/actions/ProductCatalogAdmin');

export const getCatalogOverview = (...args: Parameters<Actions["getCatalogOverview"]>) => 
  rpcCall<Awaited<ReturnType<Actions["getCatalogOverview"]>>>("src.backend.actions.ProductCatalogAdmin.getCatalogOverview", ...args);
export const createToyProduct = (...args: Parameters<Actions["createToyProduct"]>) => 
  rpcCall<Awaited<ReturnType<Actions["createToyProduct"]>>>("src.backend.actions.ProductCatalogAdmin.createToyProduct", ...args);
export const updateToyProduct = (...args: Parameters<Actions["updateToyProduct"]>) => 
  rpcCall<Awaited<ReturnType<Actions["updateToyProduct"]>>>("src.backend.actions.ProductCatalogAdmin.updateToyProduct", ...args);
export const quickRestockProduct = (...args: Parameters<Actions["quickRestockProduct"]>) => 
  rpcCall<Awaited<ReturnType<Actions["quickRestockProduct"]>>>("src.backend.actions.ProductCatalogAdmin.quickRestockProduct", ...args);
export const setProductStorefrontStatus = (...args: Parameters<Actions["setProductStorefrontStatus"]>) => 
  rpcCall<Awaited<ReturnType<Actions["setProductStorefrontStatus"]>>>("src.backend.actions.ProductCatalogAdmin.setProductStorefrontStatus", ...args);
export const batchSetProductStorefrontStatus = (...args: Parameters<Actions["batchSetProductStorefrontStatus"]>) => 
  rpcCall<Awaited<ReturnType<Actions["batchSetProductStorefrontStatus"]>>>("src.backend.actions.ProductCatalogAdmin.batchSetProductStorefrontStatus", ...args);
export const removeToyProduct = (...args: Parameters<Actions["removeToyProduct"]>) => 
  rpcCall<Awaited<ReturnType<Actions["removeToyProduct"]>>>("src.backend.actions.ProductCatalogAdmin.removeToyProduct", ...args);
