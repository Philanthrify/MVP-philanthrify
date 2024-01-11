/*
  Warnings:

  - Added the required column `text` to the `ProjectUpdate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `projectupdate` ADD COLUMN `text` LONGTEXT NOT NULL;
