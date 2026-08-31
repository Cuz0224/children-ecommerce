SET FOREIGN_KEY_CHECKS=0;
-- CreateTable
CREATE TABLE `AccountUser` (
    `id` VARCHAR(72) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `passwordHash` VARCHAR(255) NOT NULL,
    `role` ENUM('CUSTOMER', 'ADMIN') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `AccountUser_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ToyProduct` (
    `id` VARCHAR(72) NOT NULL,
    `sku` VARCHAR(100) NOT NULL,
    `category` ENUM('WOODEN_TOYS', 'STEM_MAKER', 'INFANT_PLUSH', 'CREATIVE_BUILDING', 'PRETEND_PLAY', 'ART_CRAFT', 'LEARNING', 'OUTDOOR', 'PLUSH') NOT NULL,
    `ageGroup` ENUM('AGE_0_2', 'AGE_3_5', 'AGE_6_8', 'AGE_8_PLUS', 'AGE_9_PLUS') NOT NULL,
    `unitPrice` DECIMAL(10, 2) NOT NULL,
    `originalPrice` DECIMAL(10, 2) NULL,
    `stockCount` INTEGER NOT NULL,
    `reorderThreshold` INTEGER NOT NULL,
    `storefrontStatus` ENUM('HIDDEN', 'LIVE', 'REMOVED') NOT NULL,
    `productImage` VARCHAR(700) NULL,
    `badge` VARCHAR(100) NULL,
    `name` VARCHAR(255) NULL,
    `subtitle` VARCHAR(255) NULL,
    `description` TEXT NULL,
    `longDescription` TEXT NULL,
    `highlights` JSON NOT NULL,
    `materials` VARCHAR(255) NULL,
    `safetyCertification` VARCHAR(255) NULL,
    `dimensions` VARCHAR(255) NULL,
    `boxIncludes` JSON NOT NULL,
    `ratingAverage` DECIMAL(3, 2) NULL,
    `reviewsCount` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ToyProduct_sku_key`(`sku`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ShoppingCart` (
    `id` VARCHAR(72) NOT NULL,
    `customerId` VARCHAR(72) NOT NULL,
    `cartStatus` ENUM('ACTIVE', 'CHECKED_OUT') NOT NULL,
    `appliedPromoId` VARCHAR(72) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CartItem` (
    `id` VARCHAR(72) NOT NULL,
    `cartId` VARCHAR(72) NOT NULL,
    `productId` VARCHAR(72) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `customerId` VARCHAR(72) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PromoCode` (
    `id` VARCHAR(72) NOT NULL,
    `code` VARCHAR(100) NOT NULL,
    `discountType` ENUM('PERCENT', 'FIXED_AMOUNT') NOT NULL,
    `discountValue` DECIMAL(10, 2) NOT NULL,
    `minSubtotal` DECIMAL(10, 2) NULL,
    `freeShippingThreshold` DECIMAL(10, 2) NULL,
    `isActive` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PromoCode_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SalesOrder` (
    `id` VARCHAR(72) NOT NULL,
    `customerId` VARCHAR(72) NOT NULL,
    `sourceCartId` VARCHAR(72) NOT NULL,
    `orderStatus` ENUM('COMPLETED') NOT NULL,
    `subtotal` DECIMAL(10, 2) NOT NULL,
    `discountAmount` DECIMAL(10, 2) NOT NULL,
    `shippingFee` DECIMAL(10, 2) NOT NULL,
    `totalAmount` DECIMAL(10, 2) NOT NULL,
    `appliedPromoCode` VARCHAR(100) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SalesOrderItem` (
    `id` VARCHAR(72) NOT NULL,
    `orderId` VARCHAR(72) NOT NULL,
    `productId` VARCHAR(72) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `unitPriceSnapshot` DECIMAL(10, 2) NOT NULL,
    `lineSubtotal` DECIMAL(10, 2) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ShoppingCart` ADD CONSTRAINT `ShoppingCart_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `AccountUser`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShoppingCart` ADD CONSTRAINT `ShoppingCart_appliedPromoId_fkey` FOREIGN KEY (`appliedPromoId`) REFERENCES `PromoCode`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `ShoppingCart`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `ToyProduct`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `AccountUser`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SalesOrder` ADD CONSTRAINT `SalesOrder_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `AccountUser`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SalesOrder` ADD CONSTRAINT `SalesOrder_sourceCartId_fkey` FOREIGN KEY (`sourceCartId`) REFERENCES `ShoppingCart`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SalesOrderItem` ADD CONSTRAINT `SalesOrderItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `SalesOrder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SalesOrderItem` ADD CONSTRAINT `SalesOrderItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `ToyProduct`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
SET FOREIGN_KEY_CHECKS=1;