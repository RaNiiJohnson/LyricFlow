import { Suspense } from "react";
import { SongCard } from "@/components/SongCard";
import { ArtistCard } from "@/components/ArtistCard";
import { GenreCard } from "@/components/GenreCard";
import { getPopularSongsAsync } from "../data/mockSongs";
import { getAllArtistsAsync } from "../data/mockArtists";
import { getPopularGenresAsync } from "../data/mockGenres";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, Clock, Star, Music } from "lucide-react";
import Link from "next/link";

// Loading component for the song grid
function SongGridSkeleton() {
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

// Artist grid skeleton
function ArtistGridSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
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

// Genre grid skeleton
function GenreGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-[16/10] w-full rounded-lg" />
        </div>
      ))}
    </div>
  );
}

// Featured Artists Component
async function FeaturedArtists() {
  try {
    const artists = await getAllArtistsAsync();
    const featuredArtists = artists.slice(0, 4); // Limité à 4 artistes

    return (
      <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
        {featuredArtists.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error loading featured artists:", error);
    return (
      <div className="text-center text-muted-foreground">
        Failed to load artists
      </div>
    );
  }
}

// Popular Genres Component
async function PopularGenres() {
  try {
    const genres = await getPopularGenresAsync();
    const topGenres = genres.slice(0, 6);

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {topGenres.map((genre) => (
          <GenreCard key={genre.id} genre={genre} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error loading popular genres:", error);
    return (
      <div className="text-center text-muted-foreground">
        Failed to load genres
      </div>
    );
  }
}

// Charts Component
async function ChartsSection() {
  try {
    const songs = await getPopularSongsAsync();
    const chartSongs = songs.slice(0, 10);

    return (
      <div className="bg-card rounded-lg p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Top 10 This Week</h3>
        </div>
        <div className="space-y-3">
          {chartSongs.map((song, index) => (
            <Link
              key={song.id}
              href={`/songs/${song.id}`}
              className="flex items-center gap-4 p-2 rounded-md hover:bg-muted/30 transition-colors group"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded bg-primary/10 text-primary font-bold text-sm">
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
              <div className="text-xs text-muted-foreground">{song.genre}</div>
            </Link>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Link
            href="/songs"
            className="text-sm text-primary hover:text-primary/80 transition-colors"
          >
            View Full Charts →
          </Link>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading charts:", error);
    return (
      <div className="text-center text-muted-foreground">
        Failed to load charts
      </div>
    );
  }
}

export default async function Home() {
  // Server-side data fetching
  const [popularSongs, artists, genres] = await Promise.all([
    getPopularSongsAsync(),
    getAllArtistsAsync(),
    getPopularGenresAsync(),
  ]);

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      {/* Hero Section */}
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
          Discover Music
          <span className="text-primary"> Meanings</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
          Explore song lyrics with interactive annotations and discover the
          stories behind your favorite music.
        </p>
      </div>

      {/* Latest Songs Section */}
      <section className="mb-8 sm:mb-12">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground">
              Latest
            </h2>
          </div>
          <Link
            href="/songs"
            className="text-xs sm:text-sm text-primary hover:text-primary/80 transition-colors"
          >
            View All →
          </Link>
        </div>

        <Suspense fallback={<SongGridSkeleton />}>
          <SongGrid />
        </Suspense>
      </section>

      {/* Charts and Featured Content */}
      <div className="grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-7 gap-8 mb-8 sm:mb-12">
        {/* Charts Section */}
        <div className="lg:col-span-2 xl:col-span-2">
          <Suspense fallback={<Skeleton className="h-96 w-full rounded-lg" />}>
            <ChartsSection />
          </Suspense>
        </div>

        {/* Featured Artists */}
        <div className="lg:col-span-3 xl:col-span-5">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                Featured Artists
              </h2>
            </div>
            <Link
              href="/artists"
              className="text-xs sm:text-sm text-primary hover:text-primary/80 transition-colors"
            >
              View All →
            </Link>
          </div>
          <Suspense fallback={<ArtistGridSkeleton />}>
            <FeaturedArtists />
          </Suspense>
        </div>
      </div>

      {/* Popular Genres Section */}
      <section className="mb-8 sm:mb-12">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center gap-2">
            <Music className="h-5 w-5 text-primary" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground">
              Popular Genres
            </h2>
          </div>
          <Link
            href="/genres"
            className="text-xs sm:text-sm text-primary hover:text-primary/80 transition-colors"
          >
            View All →
          </Link>
        </div>

        <Suspense fallback={<GenreGridSkeleton />}>
          <PopularGenres />
        </Suspense>
      </section>
    </div>
  );
}
