import { Suspense } from "react";
import { SongCard } from "@/components/SongCard";
import { ArtistCard } from "@/components/ArtistCard";
import { GenreCard } from "@/components/GenreCard";
import { getPopularGenresAsync } from "../data/mockGenres";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, Clock, Star, Music, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  ArtistGridSkeleton,
  GenreGridSkeleton,
  SongGridSkeleton,
} from "@/components/SkeletonLoader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/prisma";

export default async function Home() {
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
      <div className="grid grid-cols-1 gap-8 mb-8 sm:mb-12">
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
        {/* Charts Section */}
        <div className="lg:col-span-2 xl:col-span-2">
          <Suspense fallback={<Skeleton className="h-96 w-full rounded-lg" />}>
            <ChartsSection />
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

async function SongGrid() {
  try {
    const popularSongs = await prisma.song.findMany({
      orderBy: { createdAt: "desc" },
      include: { artist: true, album: true },
      take: 8,
    });

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

// Featured Artists Component
async function FeaturedArtists() {
  try {
    const artists = await prisma.artist.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
    });

    return (
      <div className="grid grid-cols-2 lg:grid-cols-6 xl:grid-cols-6 gap-4 sm:gap-6">
        {artists.map((artist) => (
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
    const songs = await prisma.song.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        artist: true,
        album: true,
      },
      take: 5,
    });

    return (
      <div className="bg-card rounded-lg p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Lyrics top 5</h3>
        </div>

        <Table>
          <TableBody>
            {songs.map((song, index) => (
              <TableRow key={song.id} className="group">
                <TableCell className="font-bold w-12 text-primary">
                  {index + 1}
                </TableCell>
                <TableCell className="w-96">
                  <div className="flex items-center gap-8">
                    <div className="relative size-14 rounded-md overflow-hidden bg-muted flex-shrink-0">
                      {song.album?.coverUrl ? (
                        <Image
                          src={song.album.coverUrl}
                          alt={`${song.title} cover`}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      ) : song.thumbnailUrl ? (
                        <Image
                          src={song.thumbnailUrl}
                          alt={`${song.title} thumbnail`}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                          <Music className="h-4 w-4 text-primary/60" />
                        </div>
                      )}
                    </div>
                    <Link
                      href={`/songs/${song.id}`}
                      className="font-medium text-foreground group-hover:text-primary transition-colors hover:underline truncate"
                    >
                      {song.title}
                    </Link>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {song.artist.name}
                </TableCell>
                <TableCell className="text-center w-16">
                  <div className="flex items-center justify-center">
                    <Star className="h-4 w-4 text-muted-foreground" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

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
