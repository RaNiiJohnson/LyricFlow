"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Music, TrendingUp } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Genre } from "../lib/types/genre";

interface GenreCardProps {
  genre: Genre;
  className?: string;
}

export function GenreCard({ genre, className }: GenreCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/genres/${genre.id}`} className={`block ${className}`}>
      <Card
        className="genre-card group overflow-hidden bg-card/50 border-border hover:border-accent-gold/50 active:border-accent-gold/70 transition-all duration-300 ease-in-out cursor-pointer touch-manipulation"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setTimeout(() => setIsHovered(false), 200)}
      >
        <CardContent className="p-0">
          {/* Genre Image */}
          <div className="relative aspect-[16/10] overflow-hidden bg-muted">
            {!imageError ? (
              <Image
                src={genre.imageUrl}
                alt={genre.name}
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

            {/* Color Overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/60"
              style={{
                background: `linear-gradient(135deg, ${genre.color}20 0%, ${genre.color}40 50%, ${genre.color}80 100%)`,
              }}
            />

            {/* Hover/Touch Overlay */}
            <div
              className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="bg-accent-gold/90 rounded-full p-2 sm:p-3 transform transition-transform duration-300 hover:scale-110 active:scale-95">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
              </div>
            </div>

            {/* Genre Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              <h3 className="font-bold text-white text-lg sm:text-xl mb-1 group-hover:text-accent-gold transition-colors duration-200">
                {genre.name}
              </h3>
              <p className="text-white/80 text-xs sm:text-sm line-clamp-2 mb-2">
                {genre.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-white/70 text-xs flex items-center gap-1">
                  <Music className="h-3 w-3" />
                  {genre.songCount} song{genre.songCount !== 1 ? "s" : ""}
                </span>
                <div
                  className="w-3 h-3 rounded-full border border-white/30"
                  style={{ backgroundColor: genre.color }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
