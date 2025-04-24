/*
  Warnings:

  - You are about to drop the column `ctps` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `pis` on the `Employee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "ctps",
DROP COLUMN "pis";

-- AlterTable
ALTER TABLE "Log" ADD COLUMN     "metadata" TEXT;
