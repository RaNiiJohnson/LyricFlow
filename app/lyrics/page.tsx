import { Suspense } from "react";
import { SongCard } from "@/components/SongCard";
import { getPopularSongsAsync } from "../../data/mockSongs";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, Music, Clock, Star, Filter } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

// Loading component for the song grid
function SongGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
      {Array.from({ length: 12 }).map((_, i) => (
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

// Charts Section Component
async function ChartsSection() {
  try {
    const songs = await getPopularSongsAsync();
    const chartSongs = songs.slice(0, 10);

    return (
      <div className="bg-card rounded-lg p-4 sm:p-6 border border-border">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-semibold">Top 10 This Week</h3>
        </div>
        <div className="space-y-3">
          {chartSongs.map((song, index) => (
            <Link
              key={song.id}
              href={`/songs/${song.id}`}
              className="flex items-center gap-4 p-3 rounded-md hover:bg-muted/30 transition-colors group"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-sm">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground group-hover:text-primary transition-colors truncate">
                  {song.title}
                </p>
                <p className="text-sm text-muted-foreground truncate">
                  {song.artist}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge variant="secondary" className="text-xs">
                  {song.genre}
                </Badge>
                {song.annotations && song.annotations.length > 0 && (
                  <div className="flex items-center gap-1 text-xs text-primary">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span>{song.annotations.length}</span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading charts:", error);
    return (
      <div className="text-center py-8">
        <p className="text-destructive">Failed to load charts</p>
      </div>
    );
  }
}

// Main song grid component - Server Component
async function AllSongsGrid() {
  try {
    const allSongs = await getPopularSongsAsync();

    if (!allSongs || allSongs.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="space-y-4">
            <Music className="h-16 w-16 text-muted-foreground mx-auto" />
            <h2 className="text-2xl font-semibold text-foreground">
              No lyrics available
            </h2>
            <p className="text-muted-foreground max-w-md">
              We couldn't find any song lyrics to display right now. Please try
              again later.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
        {allSongs.map((song) => (
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
            We encountered an error while loading the lyrics. Please refresh the
            page or try again later.
          </p>
        </div>
      </div>
    );
  }
}

// Stats Component
async function SongsStats() {
  try {
    const songs = await getPopularSongsAsync();
    const genres = [...new Set(songs.map((song) => song.genre))];
    const totalAnnotations = songs.reduce(
      (total, song) => total + (song.annotations?.length || 0),
      0
    );

    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="text-center p-6 bg-card/50 rounded-lg border border-border">
          <div className="text-3xl font-bold text-primary mb-2">
            {songs.length}
          </div>
          <div className="text-sm text-muted-foreground">Song Lyrics</div>
        </div>

        <div className="text-center p-6 bg-card/50 rounded-lg border border-border">
          <div className="text-3xl font-bold text-primary mb-2">
            {genres.length}
          </div>
          <div className="text-sm text-muted-foreground">Genres</div>
        </div>

        <div className="text-center p-6 bg-card/50 rounded-lg border border-border">
          <div className="text-3xl font-bold text-primary mb-2">
            {totalAnnotations}
          </div>
          <div className="text-sm text-muted-foreground">Annotations</div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading stats:", error);
    return null;
  }
}

export default async function SongsPage() {
  const songs = await getPopularSongsAsync();

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
          Song
          <span className="text-primary"> Lyrics</span>
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
          Explore interactive lyrics with meaningful annotations and discover
          the stories behind your favorite songs from music experts and fans.
        </p>
      </div>

      {/* Stats */}
      <Suspense fallback={<div className="h-24" />}>
        <SongsStats />
      </Suspense>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 mb-8 sm:mb-12">
        {/* Charts Section */}
        <div className="xl:col-span-1">
          <div className="sticky top-20">
            <Suspense
              fallback={<Skeleton className="h-96 w-full rounded-lg" />}
            >
              <ChartsSection />
            </Suspense>
          </div>
        </div>

        {/* All Songs Grid */}
        <div className="xl:col-span-3">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div className="flex items-center gap-2">
              <Music className="h-5 w-5 text-primary" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground">
                Browse All Lyrics
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span>{songs.length} lyrics</span>
            </div>
          </div>

          <Suspense fallback={<SongGridSkeleton />}>
            <AllSongsGrid />
          </Suspense>
        </div>
      </div>

      {/* Quick Navigation */}
      <section className="bg-card/30 rounded-lg p-6 sm:p-8 border border-border">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Star className="h-5 w-5 text-primary" />
          Explore More
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/artists"
            className="flex items-center gap-3 p-4 bg-card/50 rounded-lg hover:bg-muted/30 transition-colors group"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Music className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                Browse Artists
              </p>
              <p className="text-sm text-muted-foreground">
                Discover talented musicians
              </p>
            </div>
          </Link>

          <Link
            href="/albums"
            className="flex items-center gap-3 p-4 bg-card/50 rounded-lg hover:bg-muted/30 transition-colors group"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                Explore Albums
              </p>
              <p className="text-sm text-muted-foreground">
                Complete musical journeys
              </p>
            </div>
          </Link>

          <Link
            href="/genres"
            className="flex items-center gap-3 p-4 bg-card/50 rounded-lg hover:bg-muted/30 transition-colors group"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                Music Genres
              </p>
              <p className="text-sm text-muted-foreground">Find your style</p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
