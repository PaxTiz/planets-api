/*
  Warnings:

  - You are about to drop the column `galaxy_id` on the `BlackHole` table. All the data in the column will be lost.
  - You are about to drop the column `user_views` on the `BlackHole` table. All the data in the column will be lost.
  - You are about to drop the column `user_views` on the `Galaxy` table. All the data in the column will be lost.
  - You are about to drop the column `planet_id` on the `Moon` table. All the data in the column will be lost.
  - You are about to drop the column `user_views` on the `Moon` table. All the data in the column will be lost.
  - You are about to drop the column `galaxy_id` on the `Planet` table. All the data in the column will be lost.
  - You are about to drop the column `user_views` on the `Planet` table. All the data in the column will be lost.
  - You are about to drop the column `planet_id` on the `Satelite` table. All the data in the column will be lost.
  - You are about to drop the column `user_views` on the `Satelite` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[planetId]` on the table `Moon` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `galaxyId` to the `BlackHole` table without a default value. This is not possible if the table is not empty.
  - Added the required column `planetId` to the `Moon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `galaxyId` to the `Planet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `planetId` to the `Satelite` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `BlackHole` DROP FOREIGN KEY `BlackHole_galaxy_id_fkey`;

-- DropForeignKey
ALTER TABLE `Moon` DROP FOREIGN KEY `Moon_planet_id_fkey`;

-- DropForeignKey
ALTER TABLE `Planet` DROP FOREIGN KEY `Planet_galaxy_id_fkey`;

-- DropForeignKey
ALTER TABLE `Satelite` DROP FOREIGN KEY `Satelite_planet_id_fkey`;

-- AlterTable
ALTER TABLE `BlackHole` DROP COLUMN `galaxy_id`,
    DROP COLUMN `user_views`,
    ADD COLUMN `galaxyId` VARCHAR(36) NOT NULL,
    ADD COLUMN `userViews` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `Galaxy` DROP COLUMN `user_views`,
    ADD COLUMN `userViews` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `Moon` DROP COLUMN `planet_id`,
    DROP COLUMN `user_views`,
    ADD COLUMN `planetId` VARCHAR(36) NOT NULL,
    ADD COLUMN `userViews` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `Planet` DROP COLUMN `galaxy_id`,
    DROP COLUMN `user_views`,
    ADD COLUMN `galaxyId` VARCHAR(36) NOT NULL,
    ADD COLUMN `userViews` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `Satelite` DROP COLUMN `planet_id`,
    DROP COLUMN `user_views`,
    ADD COLUMN `planetId` VARCHAR(36) NOT NULL,
    ADD COLUMN `userViews` INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX `Moon_planetId_key` ON `Moon`(`planetId`);

-- AddForeignKey
ALTER TABLE `BlackHole` ADD CONSTRAINT `BlackHole_galaxyId_fkey` FOREIGN KEY (`galaxyId`) REFERENCES `Galaxy`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Planet` ADD CONSTRAINT `Planet_galaxyId_fkey` FOREIGN KEY (`galaxyId`) REFERENCES `Galaxy`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Moon` ADD CONSTRAINT `Moon_planetId_fkey` FOREIGN KEY (`planetId`) REFERENCES `Planet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Satelite` ADD CONSTRAINT `Satelite_planetId_fkey` FOREIGN KEY (`planetId`) REFERENCES `Planet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
