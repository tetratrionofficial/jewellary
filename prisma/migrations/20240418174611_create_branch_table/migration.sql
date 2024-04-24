-- CreateTable
CREATE TABLE `branch` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `branch_name` VARCHAR(191) NOT NULL,
    `branch_code` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `branch_email` VARCHAR(191) NOT NULL,
    `branch_mobile` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
