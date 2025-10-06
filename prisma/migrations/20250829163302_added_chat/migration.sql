/*
  Warnings:

  - Added the required column `messageChatId` to the `message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."message" ADD COLUMN     "messageChatId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "public"."messageChat" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "messageChat_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."message" ADD CONSTRAINT "message_messageChatId_fkey" FOREIGN KEY ("messageChatId") REFERENCES "public"."messageChat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
