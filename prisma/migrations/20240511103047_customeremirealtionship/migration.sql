/*
  Warnings:

  - You are about to drop the column `emi_id` on the `customer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[customerId]` on the table `emi` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customerId` to the `emi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `customer` DROP COLUMN `emi_id`;

-- AlterTable
ALTER TABLE `emi` ADD COLUMN `customerId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `emi_customerId_key` ON `emi`(`customerId`);

-- AddForeignKey
ALTER TABLE `emi` ADD CONSTRAINT `emi_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
