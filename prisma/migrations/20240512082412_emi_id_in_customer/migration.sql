/*
  Warnings:

  - You are about to drop the column `customerId` on the `emi` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `emi` DROP FOREIGN KEY `emi_customerId_fkey`;

-- AlterTable
ALTER TABLE `customer` ADD COLUMN `emi_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `emi` DROP COLUMN `customerId`;
