-- AlterTable
ALTER TABLE "Automation" ADD COLUMN     "commentReply" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "openingMsg" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "openingMsgData" JSONB;
