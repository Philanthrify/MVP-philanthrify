-- AlterTable
ALTER TABLE `project` ADD COLUMN `country` VARCHAR(191) NULL DEFAULT 'Unknown',
    MODIFY `challenge` VARCHAR(191) NOT NULL,
    MODIFY `solution` VARCHAR(191) NOT NULL,
    MODIFY `donationUsage` VARCHAR(191) NOT NULL,
    MODIFY `futureImpact` VARCHAR(191) NOT NULL;
