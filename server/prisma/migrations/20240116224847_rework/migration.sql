/*
  Warnings:

  - You are about to drop the column `charityUserType` on the `charitymembership` table. All the data in the column will be lost.
  - You are about to drop the `teaminvite` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `charityHead` to the `CharityMembership` table without a default value. This is not possible if the table is not empty.
  - Added the required column `charityId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `project` DROP FOREIGN KEY `Project_userId_fkey`;

-- DropForeignKey
ALTER TABLE `teaminvite` DROP FOREIGN KEY `TeamInvite_charityId_fkey`;

-- AlterTable
ALTER TABLE `charitymembership` DROP COLUMN `charityUserType`,
    ADD COLUMN `charityHead` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `project` ADD COLUMN `charityId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `teaminvite`;

-- CreateTable
CREATE TABLE `ProjectMembership` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `projectId` VARCHAR(191) NOT NULL,
    `projectLead` BOOLEAN NOT NULL,

    UNIQUE INDEX `ProjectMembership_userId_projectId_key`(`userId`, `projectId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProjectMembership` ADD CONSTRAINT `ProjectMembership_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectMembership` ADD CONSTRAINT `ProjectMembership_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_charityId_fkey` FOREIGN KEY (`charityId`) REFERENCES `Charity`(`ukCharityNumber`) ON DELETE RESTRICT ON UPDATE CASCADE;
