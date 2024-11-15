/*
  Warnings:

  - You are about to drop the column `image` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `unit_price` on the `productsold` table. All the data in the column will be lost.
  - Added the required column `min_quantity_threshold` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purchase_price` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sale_price` to the `ProductSold` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `image`,
    DROP COLUMN `price`,
    ADD COLUMN `min_quantity_threshold` INTEGER NOT NULL,
    ADD COLUMN `purchase_price` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `productsold` DROP COLUMN `unit_price`,
    ADD COLUMN `sale_price` DOUBLE NOT NULL;
