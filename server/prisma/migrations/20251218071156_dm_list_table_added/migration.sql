-- CreateTable
CREATE TABLE "DMList" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "automationId" TEXT NOT NULL,
    "msgSendAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DMList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DMList" ADD CONSTRAINT "DMList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DMList" ADD CONSTRAINT "DMList_automationId_fkey" FOREIGN KEY ("automationId") REFERENCES "Automation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
