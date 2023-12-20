/*
  Warnings:

  - You are about to alter the column `title` on the `Book` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(150)`.
  - You are about to alter the column `description` on the `Book` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1000)`.
  - You are about to alter the column `title` on the `Movie` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(150)`.
  - You are about to alter the column `description` on the `Movie` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1000)`.
  - You are about to alter the column `title` on the `Podcast` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(150)`.
  - You are about to alter the column `description` on the `Podcast` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1000)`.
  - You are about to alter the column `firstName` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `lastName` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `biography` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1000)`.
  - The `type` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('Actor', 'Director', 'PodcastHost', 'Author');

-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "title" SET DATA TYPE VARCHAR(150),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(1000);

-- AlterTable
ALTER TABLE "Movie" ALTER COLUMN "title" SET DATA TYPE VARCHAR(150),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(1000),
ALTER COLUMN "actors" SET DEFAULT ARRAY[]::INTEGER[];

-- AlterTable
ALTER TABLE "Podcast" ALTER COLUMN "title" SET DATA TYPE VARCHAR(150),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(1000);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "firstName" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "lastName" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "biography" SET DATA TYPE VARCHAR(1000),
DROP COLUMN "type",
ADD COLUMN     "type" "UserType"[] DEFAULT ARRAY[]::"UserType"[];
