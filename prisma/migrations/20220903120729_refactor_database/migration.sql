/*
  Warnings:

  - You are about to drop the `constellation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `galaxy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `planet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `planet_views` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `planet` DROP FOREIGN KEY `FK_7f8df2c355a7427e7df464808d3`;

-- DropForeignKey
ALTER TABLE `planet_views` DROP FOREIGN KEY `FK_d23280b8742bba5d43dffcd195b`;

-- DropForeignKey
ALTER TABLE `planet_views` DROP FOREIGN KEY `FK_e0d74f6c0015fbd543e80696380`;

-- DropTable
DROP TABLE `constellation`;

-- DropTable
DROP TABLE `galaxy`;

-- DropTable
DROP TABLE `planet`;

-- DropTable
DROP TABLE `planet_views`;

-- CreateTable
CREATE TABLE `Galaxy` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `user_views` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BlackHole` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `type` ENUM('stellar', 'supermassive', 'intermediate', 'primordial') NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `user_views` INTEGER NOT NULL DEFAULT 0,
    `galaxy_id` VARCHAR(36) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Planet` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `user_views` INTEGER NOT NULL DEFAULT 0,
    `galaxy_id` VARCHAR(36) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Moon` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `user_views` INTEGER NOT NULL DEFAULT 0,
    `planet_id` VARCHAR(36) NOT NULL,

    UNIQUE INDEX `Moon_planet_id_key`(`planet_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Satelite` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `user_views` INTEGER NOT NULL DEFAULT 0,
    `planet_id` VARCHAR(36) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BlackHole` ADD CONSTRAINT `BlackHole_galaxy_id_fkey` FOREIGN KEY (`galaxy_id`) REFERENCES `Galaxy`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Planet` ADD CONSTRAINT `Planet_galaxy_id_fkey` FOREIGN KEY (`galaxy_id`) REFERENCES `Galaxy`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Moon` ADD CONSTRAINT `Moon_planet_id_fkey` FOREIGN KEY (`planet_id`) REFERENCES `Planet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Satelite` ADD CONSTRAINT `Satelite_planet_id_fkey` FOREIGN KEY (`planet_id`) REFERENCES `Planet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
