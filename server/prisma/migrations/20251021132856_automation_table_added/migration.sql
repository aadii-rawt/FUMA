-- CreateEnum
CREATE TYPE "AutomationStatus" AS ENUM ('DRAFT', 'LIVE', 'PAUSED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "Automation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "AutomationStatus" NOT NULL DEFAULT 'DRAFT',
    "publishedAt" TIMESTAMP(3),
    "postMediaId" TEXT NOT NULL,
    "postThumbnail" TEXT,
    "anyKeyword" BOOLEAN NOT NULL DEFAULT false,
    "keywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "dmText" TEXT NOT NULL,
    "dmImageUrl" TEXT,
    "dmLinks" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Automation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Automation_userId_status_idx" ON "Automation"("userId", "status");

-- CreateIndex
CREATE INDEX "Automation_status_publishedAt_idx" ON "Automation"("status", "publishedAt");

-- CreateIndex
CREATE INDEX "Automation_postMediaId_idx" ON "Automation"("postMediaId");

-- AddForeignKey
ALTER TABLE "Automation" ADD CONSTRAINT "Automation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
