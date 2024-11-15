/*
  Warnings:

  - You are about to drop the `sales` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `productsold` DROP FOREIGN KEY `ProductSold_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `productsold` DROP FOREIGN KEY `ProductSold_sales_id_fkey`;

-- DropTable
DROP TABLE `sales`;

-- CreateTable
CREATE TABLE `Sale` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `total_price` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `discount` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductSold` ADD CONSTRAINT `ProductSold_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductSold` ADD CONSTRAINT `ProductSold_sales_id_fkey` FOREIGN KEY (`sales_id`) REFERENCES `Sale`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
