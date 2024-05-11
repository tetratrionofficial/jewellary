/*
  Warnings:

  - You are about to drop the column `permanent_address` on the `customer` table. All the data in the column will be lost.
  - Added the required column `city` to the `customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `customer` DROP COLUMN `permanent_address`,
    ADD COLUMN `city` VARCHAR(191) NOT NULL,
    ADD COLUMN `country` VARCHAR(191) NULL DEFAULT 'India',
    ADD COLUMN `emi_id` INTEGER NULL,
    ADD COLUMN `pincode` VARCHAR(191) NULL,
    ADD COLUMN `state` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `branch_id` INTEGER NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `updategoldrate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `goldrate` VARCHAR(191) NOT NULL,
    `goldrateId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `updategoldrate` ADD CONSTRAINT `updategoldrate_goldrateId_fkey` FOREIGN KEY (`goldrateId`) REFERENCES `goldrateGold`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
