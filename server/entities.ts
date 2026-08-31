import { PrismaClient, Prisma } from '../prisma-generated/client';
import {
  AccountUser, 
  AccountUser_uniqueKey, 
  AccountUser_without_PKs, 
  CartItem, 
  CartItem_uniqueKey, 
  CartItem_without_PKs, 
  PromoCode, 
  PromoCode_uniqueKey, 
  PromoCode_without_PKs, 
  SalesOrder, 
  SalesOrderItem, 
  SalesOrderItem_uniqueKey, 
  SalesOrderItem_without_PKs, 
  SalesOrder_uniqueKey, 
  SalesOrder_without_PKs, 
  ShoppingCart, 
  ShoppingCart_uniqueKey, 
  ShoppingCart_without_PKs, 
  ToyProduct, 
  ToyProduct_uniqueKey, 
  ToyProduct_without_PKs, 
  filtered_AccountUser, 
  filtered_CartItem, 
  filtered_PromoCode, 
  filtered_SalesOrder, 
  filtered_SalesOrderItem, 
  filtered_ShoppingCart, 
  filtered_ToyProduct,
  Entities
} from './entities.type';

export const prisma = new PrismaClient();

export const default_entities: Entities = {
  accountuser: {
    /**
        * 创建accountuser记录
        * @param data 包含所有字段的数据 (包括手动设置的主键)
        * @returns 创建的记录或null
        */
        Create: async (data: AccountUser): Promise<AccountUser | null> => {
            try {
                return await prisma.accountuser.create({
                    data: data 
                });
            } catch (error) {
                console.error(`Error creating accountuser:`, error);
                return null;
            }
        },

    /**
        * 根据主键获取记录
        * @param args 主键参数
        * @returns 记录或null
        */
        Get: async (args: AccountUser_uniqueKey): Promise<AccountUser | null> => {
            try {
                return await prisma.accountuser.findUnique({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error getting accountuser:`, error);
                return null;
            }
        },

    /**
        * 获取所有记录
        * @param args 可选筛选条件 (类型: filtered_AccountUser)
        * @returns 记录数组
        */
        GetAll: async (args?: filtered_AccountUser): Promise<AccountUser[]> => {
            try {
                return await prisma.accountuser.findMany({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error getting all accountuser:`, error);
                return [];
            }
        },

    /**
        * 分页获取记录
        * @param pageNumber 页码 (默认 1)
        * @param pageSize 每页大小 (默认 10)
        * @param args 可选筛选条件 (类型: filtered_AccountUser)
        * @returns 分页记录数组
        */
        GetPage: async (
            pageNumber: number = 1,
            pageSize: number = 10,
            args?: filtered_AccountUser
        ): Promise<AccountUser[]> => {
            try {
                const skip = (pageNumber - 1) * pageSize;
                return await prisma.accountuser.findMany({
                    where: args as any, 
                    skip,
                    take: pageSize,
                });
            } catch (error) {
                console.error(`Error getting paged accountuser:`, error);
                return [];
            }
        },

    /**
        * 统计记录数
        * @param args 可选筛选条件 (类型: filtered_AccountUser)
        * @returns 记录数量
        */
        Count: async (args?: filtered_AccountUser): Promise<number> => {
            try {
                return await prisma.accountuser.count({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error counting accountuser:`, error);
                return 0;
            }
        },

    /**
        * 更新记录
        * @param args 包含主键 (where) 和更新数据 (data)
        * @returns 更新后的记录或null
        */
        Update: async (args: { where: AccountUser_uniqueKey; data: AccountUser_without_PKs }): Promise<AccountUser | null> => {
            try {
                return await prisma.accountuser.update({
                    where: { id: args.where.id },
                    data: args.data 
                });
            } catch (error) {
                console.error(`Error updating accountuser:`, error);
                return null;
            }
        },

    /**
        * 删除记录
        * @param args 主键参数
        * @returns 删除的记录或null
        */
        Delete: async (args: AccountUser_uniqueKey): Promise<AccountUser | null> => {
            try {
                return await prisma.accountuser.delete({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error deleting accountuser:`, error);
                return null;
            }
        },  },
  toyproduct: {
    /**
        * 创建toyproduct记录
        * @param data 包含所有字段的数据 (包括手动设置的主键)
        * @returns 创建的记录或null
        */
        Create: async (data: ToyProduct): Promise<ToyProduct | null> => {
            try {
                return await prisma.toyproduct.create({
                    data: data 
                });
            } catch (error) {
                console.error(`Error creating toyproduct:`, error);
                return null;
            }
        },

    /**
        * 根据主键获取记录
        * @param args 主键参数
        * @returns 记录或null
        */
        Get: async (args: ToyProduct_uniqueKey): Promise<ToyProduct | null> => {
            try {
                return await prisma.toyproduct.findUnique({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error getting toyproduct:`, error);
                return null;
            }
        },

    /**
        * 获取所有记录
        * @param args 可选筛选条件 (类型: filtered_ToyProduct)
        * @returns 记录数组
        */
        GetAll: async (args?: filtered_ToyProduct): Promise<ToyProduct[]> => {
            try {
                return await prisma.toyproduct.findMany({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error getting all toyproduct:`, error);
                return [];
            }
        },

    /**
        * 分页获取记录
        * @param pageNumber 页码 (默认 1)
        * @param pageSize 每页大小 (默认 10)
        * @param args 可选筛选条件 (类型: filtered_ToyProduct)
        * @returns 分页记录数组
        */
        GetPage: async (
            pageNumber: number = 1,
            pageSize: number = 10,
            args?: filtered_ToyProduct
        ): Promise<ToyProduct[]> => {
            try {
                const skip = (pageNumber - 1) * pageSize;
                return await prisma.toyproduct.findMany({
                    where: args as any, 
                    skip,
                    take: pageSize,
                });
            } catch (error) {
                console.error(`Error getting paged toyproduct:`, error);
                return [];
            }
        },

    /**
        * 统计记录数
        * @param args 可选筛选条件 (类型: filtered_ToyProduct)
        * @returns 记录数量
        */
        Count: async (args?: filtered_ToyProduct): Promise<number> => {
            try {
                return await prisma.toyproduct.count({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error counting toyproduct:`, error);
                return 0;
            }
        },

    /**
        * 更新记录
        * @param args 包含主键 (where) 和更新数据 (data)
        * @returns 更新后的记录或null
        */
        Update: async (args: { where: ToyProduct_uniqueKey; data: ToyProduct_without_PKs }): Promise<ToyProduct | null> => {
            try {
                return await prisma.toyproduct.update({
                    where: { id: args.where.id },
                    data: args.data 
                });
            } catch (error) {
                console.error(`Error updating toyproduct:`, error);
                return null;
            }
        },

    /**
        * 删除记录
        * @param args 主键参数
        * @returns 删除的记录或null
        */
        Delete: async (args: ToyProduct_uniqueKey): Promise<ToyProduct | null> => {
            try {
                return await prisma.toyproduct.delete({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error deleting toyproduct:`, error);
                return null;
            }
        },  },
  shoppingcart: {
    /**
        * 创建shoppingcart记录
        * @param data 包含所有字段的数据 (包括手动设置的主键)
        * @returns 创建的记录或null
        */
        Create: async (data: ShoppingCart): Promise<ShoppingCart | null> => {
            try {
                return await prisma.shoppingcart.create({
                    data: data 
                });
            } catch (error) {
                console.error(`Error creating shoppingcart:`, error);
                return null;
            }
        },

    /**
        * 根据主键获取记录
        * @param args 主键参数
        * @returns 记录或null
        */
        Get: async (args: ShoppingCart_uniqueKey): Promise<ShoppingCart | null> => {
            try {
                return await prisma.shoppingcart.findUnique({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error getting shoppingcart:`, error);
                return null;
            }
        },

    /**
        * 获取所有记录
        * @param args 可选筛选条件 (类型: filtered_ShoppingCart)
        * @returns 记录数组
        */
        GetAll: async (args?: filtered_ShoppingCart): Promise<ShoppingCart[]> => {
            try {
                return await prisma.shoppingcart.findMany({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error getting all shoppingcart:`, error);
                return [];
            }
        },

    /**
        * 分页获取记录
        * @param pageNumber 页码 (默认 1)
        * @param pageSize 每页大小 (默认 10)
        * @param args 可选筛选条件 (类型: filtered_ShoppingCart)
        * @returns 分页记录数组
        */
        GetPage: async (
            pageNumber: number = 1,
            pageSize: number = 10,
            args?: filtered_ShoppingCart
        ): Promise<ShoppingCart[]> => {
            try {
                const skip = (pageNumber - 1) * pageSize;
                return await prisma.shoppingcart.findMany({
                    where: args as any, 
                    skip,
                    take: pageSize,
                });
            } catch (error) {
                console.error(`Error getting paged shoppingcart:`, error);
                return [];
            }
        },

    /**
        * 统计记录数
        * @param args 可选筛选条件 (类型: filtered_ShoppingCart)
        * @returns 记录数量
        */
        Count: async (args?: filtered_ShoppingCart): Promise<number> => {
            try {
                return await prisma.shoppingcart.count({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error counting shoppingcart:`, error);
                return 0;
            }
        },

    /**
        * 更新记录
        * @param args 包含主键 (where) 和更新数据 (data)
        * @returns 更新后的记录或null
        */
        Update: async (args: { where: ShoppingCart_uniqueKey; data: ShoppingCart_without_PKs }): Promise<ShoppingCart | null> => {
            try {
                return await prisma.shoppingcart.update({
                    where: { id: args.where.id },
                    data: args.data 
                });
            } catch (error) {
                console.error(`Error updating shoppingcart:`, error);
                return null;
            }
        },

    /**
        * 删除记录
        * @param args 主键参数
        * @returns 删除的记录或null
        */
        Delete: async (args: ShoppingCart_uniqueKey): Promise<ShoppingCart | null> => {
            try {
                return await prisma.shoppingcart.delete({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error deleting shoppingcart:`, error);
                return null;
            }
        },  },
  cartitem: {
    /**
        * 创建cartitem记录
        * @param data 包含所有字段的数据 (包括手动设置的主键)
        * @returns 创建的记录或null
        */
        Create: async (data: CartItem): Promise<CartItem | null> => {
            try {
                return await prisma.cartitem.create({
                    data: data 
                });
            } catch (error) {
                console.error(`Error creating cartitem:`, error);
                return null;
            }
        },

    /**
        * 根据主键获取记录
        * @param args 主键参数
        * @returns 记录或null
        */
        Get: async (args: CartItem_uniqueKey): Promise<CartItem | null> => {
            try {
                return await prisma.cartitem.findUnique({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error getting cartitem:`, error);
                return null;
            }
        },

    /**
        * 获取所有记录
        * @param args 可选筛选条件 (类型: filtered_CartItem)
        * @returns 记录数组
        */
        GetAll: async (args?: filtered_CartItem): Promise<CartItem[]> => {
            try {
                return await prisma.cartitem.findMany({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error getting all cartitem:`, error);
                return [];
            }
        },

    /**
        * 分页获取记录
        * @param pageNumber 页码 (默认 1)
        * @param pageSize 每页大小 (默认 10)
        * @param args 可选筛选条件 (类型: filtered_CartItem)
        * @returns 分页记录数组
        */
        GetPage: async (
            pageNumber: number = 1,
            pageSize: number = 10,
            args?: filtered_CartItem
        ): Promise<CartItem[]> => {
            try {
                const skip = (pageNumber - 1) * pageSize;
                return await prisma.cartitem.findMany({
                    where: args as any, 
                    skip,
                    take: pageSize,
                });
            } catch (error) {
                console.error(`Error getting paged cartitem:`, error);
                return [];
            }
        },

    /**
        * 统计记录数
        * @param args 可选筛选条件 (类型: filtered_CartItem)
        * @returns 记录数量
        */
        Count: async (args?: filtered_CartItem): Promise<number> => {
            try {
                return await prisma.cartitem.count({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error counting cartitem:`, error);
                return 0;
            }
        },

    /**
        * 更新记录
        * @param args 包含主键 (where) 和更新数据 (data)
        * @returns 更新后的记录或null
        */
        Update: async (args: { where: CartItem_uniqueKey; data: CartItem_without_PKs }): Promise<CartItem | null> => {
            try {
                return await prisma.cartitem.update({
                    where: { id: args.where.id },
                    data: args.data 
                });
            } catch (error) {
                console.error(`Error updating cartitem:`, error);
                return null;
            }
        },

    /**
        * 删除记录
        * @param args 主键参数
        * @returns 删除的记录或null
        */
        Delete: async (args: CartItem_uniqueKey): Promise<CartItem | null> => {
            try {
                return await prisma.cartitem.delete({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error deleting cartitem:`, error);
                return null;
            }
        },  },
  promocode: {
    /**
        * 创建promocode记录
        * @param data 包含所有字段的数据 (包括手动设置的主键)
        * @returns 创建的记录或null
        */
        Create: async (data: PromoCode): Promise<PromoCode | null> => {
            try {
                return await prisma.promocode.create({
                    data: data 
                });
            } catch (error) {
                console.error(`Error creating promocode:`, error);
                return null;
            }
        },

    /**
        * 根据主键获取记录
        * @param args 主键参数
        * @returns 记录或null
        */
        Get: async (args: PromoCode_uniqueKey): Promise<PromoCode | null> => {
            try {
                return await prisma.promocode.findUnique({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error getting promocode:`, error);
                return null;
            }
        },

    /**
        * 获取所有记录
        * @param args 可选筛选条件 (类型: filtered_PromoCode)
        * @returns 记录数组
        */
        GetAll: async (args?: filtered_PromoCode): Promise<PromoCode[]> => {
            try {
                return await prisma.promocode.findMany({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error getting all promocode:`, error);
                return [];
            }
        },

    /**
        * 分页获取记录
        * @param pageNumber 页码 (默认 1)
        * @param pageSize 每页大小 (默认 10)
        * @param args 可选筛选条件 (类型: filtered_PromoCode)
        * @returns 分页记录数组
        */
        GetPage: async (
            pageNumber: number = 1,
            pageSize: number = 10,
            args?: filtered_PromoCode
        ): Promise<PromoCode[]> => {
            try {
                const skip = (pageNumber - 1) * pageSize;
                return await prisma.promocode.findMany({
                    where: args as any, 
                    skip,
                    take: pageSize,
                });
            } catch (error) {
                console.error(`Error getting paged promocode:`, error);
                return [];
            }
        },

    /**
        * 统计记录数
        * @param args 可选筛选条件 (类型: filtered_PromoCode)
        * @returns 记录数量
        */
        Count: async (args?: filtered_PromoCode): Promise<number> => {
            try {
                return await prisma.promocode.count({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error counting promocode:`, error);
                return 0;
            }
        },

    /**
        * 更新记录
        * @param args 包含主键 (where) 和更新数据 (data)
        * @returns 更新后的记录或null
        */
        Update: async (args: { where: PromoCode_uniqueKey; data: PromoCode_without_PKs }): Promise<PromoCode | null> => {
            try {
                return await prisma.promocode.update({
                    where: { id: args.where.id },
                    data: args.data 
                });
            } catch (error) {
                console.error(`Error updating promocode:`, error);
                return null;
            }
        },

    /**
        * 删除记录
        * @param args 主键参数
        * @returns 删除的记录或null
        */
        Delete: async (args: PromoCode_uniqueKey): Promise<PromoCode | null> => {
            try {
                return await prisma.promocode.delete({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error deleting promocode:`, error);
                return null;
            }
        },  },
  salesorder: {
    /**
        * 创建salesorder记录
        * @param data 包含所有字段的数据 (包括手动设置的主键)
        * @returns 创建的记录或null
        */
        Create: async (data: SalesOrder): Promise<SalesOrder | null> => {
            try {
                return await prisma.salesorder.create({
                    data: data 
                });
            } catch (error) {
                console.error(`Error creating salesorder:`, error);
                return null;
            }
        },

    /**
        * 根据主键获取记录
        * @param args 主键参数
        * @returns 记录或null
        */
        Get: async (args: SalesOrder_uniqueKey): Promise<SalesOrder | null> => {
            try {
                return await prisma.salesorder.findUnique({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error getting salesorder:`, error);
                return null;
            }
        },

    /**
        * 获取所有记录
        * @param args 可选筛选条件 (类型: filtered_SalesOrder)
        * @returns 记录数组
        */
        GetAll: async (args?: filtered_SalesOrder): Promise<SalesOrder[]> => {
            try {
                return await prisma.salesorder.findMany({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error getting all salesorder:`, error);
                return [];
            }
        },

    /**
        * 分页获取记录
        * @param pageNumber 页码 (默认 1)
        * @param pageSize 每页大小 (默认 10)
        * @param args 可选筛选条件 (类型: filtered_SalesOrder)
        * @returns 分页记录数组
        */
        GetPage: async (
            pageNumber: number = 1,
            pageSize: number = 10,
            args?: filtered_SalesOrder
        ): Promise<SalesOrder[]> => {
            try {
                const skip = (pageNumber - 1) * pageSize;
                return await prisma.salesorder.findMany({
                    where: args as any, 
                    skip,
                    take: pageSize,
                });
            } catch (error) {
                console.error(`Error getting paged salesorder:`, error);
                return [];
            }
        },

    /**
        * 统计记录数
        * @param args 可选筛选条件 (类型: filtered_SalesOrder)
        * @returns 记录数量
        */
        Count: async (args?: filtered_SalesOrder): Promise<number> => {
            try {
                return await prisma.salesorder.count({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error counting salesorder:`, error);
                return 0;
            }
        },

    /**
        * 更新记录
        * @param args 包含主键 (where) 和更新数据 (data)
        * @returns 更新后的记录或null
        */
        Update: async (args: { where: SalesOrder_uniqueKey; data: SalesOrder_without_PKs }): Promise<SalesOrder | null> => {
            try {
                return await prisma.salesorder.update({
                    where: { id: args.where.id },
                    data: args.data 
                });
            } catch (error) {
                console.error(`Error updating salesorder:`, error);
                return null;
            }
        },

    /**
        * 删除记录
        * @param args 主键参数
        * @returns 删除的记录或null
        */
        Delete: async (args: SalesOrder_uniqueKey): Promise<SalesOrder | null> => {
            try {
                return await prisma.salesorder.delete({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error deleting salesorder:`, error);
                return null;
            }
        },  },
  salesorderitem: {
    /**
        * 创建salesorderitem记录
        * @param data 包含所有字段的数据 (包括手动设置的主键)
        * @returns 创建的记录或null
        */
        Create: async (data: SalesOrderItem): Promise<SalesOrderItem | null> => {
            try {
                return await prisma.salesorderitem.create({
                    data: data 
                });
            } catch (error) {
                console.error(`Error creating salesorderitem:`, error);
                return null;
            }
        },

    /**
        * 根据主键获取记录
        * @param args 主键参数
        * @returns 记录或null
        */
        Get: async (args: SalesOrderItem_uniqueKey): Promise<SalesOrderItem | null> => {
            try {
                return await prisma.salesorderitem.findUnique({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error getting salesorderitem:`, error);
                return null;
            }
        },

    /**
        * 获取所有记录
        * @param args 可选筛选条件 (类型: filtered_SalesOrderItem)
        * @returns 记录数组
        */
        GetAll: async (args?: filtered_SalesOrderItem): Promise<SalesOrderItem[]> => {
            try {
                return await prisma.salesorderitem.findMany({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error getting all salesorderitem:`, error);
                return [];
            }
        },

    /**
        * 分页获取记录
        * @param pageNumber 页码 (默认 1)
        * @param pageSize 每页大小 (默认 10)
        * @param args 可选筛选条件 (类型: filtered_SalesOrderItem)
        * @returns 分页记录数组
        */
        GetPage: async (
            pageNumber: number = 1,
            pageSize: number = 10,
            args?: filtered_SalesOrderItem
        ): Promise<SalesOrderItem[]> => {
            try {
                const skip = (pageNumber - 1) * pageSize;
                return await prisma.salesorderitem.findMany({
                    where: args as any, 
                    skip,
                    take: pageSize,
                });
            } catch (error) {
                console.error(`Error getting paged salesorderitem:`, error);
                return [];
            }
        },

    /**
        * 统计记录数
        * @param args 可选筛选条件 (类型: filtered_SalesOrderItem)
        * @returns 记录数量
        */
        Count: async (args?: filtered_SalesOrderItem): Promise<number> => {
            try {
                return await prisma.salesorderitem.count({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error counting salesorderitem:`, error);
                return 0;
            }
        },

    /**
        * 更新记录
        * @param args 包含主键 (where) 和更新数据 (data)
        * @returns 更新后的记录或null
        */
        Update: async (args: { where: SalesOrderItem_uniqueKey; data: SalesOrderItem_without_PKs }): Promise<SalesOrderItem | null> => {
            try {
                return await prisma.salesorderitem.update({
                    where: { id: args.where.id },
                    data: args.data 
                });
            } catch (error) {
                console.error(`Error updating salesorderitem:`, error);
                return null;
            }
        },

    /**
        * 删除记录
        * @param args 主键参数
        * @returns 删除的记录或null
        */
        Delete: async (args: SalesOrderItem_uniqueKey): Promise<SalesOrderItem | null> => {
            try {
                return await prisma.salesorderitem.delete({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error deleting salesorderitem:`, error);
                return null;
            }
        },  },
};
