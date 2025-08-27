import { Suspense } from "react";
import { SongCard } from "@/components/SongCard";
import { getPopularSongsAsync } from "../data/mockSongs";
import { Skeleton } from "@/components/ui/skeleton";

// Loading component for the song grid
function SongGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Main song grid component - Server Component
async function SongGrid() {
  try {
    const popularSongs = await getPopularSongsAsync();

    if (!popularSongs || popularSongs.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">
              No songs available
            </h2>
            <p className="text-muted-foreground max-w-md">
              We couldn't find any songs to display right now. Please try again
              later.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {popularSongs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error loading songs:", error);
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-destructive">
            Something went wrong
          </h2>
          <p className="text-muted-foreground max-w-md">
            We encountered an error while loading the songs. Please refresh the
            page or try again later.
          </p>
        </div>
      </div>
    );
  }
}

export default async function Home() {
  // Server-side data fetching for song count
  const popularSongs = await getPopularSongsAsync();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
          Discover Music
          <span className="text-accent-gold"> Meanings</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore song lyrics with interactive annotations and discover the
          stories behind your favorite music.
        </p>
      </div>

      {/* Popular Songs Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
            Popular Songs
          </h2>
          <div className="text-sm text-muted-foreground">
            {popularSongs.length} songs available
          </div>
        </div>

        <Suspense fallback={<SongGridSkeleton />}>
          <SongGrid />
        </Suspense>
      </section>
    </div>
  );
}
