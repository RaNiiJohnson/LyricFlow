import { Suspense } from "react";
import { GenreCard } from "@/components/GenreCard";
import { getAllGenresAsync } from "../../data/mockGenres";
import { Skeleton } from "@/components/ui/skeleton";

// Loading component for the genre grid
function GenreGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-[16/10] w-full rounded-lg" />
          <div className="space-y-2 px-1">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Main genre grid component - Server Component
async function GenreGrid() {
  try {
    const genres = await getAllGenresAsync();

    if (!genres || genres.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">
              No genres available
            </h2>
            <p className="text-muted-foreground max-w-md">
              We couldn't find any genres to display right now. Please try again
              later.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {genres.map((genre) => (
          <GenreCard key={genre.id} genre={genre} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error loading genres:", error);
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-destructive">
            Something went wrong
          </h2>
          <p className="text-muted-foreground max-w-md">
            We encountered an error while loading the genres. Please refresh the
            page or try again later.
          </p>
        </div>
      </div>
    );
  }
}

export default async function GenresPage() {
  const genres = await getAllGenresAsync();

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
          Music
          <span className="text-primary"> Genres</span>
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
          Explore different musical styles and discover songs that match your
          mood and preferences across various genres.
        </p>
      </div>

      {/* Genres Section */}
      <section className="mb-8 sm:mb-12">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground">
            All Genres
          </h2>
          <div className="text-xs sm:text-sm text-muted-foreground">
            {genres.length} genres
          </div>
        </div>

        <Suspense fallback={<GenreGridSkeleton />}>
          <GenreGrid />
        </Suspense>
      </section>
    </div>
  );
}
