-- DropForeignKey
ALTER TABLE "public"."messageChat" DROP CONSTRAINT "messageChat_friendshipId_fkey";

-- AddForeignKey
ALTER TABLE "public"."messageChat" ADD CONSTRAINT "messageChat_friendshipId_fkey" FOREIGN KEY ("friendshipId") REFERENCES "public"."Friendship"("id") ON DELETE CASCADE ON UPDATE CASCADE;
