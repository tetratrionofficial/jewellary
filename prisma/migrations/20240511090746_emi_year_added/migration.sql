/*
  Warnings:

  - You are about to drop the `goldrategold` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `emi_year` to the `emi` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `updategoldrate` DROP FOREIGN KEY `updategoldrate_goldrateId_fkey`;

-- AlterTable
ALTER TABLE `emi` ADD COLUMN `emi_year` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `goldrategold`;

-- CreateTable
CREATE TABLE `goldrate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gold_rate` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `updategoldrate` ADD CONSTRAINT `updategoldrate_goldrateId_fkey` FOREIGN KEY (`goldrateId`) REFERENCES `goldrate`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
