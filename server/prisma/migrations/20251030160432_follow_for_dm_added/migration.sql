-- AlterTable
ALTER TABLE "Automation" ADD COLUMN     "followForDM" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "followForDMData" JSONB;
