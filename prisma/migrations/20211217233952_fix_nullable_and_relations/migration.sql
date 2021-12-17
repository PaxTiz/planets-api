/*
  Warnings:

  - Made the column `image` on table `planet` required. This step will fail if there are existing NULL values in that column.
  - Made the column `galaxyId` on table `planet` required. This step will fail if there are existing NULL values in that column.
  - Made the column `planetId` on table `planet_views` required. This step will fail if there are existing NULL values in that column.
  - Made the column `categoryId` on table `quizz` required. This step will fail if there are existing NULL values in that column.
  - Made the column `quizzId` on table `quizz_questions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `roleId` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `planet` DROP FOREIGN KEY `FK_7f8df2c355a7427e7df464808d3`;

-- DropForeignKey
ALTER TABLE `planet_views` DROP FOREIGN KEY `FK_e0d74f6c0015fbd543e80696380`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `FK_c28e52f758e7bbc53828db92194`;

-- AlterTable
ALTER TABLE `planet` MODIFY `image` VARCHAR(255) NOT NULL,
    MODIFY `galaxyId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `planet_views` MODIFY `planetId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `quizz` MODIFY `categoryId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `quizz_questions` MODIFY `quizzId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `roleId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `planet` ADD CONSTRAINT `FK_7f8df2c355a7427e7df464808d3` FOREIGN KEY (`galaxyId`) REFERENCES `galaxy`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `planet_views` ADD CONSTRAINT `FK_e0d74f6c0015fbd543e80696380` FOREIGN KEY (`planetId`) REFERENCES `planet`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `FK_c28e52f758e7bbc53828db92194` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `quizz` ADD CONSTRAINT `FK_c28e52f758e7bbc53828db92195` FOREIGN KEY (`categoryId`) REFERENCES `quizz_categories`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `quizz_questions` ADD CONSTRAINT `FK_c28e52f758e7bbc53828db92196` FOREIGN KEY (`quizzId`) REFERENCES `quizz`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
