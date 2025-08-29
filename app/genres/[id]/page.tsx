import { notFound } from "next/navigation";
import { getGenreByIdAsync } from "../../../data/mockGenres";
import { getSongByIdAsync } from "../../../data/mockSongs";
import { Genre } from "@/lib/types/genre";
import { Song } from "@/lib/types/song";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { SongCard } from "@/components/SongCard";
import Image from "next/image";
import { Music, TrendingUp, Headphones, Star } from "lucide-react";

interface GenrePageProps {
  params: Promise<{ id: string }>;
}

// Loading fallback for songs
function SongsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Genre Songs Component
async function GenreSongs({ songIds }: { songIds: string[] }) {
  try {
    const songs: Song[] = [];

    for (const songId of songIds) {
      const song = await getSongByIdAsync(songId);
      if (song) {
        songs.push(song);
      }
    }

    if (songs.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="space-y-4">
            <Music className="h-12 w-12 text-muted-foreground mx-auto" />
            <h3 className="text-xl font-semibold text-foreground">
              No songs available
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              We couldn't find any songs in this genre right now. Check back
              later for updates.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {songs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error loading genre songs:", error);
    return (
      <div className="text-center py-12">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-destructive">
            Something went wrong
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            We encountered an error while loading the songs. Please refresh the
            page or try again later.
          </p>
        </div>
      </div>
    );
  }
}

export default async function GenrePage({ params }: GenrePageProps) {
  const { id } = await params;

  const genre: Genre | undefined = await getGenreByIdAsync(id);

  if (!genre) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Genre Header */}
        <div className="mb-8 sm:mb-12">
          {/* Hero Section with Background Image */}
          <div className="relative h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden mb-8">
            <Image
              src={genre.imageUrl}
              alt={genre.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
            />

            {/* Gradient Overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent"
              style={{
                background: `linear-gradient(135deg, ${genre.color}40 0%, ${genre.color}20 30%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.8) 100%)`,
              }}
            />

            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-end p-6 sm:p-8 md:p-12">
              <div className="text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-4 h-4 rounded-full border-2 border-white/80"
                    style={{ backgroundColor: genre.color }}
                  />
                  <span className="text-sm sm:text-base font-medium opacity-90">
                    Genre
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
                  {genre.name}
                </h1>

                <p className="text-base sm:text-lg text-white/90 max-w-2xl leading-relaxed mb-6">
                  {genre.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-white/80">
                  <div className="flex items-center gap-2">
                    <Music className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-sm sm:text-base">
                      {genre.songCount} song{genre.songCount !== 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-sm sm:text-base">Popular</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Headphones className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-sm sm:text-base">Curated</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Genre Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 sm:mb-12">
          <div className="text-center p-6 bg-card/50 rounded-lg border border-border">
            <div className="text-3xl font-bold text-accent mb-2">
              {genre.songCount}
            </div>
            <div className="text-sm text-muted-foreground">Total Songs</div>
          </div>

          <div className="text-center p-6 bg-card/50 rounded-lg border border-border">
            <div className="text-3xl font-bold text-accent mb-2">
              {genre.popularSongs.length}
            </div>
            <div className="text-sm text-muted-foreground">Popular Tracks</div>
          </div>

          <div className="text-center p-6 bg-card/50 rounded-lg border border-border">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="h-6 w-6 text-accent fill-current" />
              <div className="text-3xl font-bold text-accent">4.8</div>
            </div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </div>
        </div>

        {/* Popular Songs Section */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div className="flex items-center gap-3">
              <div
                className="w-6 h-6 rounded-full"
                style={{ backgroundColor: genre.color }}
              />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground">
                Popular in {genre.name}
              </h2>
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">
              {genre.popularSongs.length} song
              {genre.popularSongs.length !== 1 ? "s" : ""}
            </div>
          </div>

          <Suspense fallback={<SongsGridSkeleton />}>
            <GenreSongs songIds={genre.popularSongs} />
          </Suspense>
        </section>

        {/* Genre Description */}
        <section className="mb-8 sm:mb-12">
          <div className="bg-card/30 rounded-lg p-6 sm:p-8 border border-border">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: genre.color }}
              />
              About {genre.name}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {genre.description} This genre has shaped music culture and
              continues to influence artists worldwide. Discover the stories
              behind the songs and explore the rich musical heritage that
              defines {genre.name.toLowerCase()}.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
