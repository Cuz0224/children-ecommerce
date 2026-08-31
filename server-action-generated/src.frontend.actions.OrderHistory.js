"use server";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// common-redirect:@/tools/prisma
var require_prisma = __commonJS({
  "common-redirect:@/tools/prisma"(exports2, module2) {
    var prisma2 = require("./_common").prisma;
    module2.exports = {
      __esModule: true,
      default: prisma2,
      prisma: prisma2
    };
  }
});

// common-redirect:@/frontend/action_utils
var require_action_utils = __commonJS({
  "common-redirect:@/frontend/action_utils"(exports2, module2) {
    module2.exports = require("./_common").frontendAuth;
  }
});

// src/frontend/actions/OrderHistory.ts
var OrderHistory_exports = {};
__export(OrderHistory_exports, {
  getCustomerOrderHistory: () => getCustomerOrderHistory
});
module.exports = __toCommonJS(OrderHistory_exports);
var import_prisma = __toESM(require_prisma());
var import_action_utils = __toESM(require_action_utils());
var getCustomerOrderHistory = (0, import_action_utils.withResult)(
  (0, import_action_utils.requireAuth)(async () => {
    const customerId = (0, import_action_utils.getUserId)();
    const orders = await import_prisma.default.salesOrder.findMany({
      where: {
        customerId,
        orderStatus: "COMPLETED"
      },
      include: {
        salesOrderItems: {
          include: {
            product: true
          },
          orderBy: {
            createdAt: "asc"
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });
    return orders.map((order) => {
      const items = order.salesOrderItems.map((item) => ({
        id: item.id,
        // data-from: SalesOrderItem-id
        orderId: item.orderId,
        // data-from: SalesOrderItem-orderId
        productId: item.productId,
        // data-from: SalesOrderItem-productId
        productName: item.product?.name ?? "Toy Product",
        // data-from: ToyProduct-name
        productSubtitle: item.product?.subtitle ?? null,
        // data-from: ToyProduct-subtitle
        productImage: item.product?.productImage ?? null,
        // data-from: ToyProduct-productImage data-role: image_url
        category: item.product?.category ?? "WOODEN_TOYS",
        // data-from: ToyProduct-category
        quantity: item.quantity,
        // data-from: SalesOrderItem-quantity
        unitPriceSnapshot: item.unitPriceSnapshot.toNumber(),
        // data-from: SalesOrderItem-unitPriceSnapshot
        lineSubtotal: item.lineSubtotal.toNumber(),
        // data-from: SalesOrderItem-lineSubtotal
        createdAt: item.createdAt,
        // data-from: SalesOrderItem-createdAt
        updatedAt: item.updatedAt
        // data-from: SalesOrderItem-updatedAt
      }));
      const itemCount = items.reduce((sum, it) => sum + it.quantity, 0);
      const orderNumber = `#TJ-${order.id.slice(0, 8).toUpperCase()}`;
      return {
        id: order.id,
        // data-from: SalesOrder-id
        orderNumber,
        customerId: order.customerId,
        // data-from: SalesOrder-customerId
        sourceCartId: order.sourceCartId,
        // data-from: SalesOrder-sourceCartId
        orderStatus: order.orderStatus,
        // data-from: SalesOrder-orderStatus
        subtotal: order.subtotal.toNumber(),
        // data-from: SalesOrder-subtotal
        discountAmount: order.discountAmount.toNumber(),
        // data-from: SalesOrder-discountAmount
        shippingFee: order.shippingFee.toNumber(),
        // data-from: SalesOrder-shippingFee
        totalAmount: order.totalAmount.toNumber(),
        // data-from: SalesOrder-totalAmount
        appliedPromoCode: order.appliedPromoCode,
        // data-from: SalesOrder-appliedPromoCode
        itemCount,
        items,
        createdAt: order.createdAt,
        // data-from: SalesOrder-createdAt
        updatedAt: order.updatedAt
        // data-from: SalesOrder-updatedAt
      };
    });
  })
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getCustomerOrderHistory
});
