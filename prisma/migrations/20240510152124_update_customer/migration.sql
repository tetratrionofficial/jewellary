-- AlterTable
ALTER TABLE `customer` MODIFY `branch_id` VARCHAR(191) NULL,
    MODIFY `plan_id` VARCHAR(191) NULL,
    MODIFY `amount` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `emi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `emi_month` VARCHAR(191) NOT NULL,
    `payment_status` BOOLEAN NOT NULL DEFAULT false,
    `dateOfPayment` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
