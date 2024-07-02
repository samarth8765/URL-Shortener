/*
  Warnings:

  - You are about to drop the column `TotalLinks` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "TotalLinks",
ADD COLUMN     "TotalClicks" INTEGER NOT NULL DEFAULT 0;
