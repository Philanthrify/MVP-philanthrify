/*
  Warnings:

  - Added the required column `amount` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `amount` DOUBLE NOT NULL;