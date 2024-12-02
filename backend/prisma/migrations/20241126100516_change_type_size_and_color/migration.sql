/*
  Warnings:

  - You are about to drop the `Details` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShoeColor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShoeSize` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `colors` to the `Shoe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `detail` to the `Shoe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sizes` to the `Shoe` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Details` DROP FOREIGN KEY `Details_shoeId_fkey`;

-- DropForeignKey
ALTER TABLE `ShoeColor` DROP FOREIGN KEY `ShoeColor_shoeId_fkey`;

-- DropForeignKey
ALTER TABLE `ShoeSize` DROP FOREIGN KEY `ShoeSize_shoeId_fkey`;

-- AlterTable
ALTER TABLE `Shoe` ADD COLUMN `colors` VARCHAR(191) NOT NULL,
    ADD COLUMN `detail` VARCHAR(191) NOT NULL,
    ADD COLUMN `sizes` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Details`;

-- DropTable
DROP TABLE `ShoeColor`;

-- DropTable
DROP TABLE `ShoeSize`;
