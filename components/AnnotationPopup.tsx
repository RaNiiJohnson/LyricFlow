"use client";

import { useEffect, useRef } from "react";
import { Annotation } from "../src/lib/types/song";

interface AnnotationPopupProps {
  annotation: Annotation | null;
  position: { x: number; y: number };
  onClose: () => void;
  isOpen: boolean;
  isLoading?: boolean;
}

export default function AnnotationPopup({
  annotation,
  position,
  onClose,
  isOpen,
}: AnnotationPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen, onClose]);

  // Handle escape key to close
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      return () => {
        document.removeEventListener("keydown", handleEscapeKey);
      };
    }
  }, [isOpen, onClose]);

  // Calculate popup position to ensure it stays within viewport
  const getPopupStyle = () => {
    if (!isOpen || !annotation) return { display: "none" };

    const popupWidth = 320; // Approximate popup width
    const popupHeight = 200; // Approximate popup height
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const scrollY = window.scrollY;

    let left = position.x - popupWidth / 2;
    let top = position.y - popupHeight - 10; // 10px gap above the text

    // Adjust horizontal position if popup goes outside viewport
    if (left < 10) {
      left = 10;
    } else if (left + popupWidth > viewportWidth - 10) {
      left = viewportWidth - popupWidth - 10;
    }

    // Adjust vertical position if popup goes outside viewport
    if (top < scrollY + 10) {
      top = position.y + 30; // Show below the text instead
    }

    return {
      position: "fixed" as const,
      left: `${left}px`,
      top: `${top}px`,
      zIndex: 1000,
    };
  };

  if (!isOpen || !annotation) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-20 z-40"
        onClick={onClose}
      />

      {/* Popup */}
      <div
        ref={popupRef}
        style={getPopupStyle()}
        className={`
          bg-card border border-border rounded-lg shadow-lg p-4 max-w-sm
          transform transition-all duration-200 ease-in-out
          ${
            isOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-2"
          }
        `}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-sm hover:bg-muted"
          aria-label="Close annotation"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Annotation content */}
        <div className="pr-6">
          <div className="mb-3">
            <p className="text-sm text-foreground leading-relaxed">
              {annotation.content}
            </p>
          </div>

          {/* Author and date */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            {annotation.author && (
              <span className="font-medium">by {annotation.author}</span>
            )}
            {annotation.createdAt && (
              <span>{new Date(annotation.createdAt).toLocaleDateString()}</span>
            )}
          </div>
        </div>

        {/* Arrow pointing to the text */}
        <div
          className="absolute w-3 h-3 bg-card border-l border-b border-border transform rotate-45"
          style={{
            left: "50%",
            bottom: "-6px",
            marginLeft: "-6px",
          }}
        />
      </div>
    </>
  );
}
