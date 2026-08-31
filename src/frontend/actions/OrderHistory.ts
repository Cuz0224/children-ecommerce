'use server';

import prisma from '@/tools/prisma';
import { withResult, requireAuth, getUserId } from '@/frontend/action_utils';
import {
  SalesOrderSnapshot,
  ToyOrderItemSnapshot,
  ToyCategory,
  OrderStatus,
} from '@/frontend/types/OrderHistory';

/**
 * Retrieve all completed sales orders for the authenticated customer.
 * 
 * Domain Rules:
 * - Every sales_order must belong to the authenticated customer who checked out the source cart.
 * - Order totals (subtotal, discountAmount, shippingFee, totalAmount) are immutable checkout snapshots.
 * - Sales order items are copied from cart items during checkout and are immutable.
 * - Results are ordered newest first (createdAt descending).
 */
export const getCustomerOrderHistory = withResult(
  requireAuth(async (): Promise<SalesOrderSnapshot[]> => {
    const customerId = getUserId();

    const orders = await prisma.salesOrder.findMany({
      where: {
        customerId,
        orderStatus: 'COMPLETED',
      },
      include: {
        salesOrderItems: {
          include: {
            product: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return orders.map((order) => {
      const items: ToyOrderItemSnapshot[] = order.salesOrderItems.map((item) => ({
        id: item.id, // data-from: SalesOrderItem-id
        orderId: item.orderId, // data-from: SalesOrderItem-orderId
        productId: item.productId, // data-from: SalesOrderItem-productId
        productName: item.product?.name ?? 'Toy Product', // data-from: ToyProduct-name
        productSubtitle: item.product?.subtitle ?? null, // data-from: ToyProduct-subtitle
        productImage: item.product?.productImage ?? null, // data-from: ToyProduct-productImage data-role: image_url
        category: (item.product?.category ?? 'WOODEN_TOYS') as ToyCategory, // data-from: ToyProduct-category
        quantity: item.quantity, // data-from: SalesOrderItem-quantity
        unitPriceSnapshot: item.unitPriceSnapshot.toNumber(), // data-from: SalesOrderItem-unitPriceSnapshot
        lineSubtotal: item.lineSubtotal.toNumber(), // data-from: SalesOrderItem-lineSubtotal
        createdAt: item.createdAt, // data-from: SalesOrderItem-createdAt
        updatedAt: item.updatedAt, // data-from: SalesOrderItem-updatedAt
      }));

      const itemCount = items.reduce((sum, it) => sum + it.quantity, 0);

      // Generate a user-friendly reference identifier based on the persistent order ID
      const orderNumber = `#TJ-${order.id.slice(0, 8).toUpperCase()}`;

      return {
        id: order.id, // data-from: SalesOrder-id
        orderNumber,
        customerId: order.customerId, // data-from: SalesOrder-customerId
        sourceCartId: order.sourceCartId, // data-from: SalesOrder-sourceCartId
        orderStatus: order.orderStatus as OrderStatus, // data-from: SalesOrder-orderStatus
        subtotal: order.subtotal.toNumber(), // data-from: SalesOrder-subtotal
        discountAmount: order.discountAmount.toNumber(), // data-from: SalesOrder-discountAmount
        shippingFee: order.shippingFee.toNumber(), // data-from: SalesOrder-shippingFee
        totalAmount: order.totalAmount.toNumber(), // data-from: SalesOrder-totalAmount
        appliedPromoCode: order.appliedPromoCode, // data-from: SalesOrder-appliedPromoCode
        itemCount,
        items,
        createdAt: order.createdAt, // data-from: SalesOrder-createdAt
        updatedAt: order.updatedAt, // data-from: SalesOrder-updatedAt
      };
    });
  })
);