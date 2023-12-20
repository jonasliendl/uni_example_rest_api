/*
  Warnings:

  - You are about to drop the column `podcastHostsId` on the `Podcast` table. All the data in the column will be lost.
  - Made the column `description` on table `Book` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Podcast` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "Podcast" DROP COLUMN "podcastHostsId",
ADD COLUMN     "podcastHosts" INTEGER[],
ALTER COLUMN "description" SET NOT NULL;
