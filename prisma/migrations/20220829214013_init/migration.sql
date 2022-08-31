/*
  Warnings:

  - You are about to drop the column `Developers` on the `Games` table. All the data in the column will be lost.
  - Added the required column `developers` to the `Games` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Games" DROP COLUMN "Developers",
ADD COLUMN     "developers" TEXT NOT NULL;
