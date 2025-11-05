-- AlterTable
ALTER TABLE "Automation" ADD COLUMN     "caption" TEXT;

-- CreateTable
CREATE TABLE "Contacts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "igId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "profilePic" TEXT,
    "followedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contacts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "user_contact_unique" ON "Contacts"("userId", "igId");

-- AddForeignKey
ALTER TABLE "Contacts" ADD CONSTRAINT "Contacts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
