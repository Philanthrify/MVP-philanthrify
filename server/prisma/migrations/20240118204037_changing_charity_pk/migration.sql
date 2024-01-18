/*
  Warnings:

  - The primary key for the `charity` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `charitycountry` DROP FOREIGN KEY `CharityCountry_charityId_fkey`;

-- DropForeignKey
ALTER TABLE `charitylink` DROP FOREIGN KEY `CharityLink_charityId_fkey`;

-- DropForeignKey
ALTER TABLE `charitymembership` DROP FOREIGN KEY `CharityMembership_charityId_fkey`;

-- DropForeignKey
ALTER TABLE `charitytag` DROP FOREIGN KEY `CharityTag_charityId_fkey`;

-- DropForeignKey
ALTER TABLE `project` DROP FOREIGN KEY `Project_charityId_fkey`;

-- AlterTable
ALTER TABLE `charity` DROP PRIMARY KEY,
    MODIFY `ukCharityNumber` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`ukCharityNumber`);

-- AlterTable
ALTER TABLE `charitycountry` MODIFY `charityId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `charitylink` MODIFY `charityId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `charitymembership` MODIFY `charityId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `charitytag` MODIFY `charityId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `project` MODIFY `charityId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `CharityCountry` ADD CONSTRAINT `CharityCountry_charityId_fkey` FOREIGN KEY (`charityId`) REFERENCES `Charity`(`ukCharityNumber`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CharityTag` ADD CONSTRAINT `CharityTag_charityId_fkey` FOREIGN KEY (`charityId`) REFERENCES `Charity`(`ukCharityNumber`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CharityLink` ADD CONSTRAINT `CharityLink_charityId_fkey` FOREIGN KEY (`charityId`) REFERENCES `Charity`(`ukCharityNumber`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CharityMembership` ADD CONSTRAINT `CharityMembership_charityId_fkey` FOREIGN KEY (`charityId`) REFERENCES `Charity`(`ukCharityNumber`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_charityId_fkey` FOREIGN KEY (`charityId`) REFERENCES `Charity`(`ukCharityNumber`) ON DELETE RESTRICT ON UPDATE CASCADE;
