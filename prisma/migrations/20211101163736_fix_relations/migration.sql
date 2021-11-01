/*
  Warnings:

  - You are about to drop the column `planetId` on the `galaxy` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `galaxy` DROP FOREIGN KEY `FK_a5457af752c62c0389b677ad76e`;

-- AlterTable
ALTER TABLE `galaxy` DROP COLUMN `planetId`;
