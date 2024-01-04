/*
  Warnings:

  - The primary key for the `charity` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `ukCharityNumber` on the `charity` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `charityId` on the `charitymembership` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `charitymembership` DROP FOREIGN KEY `CharityMembership_charityId_fkey`;

-- AlterTable
ALTER TABLE `charity` DROP PRIMARY KEY,
    MODIFY `ukCharityNumber` INTEGER NOT NULL,
    ADD PRIMARY KEY (`ukCharityNumber`);

-- AlterTable
ALTER TABLE `charitymembership` MODIFY `charityId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `CharityMembership` ADD CONSTRAINT `CharityMembership_charityId_fkey` FOREIGN KEY (`charityId`) REFERENCES `Charity`(`ukCharityNumber`) ON DELETE RESTRICT ON UPDATE CASCADE;
