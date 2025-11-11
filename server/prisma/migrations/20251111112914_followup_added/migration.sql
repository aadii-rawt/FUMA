-- AlterTable
ALTER TABLE "Automation" ADD COLUMN     "followUp" BOOLEAN DEFAULT false,
ADD COLUMN     "followUpData" JSONB;
