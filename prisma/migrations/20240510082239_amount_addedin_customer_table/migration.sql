/*
  Warnings:

  - Added the required column `amount` to the `customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `customer` ADD COLUMN `amount` VARCHAR(191) NOT NULL;
