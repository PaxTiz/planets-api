-- CreateTable
CREATE TABLE `constellation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `galaxy` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `constellationId` INTEGER NULL,
    `planetId` INTEGER NULL,

    INDEX `FK_a5457af752c62c0389b677ad76e`(`planetId`),
    INDEX `FK_be350151d5d7713d748192b067a`(`constellationId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `planet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `description` TEXT NOT NULL,
    `image` VARCHAR(255) NULL,
    `sun_distance_ly` FLOAT NOT NULL,
    `sun_distance_km` INTEGER NOT NULL,
    `composition` LONGTEXT NULL,
    `galaxyId` INTEGER NULL,

    INDEX `FK_7f8df2c355a7427e7df464808d3`(`galaxyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `planet_views` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `count` INTEGER NOT NULL DEFAULT 1,
    `ip` VARCHAR(255) NOT NULL,
    `userId` INTEGER NULL,
    `planetId` INTEGER NULL,

    INDEX `FK_d23280b8742bba5d43dffcd195b`(`userId`),
    INDEX `FK_e0d74f6c0015fbd543e80696380`(`planetId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `displayName` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `roleId` INTEGER NULL,

    INDEX `FK_c28e52f758e7bbc53828db92194`(`roleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `galaxy` ADD CONSTRAINT `FK_be350151d5d7713d748192b067a` FOREIGN KEY (`constellationId`) REFERENCES `constellation`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `galaxy` ADD CONSTRAINT `FK_a5457af752c62c0389b677ad76e` FOREIGN KEY (`planetId`) REFERENCES `planet`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `planet` ADD CONSTRAINT `FK_7f8df2c355a7427e7df464808d3` FOREIGN KEY (`galaxyId`) REFERENCES `galaxy`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `planet_views` ADD CONSTRAINT `FK_e0d74f6c0015fbd543e80696380` FOREIGN KEY (`planetId`) REFERENCES `planet`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `planet_views` ADD CONSTRAINT `FK_d23280b8742bba5d43dffcd195b` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `FK_c28e52f758e7bbc53828db92194` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
