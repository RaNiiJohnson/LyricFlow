"use client";

import { notFound } from "next/navigation";
import { getSongById } from "../../../data/mockSongs";
import { Song } from "@/lib/types/song";
import LyricsViewer from "@/components/LyricsViewer";
import AnnotationPopup from "@/components/AnnotationPopup";
import { useAnnotationState } from "@/hooks/useAnnotationState";
import { use } from "react";

interface SongPageProps {
  params: Promise<{ id: string }>;
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
            <img
              src={song.thumbnailUrl}
              alt={`${song.title} by ${song.artist}`}
              className="w-64 h-64 object-cover rounded-lg shadow-lg"
            />
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
        <LyricsViewer
          lyrics={song.lyrics}
          annotations={song.annotations}
          onAnnotationClick={handleAnnotationClick}
          onAnnotationHover={handleAnnotationHover}
          hoveredAnnotation={annotationState.hoveredAnnotation}
          isInteracting={annotationState.isInteracting}
        />

        {/* Enhanced Annotation Popup with loading state */}
        {(annotationState.isPopupOpen || annotationState.isPopupLoading) && (
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
        )}
      </div>
    </div>
  );
}
