/*
  Warnings:

  - You are about to drop the column `userId` on the `project` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Project_userId_fkey` ON `project`;

-- AlterTable
ALTER TABLE `project` DROP COLUMN `userId`;
