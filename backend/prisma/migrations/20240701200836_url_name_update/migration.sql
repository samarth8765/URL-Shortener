/*
  Warnings:

  - You are about to drop the `URL` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "URL" DROP CONSTRAINT "URL_userId_fkey";

-- DropTable
DROP TABLE "URL";

-- CreateTable
CREATE TABLE "Url" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "shortURL" TEXT NOT NULL,
    "longURL" TEXT NOT NULL,
    "numberOfLinks" INTEGER NOT NULL,
    "TotalClicks" INTEGER NOT NULL,
    "TotalForAllLinks" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Url_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Url" ADD CONSTRAINT "Url_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
