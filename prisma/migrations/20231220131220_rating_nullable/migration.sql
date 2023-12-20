/*
  Warnings:

  - You are about to drop the column `podcastHosts` on the `Podcast` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Movie" ALTER COLUMN "rating" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Podcast" DROP COLUMN "podcastHosts",
ADD COLUMN     "podcastHostsId" INTEGER[];
