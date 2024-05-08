/*
  Warnings:

  - You are about to drop the column `address` on the `branch` table. All the data in the column will be lost.
  - Added the required column `address1` to the `branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address2` to the `branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pincode` to the `branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `goldrateGold` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `branch` DROP COLUMN `address`,
    ADD COLUMN `address1` VARCHAR(191) NOT NULL,
    ADD COLUMN `address2` VARCHAR(191) NOT NULL,
    ADD COLUMN `city` VARCHAR(191) NOT NULL,
    ADD COLUMN `country` VARCHAR(191) NOT NULL DEFAULT 'India',
    ADD COLUMN `pincode` VARCHAR(191) NOT NULL,
    ADD COLUMN `state` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `goldrategold` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `mobile` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `permanent_address` VARCHAR(191) NOT NULL,
    `aadhaar` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `branch_id` VARCHAR(191) NOT NULL,
    `emp_id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
