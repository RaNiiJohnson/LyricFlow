"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Music, Play } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Song } from "../lib/types/song";

interface SongCardProps {
  song: Song;
  className?: string;
}

export function SongCard({ song, className }: SongCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/songs/${song.id}`} className={`block ${className}`}>
      <Card
        className="song-card group overflow-hidden bg-card/50 border-border hover:border-accent-gold/50 transition-all duration-300 ease-in-out cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-0">
          {/* Thumbnail */}
          <div className="relative aspect-square overflow-hidden bg-muted">
            {!imageError ? (
              <Image
                src={song.thumbnailUrl}
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
              className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="bg-accent-gold/90 rounded-full p-3 transform transition-transform duration-300 hover:scale-110">
                <Play className="h-6 w-6 text-black fill-current" />
              </div>
            </div>

            {/* Genre Badge */}
            {song.genre && (
              <div className="absolute top-2 right-2">
                <Badge
                  variant="secondary"
                  className="bg-black/60 text-white border-none text-xs"
                >
                  {song.genre}
                </Badge>
              </div>
            )}
          </div>

          {/* Song Info */}
          <div className="p-4 space-y-2">
            <div>
              <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-accent-gold transition-colors duration-200">
                {song.title}
              </h3>
              <p className="text-muted-foreground text-sm line-clamp-1 mt-1">
                {song.artist}
              </p>
            </div>

            {/* Album and Release Date */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              {song.album && (
                <span className="line-clamp-1 flex-1 mr-2">{song.album}</span>
              )}
              {song.releaseDate && (
                <span className="whitespace-nowrap">
                  {new Date(song.releaseDate).getFullYear()}
                </span>
              )}
            </div>

            {/* Annotations Count */}
            {song.annotations && song.annotations.length > 0 && (
              <div className="flex items-center space-x-1 text-xs text-accent-gold">
                <div className="w-2 h-2 bg-accent-gold rounded-full"></div>
                <span>
                  {song.annotations.length} annotation
                  {song.annotations.length !== 1 ? "s" : ""}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
