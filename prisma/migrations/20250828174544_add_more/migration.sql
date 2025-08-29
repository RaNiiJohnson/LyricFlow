-- AlterTable
ALTER TABLE "album" ADD COLUMN     "description" TEXT,
ADD COLUMN     "genre" TEXT;

-- AlterTable
ALTER TABLE "artist" ADD COLUMN     "genres" TEXT[],
ADD COLUMN     "socialLinks" JSONB;

-- CreateTable
CREATE TABLE "artist_photo" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "width" INTEGER,
    "height" INTEGER,
    "category" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "artistId" TEXT NOT NULL,

    CONSTRAINT "artist_photo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "artist_photo" ADD CONSTRAINT "artist_photo_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
