-- DropForeignKey
ALTER TABLE "public"."post" DROP CONSTRAINT "post_authorId_fkey";

-- AlterTable
ALTER TABLE "public"."post" ALTER COLUMN "authorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."post" ADD CONSTRAINT "post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
