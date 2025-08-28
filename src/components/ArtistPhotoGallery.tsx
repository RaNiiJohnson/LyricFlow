"use client";

import { useState } from "react";
import Image from "next/image";
import { ArtistPhoto } from "@/lib/types/artist";
import { Badge } from "@/components/ui/badge";
import { Camera, X } from "lucide-react";

interface ArtistPhotoGalleryProps {
  photos: ArtistPhoto[];
  artistName: string;
}

interface PhotoModalProps {
  photo: ArtistPhoto;
  isOpen: boolean;
  onClose: () => void;
  artistName: string;
}

function PhotoModal({ photo, isOpen, onClose, artistName }: PhotoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative max-w-4xl max-h-[90vh] mx-4">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
        >
          <X className="h-8 w-8" />
        </button>
        <div className="relative">
          <Image
            src={photo.url}
            alt={photo.caption || `Photo de ${artistName}`}
            width={photo.width}
            height={photo.height}
            className="max-h-[80vh] w-auto object-contain rounded-lg"
            priority
          />
          {photo.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-lg">
              <p className="text-white text-sm">{photo.caption}</p>
              {photo.category && (
                <Badge
                  variant="secondary"
                  className="mt-2 bg-white/20 text-white border-white/30"
                >
                  {photo.category}
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ArtistPhotoGallery({
  photos,
  artistName,
}: ArtistPhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<ArtistPhoto | null>(null);

  if (!photos || photos.length === 0) {
    return (
      <div className="text-center py-8">
        <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">Aucune photo disponible</p>
      </div>
    );
  }

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="break-inside-avoid mb-4 group cursor-pointer"
            onClick={() => setSelectedPhoto(photo)}
          >
            <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
              <Image
                src={photo.url}
                alt={photo.caption || `Photo de ${artistName}`}
                width={photo.width}
                height={photo.height}
                className="w-full h-auto object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              />

              {/* Overlay avec informations */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  {photo.caption && (
                    <p className="text-white text-sm font-medium mb-2 line-clamp-2">
                      {photo.caption}
                    </p>
                  )}
                  {photo.category && (
                    <Badge
                      variant="secondary"
                      className="bg-white/20 text-white border-white/30 text-xs"
                    >
                      {photo.category}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal pour afficher la photo en grand */}
      <PhotoModal
        photo={selectedPhoto!}
        isOpen={!!selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        artistName={artistName}
      />
    </>
  );
}
