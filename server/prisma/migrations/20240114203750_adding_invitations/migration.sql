-- CreateTable
CREATE TABLE `TeamInvite` (
    `id` VARCHAR(191) NOT NULL,
    `charityId` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `charityUserType` ENUM('CHARITYHEAD', 'PROJECTLEAD', 'PROJECTWORKER') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TeamInvite` ADD CONSTRAINT `TeamInvite_charityId_fkey` FOREIGN KEY (`charityId`) REFERENCES `Charity`(`ukCharityNumber`) ON DELETE RESTRICT ON UPDATE CASCADE;
