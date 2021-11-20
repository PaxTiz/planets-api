/*
  Warnings:

  - You are about to drop the column `sun_distance_km` on the `planet` table. All the data in the column will be lost.
  - You are about to drop the column `sun_distance_ly` on the `planet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `planet` DROP COLUMN `sun_distance_km`,
    DROP COLUMN `sun_distance_ly`,
    ADD COLUMN `distance` FLOAT NOT NULL DEFAULT 0,
    ADD COLUMN `distance_unit` VARCHAR(3) NOT NULL DEFAULT 'km';
