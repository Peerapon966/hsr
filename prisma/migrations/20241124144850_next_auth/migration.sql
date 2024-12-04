/*
  Warnings:

  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `registrant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `idx_news_id` ON `news`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `password` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `news` MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT;

-- DropTable
DROP TABLE `VerificationToken`;

-- DropTable
DROP TABLE `registrant`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `registrant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `verification_code` VARCHAR(16) NULL,
    `verified` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `UQ_Email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `idx_news` ON `news`(`locale`, `news_type`, `news_id`);

-- RenameIndex
ALTER TABLE `news` RENAME INDEX `idx_news_type` TO `news_type`;
