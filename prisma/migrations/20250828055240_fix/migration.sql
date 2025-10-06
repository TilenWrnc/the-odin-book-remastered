/*
  Warnings:

  - Changed the type of `status` on the `Friendship` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."StatusType" AS ENUM ('pending', 'friends');

-- AlterTable
ALTER TABLE "public"."Friendship" DROP COLUMN "status",
ADD COLUMN     "status" "public"."StatusType" NOT NULL;
