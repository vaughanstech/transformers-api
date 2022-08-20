/*
  Warnings:

  - Changed the type of `first_appearance_date` on the `Autobots` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `first_appearance_date` on the `Decepticons` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Autobots" DROP COLUMN "first_appearance_date",
ADD COLUMN     "first_appearance_date" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Decepticons" DROP COLUMN "first_appearance_date",
ADD COLUMN     "first_appearance_date" INTEGER NOT NULL;
