/* Auto-generated */
import { rpcCall } from '@/tools/rpc-client';
type Actions = typeof import('../../../../../src/frontend/actions/CustomerRegister');

export const registerCustomer = (...args: Parameters<Actions["registerCustomer"]>) => 
  rpcCall<Awaited<ReturnType<Actions["registerCustomer"]>>>("src.frontend.actions.CustomerRegister.registerCustomer", ...args);
