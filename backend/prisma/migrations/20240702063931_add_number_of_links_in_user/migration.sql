/*
  Warnings:

  - You are about to drop the column `numberOfLinks` on the `Url` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Url" DROP COLUMN "numberOfLinks";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "numberOfLinks" INTEGER NOT NULL DEFAULT 0;
