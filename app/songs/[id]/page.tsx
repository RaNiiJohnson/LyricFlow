"use client";

import { notFound } from "next/navigation";
import { getSongById } from "../../../data/mockSongs";
import { Song, Annotation } from "../../../src/lib/types/song";
import LyricsViewer from "../../../components/LyricsViewer";
import AnnotationPopup from "../../../components/AnnotationPopup";
import { use, useState, useEffect, useCallback } from "react";

interface SongPageProps {
  params: Promise<{ id: string }>;
}

export default function SongPage({ params }: SongPageProps) {
  const { id } = use(params);

  // State for annotation popup with enhanced management
  const [selectedAnnotation, setSelectedAnnotation] =
    useState<Annotation | null>(null);
  const [popupPosition, setPopupPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupLoading, setIsPopupLoading] = useState(false);
  const [lyricsLoaded, setLyricsLoaded] = useState(false);

  // Fetch song data based on ID
  const song: Song | undefined = getSongById(id);

  // Handle invalid song IDs with 404
  if (!song) {
    notFound();
  }

  // Simulate lyrics loading for smooth UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setLyricsLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [id]);

  // Enhanced annotation click handler with loading state
  const handleAnnotationClick = useCallback(
    (annotation: Annotation, position: { x: number; y: number }) => {
      // Close any existing popup first
      if (isPopupOpen) {
        setIsPopupOpen(false);
        setSelectedAnnotation(null);
      }

      // Add slight delay for smooth transition
      setTimeout(
        () => {
          setIsPopupLoading(true);
          setPopupPosition(position);

          // Simulate loading annotation content
          setTimeout(() => {
            setSelectedAnnotation(annotation);
            setIsPopupLoading(false);
            setIsPopupOpen(true);
          }, 150);
        },
        isPopupOpen ? 200 : 0
      );
    },
    [isPopupOpen]
  );

  // Enhanced popup close handler
  const handlePopupClose = useCallback(() => {
    setIsPopupOpen(false);
    // Clear annotation after animation completes
    setTimeout(() => {
      setSelectedAnnotation(null);
      setIsPopupLoading(false);
    }, 200);
  }, []);

  // Handle escape key globally
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isPopupOpen) {
        handlePopupClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isPopupOpen, handlePopupClose]);

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
        {lyricsLoaded ? (
          <LyricsViewer
            lyrics={song.lyrics}
            annotations={song.annotations}
            onAnnotationClick={handleAnnotationClick}
          />
        ) : (
          <div className="bg-card rounded-lg p-6">
            <h3 className="text-2xl font-semibold mb-6">Lyrics</h3>
            <div className="space-y-4">
              {/* Loading skeleton for lyrics */}
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-2 animate-pulse"
                >
                  <div className="w-8 h-4 bg-muted rounded"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Annotation Popup with loading state */}
        {(isPopupOpen || isPopupLoading) && (
          <AnnotationPopup
            annotation={isPopupLoading ? null : selectedAnnotation}
            position={popupPosition}
            onClose={handlePopupClose}
            isOpen={isPopupOpen}
            isLoading={isPopupLoading}
          />
        )}
      </div>
    </div>
  );
}
