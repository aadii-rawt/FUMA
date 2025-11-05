/*
  Warnings:

  - You are about to drop the column `followedAt` on the `Contacts` table. All the data in the column will be lost.
  - You are about to drop the column `igId` on the `Contacts` table. All the data in the column will be lost.
  - You are about to drop the column `profilePic` on the `Contacts` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."user_contact_unique";

-- AlterTable
ALTER TABLE "Contacts" DROP COLUMN "followedAt",
DROP COLUMN "igId",
DROP COLUMN "profilePic";

-- CreateIndex
CREATE INDEX "user_contact_unique" ON "Contacts"("userId", "username");
