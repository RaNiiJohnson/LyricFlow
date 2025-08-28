import { Suspense } from "react";
import { AlbumCard } from "@/components/AlbumCard";
import { getAllAlbumsAsync } from "../../data/mockAlbums";
import { Skeleton } from "@/components/ui/skeleton";

// Loading component for the album grid
function AlbumGridSkeleton() {
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

// Main album grid component - Server Component
async function AlbumGrid() {
  try {
    const albums = await getAllAlbumsAsync();

    if (!albums || albums.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">
              No albums available
            </h2>
            <p className="text-muted-foreground max-w-md">
              We couldn't find any albums to display right now. Please try again
              later.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
        {albums.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error loading albums:", error);
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-destructive">
            Something went wrong
          </h2>
          <p className="text-muted-foreground max-w-md">
            We encountered an error while loading the albums. Please refresh the
            page or try again later.
          </p>
        </div>
      </div>
    );
  }
}

export default async function AlbumsPage() {
  const albums = await getAllAlbumsAsync();

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
          Explore
          <span className="text-primary"> Albums</span>
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
          Dive into complete musical journeys with full albums from your
          favorite artists and discover new collections.
        </p>
      </div>

      {/* Albums Section */}
      <section className="mb-8 sm:mb-12">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground">
            All Albums
          </h2>
          <div className="text-xs sm:text-sm text-muted-foreground">
            {albums.length} albums
          </div>
        </div>

        <Suspense fallback={<AlbumGridSkeleton />}>
          <AlbumGrid />
        </Suspense>
      </section>
    </div>
  );
}
