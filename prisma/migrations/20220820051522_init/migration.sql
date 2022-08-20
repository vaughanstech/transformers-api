/*
  Warnings:

  - You are about to drop the column `first_apperance_date` on the `Autobots` table. All the data in the column will be lost.
  - Added the required column `first_appearance_date` to the `Autobots` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Autobots" DROP COLUMN "first_apperance_date",
ADD COLUMN     "first_appearance_date" TIMESTAMP(3) NOT NULL;
