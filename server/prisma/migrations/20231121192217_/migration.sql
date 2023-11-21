-- CreateTable
CREATE TABLE `Charity` (
    `id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CharityMembership` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `charityId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `CharityMembership_userId_charityId_key`(`userId`, `charityId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `id` VARCHAR(191) NOT NULL,
    `projectId` VARCHAR(191) NOT NULL,
    `value` ENUM('HungerAndFoodSecurity', 'HomelessnessAndHousing', 'DisasterReliefAndRecovery', 'ChildWelfare', 'ElderlyCare', 'EducationAndLiteracy', 'HealthcareAndMedicalResearch', 'MentalHealthSupport', 'CancerResearchAndSupport', 'HIVAIDSPreventionAndSupport', 'HeartDiseaseResearch', 'DiabetesResearchAndSupport', 'EnvironmentalConservation', 'WildlifePreservation', 'MarineConservation', 'ClimateChangeMitigation', 'SustainableDevelopment', 'CleanWaterAndSanitation', 'RenewableEnergyInitiatives', 'AnimalWelfareAndRights', 'DomesticViolencePreventionAndSupport', 'HumanTraffickingPreventionAndAid', 'RefugeeAndImmigrantSupport', 'VeteransSupport', 'DisabilitiesSupportAndAdvocacy', 'MentalDisabilitiesSupport', 'PhysicalDisabilitiesSupport', 'ArtsAndCulture', 'HistoricalPreservationAndRestoration', 'ScientificResearchAndInnovation', 'UrbanDevelopmentAndPlanning', 'CommunityBuildingAndSocialWork', 'PovertyAlleviation', 'MicrofinanceAndEconomicEmpowerment', 'GirlsAndWomensRights', 'LGBTQPlusRightsAndSupport', 'RacialAndEthnicEquality', 'ReligiousAndSpiritualSupport', 'PeaceAndConflictResolution', 'LegalAidAndAdvocacy', 'SubstanceAbusePreventionAndTreatment', 'EducationForUnderprivilegedChildren', 'YouthDevelopmentAndLeadership', 'GlobalHealthInitiatives', 'OrphanageSupportAndAdoptionServices', 'DementiaAndAlzheimersSupport', 'OrganAndTissueDonationAwareness', 'CulturalExchangeAndUnderstanding', 'DigitalInclusionAndInternetAccess', 'HumanRightsAdvocacy', 'HealthServices', 'Technology', 'CleanWater', 'EconomicEmpowerment') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CharityMembership` ADD CONSTRAINT `CharityMembership_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CharityMembership` ADD CONSTRAINT `CharityMembership_charityId_fkey` FOREIGN KEY (`charityId`) REFERENCES `Charity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tag` ADD CONSTRAINT `Tag_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
