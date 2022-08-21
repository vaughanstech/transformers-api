/*
  Warnings:

  - The primary key for the `Autobots` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Autobots` table. All the data in the column will be lost.
  - The primary key for the `Decepticons` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Decepticons` table. All the data in the column will be lost.
  - The primary key for the `Dinobots` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Dinobots` table. All the data in the column will be lost.
  - The primary key for the `Games` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Games` table. All the data in the column will be lost.
  - The primary key for the `Movies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Movies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Autobots" DROP CONSTRAINT "Autobots_pkey",
DROP COLUMN "id";

-- AlterTable
ALTER TABLE "Decepticons" DROP CONSTRAINT "Decepticons_pkey",
DROP COLUMN "id";

-- AlterTable
ALTER TABLE "Dinobots" DROP CONSTRAINT "Dinobots_pkey",
DROP COLUMN "id";

-- AlterTable
ALTER TABLE "Games" DROP CONSTRAINT "Games_pkey",
DROP COLUMN "id";

-- AlterTable
ALTER TABLE "Movies" DROP CONSTRAINT "Movies_pkey",
DROP COLUMN "id";
