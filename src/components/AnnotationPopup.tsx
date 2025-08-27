"use client";

import { memo } from "react";
import { Annotation } from "../lib/types/song";
import AnnotationSkeleton from "./AnnotationSkeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

interface AnnotationPopupProps {
  annotation: Annotation | null;
  position: { x: number; y: number };
  onClose: () => void;
  isOpen: boolean;
  isLoading?: boolean;
}

const AnnotationPopup = memo(function AnnotationPopup({
  annotation,
  position,
  onClose,
  isOpen,
  isLoading = false,
}: AnnotationPopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base font-medium">
            Annotation
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {isLoading ? (
            <AnnotationSkeleton />
          ) : annotation ? (
            <>
              <div>
                <p className="text-sm text-foreground leading-relaxed">
                  {annotation.content}
                </p>
              </div>

              {/* Author and date */}
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                {annotation.author && (
                  <span className="font-medium">by {annotation.author}</span>
                )}
                {annotation.createdAt && (
                  <span>
                    {new Date(annotation.createdAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              No annotation available
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
});

export default AnnotationPopup;
