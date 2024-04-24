/*
  Warnings:

  - Added the required column `admin_id` to the `branch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `branch` ADD COLUMN `admin_id` INTEGER NOT NULL;
