/* Auto-generated */
import { rpcCall } from '@/tools/rpc-client';
type Actions = typeof import('../../../../../src/frontend/actions/OrderHistory');

export const getCustomerOrderHistory = (...args: Parameters<Actions["getCustomerOrderHistory"]>) => 
  rpcCall<Awaited<ReturnType<Actions["getCustomerOrderHistory"]>>>("src.frontend.actions.OrderHistory.getCustomerOrderHistory", ...args);
