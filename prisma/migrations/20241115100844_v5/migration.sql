/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `productsold` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `sale` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `all_time_quantity` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `productsold` DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `sale` DROP COLUMN `updatedAt`,
    MODIFY `discount` DOUBLE NOT NULL DEFAULT 0;
