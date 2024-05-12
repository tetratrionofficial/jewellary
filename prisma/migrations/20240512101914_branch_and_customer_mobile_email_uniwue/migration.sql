/*
  Warnings:

  - A unique constraint covering the columns `[branch_email]` on the table `branch` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[branch_mobile]` on the table `branch` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mobile]` on the table `customer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `branch_branch_email_key` ON `branch`(`branch_email`);

-- CreateIndex
CREATE UNIQUE INDEX `branch_branch_mobile_key` ON `branch`(`branch_mobile`);

-- CreateIndex
CREATE UNIQUE INDEX `customer_email_key` ON `customer`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `customer_mobile_key` ON `customer`(`mobile`);
