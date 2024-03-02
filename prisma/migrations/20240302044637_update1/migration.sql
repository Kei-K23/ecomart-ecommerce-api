/*
  Warnings:

  - You are about to drop the column `paymentExternalId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `paymentExternalId` on the `Payment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_paymentExternalId_fkey";

-- DropIndex
DROP INDEX "Order_paymentExternalId_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "paymentExternalId";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "paymentExternalId";

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_checkoutSessionId_fkey" FOREIGN KEY ("checkoutSessionId") REFERENCES "Order"("checkoutSessionId") ON DELETE CASCADE ON UPDATE CASCADE;
