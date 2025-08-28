"use client";

import { useState, useMemo, memo } from "react";
import { LyricLine, Annotation } from "../lib/types/song";

interface LyricsViewerProps {
  lyrics: LyricLine[];
  annotations: Annotation[];
  onAnnotationClick: (
    annotation: Annotation,
    position: { x: number; y: number }
  ) => void;
  onAnnotationHover?: (annotationId: string | null) => void;
  hoveredAnnotation?: string | null;
  isInteracting?: boolean;
}

const LyricsViewer = memo(function LyricsViewer({
  lyrics,
  annotations,
  onAnnotationClick,
  onAnnotationHover,
  hoveredAnnotation: externalHoveredAnnotation,
  isInteracting: externalIsInteracting = false,
}: LyricsViewerProps) {
  // Use external state if provided, otherwise fall back to local state
  const [localHoveredAnnotation, setLocalHoveredAnnotation] = useState<
    string | null
  >(null);
  const [localIsInteracting, setLocalIsInteracting] = useState(false);

  const hoveredAnnotation = externalHoveredAnnotation ?? localHoveredAnnotation;
  const isInteracting = externalIsInteracting || localIsInteracting;

  // Memoized helper function to get annotations for a specific line
  const getAnnotationsForLine = useMemo(() => {
    const annotationMap = new Map<string, Annotation[]>();
    annotations.forEach((annotation) => {
      const lineId = annotation.lyricLineId;
      if (!annotationMap.has(lineId)) {
        annotationMap.set(lineId, []);
      }
      annotationMap.get(lineId)!.push(annotation);
    });

    return (lineId: string): Annotation[] => {
      return annotationMap.get(lineId) || [];
    };
  }, [annotations]);

  // Helper function to render a line with annotations
  const renderLineWithAnnotations = (line: LyricLine) => {
    const lineAnnotations = getAnnotationsForLine(line.id);

    if (lineAnnotations.length === 0) {
      return <span>{line.text}</span>;
    }

    // Sort annotations by start index to handle overlapping annotations
    const sortedAnnotations = lineAnnotations.sort(
      (a, b) => a.startIndex - b.startIndex
    );

    const parts = [];
    let currentIndex = 0;

    sortedAnnotations.forEach((annotation, index) => {
      // Add text before annotation
      if (currentIndex < annotation.startIndex) {
        parts.push(
          <span
            key={`${line.id}-text-before-${currentIndex}-${annotation.startIndex}`}
          >
            {line.text.slice(currentIndex, annotation.startIndex)}
          </span>
        );
      }

      // Add annotated text
      const annotatedText = line.text.slice(
        annotation.startIndex,
        annotation.endIndex
      );
      const isHovered = hoveredAnnotation === annotation.id;

      parts.push(
        <span
          key={`annotation-${annotation.id}`}
          className={`
            cursor-pointer transition-all duration-200 rounded-sm px-1 -mx-1
            ${
              isHovered
                ? "text-accent-gold font-medium"
                : "hover:text-accent-gold"
            }
            border-b-2 border-accent-gold border-opacity-50 hover:border-opacity-80
          `}
          onMouseEnter={() => {
            if (!isInteracting) {
              if (onAnnotationHover) {
                onAnnotationHover(annotation.id);
              } else {
                setLocalHoveredAnnotation(annotation.id);
              }
            }
          }}
          onMouseLeave={() => {
            if (!isInteracting) {
              if (onAnnotationHover) {
                onAnnotationHover(null);
              } else {
                setLocalHoveredAnnotation(null);
              }
            }
          }}
          onClick={(e) => {
            if (!onAnnotationHover) {
              setLocalIsInteracting(true);
            }
            const rect = e.currentTarget.getBoundingClientRect();
            onAnnotationClick(annotation, {
              x: rect.left + rect.width / 2,
              y: rect.top,
            });
            // Reset local interaction state after a delay if not using external state
            if (!onAnnotationHover) {
              setTimeout(() => setLocalIsInteracting(false), 500);
            }
          }}
        >
          {annotatedText}
        </span>
      );

      currentIndex = annotation.endIndex;
    });

    // Add remaining text after last annotation
    if (currentIndex < line.text.length) {
      parts.push(
        <span key={`${line.id}-text-after-${currentIndex}`}>
          {line.text.slice(currentIndex)}
        </span>
      );
    }

    return <>{parts}</>;
  };

  // Helper function to detect if a line is a section header
  const isSectionHeader = (text: string): boolean => {
    return /^\[.*\]/.test(text.trim());
  };

  // Memoized helper function to group lyrics by sections
  const sections = useMemo(() => {
    const groupedSections: { title?: string; lines: LyricLine[] }[] = [];
    let currentSection: { title?: string; lines: LyricLine[] } = { lines: [] };

    lyrics.forEach((line) => {
      if (line.isSection || isSectionHeader(line.text)) {
        // Start a new section
        if (currentSection.lines.length > 0) {
          groupedSections.push(currentSection);
        }
        currentSection = {
          title: line.text.replace(/^\[|\]$/g, ""), // Remove brackets
          lines: [],
        };
      } else if (line.text.trim()) {
        // Add non-empty lines to current section
        currentSection.lines.push(line);
      }
    });

    // Add the last section
    if (currentSection.lines.length > 0 || currentSection.title) {
      groupedSections.push(currentSection);
    }

    return groupedSections.length > 0 ? groupedSections : [{ lines: lyrics }];
  }, [lyrics]);

  return (
    <div className="bg-card rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold">Lyrics</h3>
        {annotations.length > 0 && (
          <div className="text-sm text-muted-foreground">
            {annotations.length} annotation{annotations.length !== 1 ? "s" : ""}
          </div>
        )}
      </div>

      <div className="space-y-8">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-3">
            {/* Section Header */}
            {section.title && (
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-accent-gold bg-accent-gold/10 px-3 py-2 rounded-md inline-block">
                  [{section.title}]
                </h4>
              </div>
            )}

            {/* Section Lines */}
            <div className="space-y-2 ml-4">
              {section.lines.map((line) => (
                <div
                  key={line.id}
                  className={`
                    text-lg leading-relaxed transition-all duration-200 rounded p-2 -mx-2
                    ${
                      isInteracting
                        ? "hover:bg-transparent"
                        : "hover:bg-muted/30"
                    }
                  `}
                >
                  {renderLineWithAnnotations(line)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Subtle hint for users */}
      {annotations.length > 0 && (
        <div className="mt-6 sm:mt-8 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            💡 <span className="hidden sm:inline">Hover over</span>
            <span className="sm:hidden">Tap</span> highlighted text to see
            annotations, <span className="hidden sm:inline">click</span>
            <span className="sm:hidden">tap</span> to view details
          </p>
        </div>
      )}
    </div>
  );
});

export default LyricsViewer;
