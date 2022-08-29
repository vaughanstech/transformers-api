/*
  Warnings:

  - Added the required column `Developers` to the `Games` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `release_date` on the `Games` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `director` to the `Movies` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `release_date` on the `Movies` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Games" ADD COLUMN     "Developers" TEXT NOT NULL,
DROP COLUMN "release_date",
ADD COLUMN     "release_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Movies" ADD COLUMN     "director" TEXT NOT NULL,
DROP COLUMN "release_date",
ADD COLUMN     "release_date" TIMESTAMP(3) NOT NULL;
