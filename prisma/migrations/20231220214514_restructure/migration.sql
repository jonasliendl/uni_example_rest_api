/*
  Warnings:

  - You are about to drop the column `authors` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `actors` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `directors` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `podcastHosts` on the `Podcast` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "UserToMovieType" AS ENUM ('Actor', 'Director');

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "authors";

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "actors",
DROP COLUMN "directors";

-- AlterTable
ALTER TABLE "Podcast" DROP COLUMN "podcastHosts";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "type";

-- DropEnum
DROP TYPE "UserType";

-- CreateTable
CREATE TABLE "UserToPodcastHost" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "podcastId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserToPodcastHost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserToMovie" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" "UserToMovieType" NOT NULL,
    "movieId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserToMovie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserToBook" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserToBook_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserToPodcastHost" ADD CONSTRAINT "UserToPodcastHost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToPodcastHost" ADD CONSTRAINT "UserToPodcastHost_podcastId_fkey" FOREIGN KEY ("podcastId") REFERENCES "Podcast"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToMovie" ADD CONSTRAINT "UserToMovie_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToMovie" ADD CONSTRAINT "UserToMovie_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToBook" ADD CONSTRAINT "UserToBook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToBook" ADD CONSTRAINT "UserToBook_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
