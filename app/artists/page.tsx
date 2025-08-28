import { Suspense } from "react";
import { ArtistCard } from "@/components/ArtistCard";
import { getAllArtistsAsync } from "../../data/mockArtists";
import { Skeleton } from "@/components/ui/skeleton";

// Loading component for the artist grid
function ArtistGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="space-y-2 px-1">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Main artist grid component - Server Component
async function ArtistGrid() {
  try {
    const artists = await getAllArtistsAsync();

    if (!artists || artists.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">
              No artists available
            </h2>
            <p className="text-muted-foreground max-w-md">
              We couldn't find any artists to display right now. Please try
              again later.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
        {artists.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error loading artists:", error);
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-destructive">
            Something went wrong
          </h2>
          <p className="text-muted-foreground max-w-md">
            We encountered an error while loading the artists. Please refresh
            the page or try again later.
          </p>
        </div>
      </div>
    );
  }
}

export default async function ArtistsPage() {
  const artists = await getAllArtistsAsync();

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
          Discover
          <span className="text-primary"> Artists</span>
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
          Explore talented artists from around the world and discover their
          music, stories, and creative journeys.
        </p>
      </div>

      {/* Artists Section */}
      <section className="mb-8 sm:mb-12">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground">
            All Artists
          </h2>
          <div className="text-xs sm:text-sm text-muted-foreground">
            {artists.length} artists
          </div>
        </div>

        <Suspense fallback={<ArtistGridSkeleton />}>
          <ArtistGrid />
        </Suspense>
      </section>
    </div>
  );
}
