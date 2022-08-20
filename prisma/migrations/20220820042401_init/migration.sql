-- CreateTable
CREATE TABLE "Autobots" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "first_apperance_date" TIMESTAMP(3) NOT NULL,
    "first_appearance" TEXT NOT NULL,

    CONSTRAINT "Autobots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Decepticons" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "first_appearance_date" TIMESTAMP(3) NOT NULL,
    "first_appearance" TEXT NOT NULL,

    CONSTRAINT "Decepticons_pkey" PRIMARY KEY ("id")
);
