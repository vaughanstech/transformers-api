/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Autobots` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Decepticons` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Autobots_name_key" ON "Autobots"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Decepticons_name_key" ON "Decepticons"("name");
