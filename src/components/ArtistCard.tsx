"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Music, Users, CheckCircle } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Artist } from "../lib/types/artist";

interface ArtistCardProps {
  artist: Artist;
  className?: string;
}

export function ArtistCard({ artist, className }: ArtistCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formatListeners = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(0)}K`;
    }
    return count.toString();
  };

  return (
    <Link href={`/artists/${artist.id}`} className={`block ${className}`}>
      <Card
        className="artist-card group overflow-hidden bg-card/50 border-border hover:border-accent-gold/50 active:border-accent-gold/70 transition-all duration-300 ease-in-out cursor-pointer touch-manipulation"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setTimeout(() => setIsHovered(false), 200)}
      >
        <CardContent className="p-0">
          {/* Artist Image */}
          <div className="relative aspect-square overflow-hidden bg-muted">
            {!imageError ? (
              <Image
                src={artist.imageUrl}
                alt={`${artist.name}`}
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
              <div className="bg-accent-gold/90 rounded-full p-2 sm:p-3 transform transition-transform duration-300 hover:scale-110 active:scale-95">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
              </div>
            </div>

            {/* Verified Badge */}
            {artist.verified && (
              <div className="absolute top-2 right-2">
                <CheckCircle className="h-5 w-5 text-accent-gold fill-current" />
              </div>
            )}
          </div>

          {/* Artist Info */}
          <div className="p-3 sm:p-4 space-y-2">
            <div>
              <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-accent-gold group-active:text-accent-gold transition-colors duration-200 text-sm sm:text-base flex items-center gap-2">
                {artist.name}
                {artist.verified && (
                  <CheckCircle className="h-4 w-4 text-accent-gold fill-current flex-shrink-0" />
                )}
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm line-clamp-1 mt-1">
                {artist.genres.join(", ")}
              </p>
            </div>

            {/* Monthly Listeners */}
            {artist.monthlyListeners && (
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {formatListeners(artist.monthlyListeners)} monthly listeners
                </span>
              </div>
            )}

            {/* Genres */}
            <div className="flex flex-wrap gap-1">
              {artist.genres.slice(0, 2).map((genre) => (
                <Badge
                  key={genre}
                  variant="secondary"
                  className="text-xs px-2 py-0.5 bg-accent-gold/10 text-accent-gold border-accent-gold/20"
                >
                  {genre}
                </Badge>
              ))}
              {artist.genres.length > 2 && (
                <Badge
                  variant="secondary"
                  className="text-xs px-2 py-0.5 bg-muted/50 text-muted-foreground"
                >
                  +{artist.genres.length - 2}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
