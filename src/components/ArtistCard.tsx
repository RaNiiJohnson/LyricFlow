"use client";

import { Artist } from "@/generated/prisma";
import { CircleCheck, Music } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "./ui/badge";

interface ArtistCardProps {
  artist: Artist;
  className?: string;
}

export function ArtistCard({ artist, className }: ArtistCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link href={`/artists/${artist.id}`} className={`block ${className}`}>
      <div className="group overflow-hidden border-border hover:border-accent/50 active:border-accent/70 transition-all duration-300 ease-in-out cursor-pointer touch-manipulation">
        <div className="p-0">
          {/* Artist Image */}
          <div className="relative aspect-square overflow-hidden rounded-full">
            {!imageError && !!artist.imageUrl ? (
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
              className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-100 opacity-0"`}
            ></div>
          </div>

          {/* Artist Info */}
          <div className="p-3 sm:p-4 space-y-2">
            <div>
              <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-accent group-active:text-accent transition-colors duration-200 text-sm sm:text-base flex items-center gap-2">
                {artist.name}
                {artist.verified && (
                  <CircleCheck className="size-5 text-secondary-foreground/50" />
                )}
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm line-clamp-1 mt-1">
                {artist.genres?.join(", ")}
              </p>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-1">
              {artist.genres?.slice(0, 2).map((genre) => (
                <Badge
                  key={genre}
                  variant="secondary"
                  className="text-xs px-2 py-0.5 bg-accent/10 text-accent border-accent/20"
                >
                  {genre}
                </Badge>
              ))}
              {artist.genres?.length > 2 && (
                <Badge
                  variant="secondary"
                  className="text-xs px-2 py-0.5 bg-muted/50 text-muted-foreground"
                >
                  +{artist.genres?.length - 2}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
