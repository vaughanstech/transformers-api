/*
  Warnings:

  - Added the required column `description` to the `Autobots` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transforms_into` to the `Autobots` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Decepticons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transforms_into` to the `Decepticons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Autobots" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "transforms_into" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Decepticons" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "transforms_into" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Dinobots" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "transform_into" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "Autobot_or_Decepticon" TEXT NOT NULL,

    CONSTRAINT "Dinobots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movies" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "release_date" TEXT NOT NULL,

    CONSTRAINT "Movies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Games" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "release_date" TEXT NOT NULL,
    "platforms" TEXT[],

    CONSTRAINT "Games_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dinobots_name_key" ON "Dinobots"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Movies_name_key" ON "Movies"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Games_name_key" ON "Games"("name");
