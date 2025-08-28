import { notFound } from "next/navigation";
import { getAlbumByIdAsync } from "../../../data/mockAlbums";
import { getArtistByNameAsync } from "../../../data/mockArtists";
import { getSongByIdAsync } from "../../../data/mockSongs";
import { Album } from "@/lib/types/album";
import { Artist } from "@/lib/types/artist";
import { Song } from "@/lib/types/song";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { Play, Clock, Calendar, Music, User, Disc } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface AlbumPageProps {
  params: Promise<{ id: string }>;
}

// Track list component
async function TrackList({ album }: { album: Album }) {
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const formatTotalDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <Card className="bg-card/50">
      <CardContent className="p-0">
        <div className="p-4 sm:p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Tracklist</h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Music className="h-4 w-4" />
                {album.tracks.length} tracks
              </span>
              {album.totalDuration && (
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {formatTotalDuration(album.totalDuration)}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="divide-y divide-border">
          {album.tracks.map((track, index) => (
            <Link
              key={track.id}
              href={`/songs/${track.songId}`}
              className="flex items-center gap-4 p-4 sm:p-6 hover:bg-muted/30 transition-colors group"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded bg-muted text-muted-foreground group-hover:bg-accent-gold group-hover:text-black transition-colors">
                <span className="text-sm font-medium group-hover:hidden">
                  {track.trackNumber}
                </span>
                <Play className="h-4 w-4 hidden group-hover:block fill-current" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground group-hover:text-accent-gold transition-colors truncate">
                  {track.title}
                </p>
                <p className="text-sm text-muted-foreground truncate">
                  {album.artist}
                </p>
              </div>

              <div className="text-sm text-muted-foreground">
                {formatDuration(track.duration)}
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Album info component
async function AlbumInfo({ album }: { album: Album }) {
  try {
    const artist = await getArtistByNameAsync(album.artist);

    return (
      <div className="space-y-6">
        {/* Artist Info */}
        {artist && (
          <div className="flex items-center gap-4 p-4 bg-card/30 rounded-lg border border-border">
            <div className="relative w-16 h-16 rounded-full overflow-hidden">
              <Image
                src={artist.imageUrl}
                alt={artist.name}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Artist</p>
              <Link
                href={`/artists/${artist.id}`}
                className="font-semibold text-foreground hover:text-accent-gold transition-colors"
              >
                {artist.name}
              </Link>
              {artist.monthlyListeners && (
                <p className="text-xs text-muted-foreground">
                  {(artist.monthlyListeners / 1000000).toFixed(1)}M monthly
                  listeners
                </p>
              )}
            </div>
          </div>
        )}

        {/* Album Description */}
        {album.description && (
          <div>
            <h3 className="font-semibold mb-2">About this album</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {album.description}
            </p>
          </div>
        )}

        {/* Album Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-card/30 rounded-lg border border-border">
            <div className="text-2xl font-bold text-accent-gold">
              {album.tracks.length}
            </div>
            <div className="text-sm text-muted-foreground">Tracks</div>
          </div>
          {album.totalDuration && (
            <div className="text-center p-4 bg-card/30 rounded-lg border border-border">
              <div className="text-2xl font-bold text-accent-gold">
                {Math.floor(album.totalDuration / 60)}
              </div>
              <div className="text-sm text-muted-foreground">Minutes</div>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading album info:", error);
    return (
      <div className="text-center py-8">
        <p className="text-destructive">Failed to load album information</p>
      </div>
    );
  }
}

export default async function AlbumPage({ params }: AlbumPageProps) {
  const { id } = await params;

  const album: Album | undefined = await getAlbumByIdAsync(id);

  if (!album) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Album Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start">
            <div className="relative w-full sm:w-80 h-80 rounded-lg overflow-hidden shadow-lg mx-auto lg:mx-0 max-w-80">
              <Image
                src={album.coverUrl}
                alt={`${album.title} by ${album.artist}`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 640px) 320px, 320px"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB2aWV3Qm94PSIwIDAgMSAxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmM2Y0ZjYiLz48L3N2Zz4="
              />
            </div>

            <div className="flex-1 text-center lg:text-left">
              <div className="mb-2">
                <Badge
                  variant="secondary"
                  className="bg-accent-gold/10 text-accent-gold border-accent-gold/20"
                >
                  <Disc className="h-3 w-3 mr-1" />
                  Album
                </Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
                {album.title}
              </h1>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 mb-6 text-muted-foreground">
                <Link
                  href={`/artists/${album.artistId}`}
                  className="flex items-center gap-2 hover:text-accent-gold transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span className="text-sm sm:text-base font-medium">
                    {album.artist}
                  </span>
                </Link>

                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm sm:text-base">
                    {new Date(album.releaseDate).getFullYear()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Music className="h-4 w-4" />
                  <span className="text-sm sm:text-base">
                    {album.tracks.length} track
                    {album.tracks.length !== 1 ? "s" : ""}
                  </span>
                </div>

                {album.totalDuration && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm sm:text-base">
                      {Math.floor(album.totalDuration / 60)} min
                    </span>
                  </div>
                )}
              </div>

              {/* Genre */}
              <div className="flex justify-center lg:justify-start mb-6">
                <Badge
                  variant="secondary"
                  className="bg-accent-gold/10 text-accent-gold border-accent-gold/20 hover:bg-accent-gold/20 transition-colors"
                >
                  {album.genre}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Album Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Track List */}
          <div className="lg:col-span-2">
            <Suspense
              fallback={<Skeleton className="h-96 w-full rounded-lg" />}
            >
              <TrackList album={album} />
            </Suspense>
          </div>

          {/* Album Info Sidebar */}
          <div className="lg:col-span-1">
            <Suspense
              fallback={<Skeleton className="h-96 w-full rounded-lg" />}
            >
              <AlbumInfo album={album} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
