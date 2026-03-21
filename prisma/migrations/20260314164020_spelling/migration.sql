/*
  Warnings:

  - You are about to drop the column `curerntSongId` on the `Room` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[currentSongId]` on the table `Room` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_curerntSongId_fkey";

-- DropIndex
DROP INDEX "Room_curerntSongId_key";

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "curerntSongId",
ADD COLUMN     "currentSongId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Room_currentSongId_key" ON "Room"("currentSongId");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_currentSongId_fkey" FOREIGN KEY ("currentSongId") REFERENCES "Song"("id") ON DELETE SET NULL ON UPDATE CASCADE;
