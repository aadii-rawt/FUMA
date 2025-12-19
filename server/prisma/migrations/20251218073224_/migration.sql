/*
  Warnings:

  - You are about to drop the `DMList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."DMList" DROP CONSTRAINT "DMList_automationId_fkey";

-- DropForeignKey
ALTER TABLE "public"."DMList" DROP CONSTRAINT "DMList_userId_fkey";

-- DropTable
DROP TABLE "public"."DMList";

-- CreateTable
CREATE TABLE "dmList" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "automationId" TEXT NOT NULL,
    "msgSendAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dmList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "dmList" ADD CONSTRAINT "dmList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dmList" ADD CONSTRAINT "dmList_automationId_fkey" FOREIGN KEY ("automationId") REFERENCES "Automation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
