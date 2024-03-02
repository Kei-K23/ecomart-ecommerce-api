/*
  Warnings:

  - A unique constraint covering the columns `[paymentExternalId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `paymentExternalId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentExternalId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_checkoutSessionId_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "paymentExternalId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "paymentExternalId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Order_paymentExternalId_key" ON "Order"("paymentExternalId");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_paymentExternalId_fkey" FOREIGN KEY ("paymentExternalId") REFERENCES "Order"("paymentExternalId") ON DELETE CASCADE ON UPDATE CASCADE;
