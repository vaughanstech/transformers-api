/*
  Warnings:

  - You are about to drop the column `image` on the `Autobots` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Decepticons` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Autobots" DROP COLUMN "image";

-- AlterTable
ALTER TABLE "Decepticons" DROP COLUMN "image";
