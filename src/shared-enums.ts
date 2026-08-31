/**
 * 枚举中心 — 从 prisma/schema.prisma 自动生成
 * 运行: npx tsx scripts/generate-schema-meta.ts
 * ⚠️ 请勿手动修改，schema 变更后重新生成
 */

export const AccountRole = {
  CUSTOMER: 'CUSTOMER',
  ADMIN: 'ADMIN',
} as const
export type AccountRoleType = typeof AccountRole[keyof typeof AccountRole]

export const ToyCategory = {
  WOODEN_TOYS: 'WOODEN_TOYS',
  STEM_MAKER: 'STEM_MAKER',
  INFANT_PLUSH: 'INFANT_PLUSH',
  CREATIVE_BUILDING: 'CREATIVE_BUILDING',
  PRETEND_PLAY: 'PRETEND_PLAY',
  ART_CRAFT: 'ART_CRAFT',
  LEARNING: 'LEARNING',
  OUTDOOR: 'OUTDOOR',
  PLUSH: 'PLUSH',
} as const
export type ToyCategoryType = typeof ToyCategory[keyof typeof ToyCategory]

export const ToyAgeGroup = {
  AGE_0_2: 'AGE_0_2',
  AGE_3_5: 'AGE_3_5',
  AGE_6_8: 'AGE_6_8',
  AGE_8_PLUS: 'AGE_8_PLUS',
  AGE_9_PLUS: 'AGE_9_PLUS',
} as const
export type ToyAgeGroupType = typeof ToyAgeGroup[keyof typeof ToyAgeGroup]

export const StorefrontStatus = {
  HIDDEN: 'HIDDEN',
  LIVE: 'LIVE',
  REMOVED: 'REMOVED',
} as const
export type StorefrontStatusType = typeof StorefrontStatus[keyof typeof StorefrontStatus]

export const CartStatus = {
  ACTIVE: 'ACTIVE',
  CHECKED_OUT: 'CHECKED_OUT',
} as const
export type CartStatusType = typeof CartStatus[keyof typeof CartStatus]

export const DiscountType = {
  PERCENT: 'PERCENT',
  FIXED_AMOUNT: 'FIXED_AMOUNT',
} as const
export type DiscountTypeType = typeof DiscountType[keyof typeof DiscountType]

export const OrderStatus = {
  COMPLETED: 'COMPLETED',
} as const
export type OrderStatusType = typeof OrderStatus[keyof typeof OrderStatus]

/** 所有枚举名称列表 */
export const ALL_ENUMS = ['AccountRole', 'ToyCategory', 'ToyAgeGroup', 'StorefrontStatus', 'CartStatus', 'DiscountType', 'OrderStatus'] as const
