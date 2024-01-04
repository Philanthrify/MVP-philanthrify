/*
  Warnings:

  - Added the required column `charityName` to the `Charity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `charity` ADD COLUMN `charityName` VARCHAR(191) NOT NULL;
