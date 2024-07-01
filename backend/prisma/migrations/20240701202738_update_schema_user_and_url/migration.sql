/*
  Warnings:

  - You are about to drop the column `TotalForAllLinks` on the `Url` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Url" DROP COLUMN "TotalForAllLinks",
ALTER COLUMN "numberOfLinks" SET DEFAULT 0,
ALTER COLUMN "TotalClicks" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "TotalLinks" INTEGER NOT NULL DEFAULT 0;
