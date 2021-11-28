/*
  Warnings:

  - You are about to drop the column `constellationId` on the `galaxy` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `galaxy` DROP FOREIGN KEY `FK_be350151d5d7713d748192b067a`;

-- AlterTable
ALTER TABLE `galaxy` DROP COLUMN `constellationId`;
