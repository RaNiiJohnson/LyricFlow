"use client";

import { Suspense } from "react";
import LyricsViewer from "@/components/LyricsViewer";
import AnnotationPopup from "@/components/AnnotationPopup";
import { useAnnotationState } from "@/hooks/useAnnotationState";
import { LyricLine, Annotation } from "@/lib/types/song";

interface SongLyricsClientProps {
  lyrics: LyricLine[];
  annotations: Annotation[];
}

export default function SongLyricsClient({
  lyrics,
  annotations,
}: SongLyricsClientProps) {
  // Use custom hook for annotation state management
  const {
    state: annotationState,
    handleAnnotationClick,
    handlePopupClose,
    handleAnnotationHover,
  } = useAnnotationState();

  return (
    <>
      {/* Lyrics Section with Annotations */}
      <LyricsViewer
        lyrics={lyrics}
        annotations={annotations}
        onAnnotationClick={handleAnnotationClick}
        onAnnotationHover={handleAnnotationHover}
        hoveredAnnotation={annotationState.hoveredAnnotation}
        isInteracting={annotationState.isInteracting}
      />

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
    </>
  );
}
