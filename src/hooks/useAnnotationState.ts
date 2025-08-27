import { useState, useCallback, useRef, useEffect } from "react";
import { Annotation } from "@/lib/types/song";

interface AnnotationState {
  selectedAnnotation: Annotation | null;
  popupPosition: { x: number; y: number };
  isPopupOpen: boolean;
  isPopupLoading: boolean;
  hoveredAnnotation: string | null;
  isInteracting: boolean;
}

export function useAnnotationState() {
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [state, setState] = useState<AnnotationState>({
    selectedAnnotation: null,
    popupPosition: { x: 0, y: 0 },
    isPopupOpen: false,
    isPopupLoading: false,
    hoveredAnnotation: null,
    isInteracting: false,
  });

  // Clear all timeouts helper
  const clearAllTimeouts = useCallback(() => {
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
      interactionTimeoutRef.current = null;
    }
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = null;
    }
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  // Enhanced annotation click handler with better performance
  const handleAnnotationClick = useCallback(
    (annotation: Annotation, position: { x: number; y: number }) => {
      // Clear any existing timeouts
      clearAllTimeouts();

      // Set interaction state to prevent hover conflicts
      setState((prev) => ({
        ...prev,
        isInteracting: true,
      }));

      // Close any existing popup first
      if (state.isPopupOpen) {
        setState((prev) => ({
          ...prev,
          isPopupOpen: false,
          selectedAnnotation: null,
        }));
      }

      // Add slight delay for smooth transition
      const transitionDelay = state.isPopupOpen ? 200 : 0;

      setTimeout(() => {
        setState((prev) => ({
          ...prev,
          isPopupLoading: true,
          popupPosition: position,
        }));

        // Simulate loading annotation content for smooth UX
        loadingTimeoutRef.current = setTimeout(() => {
          setState((prev) => ({
            ...prev,
            selectedAnnotation: annotation,
            isPopupLoading: false,
            isPopupOpen: true,
          }));
        }, 150);
      }, transitionDelay);

      // Reset interaction state after delay
      interactionTimeoutRef.current = setTimeout(() => {
        setState((prev) => ({
          ...prev,
          isInteracting: false,
        }));
      }, 500);
    },
    [state.isPopupOpen, clearAllTimeouts]
  );

  // Enhanced popup close handler
  const handlePopupClose = useCallback(() => {
    // Clear any pending timeouts
    clearAllTimeouts();

    setState((prev) => ({
      ...prev,
      isPopupOpen: false,
    }));

    // Clear annotation after animation completes
    closeTimeoutRef.current = setTimeout(() => {
      setState((prev) => ({
        ...prev,
        selectedAnnotation: null,
        isPopupLoading: false,
        hoveredAnnotation: null,
        isInteracting: false,
      }));
    }, 200);
  }, [clearAllTimeouts]);

  // Handle annotation hover states
  const handleAnnotationHover = useCallback(
    (annotationId: string | null) => {
      if (!state.isInteracting) {
        setState((prev) => ({
          ...prev,
          hoveredAnnotation: annotationId,
        }));
      }
    },
    [state.isInteracting]
  );

  // Cleanup all timeouts on unmount
  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, [clearAllTimeouts]);

  return {
    state,
    handleAnnotationClick,
    handlePopupClose,
    handleAnnotationHover,
  };
}
