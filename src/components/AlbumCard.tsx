"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Music, Play, Clock } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Album } from "../lib/types/album";

interface AlbumCardProps {
  album: Album;
  className?: string;
}

export function AlbumCard({ album, className }: AlbumCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <Link href={`/albums/${album.id}`} className={`block ${className}`}>
      <Card
        className="album-card group overflow-hidden bg-card/50 border-border hover:border-accent-gold/50 active:border-accent-gold/70 transition-all duration-300 ease-in-out cursor-pointer touch-manipulation"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setTimeout(() => setIsHovered(false), 200)}
      >
        <CardContent className="p-0">
          {/* Album Cover */}
          <div className="relative aspect-square overflow-hidden bg-muted">
            {!imageError ? (
              <Image
                src={album.coverUrl}
                alt={`${album.title} by ${album.artist}`}
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

            {/* Hover/Touch Overlay */}
            <div
              className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="bg-accent-gold/90 rounded-full p-2 sm:p-3 transform transition-transform duration-300 hover:scale-110 active:scale-95">
                <Play className="h-5 w-5 sm:h-6 sm:w-6 text-black fill-current" />
              </div>
            </div>

            {/* Genre Badge */}
            <div className="absolute top-2 right-2">
              <Badge
                variant="secondary"
                className="bg-black/60 text-white border-none text-xs"
              >
                {album.genre}
              </Badge>
            </div>
          </div>

          {/* Album Info */}
          <div className="p-3 sm:p-4 space-y-2">
            <div>
              <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-accent-gold group-active:text-accent-gold transition-colors duration-200 text-sm sm:text-base">
                {album.title}
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm line-clamp-1 mt-1">
                {album.artist}
              </p>
            </div>

            {/* Release Date and Duration */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="text-xs">
                {new Date(album.releaseDate).getFullYear()}
              </span>
              {album.totalDuration && (
                <span className="flex items-center gap-1 text-xs">
                  <Clock className="h-3 w-3" />
                  {formatDuration(album.totalDuration)}
                </span>
              )}
            </div>

            {/* Track Count */}
            <div className="flex items-center space-x-1 text-xs text-accent-gold">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent-gold rounded-full"></div>
              <span className="text-xs">
                {album.tracks.length} track
                {album.tracks.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
