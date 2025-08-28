import { notFound } from "next/navigation";
import { getArtistByIdAsync } from "../../../data/mockArtists";
import { getAlbumsByArtistAsync } from "../../../data/mockAlbums";
import { getSongByIdAsync } from "../../../data/mockSongs";
import { Artist } from "@/lib/types/artist";
import { Album } from "@/lib/types/album";
import { Song } from "@/lib/types/song";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AlbumCard } from "@/components/AlbumCard";
import { SongCard } from "@/components/SongCard";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle,
  Users,
  Music,
  Calendar,
  ExternalLink,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ArtistPageProps {
  params: Promise<{ id: string }>;
}

// Loading fallback for albums
function AlbumsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
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

// Loading fallback for songs
function SongsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
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

// Artist Albums Component
async function ArtistAlbums({ artistId }: { artistId: string }) {
  try {
    const albums = await getAlbumsByArtistAsync(artistId);

    if (!albums || albums.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No albums available</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {albums.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error loading artist albums:", error);
    return (
      <div className="text-center py-8">
        <p className="text-destructive">Failed to load albums</p>
      </div>
    );
  }
}

// Artist Songs Component
async function ArtistSongs({ songIds }: { songIds: string[] }) {
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
        <div className="text-center py-8">
          <p className="text-muted-foreground">No songs available</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {songs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error loading artist songs:", error);
    return (
      <div className="text-center py-8">
        <p className="text-destructive">Failed to load songs</p>
      </div>
    );
  }
}

export default async function ArtistPage({ params }: ArtistPageProps) {
  const { id } = await params;

  const artist: Artist | undefined = await getArtistByIdAsync(id);

  if (!artist) {
    notFound();
  }

  const formatListeners = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(0)}K`;
    }
    return count.toString();
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Artist Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
            <div className="relative w-full sm:w-80 h-80 rounded-lg overflow-hidden shadow-lg mx-auto sm:mx-0 max-w-80">
              <Image
                src={artist.imageUrl}
                alt={artist.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 640px) 320px, 320px"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB2aWV3Qm94PSIwIDAgMSAxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmM2Y0ZjYiLz48L3N2Zz4="
              />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-3 mb-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
                  {artist.name}
                </h1>
                {artist.verified && (
                  <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-accent-gold fill-current" />
                )}
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 mb-6">
                {artist.monthlyListeners && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span className="text-sm sm:text-base">
                      {formatListeners(artist.monthlyListeners)} monthly
                      listeners
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Music className="h-4 w-4" />
                  <span className="text-sm sm:text-base">
                    {artist.songs.length} song
                    {artist.songs.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-6">
                {artist.genres.map((genre) => (
                  <Badge
                    key={genre}
                    variant="secondary"
                    className="bg-accent-gold/10 text-accent-gold border-accent-gold/20 hover:bg-accent-gold/20 transition-colors"
                  >
                    {genre}
                  </Badge>
                ))}
              </div>

              {/* Bio */}
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6 max-w-2xl">
                {artist.bio}
              </p>

              {/* Social Links */}
              {artist.socialLinks && (
                <div className="flex items-center justify-center sm:justify-start gap-4">
                  {artist.socialLinks.instagram && (
                    <Link
                      href={`https://instagram.com/${artist.socialLinks.instagram.replace(
                        "@",
                        ""
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-muted-foreground hover:text-accent-gold transition-colors"
                    >
                      <Instagram className="h-4 w-4" />
                      <span className="text-sm">Instagram</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  )}
                  {artist.socialLinks.twitter && (
                    <Link
                      href={`https://twitter.com/${artist.socialLinks.twitter.replace(
                        "@",
                        ""
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-muted-foreground hover:text-accent-gold transition-colors"
                    >
                      <Twitter className="h-4 w-4" />
                      <span className="text-sm">Twitter</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  )}
                  {artist.socialLinks.youtube && (
                    <Link
                      href={`https://youtube.com/${artist.socialLinks.youtube.replace(
                        "@",
                        ""
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-muted-foreground hover:text-accent-gold transition-colors"
                    >
                      <Youtube className="h-4 w-4" />
                      <span className="text-sm">YouTube</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Albums Section */}
        {artist.albums.length > 0 && (
          <section className="mb-8 sm:mb-12">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground">
                Albums
              </h2>
              <div className="text-xs sm:text-sm text-muted-foreground">
                {artist.albums.length} album
                {artist.albums.length !== 1 ? "s" : ""}
              </div>
            </div>

            <Suspense fallback={<AlbumsGridSkeleton />}>
              <ArtistAlbums artistId={artist.id} />
            </Suspense>
          </section>
        )}

        {/* Popular Songs Section */}
        {artist.songs.length > 0 && (
          <section className="mb-8 sm:mb-12">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground">
                Popular Songs
              </h2>
              <div className="text-xs sm:text-sm text-muted-foreground">
                {artist.songs.length} song{artist.songs.length !== 1 ? "s" : ""}
              </div>
            </div>

            <Suspense fallback={<SongsGridSkeleton />}>
              <ArtistSongs songIds={artist.songs} />
            </Suspense>
          </section>
        )}
      </div>
    </div>
  );
}
