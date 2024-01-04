/*
  Warnings:

  - The primary key for the `charity` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `charitymembership` DROP FOREIGN KEY `CharityMembership_charityId_fkey`;

-- AlterTable
ALTER TABLE `charity` DROP PRIMARY KEY,
    MODIFY `ukCharityNumber` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`ukCharityNumber`);

-- AddForeignKey
ALTER TABLE `CharityMembership` ADD CONSTRAINT `CharityMembership_charityId_fkey` FOREIGN KEY (`charityId`) REFERENCES `Charity`(`ukCharityNumber`) ON DELETE RESTRICT ON UPDATE CASCADE;
