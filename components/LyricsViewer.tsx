"use client";

import { useState } from "react";
import { LyricLine, Annotation } from "../src/lib/types/song";

interface LyricsViewerProps {
  lyrics: LyricLine[];
  annotations: Annotation[];
  onAnnotationClick: (
    annotation: Annotation,
    position: { x: number; y: number }
  ) => void;
}

export default function LyricsViewer({
  lyrics,
  annotations,
  onAnnotationClick,
}: LyricsViewerProps) {
  const [hoveredAnnotation, setHoveredAnnotation] = useState<string | null>(
    null
  );

  // Helper function to get annotations for a specific line
  const getAnnotationsForLine = (lineId: string): Annotation[] => {
    return annotations.filter(
      (annotation) => annotation.lyricLineId === lineId
    );
  };

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
          <span key={`text-${index}-before`}>
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
                ? "bg-yellow-400 bg-opacity-40 text-foreground"
                : "bg-yellow-400 bg-opacity-20 hover:bg-yellow-400 hover:bg-opacity-30"
            }
            border-b-2 border-yellow-400 border-opacity-50
          `}
          onMouseEnter={() => setHoveredAnnotation(annotation.id)}
          onMouseLeave={() => setHoveredAnnotation(null)}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            onAnnotationClick(annotation, {
              x: rect.left + rect.width / 2,
              y: rect.top,
            });
          }}
        >
          {annotatedText}
        </span>
      );

      currentIndex = annotation.endIndex;
    });

    // Add remaining text after last annotation
    if (currentIndex < line.text.length) {
      parts.push(<span key="text-after">{line.text.slice(currentIndex)}</span>);
    }

    return <>{parts}</>;
  };

  return (
    <div className="bg-card rounded-lg p-6">
      <h3 className="text-2xl font-semibold mb-6">Lyrics</h3>
      <div className="space-y-4">
        {lyrics.map((line) => (
          <div
            key={line.id}
            className="text-lg leading-relaxed hover:bg-muted/30 transition-colors duration-200 rounded p-2 -mx-2"
          >
            <span className="text-muted-foreground text-sm mr-4 inline-block w-8">
              {line.lineNumber}
            </span>
            {renderLineWithAnnotations(line)}
          </div>
        ))}
      </div>
    </div>
  );
}
