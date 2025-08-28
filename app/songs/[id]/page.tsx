import { notFound } from "next/navigation";
import { getSongByIdAsync } from "../../../data/mockSongs";
import { Song } from "@/lib/types/song";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import SongLyricsClient from "@/components/SongLyricsClient";

interface SongPageProps {
  params: Promise<{ id: string }>;
}

// Loading fallback for LyricsViewer
function LyricsViewerSkeleton() {
  return (
    <div className="bg-card rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
      <div className="space-y-8">
        {Array.from({ length: 3 }).map((_, sectionIndex) => (
          <div key={sectionIndex} className="space-y-3">
            <Skeleton className="h-6 w-24 mb-4" />
            <div className="space-y-2 ml-4">
              {Array.from({ length: 4 }).map((_, lineIndex) => (
                <Skeleton
                  key={lineIndex}
                  className="h-6"
                  style={{ width: `${Math.random() * 40 + 60}%` }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function SongPage({ params }: SongPageProps) {
  const { id } = await params;

  const song: Song | undefined = await getSongByIdAsync(id);

  if (!song) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Song Header - Static Server Component */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
            <div className="relative w-full sm:w-64 h-64 sm:h-64 rounded-lg overflow-hidden shadow-lg mx-auto sm:mx-0 max-w-64">
              <Image
                src={song.thumbnailUrl}
                alt={`${song.title} by ${song.artist}`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 640px) 256px, 256px"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB2aWV3Qm94PSIwIDAgMSAxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmM2Y0ZjYiLz48L3N2Zz4="
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 leading-tight">
                {song.title}
              </h1>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-3 sm:mb-4">
                {song.artist}
              </h2>
              <div className="space-y-1 sm:space-y-2 text-sm sm:text-base lg:text-lg">
                {song.album && (
                  <p className="text-muted-foreground">
                    Album: <span className="text-foreground">{song.album}</span>
                  </p>
                )}
                {song.releaseDate && (
                  <p className="text-muted-foreground">
                    Released:{" "}
                    <span className="text-foreground font-medium">
                      {new Date(song.releaseDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </p>
                )}
                {song.genre && (
                  <p className="text-muted-foreground">
                    Genre: <span className="text-foreground">{song.genre}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Lyrics Section - Client Component */}
        <Suspense fallback={<LyricsViewerSkeleton />}>
          <SongLyricsClient
            lyrics={song.lyrics}
            annotations={song.annotations}
          />
        </Suspense>
      </div>
    </div>
  );
}
