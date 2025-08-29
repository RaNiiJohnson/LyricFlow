"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Music, Play } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Song } from "@/lib/types/song";

interface SongCardProps {
  song: Song;
  className?: string;
}

export function SongCard({ song, className }: SongCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link href={`/lyrics/${song.id}`} className={`block ${className}`}>
      <Card className="song-card group overflow-hidden bg-card/50 border-border hover:border-accent/50 transition-all duration-300 ease-in-out cursor-pointer ">
        <CardContent className="p-0">
          {/* Thumbnail */}
          <div className="relative aspect-square overflow-hidden bg-muted">
            {!imageError ? (
              <Image
                src={song.thumbnailUrl ?? ""}
                alt={`${song.title} by ${song.artist}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                onError={() => setImageError(true)}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <Music className="h-12 w-12 text-muted-foreground" />
              </div>
            )}

            {/* Hover Overlay */}
            <div
              className={`absolute inset-0 bg-accent/60 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-100 opacity-0`}
            >
              <div className="bg-accent/90 rounded-full p-3 transform transition-transform duration-300 hover:scale-110">
                <Play className="size-10 text-secondary fill-current rotate-45 group-hover:rotate-0 transition delay-75" />
              </div>
            </div>

            {/* Genre Badge */}
            {song.genre && (
              <div className="absolute top-2 right-2">
                <Badge
                  variant="secondary"
                  className="bg-black/60 text-white border-none text-xs "
                >
                  {song.genre}
                </Badge>
              </div>
            )}
          </div>

          {/* Song Info */}
          <div className="p-3 sm:p-4 space-y-2">
            <div>
              <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-accent group-active:text-accent transition-colors duration-200 text-sm sm:text-base">
                {song.title}
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm line-clamp-1 mt-1">
                {song.artist.name}
              </p>
            </div>

            {/* Album and Release Date */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              {song.album && (
                <span className="line-clamp-1 flex-1 mr-2 text-xs">
                  {song.album.title}
                </span>
              )}
              {song.releaseDate && (
                <span className="whitespace-nowrap text-xs">
                  {new Date(song.releaseDate).getFullYear()}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
