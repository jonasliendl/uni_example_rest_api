/*
  Warnings:

  - You are about to drop the `UserToBook` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserToPodcastHost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserToBook" DROP CONSTRAINT "UserToBook_bookId_fkey";

-- DropForeignKey
ALTER TABLE "UserToBook" DROP CONSTRAINT "UserToBook_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserToPodcastHost" DROP CONSTRAINT "UserToPodcastHost_podcastId_fkey";

-- DropForeignKey
ALTER TABLE "UserToPodcastHost" DROP CONSTRAINT "UserToPodcastHost_userId_fkey";

-- DropTable
DROP TABLE "UserToBook";

-- DropTable
DROP TABLE "UserToPodcastHost";

-- CreateTable
CREATE TABLE "_PodcastToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_BookToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PodcastToUser_AB_unique" ON "_PodcastToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PodcastToUser_B_index" ON "_PodcastToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BookToUser_AB_unique" ON "_BookToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_BookToUser_B_index" ON "_BookToUser"("B");

-- AddForeignKey
ALTER TABLE "_PodcastToUser" ADD CONSTRAINT "_PodcastToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Podcast"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PodcastToUser" ADD CONSTRAINT "_PodcastToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToUser" ADD CONSTRAINT "_BookToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToUser" ADD CONSTRAINT "_BookToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
