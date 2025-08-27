"use client";

import { notFound } from "next/navigation";
import { getSongById } from "../../../data/mockSongs";
import { Song } from "@/lib/types/song";
import LyricsViewer from "@/components/LyricsViewer";
import AnnotationPopup from "@/components/AnnotationPopup";
import { useAnnotationState } from "@/hooks/useAnnotationState";
import { use, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

interface SongPageProps {
  params: Promise<{ id: string }>;
}

// Loading fallback for LyricsViewer
function LyricsViewerSkeleton() {
  return (
    <div className="bg-card rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
      <div className="space-y-8">
        {Array.from({ length: 3 }).map((_, sectionIndex) => (
          <div key={sectionIndex} className="space-y-3">
            <Skeleton className="h-6 w-24 mb-4" />
            <div className="space-y-2 ml-4">
              {Array.from({ length: 4 }).map((_, lineIndex) => (
                <Skeleton
                  key={lineIndex}
                  className="h-6"
                  style={{ width: `${Math.random() * 40 + 60}%` }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SongPage({ params }: SongPageProps) {
  const { id } = use(params);

  // Use custom hook for annotation state management
  const {
    state: annotationState,
    handleAnnotationClick,
    handlePopupClose,
    handleAnnotationHover,
  } = useAnnotationState();

  // Fetch song data based on ID
  const song: Song | undefined = getSongById(id);

  // Handle invalid song IDs with 404
  if (!song) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        {/* Song Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="relative w-64 h-64 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={song.thumbnailUrl}
                alt={`${song.title} by ${song.artist}`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 256px"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB2aWV3Qm94PSIwIDAgMSAxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmM2Y0ZjYiLz48L3N2Zz4="
              />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {song.title}
              </h1>
              <h2 className="text-2xl md:text-3xl text-muted-foreground mb-4">
                {song.artist}
              </h2>
              {song.album && (
                <p className="text-lg text-muted-foreground mb-2">
                  Album: <span className="text-foreground">{song.album}</span>
                </p>
              )}
              {song.releaseDate && (
                <p className="text-lg text-muted-foreground mb-2">
                  Released:{" "}
                  <span className="text-foreground">
                    {new Date(song.releaseDate).toLocaleDateString()}
                  </span>
                </p>
              )}
              {song.genre && (
                <p className="text-lg text-muted-foreground">
                  Genre: <span className="text-foreground">{song.genre}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Lyrics Section with Annotations */}
        <Suspense fallback={<LyricsViewerSkeleton />}>
          <LyricsViewer
            lyrics={song.lyrics}
            annotations={song.annotations}
            onAnnotationClick={handleAnnotationClick}
            onAnnotationHover={handleAnnotationHover}
            hoveredAnnotation={annotationState.hoveredAnnotation}
            isInteracting={annotationState.isInteracting}
          />
        </Suspense>

        {/* Enhanced Annotation Popup with loading state */}
        {(annotationState.isPopupOpen || annotationState.isPopupLoading) && (
          <Suspense fallback={null}>
            <AnnotationPopup
              annotation={
                annotationState.isPopupLoading
                  ? null
                  : annotationState.selectedAnnotation
              }
              position={annotationState.popupPosition}
              onClose={handlePopupClose}
              isOpen={annotationState.isPopupOpen}
              isLoading={annotationState.isPopupLoading}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
}
