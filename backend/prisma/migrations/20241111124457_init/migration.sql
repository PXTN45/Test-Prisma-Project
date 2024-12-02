/*
  Warnings:

  - You are about to drop the column `isLike` on the `Shoe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Shoe` DROP COLUMN `isLike`;

-- CreateTable
CREATE TABLE `ShoeColor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `color` VARCHAR(191) NOT NULL,
    `shoeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ShoeSize` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `size` VARCHAR(191) NOT NULL,
    `shoeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LikeItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `shoeId` INTEGER NOT NULL,
    `addedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ShoeColor` ADD CONSTRAINT `ShoeColor_shoeId_fkey` FOREIGN KEY (`shoeId`) REFERENCES `Shoe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShoeSize` ADD CONSTRAINT `ShoeSize_shoeId_fkey` FOREIGN KEY (`shoeId`) REFERENCES `Shoe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LikeItem` ADD CONSTRAINT `LikeItem_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LikeItem` ADD CONSTRAINT `LikeItem_shoeId_fkey` FOREIGN KEY (`shoeId`) REFERENCES `Shoe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
