/*
  Warnings:

  - You are about to drop the column `orderId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `transaction` on the `Payment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[checkoutSessionId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `checkoutSessionId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `checkoutSessionId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `paymentStatus` on the `Payment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
ALTER TYPE "OrderType" ADD VALUE 'FAILED';

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_orderId_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "checkoutSessionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "orderId",
DROP COLUMN "transaction",
ADD COLUMN     "checkoutSessionId" TEXT NOT NULL,
DROP COLUMN "paymentStatus",
ADD COLUMN     "paymentStatus" TEXT NOT NULL;

-- DropEnum
DROP TYPE "PaymentStatusType";

-- CreateIndex
CREATE UNIQUE INDEX "Order_checkoutSessionId_key" ON "Order"("checkoutSessionId");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_checkoutSessionId_fkey" FOREIGN KEY ("checkoutSessionId") REFERENCES "Order"("checkoutSessionId") ON DELETE CASCADE ON UPDATE CASCADE;
