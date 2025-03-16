-- CreateEnum
CREATE TYPE "TrackType" AS ENUM ('FILE', 'LINK');

-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "type" "TrackType" NOT NULL DEFAULT 'FILE';
