/*
  Warnings:

  - A unique constraint covering the columns `[friendshipId]` on the table `messageChat` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `friendshipId` to the `messageChat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."messageChat" ADD COLUMN     "friendshipId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "messageChat_friendshipId_key" ON "public"."messageChat"("friendshipId");

-- AddForeignKey
ALTER TABLE "public"."messageChat" ADD CONSTRAINT "messageChat_friendshipId_fkey" FOREIGN KEY ("friendshipId") REFERENCES "public"."Friendship"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
