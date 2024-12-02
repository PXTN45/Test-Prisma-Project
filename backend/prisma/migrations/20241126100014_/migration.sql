-- CreateTable
CREATE TABLE `Details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shoeId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Details` ADD CONSTRAINT `Details_shoeId_fkey` FOREIGN KEY (`shoeId`) REFERENCES `Shoe`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
