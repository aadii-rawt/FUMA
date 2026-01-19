-- AlterTable
ALTER TABLE "Automation" ADD COLUMN     "hasProducts" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "products" JSONB,
ALTER COLUMN "dmText" DROP NOT NULL;
