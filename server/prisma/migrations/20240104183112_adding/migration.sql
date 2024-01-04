/*
  Warnings:

  - Added the required column `email` to the `Charity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ukCharityNumber` to the `Charity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `charity` ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `ukCharityNumber` INTEGER NOT NULL;
