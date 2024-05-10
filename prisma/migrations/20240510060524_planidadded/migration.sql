/*
  Warnings:

  - You are about to drop the column `emp_id` on the `customer` table. All the data in the column will be lost.
  - Added the required column `plan_id` to the `customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `customer` DROP COLUMN `emp_id`,
    ADD COLUMN `plan_id` VARCHAR(191) NOT NULL;
