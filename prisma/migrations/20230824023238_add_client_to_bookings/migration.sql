/*
  Warnings:

  - Added the required column `client_email` to the `bookings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bookings` ADD COLUMN `client_email` VARCHAR(191) NOT NULL;
