/*
  Warnings:

  - Made the column `url` on table `Song` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "played" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "thumbnail" TEXT,
ALTER COLUMN "url" SET NOT NULL;
